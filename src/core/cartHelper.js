//add item to local storage
export const addItem = (item,next) =>{
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count:1
        })
        //eliminate duplications of products, the set do that
        cart = Array.from(new Set(cart.map((product)=>(product._id))))
        .map(id => {
            return cart.find(product => product._id === id) 
        })

        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }
}

//total item in the cart
export const itemTotal = ()=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
}

//get all the items inside the cart on the local storage
export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}

//update the quantity of the same product in the cart
export const updateItem = (productId,count)=>{
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, index) => {
            if (product._id === productId) {
                cart[index].count = count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    return cart
    
}

//remove a product from the cart
export const removeItem = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, index) => {
            if (product._id === productId) {
                cart.splice(index, 1)
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
    }    
}

export const emptyCart = next =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('cart')
        next()
    }
}