import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class CheckoutConfirmation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Thank you, your order has been placed.</h3>
        <h3>Please check your email for confirmation.</h3>
      </div>
    )
  }
}
