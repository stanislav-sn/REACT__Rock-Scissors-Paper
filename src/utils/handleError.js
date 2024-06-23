import { toast } from 'react-toastify';
import { ERRORS_LIST } from '../data/errors-data';
import 'react-toastify/dist/ReactToastify.css';

export const handleError = (err) => {
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
