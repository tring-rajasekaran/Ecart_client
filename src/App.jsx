import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Outlet} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import Navbar from './components/customer/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
