import * as actionTypes from './action';

const initialState = {
    ingredients: {
	    salad: 0,
	    bacon: 0,
	    cheese: 0,
	    meat: 0,
    },
    price: 0.0,
}

const INGREDIENT_PRICES = {
  salad: 0.75,
  bacon: 1.50,
  cheese: 1,
  meat: 3.50
};


const reducer = ( state = initialState, action ) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1
				},
				price: state.price + INGREDIENT_PRICES[action.ingredient]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1
				},
				price: state.price - INGREDIENT_PRICES[action.ingredient]
			};
		default:
			return state;
	}
}

export default reducer;
