import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Catálogo Rev. 2 — alineado con /filtraciones
        navy: {
          DEFAULT: "#1A2E8A",
          50: "#EEF1FB",
          100: "#D6E8FF",
          200: "#AFBDEC",
          300: "#7E92DC",
          400: "#4F6BCB",
          500: "#2E47A0",
          600: "#1A2E8A",
          700: "#1F3D7A",
          800: "#0F2152",
          900: "#1A2E8A",
          950: "#070F26",
        },
        accent: {
          DEFAULT: "#F5A623",
          50: "#FFF8EA",
          100: "#FDECC8",
          200: "#FBD89A",
          300: "#F8C56C",
          400: "#E8A33D",
          500: "#F5A623",
          600: "#E0981C",
          700: "#C48412",
          800: "#8A5C0C",
          900: "#5C3D08",
        },
        ink: {
          DEFAULT: "#4A4A4A",
          50: "#EEF1FB",
          100: "#D6E8FF",
          200: "#C8D0DA",
          300: "#9DA9B8",
          400: "#6B7A8A",
          500: "#4A4A4A",
          600: "#3A3A3A",
          700: "#2C353F",
          800: "#0F141A",
          900: "#0B0F14",
        },
        success: "#1E7A3C",
        warning: "#C8A030",
        danger: "#B53A2A",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-montserrat)", "Arial", "Helvetica", "sans-serif"],
        ads: ["var(--font-montserrat)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-montserrat)", "Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,46,138,0.06), 0 1px 1px rgba(26,46,138,0.04)",
        elevated: "0 4px 12px rgba(26,46,138,0.08), 0 2px 4px rgba(26,46,138,0.04)",
      },
      maxWidth: {
        prose: "68ch",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-up": "slideUp 240ms ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
