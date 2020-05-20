import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage'
import moment, { updateLocale } from 'moment'
import { addItem, updateItem,removeItem } from './cartHelper';


const Card = ({ 
    productQuantity=false, 
    product,
    showRemoveProductButton=false,
    showProduct = true, 
    showAddToCart=true,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    
    const ShowViewButton = () =>{
        return (showProduct && 
        <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2 mr-4">View Product</button>
        </Link>)
    }

    const addToCart = () =>{
        addItem(product,()=>{
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect =>{
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }

    const showCartButton = (showAddToCart) =>{
        return (showAddToCart && 
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
        )
    }

    const showStock = (quantity)=>{
        return (
            quantity > 0 ? (
                <span className="badge badge-primary badge-pill">In Stock</span>
            ):(
                    <span className="badge badge-primary badge-pill">Out of Stock</span>
            )
        )
    }

    const handleChange = productId => event =>{
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            updateItem(productId,event.target.value)
        }
    }
    const cartProductQuantity = productQuantity =>{
        return (productQuantity &&
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input 
                        type="number" 
                        className="form-control"
                        value={count}
                        onChange={handleChange(product._id)}
                        />
                </div>
            </div>) 
    }

    const showRemoveButton = showRemoveProductButton =>{
        return (
            showRemoveProductButton && (
                <button                
                    onClick={() => { 
                        removeItem(product._id) 
                        setRun(!run)}
                        }
                    className="btn btn-outline-danger mt-2 mb-2"
                    >Remove Product</button>
            )
        )
    }

    return (         
        <div className="card shadow border-primary  text-center">
            <div className="card-header name"><h4 >{product.name}</h4></div>
            <div className="card-body">
                {shouldRedirect(redirect)}
            <ShowImage item={product} url='product' />
            <p className='lead mt-2'>{product.description.substring(0,100)}</p>
            <h5 className='black-10'>$ {product.price}</h5>  
            <p className="black-9">Category: {product.category && product.category.name}</p>  
            <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>        
               {showStock(product.quantity)}
               <br/>
                {ShowViewButton(showProduct)}   
                {showRemoveButton(showRemoveProductButton)}     
                {showCartButton(showAddToCart)}
                {cartProductQuantity(productQuantity)}
               
        </div>
        </div>       
     );
}
 
export default Card;