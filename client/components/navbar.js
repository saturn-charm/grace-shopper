import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar-fixed">
    <nav>
      <div className="nav-wraper">
        <div className="container">
          <ul className="orders">
            <Link to="/orders" className="btn-floating z-depth-0 white right">
              <i className="material-icons pink-text darken-1">
                add_shopping_cart
              </i>
            </Link>
          </ul>
          <Link to="/home" className="brand-logo">
            <i className="large material-icons"> pets </i>Mittens
          </Link>
          <div className="right">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/myaccount">My Account</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
          <Link to="/products" className="right">
            All Mittens
          </Link>
          <Link to="/home" className="right">
            Home
          </Link>
        </div>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
