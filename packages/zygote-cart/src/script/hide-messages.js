// Hides messages
import { remove as removeClass } from './class-list'
module.exports = function(){
	removeClass(this.els, 'zygoteShow')
}
