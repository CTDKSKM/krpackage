import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#3B82F6",
        secondary: "#F3F4F6",
        accent: "#60A5FA",
      },
      boxShadow: {
        'neumorphic': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
