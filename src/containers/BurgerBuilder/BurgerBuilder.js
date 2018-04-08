import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

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
    purchased: false,
    purchasable: false,
    purchasing: false,
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('Continued!');
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => { return sum + el },  0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] += 1;
    const updatedPrice = this.state.price + INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: updatedPrice })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    if ( this.state.ingredients[type] < 1 ) {
      return;
    }
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] -= 1;
    const updatedPrice = this.state.price - INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, price: updatedPrice })
    this.updatePurchaseState(updatedIngredients)
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}><OrderSummary ingredients={this.state.ingredients} cancel={this.purchaseCancelHandler} completeOrder={this.purchaseContinueHandler}/></Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls add={this.addIngredientHandler}
                      remove={this.removeIngredientHandler}
                      disabled={disabledInfo}
                      purchasable={this.state.purchasable}
                      price={this.state.price}
                      ordered={this.purchaseHandler}
                      />
      </Aux>
    );
  }
}

export default BurgerBuilder;
