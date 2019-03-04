import history from '../history'
import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_CART = 'REMOVE_CART'

// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// const DELETE_FROM_CART = 'DELETE_FROM_CART'

const defaultCart = []

// ACTION CREATORS
export const getCart = order => ({
  type: GET_CART,
  order
})

export const addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

export const removeCart = () => ({
  type: REMOVE_CART
})

// export const removeFromCart = cart => ({
//   type: REMOVE_FROM_CART,
//   cart
// })
//
// export const deleteFromCart = cart => ({
//   type: DELETE_FROM_CART,
//   cart
// })

// THUNKS
export const getCartThunk = () => async dispatch => {
  try {
    const order = await axios.get('/api/order')
    dispatch(getCart(order.data))
  } catch (error) {
    console.log(error)
  }
}

export const addProductThunk = productInfo => async dispatch => {
  try {
    const result = axios.put('/api/order/incart', {productInfo})
    dispatch(getCart(result.data))
  } catch (err) {
    console.log(err)
  }
}
//
//   export const updateQuantity = (productIdid, numberOfItems) => async dispatch => {
//     const data = await axios.put(productIdid, numberOfItems);
//     dispatch(gotOneCandyFromServer(data));
// };

// export const changeQuantityThunk = (productInfo) => dispatch => {
//   try {
//     const result = axios.put('/api/order/incart', {productInfo})
//     dispatch(getCart(result.data) || defaultCart)
//   }catch (error) {
//     console.error(error)
//   }
// }
//
// export const deleteFromCartThunk = (orderItemId) => dispatch => {
//   try{
//     const result = axios.delete(`/api/order/incart/${orderItemId}`)
//     dispatch(getCart(result.data) || defaultCart)
//   }catch(error){
//     console.error(error)
//   }
// }

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        order: action.order
      }

    case ADD_TO_CART:
      return {...state, cart: [...action.cart]}

    case REMOVE_CART:
      return []

    default:
      return state
  }
}
