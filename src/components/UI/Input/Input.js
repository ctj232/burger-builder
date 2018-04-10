import React from 'react';
import styles from './Input.css';

const input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case ('input'):
			inputElement = <input className={styles.InputElement} {...props.elementConfig}  value={props.value}/>
			break;
		case ('textarea'):
			inputElement = <textarea className={styles.InputElement} {...props.elementConfig} value={props.value} />
			break;
		case ('select'):
			inputElement = (
				<select className={styles.InputElement} value={props.value}>{props.elementConfig.options.map(opt => (
					<option value={opt.value}>{opt.displayValue}</option>
				))}</select>
				)
			break;
		default:
			inputElement = <input className={styles.InputElement}  value={props.value}/>
			break;
	}
	return (
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{ inputElement }
		</div>
	);
};

export default input;
