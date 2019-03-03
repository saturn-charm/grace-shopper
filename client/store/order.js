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

// THUNK CREATORS
export const getUserOrderThunk = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      const existingOrder = response.data
      dispatch(getUserOrder(existingOrder))
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
      dispatch(addItemToOrder(orderItem))
    } catch (error) {
      console.error(error)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDER: {
      console.log('in get user order switch case')
      return {...state, myCart: action.order}
    }
    case ADD_ITEM_TO_ORDER: {
      return {...state, itemsInOrder: [...state.itemsInOrder, action.item]}
    }
    default:
      return state
  }
}

export default reducer
