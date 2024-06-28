import { useState, useEffect, memo } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { auth, database } from '../../../../../../firebase';
import { HandItem } from '../handItem/HandItem';
import { Modal } from '../../modal/Modal';
import rock from '../../../../../../assets/rock.svg';
import scissors from '../../../../../../assets/scissors.svg';
import paper from '../../../../../../assets/paper.svg';
import styles from './Hands.module.css';

const HANDS_LIST = [
	{
		id: 'ROCK',
		name: 'rock',
		icon: rock,
	},
	{
		id: 'SCISSORS',
		name: 'scissors',
		icon: scissors,
	},
	{
		id: 'PAPER',
		name: 'paper',
		icon: paper,
	},
];

const WIN_CONDITIONS = {
	ROCK: 'SCISSORS',
	SCISSORS: 'PAPER',
	PAPER: 'ROCK',
};

const initialState = {
	computerChoice: null,
	userChoice: null,
	result: null,
};

const getRandomChoice = (arr) => Math.floor(Math.random() * arr.length);

const setScore = async (score) => {
	const user = auth.currentUser;
	if (!user) return;

	const userRef = ref(database, `users/${user.uid}/${score}/`);

	try {
		runTransaction(userRef, (currentValue) =>
			currentValue === null ? 1 : currentValue + 1
		);
	} catch (error) {
		console.error('Transaction failed:', error.message);
	}
};

const calculateResult = (userChoice, computerChoice) => {
	if (!userChoice) return;

	if (userChoice === computerChoice) return "It's a tie!";

	if (WIN_CONDITIONS[userChoice] === computerChoice) {
		setScore('userScore');
		return 'You win!';
	}
	
	setScore('compScore');
	return 'Computer wins!';
};

export const Hands = memo(() => {
	const [state, setState] = useState(initialState);
	const { computerChoice, userChoice, result } = state;

	const handleHandClick = (id) => {
		const randomId = HANDS_LIST[getRandomChoice(HANDS_LIST)].id;
		setState((prevState) => ({
			...prevState,
			computerChoice: randomId,
			userChoice: id,
		}));
	};

	const clear = () => {
		setState(initialState);
	};

	useEffect(() => {
		const result = calculateResult(userChoice, computerChoice);

		if (result) {
			setState((prevState) => ({
				...prevState,
				result,
			}));
		}
	}, [userChoice, computerChoice]);

	return (
		<div className={styles.hands}>
			<h2>Choose hand</h2>
			{result && (
				<Modal
					result={result}
					computerChoice={computerChoice}
					userChoice={userChoice}
					handsList={HANDS_LIST}
					modalHandler={() => clear()}
				/>
			)}
			<ul className="flexSpaceBetween">
				{HANDS_LIST.map((hand) => (
					<HandItem
						key={hand.id}
						{...hand}
						onHandClick={() => handleHandClick(hand.id)}
					/>
				))}
			</ul>
		</div>
	);
});
