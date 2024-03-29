import { SignIn } from '../authForm/SignIn';
import { SignUp } from '../authForm/SignUp';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import styles from './AuthMain.module.css';

export const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

	const handleToggle = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

	return (
		<main className={`${styles.wrapper} flexVerticalCentered`}>
			<div className="flexHorizontalCentered">
				{isMobile ? (
					<div className="flexVerticalCenteredColumn">
						{isSignUp ? <SignUp /> : <SignIn />}
						<div className={`${styles.handle} flexVerticalCenteredColumn`}>
							<p>
								{isSignUp ? 'Already have an account?' : 'Need an account?'}
							</p>
							<button onClick={handleToggle}>
								{isSignUp ? 'Log In now!' : 'Create account!'}
							</button>
						</div>
					</div>
				) : (
					<>
						<SignIn />
						<div className={`${styles.divider} flexVerticalCenteredColumn`}>
							<div className={styles.bar}></div>
							<span>OR</span>
							<div className={styles.bar}></div>
						</div>
						<SignUp />
					</>
				)}
			</div>
		</main>
	);
};
