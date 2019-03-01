import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductDetailsThunk} from '../store/product'

class ProductDetails extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProductDetails(productId)
  }

  render() {
    console.log(this.props.productDetails)
    return (
      <div className="center container">
        <div>
          <h1 className="detailText">
            {this.props.productDetails.product.name}
          </h1>
          <img
            className="imgDetail"
            height="400"
            src={this.props.productDetails.product.imageUrl}
          />
          <p>{this.props.productDetails.product.description}</p>
          <p>Price: {this.props.productDetails.product.price}</p>
          <p>
            <strong>Quantity: {this.props.productDetails.product.stock}</strong>
          </p>
          <button
            className="waves-effect waves-light btn-large detail"
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
  return {
    productDetails: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProductDetails: productId => dispatch(getProductDetailsThunk(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
