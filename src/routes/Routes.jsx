import React from 'react'
import {Route, Routes} from 'react-router-dom'
import App from '../App'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Slide from '../components/customer/Slide'
import Cart from '../components/customer/Cart'
import Your_profile from '../components/customer/Your_profile'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<App/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='slide' element={<Slide/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='profile' element={<Your_profile/>}/>
        </Route>
    </Routes>
  )
}
