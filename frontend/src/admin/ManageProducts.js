import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookie, isAuth } from '../core/helpers'
import Layout from '../core/Layout'

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const getProducts = () => {
        axios({
            url: `http://localhost:8000/api/products`,
            method: "GET"
        }).then((response) => {
            setProducts(response.data.products);
        }).catch((error) => {
            console.log(error);
        })
    }

    const deleteProduct = (productId) => {
        axios({
            url: `http://localhost:8000/api/product/${productId}/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            },
            method: "DELETE"
        }).then((response) => {
            getProducts();
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Layout title="Manage Products" description= "Perform CRUD on products" className="container">
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>
                        Total {products.length} products
                    </h2>
                    <hr/>
                    <ul className='list-group'>
                        {
                            products.map((p, i) => (
                                <li 
                                    key={i} 
                                    className='list-group-item d-flex justify-content-between align-items-center'
                                >
                                    <strong>{p.name}</strong>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className='badge badge-warning badge-pill'>
                                            Update
                                        </span>
                                    </Link>
                                    <span 
                                        onClick={() => deleteProduct(p._id)} 
                                        className='badge badge-danger badge-pill'
                                    >
                                        Delete
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts