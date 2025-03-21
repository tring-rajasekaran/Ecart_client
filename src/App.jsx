import {Outlet} from 'react-router-dom'
import Navbar from './components/customer/Navbar'

function App() {

  return (
    <> 
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
