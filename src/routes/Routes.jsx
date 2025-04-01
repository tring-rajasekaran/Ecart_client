import React from 'react'
import {Route, Routes} from 'react-router-dom'
import App from '../App'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Slide from '../components/customer/Slide'
import Cart from '../components/customer/Cart'
import Your_profile from '../components/customer/profile/Your_profile'
import Orders from '../components/customer/Orders'
import ProductSearch from '../components/customer/ProductSearch'
import MerchantLogin from '../components/merchant/MerchantLogin'
import MerchantRegister from '../components/merchant/MerchantRegister'
import MerchantPage from '../components/merchant/MerchantPage'
import MerchantOrders from '../components/merchant/MerchantOrders'
import MerchantNewProduct from '../components/merchant/MerchantNewProduct'


export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<App/>}>
            <Route path='' element={<Slide/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='slide' element={<Slide/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='profile' element={<Your_profile/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='products' element={<ProductSearch/>}/>
        </Route>
        <Route path='/MerchantLogin' element={<MerchantLogin/>}/>
            <Route path='/MerchantRegister' element={<MerchantRegister/>}/>
            <Route path='/MerchantPage' element={<MerchantPage/>}/>
            <Route path='/Merchantorders' element={<MerchantOrders/>}/> 
            <Route path='/MerchantNewProduct' element={<MerchantNewProduct/>}/>
    </Routes>
  )
}
