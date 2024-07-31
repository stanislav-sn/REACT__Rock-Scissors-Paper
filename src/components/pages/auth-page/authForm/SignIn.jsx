import { useMemo } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../../../firebase';
import { GoogleAuth } from '../googleAuth/GoogleAuth';
import { AuthInput } from './authInput/AuthInput';
import { useForm } from '../../../../hooks/useForm';
import { handleError } from '../../../../utils/handleError';
import { SIGNIN_FORM_LIST } from '../../../../data/formConfig-data';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AuthForm.module.scss';

const initialState = {
	email: { value: '', isValid: false },
	password: { value: '', isValid: false },
};

export const SignIn = () => {
	const { inputs, onChangeInput } = useForm(initialState);
	const { email, password } = inputs;

	const allInputsValid = email.isValid && password.isValid;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!allInputsValid) {
			toast.warn('Please fill in all fields correctly.');
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, email.value, password.value);
		} catch (error) {
			console.log('Error: ', error);
			handleError(error);
		}
	};

	const formList = useMemo(
		() =>
			SIGNIN_FORM_LIST.map((input) => (
				<AuthInput key={input.id} onChangeInput={onChangeInput} {...input} />
			)),
		[onChangeInput]
	);

	return (
		<div className={styles.formContainer}>
			<h2>Log In</h2>
			<GoogleAuth />
			<span>OR</span>
			<form className={styles.form} onSubmit={handleSubmit}>
				{formList}
				<Link className={styles.forgotPassword} to="/forgot-password">
					Forgot Password?
				</Link>
				<button type="submit" className={styles.btn}>
					Log In
				</button>
			</form>
			<ToastContainer className={styles.toastContainer} />
		</div>
	);
};
