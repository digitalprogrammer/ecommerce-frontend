import { API } from "../config";


//ALL METHODS TO MAKE REQUEST TO THE BACKEND

//get the user info from backend
export const read = (userId,token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}

//update the user info on the localstorage
export const updateUser = (user,next)=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}

export const getPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error))
}
