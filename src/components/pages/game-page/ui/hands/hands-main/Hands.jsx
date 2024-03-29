import { useEffect, useCallback, memo, useReducer } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { auth, database } from '../../../../../../firebase';
import { Hand } from '../Hand-children';
import { HandItem } from '../handItem/HandItem';
import { Modal } from '../../modal/Modal';
import rock from '../../../../../../assets/rock.png';
import scissors from '../../../../../../assets/scissors.png';
import paper from '../../../../../../assets/paper.png';
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

const initialState = {
	computerChoice: null,
	userChoice: null,
	result: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setComputerChoice':
			return {
				...state,
				computerChoice: action.payload,
			};
		case 'setUserChoice':
			return {
				...state,
				userChoice: action.payload,
			};
		case 'setResult':
			return {
				...state,
				result: action.payload,
			};
		default:
			return state;
	}
};

const randomNum = (arr) => {
	return Math.floor(Math.random() * arr.length);
};

export const Hands = memo(() => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { computerChoice, userChoice, result } = state;

	const user = auth.currentUser;

	const onHandHandle = useCallback((id) => {
		const randomId = HANDS_LIST[randomNum(HANDS_LIST)].id;
		dispatch({ type: 'setComputerChoice', payload: randomId });
		dispatch({ type: 'setUserChoice', payload: id });
	}, []);

	const setScore = useCallback(
		async (properties) => {
			const userRef = ref(database, `users/${user.uid}/${properties}/`);
			try {
				await runTransaction(
					userRef,
					(currentValue) => (currentValue || 0) + 1
				);
			} catch (error) {
				console.error('Transaction failed:', error.message);
			}
		},
		[user]
	);

	useEffect(() => {
		const resultGame = () => {
			if (!userChoice) return;

			if (userChoice === computerChoice) return "It's a tie!";

			const wins = {
				ROCK: 'SCISSORS',
				SCISSORS: 'PAPER',
				PAPER: 'ROCK',
			};

			if (wins[userChoice] === computerChoice) {
				setScore('userScore');
				return 'You win!';
			} else {
				setScore('compScore');
				return 'Computer wins!';
			}
		};
		dispatch({ type: 'setResult', payload: resultGame() });
	}, [userChoice, computerChoice, setScore]);

	const handsList = HANDS_LIST.map(({ id, name, icon }) => (
		<HandItem
			key={id}
			id={id}
			name={name}
			icon={icon}
			onHandClick={onHandHandle}
		/>
	));

	const clear = useCallback(() => {
		dispatch({ type: 'setUserChoice', payload: null });
		dispatch({ type: 'setResult', payload: null });
	}, []);

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
			<Hand>
				<ul className="flexSpaceBetween">{handsList}</ul>
			</Hand>
		</div>
	);
});
