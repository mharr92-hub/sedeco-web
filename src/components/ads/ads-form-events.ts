export const ADS_OPEN_FORM_EVENT = "ads:open-form";

export function openAdsForm(location: string): void {
  if (typeof window === "undefined") return;
  const md = window.matchMedia("(min-width: 768px)").matches;
  if (md) {
    document.getElementById("formulario")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.dispatchEvent(
      new CustomEvent(ADS_OPEN_FORM_EVENT, { detail: { location, sheet: false } }),
    );
    return;
  }
  window.dispatchEvent(
    new CustomEvent(ADS_OPEN_FORM_EVENT, { detail: { location, sheet: true } }),
  );
}
