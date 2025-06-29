import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(site)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^text-(\w+)-[1-9]00$/, // matches text-blue-500, text-red-700, etc.
    },
    {
      pattern: /^opacity-(\d{2,3})$/,
    }
  ],
  theme: {
  	extend: {
  	}
  },
  plugins: [],
};
export default config;
