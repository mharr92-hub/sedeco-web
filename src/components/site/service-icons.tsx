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
  "lupa",
  "tuberia",
  "ventana",
  "soldadura",
  "casa",
  "llave",
  "regla",
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
    case "lupa":
      return (
        <>
          <circle cx="21" cy="21" r="12" {...stroke} />
          <path d="M30 30l12 12" {...stroke} />
          <path d="M15 21h12M21 15v12" {...stroke} />
        </>
      );
    case "tuberia":
      return (
        <>
          <path d="M6 14h14a6 6 0 0 1 6 6v8a6 6 0 0 0 6 6h10" {...stroke} />
          <rect x="4" y="9" width="6" height="10" rx="1.5" {...stroke} />
          <rect x="38" y="29" width="6" height="10" rx="1.5" {...stroke} />
        </>
      );
    case "ventana":
      return (
        <>
          <rect x="8" y="7" width="32" height="34" rx="2" {...stroke} />
          <path d="M24 7v34M8 24h32" {...stroke} />
        </>
      );
    case "soldadura":
      return (
        <>
          <path d="M9 39l16-16" {...stroke} />
          <path d="M23 17l8 8 6-6-8-8z" {...stroke} />
          <path d="M34 34h8M38 30v8" {...stroke} />
        </>
      );
    case "casa":
      return (
        <>
          <path d="M6 22 24 7l18 15" {...stroke} />
          <path d="M11 21v19h26V21" {...stroke} />
          <rect x="20" y="28" width="8" height="12" {...stroke} />
        </>
      );
    case "llave":
      return (
        <>
          <path
            d="M33 6a10 10 0 0 0-9 14.5L8 36.5 11.5 40l16-16A10 10 0 1 0 33 6z"
            {...stroke}
          />
          <circle cx="33" cy="16" r="3.5" {...stroke} />
        </>
      );
    case "regla":
      return (
        <>
          <path d="M7 31 31 7l10 10-24 24z" {...stroke} />
          <path d="M14 24l4 4M20 18l4 4M26 12l4 4" {...stroke} />
        </>
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
