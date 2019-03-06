// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getUserOrderThunk, changeQuantityThunk} from '../store/order'
// import OrderItem from './orderItem'
//
// export class Order extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: 1,
//       textQuantity: ''
//     }
//     this.handleCheckout = this.handleCheckout.bind(this)
//     this.handleUpdate = this.handleUpdate.bind(this)
//     this.handleUpdateButton = this.handleUpdateButton.bind(this)
//   }
//
//   componentDidMount() {
//     this.props.getUserOrderThunkDispatch()
//   }
//
//   handleUpdate(evt) {
//     console.log('evt.target.value', evt.target.value)
//     this.setState({
//       value: evt.target.value
//     })
//   }
//
//   handleUpdateButton(orderId, productId, quantityOrder) {
//     // let value = this.state.value
//     //
//     // this.props.itemsInCart.map(cartItem => {
//     //   console.log("CART AMOUNT ", cartItem.numberOfItems + 1, "CART ID ", cartItem.productId)
//     //   this.props.changeQuantityThunkDispatch(cartItem.productId, cartItem.numberOfItems + 1)
//     // })
//     this.props.changeQuantityThunkDispatch(orderId, productId, quantityOrder)
//   }
//   handleCheckout() {}
//
//   render() {
//     console.log("ITEMS IN CART ", this.props.itemsInCart, "CURRENT ORDER", this.props.currentOrder.id)
//         const productsOnOrder = this.props.currentOrder.products
//         let quantityOrder
//         let updatedQuantity
//         let productId
//         let itemInCart;
//
//         const nameAndPrice =
//           productsOnOrder &&
//           productsOnOrder.map(product => {
//           //this.props.itemsInCart.map(product => {
//             productId = product['item-in-order'].productId
//             const itemInOrder = product['item-in-order']
//
//             if (productId === product.id) {
//               // quantityOrder = product['item-in-order'].numberOfItems
//               itemInCart = this.props.itemsInCart.find(el => {
//                 return el.orderId === this.props.currentOrder.id
//                   && el.productId === product['item-in-order'].productId;
//                 })
//                 console.log("ITEM !!!!: ", itemInCart);
//               //const quantityOrder = item ? item.numberOfItems : 0;
//             }
//
//             let quantities = []
//             for (let i = 0; i <= product.stock; i++) {
//               quantities.push(i)
//             }
//             //populates each quantity selector
//             let selectorOptions = quantities.map(elem => {
//               return (
//                 <option key={elem} value={elem}>
//                   {elem}
//                 </option>
//               )
//               })
//             return (
//               <div key={product.id}>
//                 <p className="order">
//                   <br />
//                   <hr />
//                   {product.name}, price: ${product.price},<br />
//                   Quantity: {itemInCart.numberOfItems} <br />
//                   <div className="input-field col s12 left">
//                     <select
//                     onChange={this.handleUpdate}
//                     className="browser-default order"
//                     >
//                       {selectorOptions}
//                     </select>
//                   </div>
//                   <br />
//                   <button
//                     type="button"
//                     className="waves-effect blue lighten-3 btn"
//                     value={this.state.value}
//                     onClick={() => this.handleUpdateButton(this.props.currentOrder.id, product.id, itemInCart.numberOfItems)}
//                   >
//                     Update
//                   </button>
//                   <button type="button" className="waves-effect red btn">
//                     Remove
//                   </button>
//                 </p>
//               </div>
//             )
//           })
//         console.log(this.props.itemsInCart)
//         return (
//           <div className="container">
//             <h4>Your Shopping Cart ({this.props.user.email})</h4>
//             {nameAndPrice}
//             <button
//               type="button"
//               className="waves-effect purple lighten-4 btn-large"
//               onClick={this.handleCheckout}
//             >
//               Checkout
//             </button>
//           </div>
//         )
//   }
// }
//
// const mapState = state => {
//   return {
//     user: state.user,
//     currentOrder: state.order.myCart,
//     itemsInCart: state.order.itemsInOrder
//   }
// }
//
// const mapDispatch = dispatch => {
//   return {
//     getUserOrderThunkDispatch: () => dispatch(getUserOrderThunk()),
//     changeQuantityThunkDispatch: (orderId, productId, numberOfItems) => dispatch(changeQuantityThunk(orderId, productId, numberOfItems))
//   }
// }
//
// export default connect(mapState, mapDispatch)(Order)
//
// // {this.props.itemsInCart.map(cartItem => {
// //   return (
// //     <div key={cartItem.productId}>
// //       <OrderItem orderItem={cartItem} />
// //     </div>
// //   )
// // })}
