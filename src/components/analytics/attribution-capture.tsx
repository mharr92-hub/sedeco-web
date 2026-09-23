"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { rememberAttribution } from "@/lib/tracking";

/**
 * Persist gclid / gbraid / wbraid / utm_* on landing, before in-site
 * navigation drops the query string. GTM may be empty; this does not add tags.
 */
export function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    rememberAttribution(query ? `?${query}` : "");
  }, [pathname, searchParams]);

  return null;
}
