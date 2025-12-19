import { useEffect, useState } from "react";

const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "system"
    );

    // Apply theme on change
    useEffect(() => {
        const appliedTheme =
            theme === "system" ? getSystemTheme() : theme;

        document.documentElement.setAttribute(
            "data-theme",
            appliedTheme
        );

        localStorage.setItem("theme", theme);
    }, [theme]);

    // Listen to system theme changes (only when system mode)
    useEffect(() => {
        if (theme !== "system") return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handler = () => {
            document.documentElement.setAttribute(
                "data-theme",
                getSystemTheme()
            );
        };

        media.addEventListener("change", handler);

        return () => media.removeEventListener("change", handler);
    }, [theme]);

    return [theme, setTheme];
};

export default useTheme;
