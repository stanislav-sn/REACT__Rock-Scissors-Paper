import { SignOut } from './signOut/SignOut';
import { Rules } from './rules/Rules';
import { ThemeColor } from './themeColor/ThemeColor';
import styles from './Header.module.css';

export const Header = ({ auth }) => {
	return (
		<header className={styles.header}>
			<div className={`${styles.buttons} flexVerticalCentered`}>
				<ThemeColor />
				{auth.currentUser && (
					<>
						<Rules />
						<SignOut />
					</>
				)}
			</div>
			<h1>Rock - Scissors - Paper</h1>
		</header>
	);
};
