import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Layout from './Layout';

const Product = (props) => {
    const [product, setProduct] = useState();

    const getProduct = () => {
        axios({
            url: `http://localhost:8000/api/product/${props.match.params.productId}`,
            method: 'GET'
        }).then((response) => {
            setProduct(response.data);
            console.log(response)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProduct();
    }, [props.match.params.productId])

    return (
        <Layout title={product && product.name} description= {product && product.description} className='container-fluid'>
            {
                product && 
                <div className='col-6'>
                    <Card product={product} showViewProductBtn={false} />
                </div> 
            }
        </Layout>
    )
}

export default Product