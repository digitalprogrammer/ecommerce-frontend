import { API } from "../config";
import queryString from 'query-string'

//ALL METHODS TO MAKE REQUEST TO THE BACKEND

//get products based on the sorted criterias
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
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

//take the filtered products choose on the searchbar
export const getFilteredProducts = (skip, limit, filters = {}) => {

    const data = {
        limit,
        skip,
        filters
    }
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': "application/json"           
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export const list = params => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//list all related produts, it will be show on the product detail
export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//takes the token from the backend on braintree to serves on frontend
export const getBraintreeClientToken = (userId,token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

export const processPayment = (userId, token,paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order:createOrderData})
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}