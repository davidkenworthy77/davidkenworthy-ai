/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#151528',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#cbd5e1',
          800: '#1c1c35',
          900: '#151528',
          950: '#0f0f20',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#60a5fa',
        },
        amber: {
          DEFAULT: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        reading: '700px',
        content: '1200px',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: '700px',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
