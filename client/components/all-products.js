import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await getProductsThunkDispatch()
  }

  render() {
    return (
      <div id="all-products">
        <p>All Products</p>
        {this.props.products.map(product => <Product product={product} />)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products
})

const mapDispatchToProps = () => ({
  getProductsThunkDispatch: () => dispatch(getProductsThunk())
})

connect(mapStateToProps, mapDispatchToProps)(AllProducts)
export default connect
