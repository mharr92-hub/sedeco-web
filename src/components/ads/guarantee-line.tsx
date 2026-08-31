import { GUARANTEE_LINE, GUARANTEE_TOOLTIP } from "@/lib/site";
import { cn } from "@/lib/utils";

export function GuaranteeLine({
  className,
  as: Tag = "span",
}: {
  className?: string;
  as?: "span" | "p";
}) {
  return (
    <Tag className={cn("inline", className)}>
      <abbr
        title={GUARANTEE_TOOLTIP}
        className="cursor-help underline decoration-dotted decoration-current/50 underline-offset-4"
      >
        {GUARANTEE_LINE}
      </abbr>
      <span className="sr-only"> {GUARANTEE_TOOLTIP}</span>
    </Tag>
  );
}
