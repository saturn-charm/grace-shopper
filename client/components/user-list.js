import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsersThunk} from '../store/user'
import PropTypes from 'prop-types'

class UserList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllUsersThunkDispatch()
  }

  render() {
    const userList = this.props.users.map(user => {
      return (
        <ul key={user.id}>
          <li>{user.email}</li>
        </ul>
      )
    })
    console.log('in userList', this.props)
    return (
      <div>
        <h3 className="center">All Users</h3>
        <div className="row">
          {this.props.isLoggedIn && this.props.isAdmin ? (
            userList
          ) : (
            <p>You don't have access to this information.</p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.product.products,
  isLoggedIn: !!state.user.id,
  isAdmin: !!state.user.admin
})

const mapDispatchToProps = dispatch => ({
  getAllUsersThunkDispatch: () => dispatch(getAllUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)

/**
 * PROP TYPES
 */
UserList.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
