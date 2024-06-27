import { ThreeDots } from 'react-loader-spinner';
import classNames from 'classnames';
import styles from './Loading.module.css';

export const Loading = () => {
	return (
		<div className={styles.container}>
			<div className={classNames(styles.loading, 'flexVerticalCenteredColumn')}>
				<ThreeDots color="var(--text-color)" ariaLabel="three-dots-loading" />
				<p>Loading</p>
			</div>
		</div>
	);
};
