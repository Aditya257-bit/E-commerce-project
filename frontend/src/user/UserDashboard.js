import React from 'react'
import { Link } from 'react-router-dom';
import { isAuth } from '../core/helpers';
import Layout from '../core/Layout'

const UserDashboard = () => {

    const { _id, name, email, role } = isAuth();

    return (
        <Layout title="User" description= "User Dashboard" className="container-fluid">

            <div className="card mb-5">
                <div className="row">
                    <div className="col-3">
                        <h3 className="card-header">User Links</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to="/cart">My Cart</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/profile/update">Update Profile</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <div className="card mb-5">
                            <h3 className="card-header">User Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item">{name}</li>
                                <li className="list-group-item">{email}</li>
                                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                            </ul>
                        </div>
                        <div className="card mb-5">
                            <h3 className="card-header">Purchase History</h3>
                            <ul className="list-group">
                                <li className="list-group-item"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard;