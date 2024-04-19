import { useReducer, useEffect, useCallback, useMemo, useContext, memo } from 'react';
import { UserContext } from '../../../../../providers/UserProvider';
import styles from './Modal.module.css';

const initialState = {
	isOpen: true,
	isClosing: false,
	userName: 'user',
};

function reducer(state, action) {
	switch (action.type) {
		case 'SET_USER_NAME':
			return { ...state, userName: action.userName };
		case 'IS_OPEN':
			return { ...state, isOpen: false };
		case 'IS_CLOSING':
			return { ...state, isClosing: true };
		default:
			throw new Error();
	}
}

export const Modal = memo((props) => {
	const contextAPI = useContext(UserContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	const { statsDB } = contextAPI;
	const { modalHandler, result, computerChoice, userChoice, handsList } = props;
	const { userName, isOpen, isClosing } = state;

	useEffect(() => {
		if (statsDB.userName) {
			dispatch({ type: 'SET_USER_NAME', userName: statsDB.userName });
		}
	}, [statsDB.userName]);

	const handleClose = useCallback(() => {
		dispatch({ type: 'IS_CLOSING' });
		const timerId = setTimeout(() => {
			dispatch({ type: 'IS_OPEN' });
			modalHandler();
		}, 500);
		return () => clearTimeout(timerId);
	}, [modalHandler]);

	const computerIcon = useMemo(
		() => handsList.find((hand) => hand.id === computerChoice).icon,
		[computerChoice, handsList]
	);
	const userIcon = useMemo(
		() => handsList.find((hand) => hand.id === userChoice).icon,
		[userChoice, handsList]
	);

	return (
		isOpen && (
			<div className="overlay" onClick={handleClose}>
				<div
					className={`${styles.modal} ${isClosing && styles.close} border`}
					onClick={handleClose}
				>
					<h1>{result}</h1>
					<div className={`${styles.box}`}>
						<p className={styles.userName}>{userName}</p>
						<img className={styles.userChoice} src={userIcon} alt=""></img>
						<p className={styles.computerName}>Computer</p>
						<img
							className={styles.computerChoice}
							src={computerIcon}
							alt=""
						></img>
					</div>
				</div>
			</div>
		)
	);
});
