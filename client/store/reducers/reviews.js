import axios from 'axios';


//ACTION TYPE
const GET_REVIEWS = 'GET_REVIEWS';


// //ACTION CREATOR
export function getReviews(reviews) {
  const action = {
    type: GET_REVIEWS,
    reviews
  }
  return action
}

// //THUNK CREATOR

export function fetchReviews () {
  return function thunk(dispatch) {
    //Check to see if the API path is correct
    return axios.get('/api/reviews')
    .then(res => res.data)
    .then(reviews => {
      const action = getReviews(reviews)
      return dispatch(action);
    })
  }
}

// //REDUCER
// Never directly mutate the state, always copy old data
export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    default:
      return state;
  }
}
