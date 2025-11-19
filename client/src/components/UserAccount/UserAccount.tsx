
import { Outlet } from 'react-router-dom';
import './UserAccount.scss';

export const AccountLayout = () => {
  return (
    <div className='account-container'>
      <div className='container account'>

        <div className='account-info' >
          <h1 className='account-info-title'>My Account</h1>
        </div>

        <div className='account-manipulation'>
          <div className='account-tabs' >
            <button className='button-accent'>Personal account</button>
            <button className='button-accent'>Address Book</button>
            <button className='button-accent'>Order history</button>
            <button className='button-accent'>Wishlist</button>
          </div>
          <a className='logout-link' href="/">Logout</a>
        </div>
        <div className="title-line"></div>

        <div className='account-main-container'>
          <Outlet />
        </div>
      </div>


    </div>
  )
}