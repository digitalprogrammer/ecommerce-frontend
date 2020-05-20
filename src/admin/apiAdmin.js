import { API } from "../config";

//make a request to backend to create a category
export const createCategory = (userId,token,category) =>{
    return fetch(`${API}/category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res =>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

//make a request to backend to create a product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',            
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.log(error)
        })
}

//take all the categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//list all the orders for the admin
export const listOrders = (userId,token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',            
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}


//get the product status from the backend and serves to the frontend
export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//update the orders that was purchased by the clients
export const updateOrderStatus = (userId, token,orderId,status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({status,orderId})
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//get all the products
export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}


export const deleteProduct = (productId,userId,token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//get a single product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}


export const updateProduct = (productId, userId, token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',           
            Authorization: `Bearer ${token}`
        },
        body:product
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}


