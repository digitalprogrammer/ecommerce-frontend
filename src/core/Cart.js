import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore'
import Card from './Card';
import { getCart,removeItem } from './cartHelper';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';


const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart())
    }, [run]);

    const showItems = items =>{
        return (
            <div>
                <h2>Your cart has {`${items.length}`} products</h2>
                <hr/>
                {items.map((product,index)=>(
                    <Card key={index} 
                    product={product} 
                    showAddToCart={false}
                    productQuantity={true}
                    showRemoveProductButton={true}
                    setRun={setRun}
                    run={run}
                     />
                ))}
            </div>
        )
    }

    const noItemsMessage = ()=>{
        return (
            <h2>
                Your cart is empty.
                <br/>
                <Link to='/shop'>Continue Shopping</Link>
            </h2>
        )
    }

    return ( 
        <Layout 
        className="container-fluid" 
        title='Shopping Cart' 
        description='Manage your cart items'>
          <div className="row">
              <div className="col-6">
                  {
                      items.length > 0 ? (
                          showItems(items)
                      ):(
                          noItemsMessage()
                      )
                  }
              </div>

                <div className="col-6">
                    <h2 className="mb-4">
                        Your cart summary
                    </h2>                    
                    <Checkout setRun={setRun} run={run} products={items}/>
                </div>
          </div>
        </Layout>
     );
}
 
export default Cart;