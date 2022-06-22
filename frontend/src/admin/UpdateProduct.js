import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { isAuth, getCookie } from '../core/helpers';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProduct = (props) => {

    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: ""
    })

    const { 
        name,
        description,
        price,
        category,
        quantity
    } = values;

    const getCategories = () => {
        axios({
            url: `http://localhost:8000/api/categories`,
            method: 'GET'
        }).then((response) => {
            setCategories(response.data.categories);
        }).catch((error) => {
            console.log(error);
        })
    }

    const getProduct = () => {
        axios({
            url: `http://localhost:8000/api/product/${props.match.params.productId}`,
            method: "GET"
        }).then((response) => {
            const data = response.data;
            setValues({
                ...values,
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category._id,
                quantity: data.quantity
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    const updateProduct = () => {
        axios({
            url: `http://localhost:8000/api/product/${props.match.params.productId}/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            },
            method: "PUT",
            data: {values}
        }).then((response) => {
            <Redirect to='/' />
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCategories();
        getProduct();
    }, []);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues({...values, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct();
    }

    const productForm = () => (
        <form className="mb-3">
            {console.log(values)}

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" name='name' value={name}  onChange={handleChange} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea className="form-control" name='description' value={description} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" name='price' value={price} onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select className="form-control" name='category' onChange={handleChange}>
                    <option selected disabled>Select Category</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control" name='quantity' value={quantity} onChange={handleChange}/>
            </div>

            <button onClick={handleSubmit} className="btn btn-outline-primary">Update Product</button>
        </form>
    )

    return(
        <Layout  title="Create Product" description= "Product Description" className="container col-md-9 offset-md-2">
            <ToastContainer/>
            {productForm()}
        </Layout>
    )
}

export default UpdateProduct;