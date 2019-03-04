import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrderThunk} from '../store/order'

class Order extends Component {
  componentDidMount() {
    this.props.getUserOrderThunk()
  }

  render() {
    return (
      <div className="container">
        <h1>Hola</h1>
        <h3>{this.props.user.email}</h3>
        <h3>Your order: {this.props.currentProduct.name}</h3>
      </div>
    )
  }
}

const mapPropToCart = state => {
  return {
    user: state.user,
    currentOrder: state.order.myCart,
    currentProduct: state.product.product
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrderThunk: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapPropToCart, mapDispatch)(Order)

// class Order extends Component {
//   constructor(props) {
//     super(props)
//   }
//
//   componentDidMount() {
//     this.props.getUserOrderThunk()
//   }
//
//   render() {
//     console.log('ORDER CART, ', this.props.user, this.props.currentProduct)
//     return (
//       <div className="container">
//         <h1>Hola</h1>
//         <h3>{this.props.user.email}</h3>
//         <h3>Your order: {this.props.currentProduct.name}</h3>
//       </div>
//     )
//   }
// }
//
// const mapPropToCart = state => {
//   return {
//     user: state.user,
//     currentOrder: state.order.myCart,
//     currentProduct: state.product.product
//   }
// }
//
// const mapDispatch = dispatch => {
//   return {
//     getUserOrderThunk: () => dispatch(getUserOrderThunk())
//   }
// }
//
//connect(mapPropToCart, mapDispatch)(Order)
