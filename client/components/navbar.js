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
          <Link to="/products" className="right">
            All Mittens
          </Link>
          <ul>
            <Link
              to="/orders"
              className="btn-floating z-depth-0 indigo darken-4 right"
            >
              <i className="tiny material-icons">shopping_basket</i>
            </Link>
            <li>
              <span className="badge white-text new pink right">5</span>
            </li>
          </ul>
          <Link to="/aboutUs" className="brand-logo">
            <i className="large material-icons"> pets </i>Mittens
          </Link>
          <div className="right">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
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
