import { useCallback, useReducer } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import styles from './Auth.module.css';

// Replace with simple state
const initialState = {
	showError: null,
	showPassword: false,
};

// Remove after implementing simple state
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

// In general bad component. Better to handle text and password input in different files.
export const AuthInput = (props) => {
	// Destructure it immediately on line 32
	const { id, type, placeholder, regex, error, onSignData } = props;

	// Don't use "useReducer" for such simple state. It is overkill. Makes your code super complex for no reason.
	// Create 2 different states - errorMessage and showPassword
	const [state, dispatch] = useReducer(reducer, initialState);

	// Sound like state is two boolean values but nope - one is boolean and other can be null/string. Very bad solution and naming.
	const { showError, showPassword } = state;

	// You don't need "useCallback" here. Almost every component the same mistake. Learn how to memoize correctly.
	const handleInputChange = useCallback(
		(event) => {
			const text = event.target.value;
			// Before I dive into a code below, I can't say what type of this variables.
			let valid;
			let errorType;

			if (type === 'password') {
				// Move this two outside of the component as helper fucntions.
				const validLength = text === '' || regex.length.test(text);
				const validChars = text === '' || regex.chars.test(text);

				// This is very bad solution. Hard to read and maintain.
				// It could look like this:
				// valid = validLength && validChars;
				// errorType = valid ? null : validLength ? 'chars' : 'length';
				errorType = !validLength ? 'length' : !validChars ? 'chars' : null;
				valid = validLength && validChars;
			} else {
				// Very bad type selection. There is no consistancy. Here "regex" prop is regular expression, but in the code above
				// "regex" prop is an object with regular expressions. Not obvious at all. Very bad solution. Same with "error" prop.
				valid = text === '' || regex.test(text);
				// Error type is not even doing anything if input type === "password". Why you handle it then? This code does nothing.
				errorType = valid ? null : 'error';
			}

			// With simple state would look like this:
			// const isError = errorType !== null;
        		// const message = type === 'password' ? error[errorType] : error;
        		// setErrorMessage(isError ? message : null);
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

	// No reason for "useCallback" again.
	const toggleInputType = useCallback(() => {
		// With simple state would look like this:
		// setShowPassword(prev => !prev);
		// function to switch between password and text type of the input field
		dispatch({ type: 'toggleShowPassword' });
	}, []);

	return (
		<div className={styles.inputBox}>
			<input
				{/* "showError" is error message state. With your logic it can be null or string. When it is null - className will look like this:
    				"null border" */}
				className={`${showError && styles.inputError} border`}
				type={showPassword ? 'text' : type}
				placeholder={placeholder}
				{/* Just onChange={handleInputChange} */}
				onChange={(e) => handleInputChange(e)}
			/>
			
			{/* Stupid name and it looks like you want to display boolean value in this div */}
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
