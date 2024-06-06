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

// There is no sence to multiply already random number on some random array length. Result gonna be the same - random number
const randomNum = (arr) => {
	return Math.floor(Math.random() * arr.length);
};

export const Hands = memo(() => {
	// Why reducer? It makes your code for no reason complicated. Use simple useState here.
	const [state, dispatch] = useReducer(reducer, initialState);

	const { computerChoice, userChoice, result } = state;

	// Useless variable
	const user = auth.currentUser;

	// Bad name. Tells nothing.
	// Why useCallback? No reason as for me.
	const onHandHandle = useCallback((id) => {
		const randomId = HANDS_LIST[randomNum(HANDS_LIST)].id;
		dispatch({ type: 'setComputerChoice', payload: randomId });
		dispatch({ type: 'setUserChoice', payload: id });
	}, []);

	const setScore = useCallback(
		// Bad name for parameter. Maybe "score"?
		async (properties) => {
			const userRef = ref(database, `users/${user.uid}/${properties}/`);
			try {
				// You don't need async/await here. As long as you do nothing after
				await runTransaction(
					userRef,
					// Not easy to read it as for me. Maybe better do it with if/else
					(currentValue) => (currentValue || 0) + 1
				);
			} catch (error) {
				console.error('Transaction failed:', error.message);
			}
		},
		// It can really change?
		[user]
	);

	useEffect(() => {
		// This function is created on each render. Maybe better to create it once outside of the component.
		const resultGame = () => {
			if (!userChoice) return;

			if (userChoice === computerChoice) return "It's a tie!";

			// Create constant outside with better name. WIN_CONDITIONS, for example
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

	// Don't like this solution. Render JSX in JSX.
	// Skip destructuring. Use variable ("hand") and just spread it to the component {...hand}
	const handsList = HANDS_LIST.map(({ id, name, icon }) => (
		<HandItem
			key={id}
			id={id}
			name={name}
			icon={icon}
			// onHandHandle awaits "id" parameter and you already have it. Do this instead: () => onHandHandle(hand.id)
			onHandClick={onHandHandle}
		/>
	));

	// Why useCallback? Seems no reason.
	// Why don't reset computer choice?
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
					// useCallback, then another function wrapper, another useCallback inside Modal. Why?
					modalHandler={() => clear()}
				/>
			)}
			{/* Hand component does nothing. It is just the React.Fragment. Remove it. */}
			<Hand>
				{/* Render list here directly */}
				<ul className="flexSpaceBetween">{handsList}</ul>
			</Hand>
		</div>
	);
});
