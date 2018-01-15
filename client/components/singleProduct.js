import React from 'react'
import { connect } from 'react-redux';
import { postCart } from '../store'

function SingleProduct(props) {
  const { product, addToCart } = props;
  return (product) ?
    (
      <div>
        {
          <div key="spContainerDiv">
            <img key={product.id} src={product.imgUrl} />
            <h6>{product.name}</h6>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.inventoryQuant}</p>

            {/* Make the ability to add things to cart */}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {/* ****** */}
          </div>
        }
      </div>
    ) :
    (<div> </div>)
}

//Connection to the Redux Store

const mapStateToProps = function (state, ownProps) {
  return {
    product: state.products.find(prod => prod.id === +ownProps.match.params.productId)
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    addToCart(prod) {
      dispatch(postCart(prod))
    }
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
export default SingleProductContainer;
