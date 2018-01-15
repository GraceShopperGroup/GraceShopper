import axios from 'axios';


//ACTION TYPE
const GET_ORDERS = 'GET_ORDERS';


// //ACTION CREATOR
export function getOrders(orders) { return { type: GET_ORDERS, orders}}
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

// //REDUCER
// Never directly mutate the state, always copy old data
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state;
  }
}