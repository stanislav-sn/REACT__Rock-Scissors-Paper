import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import classNames from 'classnames';
import styles from './Auth.module.css';

const validateInput = (text, type, regex) => {
	let isInputValid;
	let errorKey;

	if (type === 'password') {
		const validLength = text === '' || regex.length.test(text);
		const validChars = text === '' || regex.chars.test(text);
		isInputValid = validLength && validChars;
		errorKey = isInputValid ? null : validLength ? 'chars' : 'length';
	} else {
		isInputValid = text === '' || regex.pattern.test(text);
		errorKey = isInputValid ? null : 'error';
	}

	return { isInputValid, errorKey };
};

export const AuthInput = ({
	id,
	type,
	placeholder,
	regex,
	error,
	onChangeInput,
}) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleInputChange = (event) => {
		const text = event.target.value;

		const { isInputValid, errorKey } = validateInput(text, type, regex);

		const isError = errorKey !== null;
		const message = type === 'password' ? error[errorKey] : error.message;

		setErrorMessage(isError ? message : null);

		onChangeInput(text, id, isInputValid);
	};

	const toggleInputType = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className={styles.inputBox}>
			<input
				className={classNames({[styles.inputError]: errorMessage}, 'border')}
				type={showPassword ? 'text' : type}
				placeholder={placeholder}
				onChange={handleInputChange}
			/>
			{errorMessage && (
				<div className={styles.errorMessage}>{errorMessage}</div>
			)}
			{type === 'password' && (
				<button
					type="button"
					onClick={toggleInputType}
					className={styles.togglePasswordIcon}
				>
					{showPassword ? <IoMdEye /> : <IoMdEyeOff />}
				</button>
			)}
		</div>
	);
};
