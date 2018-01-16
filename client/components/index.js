/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Main } from './Main'
export { SideBar } from './SideBar'
export { default as HomePage } from './HomePage'
export { default as UserHome } from './UserHome'
export { Login, Signup } from './AuthForm'
export { default as SingleProduct } from './SingleProduct'
export { default as SingleCategory } from './singleCategory'
export { default as Cart } from './Cart'
