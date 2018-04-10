import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.css';

class ContactData extends Component {
	state = {
		loading: false,
		formIsValid: false,
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street Address'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false

			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false

			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false

			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: 'fastest',
				valid: true
			}
		}
	}

	checkValidity(value, rules) {
		let isValid = true;

		if ( !rules )
			return;

		if (rules.required) {
			isValid = value.trim() !== ''
		}
		if (rules.maxLength) {
			isValid = value.trim().length <= rules.maxLength && isValid
		}
		if (rules.minLength) {
			isValid = value.trim().length >= rules.minLength && isValid
		}
		return isValid;
	}

	inputChangedHandler = (event, inputId) => {
		const formData = {...this.state.orderForm}
		const updatedFormElement = {...formData[inputId]}
		updatedFormElement.value = event.target.value
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
		updatedFormElement.touched = true
		formData[inputId] = updatedFormElement

		let formIsValid = true;
		for (let inputId in formData) {
			formIsValid = formIsValid && formData[inputId].valid
		}

		this.setState({orderForm : formData, formIsValid: formIsValid})	
	}

	orderClickedHandler = (event) => {
		event.preventDefault()	// do not send request when <form> submitted
		this.setState( {loading: true} )
		const formData = {};
		for (let formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}
		axios.post('/orders.json', order).then(
			response => {
				this.setState({loading: false})
				this.props.history.push('/')
			}
		).catch(
			error => {
				this.setState({loading: false})
			}
		);
	}

	render () {
		const formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderClickedHandler}>
			{ formElements.map(field => (
				<Input elementType={field.config.elementType} elementConfig={field.config.elementConfig} value={field.config.value} key={field.id} changed={(event) => this.inputChangedHandler(event, field.id)} invalid={!field.config.valid} shouldValidate={field.config.validation} touched={field.config.touched}/>
			))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={styles.ContactData}>
			<h4>Enter your contact information:</h4>
			{ form }
			</div>
		);
	}
}

export default ContactData;
