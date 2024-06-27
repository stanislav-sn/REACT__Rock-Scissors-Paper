import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import { SignIn } from '../authForm/SignIn';
import { SignUp } from '../authForm/SignUp';
import styles from './AuthMain.module.css';

export const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

	const handleToggle = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

	return (
		<main className={classNames(styles.wrapper, 'flexVerticalCentered')}>
			<div className="flexHorizontalCentered">
				{isMobile ? (
					<div className="flexVerticalCenteredColumn">
						{isSignUp ? <SignUp /> : <SignIn />}
						<div className={classNames(styles.handle, 'flexVerticalCenteredColumn')}>
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
						<div className={classNames(styles.divider, 'flexVerticalCenteredColumn')}>
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
