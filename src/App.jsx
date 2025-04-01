import { Outlet } from 'react-router-dom'
import Navbar from './components/customer/Navbar'
import { createContext, useState } from 'react'
import { Toaster } from "react-hot-toast";
export const CustomerContext = createContext();

function App() {
  const [quantity, setQuantity] = useState(0);
  const [isLogin,setIsLogin]=useState(false)
  return (
    <>
      <CustomerContext.Provider value={{ quantity, setQuantity,isLogin,setIsLogin }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Outlet />
      </CustomerContext.Provider>
    </>
  )
}

export default App
