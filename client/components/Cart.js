import React from 'react'
import { connect } from 'react-redux'
import { removeItem, makeOrder, clearCart } from '../store'

//Stateless Component
const Cart = (props) => {
  const { cart, removeFromCart, checkout } = props;
  let total = 0;
  return (
    <div>
      <div className="header-title text-center">
        <h2 className="heading-main">Shopping Cart</h2>
      </div>
      <table className="cart-table full table--responsive">
        <thead className="cart-row cart-header-labels">
          <tr>
            <th colSpan="2" className="text-center">Product</th>
            <th className="text-center apph3">Price</th>
            <th className="text-center apph3">Quantity</th>
            {/* <th className="text-right apph3">Total</th> */}
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(cart).map((id) => {
              total += cart[id].quantity * cart[id].price
              return (
                <tr className="cart-row table-section" key={id}>
                  <td className="remove-button">
                    <button onClick={() => removeFromCart(id)}>X</button>
                  </td>
                  <td className="cart-product prod-name">
                    {cart[id].name}
                  </td>
                  <td className="cart-product prod-price">
                    ${parseFloat(cart[id].price).toFixed(2)}
                  </td>
                  <td className="cart-product prod-quantity">
                    {cart[id].quantity}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div id="tfooter">
        <h4>
          TOTAL: ${total.toFixed(2)}
        </h4>
        <button onClick={() => checkout()} > Checkout </button>
      </div>
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
  return ({
    removeFromCart(id) {
      dispatch(removeItem(id))
    },
    checkout() {
      dispatch(makeOrder())
      dispatch(clearCart())
    }
  })
}


const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
