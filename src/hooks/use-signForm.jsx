import { useReducer, useCallback } from 'react';

// The custom hook useSignForm is used to manage the state of a sign-up form. It takes one parameter:
// - initialState: The initial state of the form fields.

// The hook works as follows:
// - It creates a state and a dispatch function using useReducer with the provided initial state.
// - It provides a callback function onSignData that updates the state when called with new input values and validity.
// - When the input values or their validity change, onSignData dispatches an action to update the state.

// Why you always use "useReducer"? What is the reason behind it? It does not make any sence here. You only have ONE action type.
function reducer(state, action) {
	switch (action.type) {
		case 'updateField':
			return {
				...state,
				[action.field]: action.value,
				isValid: { ...state.isValid, [action.field]: action.isValid },
			};
		default:
			return state;
	}
}

// Bad name. You do not signing here anything. Call it just "useForm"
export function useSignForm(initialState) {
	// Create simple state with "useState" hook (inputs/setInputs).
	// Your state should look like this "{ email: { value: "", isValid: false }, password: { value: "", isValid: false } }"
	const [state, dispatch] = useReducer(reducer, initialState);

	// Bad name. There is no any signing here. Call it "onChange/onChangeInput".
	const onSignData = useCallback((inputText, inputName, isValid) => {
		// With simple state, updating input will look like this:
		// setInputs(prevInputs => ({ ...prevInputs, [inputName]: { value: inputText, isValid } }));
		dispatch({
			type: 'updateField',
			field: inputName,
			value: inputText,
			isValid,
		});
	}, []);

	// return this { inputs, onChange };
	return { state, onSignData };
}
