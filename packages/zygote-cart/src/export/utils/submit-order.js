import fetch from './fetch'
import stepState from '../state/step'
import settingsState from '../state/settings'
import productsState from '../state/products'
import totalsState from '../state/totals'
import errorCheck from './error-check'
import getFormValues from './get-form-values'
import clearMessages from './clear-messages'
import messagesState from '../state/status-messages'
import validateAllInput from './validate-all-input'
import displayError from './display-error'
import metaState from '../state/meta'
import shippingState from '../state/shipping'
import successState from '../state/success'

export default async function submitOrder({ type, token }) {
	clearMessages()
	if (!token) {
		validateAllInput()
	}

	await timeout()

	// Check for required fields
	if (errorCheck()) return
	stepState.setState({ processing: true })

	const body = getFormValues()

	if(type === `paypal`){
		body.paymentType = `paypal`
		body.payment = token
	}
	else if (settingsState.state.stripeApiKey) {
		if(token && type === `stripe`){
			body.payment = token
		}
		else {
			// Get token from payment inputs
			let { token } = await window.zygoteStripeInstance
				.createToken({
					name: body.billingName,
					address_line1: body.billingAddress1,
					address_line2: body.billingAddress2,
					address_city: body.billingCity,
					address_state: body.billingState,
					address_zip: body.billingZip,
				})
			body.payment = token
		}
		body.paymentType = `stripe`
	}

	body.products = productsState.state.products
	const {
		subtotal,
		modifications,
		total,
	} = totalsState.state
	body.totals = {
		subtotal,
		modifications,
		total,
	}
	body.event = `order`

	console.log(`Sending to API:`, body)

	let data
	try {
		data = await fetch(settingsState.state.orderWebhook, body)
		console.log(`Received from API:`, data)
	}
	catch(err){
		data = {}
		console.error(err)
	}

	if (!data.success) {
		if (!messagesState.state.errors.length){
			displayError(settingsState.state.orderSubmitError)
		}
		if(data.returnTo){
			stepState.setState({ step: data.returnTo })
		}
		else {
			stepState.setState({ step: `payment` })
		}
	}
	else {
		successState.setState({
			totals: {...totalsState.state},
			products: [...productsState.state.products],
			meta: {...metaState.state.meta},
		})
		stepState.setState({ step: `success` })
		totalsState.reset()
		productsState.reset()
		metaState.reset()
		shippingState.reset()
	}

	stepState.setState({ processing: false })
}

function timeout(n = 1){
	return new Promise((resolve) => {
		setTimeout(resolve, n)
	})
}