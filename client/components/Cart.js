import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//Stateless Component
const Cart = (props) => {
  return (
    <div>
      <h6>Cart</h6>
      <ul>
      {Object.keys(props.cart).map((id) => {
        return (
          <li key={id}>Product Name: {props.cart[id].name} Quantity:{props.cart[id].quantity}
                Price: {props.cart[id].quantity * props.cart[id].price}</li>
        )
      } )
      }
      </ul>
    </div>
  )
}

//Connection to the Redux Store

const mapStateToProps = function(state) {
  return {
    cart: state.cart
  };
}


const CartContainer = connect(mapStateToProps)(Cart)
export default CartContainer
