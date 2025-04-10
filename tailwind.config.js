/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: ["manrope", "sans-serif"]
            },
            colors: {
                primary: {
                    DEFAULT: "#B8E4DA",
                    base: "#27A376",
                    1: "#B8E4DA",
                    2: "#D57A66",
                    3: "#F2F7F5",
                    100: "#ECF8F0CC",
                    200: "#CEEFDF",
                    600: "#1C8C6E",
                },
                secondary: {
                    100: "#EDF1F3",
                    500: "#1A1C1E",
                    2: "#D57A66",
                    3: "#F2F7F5",
                    600: "#1C8C6E",
                },
                error: {
                    600: "#BE3F4A",
                    100: "#F2E7E7",
                },
                warning: {
                    600: "#DBAA00",
                    100: "#FBF4E4",
                },
                information: {
                    600: "#3D81DB",
                    100: "#DCF3FF",
                },
                text: "#20484F",
                dark: "#072125",
                grayscale: {
                    50: "#fafafa",
                    200: "#F1F2F4",
                    600: "#718096",
                    900: "#111827",
                },
                neutral: {
                    50: "#FAFAFA",
                    100: "#F8F8F8",
                    300: "#EEEFF2",
                    400: "#CBD5E0",
                    600: "#718096",
                    500: "#A0AEC0",
                    800: "#1F2937",
                    900: "#111827",
                },
                alerts: {
                    success_base: "#27A376",
                    success_light: "#E9FBF2",
                    error_base: "#E03137",
                    error_light: "#F8EAEA",
                    information_base: "#2F78EE",
                    information_light: "#EBF3FF",
                    warning_base: "#FF9F1C",
                    warning_light: "#FFF5E8",
                },
                border: {
                    dark: "#E6E8E9",
                }
            },
            fontSize: {
                8: ["8px", "16px"],
                10: ["10px", "16px"],
                12: ["12px", "19px"],
                14: ["14px", "22px"],
                16: ["16px", "24px"],
                18: ["18px", "27px"],
                20: ["20px", "28px"],
                24: ["24px", "31px"],
                32: ["32px", "40px"],
                48: ["48px", "57px"],
            },
        },
    },
    plugins: [],
};
