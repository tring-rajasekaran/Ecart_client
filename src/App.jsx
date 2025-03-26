import { Outlet } from 'react-router-dom'
import Navbar from './components/customer/Navbar'
import { createContext, useState } from 'react'

export const CustomerContext = createContext();

function App() {
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <CustomerContext.Provider value={{quantity,setQuantity}}>
        <Navbar />
        <Outlet />
      </CustomerContext.Provider>
    </>
  )
}

export default App
