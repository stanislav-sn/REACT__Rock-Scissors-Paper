import { memo } from 'react';
import styles from './HandItem.module.css';

export const HandItem = memo(({ id, icon, name, onHandClick }) => {
	return (
		<li id={id}>
			<button onClick={() => onHandClick(id)}>
				<img src={icon} alt=""></img>
				<div className={styles.name}>{name}</div>
			</button>
		</li>
	);
});
