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
    const productList = this.props.products.map(product => {
      return (
        <div key={product.id}>
          <Link to={`/products/` + product.id}>
            <Product product={product} />
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h3 className="center">All Mittens</h3>
        <div className="row">{productList}</div>
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
