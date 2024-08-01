import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
	const initialState = {
		name: { value: '', isValid: false },
		email: { value: '', isValid: false },
		password: { value: '', isValid: false },
	};

	test('should initialize with given initial state', () => {
		const { result } = renderHook(() => useForm(initialState));

		expect(result.current.inputs).toEqual(initialState);
	});

	test('should update input value and validity', () => {
		const { result } = renderHook(() => useForm(initialState));

		act(() => {
			result.current.onChangeInput('John Doe', 'name', true);
		});

		expect(result.current.inputs.name).toEqual({
			value: 'John Doe',
			isValid: true,
		});
	});

	test('should update multiple inputs independently', () => {
		const { result } = renderHook(() => useForm(initialState));

		act(() => {
			result.current.onChangeInput('John Doe', 'name', true);
			result.current.onChangeInput('john.doe@example.com', 'email', true);
		});

		expect(result.current.inputs.name).toEqual({
			value: 'John Doe',
			isValid: true,
		});
		expect(result.current.inputs.email).toEqual({
			value: 'john.doe@example.com',
			isValid: true,
		});
	});

	test('should not change other input values when updating one input', () => {
		const { result } = renderHook(() => useForm(initialState));

		act(() => {
			result.current.onChangeInput('John Doe', 'name', true);
		});

		expect(result.current.inputs.email).toEqual({ value: '', isValid: false });
		expect(result.current.inputs.password).toEqual({
			value: '',
			isValid: false,
		});
	});
});
