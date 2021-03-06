export const additem = (item, next) => {
    let cart = [];
    if(window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.push({
        ...item,
        count: 1
    })

    cart = Array.from(new Set(cart.map((p) => (p._id)))).map((id) => {
        return cart.find((p) => p._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}

export const totalItem = () => {
    if(window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}

export const getCartItems = () => {
    if(window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    return [];
}

export const updateCartItems = (productId, count) => {

    let cart = [];

    if(window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if(product._id == productId) {
                cart[i].count = count;
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

export const removeItem = (productId) => {

    let cart = [];

    if(window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if(product._id == productId) {
                cart.splice(cart[i], 1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return cart;
}