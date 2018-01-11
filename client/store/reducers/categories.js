import axios from 'axios';


//ACTION TYPE
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';


// //ACTION CREATOR
export function getCategories(categories) {
  const action = {
    type: GET_ALL_CATEGORIES,
    categories
  }
  return action
}

// //THUNK CREATOR

export function fetchCategories () {
  return function thunk(dispatch) {
    //Check to see if the API path is correct
    return axios.get('/api/categories')
    .then(res => res.data)
    .then(categories => {
      const action = getCategories(categories)
      return dispatch(action);
    })
  }
}

// //REDUCER
// Never directly mutate the state, always copy old data
export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}
