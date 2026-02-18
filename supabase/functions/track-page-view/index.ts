import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { page_path, section_id, time_spent } = await req.json();
    if (!page_path) {
      return new Response(JSON.stringify({ error: "page_path required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const today = new Date().toISOString().split("T")[0];

    // Check if a row exists for this page + date
    const { data: existing } = await supabase
      .from("page_analytics")
      .select("*")
      .eq("page_path", page_path)
      .eq("recorded_at", today)
      .eq("section_id", section_id || "")
      .maybeSingle();

    if (existing) {
      const updates: Record<string, unknown> = {
        view_count: existing.view_count + 1,
        unique_visitors: existing.unique_visitors + 1,
      };
      if (time_spent && existing.avg_time_seconds !== undefined) {
        updates.avg_time_seconds = Math.round(
          (existing.avg_time_seconds * existing.view_count + time_spent) /
            (existing.view_count + 1)
        );
      }
      await supabase
        .from("page_analytics")
        .update(updates)
        .eq("id", existing.id);
    } else {
      await supabase.from("page_analytics").insert({
        page_path,
        section_id: section_id || null,
        view_count: 1,
        unique_visitors: 1,
        avg_time_seconds: time_spent || 0,
        recorded_at: today,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
