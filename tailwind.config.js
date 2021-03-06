/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,md,mdx}"],
  theme: {
    extend: {
      colors: {
        twhite: {
          50: "#afb7c2",
          100: "#cfd6df",
          200: "#dbe1e9",
          400: "#f5f5f5",
        },
      },
      backgroundImage: {
        stripe:
          "repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08) 7px, transparent 0, transparent 14px)",
      },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "'Helvetica Neue'",
        "Arial",
        "'Hiragino Sans'",
        "'Hiragino Kaku Gothic ProN'",
        "Meiryo",
        "sans-serif",
      ],
      serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        "'Fira Code'",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
  },
  plugins: [],
}

module.exports = config
