"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

export function ViewOnce({
  event,
  landing,
  location,
}: {
  event: AnalyticsEvent;
  landing: string;
  location?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const sent = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (sent.current) return;
        if (entries.some((e) => e.isIntersecting)) {
          sent.current = true;
          track({ event, landing, location });
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [event, landing, location]);

  return <span ref={ref} className="sr-only" aria-hidden="true" />;
}
