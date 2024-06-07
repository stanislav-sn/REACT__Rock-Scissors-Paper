const emailInput = {
	id: 'email',
	type: 'email',
	placeholder: 'E-mail',
	// Why "regex" is a regular expression here and an object "passwordInput"? Super bad idea. Make it consistant.
	regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	// Why "error" is a string here and an object "passwordInput"? Super bad idea. Make it consistant.
	error: 'Invalid email address',
};

const passwordInput = {
	id: 'password',
	type: 'password',
	placeholder: 'Password',
	// Why "regex" is a regular expression in "emailInput" and an object here? Super bad idea. Make it consistant.
	regex: {
		length: /^.{6,}$/,
		chars: /^[A-Za-z0-9_]*$/,
	},
	// Why "error" is a string in "emailInput" and an object here? Super bad idea. Make it consistant.
	error: {
		length: 'Password must be at least 6 chars',
		chars: "Password must only contain 'A-z','0-9','_'",
	},
};

const nameInput = {
	id: 'name',
	type: 'text',
	placeholder: 'User Name',
	// Same problem here as above
	regex: /^[A-Za-zА-Яа-я0-9]{2,10}$/,
	error: "Name must only contain 'Aa','0-9'",
};

export const SIGNIN_FORM_LIST = [emailInput, passwordInput];
export const SIGNUP_FORM_LIST = [nameInput, emailInput, passwordInput];
export const FORGOT_PASSWORD_FORM_LIST = [emailInput];
