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
    console.log(this.props.product.product.name)
    return (
      <div>
        <h1>{this.props.product.product.name}</h1>
        <img height="300" src={this.props.product.product.imageUrl} />
        <p>{this.props.product.product.description}</p>
        <p>Price: {this.props.product.product.price}</p>
        <p>Quantity: {this.props.product.product.stock}</p>
        <button
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
