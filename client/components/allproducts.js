import React from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

function HomePage(props) {
  //Don't forget if/else logic to check if a user is an admin
  //If they are the view should also include a button to add a new product
  // We should have a component AddProductPage
  return (
    <div>
      <h1>Products</h1>
      <section className="row text-center placeholders">
        {
          props.products.map(product => {
            return (
              <div key={product.id} className="col-6 col-sm-3 placeholder">
                <NavLink to={`/products/${product.id}`}>
                  <img key={product.id} src={product.imgUrl} height="200" width="260" />
                  <h4>{product.name}</h4>
                  <div className="text-muted">{product.description}</div>
                </NavLink>
              </div>
            )
          })
        }
      </section>
    </div>
  )
}

//Connection to the Redux Store

const mapStateToProps = function (state) {
  return {
    products: state.products
  }
}

const HPProductsContainer = withRouter(connect(mapStateToProps)(HomePage))
export default HPProductsContainer;
