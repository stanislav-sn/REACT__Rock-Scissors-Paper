import { createContext, useEffect, useState } from 'react';

const initialTheme = 'light';

export const ThemeContext = createContext({
	theme: initialTheme,
	setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(initialTheme);

	useEffect(() => {
		try {
			const savedTheme = window.localStorage.getItem('theme');
			if (savedTheme) {
				setTheme(savedTheme);
			}
		} catch (err) {
			console.log(`Error while getting theme: ${err.message}`);
		}
	}, []);

	useEffect(() => {
		try {
			window.localStorage.setItem('theme', theme);
			document.body.classList.toggle('dark', theme === 'dark');
		} catch (err) {
			console.log(`Error while setting theme: ${err.message}`);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
