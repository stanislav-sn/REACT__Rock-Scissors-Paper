import { Hands } from '../../pages/game-page/ui/hands/hands-main/Hands';
import { Score } from '../../pages/game-page/ui/score/Score';

const Main = () => {
	return (
		<main className="game">
			<Score />
			<Hands />
		</main>
	);
};

export default Main;
