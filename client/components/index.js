/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Home} from './home'
export {default as AllProducts} from './all-products'
export {Login, Signup} from './auth-form'
export {default as Navbar} from './navbar'
export {default as Order} from './order'
export {default as ProductDetails} from './product-details'
export {default as UserAccount} from './user-account'
export {default as Checkout} from './checkout'
export {default as CheckoutConfirmation} from './checkout-confirmation'
