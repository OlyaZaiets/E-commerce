import {  NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { Heart, MagnifyingGlass, ShoppingCartSimple, User} from 'phosphor-react';
import { useAuth } from '../../context/useAuth';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/wishlistContext';



export const Header = () => {
  const { isLoggedInUser} = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  

  const handleCartClick = (e: any) => {
  if (!isLoggedInUser) {
    e.preventDefault(); // не дозволяємо NavLink переходити
    alert('Please log in to view your cart.');
    navigate('/login');
  }
};

const handleWishlistClick = (e: any) => {
  if (!isLoggedInUser) {
    e.preventDefault();
    alert('Please log in to use your wishlist.');
    navigate('/login');
  }
};

  return(
    <div className='header-container'>
      <div className='container header-inner'>
        <div className='header-logo'>
          <NavLink
            className={({isActive}) => isActive ? 'nav-link header-logo  active' : 'nav-link'}
            to='/'>
            <h2>UKRAINIAN <br></br> TASTE</h2>
          </NavLink>
        </div>
        <nav className='header-nav'>

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
        <div className='header-icons-container'>
          <NavLink to='search' className='header-icons' title='Search'>
            <MagnifyingGlass size={32} />
          </NavLink>
          <NavLink 
            className='header-icons' 
            to='account/wishlist'
            title='Wishlist'
            onClick={handleWishlistClick}
            >
            <Heart size={32} />
            {wishlistCount > 0 && <span className='badge fav'>{wishlistCount}</span>}

          </NavLink >
          <NavLink 
            to='cart' 
            className='header-icons' 
            title='Cart'
            onClick={handleCartClick}
          >
            <ShoppingCartSimple size={32} />
            {cartCount > 0 && (
              <span className='badge cart'>{cartCount}</span>
            )}
          </NavLink>
          <NavLink 
            className='header-icons' 
            to={isLoggedInUser ? '/account': '/login' }
            title={isLoggedInUser ? 'Account' : 'Login'}

          >
            <User size={32} />
          </NavLink>
        </div>
      </div>
    </div>
  )
}