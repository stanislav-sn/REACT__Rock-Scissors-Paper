import { useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { nanoid } from 'nanoid';
import { RULES_LIST } from '../../../../data/rules-data';
import styles from './Rules.module.scss';

export const Rules = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const timeoutRef = useRef(null);

	const handleClose = () => {
		setIsClosing(true);
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 500);
	};

	const toggleRules = () => {
		if (isOpen && timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
			setIsClosing(false);
		}
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button type="button" className={styles.btn} onClick={toggleRules}>
				Show rules
			</button>
			{isOpen && (
				<div className="overlay" onClick={handleClose}>
					<div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
						<div className={styles.container}>
							<button type="button" onClick={handleClose}>
								<IoCloseOutline className={styles.icon} />
							</button>
							<h1>Rock, Paper, Scissors - Against the Computer</h1>
							<h2>Rules:</h2>
							<ol>
								{RULES_LIST.map((rule) => (
									<li key={nanoid()}>
										<span>{rule.title}</span>
										<ul>
											{rule.content.map((contentItem) => (
												<li key={nanoid()}>{contentItem}</li>
											))}
										</ul>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
