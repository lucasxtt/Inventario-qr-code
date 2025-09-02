// tailwind.config.ts

import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

const shadeMapping: { [key: string]: string } = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
  "950": "50",
};

type TailwindColors = typeof colors;
type ColorShades = { [key: string]: string };
type ThemeColors = { [colorName: string]: ColorShades };

const generateThemeObject = (
  tailwindColors: TailwindColors,
  mapping: { [key: string]: string },
  invert: boolean = false
): ThemeColors => {
  const theme: ThemeColors = {};

  baseColors.forEach((colorName) => {
    theme[colorName] = {};
    Object.entries(mapping).forEach(([lightShade, darkShade]) => {
      const sourceShade = invert ? darkShade : lightShade;

      const colorPalette = tailwindColors[colorName as keyof TailwindColors];
      if (colorPalette && typeof colorPalette === 'object' && colorPalette[sourceShade as keyof typeof colorPalette]) {
        theme[colorName][lightShade] = colorPalette[sourceShade as keyof typeof colorPalette];
      } else {
        console.warn(
          `Tonalidade '${sourceShade}' não encontrada para a cor '${colorName}'. ` +
          `Usando '${lightShade}' como fallback ou '#000000'.`
        );
        theme[colorName][lightShade] = colorPalette?.[lightShade as keyof typeof colorPalette] || '#000000';
      }
    });
  });
  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping, false);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
    black: colors.gray["950"],
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};

export default config;
