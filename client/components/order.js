import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrderThunk, changeQuantity} from '../store/order'

export class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      textQuantity: ''
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleConfirmUpdate = this.handleConfirmUpdate.bind(this)
  }

  componentDidMount() {
    this.props.getUserOrderThunkDispatch()
  }

  handleUpdate(evt) {
    // console.log(evt.target.value)
    this.setState({
      value: evt.target.value
    })
  }

  handleConfirmUpdate() {
    // let value = this.state.value
    let productId
    let numberOfItems
    let products = this.props.currentOrder.products

    for (let i = 0; i < products.length; i++) {
      console.log(products[i]['item-in-order'].productId)

      productId = products[i]['item-in-order'].productId
      numberOfItems = products[i]['item-in-order'].numberOfItems

      this.props.changeQuantityThunkDispatch(productId, numberOfItems + 1)
    }
  }
  handleCheckout() {}

  render() {
    const productName = this.props.currentOrder.products
    let list
    let quantityOrder
    let updatedQuantity
    let productId

    const nameAndPrice =
      productName &&
      productName.map(product => {
        productId = product['item-in-order'].productId

        if (productId === product.id) {
          quantityOrder = product['item-in-order'].numberOfItems
        }

        var quantities = []
        for (let i = quantityOrder; i <= product.stock; i++) {
          quantities.push(i)
        }
        list = quantities.map(elem => {
          return (
            <option key={elem} value={elem}>
              {elem}
            </option>
          )
        })
        // updatedQuantity = this.state.textQuantity
        // if (!updatedQuantity) updatedQuantity = quantityOrder
        // console.log(productName)
        return (
          <div key={product.id}>
            <p className="order">
              <br />
              <hr />
              {product.name}, price: ${product.price},<br />
              Quantity: {quantityOrder} <br />
              <div className="input-field col s12 left">
                <select
                  onChange={this.handleUpdate}
                  className="browser-default order"
                >
                  {list}
                </select>
              </div>
              <br />
              <button
                type="button"
                className="waves-effect blue lighten-3 btn"
                value={this.state.value}
                onClick={this.handleConfirmUpdate}
              >
                Update
              </button>
              <button type="button" className="waves-effect red btn">
                Remove
              </button>
            </p>
          </div>
        )
      })
    console.log(this.props.itemsInCart)
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
    changeQuantityThunkDispatch: () => dispatch(changeQuantity())
  }
}

export default connect(mapState, mapDispatch)(Order)
