import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─── Font Family ─── */
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      /* ─── Colors ─── */
      colors: {
        // Core palette
        black: "#000000",
        white: "#ffffff",
        body: "#333333", // default body text
        grey: "#b3b3b3", // muted labels (e.g. job titles)

        // Brand accents
        brand: {
          green: "#37df7a",
          "green-button": "#1aba65",
          "green-hover": "#17aa5c",
          violet: "#e456e0",
          yellow: "#efa943",
          blue: "#15b8ff",
        },

        // Dark theme swatches (for dark sections like "Why us?")
        navy: {
          deep: "#111725",
          midnight: "#050713",
          gunmetal: "#2c3549",
          charcoal: "#151a26",
        },

        // Muted blues / greys (dark-theme text & borders)
        slate: {
          steel: "#6d809c",
          blue: "#606c85",
          cadet: "#96a0be",
        },

        // Gradient palette (headings, decorative)
        gradient: {
          sky: "#a4c7f1",
          dodger: "#1fa2ff",
          mint: "#a6ffcb",
          periwinkle: "#5153ce",
        },

        // White opacity variants (overlays, glass effects)
        "white-70": "rgba(255, 255, 255, 0.70)", // #ffffffb3
        "white-15": "rgba(255, 255, 255, 0.12)", // #ffffff1f
        "white-10": "rgba(255, 255, 255, 0.10)", // #ffffff1a
      },

      /* ─── Typography Scale ─── */
      fontSize: {
        // Display XL — hero headings
        "display-xl": [
          "3.5rem", // 56px
          {
            lineHeight: "4rem", // 64px
            fontWeight: "500",
            letterSpacing: "-0.06em",
          },
        ],
        // Display L — section headings, modal headings
        "display-l": [
          "2.5rem", // 40px
          {
            lineHeight: "3rem", // 48px
            fontWeight: "500",
            letterSpacing: "-0.06em",
          },
        ],
        // Display M — cards, FAQ questions
        "display-m": [
          "1.75rem", // 28px
          {
            lineHeight: "2.25rem", // 36px
            fontWeight: "500",
            letterSpacing: "-0.06em",
          },
        ],
        // Sub Display L — footer headings, small section titles
        "sub-display-l": [
          "1.25rem", // 20px
          {
            lineHeight: "1.875rem", // 30px
            fontWeight: "500",
            letterSpacing: "-0.05em",
          },
        ],
        // Body XL — form descriptions
        "body-xl": [
          "1.125rem", // 18px
          {
            lineHeight: "1.75rem", // 28px
            fontWeight: "400",
            letterSpacing: "-0.03em",
          },
        ],
        // Body L — paragraphs, nav links
        "body-l": [
          "1rem", // 16px
          {
            lineHeight: "1.5rem", // 24px
            fontWeight: "400",
            letterSpacing: "-0.03em",
          },
        ],
        // Body M — captions, labels
        "body-m": [
          "0.875rem", // 14px
          {
            lineHeight: "1.25rem", // 20px
            fontWeight: "400",
            letterSpacing: "-0.03em",
          },
        ],
      },

      /* ─── Letter Spacing (for overrides) ─── */
      letterSpacing: {
        "tight-2": "-0.02em",
        "tight-3": "-0.03em",
        "tight-4": "-0.04em",
        "tight-5": "-0.05em",
        "tight-6": "-0.06em",
      },

      /* ─── Spacing (section padding) ─── */
      spacing: {
        "18": "4.5rem", // 72px
        "30": "7.5rem", // 120px — section vertical padding (desktop)
        "26": "6.5rem", // 104px — section vertical padding (tablet)
      },

      /* ─── Max Width ─── */
      maxWidth: {
        container: "1440px",
        "header-text": "686px", // hero/section header max-width
      },

      /* ─── Border Radius ─── */
      borderRadius: {
        pill: "100px", // buttons
        lg: "1rem", // 16px — cards, large radius
        md: "0.5rem", // 8px — small radius
      },

      /* ─── Z-Index ─── */
      zIndex: {
        nav: "999",
      },

      /* ─── Backdrop Blur ─── */
      backdropBlur: {
        button: "10px",
      },

      /* ─── Min Height ─── */
      minHeight: {
        hero: "750px",
      },

      /* ─── Screens (Webflow breakpoints) ─── */
      screens: {
        // Webflow uses max-width breakpoints; Tailwind uses min-width.
        // These map to Webflow's typical breakpoints:
        //   Desktop: >= 992px (default in Tailwind "lg")
        //   Tablet:  768px–991px
        //   Mobile L: 480px–767px
        //   Mobile S: < 480px
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
        "2xl": "1440px",
      },

      /* ─── Keyframes & Animation (for text rotator) ─── */
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(0.22em)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(0.22em)" },
        },
      },
      animation: {
        "fade-up":
          "fade-up 0.36s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-down":
          "fade-down 0.36s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
