import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCategories } from '../store/reducers/categories'

//Stateless Component
const SideBar = (props) => {
  return (
    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
      <h4>Categories</h4>
      <ul className="nav nav-pills flex-column">
        {props.categories.map((category) => {
          return (
            <li key={category.id} className="nav-item">{category.name}</li>
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


const SideBarContainer = connect(mapStateToProps)(SideBar)
export default SideBarContainer
