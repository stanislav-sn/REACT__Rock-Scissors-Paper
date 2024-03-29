import { useCallback, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styles from './Rules.module.css';

export const Rules = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleClose = useCallback(() => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 500);
		return () => clearTimeout();
	}, []);

	const handleShow = () => setIsOpen(!isOpen);

	return (
		<>
			<button
				className={`${styles.btn} appButtons border`}
				onClick={handleShow}
			>
				Show rules
			</button>

			{isOpen && (
				<div className="overlay" onClick={handleClose}>
					<div
						className={`${styles.modal} ${isClosing && styles.closing} border`}
						onClick={(e) => e.stopPropagation()}
					>
						<div className={`${styles.container}`}>
							<button onClick={handleClose}>
								<IoCloseOutline className={styles.icon} />
							</button>
							<h1>Rock, Paper, Scissors - Against the Computer</h1>
							<h2>Rules:</h2>
							<ol>
								<li>
									<span>Players:</span>
									<ul>
										<li>
											User: Chooses a hand gesture by clicking on the
											corresponding button (Rock, Scissors, Paper).
										</li>
										<li>Computer: Automatically selects its hand gesture.</li>
									</ul>
								</li>
								<li>
									<span>Hand Gestures:</span>
									<ul>
										<li>
											Rock, Scissors, Paper - same as in the classic game.
										</li>
									</ul>
								</li>
								<li>
									<span>Determining the Winner:</span>
									<ul>
										<li>Rock defeats Scissors.</li>
										<li>Scissors defeat Paper.</li>
										<li>Paper defeats Rock.</li>
									</ul>
								</li>
								<li>
									<span>Scoring:</span>
									<ul>
										<li>
											After each round, if there is a winner, they receive +1
											point in the Score field.
										</li>
										<li>
											A tie does not affect the score, no points are added.
										</li>
									</ul>
								</li>
								<li>
									<span>Resetting Scores:</span>
									<ul>
										<li>
											The player can click the "Reset" button to reset the score
											and start anew.
										</li>
									</ul>
								</li>
								<li>
									<span>Gameplay:</span>
									<ul>
										<li>The player selects their hand gesture.</li>
										<li>
											The computer automatically selects its hand gesture.
										</li>
										<li>
											The winner is determined, and the score is updated if
											there is a winner.
										</li>
										<li>
											Information about each player's choice and the current
											score is displayed.
										</li>
										<li>The game continues with a new round.</li>
									</ul>
								</li>
								<li>
									<span>Ending the Game and Progress Saving:</span>
									<ul>
										<li>The game can continue indefinitely.</li>
										<li>The player can choose to end the game at any time.</li>
										<li>
											Upon exiting the game and returning after some time, the
											User and Computer scores will be saved, allowing the
											player to resume the game with the current score.
										</li>
									</ul>
								</li>
								<li>
									<span>Interface:</span>
									<ul>
										<li>
											Buttons for choosing hand gestures (Rock, Scissors,
											Paper).
										</li>
										<li>Field for displaying choices and the current score.</li>
										<li>"Reset" button for score reset.</li>
									</ul>
								</li>
							</ol>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
