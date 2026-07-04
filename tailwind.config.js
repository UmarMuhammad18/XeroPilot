export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.08)",
      },
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9eeff",
          200: "#b7dbff",
          500: "#2d7dff",
          600: "#1e63d8",
        },
      },
    },
  },
  plugins: [],
};
