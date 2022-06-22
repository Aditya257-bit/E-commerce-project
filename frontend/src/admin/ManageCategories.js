import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookie, isAuth } from '../core/helpers'
import Layout from '../core/Layout'

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios({
            url: `http://localhost:8000/api/categories`,
            method: "GET"
        }).then((response) => {
            console.log(response.data)
            setCategories(response.data.categories);
        }).catch((error) => {
            console.log(error);
        })
    }

    const deleteCategory = (categoryId) => {
        console.log(categoryId)
        axios({
            url: `http://localhost:8000/api/category/${categoryId}/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            },
            method: "DELETE"
        }).then((response) => {
            getCategories();
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Layout title="Manage Products" description= "Perform CRUD on products" className="container">
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>
                        Total {categories.length} categories
                    </h2>
                    <hr/>
                    <ul className='list-group'>
                        {
                            categories.map((c, i) => (
                                <li 
                                    key={i} 
                                    className='list-group-item d-flex justify-content-between align-items-center'
                                >
                                    <strong>{c.name}</strong>
                                    <Link to={`/admin/category/update/${c._id}`}>
                                        <span className='badge badge-warning badge-pill'>
                                            Update
                                        </span>
                                    </Link>
                                    <span 
                                        onClick={() => deleteCategory(c._id)} 
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

export default ManageCategories;