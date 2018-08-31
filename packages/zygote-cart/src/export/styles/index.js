import { css } from 'emotion'
import { styles as cart } from '../components/cart'
import { styles as addedToCartMsg } from '../components/added-to-cart-message'
import { styles as button } from '../components/button'
import { styles as errors } from '../components/errors'
import { styles as header } from '../components/header'
import { styles as info } from '../components/info'
import { styles as loading } from '../components/loading-animation'
import { styles as processing } from '../components/processing'
import { styles as prodItem } from '../components/product-list-item'
import { styles as prodList } from '../components/product-list'
import { styles as shippingMethods } from '../components/shipping-methods'
import { styles as smallButton } from '../components/small-button'
import { styles as stagesHeader } from '../components/stages-header'
import { styles as totals } from '../components/totals'
import { styles as cardList } from '../components/card-list'
import { styles as securityIcon } from '../components/card-list/security'
import { styles as checkbox } from '../components/inputs/checkbox'
import { styles as radio } from '../components/inputs/radio'
import { styles as coupon } from '../components/inputs/coupon'
import { styles as input } from '../components/inputs/input'
import { styles as select } from '../components/inputs/select'
import { styles as toggle } from '../components/inputs/toggle'
import { styles as cartStep } from '../components/stages/cart'
import { styles as infoStep } from '../components/stages/info'
import { styles as paymentStep } from '../components/stages/payment'
import { styles as successStep } from '../components/stages/success'
import { styles as stripe } from '../components/stripe'
import { styles as stripeInput } from '../components/stripe/input'

export default function styles(opts){
	return css({
		...addedToCartMsg(opts),
		...button(opts),
		...cart(opts),
		...errors(opts),
		...header(opts),
		...info(opts),
		...loading(opts),
		...processing(opts),
		...prodItem(opts),
		...prodList(opts),
		...shippingMethods(opts),
		...smallButton(opts),
		...stagesHeader(opts),
		...totals(opts),
		...cardList(opts),
		...securityIcon(opts),
		...checkbox(opts),
		...radio(opts),
		...coupon(opts),
		...input(opts),
		...select(opts),
		...toggle(opts),
		...cartStep(opts),
		...infoStep(opts),
		...paymentStep(opts),
		...successStep(opts),
		...stripe(opts),
		...stripeInput(opts),
	})
}