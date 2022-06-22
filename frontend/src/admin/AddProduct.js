import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isAuth, getCookie } from '../core/helpers';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';

const AddProduct = () => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        quantity: ""
    })

    const { 
        name,
        description,
        price,
        categories,
        category,
        quantity
    } = values;

    useEffect(() => {
        axios({
            url: `http://localhost:8000/api/categories`,
            method: 'GET'
        }).then((response) => {
            setValues({...values, categories: response.data.categories});
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const handleChange = name => (e) => {
        setValues({...values, [name]: e.target.value});
        console.log(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            url: `http://localhost:8000/api/product/create/${isAuth()._id}`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            },
            data: { values }
        }).then((response) => {
            setValues({name: "", description: "", price: "", quantity: ""})
            toast.success(response.data.message);
        }).catch(error => {
            toast.error(error.response.data.error);
        })
    }

    const productForm = () => (
        <form className="mb-3">

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name='name' value={name}  
                    onChange={handleChange('name')} 
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea 
                    className="form-control" 
                    name='description' 
                    value={description} 
                    onChange={handleChange('description')} 
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name='price' 
                    value={price} 
                    onChange={handleChange('price')}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name='quantity' 
                    value={quantity} 
                    onChange={handleChange('quantity')}
                />
            </div>

            <button onClick={handleSubmit} className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    return(
        <Layout  title="Create Product" description= "Product Description" className="container col-md-9 offset-md-2">
            <ToastContainer/>
            {productForm()}
        </Layout>
    )
}

export default AddProduct;