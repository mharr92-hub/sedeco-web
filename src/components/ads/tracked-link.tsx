"use client";

import type { ComponentPropsWithoutRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  event: AnalyticsEvent;
  landing?: string;
  location?: string;
};

export function TrackedLink({
  event,
  landing,
  location,
  onClick,
  className,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      data-track={event}
      data-landing={landing}
      className={cn(className)}
      onClick={(e) => {
        track({ event, landing, location });
        onClick?.(e);
      }}
    />
  );
}

type TrackedButtonProps = ComponentPropsWithoutRef<"button"> & {
  event: AnalyticsEvent;
  landing?: string;
  location?: string;
};

export function TrackedButton({
  event,
  landing,
  location,
  onClick,
  className,
  ...props
}: TrackedButtonProps) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      data-track={event}
      data-landing={landing}
      className={cn(className)}
      onClick={(e) => {
        track({ event, landing, location });
        onClick?.(e);
      }}
    />
  );
}
