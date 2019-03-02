import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart-test'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    // const { cart } = this.props;
    console.log(this.props)
    return (
      <div>
        <h1>Hola</h1>
      </div>
    )
  }
}

const mapPropToCart = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(getCartThunk())
  }
}

export default connect(mapPropToCart, mapDispatch)(Cart)
