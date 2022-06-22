import axios from "axios";
import react, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuth, getCookie } from "../core/helpers";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const UpdateCategory = (props) => {

    const history = useHistory();

    const [values, setValues] = useState({
        name: ""
    });

    const { name } = values;

    const handleChange = (e) => {
        setValues({name: e.target.value});
    }

    const getCategory = () => {
        axios({
            url: `http://localhost:8000/api/category/${props.match.params.categoryId}`,
            method: 'GET'
        }).then((response) => {
            const data = response.data.category;
            setValues({
                ...values,
                name: data.name
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            url: `http://localhost:8000/api/category/${props.match.params.categoryId}/${isAuth()._id}`,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            },
            data: { name }
        }).then((response) => {
            // toast.success(response.data.message);
            // return response.json();
            history.push('/admin/category');
        }).catch((error) => {
            // toast.error(error.response.data.error);
            console.log(error)
        })
    }

    useEffect(() => {
        getCategory();
    }, [])
      
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

export default UpdateCategory;