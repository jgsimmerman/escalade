import React from 'react'

import Cart from './cart'
import styles from '../styles'
import settingsState from '../state/settings'
import defaultStyles from '../styles/defaults'

export default class Zygote extends React.Component {
	static defaultProps = {
		styles: defaultStyles,
	}
	constructor(props) {
		super(props)
		this.state = {
			styles: { ...defaultStyles, ...props.styles },
		}
		settingsState.setState(props)
		if (!props.orderWebhook){
			console.warn(`No order webhook supplied`)
		}
	}
	render(){
		return (
			<div className={this.state.styles ? styles(this.state.styles) : ``}>
				<Cart />
			</div>
		)
	}
}