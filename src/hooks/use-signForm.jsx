import { useReducer, useCallback } from 'react';

// The custom hook useSignForm is used to manage the state of a sign-up form. It takes one parameter:
// - initialState: The initial state of the form fields.

// The hook works as follows:
// - It creates a state and a dispatch function using useReducer with the provided initial state.
// - It provides a callback function onSignData that updates the state when called with new input values and validity.
// - When the input values or their validity change, onSignData dispatches an action to update the state.

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

export function useSignForm(initialState) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const onSignData = useCallback((inputText, inputName, isValid) => {
		dispatch({
			type: 'updateField',
			field: inputName,
			value: inputText,
			isValid,
		});
	}, []);

	return { state, onSignData };
}
