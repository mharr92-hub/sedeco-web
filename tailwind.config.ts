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
        // Brand SEDECO — extraido del logo y catálogo
        navy: {
          DEFAULT: "#1E3A8A",
          50: "#EEF1FB",
          100: "#D7DEF5",
          200: "#AFBDEC",
          300: "#7E92DC",
          400: "#4F6BCB",
          500: "#2E47A0",
          600: "#1E3A8A", // primary
          700: "#162C6B",
          800: "#0F2152",
          900: "#0A1639",
          950: "#070F26",
        },
        accent: {
          DEFAULT: "#E55A1A", // CTA orange (Ghostshield-aligned)
          50: "#FEF1E8",
          100: "#FCDDC8",
          200: "#F8B790",
          300: "#F38F58",
          400: "#EE6F30",
          500: "#E55A1A",
          600: "#BD440F",
          700: "#92340B",
          800: "#682407",
          900: "#3F1604",
        },
        ink: {
          DEFAULT: "#0B0F14",
          50: "#F7F9FC",
          100: "#E4E8EE",
          200: "#C8D0DA",
          300: "#9DA9B8",
          400: "#6B7A8A",
          500: "#4A5663",
          600: "#2C353F",
          700: "#1B2128",
          800: "#0F141A",
          900: "#0B0F14",
        },
        success: "#1E7A3C",
        warning: "#C8A030",
        danger: "#B53A2A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
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
        card: "0 1px 2px rgba(11,15,20,0.06), 0 1px 1px rgba(11,15,20,0.04)",
        elevated: "0 4px 12px rgba(11,15,20,0.08), 0 2px 4px rgba(11,15,20,0.04)",
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
