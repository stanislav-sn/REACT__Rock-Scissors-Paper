import { ThreeDots } from 'react-loader-spinner';
import styles from './Loading.module.scss';

export const Loading = () => {
	return (
		<div className={styles.container}>
			<div className={styles.loading}>
				<ThreeDots color="var(--text-color)" ariaLabel="three-dots-loading" />
				<p>Loading</p>
			</div>
		</div>
	);
};
