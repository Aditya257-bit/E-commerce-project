import axios from "axios";
import react, { useState } from "react";
import Layout from "../core/Layout";
import { isAuth, getCookie } from "../core/helpers";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AddCategory = () => {

    const [name, setCategoryName] = useState();

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            url: `http://localhost:8000/api/category/create/${isAuth()._id}`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            },
            data: {name}
        }).then((response) => {
            setCategoryName('');
            toast.success(response.data.message);
            return response.json();
        }).catch((error) => {
            toast.error(error.response.data.error);
        })
    }

      
    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
            </div>
        )
    }

    return(
        <Layout title="Create Category" description= "Category Description" className="container col-md-9 offset-md-2">
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Create Category</label>
                    <input type="text" value={name} className="form-control" onChange={handleChange} autoFocus required />
                </div>
                <button type="submit" className="btn btn-outline-primary">Create Category</button>
            </form>
            {goBack()}
        </Layout>
    )
}

export default AddCategory;