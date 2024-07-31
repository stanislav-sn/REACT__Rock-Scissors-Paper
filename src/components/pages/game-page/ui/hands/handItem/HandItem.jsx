import styles from './HandItem.module.scss';

export const HandItem = ({ id, icon, name, onHandClick }) => {
	return (
		<li id={id}>
			<button type="button" onClick={onHandClick}>
				<img src={icon} alt={name} />
				<div className={styles.name}>{name}</div>
			</button>
		</li>
	);
};
