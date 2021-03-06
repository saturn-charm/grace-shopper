import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductDetailsThunk} from '../store/product'
import {addItemToOrderThunk, getUserOrderThunk} from '../store/order'

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      textPopUp: ''
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId

    this.props.getProductDetailsThunkDispatch(productId)
    this.props.getUserOrderThunkDispatch()
  }
  handleAddToCart() {
    console.log(
      "in handleaddtocart, here's this.state.value: ",
      this.state.value
    )
    this.props.addItemToOrderThunkDispatch(
      this.props.currentProduct,
      this.props.currentOrder.id,
      this.state.value
    )

    let addText
    let value = this.state.value
    if (value > 1) addText = 'items are added to your cart'
    else addText = 'item is added to your cart'
    this.setState({
      textPopUp: `${value} ${addText}`
    })
  }

  handleChange(evt) {
    console.log('in handlechange: ', evt.target.value)
    this.setState({
      value: evt.target.value
    })
  }

  render() {
    const stock = this.props.currentProduct.stock

    var quantities = []
    for (let i = 1; i <= stock; i++) {
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
        <p className="pink-text">{this.state.textPopUp}</p>

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
            className="waves-effect waves-light btn-large product"
            type="button"
            onClick={() => this.props.history.push('/products')}
          >
            All Mittens
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentProduct: state.product.product,
    currentOrder: state.order.myCart
  }
}

const mapDispatch = dispatch => {
  return {
    getProductDetailsThunkDispatch: productId =>
      dispatch(getProductDetailsThunk(productId)),

    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk()),

    addItemToOrderThunkDispatch: (item, orderId, quantity) =>
      dispatch(addItemToOrderThunk(item, orderId, quantity))
  }
}

export default connect(mapState, mapDispatch)(ProductDetails)
