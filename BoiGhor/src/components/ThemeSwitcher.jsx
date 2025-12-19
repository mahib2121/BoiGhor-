import useTheme from "../redux/useThem";


const ThemeSwitcher = () => {
    const [theme, setTheme] = useTheme();

    return (
        <div className="flex gap-2">
            <button
                onClick={() => setTheme("light")}
                className={`btn btn-sm ${theme === "light" ? "btn-primary" : "btn-ghost"
                    }`}
            >
                Light
            </button>

            <button
                onClick={() => setTheme("dark")}
                className={`btn btn-sm ${theme === "dark" ? "btn-primary" : "btn-ghost"
                    }`}
            >
                Dark
            </button>

            <button
                onClick={() => setTheme("system")}
                className={`btn btn-sm ${theme === "system" ? "btn-primary" : "btn-ghost"
                    }`}
            >
                System
            </button>
        </div>
    );
};

export default ThemeSwitcher;
