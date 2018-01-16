import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

//Stateless Component
const SideBar = (props) => {
  return (
    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
      <h4>Categories</h4>
      <ul className="nav nav-pills flex-column">
        {props.categories.map((category) => {
          return (
            <NavLink key={category.id} to={`/categories/${category.id}`}>
              <li className="nav-item">{category.name}</li>
            </NavLink>
          )
        })
        }
      </ul>
    </nav>
  )
}

//Connection to the Redux Store

const mapStateToProps = function (state) {
  return {
    categories: state.categories
  };
}


const SideBarContainer = withRouter(connect(mapStateToProps)(SideBar))
export default SideBarContainer
