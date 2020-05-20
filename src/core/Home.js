import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore'
import Card from './Card';
import Search from "./Search";

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrivel, setProductsByArrivel] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrivel = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrivel(data)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrivel()
        loadProductsBySell()
    }, []);


    return ( 
        <Layout className="container-fluid" title='Home Page' description='E-commerce App'>
            <Search />
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, index) =>
                    (<div key={index} className="col-4 mb-3">
                        <Card product={product} />
                    </div>))}
            </div>

            <h2 className="mb-4">New Arrivel</h2>
            <div className="row">
                {productsByArrivel.map((product, index) =>
                 (
                    <div key={index} className="col-4 mb-3">
                        <Card  product={product} />
                     </div>
                 ))}
            </div>
        </Layout>
     );
}
 
export default Home;