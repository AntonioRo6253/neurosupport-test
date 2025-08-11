/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: {
      Color10: "#066D77",
      Color20: "#82C4BE",
      Color30: "#FFDDD2",
      Color40: "#353447",
      Color50: "#0D1516",
      Color60: "#969797",
      Color70: "#F6FEFF",
    },
    secondary: {
      GradiantLinear: "196deg, #EDF6F9 4.6%, #066D77 71.78%",
    },
    gray: {
      Color53: "#4E4F4F",
      Color54: "#969797",
      Color55: "#C9C9C9",
      Color56: "#E4E2E2",
      Color58: "#E4E2E2",
    },
    alerts: {
      ColorA10: "#ff6961",
      ColorA20: "#fdfd96",
      ColorA30: "#77dd77",
    },
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: {
      Color10: "#0A9CB0",
      Color20: "#5A9A94",
      Color30: "#E6C7BD",
      Color40: "#9485b5ff",
      Color50: "#1D1F20",
      Color60: "#ECEDEE",
      Color70: "#1A2C2E",
    },
    secondary: {
      GradiantLinear: "196deg, #1A2C2E 4.6%, #0A9CB0 71.78%", // Gradiente oscuro
    },
    gray: {
      Color53: "#6E6F6F",
      Color54: "#9A9B9B",
      Color55: "#363535ff",
      Color56: "#3D3D3D",
      Color58: "#1c1c1eff",
    },
    alerts: {
      ColorA10: "#FF8A80",
      ColorA20: "#FFFF8D",
      ColorA30: "#81C784",
    },
  },
};
