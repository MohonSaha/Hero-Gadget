import React, { createContext, useContext, useState } from 'react';
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import Footer from './components/Footer';


export const ProductContext = createContext([]);
export const CartContext = createContext([]);

const App = () => {

  const { cart, products } = useLoaderData();
  const [cartArr, setCartArr] = useState(cart)




  return (

    <ProductContext.Provider value={products}>
      <CartContext.Provider value={[cartArr, setCartArr]}>
        <Header></Header>
        <div className='min-h-[calc(100vh-137px)]'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </CartContext.Provider>
    </ProductContext.Provider>


  );
};

export default App;