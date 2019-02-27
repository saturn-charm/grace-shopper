import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import Product from './product'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    console.log('inside componentdidmount of all-products')
    await this.props.getProductsThunkDispatch()
  }

  render() {
    return (
      <div id="all-products">
        <p>All Products</p>
        {this.props.products.map(product => (
          <div key={product.id}>
            <Product product={product} />
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
