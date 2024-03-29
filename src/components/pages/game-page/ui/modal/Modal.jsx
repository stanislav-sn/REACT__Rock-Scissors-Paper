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
					className={`${styles.modal} ${
						isClosing && styles.close
					} flexVerticalCenteredColumn border`}
					onClick={handleClose}
				>
					<h1>{result}</h1>
					<div className={`${styles.box} flexSpaceBetween`}>
						<div className={styles.player}>
							<p>{userName}</p>
							<img src={userIcon} alt=""></img>
						</div>
						<div className={styles.player}>
							<p>Computer</p>
							<img src={computerIcon} alt=""></img>
						</div>
					</div>
				</div>
			</div>
		)
	);
});
