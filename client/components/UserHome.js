import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// /import { disconnect } from 'cluster';

/**
 * COMPONENT
 */
const UserHome = (props) => {
  const { email, orders } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {
        orders.map(order => {
          return (
            <div key={order.id} className="col-xs-6 col-sm-3 placeholder">
              <h4>Order: {order.id}</h4>
              {
                order.products.map(product => {
                  return (
                    <div key={product.id}>
                      <img src={product.imgUrl} width="100%" />
                      <div className="text-muted">{product.priceAtPurchase}</div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    orders: state.orders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
