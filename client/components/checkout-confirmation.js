import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class CheckoutConfirmation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>Thank you, your order has been placed.</div>
        <div>Thank you, your order has been placed.</div>
      </div>
    )
  }
}

// const mapState = state = ({

// })

// export default connect(mapState)(CheckoutConfirmation)
