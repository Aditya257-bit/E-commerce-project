import React, { Fragment } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { isAuth, signout } from './helpers';
import "../styles.css";
import { totalItem } from './cartHelper';

const Layout = ({title="Title", description="Description" ,className, children}) => {

    let history = useHistory();

    const isActive = (path) => {
        if(history.location.pathname === path){
            return{color: '#ff9900'}
        }
        else{
            return{color: '#fff'}
        }
    }

    const nav = () => (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive("/")}>
                        Home
                    </Link>
                </li>

                {
                    isAuth() && isAuth().role === 0 && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop" style={isActive("/shop")}>
                                    Shop
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart" style={isActive("/cart")}>
                                    Cart <sup><small>{totalItem()}</small></sup>
                                </Link>
                            </li>
                        </>
                    )
                }

                {
                    isAuth() && isAuth().role === 1 &&  (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/dashboard" style={isActive("/admin/dashboard")}>
                                Dashboard
                            </Link>
                        </li>
                    )
                }
                
                {
                    isAuth() && isAuth().role === 0 &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/dashboard" style={isActive("/user/dashboard")}>
                                Dashboard
                            </Link>
                        </li>
                }

                {
                    !isAuth() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin" style={isActive("/signin")}>
                                    Signin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup" style={isActive("/signup")}>
                                    Signup
                                </Link>
                            </li>
                        </Fragment>
                    )
                }

                {
                    isAuth() && (
                        <li className="nav-item">
                            <Link className="nav-link" 
                                style={{color: "#fff"}}  
                                onClick={() => 
                                signout(() => {
                                    history.push('/')
                                })
                            }>
                                Signout
                            </Link>
                        </li>
                    )
                }

            </ul>
        </div>
    )

    return(
        <Fragment>
            <div>
                {nav()}
                <div className="jumbotron">
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);