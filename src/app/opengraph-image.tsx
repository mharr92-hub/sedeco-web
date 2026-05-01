import { ImageResponse } from "next/og";

export const alt = "SEDECO Panamá — Sellado de concreto permanente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0A1639",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#E55A1A",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          SEDECO · Panamá
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Sellado de concreto permanente.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#AFBDEC",
              lineHeight: 1.3,
              maxWidth: 900,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Aplicadores autorizados de Ghostshield® · Garantía hasta 100 años
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            color: "#7E92DC",
          }}
        >
          <span>+100,000 m² impermeabilizados</span>
          <span>+50 proyectos · desde 2020</span>
        </div>
      </div>
    ),
    size,
  );
}
