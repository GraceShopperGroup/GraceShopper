import React from 'react'
import { connect } from 'react-redux';
import { postCart } from '../store'

const SingleProduct = (props) => {
  const { product, addToCart } = props;
  return (product) ?
    (
      <div>
        {
          <div key="spContainerDiv">
            <div id="prod-img">
              <img key={product.id} src={product.imgUrl} width="80%" />
            </div>
            <div id="prod-info">
              <h4>{product.name}</h4>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>{product.inventoryQuant} left</p>
              {/* Make the ability to add things to cart */}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
            {/* ****** */}
          </div>
        }
      </div >
    ) :
    (<div> </div>)
}

//Connection to the Redux Store

const mapStateToProps = function (state, ownProps) {
  return {
    product: state.products.find(prod => prod.id === +ownProps.match.params.productId)
  }
}

const mapDispatchToProps = {
  addToCart: postCart
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
export default SingleProductContainer;
