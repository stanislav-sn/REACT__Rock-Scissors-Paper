import { toast } from 'react-toastify';
import { ERRORS_LIST } from '../data/errors-data';
import 'react-toastify/dist/ReactToastify.css';

// The custom hook "useError" is designed to handle errors. 
// It returns a function that takes an error object, finds a matching error in ERRORS_LIST, 
// and displays a warning message using toast.warn.
// If no matching error is found, it logs the error to the console.

export const useError = () => {
	return (err) => {
		const error = ERRORS_LIST.find((error) => error.code === err.code);
		if (!error) {
			console.error(err);
		} else {
			toast.warn(error.message, {
				closeOnClick: true,
				theme: 'dark',
			});
		}
	};
};
