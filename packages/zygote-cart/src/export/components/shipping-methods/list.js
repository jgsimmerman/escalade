import React from 'react'
import setShipping from '../../utils/set-shipping'
import formatUsd from '../../utils/format-usd'
import Radio from '../inputs/radio'

export default class ShippingMethodsList extends React.Component {
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e){
		setShipping(e.target.value, this.props.setId)
	}
	render() {
		const {
			methods,
			selected,
			setId,
		} = this.props
		return (
			<ul className='zygoteShipList'>
				{methods && methods.map(({ id, description, value }) =>
					<li key={`shipping${id}`}>
						<label className='zygoteShipLabel'>
							<div>
								<Radio
									type='radio'
									name={`zygoteShipping${setId || ``}`}
									value={id}
									checked={selected === id}
									onChange={this.handleChange}
								/>
							</div>
							<div>{description}</div>
							<div>{formatUsd(value)}</div>
						</label>
					</li>
				)}
			</ul>
		)
	}
	static styles = () => ({
		'.zygoteShipList': {
			listStyleType: `none`,
			margin: 0,
			padding: 0,
			li: {
				marginTop: 10,
			},
		},
		'.zygoteShipLabel': {
			display: `flex`,
			cursor: `pointer`,
			position: `relative`,
			'> div': {
				':first-of-type': {
					width: `10%`,
				},
				':nth-of-type(2)': {
					width: `70%`,
				},
				':last-of-type': {
					width: `20%`,
					textAlign: `right`,
				},
			},
		},
	})
}