
const cartActions ={
    addToCart:'addToCart',
    removeFromCart:'removeFromCart',
    emptyCart:'emptyCart',
    removeAllFromCart:'removeAllFromCart',
    addBulkToCart:'addBulkToCart'
}


function shopReducer(cart=[], {type, item}){
    switch(type){
        case cartActions.addToCart:
            return [...cart, item];
        case cartActions.addBulkToCart:
            console.log(item)
            return [...cart, ...item];
        case cartActions.removeFromCart:
            let newCart=cart.slice()
            for (let cartItem of newCart){
                if(cartItem.id === item.id){
                    newCart.splice(newCart.indexOf(cartItem),1)
                    return newCart
                }
            }
            return newCart
        case cartActions.removeAllFromCart:
            return cart.filter((cartItem)=>item.id!== cartItem.id)

        case cartActions.emptyCart:
            return []
        default:
            throw new Error('I am not a teapot!')
    }
    
}

export{
    shopReducer,
    cartActions
}