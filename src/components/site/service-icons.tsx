import type { SVGProps } from "react";

export const SERVICE_ICON_NAMES = [
  "rollo-gota",
  "edificio",
  "cuerdas",
  "guindola",
  "dron",
  "rodillo",
  "casco",
  "ladrillos",
  "rayo",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

type ServiceIconProps = SVGProps<SVGSVGElement> & {
  name: ServiceIconName;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconBody({ name }: { name: ServiceIconName }) {
  switch (name) {
    case "rollo-gota":
      return (
        <>
          <ellipse cx="16" cy="16" rx="7" ry="7" {...stroke} />
          <path d="M16 9c5.5 0 9 1.8 13 3.5v14c-4-1.8-7.5-3.5-13-3.5" {...stroke} />
          <path d="M16 13.5c3.6 0 6.2.8 9 2" {...stroke} />
          <path
            d="M35.5 30.5c0 3.2-2.4 5.5-4.5 5.5s-4.5-2.3-4.5-5.5c0-2.6 4.5-8 4.5-8s4.5 5.4 4.5 8z"
            fill="currentColor"
            stroke="none"
          />
        </>
      );
    case "edificio":
      return (
        <>
          <path d="M8 42h32" {...stroke} />
          <rect x="12" y="8" width="18" height="34" rx="1" {...stroke} />
          <path d="M18 14h3M23 14h3M18 20h3M23 20h3M18 26h3M23 26h3" {...stroke} />
          <path d="M19 42v-7h5v7" {...stroke} />
          <path d="M30 18h6v24" {...stroke} />
        </>
      );
    case "cuerdas":
      return (
        <>
          <path d="M14 6h20" {...stroke} />
          <path d="M18 6c.4 8 2.2 13 6 17" {...stroke} />
          <path d="M30 6c-.4 7-1.6 11-4.2 15" {...stroke} />
          <circle cx="24" cy="28" r="3" {...stroke} />
          <path d="M24 31v8" {...stroke} />
          <path d="M17 39h14" {...stroke} />
          <path d="M20 39c.6 3 2.2 4 4 4s3.4-1 4-4" {...stroke} />
        </>
      );
    case "guindola":
      return (
        <>
          <path d="M12 7h24" {...stroke} />
          <path d="M17 7v22M31 7v22" {...stroke} />
          <rect x="9" y="29" width="30" height="6" rx="1" {...stroke} />
          <path d="M14 35v5M34 35v5" {...stroke} />
          <path d="M12 40h6M30 40h6" {...stroke} />
        </>
      );
    case "dron":
      return (
        <>
          <rect x="19" y="19" width="10" height="10" rx="2" {...stroke} />
          <path d="M19 22 9 12M29 22l10-10M19 26 9 36M29 26l10 10" {...stroke} />
          <circle cx="9" cy="12" r="3.25" {...stroke} />
          <circle cx="39" cy="12" r="3.25" {...stroke} />
          <circle cx="9" cy="36" r="3.25" {...stroke} />
          <circle cx="39" cy="36" r="3.25" {...stroke} />
        </>
      );
    case "rodillo":
      return (
        <>
          <rect x="6" y="8" width="26" height="11" rx="2.5" {...stroke} />
          <path d="M32 13.5h5.5" {...stroke} />
          <path d="M37.5 13.5V34" {...stroke} />
          <path d="M33 34h9" {...stroke} />
        </>
      );
    case "casco":
      return (
        <>
          <path d="M10 28c.4-9 6.2-16 14-16s13.6 7 14 16" {...stroke} />
          <path d="M6 28h36" {...stroke} />
          <path d="M8 28.5v3.2C8 34 10 36 13 36h22c3 0 5-2 5-4.3v-3.2" {...stroke} />
          <path d="M24 12v5" {...stroke} />
        </>
      );
    case "ladrillos":
      return (
        <>
          <rect x="6" y="8" width="16" height="8" {...stroke} />
          <rect x="26" y="8" width="16" height="8" {...stroke} />
          <rect x="6" y="20" width="10" height="8" {...stroke} />
          <rect x="20" y="20" width="16" height="8" {...stroke} />
          <rect x="6" y="32" width="16" height="8" {...stroke} />
          <rect x="26" y="32" width="16" height="8" {...stroke} />
        </>
      );
    case "rayo":
      return (
        <path
          d="M27 4 14 26h8l-2 18 16-24h-9l2-16z"
          fill="currentColor"
          stroke="none"
        />
      );
    default:
      return null;
  }
}

/** Monochrome brand icon. Color comes from currentColor (use text-[#1A2E8A]). */
export function ServiceIcon({ name, className, ...props }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <IconBody name={name} />
    </svg>
  );
}
