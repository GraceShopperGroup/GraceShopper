import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//Stateless Component
function SideBar (props) {
  return (
    <div>
      <h6>Categories</h6>
      <ul>
      {props.categories.map((category) => {
        return (
          <li key={category.id}>{category.name}</li>
        )
      } )
      }
      </ul>
    </div>
  )
}

//Connection to the Redux Store

const mapStateToProps = function(state) {
  return {
    products: state.categories
  };
}

const SideBarContainer = connect(mapStateToProps)(SideBar)
export default SideBarContainer
