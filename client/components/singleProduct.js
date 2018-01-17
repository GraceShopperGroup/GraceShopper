import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { postCart, postReviews } from '../store'

const SingleProduct = (props) => {
  const { product, addToCart, addReview, isLoggedIn, handleSubmit, userId, reviews } = props;
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
              <button disabled={product.inventoryQuant === 0} onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
            <div id="reviews">
              <h1 className="page-header">Customer Reviews</h1>
              {
                reviews ?
                  reviews.map(review => {
                    return (
                      <div key={review.id}>
                        <h4>Review</h4>
                        <p>{review.content}</p>
                      </div>
                    )
                  })
                  :
                  <div />
              }
            </div>
            {isLoggedIn ?
              <div>
                <form id="review_to_add" onSubmit={(event) => handleSubmit(event, userId)}>
                  <input name="newReview" type="text" placeholder="Add a new review..." />
                  <button>Submit</button>
                </form>
              </div>
              : <div />}
          </div>
        }
      </div >
    ) :
    (<div />)
}

//Connection to the Redux Store

const mapStateToProps = function (state, ownProps) {
  return {
    product: state.products.find(prod => prod.id === +ownProps.match.params.productId),
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    reviews: state.reviews.filter(review => review.productId === +ownProps.match.params.productId),
    addReview: postReviews
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(event, userId) {
      event.preventDefault();
      const form = document.getElementById('review_to_add')
      const newReview = {
        content: event.target.newReview.value,
        productId: ownProps.match.params.productId,
        userId
      }
      dispatch(postReviews(newReview));
      form.reset();
    },
    addToCart(prod) {
      dispatch(postCart(prod))
    },
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
export default SingleProductContainer;
