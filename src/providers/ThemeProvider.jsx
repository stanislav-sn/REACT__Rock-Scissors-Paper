import { createContext, useEffect, useState } from 'react';
import { Loading } from '../components/shared/loading/Loading';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [theme, setTheme] = useState(() => {
		try {
			const savedTheme = window.localStorage.getItem('theme');
			setIsLoading(false);
			return savedTheme || 'light';
		}
		catch (err) {
			setIsLoading(false);
			console.log(`Error while getting theme: ${err.message}`);
			return 'light';
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem('theme', theme);
			document.body.classList.toggle('dark', theme === 'dark');
		}
		catch (err) {
			console.log(`Error while setting theme: ${err.message}`);
		}
	}, [theme]);

	return (
		<>
			{isLoading && <Loading />}
			<ThemeContext.Provider value={{ theme, setTheme }}>
				{children}
			</ThemeContext.Provider>
		</>
	);
};
