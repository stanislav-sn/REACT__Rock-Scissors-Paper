import { useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import rulesData from '../../../../data/rules';
import styles from './Rules.module.css';

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
			<button
				className={`${styles.btn} appButtons border`}
				onClick={toggleRules}
			>
				Show rules
			</button>
			{isOpen && (
				<div className="overlay" onClick={handleClose}>
					<div
						className={`${styles.modal} ${
							isClosing ? styles.closing : ''
						} border`}
						onClick={(e) => e.stopPropagation()}
					>
						<div className={styles.container}>
							<button onClick={handleClose}>
								<IoCloseOutline className={styles.icon} />
							</button>
							<h1>Rock, Paper, Scissors - Against the Computer</h1>
							<h2>Rules:</h2>
							<ol>
								{rulesData.map((rule, index) => (
									<li key={index}>
										<span>{rule.title}</span>
										<ul>
											{rule.content.map((contentItem, idx) => (
												<li key={idx}>{contentItem}</li>
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
