import React from 'react';

const Radiobox = ({prices, handleFilters}) => {

    const handleChange = (e) => {
        handleFilters(e.target.value);
    }

    return (
        prices.map((p, i) => (
            <div key={i}>
                <input type='radio' value={p._id} onChange={handleChange} name={p} className='mr-2 mb-2 ml-2'/>
                <label className='form-check-label'>{p.name}</label>
            </div>
        ))
    )
}

export default Radiobox;