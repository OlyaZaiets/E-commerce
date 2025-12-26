import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { Catalog } from './components/Catalog/Catalog'
import { HomePage } from './pages/HomePage/HomePage'
import { Login } from './components/Login/Login'
import { Registration } from './components/Registration/Registration'
import { AccountLayout } from './components/UserAccount/UserAccount'
import { ProfileInfo } from './components/ProfileInfo/ProfileInfo'
import { OrdersPage } from './components/OrdersHistory/OrdersHistory'
import { Wishlist } from './components/Wishlist/Wishlist'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { CartPage } from './components/Cart/Cart'
import { ProductDetails } from './components/ProductDetails/ProductDetails'
import { AddressBook } from './components/AddressBook/AddressBook'
import { OrderDetailsPage } from './components/OrderDetails/OrderDetails'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<HomePage />}/>
          <Route path='catalog' element={ <Catalog />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path='login' element={ <Login />} />
          <Route path='registration' element={ <Registration />} />
          <Route path='cart' element={ <CartPage/>} />


          <Route 
            path='account' 
            element={
              <ProtectedRoute>
                <AccountLayout/>
              </ProtectedRoute>
            }
          >
            <Route index element={ <ProfileInfo />} />
            {/* <Route path='orders' element={<OrdersHistory />} /> */}
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />

            <Route path="address" element={<AddressBook />} />
            <Route path='wishlist' element={<Wishlist />} />
          </Route>
          
        </Route>
      </Routes>
    </>
  )
}

export default App
