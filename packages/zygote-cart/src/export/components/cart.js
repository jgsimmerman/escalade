import React, { Fragment } from 'react'
import { Subscribe } from 'statable'
import openState from '../state/open'
import closeCart from '../utils/close-cart'
import stepState from '../state/step'
import addedToCartState from '../state/added-to-cart'
import settingsState from '../state/settings'
import CartStep from './steps/cart'
import InfoStep from './steps/info'
import PaymentStep from './steps/payment'
import SuccessStep from './steps/success'
import AddedToCartMessage from './added-to-cart-message'
import Processing from './processing'
import Errors from './errors'
import Info from './info'
import capitalize from '../utils/capitalize'

export default class Cart extends React.Component {
	render() {
		return (
			<Subscribe to={[openState, stepState, addedToCartState, settingsState]}>
				{({
					open,
					init,
				}, {
					step,
					processing,
				}, {
					addedToCart,
				}, {
					header,
					cartHeader,
					cartFooter,
					infoHeader,
					infoFooter,
					paymentHeader,
					paymentFooter,
					successHeader,
					successFooter,
					addedToCartMsg,
				}) => (
					<Fragment>
						{init && (
							<Fragment>
								<div className={`zygote zygoteOn${processing ? `Processing` : `${capitalize(step)}Step`}${open ? ` zygoteOpen` : ``}`}>
									<div className='zygoteBg' onClick={closeCart} />
									<div className='zygoteCart'>
										<button
											role='button'
											className='zygoteCloseButton'
											onClick={closeCart}
											ref={el => this.closeBtn = el}
											onMouseUp={() => this.closeBtn.blur()}
										>×</button>

										{header && (
											<div className='zygoteHeader'>{header}</div>
										)}

										<Errors />
										<Info />

										<div className='zygoteStep zygoteCartStep'>
											<CartStep
												cartHeader={cartHeader}
												cartFooter={cartFooter}
												addedToCart={addedToCart
													? addedToCartMsg || <AddedToCartMessage />
													: false
												}
											/>
										</div>
										<div className='zygoteStep zygoteInfoStep'>
											<InfoStep
												infoHeader={infoHeader}
												infoFooter={infoFooter}
											/>
										</div>
										<div className='zygoteStep zygotePaymentStep'>
											<PaymentStep
												paymentHeader={paymentHeader}
												paymentFooter={paymentFooter}
											/>
										</div>
										<div className='zygoteStep zygoteSuccessStep'>
											<SuccessStep
												successHeader={successHeader}
												successFooter={successFooter}
											/>
										</div>
										{!!processing && (
											<Processing>{processing}</Processing>
										)}
									</div>
								</div>
							</Fragment>
						)}
					</Fragment>
				)}
			</Subscribe>
		)
	}
	static styles = ({ fontColor, fontFamily, overlayColor, backgroundColor }) => ({
		'[role="button"]': {
			cursor: `pointer`,
			userSelect: `none`,
		},
		'&, *, *:before, *:after': {
			boxSizing: `border-box`,
		},
		'.zygote': {
			color: fontColor,
			fontFamily,
			textRendering: `optimizeLegibility`,
			'-webkit-font-smoothing': `antialiased`,
			fontSize: 16,
		},
		'.zygoteBg': {
			position: `fixed`,
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			background: overlayColor,
			visibility: `hidden`,
			opacity: 0,
			transition: `opacity .3s, visibility .3s`,
		},
		'.zygoteCart': {
			position: `fixed`,
			top: 0,
			bottom: 0,
			right: 0,
			width: 500,
			overflowY: `auto`,
			maxWidth: `100%`,
			backgroundColor,
			transform: `translateX(110%)`,
			transition: `transform .3s`,
			boxShadow: `-3px 0 4px rgba(0, 0, 0, 0.2)`,
			padding: 20,
			paddingTop: 40,
		},
		'.zygoteCloseButton': {
			background: `transparent`,
			border: 0,
			outline: `none`,
			position: `absolute`,
			top: 25,
			right: 25,
			fontSize: `3em`,
			lineHeight: `22px`,
			cursor: `pointer`,
			fontWeight: 200,
			':hover, :focus': {
				opacity: .6,
			},
		},
		'.zygoteHeader': {
			textAlign: `center`,
			marginBottom: 20,
		},
		'.zygoteStep': {
			display: `none`,
		},
		'.zygoteOnCartStep': {
			'.zygoteCartStep': {
				display: `block`,
			},
		},
		'.zygoteOnInfoStep': {
			'.zygoteInfoStep': {
				display: `block`,
			},
		},
		'.zygoteOnPaymentStep': {
			'.zygotePaymentStep': {
				display: `block`,
			},
		},
		'.zygoteOnSuccessStep': {
			'.zygoteSuccessStep': {
				display: `block`,
			},
		},
		'.zygoteOpen': {
			'.zygoteBg': {
				visibility: `visible`,
				opacity: 1,
			},
			'.zygoteCart': {
				transform: `translateX(0%)`,
			},
		},
	})
}