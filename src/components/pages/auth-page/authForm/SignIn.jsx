import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../../../firebase';
import { GoogleAuth } from '../googleAuth/GoogleAuth';
import { AuthInput } from './AuthInput';
import { useSignForm } from '../../../../hooks/use-signForm';
import { useError } from '../../../../hooks/use-error';
import { SIGNIN_FORM_LIST } from '../../../../data/formConfig-data';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Auth.module.css';
import { useCallback, useMemo } from 'react';

const initialState = {
	email: '',
	password: '',
	isValid: { email: false, password: false },
};

export const SignIn = () => {
	const { state, onSignData } = useSignForm(initialState);
	const { email, password, isValid } = state;

	const allInputsValid = Object.values(isValid).every(Boolean);

	const handleError = useError();

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			if (!allInputsValid) {
				toast.warn('Please fill in all fields correctly.');
				return;
			}

			try {
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error) {
				console.log('Error: ', error);
				handleError(error);
			}
		},
		[allInputsValid, email, password, handleError]
	);

	const formList = useMemo(
		() =>
			SIGNIN_FORM_LIST.map((input) => (
				<AuthInput key={input.id} onSignData={onSignData} {...input} />
			)),
		[onSignData]
	);

	return (
		<div className={`${styles.signContainer} flexVerticalCenteredColumn`}>
			<h2>Log In</h2>
			<GoogleAuth />
			<span>OR</span>
			<form
				className={`${styles.form} flexVerticalCenteredColumn`}
				onSubmit={handleSubmit}
			>
				{formList}
				<Link className={styles.forgotPassword} to="/forgot-password">
					Forgot Password?
				</Link>
				<button type="submit" className="appButtons border">
					Log In
				</button>
			</form>
			<ToastContainer className={styles.toastContainer} />
		</div>
	);
};
