import React, { Fragment } from 'react'
import { css } from 'emotion'
import { Subscribe } from 'statable'
import stageState from '../../state/stage'
import StagesHeader from '../stages-header'
import Header from '../header'
import CardList from '../card-list'
import StripePayment from '../stripe'
import Button from '../button'
import submitOrder from '../../utils/submit-order'
import ProductList from '../product-list'
import Totals from '../totals'
import ShippingMethods from '../shipping-methods'
import Checkbox from '../inputs/checkbox'
import inputs from '../../utils/inputs'
import AddressInput from '../inputs/address'
import Address2Input from '../inputs/address-2'
import CompanyName from '../inputs/company-name'
import City from '../inputs/city'
import State from '../inputs/state'
import Zip from '../inputs/zip'

export default class PaymentStage extends React.Component{
	constructor(props){
		super(props)
		this.state = { sameBilling: true }
		this.toggleBilling = this.toggleBilling.bind(this)
	}
	toggleBilling(){
		this.setState({ sameBilling: !this.state.sameBilling })
	}
	render() {
		const {
			paymentHeader,
			paymentFooter,
		} = this.props
		return (
			<Subscribe to={stageState}>
				{({ stage }) => (
					<Fragment>
						{(stage === `info` || stage === `payment`) && (
							<form data-form='payment'>
								{!!paymentHeader && (
									<div>{paymentHeader}</div>
								)}
								<StagesHeader stage='payment' />
								<div className={sectionStyles}>
									<div className={headerRowStyles}>
										<div>
											<Header>Payment</Header>
										</div>
										<div>
											<CardList />
										</div>
									</div>
									<StripePayment />

									<label className={sameBillingStyles}>
										<Checkbox
											name='sameBilling'
											checked={this.state.sameBilling}
											onChange={this.toggleBilling}
										/>
										<div>Same Billing and Shipping Address</div>
									</label>

									{this.state.sameBilling && (
										<div className={billingAddressStyles}>
											<div>{value(`infoName`)}</div>
											<div>{value(`shippingAddress1`)}</div>
											<div>{value(`shippingAddress2`)}</div>
											<div>{value(`shippingCity`)}, {value(`shippingState`)} {value(`shippingZip`)}</div>
										</div>
									)}
									{!this.state.sameBilling && (
										<div className={sectionStyles}>
											<Header>What is your billing address?</Header>
											<AddressInput name='billingAddress1' autoComplete='billing address-line1' />
											<div className={extraStyles}>
												<div>
													<Address2Input name='billingAddress2' autoComplete='billing address-line2' />
												</div>
												<div>
													<CompanyName name='billingCompany' autoComplete='billing org' />
												</div>
											</div>
											<div className={cityStateStyles}>
												<div>
													<City name='billingCity' autoComplete='billing locality' />
												</div>
												<div>
													<State name='billingState' autoComplete='billing region' />
												</div>
											</div>
											<Zip name='billingZip' autoComplete='billing postal-code' />
										</div>
									)}

								</div>
								<div className={sectionStyles}>
									<ShippingMethods />
								</div>
								<div className={sectionStyles}>
									<h2>Final Order Summary</h2>
									<ProductList editable={false} />
									<Totals />
								</div>
								<div className={buttonContainerStyles}>
									<Button onClick={submitOrder}>Place Order</Button>
								</div>
								{!!paymentFooter && (
									<div>{paymentFooter}</div>
								)}
							</form>
						)}
					</Fragment>
				)}
			</Subscribe>

		)
	}
}

function value(name){
	if (inputs[name] && inputs[name].state && inputs[name].state.value){
		return inputs[name].state.value
	}
}

const billingAddressStyles = css({
	fontWeight: `bold`,
	marginTop: 10,
	marginLeft: 30,
})

const sectionStyles = css({
	marginTop: 40,
})

const headerRowStyles = css({
	'@media(min-width: 500px)': {
		display: `flex`,
		'> div': {
			':first-of-type': {
				width: `40%`,
			},
			':last-of-type': {
				width: `60%`,
				textAlign: `right`,
				marginTop: 5,
			},
		},
	},
})

const sameBillingStyles = css({
	cursor: `pointer`,
	display: `flex`,
	marginTop: 30,
	'> *': {
		':first-of-type': {
			marginRight: 10,
		},
	},
})



const extraStyles = css({
	'@media(min-width: 450px)': {
		display: `flex`,
		'> div': {
			width: `50%`,
			padding: `0 10px`,
			':first-of-type': {
				paddingLeft: 0,
			},
			':last-of-type': {
				paddingRight: 0,
			},
		},
	},
})

const cityStateStyles = css({
	'@media(min-width: 450px)': {
		display: `flex`,
		'> div': {
			padding: `0 10px`,
			':first-of-type': {
				width: `60%`,
				paddingLeft: 0,
			},
			':last-of-type': {
				width: `40%`,
				paddingRight: 0,
			},
		},
	},
})

const buttonContainerStyles = css({
	marginTop: 30,
})