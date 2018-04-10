import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients : {},
  }

  returnPageHandler = () => {
    this.props.history.goBack()
  }

  finishCheckout = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients})
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.returnPageHandler} checkoutContinue={this.finishCheckout}/>
      </div>

    );

  }
}

export default Checkout;
