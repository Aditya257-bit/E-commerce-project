import React from 'react';

const ShowImage = ({item, url}) => {

    return(
        <div className='product-img'>
            <img 
                src={`http://localhost:8000/api/${url}/photo/${item._id}`}
                alt={item.name}
                className='mb-3'
                style={{maxWidth: "100%", maxHeight:"50%"}}
            />
        </div>
    )
}

export default ShowImage;