import { useReducer, useEffect, useCallback, useMemo, useContext, memo } from 'react';
import { UserContext } from '../../../../../providers/UserProvider';
import styles from './Modal.module.css';

// Remove after implementing 3 simple states
const initialState = {
	isOpen: true,
	isClosing: false,
	userName: 'user',
};

// This reducer does nothing. It is super complex comparing to 3 simple states "userName/isOpen/isClosing".
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

// Why "memo"?
export const Modal = memo((props) => {
	// Destructure it immediately to get statsDB
	const contextAPI = useContext(UserContext);
	// Create 3 simple states instead of this. No reason to use reducer here
	const [state, dispatch] = useReducer(reducer, initialState);

	const { statsDB } = contextAPI;
	// Desctructure this immediately on line 26
	const { modalHandler, result, computerChoice, userChoice, handsList } = props;
	const { userName, isOpen, isClosing } = state;

	useEffect(() => {
		if (statsDB.userName) {
			// setUserName(statsDB.userName)
			dispatch({ type: 'SET_USER_NAME', userName: statsDB.userName });
		}
	}, [statsDB.userName]);

	// No reason for "useCallback"
	const handleClose = useCallback(() => {
		// How should I know what this dispatch does? Closing or opening or something else? Bad name and no reason for reducer/dispatch
		// setIsClosing(false);
		dispatch({ type: 'IS_CLOSING' });
		const timerId = setTimeout(() => {
			// How should I know what this dispatch does? Closing or opening or something else? Bad name and no reason for reducer/dispatch
			// setIsOpen(false);
			dispatch({ type: 'IS_OPEN' });
			modalHandler();
		}, 500);
		// It is enough to just clear timeout. No need to return a function.
		return () => clearTimeout(timerId);
	}, [modalHandler]);

	// You have "handsList" and both "choices" outside. You use them only to get icon's src. Just do it outside and path both src in this component.
	// Do it without "useMemo"
	const computerIcon = useMemo(
		() => handsList.find((hand) => hand.id === computerChoice).icon,
		[computerChoice, handsList]
	);
	const userIcon = useMemo(
		() => handsList.find((hand) => hand.id === userChoice).icon,
		[userChoice, handsList]
	);

	// When "isOpen" === false - you render false. It is an error in earlier React versions.
	return (
		isOpen && (
			<div className="overlay" onClick={handleClose}>
				<div
					{/* When "isClosing" === false - you get this className: "false border" */}
					className={`${styles.modal} ${isClosing && styles.close} border`}
					onClick={handleClose}
				>
					<h1>{result}</h1>
					<div className={`${styles.box}`}>
						<p className={styles.userName}>{userName}</p>
						{/* Tag image does not have a closing part and should have alt attribute */}
						<img className={styles.userChoice} src={userIcon} alt=""></img>
						<p className={styles.computerName}>Computer</p>
						{/* Tag image does not have a closing part and should have alt attribute */}
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
