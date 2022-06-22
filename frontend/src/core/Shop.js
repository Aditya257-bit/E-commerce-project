import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import Layout from './Layout';
import { prices } from './FixedPrices';
import Radiobox from './Radiobox';
import Card from './Card';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [products, setProducts] = useState();
    const [filteredResults, setFilteredResults] = useState();
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    });

    const getCategories = () => {
        axios({
            url: `http://localhost:8000/api/categories`,
            method: "GET"
        }).then((response) => {
            setCategories(response.data.categories);
        }).catch((error) => {
            console.log(error);
        })
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy == 'price') {
            const priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;

        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = (value) => {
        const data = prices;
        let array = [];

        for(let key in data) { 
            if(data[key]._id == value) {
                array = data[key].range;
            }
        }

        return array;
    }

    const loadFilteredResults = (newFilters) => {
        const data = {
            limit, skip, newFilters
        }

        axios({
            url: `http://localhost:8000/api/products/by/search`,
            method: "POST",
            data
        }).then((response) => {
            setFilteredResults(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }

     useEffect(() => {
        getCategories();
        loadFilteredResults(myFilters.filters);
    }, []);

  return (
    <Layout title="Shop" description= "Shop Description" className='container-fluid'>
        <div className='row'>
            <div className='col-4'>
                <ul>
                    <h4><strong>Filter by categories</strong></h4>
                    <Checkbox 
                        categories={categories} 
                        handleFilters={filters => handleFilters(filters, 'category')} 
                    />

                    <h4><strong>Filter by price range</strong></h4>
                    <div>
                        <Radiobox 
                            prices={prices} 
                            handleFilters={filters => handleFilters(filters, 'price')} 
                        />
                    </div>
                </ul>
            </div>
            <div className='col-8'>
                <h2 className="mb-4">All Products</h2>
                <div className="row">
                    {
                        filteredResults && 
                        filteredResults.map((p, i) => {
                            return(
                                <div className='col-4 mb-3'>
                                    <Card key={i} product={p} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Shop