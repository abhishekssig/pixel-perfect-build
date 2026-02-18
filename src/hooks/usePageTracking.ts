import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const usePageTracking = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();
    const pagePath = location.pathname;

    // Track page view via edge function (no auth required for tracking)
    supabase.functions.invoke("track-page-view", {
      body: { page_path: pagePath, section_id: null },
    }).catch(() => {});

    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      supabase.functions.invoke("track-page-view", {
        body: { page_path: pagePath, section_id: null, time_spent: timeSpent },
      }).catch(() => {});
    };
  }, [location.pathname]);
};
