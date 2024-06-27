import { useMemo } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';
import { auth, database } from '../../../../firebase';
import { AuthInput } from './AuthInput';
import { useForm } from '../../../../hooks/useForm';
import { handleError } from '../../../../utils/handleError';
import { SIGNUP_FORM_LIST } from '../../../../data/formConfig-data';
import styles from './Auth.module.css';

const initialState = {
	name: { value: '', isValid: false },
	email: { value: '', isValid: false },
	password: { value: '', isValid: false },
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
	const { inputs, onChangeInput } = useForm(initialState);
	const { name, email, password } = inputs;

	const allInputsValid = name.isValid && email.isValid && password.isValid;

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Registration user in "Firebase Authentication"

		if (!allInputsValid) {
			toast.warn('Please fill in all fields correctly.');
			return;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email.value,
				password.value
			);
			const userUid = userCredential.user.uid;

			if (userUid && name.value && email.value) {
				await writeUserData(userUid, name.value, email.value);
				console.log(`User ${name.value} has been successfully registered.`);
			} else {
				console.log(
					`Error, UserID:${userUid}, UserName:${name.value}, UserEmail:${email.value}.`
				);
			}
		} catch (error) {
			console.log('Error: ', error.code);
			console.log('error: ', error);
			handleError(error);
		}
	};

	const formList = useMemo(
		() =>
			SIGNUP_FORM_LIST.map((input) => (
				<AuthInput key={input.id} onChangeInput={onChangeInput} {...input} />
			)),
		[onChangeInput]
	);

	return (
		<div
			className={classNames(styles.formContainer, 'flexVerticalCenteredColumn')}
		>
			<h2>Create Account</h2>
			<form
				className={classNames(styles.form, 'flexVerticalCenteredColumn')}
				onSubmit={handleSubmit}
			>
				{formList}
				<button type="submit" className={classNames('appButtons', 'border')}>
					Sign Up
				</button>
			</form>
			<ToastContainer className={styles.toastContainer} />
		</div>
	);
};
