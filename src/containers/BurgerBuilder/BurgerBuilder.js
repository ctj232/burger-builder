import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import * as actionTypes from '../../store/action';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchased: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
//    axios.get('https://react-my-burger-53fc6.firebaseio.com/ingredients.json').then(
//      response => {
//        this.setState({ingredients: response.data})
//      }).catch(error => {
//        this.setState({error: true})
//      })
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    this.props.history.push('/checkout')
  }

  isPurchasable() {
    const sum = Object.keys(this.props.ingredients).map(igKey => {
      return this.props.ingredients[igKey]
    }).reduce((sum, el) => { return sum + el },  0);
    return sum > 0;
  }

  render () {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary ingredients={this.props.ingredients} cancel={this.purchaseCancelHandler} completeOrder={this.purchaseContinueHandler} price={this.props.price}/>
      )
      burger = (
        <Aux>
        <Burger ingredients={this.props.ingredients}/>
        <BuildControls add={this.props.addIngredient}
        remove={this.props.removeIngredient}
        disabled={disabledInfo}
        purchasable={this.isPurchasable()}
        price={this.props.price}
        ordered={this.purchaseHandler}
        />
        </Aux>
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>{orderSummary}</Modal>
        { burger }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		price: state.price
	};
}

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
		removeIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
