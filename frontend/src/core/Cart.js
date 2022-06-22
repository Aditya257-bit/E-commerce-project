import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Card from './Card';
import { getCartItems } from './cartHelper';
import Layout from './Layout';

const Cart = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCartItems());
    }, [items])

    return (
        <Layout title="Cart" description= "Cart Items" className='container-fluid'>
            <h2>Your cart has {items.length} items</h2>
            <hr/>
            <div className='row'>
                <div className='col-6'>
                    {
                        items && items.length > 0 ?
                        items.map((product, i) => (
                            <div className='mb-3'>
                                <Card 
                                    key={i} 
                                    product={product} 
                                    showAddToCartBtn={false} 
                                    cartUpdate={true} 
                                    showRemoveCartItemBtn={true}
                                />
                            </div>
                        )) : (
                            <h3>Your Cart is empty. <br className='mb-2'/><Link to='/'>Continue shopping</Link></h3>
                        )
                    }
                </div>
                <div className='col-6'>

                </div>
            </div>
        </Layout>
    )
}

export default Cart