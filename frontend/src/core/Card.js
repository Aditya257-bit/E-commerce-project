import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { additem, updateCartItems, removeItem } from './cartHelper';

const Card = ({
    product, 
    showViewProductBtn=true, 
    showAddToCartBtn=true, 
    cartUpdate=false, 
    showRemoveCartItemBtn=false
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const shouldRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to='/cart' />
        }
    }

    const addToCart = () => {
        additem(product, () => {
            setRedirect(true);
        });
    }

    const handleChange = (productId) => (e) => {
        setCount(e.target.value < 1 ? 1 : e.target.value);
        if(e.target.value >=1) {
            updateCartItems(productId, e.target.value);
        }
    }

    return (
        <div className='card'>
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
                {shouldRedirect(redirect)}
                {/* <ShowImage item={product} url="product" /> */}
                <p>{product.description}</p>
                <p className="black-10">Rs.{product.price}</p>
                <p className="black-9">Category: {product.category ? product.category.name : 'Invalid Category'}</p>
                <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                {
                    product.quantity > 0 ? (
                    <span className="badge badge-primary badge-pill">In Stock </span>
                    ) : (
                    <span className="badge badge-primary badge-pill">Out of Stock </span>
                    )
                }    
                <br />

                <Link to={`/product/${product._id}`}>
                    {
                        showViewProductBtn &&
                        <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                            View Product
                        </button>
                    }
                </Link>
                {
                    showAddToCartBtn &&
                    <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>
                        Add to cart
                    </button>
                }

                {
                    showRemoveCartItemBtn &&
                    <button onClick={() => removeItem(product._id)} className='btn btn-outline-danger mt-2 mb-2'>
                        Remove Product
                    </button>
                }

                {
                    cartUpdate && 
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Adjust Quantity</span>
                            </div>
                            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Card;