import React from 'react'
import classNames from 'classnames'
import SmallButton from './small-button'
import removeFromCart from '../utils/remove-from-cart'
import increaseQuantity from '../utils/increase-quantity'
import decreaseQuantity from '../utils/decrease-quantity'

export default class ProductList extends React.Component{
	render() {
		const {
			image,
			name,
			description,
			editable,
			price,
			id,
			quantity,
		} = this.props
		return (
			<li
				className={classNames(
					`zygoteProdItem`,
					editable && `zygoteProdItemEditable`,
				)}
			>
				<div className='zygoteProdImage'>
					<img src={image} />
				</div>
				<div className='zygoteProdTitle'>
					{name}
				</div>
				<div className='zygoteProdDesc'>
					{description}
				</div>
				<div className='zygoteProdQty'>
					{editable && (
						<button
							type='button'
							onClick={() => decreaseQuantity(id)}
							className='zygoteProdQtyBtn'
							ref={el => this.decrease = el}
							onMouseUp={() => this.decrease.blur()}
						>
							<SmallButton secondary>-</SmallButton>
						</button>
					)}
					<div className='zygoteProdQtyNum'>{quantity}</div>
					{editable && (
						<button
							type='button'
							onClick={() => increaseQuantity(id)}
							className='zygoteProdQtyBtn'
							ref={el => this.increase = el}
							onMouseUp={() => this.increase.blur()}
						>
							<SmallButton secondary>+</SmallButton>
						</button>
					)}
				</div>
				<div className='zygoteProdPrice'>
					${price.toFixed(2)}
				</div>
				{editable && (
					<button
						role='button'
						className='zygoteProdX'
						onClick={() => removeFromCart(id)}
						ref={el => this.remove = el}
						onMouseUp={() => this.remove.blur()}
					>×</button>
				)}
			</li>
		)
	}
	static styles = () => ({
		'.zygoteProdItem': {
			position: `relative`,
			':after': {
				content: `""`,
				display: `block`,
				clear: `both`,
			},
			'> div': {
				float: `left`,
			},
		},
		'.zygoteProdImage': {
			width: `100%`,
			maxWidth: 65,
			textAlign: `center`,
			img: {
				width: 65,
				height: 65,
			},
		},
		'.zygoteProdTitle': {
			marginTop: 5,
			fontWeight: `bold`,
			width: `100%`,
		},
		'.zygoteProdDesc': {
			width: `100%`,
			marginBottom: 10,
			marginTop: 5,
			fontSize: `.75em`,
		},
		'.zygoteProdQty': {
			userSelect: `none`,
			position: `absolute`,
			left: 85,
			top: 23,
			zIndex: 2,
		},
		'.zygoteProdQtyNum': {
			padding: `0 5px`,
			textAlign: `center`,
			minWidth: 30,
			display: `inline-block`,
			top: -3,
			position: `relative`,
		},
		'.zygoteProdQtyBtn': {
			background: `transparent`,
			outline: `none`,
			border: 0,
			cursor: `pointer`,
			':hover, :focus': {
				opacity: .6,
			},
		},
		'.zygoteProdPrice': {
			width: `50%`,
			textAlign: `right`,
			position: `absolute`,
			top: 23,
			right: 0,
		},
		'.zygoteProdX': {
			position: `absolute`,
			top: 21,
			right: 0,
			fontSize: `2em`,
			lineHeight: `16px`,
			fontWeight: 200,
			cursor: `pointer`,
			background: `transparent`,
			border: 0,
			outline: `none`,
			':hover, :focus': {
				opacity: .6,
			},
		},
		'.zygoteProdItemEditable': {
			'.zygoteProdPrice': {
				right: 35,
			},
		},
	})
}