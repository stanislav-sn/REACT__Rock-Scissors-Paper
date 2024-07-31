import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SignIn } from '../authForm/SignIn';
import { SignUp } from '../authForm/SignUp';
import styles from './AuthMain.module.scss';

export const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

	const handleToggle = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

	return (
		<main className={styles.wrapper}>
			<div className={styles.centeredWrapper}>
				{isMobile ? (
					<div className={styles.formWrapper}>
						{isSignUp ? <SignUp /> : <SignIn />}
						<div className={styles.handle}>
							<p>
								{isSignUp ? 'Already have an account?' : 'Need an account?'}
							</p>
							<button type="button" onClick={handleToggle}>
								{isSignUp ? 'Log In now!' : 'Create account!'}
							</button>
						</div>
					</div>
				) : (
					<>
						<SignIn />
						<div className={styles.divider}>
							<div className={styles.bar} />
							<span>OR</span>
							<div className={styles.bar} />
						</div>
						<SignUp />
					</>
				)}
			</div>
		</main>
	);
};
