import {  NavLink } from 'react-router-dom';
import './Header.scss';
import { Heart, MagnifyingGlass, ShoppingCartSimple, User} from 'phosphor-react';

export const Header = () => {
  return(
    <div className="header-container">
      <div className='container header-inner'>
        <div className="header-logo">
          <h2>UKRAINIAN</h2>
          <h2>TASTE</h2>
        </div>
        <nav className="header-nav">
          <NavLink 
            to='catalog'
            className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Catalog
            </NavLink>
          <NavLink 
            to='interesting'
            className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Interesting
            </NavLink>
        </nav>
        <div className="header-icons-container">
          <NavLink to='search' className='header-icons' title='Search'>
            <MagnifyingGlass size={32} />
          </NavLink>
          <NavLink to='favorite' className='header-icons' title='Favorite'>
            <Heart size={32} />
          </NavLink >
          <NavLink to='cart' className='header-icons' title='Cart'>
            <ShoppingCartSimple size={32} />
          </NavLink>
          <NavLink className='header-icons' to='/login' title='Login'>
            <User size={32} />
          </NavLink>
        </div>
      </div>
    </div>
  )
}