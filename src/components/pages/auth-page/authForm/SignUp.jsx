import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import { auth, database } from '../../../../firebase';
import { AuthInput } from './AuthInput';
import { useSignForm } from '../../../../hooks/use-signForm';
import { useError } from '../../../../hooks/use-error';
import { SIGNUP_FORM_LIST } from '../../../../data/formConfig-data';
import styles from './Auth.module.css';
import { useCallback, useMemo } from 'react';

const initialState = {
	name: '',
	email: '',
	password: '',
	isValid: { name: false, email: false, password: false },
};

const writeUserData = async (userUid, name, email) => {
	// Creation user in "Firebase Realtime Database"
	try {
		const userRef = ref(database, `users/${userUid}`);

		await set(userRef, {
			userName: name,
			email: email,
			userScore: 0,
			compScore: 0,
		});

		await updateProfile(auth.currentUser, {
			displayName: name,
		});

		console.log('Data was successfully sent to the server.');
	} catch (error) {
		console.error('Error sending data to the server:', error.message);
	}
};

export const SignUp = () => {
	const { state, onSignData } = useSignForm(initialState);
	const { name, email, password, isValid } = state;

	const allInputsValid = Object.values(isValid).every(Boolean);

	const handleError = useError();

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			// Registration user in "Firebase Authentication"

			if (!allInputsValid) {
				toast.warn('Please fill in all fields correctly.');
				return;
			}

			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				const userUid = userCredential.user.uid;

				if (userUid && name && email) {
					await writeUserData(userUid, name, email);
					console.log(`User ${name} has been successfully registered.`);
				} else {
					console.log(
						`Error, UserID:${userUid}, UserName:${name}, UserEmail:${email}.`
					);
				}
			} catch (error) {
				console.log('Error: ', error.code);
				handleError(error);
			}
		},
		[allInputsValid, email, handleError, name, password]
	);

	const formList = useMemo(
		() =>
			SIGNUP_FORM_LIST.map((input) => (
				<AuthInput key={input.id} onSignData={onSignData} {...input} />
			)),
		[onSignData]
	);

	return (
		<div className={`${styles.signContainer} flexVerticalCenteredColumn`}>
			<h2>Create Account</h2>
			<form
				className={`${styles.form} flexVerticalCenteredColumn`}
				onSubmit={handleSubmit}
			>
				{formList}
				<button type="submit" className="appButtons border">
					Sign Up
				</button>
			</form>
			<ToastContainer className={styles.toastContainer} />
		</div>
	);
};
