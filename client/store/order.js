import axios from 'axios'

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
      const orderResponse = await axios.get('/api/orders')
      const existingOrder = orderResponse.data
      const itemsInOrderResponse = await axios.get(
        `/api/orders/${existingOrder.id}`
      )
      const stuffInCartAlready = itemsInOrderResponse.data
      dispatch(getUserOrder(existingOrder))
      dispatch(getCartContents(stuffInCartAlready))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addItemToOrderThunk = (item, orderId) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/orders/newItem', [item, orderId])
      const orderItem = response.data
      dispatch(addItemToOrder(orderItem, orderId))
    } catch (error) {
      console.error(error)
    }
  }
}

// INITIAL STATE
const initialState = {
  myCart: {},
  itemsInOrder: []
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
