import { getShoppingCart } from "../utils/fakedb";



export const productsAndCartData = async() =>{

    const productData = await fetch('products.json');
    const products = await productData.json();

    const savedCart = getShoppingCart();

    let cart = [];
    for (const id in savedCart) {
        const foundProduct = products.find(product => product.id === id);
        if (foundProduct) {
            foundProduct.quantity = savedCart[id];
            cart.push(foundProduct);
        }
    }
    
    return {cart, products};
}

// export default cart;
