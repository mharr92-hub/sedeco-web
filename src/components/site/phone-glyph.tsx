import { cn } from "@/lib/utils";

export function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      width="20"
      height="20"
      className={cn("h-5 w-5 flex-shrink-0", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 5.5c0-1 .8-1.8 1.8-1.8h2.2c.7 0 1.3.4 1.6 1.1l1 2.2c.3.6.1 1.3-.4 1.7L8.4 10c.8 1.6 2 2.8 3.6 3.6l1.3-1.3c.4-.5 1.1-.7 1.7-.4l2.2 1c.7.3 1.1.9 1.1 1.6v2.2c0 1-.8 1.8-1.8 1.8C9.6 18.5 5.5 14.4 5.5 8.3c0-.9 0-1.9 0-2.8z"
      />
    </svg>
  );
}
