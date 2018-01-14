import React from 'react'
import {connect} from 'react-redux'
import { removeItem } from '../store'

//Stateless Component
const Cart = (props) => {
  return (
    <div>
      <h6>Cart</h6>
      <ul>
      {
        Object.keys(props.cart).map((id) => {
          return (
            <li key={id}>Product Name: {props.cart[id].name} Quantity:{props.cart[id].quantity}
                  Price: {props.cart[id].quantity * props.cart[id].price}
                  <button onClick={() => removeItem(id)}>X</button>
            </li>
          )
        })
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

const mapDispatchToProps = function(dispatch) {
  return {
    removeItem (id) {
      dispatch(removeItem(id))
    }
  }
}


const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
