import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductDetailsThunk} from '../store/product'

class ProductDetails extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.getProductDetails(productId)
  }

  render() {
    return (
      <div className="center container">
        <h1>{this.props.product.product.name}</h1>
        <img height="400" src={this.props.product.product.imageUrl} />
        <p>{this.props.product.product.description}</p>
        <p>Price: {this.props.product.product.price}</p>
        <p>Quantity: {this.props.product.product.stock}</p>
        <button
          className="waves-effect waves-light btn-large"
          type="button"
          onClick={() => this.props.history.push('/products')}
        >
          Return to all mittens
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    // products: state.products,
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProductDetails: productId => dispatch(getProductDetailsThunk(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
