import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import order from './order'

const reducer = combineReducers({user, product, order})
const middleware = composeWithDevTools(
  applyMiddleware(createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './order'
