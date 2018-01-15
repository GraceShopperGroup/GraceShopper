import React from 'react'
import { connect } from 'react-redux'
import { removeItem } from '../store'

//Stateless Component
const Cart = (props) => {
  const { cart, removeFromCart } = props;
  return (
    <div>
      <h6>Cart</h6>
      <ul>
        {
          Object.keys(cart).map((id) => {
            return (
              <li key={id}>{cart[id].name} Quantity:{cart[id].quantity}
                Price: {cart[id].quantity * cart[id].price}
                <button onClick={() => removeFromCart(id)}>X</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

//Connection to the Redux Store

const mapStateToProps = function (state) {
  return {
    cart: state.cart
  };
}

const mapDispatchToProps = function (dispatch) {
  return {
    removeFromCart(id) {
      dispatch(removeItem(id))
    }
  }
}


const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
