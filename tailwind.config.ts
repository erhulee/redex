import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',

        // power by https://colors.eva.design/
        "primary-100": "#D6E4FC",
        "primary-200": "#AEC8FA",
        "primary-300": "#83A5F1",
        "primary-400": "#6287E4",
        "primary-500": "#335CD3",
        "primary-600": "#2546B5",
        "primary-700": "#193397",
        "primary-800": "#10237A",
        "primary-900": "#091765",
        "success-100": "#EAFBD1",
        "success-200": "#D0F8A4",
        "success-300": "#AAEB74",
        "success-400": "#84D74F",
        "success-500": "#52bd1e",
        "success-600": "#3AA215",
        "success-700": "#27880F",
        "success-800": "#166D09",
        "success-900": "#0B5A05",
        "info-100": "#D8FDFC",
        "info-200": "#B2FAFC",
        "info-300": "#8BEDF8",
        "info-400": "#6CDAF1",
        "info-500": "#3ebfe8",
        "info-600": "#2D97C7",
        "info-700": "#1F72A7",
        "info-800": "#135286",
        "info-900": "#0B3A6F",
        "warning-100": "#FEF6CC",
        "warning-200": "#FEEA9A",
        "warning-300": "#FCDA67",
        "warning-400": "#FACB41",
        "warning-500": "#F7B204",
        "warning-600": "#D49202",
        "warning-700": "#B17502",
        "warning-800": "#8F5A01",
        "warning-900": "#764700",
        "danger-100": "#FEE8D5",
        "danger-200": "#FECBAC",
        "danger-300": "#FDA883",
        "danger-400": "#FB8663",
        "danger-500": "#F94F31",
        "danger-600": "#D63023",
        "danger-700": "#B31819",
        "danger-800": "#900F1A",
        "danger-900": "#77091B"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  corePlugins: {
  }
}
export default config
