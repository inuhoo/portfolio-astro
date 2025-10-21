import { useEffect, useId, useState } from "react";
import { IconSunHigh, IconMoon } from "@tabler/icons-react";

export function ThemeSelector({ defaultTheme = "light", className }) {
	const gid = useId();
	const [themeValue, setThemeValue] = useState(defaultTheme);

	// Run only in the browser after first render
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme");
			const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

			setThemeValue(initialTheme);
			document.documentElement.classList.toggle("dark", initialTheme === "dark");
		}
	}, []);

	const handleChange = (newValue) => {
		setThemeValue(newValue);
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", newValue);
			document.documentElement.classList.toggle("dark", newValue === "dark");
		}
	};
	return (
		<div className={["theme-selector", className].filter(Boolean).join(" ")}>
			<input hidden type="radio" id={`${gid}-light`} name={`${gid}-theme`} value="light" checked={themeValue === "light"} onChange={() => handleChange("light")} className="theme-selector__input" />
			<label htmlFor={`${gid}-light`} className="theme-selector__label" title="Light">
				<IconSunHigh stroke={1.5} size={16} />
				<span className="sr-only">Light theme</span>
			</label>

			<input hidden type="radio" id={`${gid}-dark`} name={`${gid}-theme`} value="dark" checked={themeValue === "dark"} onChange={() => handleChange("dark")} className="theme-selector__input" />
			<label htmlFor={`${gid}-dark`} className="theme-selector__label" title="Dark">
				<IconMoon stroke={1.5} size={16} />
				<span className="sr-only">Dark theme</span>
			</label>
		</div>
	);
}
