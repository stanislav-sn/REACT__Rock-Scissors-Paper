import { ThreeDots } from 'react-loader-spinner';
import styles from './Loading.module.css';

export const Loading = () => {
	return (
		<div className={styles.container}>
			<div className={`${styles.loading} flexVerticalCenteredColumn`}>
				<ThreeDots color="var(--text-color)" ariaLabel="three-dots-loading" />
				<p>Loading</p>
			</div>
		</div>
	);
};
