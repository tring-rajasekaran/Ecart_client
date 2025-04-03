import { Outlet } from 'react-router-dom';
import Navbar from './components/customer/Navbar';
import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GET_CART_QUANTITY } from './graphql/query/productQuery';
import { useLazyQuery } from '@apollo/client';
import Cookies from 'js-cookie'


export const CustomerContext = createContext();

function App() {
  const [quantity, setQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);


  function getJWT() {
    const cookieString = document.cookie;
    console.log("cookies=======",cookieString )
    // const cookies = cookieString.split(';');
    // for (let i = 0; i < cookies.length; i++) {
    //   const cookie = cookies[i].trim();
    //   if (cookie.startsWith('jwt')) {
        
    //     return cookie.substring(4); 
    //   }
    // }
    // return null; 
  }

  const jwt = getJWT();
  console.log("JWT Token:", jwt); 

  console.log(document.cookie);
  

  useEffect(() => {
    if (isLogin) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const [getCartQuantity] = useLazyQuery(GET_CART_QUANTITY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log('data ', data.getCartQuantity);
      setQuantity(data.getCartQuantity);
    },
  });

  useEffect(() => {

      getCartQuantity();
  }, []);


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
