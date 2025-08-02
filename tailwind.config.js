/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        base: 'var(--base)',
        mantle: 'var(--mantle)',
        crust: 'var(--crust)',
        surface: 'var(--surface0)',
        surface1: 'var(--surface1)',
        surface2: 'var(--surface2)',
        text: 'var(--text)',
        subtext1: 'var(--subtext1)',
        subtext0: 'var(--subtext0)',
        overlay0: 'var(--overlay0)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
    },
  },
  plugins: [],
}
