import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getUserOrderThunk,
  changeQuantityThunk,
  deleteOrderThunk
} from '../store/order'

export class Order extends Component {
  constructor(props) {
    super(props)

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
  }

  componentDidMount() {
    this.props.getUserOrderThunkDispatch()
  }
  handleUpdateButton(orderId, productId, quantityOrder) {
    this.props.changeQuantityThunkDispatch(orderId, productId, quantityOrder)
  }

  handleCheckout() {}

  getItems() {
    const productsOnOrder = this.props.currentOrder.products

    return (
      productsOnOrder &&
      productsOnOrder.map(product => {
        const itemInCart = this.props.itemsInCart.find(el => {
          return (
            el.orderId === this.props.currentOrder.id &&
            el.productId === product['item-in-order'].productId
          )
        })
        console.log(itemInCart && itemInCart.productId)
        return (
          <div key={product.id}>
            <p className="order">
              <br />
              <hr />
              {product.name}, price: ${product.price},<br />
              Quantity: {itemInCart ? itemInCart.numberOfItems : ''}
              <br />
              <button
                type="button"
                className="waves-effect blue lighten-3 btn update"
                onClick={() =>
                  this.handleUpdateButton(
                    this.props.currentOrder.id,
                    product.id,
                    itemInCart ? itemInCart.numberOfItems + 1 : 0
                  )
                }
              >
                +
              </button>
              {itemInCart ? itemInCart.numberOfItems : ''}
              <button
                type="button"
                className="waves-effect green lighten-3 btn update"
                onClick={() =>
                  this.handleUpdateButton(
                    this.props.currentOrder.id,
                    product.id,
                    itemInCart ? itemInCart.numberOfItems - 1 : 0
                  )
                }
              >
                -
              </button>
            </p>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div className="container">
        <h4>Your Shopping Cart ({this.props.user.email})</h4>
        {this.getItems()}
        <button
          type="button"
          className="waves-effect purple lighten-4 btn-large"
          onClick={this.handleCheckout}
        >
          Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    currentOrder: state.order.myCart,
    itemsInCart: state.order.itemsInOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk()),
    changeQuantityThunkDispatch: (orderId, productId, numberOfItems) =>
      dispatch(changeQuantityThunk(orderId, productId, numberOfItems)),
    deleteOrderThunk: orderId => dispatch(deleteOrderThunk(orderId))
  }
}

export default connect(mapState, mapDispatch)(Order)

// <button
//   type="button"
//   className="waves-effect green lighten-3 btn update"
//   onClick={() => this.props.deleteOrderThunk(itemInCart && itemInCart.productId)}
// >
//   remove
// </button>
