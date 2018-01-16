import React from 'react'
import {connect} from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom';

//Stateless Component
const SingleCategory = (props) => {
  const {category} = props
return (category) ? (
  <div>
  <h1 className="page-header">{category.name}</h1>
  <section className="row text-center placeholders">
    {
      category.products.map(product => {
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
  ):
  (<div> </div>)
}

//Connection to the Redux Store

const mapStateToProps = function(state, ownProps) {
  return {
    category: state.categories.find(category => category.id === +ownProps.match.params.categoryId)
  }
}


const SingleCategoryContainer = withRouter(connect(mapStateToProps)(SingleCategory))
export default SingleCategoryContainer
