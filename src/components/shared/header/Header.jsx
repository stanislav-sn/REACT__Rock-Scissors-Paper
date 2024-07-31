import { SignOut } from './signOut/SignOut';
import { Rules } from './rules/Rules';
import { ThemeColor } from './themeColor/ThemeColor';
import styles from './Header.module.scss';

export const Header = ({ auth }) => {
	return (
		<header className={styles.header}>
			<div className={styles.buttons}>
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
