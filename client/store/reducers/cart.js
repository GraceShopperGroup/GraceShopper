import axios from 'axios';


//ACTION TYPE
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';


// //ACTION CREATOR
export function getCart(cart) {
  const action = {
    type: GET_CART,
    cart
  }
  return action
}

export function addToCart(cart) {
  const action = {
    type: ADD_TO_CART,
    cart
  }
  return action
}

export function removeFromCart(cart) {
  return { type: REMOVE_ITEM, cart };
}

export function clearCart() { return { type: CLEAR_CART } }

// //THUNK CREATOR

export function fetchCart () {
  return function thunk(dispatch) {
    //Check to see if the API path is correct
    return axios.get('/api/cart')
    .then(res => res.data)
    .then(cart => {
      const action = getCart(cart)
      return dispatch(action);
    })
  }
}

export function postCart (item) {
  return function thunk(dispatch) {
    //Check to see if the API path is correct
    return axios.post('/api/cart', item)
    .then(res => res.data)
    .then(newCart => {
      const action = addToCart(newCart)
      return dispatch(action);
    })
    .catch(err => console.log(err))
  }
}

export function removeItem (id) {
  return function thunk(dispatch) {
    return axios.delete('/api/cart', {
      data: { id }
    })
    .then(res => res.data)
    .then(newCart => dispatch(removeFromCart(newCart)))
    .catch(err => console.log(err))
  }
}

// //REDUCER
// Never directly mutate the state, always copy old data
export default function reducer (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    case REMOVE_ITEM:
      return action.cart;
    case CLEAR_CART:
      return {}
    default:
      return state;
  }
}
