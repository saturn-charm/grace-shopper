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
        <div>
          <h1 className="detailText">{this.props.product.product.name}</h1>
          <img
            className="imgDetail"
            height="400"
            src={this.props.product.product.imageUrl}
          />
          <h5>{this.props.product.product.description}</h5>
          <h5>Price: {this.props.product.product.price}</h5>
          <h5>
            <strong>Quantity: {this.props.product.product.stock}</strong>
          </h5>
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
