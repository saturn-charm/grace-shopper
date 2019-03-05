import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrderThunk} from '../store/order'

export class Order extends Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.getUserOrderThunkDispatch()
  }

  handleCheckout() {}
  render() {
    const productName = this.props.currentOrder.products
    let list
    const nameAndPrice =
      productName &&
      productName.map(product => {
        let quantity
        this.props.itemsInCart.map(item => {
          if (item.productId === product.id) {
            quantity = item.numberOfItems
          }
          var quantities = []
          for (let i = quantity; i <= product.stock; i++) {
            quantities.push(i)
          }
          list = quantities.map(elem => {
            return (
              <option key={elem} value={elem}>
                {elem}
              </option>
            )
          })
        })
        return (
          <div key={product.id}>
            <p className="order">
              <br />
              <hr />
              {product.name}, price: ${product.price},<br />
              Quantity: <br />
              <div className="input-field col s12 left">
                <select className="browser-default order">{list}</select>
              </div>
              <br />
            </p>
          </div>
        )
      })
    console.log('ORDER CART, ', this.props.currentOrder)
    return (
      <div className="container">
        <h4>Your Shopping Cart ({this.props.user.email})</h4>
        {nameAndPrice}
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

const mapStatetoProps = state => {
  return {
    user: state.user,
    currentOrder: state.order.myCart,
    itemsInCart: state.order.itemsInOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapStatetoProps, mapDispatch)(Order)
