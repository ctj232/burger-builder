import React from 'react';
import classes from './Order.css';

const order = (props) => {
	const ingredients = [];
	for ( let ingrName in props.ingredients ) {
		ingredients.push({name: ingrName, amt: props.ingredients[ingrName]})

	}
	const ingredientOutput = ingredients.map(
		ig => {
			return <span key={ig.name}>{ig.name} ({ig.amt})</span>;
		}
	);
	return (
	<div className={classes.Order}>
		<p>Ingredients: {ingredientOutput}</p>
		<p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
	</div>
	);
};

export default order;
