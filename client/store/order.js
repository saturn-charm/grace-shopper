import axios from 'axios'

// ACTION TYPES
const GET_USER_ORDER = 'GET_USER_ORDER'
const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER'
const GET_CART_CONTENTS = 'GET_CART_CONTENTS'
const PURCHASED_ORDER = 'PURCHASED_ORDER'
const RECEIVE_UPDATED_ITEM = 'RECEIVE_UPDATED_ITEM'
const DELETE_ORDER = 'DELETE_ORDER'

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

const purchasedOrder = () => ({
  type: PURCHASED_ORDER
})

const receiveUpdatedItem = item => ({
  type: RECEIVE_UPDATED_ITEM,
  item
})

export const deleteOrder = orderId => {
  return {
    type: DELETE_ORDER,
    orderId
  }
}
// THUNK CREATORS
export const getUserOrderThunk = () => {
  return async dispatch => {
    try {
      const orderResponse = await axios.get('/api/orders/myCart')
      const existingOrder = orderResponse.data
      if (!existingOrder.guestCart || !existingOrder.itemsInOrder) {
        //if there is no guestcart on existingOrder, meaning we are either logged in or haven't initialized a cart
        const itemsInOrderResponse = await axios.get(
          `/api/orders/myCart/${existingOrder.id}`
        )
        const stuffInCartAlready = itemsInOrderResponse.data
        console.log('STUFF IN CART: ', stuffInCartAlready)
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
      dispatch(addItemToOrder(orderItem, orderId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteOrderThunk = orderId => dispatch => {
  axios
    .delete(`/api/orders/${orderId}`)
    .then(() => dispatch(deleteOrder(orderId)))
    .catch(err)
}

export const changeQuantityThunk = (orderId, productId, numberOfItems) => {
  console.log('NEW QUANTITY: ', numberOfItems)
  return async dispatch => {
    try {
      const response = await axios.put(`/api/itemsInOrder/${orderId}`, {
        numberOfItems: numberOfItems,
        productId: productId
      })
      console.log('RESPONSE: ', response)
      dispatch(receiveUpdatedItem(response.data))
    } catch (error) {
      console.log(error)
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
    case RECEIVE_UPDATED_ITEM: {
      const items = state.itemsInOrder.slice()
      const newItems = items.map(item => {
        if (item.createdAt === action.item.createdAt) {
          item.numberOfItems = action.item.numberOfItems
        }
        return item
      })
      console.log('NEW ITEMS: ', newItems)
      return {...state, itemsInOrder: newItems}
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
    case PURCHASED_ORDER: {
      return {...state, myCart: {}, itemsInOrder: []}
    }
    case DELETE_ORDER:
      return {
        ...state,
        itemsInOrder: state.itemsInOrder.filter(order => order.id !== action.id)
      }
    default:
      return state
  }
}

export default reducer
