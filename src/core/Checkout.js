import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelper';


const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    const [data, setData] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token
    

    const getToken = (userId,token) =>{
        getBraintreeClientToken(userId,token)
        .then(data=>{
            if(data.error){
                setData({...data,error:data.error})
            }else{
                setData({clientToken:data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId,token)    
    }, []);

    const getTotal = () =>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const showCheckout = () =>{
        return (
            isAuthenticated() ? (
                <div>{showDropIn()}</div>
            ) : (
                    <Link to='/signin'><button className="btn btn-primary">Signin to Checkout</button></Link>
                )
        )
    }

    let deliveryAddress = data.address

    //send nonce to your server
        //nonce = data.instance.requestPaymentMethod()
    const buy = () => {       
        setData({loading:true}) 
        let nonce
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {               
                nonce = data.nonce
                //once you have nonce (card type,card number) send nonce
                //   as 'paymentMethodNonce' and also total to be charged
                //console.log('send nonce and total to process: ', nonce, getTotal(products))
                const paymentData = {
                    paymentMethodNonce:nonce,
                    amount:getTotal(products)
                }
                processPayment(userId,token,paymentData)
                .then(res =>{                   
                    //create order
                    const createOrderData = {
                        products:products,
                        transaction_id:res.transaction.id,
                        amount:res.transaction.amount,
                        address: deliveryAddress
                    }
                    createOrder(userId,token,createOrderData)
                    .then(response => {
                        emptyCart(() => {
                            setRun(!run); // run useEffect in parent Cart
                            console.log('payment success and empty cart');
                            setData({
                                loading: false,
                                success: true
                            });
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });


                    setData({ ...data, success: res.success })
                    //empty car
                    emptyCart(() => {
                        setRun(!run); // run useEffect in parent Cart
                        console.log('payment success and empty cart')
                        setData({ loading: false })
                    })
                })
                .catch(error => 
                    {console.log(error)
                    setData({loading:false})})
            })
            .catch(error => {
                //console.log('Dropin error: ', error)
                setData({ ...data, error: error.message })
            })
    }

    const handleAddress = event =>{
        setData({...data,address:event.target.value})
    }

    //show the drop down to the braintree payment system
    const showDropIn = () =>{
        return (
            <div onBlur={()=>setData({...data,error:''})}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="form-group mb-3">
                            <label className="text-muted">Delivery Address: </label>
                            <textarea 
                                onChange={handleAddress} 
                                value={data.address}  
                                className="form-control"
                                placeholder='Type your delivery address here...'
                                />
                        </div>
                        <DropIn 
                            options={{authorization:data.clientToken,
                                paypal:{
                                    flow:'vault'
                                }}}
                            onInstance={instance =>(data.instance = instance)}
                            />
                            <button onClick={buy} className="btn btn-success btn-block">Payment</button>
                    </div>
                ): null}
            </div>
        )
    } 

    const showError = error =>{
        return (
            <div 
                className="alert alert-danger"
                style={{display:error ? '':'none'}}
                >
                {error}
            </div>
        )
    }

    const showSuccess = success => {
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? '' : 'none' }}
            >
                <div className="text-center">Thanks! Your payment was successfull</div>
            </div>
        )
    }

    const showLoading = loading =>{
        return (
            loading && <h2>Loading...</h2>
        )
    }

    
    return ( 
        <div>
            <h2>Total: $ {getTotal()}</h2>
            {showLoading(data.loading)}
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
        </div>
     );
}
 
export default Checkout;