import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserOrderThunk, changeQuantityThunk} from '../store/order'
import OrderItem from './orderItem'

export class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      textQuantity: ''
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
  }

  componentDidMount() {
    this.props.getUserOrderThunkDispatch()
  }

  handleUpdate(evt) {
    console.log('evt.target.value', evt.target.value)
    this.setState({
      value: evt.target.value
    })
  }

  handleUpdateButton() {
    let value = this.state.value
    // let orderId
    // let numberOfItems
    //let products = this.props.currentOrder.products
    console.log('this.state when update button is clicked: ', this.state)
    console.log('this.props when update button is clicked: ', this.props)

    // for (let i = 0; i < products.length; i++) {
    //   orderId = products[i]['item-in-order'].orderId
    //   numberOfItems = products[i]['item-in-order'].numberOfItems

    //   console.log("ORDERID AND NUMBEROFITEMS", orderId, numberOfItems)
    //   this.props.changeQuantityThunkDispatch(orderId, numberOfItems + 1)
    // }
  }
  handleCheckout() {}

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.itemsInCart.map(cartItem => {
          return (
            <div key={cartItem.productId}>
              <OrderItem orderItem={cartItem} />
            </div>
          )
        })}
      </div>
    )
    //     const productsOnOrder = this.props.currentOrder.products
    //     let quantityOrder
    //     let updatedQuantity
    //     let productId

    //     const nameAndPrice =
    //       productsOnOrder &&
    //       productsOnOrder.map(product => {
    //         productId = product['item-in-order'].productId
    //         const itemInOrder = product['item-in-order']

    //         if (productId === product.id) {
    //           quantityOrder = product['item-in-order'].numberOfItems
    //         }

    //         let quantities = []
    //         for (let i = 0; i <= product.stock; i++) {
    //           quantities.push(i)
    //         }
    //         //populates each quantity selector
    //         let selectorOptions = quantities.map(elem => {
    //           return (
    //             <option key={elem} value={elem}>
    //               {elem}
    //             </option>
    //           )
    //           })
    //         let list = {
    //           options: selectorOptions,
    //           orderItem: itemInOrder
    //         }
    //         // updatedQuantity = this.state.textQuantity
    //         // if (!updatedQuantity) updatedQuantity = quantityOrder
    //         // console.log(productName)
    //         return (
    //           <div key={product.id}>
    //             <p className="order">
    //               <br />
    //               <hr />
    //               {product.name}, price: ${product.price},<br />
    //               Quantity: {quantityOrder} <br />
    //               <div className="input-field col s12 left">
    //                 {"placeholder"}
    //               </div>
    //               <br />
    //               <button
    //                 type="button"
    //                 className="waves-effect blue lighten-3 btn"
    //                 value={this.state.value}
    //                 onClick={this.handleUpdateButton}
    //               >
    //                 Update
    //               </button>
    //               <button type="button" className="waves-effect red btn">
    //                 Remove
    //               </button>
    //             </p>
    //           </div>
    //         )
    //       })
    //     // console.log(this.props.itemsInCart)
    //     return (
    //       <div className="container">
    //         <h4>Your Shopping Cart ({this.props.user.email})</h4>
    //         {nameAndPrice}
    //         <button
    //           type="button"
    //           className="waves-effect purple lighten-4 btn-large"
    //           onClick={this.handleCheckout}
    //         >
    //           Checkout
    //         </button>
    //       </div>
    //     )
  }
}

const mapState = state => {
  return {
    user: state.user,
    currentOrder: state.order.myCart,
    itemsInCart: state.order.itemsInOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk()),
    changeQuantityThunkDispatch: (orderId, numberOfItems) =>
      dispatch(changeQuantityThunk(orderId, numberOfItems))
  }
}

export default connect(mapState, mapDispatch)(Order)
