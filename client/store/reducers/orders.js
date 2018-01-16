import axios from 'axios';


//ACTION TYPE
const GET_ORDERS = 'GET_ORDERS';
const POST_ORDER = 'POST_ORDER';


// //ACTION CREATOR
export function getOrders(orders) { return { type: GET_ORDERS, orders} }
export function postOrder(order) { return { type: POST_ORDER, order} }

// //THUNK CREATOR

export function fetchOrders() {
  return function thunk(dispatch) {
    //Check to see if the API path is correct
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders)
        return dispatch(action);
      })
  }
}

export function makeOrder() {
  return function thunk(dispatch) {
    return axios.post('/api/orders')
      .then(res => res.data)
      .then(order => dispatch(postOrder(order)))
  }
}

// //REDUCER
// Never directly mutate the state, always copy old data
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case POST_ORDER:
      return [...state, action.order]
    default:
      return state;
  }
}
