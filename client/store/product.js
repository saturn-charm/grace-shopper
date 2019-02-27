import axios from 'axios'
import history from '../history'

// INITIAL STATE
const initialState = {
  products: []
}

// ACTION TYPES
const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER'

// ACTION CREATORS
const getProductsFromServer = products => ({
  type: GET_PRODUCTS_FROM_SERVER,
  products
})

// THUNK CREATORS
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      dispatch(getProductsFromServer(products))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FROM_SERVER: {
      return {...state, products: action.products}
    }
    default:
      return state
  }
}

export default reducer
