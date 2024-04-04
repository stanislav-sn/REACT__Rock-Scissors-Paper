import { memo, useCallback, useState, useMemo } from 'react';
import { useFetchUserProps } from '../../../../../hooks/use-fetchUserProps';
import { auth } from '../../../../../firebase';
import styles from './Modal.module.css';

export const Modal = memo((props) => {
	const [isOpen, setIsOpen] = useState(true);
	const [isClosing, setIsClosing] = useState(false);
	const [userName, setUserName] = useState(null);

	const { modalHandler, result, computerChoice, userChoice, handsList } = props;

	const currentUser = auth.currentUser;

	useFetchUserProps(currentUser, 'userName', setUserName);

	const handleClose = useCallback(() => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
			modalHandler();
		}, 500);
		return () => clearTimeout();
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
						<img className={styles.computerChoice} src={computerIcon} alt=""></img>
					</div>
				</div>
			</div>
		)
	);
});
