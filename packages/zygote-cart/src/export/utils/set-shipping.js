import shippingState, { findShippingMethod } from '../state/shipping'
import totalsState from '../state/totals'
import addTotalModification from './add-total-modification'
import config from '../zygote.config'

export default function setShipping(selected, setId) {
	const method = findShippingMethod(selected)
	if(!method) return
	if (setId){
		const selectedSet = shippingState.state.selected
		selectedSet[setId] = selected
		shippingState.setState({ selected: selectedSet })
	}
	else {
		shippingState.setState({ selected })
	}
	totalsState.setState({ loading: true })
	addTotalModification({
		id: setId ? `shipping-${setId}` : `shipping`,
		description: method.description,
		displayValue: method.displayValue,
		value: method.value,
	})

	const totalShippingCost = totalsState.state.modifications
		.filter(mod => mod.id.startsWith(`shipping`))
		.reduce((total, mod) => total.value ? total.value + mod.value : total + mod.value)

	config.plugins.forEach(plugin => {
		if (typeof plugin.calculateTax === `function` ) {
			plugin.calculateTax({
				shippingAddress: shippingState.state.address,
				subtotal: totalsState.state.subtotal,
				shipping: totalShippingCost.value ? totalShippingCost.value : totalShippingCost,
				discounts: 0,
			})
				.then(tax => {
					if (tax.id) addTotalModification(tax)
				})
				.catch(error => console.log(`Error applying taxes to new shipping method`, error))
		}
	})
	totalsState.setState({ loading: false })
}

