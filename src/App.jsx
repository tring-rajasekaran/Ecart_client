import { Outlet } from 'react-router-dom';
import Navbar from './components/customer/Navbar';
import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GET_CART_QUANTITY } from './graphql/query/productQuery';
import { useLazyQuery } from '@apollo/client';

export const CustomerContext = createContext();

function App() {
  const [quantity, setQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  // Get JWT from cookies
  function getJWT() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      let [key, value] = cookie.split('=').map(c => c.trim());
      if (key === 'jwt') {
        return value;
      }
    }
    return null;
  }

  // Declare jwt here by calling the getJWT function
  const jwt = getJWT();

  // Check if JWT exists and set the login state
  useEffect(() => {
    if (jwt) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [jwt]);

  const [getCartQuantity] = useLazyQuery(GET_CART_QUANTITY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log('data ', data.getCartQuantity);
      setQuantity(data.getCartQuantity);
    },
  });

  useEffect(() => {
    if (isLogin) {
      console.log(isLogin, 'login state');
      getCartQuantity();
    }
  }, [isLogin, getCartQuantity]);

  console.log(quantity + '<<<<<<<<<<quantity');

  return (
    <>
      <CustomerContext.Provider value={{ quantity, setQuantity, isLogin, setIsLogin, jwt }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Outlet />
      </CustomerContext.Provider>
    </>
  );
}

export default App;
