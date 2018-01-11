import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Import all reducers here
import user from './reducers/user'
import products from './reducers/products'
import categories from './reducers/categories'

const reducer = combineReducers({user, products, categories})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store

//Export all from reducer files we imported above
export * from './reducers/user'
export * from './reducers/products'
export * from './reducers/categories'
