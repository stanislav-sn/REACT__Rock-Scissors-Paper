import { useContext } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import styles from './ThemeColor.module.css';

export const ThemeColor = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	return (
		<button className={`${styles.theme} flexAllCentered`} onClick={toggleTheme}>
			{theme === 'dark' ? (
				<MdDarkMode title="Dark" className={styles.light} />
			) : (
				<MdLightMode title="Light" className={styles.dark} />
			)}
		</button>
	);
};
