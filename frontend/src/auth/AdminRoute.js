import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../core/helpers'

const AdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => isAuth() && isAuth().role == 1 ? (
        <Component {...props} />
    ) : (
        <Redirect 
            to={{
                pathname: "/signin",
                state: {from: props.location}
            }}
        />
    )} ></Route>
  )
}

export default AdminRoute