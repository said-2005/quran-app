import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["ui-sans-serif", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)"],
                amiri: ["var(--font-amiri)"],
            },
        },
    },
    plugins: [],
};
export default config;
