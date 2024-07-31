import { Hands } from '../../pages/game-page/ui/hands/hands-main/Hands';
import { Score } from '../../pages/game-page/ui/score/Score';
import styles from './Game.module.scss';

const Main = () => {
	return (
		<main className={styles.wrapper}>
			<Score />
			<Hands />
		</main>
	);
};

export default Main;
