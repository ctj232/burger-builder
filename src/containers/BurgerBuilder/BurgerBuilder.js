import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.75,
  bacon: 1.50,
  cheese: 1,
  meat: 3.50
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad : 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 0.0,
    purchased: false
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] += 1;
    const updatedPrice = this.state.price + INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: updatedPrice })
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients }
    if ( updatedIngredients[type] < 1 ) {
      return;
    }
    updatedIngredients[type] -= 1;
    const updatedPrice = this.state.price - INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: updatedPrice })
  }

  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <p>Price: ${this.state.price}</p>
        <BuildControls add={this.addIngredientHandler}
                      remove={this.removeIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
