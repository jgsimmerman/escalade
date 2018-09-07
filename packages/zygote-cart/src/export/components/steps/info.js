import React, { Fragment } from 'react'
import { Subscribe } from 'statable'
import stepState from '../../state/step'
import NameInput from '../inputs/name'
import EmailInput from '../inputs/email'
import PhoneInput from '../inputs/phone'
import AddressInput from '../inputs/address'
import Address2Input from '../inputs/address-2'
import CompanyName from '../inputs/company-name'
import City from '../inputs/city'
import State from '../inputs/state'
import Zip from '../inputs/zip'
import StepsHeader from '../steps-header'
import Header from '../header'
import Button from '../button'
import submitInfo from '../../utils/attempt-submit-info'
import productsState from '../../state/products'
import SimpleSummary from '../simple-summary'

export default class InfoStep extends React.Component{
	render() {
		const {
			infoHeader,
			infoFooter,
		} = this.props
		return (
			<Subscribe to={stepState}>
				{({ step }) => (
					<Fragment>
						{(step === `info` || step === `payment`) && (
							<form data-form='info'>
								{!!infoHeader && (
									<div>{infoHeader}</div>
								)}
								<StepsHeader step='info' />
								<SimpleSummary />
								<div className='zygoteInfoSection'>
									<Header>Let's get started</Header>
									<NameInput
										name='infoName'
										autoComplete='shipping name'
										step='info'
									/>
									<EmailInput
										name='infoEmail'
										autoComplete='shipping email'
										step='info'
									/>
									<PhoneInput
										name='infoPhone'
										autoComplete='shipping tel'
										step='info'
									/>
								</div>
								{showShipping() && (
									<div className='zygoteInfoSection'>
										<Header>Where should we deliver?</Header>
										<AddressInput
											name='shippingAddress1'
											autoComplete='shipping address-line1'
											step='info'
										/>
										<div className='zygoteInfoExtra'>
											<div>
												<Address2Input
													name='shippingAddress2'
													autoComplete='shipping address-line2'
													step='info'
												/>
											</div>
											<div>
												<CompanyName
													name='shippingCompany'
													autoComplete='shipping org'
													step='info'
												/>
											</div>
										</div>
										<div className='zygoteInfoCityState'>
											<div>
												<City
													name='shippingCity'
													autoComplete='shipping locality'
													step='info'
												/>
											</div>
											<div>
												<State
													name='shippingState'
													autoComplete='shipping region'
													step='info'
												/>
											</div>
										</div>
										<Zip
											name='shippingZip'
											autoComplete='shipping postal-code'
											step='info'
										/>
										<div className='zygoteInfoBtn'>
											<Button onClick={submitInfo}>
												Next Step
											</Button>
										</div>
									</div>
								)}
								{!!infoFooter && (
									<div>{infoFooter}</div>
								)}
							</form>
						)}
					</Fragment>
				)}
			</Subscribe>
		)
	}
	static styles = () => ({
		'.zygoteInfoSection': {
			marginTop: 40,
		},
		'.zygoteInfoExtra': {
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
		},
		'.zygoteInfoCityState': {
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
		},
		'.zygoteInfoBtn': {
			marginTop: 30,
		},
	})
}

function showShipping(){
	const { products } = productsState.state
	for(let i = products.length; i--;){
		const product = products[i]
		if(!product.noShip){
			return true
		}
	}
	return false
}