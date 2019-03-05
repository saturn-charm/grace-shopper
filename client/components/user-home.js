import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log(props)
  return (
    <div className="container">
      <h3>Welcome, {email}</h3>
      <p>Mittens are waiting for you my friend...</p>
      <button
        type="button"
        className="waves-effect purple lighten-4 btn-large"
        onClick={() => props.history.push('/products')}
      >
        Gimme Some Mittens
      </button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
