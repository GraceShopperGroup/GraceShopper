import React from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

const HomePage = (props) => {

  return (
    <div>
      <h1 className="page-header">Products</h1>
      <section className="row text-center placeholders">
        {
          props.products.map(product => {
            return (
              <div key={product.id} className="col-xs-6 col-sm-3 placeholder">
                <NavLink to={`/products/${product.id}`}>
                  <img key={product.id} src={product.imgUrl} width="100%" />
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
