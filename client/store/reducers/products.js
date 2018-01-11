import axios from 'axios';


//ACTION TYPE
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';


// //ACTION CREATOR
export function getProducts(products) {
  const action = {
    type: GET_ALL_PRODUCTS,
    products
  }
  return action
}

// //THUNK CREATOR

export function fetchProducts () {
  return function thunk(dispatch) {
    //Check to see if the API path is correct
    return axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      const action = getProducts(products)
      return dispatch(action);
    })
  }
}

// //REDUCER
// Never directly mutate the state, always copy old data
export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state;
  }
}
