import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { AuthInput } from '../auth-page/authForm/AuthInput';
import { useSignForm } from '../../../hooks/use-signForm';
import { useError } from '../../../hooks/use-error';
import { FORGOT_PASSWORD_FORM_LIST } from '../../../data/formConfig-data';
import styles from './ForgotPassword.module.css';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
	email: '',
	isValid: { email: false },
};

export const ForgotPassword = () => {
	const { state, onSignData } = useSignForm(initialState);
	// Move it inside "handleSubmit" function. You use it only there.
	const { email, isValid } = state;

	const navigate = useNavigate();

	// Move it inside "handleSubmit" function. You use it only there.
	const allInputsValid = Object.values(isValid).every(Boolean);

	const handleError = useError();

	// No reason to use "useCallback" here
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			if (!allInputsValid) {
				toast.warn('Please fill in all fields correctly.');
				return;
			}

			try {
				await sendPasswordResetEmail(auth, email);
				alert('Password reset email sent!');
				navigate('/auth');
			} catch (error) {
				console.log('Error: ', error.code);
				handleError(error);
			}
		},
		[allInputsValid, handleError, navigate, email]
	);

	// No reason to use "useCallback" here
	const handleLinkBack = useCallback(() => {
		navigate('/auth');
	}, [navigate]);

	// No reason to use "useMemo" here
	const formList = useMemo(() => {
		// Render it inside JSX
		return FORGOT_PASSWORD_FORM_LIST.map(
			// Skip destructuring and just spread input data to "AuthInput"
			({ id, type, placeholder, regex, error }) => (
				<AuthInput
					key={id}
					id={id}
					type={type}
					placeholder={placeholder}
					regex={regex}
					error={error}
					onSignData={onSignData}
				/>
			)
		);
	}, [onSignData]);

	return (
		<div className={`${styles.wrapper} flexAllCenteredColumn`}>
			<h1>Forgot Password</h1>
			<form
				className={`${styles.form} flexVerticalCenteredColumn`}
				onSubmit={handleSubmit}
			>
				{formList}
				<button className={`${styles.btn} appButtons border`} type="submit">
					Reset Password
				</button>
			</form>
			<button
				{/* Add button type */}
				className={`${styles.btn} appButtons border`}
				onClick={handleLinkBack}
			>
				Back
			</button>
			<ToastContainer className={styles.toastContainer} />
		</div>
	);
};
