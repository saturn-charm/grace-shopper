import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductDetailsThunk, updateQuantity} from '../store/product'
import {getUserOrderThunk, addItemToOrderThunk} from '../store/order'

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)
  }
  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.getProductDetails(productId)
  }

  decrease() {
    const stock = this.props.currentProduct.stock
    const productId = this.props.currentProduct.id
    this.props.updateQuantity(productId, stock - 1)
  }

  increase() {
    const stock = this.props.currentProduct.stock
    const productId = this.props.currentProduct.id
    this.props.updateQuantity(productId, stock + 1)
  }

  handleAddToCart() {
    this.props.getUserOrderThunkDispatch()
  }

  render() {
    return (
      <div className="center container">
        <div>
          <h1 className="detailText">{this.props.currentProduct.name}</h1>
          <img
            className="imgDetail"
            height="400"
            src={this.props.currentProduct.imageUrl}
          />
          <h5>{this.props.currentProduct.description}</h5>
          <h5>Price: {this.props.currentProduct.price}</h5>
          <h5>
            <strong>Quantity: {this.props.currentProduct.stock}</strong>
          </h5>
          <button
            className="waves-effect waves-light btn-large"
            type="button"
            onClick={this.handleAddToCart}
            onClick={this.decrease}
          >
            Add to cart
          </button>

          <button
            className="waves-effect pink btn-large"
            type="button"
            onClick={this.increase}
          >
            undo
          </button>

          <button
            className="waves-effect waves-light btn-large"
            type="button"
            onClick={() => this.props.history.push('/products')}
          >
            Return to all mittens
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapstatetoprops (in productdetails component): ', state)
  return {
    currentProduct: state.product.product,
    user: state.user,
    currentOrder: state.order.myCart
  }
}

const mapDispatch = dispatch => {
  return {
    getProductDetails: productId => dispatch(getProductDetailsThunk(productId)),
    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk()),
    updateQuantity: (productId, stock) =>
      dispatch(updateQuantity(productId, stock))
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
