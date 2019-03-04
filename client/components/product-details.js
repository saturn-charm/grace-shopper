import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductDetailsThunk, updateQuantity} from '../store/product'
import {getUserOrderThunk, addItemToOrderThunk} from '../store/order'

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProductDetails(productId)
  }

  handleAddToCart() {
    const productId = this.props.currentProduct.id
    const userId = this.props.user.id
    let orderId = this.orderId++
    console.log(orderId, productId, userId)
    const item = {orderId, productId, userId}
    this.props.addItemToOrderThunk(item)
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value
    })
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
    var quantities = []
    for (let i = 1; i <= this.props.currentProduct.stock; i++) {
      quantities.push(i)
    }
    const list = quantities.map(elem => {
      return (
        <option key={elem} value={elem}>
          {elem}
        </option>
      )
    })

    return (
      <div className="container">
        <img
          className="imgDetail"
          height="400"
          src={this.props.currentProduct.imageUrl}
        />
        <h2 className="detailText">{this.props.currentProduct.name}</h2>
        <h5>{this.props.currentProduct.description}</h5>
        <h5>Price: ${this.props.currentProduct.price}</h5>

        {/* stock dropdown menu*/}
        <div className="input-field col s12 left">
          <select
            className="browser-default"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {list}
          </select>
          <button
            type="button"
            className="waves-effect pink lighten-1 btn-large product"
            onClick={this.handleAddToCart}
          >
            Add to cart
          </button>
      
          <button
            className="waves-effect waves-light btn-large"
            type="button"
            onClick={() => this.props.history.push('/products')}
          >
            all mittens
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
    addItemToOrderThunk: item => dispatch(addItemToOrderThunk(item)),

    updateQuantity: (productId, stock) =>
      dispatch(updateQuantity(productId, stock))
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
