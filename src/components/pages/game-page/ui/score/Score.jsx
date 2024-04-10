import { update } from 'firebase/database';
import { useCallback, useState } from 'react';
import { auth } from '../../../../../firebase';
import { Loading } from '../../../../shared/loading/Loading';
import { useFetchUserProps } from '../../../../../hooks/use-fetchUserProps';
import { useFetchUser } from '../../../../../hooks/use-fetchUser';
import '../../../../../index.css';
import styles from './Score.module.css';

export const Score = () => {
	const [data, setData] = useState({
		userName: '',
		userScore: 0,
		compScore: 0,
	});
	
	const { userName, userScore, computerScore } = data;
	const currentUser = auth.currentUser;
	const userDataRef = useFetchUser(currentUser);

	useFetchUserProps(currentUser, setData);

	const handleReset = useCallback(async () => {
		if (userDataRef) {
			try {
				await update(userDataRef, {
					userScore: 0,
					compScore: 0,
				});
			} catch (error) {
				console.error('Reset failed:', error.message);
			}
		}
	}, [userDataRef]);

	return (
		<>
			{!userName && <Loading />}
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
