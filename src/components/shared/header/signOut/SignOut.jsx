import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { handleError } from '../../../../utils/handleError';
import styles from './SignOut.module.scss';

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
			<button type="button" className={styles.btn} onClick={userSignOut}>
				Sign Out
			</button>
		</div>
	);
};
