import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Cards/ProductCard';
import { addToDb } from '../utils/fakedb';
import { CartContext, ProductContext } from '../App';
import { toast } from 'react-hot-toast';

const Shop = () => {

    const [cartArr, setCartArr] = useContext(CartContext);


    const products = useContext(ProductContext);
    
    // cart button handler 
    const handleAddToCart = (product) =>{

        let newCart = [];
        const exist = cartArr.find(existingProduct=> existingProduct.id === product.id)

        if(!exist){
            product.quantity = 1;
            newCart= [...cartArr, product]
        }
        else{
            const rest = cartArr.filter(existingProduct=> existingProduct.id !== product.id)
            exist.quantity = exist.quantity + 1;
            newCart= [...rest, exist]
        }

        toast.success('Successfully Added');
        setCartArr(newCart)
        addToDb(product.id)
    }

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8'>
            {
                products.map(product => <ProductCard
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                ></ProductCard>)
            }
        </div>
    );
};

export default Shop;