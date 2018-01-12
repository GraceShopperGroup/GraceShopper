import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

function SingleProduct (props) {
  return (
    <div>
      {
        props.products.map(product => {
          return (
            <div key="spContainerDiv">
              <img key={product.id} src={product.imgUrl} />
              <h6>{product.name}</h6>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.inventoryQuant}</p>

              {/* Make the ability to add things to cart */}
              <button>Add to Cart</button>
              {/* ****** */}
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

const SingleProductContainer = connect(mapStateToProps)(SingleProduct)
export default SingleProductContainer;
