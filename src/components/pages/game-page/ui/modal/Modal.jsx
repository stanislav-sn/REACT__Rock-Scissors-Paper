import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { UserContext } from '../../../../../providers/UserProvider';
import styles from './Modal.module.css';

export const Modal = ({modalHandler, result, computerChoice, userChoice, handsList}) => {
	const { statsDB } = useContext(UserContext);
	const [state, setState] = useState({
		isOpen: true,
		isClosing: false,
		userName: 'user',
	});

	const { userName, isOpen, isClosing } = state;

	const setUserName = (userName) =>
		setState((prevState) => ({ ...prevState, userName }));

	const closeModal = () =>
		setState((prevState) => ({ ...prevState, isOpen: false }));

	const startClosingModal = () =>
		setState((prevState) => ({ ...prevState, isClosing: true }));
	
	const stopClosingModal = () =>
		setState((prevState) => ({ ...prevState, isClosing: false }));

	useEffect(() => {
		if (statsDB.userName) {
			setUserName(statsDB.userName);
		}
	}, [statsDB.userName]);

	const handleClose = () => {
		startClosingModal();

		const timerId = setTimeout(() => {
			setState((prevState) => ({
				...prevState,
				isOpen: false,
			}));

			closeModal();
			modalHandler();
		}, 500);

		return () => {
			clearTimeout(timerId);
			stopClosingModal();
		};
	};

	const computerHand = handsList.find((hand) => hand.id === computerChoice);
	const userHand = handsList.find((hand) => hand.id === userChoice);

	const computerIcon = computerHand ? computerHand.icon : null;
	const userIcon = userHand ? userHand.icon : null;

	return isOpen ? (
		<div className="overlay" onClick={handleClose}>
			<div
				className={classNames(styles.modal, {[styles.close]: isClosing}, 'border')}
				onClick={handleClose}
			>
				<h1>{result}</h1>
				<div className={styles.box}>
					<p className={styles.userName}>{userName}</p>
					<img className={styles.userChoice} src={userIcon} alt="User Choice" />
					<p className={styles.computerName}>Computer</p>
					<img
						className={styles.computerChoice}
						src={computerIcon}
						alt="Computer Choice"
					/>
				</div>
			</div>
		</div>
	) : null;
};
