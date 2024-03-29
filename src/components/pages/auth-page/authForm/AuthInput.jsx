import { useCallback, useReducer } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import styles from './Auth.module.css';

const initialState = {
	showError: null,
	showPassword: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setShowError':
			return {
				...state,
				showError: action.payload,
			};
		case 'toggleShowPassword':
			return {
				...state,
				showPassword: !state.showPassword,
			};
		case 'setIsValid':
			return {
				...state,
				isValid: action.payload,
			};
		default:
			return state;
	}
};

export const AuthInput = (props) => {
	const { id, type, placeholder, regex, error, onSignData } = props;

	const [state, dispatch] = useReducer(reducer, initialState);

	const { showError, showPassword } = state;

	const handleInputChange = useCallback(
		(event) => {
			const text = event.target.value;
			let valid;
			let errorType;

			if (type === 'password') {
				const validLength = text === '' || regex.length.test(text);
				const validChars = text === '' || regex.chars.test(text);
				errorType = !validLength ? 'length' : !validChars ? 'chars' : null;
				valid = validLength && validChars;
			} else {
				valid = text === '' || regex.test(text);
				errorType = valid ? null : 'error';
			}

			dispatch({
				type: 'setShowError',
				payload: errorType
					? type === 'password'
						? error[errorType]
						: error
					: null,
			});
			onSignData(text, id, valid);
		},
		[id, onSignData, regex, error, type]
	);

	const toggleInputType = useCallback(() => {
		// function to switch between password and text type of the input field
		dispatch({ type: 'toggleShowPassword' });
	}, []);

	return (
		<div className={styles.inputBox}>
			<input
				className={`${showError && styles.inputError} border`}
				type={showPassword ? 'text' : type}
				placeholder={placeholder}
				onChange={(e) => handleInputChange(e)}
			/>
			{showError && <div className={styles.errorMessage}>{showError}</div>}
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
