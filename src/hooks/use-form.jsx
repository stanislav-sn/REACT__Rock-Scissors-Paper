import { useState, useCallback } from 'react';

// The custom hook useForm is used to manage the state of a sign-in and sign-up forms. It takes one parameter:
// - initialState: The initial state of the form fields.

// The hook works as follows:
// - It creates a state "inputs" using useState with the provided initial state.
// - It provides a callback function onChangeInput that updates the state when called with new input values and validity.
// - When the input values or their validity change, onChangeInput dispatches an action to update the state "inputs".

export function useForm(initialState) {

	const [inputs, setInputs] = useState(initialState);

	const onChangeInput = useCallback((inputText, inputName, isValid) => {
		setInputs((prevInputs) => ({
			...prevInputs,
			[inputName]: { value: inputText, isValid },
		}));
	}, []);

	return { inputs, onChangeInput };
}
