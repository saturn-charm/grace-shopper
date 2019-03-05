import axios from 'axios'
import history from '../history'

// INITIAL STATE
const initialState = {
  myCart: {},
  itemsInOrder: []
}

// ACTION TYPES
const GET_USER_ORDER = 'GET_USER_ORDER'
const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER'
const GET_CART_CONTENTS = 'GET_CART_CONTENTS'

// ACTION CREATORS
const getUserOrder = order => ({
  type: GET_USER_ORDER,
  order
})
const addItemToOrder = (item, orderId) => ({
  type: ADD_ITEM_TO_ORDER,
  item,
  orderId
})
const getCartContents = itemsInOrder => ({
  type: GET_CART_CONTENTS,
  itemsInOrder
})

// THUNK CREATORS
export const getUserOrderThunk = () => {
  return async dispatch => {
    try {
      const orderResponse = await axios.get('/api/orders/myCart')
      const existingOrder = orderResponse.data
      console.log(
        '!!!!!!!!!existingOrder at beginning of combo thunk',
        existingOrder
      )
      if (!existingOrder.guestCart || !existingOrder.itemsInOrder) {
        //if there is no guestcart on existingOrder, meaning we are either logged in or haven't initialized a cart
        const itemsInOrderResponse = await axios.get(
          `/api/orders/myCart/${existingOrder.id}`
        )
        const stuffInCartAlready = itemsInOrderResponse.data
        dispatch(getUserOrder(existingOrder))
        dispatch(getCartContents(stuffInCartAlready))
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const addItemToOrderThunk = (item, orderId) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/orders/myCart/newItem', [
        item,
        orderId
      ])
      const orderItem = response.data
      console.log("HERE'S THE ORDERITEM: ", orderItem)
      dispatch(addItemToOrder(orderItem, orderId))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER: {
      return {...state, myCart: action.order}
    }
    case GET_CART_CONTENTS: {
      return {...state, itemsInOrder: action.itemsInOrder}
    }
    case ADD_ITEM_TO_ORDER: {
      console.log('itemsinorder from state: ', state.itemsInOrder)
      const filtered = state.itemsInOrder.filter(
        item =>
          item.orderId === action.item.orderId &&
          item.productId === action.item.productId
      )
      if (filtered.length > 0) {
        return {...state}
      }

      return {...state, itemsInOrder: [...state.itemsInOrder, action.item]}
    }
    default:
      return state
  }
}

export default reducer
