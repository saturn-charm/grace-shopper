import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrderThunk} from '../store/order'

export class Order extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserOrderThunkDispatch()
  }

  render() {
    const productName = this.props.currentOrder.products
    const name =
      productName &&
      productName.map(product => {
        return product.name + ' ' + 'price: $' + product.price + ' '
      })
    return (
      <div className="container">
        <h1>Hola</h1>
        <h3>{this.props.user.email}</h3>
        <h3> Your order: {name}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    currentOrder: state.order.myCart
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapState, mapDispatch)(Order)
