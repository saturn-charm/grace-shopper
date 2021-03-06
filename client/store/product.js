import axios from 'axios'

// ACTION TYPES
const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER'
const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS'

// ACTION CREATORS
const getProductsFromServer = products => ({
  type: GET_PRODUCTS_FROM_SERVER,
  products
})

const getProductDetails = product => ({
  type: GET_PRODUCT_DETAILS,
  product
})

// THUNK CREATORS
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      dispatch(getProductsFromServer(products))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getProductDetailsThunk = productId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${productId}`)
      const product = response.data
      dispatch(getProductDetails(product))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateQuantityThunk = (productId, stock) => {
  return async dispatch => {
    try {
      const order = await axios.put(`/api/products/${productId}`, {stock})
      dispatch(getProductDetails(order.data))
    } catch (error) {
      console.error(error)
    }
  }
}

// INITIAL STATE
const initialState = {
  products: [],
  product: {}
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FROM_SERVER: {
      return {...state, products: action.products}
    }
    case GET_PRODUCT_DETAILS: {
      return {...state, product: action.product}
    }
    default:
      return state
  }
}

export default reducer
