import React, { useContext } from 'react';
import { deleteShoppingCart, getShoppingCart, removeFromDb } from '../utils/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import CartItem from './Cards/CartItem';
import { CartContext } from '../App';
import { toast } from 'react-hot-toast';

const Cart = () => {

    const [cartArr, setCartArr] = useContext(CartContext);


    let total = 0;
    if (cartArr.length > 0) {
        for (const product of cartArr) {
            total = total + product.price * product.quantity;
        }
    }

    // Remove item from shopping cart:

    const handleRemoveItem = (id) =>{
        const remaining = cartArr.filter(product => product.id !== id);
        setCartArr(remaining)
        removeFromDb(id)
        toast.error('Product Removed! 🔥')
    }


    //place order:
    const orderHandler = () =>{
        if(cartArr.length > 0){
            setCartArr([])
            deleteShoppingCart()
            return toast.success('Order Done');
        }
        return toast.error('Cart Empty! 🔥')
    }

    // Clear Cart:
    const deleteCartHandler = () =>{
        if(cartArr.length > 0){
            setCartArr([])
            deleteShoppingCart()
            return toast.success('All items removed!');
        }
        return toast.error('Cart Empty! 🔥')
    }

    return (
        <div className='flex min-h-screen items-start justify-center bg-gray-100 text-gray-900'>


            <div className='flex flex-col max-w-3xl p-6 space-y-4 sm:p-10'>

                <h2 className='text-xl font-semibold'>{cartArr.length ? 'Review Cart Items' : 'Cart is EMPTY!'}</h2>

                <ul className='flex flex-col divide-y divide-gray-700'>

                    {
                        cartArr.map(product => <CartItem
                            product={product}
                            key={product.id}
                            handleRemoveItem={handleRemoveItem}
                        ></CartItem>)
                    }
                </ul>
                <div className='space-y-1 text-right'>
                    <p>Total AMount: <span className='font-semibold'>${total}</span></p>
                    <p className='text-sm text-gray-400'>No including taxes and shipping costs</p>
                </div>

                <div className='flex justify-end space-x-4'>
                    {
                        cartArr.length > 0 ? <button onClick={ deleteCartHandler} className='btn-outlined'>
                            Clear Cart</button>
                            :
                            <Link to='/shop'><button className='btn-outlined'>Back To Shop</button></Link>
                    }

                    <button onClick={orderHandler} className='btn-primary'>Place Order</button>
                </div>

            </div>
        </div>
    );
};

export default Cart;