import react from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../core/helpers";
import Layout from "../core/Layout";

const AdminDashboard = () => {

    const { _id, name, email, role } = isAuth();

    return(
        <Layout title="Admin" description= "Admin Dashboard" className="container-fluid">

            <div className="card mb-5">
                <div className="row">
                    <div className="col-3">
                        <h3 className="card-header">Admin Links</h3>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to="/create/category">Create Category</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/create/product">Create Product</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/admin/product">Manage Products</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/admin/category">Manage Categories</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <div className="card mb-5">
                            <h3 className="card-header">Admin Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item">{name}</li>
                                <li className="list-group-item">{email}</li> 
                                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;