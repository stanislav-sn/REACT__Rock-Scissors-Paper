import { memo } from 'react';
import styles from './HandItem.module.css';

// Why every component is used with memo? It is not normal.
export const HandItem = memo(({ id, icon, name, onHandClick }) => {
	return (
		<li id={id}>
			{/* You had "id" outside. Why "onHandClick" needs it here? */}
			{/* Should look like this <button onClick={onHandClick}> */}
			<button onClick={() => onHandClick(id)}>
				{/* Tag img should not have a closing part and alt attribute is optional but much needed */}
				<img src={icon} alt=""></img>
				<div className={styles.name}>{name}</div>
			</button>
		</li>
	);
});
