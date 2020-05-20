import { API } from '../config'


export const signup = (user) => {         
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export const signin = (user) => {          
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },       
        body: JSON.stringify(user)
    })
        .then(res => {                     
            return res.json()
        })
        .catch(error => {
            console.log(error)
        })
}

//saves the data on the window to the local storge as jwt
export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}


export const signout = next =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`,{
            method:'GET'
        })
        .then(res=>{
            console.log('signout',res)
        })
        .catch(error=>console.log(error))
    }
}

//if user is logged in it sends the token
export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}