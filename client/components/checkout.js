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
    // console.log('heree', order)
    this.props.puchaseOrderThunkDispatch(order)
  }

  render() {
    console.log('PROPS', this.props)
    const userProducts = this.props.userOrder.products
    const productList =
      userProducts &&
      userProducts.map(product => {
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
          </div>
        )
      })

    return (
      <div>
        <h2>Review Items In Cart:</h2>
        {productList}

        <button
          type="button"
          className="waves-effect pink lighten-1 btn-large product"
          onClick={this.handlePurchase}
        >
          Purchase
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
