import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import Product from './product'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.getProductsThunkDispatch()
  }

  render() {
    return (
      <div id="all-products">
        <p>All Products</p>
        {this.props.products.map(product => (
          <div key={product.id}>
            <Link to={`/products/` + product.id}>
              <Product product={product} />
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products
})

const mapDispatchToProps = dispatch => ({
  getProductsThunkDispatch: () => dispatch(getProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
