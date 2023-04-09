import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Shop = () => {

    const productData = useLoaderData();
    console.log(productData);

    return (
        <div>
            {
                productData.map(product => <p>{product.name}</p>)
            }
        </div>
    );
};

export default Shop;