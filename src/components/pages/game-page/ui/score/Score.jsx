import { update } from 'firebase/database';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Loading } from '../../../../shared/loading/Loading';
import { UserContext } from '../../../../../providers/UserProvider';
import '../../../../../index.css';
import styles from './Score.module.css';

export const Score = () => {
	const contextAPI = useContext(UserContext);
	const [data, setData] = useState({
		userName: 'user',
		userScore: 0,
		compScore: 0,
	});

	const { statsDB, userRef } = contextAPI;

	const { userName, userScore, computerScore } = data;

	useEffect(() => {
		if (statsDB) {
			setData((prevState) => ({
				...prevState,
				userName: statsDB.userName,
				userScore: statsDB.userScore,
				computerScore: statsDB.compScore,
			}));
		}
	}, [statsDB]);

	const handleReset = useCallback(async () => {
		if (userRef) {
			try {
				await update(userRef, {
					userScore: 0,
					compScore: 0,
				});
			} catch (error) {
				console.error('Reset failed:', error.message);
			}
		}
	}, [userRef]);

	return (
		<>
			{!statsDB && <Loading />}
			<div className={styles.score}>
				<div className={styles.title}>SCORE</div>
				<div className={`${styles.quantity} flexSpaceBetween`}>
					<div className={styles.gamer}>{userName}:</div>
					<span>{userScore}</span>
				</div>
				<div className={`${styles.quantity} flexSpaceBetween`}>
					<div className={styles.gamer}>Computer:</div>
					<span>{computerScore}</span>
				</div>
				<button
					onClick={handleReset}
					className={`${styles.reset} appButtons border`}
				>
					Reset
				</button>
			</div>
		</>
	);
};
