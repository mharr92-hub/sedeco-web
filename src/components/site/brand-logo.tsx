import Link from "next/link";

/**
 * Official lockup. Light surfaces use the black-wordmark SVG.
 * Dark surfaces use the white-wordmark variant: the supplied dark PNG
 * still has a black wordmark, which disappears on the navy header.
 */
const SRC = {
  light: "/sedeco-logo.svg",
  dark: "/sedeco-logo-on-dark.svg",
} as const;

const frame = {
  header:
    "h-8 w-[6.45rem] min-w-[4.75rem] shrink sm:h-9 sm:w-[7.25rem] md:h-11 md:w-[8.875rem]",
  footer: "h-14 w-[11.25rem] shrink-0 md:h-16 md:w-[12.9rem]",
  inline: "h-[3.75rem] w-48 shrink-0",
} as const;

export function BrandLogo({
  surface = "dark",
  size = "header",
  className = "",
}: {
  surface?: keyof typeof SRC;
  size?: keyof typeof frame;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623] ${frame[size]} ${className}`}
    >
      {/* SVG lockup. next/image refuses SVG unless dangerouslyAllowSVG is on. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC[surface]}
        alt="SEDECO"
        width={2740}
        height={850}
        className="h-full w-full object-contain object-left"
      />
    </Link>
  );
}
