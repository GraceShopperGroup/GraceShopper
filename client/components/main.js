import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import SideBar from './sidebar'
import HomePage from './allproducts'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <Link to="/" className="navbar-brand" href="#"><img src="/images/j1.png" width="50" height="50" alt="" /></Link>
        <form className="form-inline">
          <input className="form-control mr-sm-2"  type="text" placeholder="Search" size="50" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <div className="collapse navbar-collapse" id="navbarNav">
               <Link to="/login" className="navitem nav-link">Login</Link>
               <Link to="/signup" className="navitem nav-link">Sign Up</Link>
              </div>
            </div>
        }
        <Link to="/cart" className="navitem nav-link">Cart</Link>
      </nav>
      <SideBar />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
