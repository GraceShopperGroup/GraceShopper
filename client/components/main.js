import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import SideBar from './sidebar'
import HomePage from './allproducts'
import Cart from './cart'

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
      <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-faded">
        <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span></button>
        <Link to="/" className="navbar-brand" href="#"><img src="/images/j1.png" width="60" height="50" alt="" /></Link>
        <div className="navbar-collapse collapse" id="navbarsExampleDefault" aria-expanded="false">
          {
            isLoggedIn
              ? <ul className="navbar-nav mr-auto">
                {/* The navbar will show these links after you log in */}
                <li className="nav-item">
                  <Link to="/home" classNmae="nav-link">Home</Link>
                </li>
                <li>
                  <a href="#" classNmae="nav-link" onClick={handleClick}>Logout</a>
                </li>
              </ul>
              : <ul className="navbar-nav mr-auto">
                {/* The navbar will show these links before you log in */}
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
              </ul>
          }
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" size="50" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <Link to="/cart" className="navbar-brand" href="#"><img src="/images/cart.png" width="50" height="50" alt="" /></Link>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 offset-md-3 content">
            {children}
          </main>
        </div>
      </div>
    </div >
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
