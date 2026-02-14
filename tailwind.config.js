/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3629B7",
        primaryDark: "#2E23A0",
        background: {
          light: "#F7F7F7",
          dark: "#0F0F14",
        },

        foreground: {
          light: "#343434",
          dark: "#F5F5F5",
        },

        muted: {
          light: "#6B7280",
          dark: "#9CA3AF",
        },

        surface: {
          light: "#F7F7F7",
          dark: "#1A1A22",
        },

        border: {
          light: "#E5E5E5",
          dark: "#2A2A35",
        },
      },
    },
  },
  plugins: [],
};
