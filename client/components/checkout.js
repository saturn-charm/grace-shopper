import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrderThunk, purchasedOrderThunk} from '../store/order'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  componentDidMount() {
    this.props.getCartItems()
  }

  handlePurchase() {
    const order = this.props.userOrder
    this.props.puchaseOrderThunkDispatch(order)
    this.props.history.push('/checkout-confirmation')
  }

  render() {
    const userProducts = this.props.userOrder.products
    console.log('PROPS', userProducts)
    const productList =
      userProducts &&
      userProducts.map(product => {
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
          </div>
        )
      })

    let total = 0

    return (
      <div>
        <h2>Order Summary</h2>
        {/* {productList} */}

        {userProducts &&
          userProducts.map(product => {
            return (
              <div key={product.id}>
                <h3>
                  {product.name}:
                  {product['item-in-order'].numberOfItems}
                </h3>
              </div>
            )
          })}

        {userProducts &&
          userProducts.forEach(product => {
            total += product.price
          })}

        <h3>Order Total: ${total}</h3>

        <button
          type="button"
          className="waves-effect pink lighten-1 btn-large product"
          onClick={this.handlePurchase}
        >
          Place Your Order
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  itemsInOrder: state.order.itemsInOrder,
  userOrder: state.order.myCart
})

const mapDispatch = dispatch => ({
  getCartItems: () => dispatch(getUserOrderThunk()),
  puchaseOrderThunkDispatch: order => dispatch(purchasedOrderThunk(order))
})

export default connect(mapState, mapDispatch)(Checkout)
