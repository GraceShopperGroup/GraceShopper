import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

function HPProducts (props) {
  //Don't forget if/else logic to check if a user is an admin
  //If they are the view should also include a button to add a new product
  // We should have a component AddProductPage
  return (
    <div>
      <h1>Hit Compon</h1>
      {
        props.products.map(product => {
          return (
            <div key="hpContainerDiv">
              <img key={product.id} src={product.imgUrl} />
              <h6>{product.name}</h6>
              <p>{product.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}

//Connection to the Redux Store

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

const HPProductsContainer = connect(mapStateToProps)(HPProducts)
export default HPProductsContainer;
