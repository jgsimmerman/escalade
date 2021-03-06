import {
	requestJson,
} from './base'
import moment from 'moment'
import acState from '../state'
import { putACItem, postACItem, deleteACItem, logger } from '../utils'

// Static data identifying this AC objects endpoints and object property name
const AC_ECOMORDER_JSON_PROP = `ecomOrder`
const AC_ECOMORDER_PRODUCTS_JSON_PROP = `ecomOrderProducts`
const AC_ECOMORDER_ENDPOINT = `ecomOrders`
const AC_ECOMCUSTOMER_JSON_PROP = `ecomCustomer`

export const setActiveCartStatus = (order = {}, props = {}) => {
// To activate a cart:
// update it with an external id
	order.externalid = props.externalid || `${Date.now()}`
	order.externalUpdatedDate = props.externalUpdatedDate || moment().format()

	// if this is a NEW and COMPLETED order, clean the order object of abandonment fields and identifiers
	if (props.isComplete) {
		delete order.abandonedDate
		delete order.abandoned_date
		delete order.externalcheckoutid
		delete order.id
	}

	logger(`setActiveCartStatus order: `, order)
	logger(`setActiveCartStatus props: `, props)
	return order
}

export const deleteAndMakeComplete = async (
	order = {},
// props = {}
) => {
	logger(`deleteAndMakeComplete running...`)

	let ecomOrder, ecomProducts, errors = false
	try {
		await deleteACItem(`${AC_ECOMORDER_ENDPOINT}/${order.id}`)
			.then(response => logger(`delete response: `, response))
	} catch (e) {
		errors = true
		logger(`error deleting order: `, e)
	}

	if (!errors) {
		await postACItem(AC_ECOMORDER_ENDPOINT, { [AC_ECOMORDER_JSON_PROP]: setActiveCartStatus(order, { isComplete: true }) })
			.then(response => {
				if (response) {
					ecomOrder = response.ecomOrder
					ecomProducts = response.ecomOrderProducts
					logger(`Response from post complete order: `, response)
				}
			})

		logger(`deleteAndMakeComplete returning order: `, ecomOrder)
		logger(`deleteAndMakeComplete returning products: `, ecomProducts)
	}

	logger(`deleteAndMakeComplete returning: `, ecomOrder)
	return ecomOrder
}

export const updateAbandonedOrder = async (order, props = {}) => {
	logger(`updateAbandonedOrder running...`)

	let ecomOrder

	if (props.setActive) order = setActiveCartStatus(order)

	await putACItem(`${AC_ECOMORDER_ENDPOINT}/${order.id}`, { [AC_ECOMORDER_JSON_PROP]: order })
		.then(response => ecomOrder = response ? response[AC_ECOMORDER_JSON_PROP] : null)

	logger(`updateAbandonedOrder returning: `, ecomOrder)
	return ecomOrder
}


export const updateOrder = async (order, props = {}) => {
	logger(`updateOrder running...`)

	let ecomOrder

	if (props.setActive) order = setActiveCartStatus(order)

	await putACItem(`${AC_ECOMORDER_ENDPOINT}/${order[AC_ECOMORDER_JSON_PROP].id}`, order)
		.then(response => ecomOrder = response ? response[AC_ECOMORDER_JSON_PROP] : null)

	logger(`updateOrder returning: `, ecomOrder)
	return ecomOrder
}

export const resolveAbandonedOrder = async (order = {} /*props = {}*/) => {
	logger(`resolveAbandonedOrder running...`)

	if (order[AC_ECOMORDER_JSON_PROP]) order = order[AC_ECOMORDER_JSON_PROP]

	// Determine if we need to recover a cart or delete it and make a complete purchase record
	// if the abandoned date on the cart is in the future, delete it and make a completed purchase record
	// else, update the abandoned cart

	const abandonedDate = order.abandonedDate || order.abandoned_date
	const resolveAction = moment().diff(abandonedDate) < 0 ? deleteAndMakeComplete : updateAbandonedOrder

	return await resolveAction(order, { setActive: true })
}

export const completeAbandonedStateOrder = async () => {
	let ecomOrder
	if (acState.state[AC_ECOMORDER_JSON_PROP]) {
		ecomOrder = await resolveAbandonedOrder({ ...acState.state[AC_ECOMORDER_JSON_PROP] })
		if (ecomOrder) { // When final order is successfull
			acState.setState({
				[AC_ECOMORDER_PRODUCTS_JSON_PROP]: null, // Clear the product array object from state
				[AC_ECOMORDER_JSON_PROP]: null, // Clear the order object from state
				[AC_ECOMCUSTOMER_JSON_PROP]: null, // Clear customer
			})

		}
	}
	return ecomOrder
}

export function EComOrder(props = {}) {
	logger(`EcomOrder props available: `, props)

	// url to point to, whether on dev mode for specific instance or prod
	const siteUrl = acState.state.devConfig.isDevMode ?
		acState.state.devConfig.devOrigin
		: acState.state.config.origin

	this.email = props.email
	this.totalPrice = props.totalPrice || 0
	this.orderNumber = props.orderNumber
	this.connectionid = props.connectionid
	this.customerid = props.customerid

	this.orderProducts = props.orderProducts && props.orderProducts.length ?
		props.orderProducts.map(product => {
			return {
				externalid: product.id,
				name: product.name,
				price: product.price,
				quantity: product.quantity,
				category: ``,
				sku: ``,
				description: product.description || ``,
				imageUrl: acState.state.pluginConfig.hasFullImageUrl ? product.image || `` : `${siteUrl}${product.image}` || ``,
				// TODO: Update when data is available
				// productUrl: acState.state.devConfig.isDevMode ? `${acState.state.devConfig.devOrigin}/product/${product.id}` : `${acState.state.config.origin}/product/${product.id}`
				productUrl: siteUrl,
			}
		})
		: []

	// external id is optional, will determine cart abandment
	this.externalid = props.externalid || null

	// optional properties (have default values)
	this.source = props.source || `1`
	this.orderUrl = acState.state.devConfig.isDevMode ? acState.state.devConfig.devOrigin : acState.state.config.origin
	this.shippingMethod = props.shippingMethod || `UPS Ground`
	this.shippingAmount = props.shippingAmount || 0
	this.taxAmount = props.taxAmount || 0
	this.discountAmount = props.discountAmount || 0
	this.currency = props.currency || `USD`

	// values that are currently static and need to be updated
	this.externalCreatedDate = props.externalCreatedDate || moment().format()
	this.externalUpdatedDate = props.externalUpdatedDate || moment().format()

	this.requestJson = function () { return requestJson(AC_ECOMORDER_JSON_PROP, this) }

	this.abandonCart = (props = {}) => {
		delete this.externalid

		this.abandoned_date = moment().add(Number(acState.state.defaultConfig.abandonOffset), `minutes`).format()
		this.externalcheckoutid =
props.externalcheckoutid
|| `${Date.now()}-${this.customerid}-${this.connectionid}`
	}

	/* this.updateOrderFromResponseJson = async (responseJson) => {
let orderData = this.requestJson()

orderData[AC_ECOMORDER_JSON_PROP].id = responseJson.ecomOrder ? responseJson.ecomOrder.id : null

// if we have order data and product data in both objects, apply the products ids
if (responseJson.ecomOrderProducts && orderData.orderProducts) {
orderData.orderProducts = responseJson.ecomOrderProducts
}

return orderData
} */

	this.createAbandonedOrder = async () => {
		logger(`createAbandonedOrder running...`)

		// first check state to see if we have an order
		// if so, get id and abandoned_date
		if (acState.state[AC_ECOMORDER_JSON_PROP]) {
			this.id = acState.state[AC_ECOMORDER_JSON_PROP][AC_ECOMORDER_JSON_PROP].id
			this.abandoned_date = acState.state[AC_ECOMORDER_JSON_PROP][AC_ECOMORDER_JSON_PROP].abandoned_date
		}

		// if cart is not abandoned, update the abanonded data
		if (!this.abandoned_date || moment().diff(this.abandoned_date) < 0) this.abandonCart()

		// If order has an id associated then we only update
		let acOrderData, orderData = this.requestJson()
		if (this.id) {
			acOrderData = await updateOrder(orderData)
			// Else we create a new abandoned order
		} else {
			acOrderData = await postACItem(AC_ECOMORDER_ENDPOINT, orderData)
				.then(response => {
					if (response) {
						orderData[AC_ECOMORDER_JSON_PROP].id = response[AC_ECOMORDER_JSON_PROP].id
						logger(`Response from post abandoned order: `, response)
					}
				})
		}

		logger(`createAbandonedOrder returning order: `, orderData, acOrderData)
		// after cart abandonment is created then we set the data response to state
		acState.setState({
			[AC_ECOMORDER_JSON_PROP]: orderData, // only add the ecomOrderId to state
		})
		return orderData
	}
}