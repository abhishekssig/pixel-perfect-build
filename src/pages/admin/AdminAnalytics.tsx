import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface AnalyticsRow {
  id: string;
  page_path: string;
  section_id: string | null;
  view_count: number;
  unique_visitors: number;
  avg_time_seconds: number;
  recorded_at: string;
}

const AdminAnalytics = () => {
  const [data, setData] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: rows } = await supabase
        .from("page_analytics")
        .select("*")
        .order("view_count", { ascending: false });
      setData((rows as AnalyticsRow[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const chartData = data.map((d) => ({
    page: d.page_path.length > 20 ? d.page_path.slice(0, 20) + "..." : d.page_path,
    views: d.view_count,
    visitors: d.unique_visitors,
  }));

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-2">Analytics</h1>
      <p className="text-white/40 text-sm mb-8">Page views and section engagement tracked across your website.</p>

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : data.length === 0 ? (
        <div className="bg-neutral-900 border border-white/10 rounded-xl p-8 text-center">
          <p className="text-white/40 mb-2">No analytics data yet.</p>
          <p className="text-white/30 text-xs">Data will appear as users browse your site.</p>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-sm font-medium text-white/60 mb-4">Page Views</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="page" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Bar dataKey="views" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="visitors" fill="hsl(220, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left py-3 px-4">Page</th>
                  <th className="text-left py-3 px-4">Section</th>
                  <th className="text-left py-3 px-4">Views</th>
                  <th className="text-left py-3 px-4">Unique</th>
                  <th className="text-left py-3 px-4">Avg Time</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium">{row.page_path}</td>
                    <td className="py-3 px-4 text-white/60">{row.section_id || "—"}</td>
                    <td className="py-3 px-4">{row.view_count}</td>
                    <td className="py-3 px-4">{row.unique_visitors}</td>
                    <td className="py-3 px-4 text-white/60">{row.avg_time_seconds}s</td>
                    <td className="py-3 px-4 text-white/60">{row.recorded_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAnalytics;
