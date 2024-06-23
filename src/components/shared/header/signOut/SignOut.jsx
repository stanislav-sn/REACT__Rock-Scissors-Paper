import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { handleError } from '../../../../utils/handleError';
import styles from './SignOut.module.css';

export const SignOut = () => {
	const userSignOut = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.log('Error: ', error);
			handleError(error);
		}
	};

	return (
		<div className={styles.box}>
			<button
				className={`${styles.btn} appButtons border`}
				onClick={userSignOut}
			>
				Sign Out
			</button>
		</div>
	);
};
