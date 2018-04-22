import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  returnPageHandler = () => {
    this.props.history.goBack()
  }

  finishCheckout = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients}
	    checkoutCancelled={this.returnPageHandler}
	    checkoutContinue={this.finishCheckout}/>
	<Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
      </div>

    );
  }
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
	}
}

export default connect(mapStateToProps)(Checkout);
