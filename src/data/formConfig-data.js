const emailInput = {
	id: 'email',
	type: 'email',
	placeholder: 'E-mail',
	regex: {
		pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	},
	error: {
		message: 'Invalid email address',
	},
};

const passwordInput = {
	id: 'password',
	type: 'password',
	placeholder: 'Password',
	regex: {
		length: /^.{6,}$/,
		chars: /^[A-Za-z0-9_]*$/,
	},
	error: {
		length: 'Password must be at least 6 chars',
		chars: "Password must only contain 'A-z','0-9','_'",
	},
};

const nameInput = {
	id: 'name',
	type: 'text',
	placeholder: 'User Name',
	regex: {
		pattern: /^[A-Za-zА-Яа-я0-9]{2,10}$/,
	},
	error: {
		message: "Name must only contain 'Aa','0-9'",
	},
};

export const SIGNIN_FORM_LIST = [emailInput, passwordInput];
export const SIGNUP_FORM_LIST = [nameInput, emailInput, passwordInput];
export const FORGOT_PASSWORD_FORM_LIST = [emailInput];
