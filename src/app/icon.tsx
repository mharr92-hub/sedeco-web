import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1E3A8A",
          color: "white",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.02em",
        }}
      >
        S
      </div>
    ),
    size,
  );
}
