import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';
import { auth } from '../../../firebase';
import { AuthInput } from '../auth-page/authForm/AuthInput';
import { useForm } from '../../../hooks/useForm';
import { handleError } from '../../../utils/handleError';
import { FORGOT_PASSWORD_FORM_LIST } from '../../../data/formConfig-data';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ForgotPassword.module.css';

const initialState = {
	email: { value: '', isValid: false },
};

export const ForgotPassword = () => {
	const { inputs, onChangeInput } = useForm(initialState);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email } = inputs;

		if (!email.isValid) {
			toast.warn('Please fill in all fields correctly.');
			return;
		}

		try {
			await sendPasswordResetEmail(auth, email.value);
			alert('Password reset email sent!');
			navigate('/auth');
		} catch (error) {
			console.log('Error: ', error.code);
			handleError(error);
		}
	};

	const handleLinkBack = () => {
		navigate('/auth');
	};

	const formList = useMemo(
		() =>
			FORGOT_PASSWORD_FORM_LIST.map((input) => (
				<AuthInput key={input.id} onChangeInput={onChangeInput} {...input} />
			)),
		[onChangeInput]
	);

	return (
		<div className={classNames(styles.wrapper, 'flexAllCenteredColumn')}>
			<h1>Forgot Password</h1>
			<form
				className={classNames(styles.form, 'flexVerticalCenteredColumn')}
				onSubmit={handleSubmit}
			>
				{formList}
				<button
					className={classNames(styles.btn, 'appButtons', 'border')}
					type="submit"
				>
					Reset Password
				</button>
			</form>
			<button
				type="button"
				className={classNames(styles.btn, 'appButtons', 'border')}
				onClick={handleLinkBack}
			>
				Back
			</button>
			<ToastContainer className={styles.toastContainer} />
		</div>
	);
};
