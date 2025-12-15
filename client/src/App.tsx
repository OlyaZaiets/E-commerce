import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { Catalog } from './components/Catalog/Catalog'
import { HomePage } from './pages/HomePage/HomePage'
import { Login } from './components/Login/Login'
import { Registration } from './components/Registration/Registration'
import { AccountLayout } from './components/UserAccount/UserAccount'
import { ProfileInfo } from './components/UserAccount/ProfileInfo'
import { OrdersHistory } from './components/UserAccount/OrdersHistory'
import { Wishlist } from './components/UserAccount/Wishlist'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { CartPage } from './components/Cart/Cart'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<HomePage />}/>
          <Route path='catalog' element={ <Catalog />} />
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
            <Route path='orders' element={<OrdersHistory />} />
            <Route path='wishlist' element={<Wishlist />} />
          </Route>
          
        </Route>
      </Routes>
    </>
  )
}

export default App
