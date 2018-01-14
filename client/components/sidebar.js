import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchCategories } from '../store/reducers/categories'

//Stateless Component
const SideBar = (props) => {
  return (
    <div>
      <h4>Categories</h4>
      <ul>
        {props.categories.map((category) => {
          return (
            <li key={category.id}>{category.name}</li>
          )
        })
        }
      </ul>
    </div>
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
