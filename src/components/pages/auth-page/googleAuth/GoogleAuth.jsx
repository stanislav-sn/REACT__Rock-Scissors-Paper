import { getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer } from 'react-toastify';
import { auth, database, googleAuthProvider } from '../../../../firebase';
import { handleError } from '../../../../utils/handleError';
import styles from './GoogleAuth.module.scss';

export const GoogleAuth = () => {
	const handleGoogleAuth = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuthProvider);
			const user = result.user;
			const refData = ref(database, `users/${user.uid}`);
			const isNewUser = getAdditionalUserInfo(result).isNewUser;

			if (isNewUser || !(await get(refData)).exists()) {
				await set(refData, {
					userName: user.displayName,
					email: user.email,
					userScore: 0,
					compScore: 0,
				});
			}
		} catch (error) {
			console.log('Error: ', error.code);
			handleError(error);
		}
	};

	return (
		<>
			<button type="button" className={styles.btn} onClick={handleGoogleAuth}>
				<FcGoogle className={styles.icon} />
				Log In with Google
			</button>
			<ToastContainer className={styles.toastContainer} />
		</>
	);
};
