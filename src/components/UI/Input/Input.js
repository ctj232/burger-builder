import React from 'react';
import styles from './Input.css';

const input = (props) => {
	let inputElement = null;
	const inputClasses = [styles.InputElement]

	let validationError = null;
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(styles.Invalid)
		validationError = <p>Invalid value!</p>
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value}/>
			break;
		case ('textarea'):
			inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig}  onChange={props.changed} value={props.value} />
			break;
		case ('select'):
			inputElement = (
				<select className={inputClasses.join(' ')} onChange={props.changed} value={props.value}>{props.elementConfig.options.map(opt => (
					<option value={opt.value} key={opt.value}>{opt.displayValue}</option>
				))}</select>
				)
			break;
		default:
			inputElement = <input className={inputClasses.join(' ')} onChange={props.changed} value={props.value}/>
			break;
	}
	return (
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{ inputElement }
			{ validationError }
		</div>
	);
};

export default input;
