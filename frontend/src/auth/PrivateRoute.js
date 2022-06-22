import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuth } from '../core/helpers'

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => isAuth() ? (
        <Component {...rest}/>
    ) : (
        <Redirect 
            to={{
                pathname: "/signin",
                state: {from: props.location}
            }}
        />
    )}>

    </Route>
  )
}

export default PrivateRoute;