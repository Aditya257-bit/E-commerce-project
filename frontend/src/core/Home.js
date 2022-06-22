import axios from "axios";
import react, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    const previousPage = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    }

    const nextPage = () => {
        setPageNumber(Math.max(numberOfPages -1, pageNumber))
    }

    const getProducts = () => {
        axios({
            url: `http://localhost:8000/api/products?page=${pageNumber}`,
            method: "GET"
        }).then((response) => {
            setProducts(response.data.products);
            setNumberOfPages(response.data.totalPages);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProducts();
    }, [pageNumber])

    return(
        <Layout title="Home" description= "Home Description" className='container-fluid'>
            <h2 className="mb-4">All Products</h2>
            <div className="row">
                {
                    products.map((p, i) => {
                        return(
                            <div className='col-3 mb-3'>
                                <Card key={i} product={p} pagination={true}/>
                            </div>
                        )
                    })
                }
            </div>
            <div className="btn__container">
                <button className="prev__btn" onClick={previousPage}>prev</button>
                {
                    pages.map((pageIndex) => {
                        return <button 
                                    className={`page__number ${pageIndex+1 == pageNumber+1 && "active"}`}
                                    onClick={() => setPageNumber(pageIndex)}
                                >
                                    {pageIndex + 1}
                                </button>
                    })
                }
                <button className="next__btn" onClick={nextPage}>next</button>
            </div>
        </Layout>
    )
}

export default Home;