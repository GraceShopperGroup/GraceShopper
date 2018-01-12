import React from 'react'
import {connect} from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

function HomePage (props) {
  //Don't forget if/else logic to check if a user is an admin
  //If they are the view should also include a button to add a new product
  // We should have a component AddProductPage
  return (
    <div>
      <h1>Hit Component</h1>
      {
        props.products.map(product => {
          return (
            <div key={product.id}>
              <NavLink to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                <img key={product.id} src={product.imgUrl} />
                <p>{product.description}</p>
              </NavLink>
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

const HPProductsContainer = withRouter(connect(mapStateToProps)(HomePage))
export default HPProductsContainer;
