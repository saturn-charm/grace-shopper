import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductDetailsThunk} from '../store/product'
import {getUserOrderThunk, addItemToOrderThunk} from '../store/order'

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.getProductDetails(productId)
  }
  handleAddToCart() {
    console.log('add to cart has been clicked')
    console.log('currentProduct on productDetails: ', this.props.currentProduct)
    this.props
      .getUserOrderThunkDispatch()
      .then(() =>
        console.log(
          'state after getting/creating order for user: ',
          this.props.state
        )
      )
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
          >
            Add to cart
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
    // products: state.products,
    currentProduct: state.product.product,
    user: state.user,
    currentOrder: state.order.myCart
  }
}

const mapDispatch = dispatch => {
  return {
    getProductDetails: productId => dispatch(getProductDetailsThunk(productId)),
    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
