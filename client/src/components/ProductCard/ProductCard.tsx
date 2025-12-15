import { Heart } from 'phosphor-react';
import type { Product } from '../../types/products';
import './ProductCard.scss';
import { useCart } from '../../context/CartContext';
  import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: Product,
  wishlist: string[],
  toggleWishlist: (id: string) => void;
}



export const ProductCard = ({ item, wishlist, toggleWishlist } : Props) => {
  const { addToCart } = useCart();
  const { isLoggedInUser } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
  if (!isLoggedInUser) {
    alert('Please log in to add items to your cart.');
    navigate('/login');
    return;
  }

  addToCart(item);
};

  return (
    <div className='product-card' key={item._id}>
      <div className='tags-fav-container'>
        <div className='tags-container'>
          {item.tags?.map(tag => (
            <span key={tag} className={`product-label product-label--${tag}`}>
              {tag.toUpperCase()}
            </span>
          ))}


        </div>
        <div>
        <button
          className='favorite-btn'
          onClick={() => toggleWishlist(item._id)}
        >
          {wishlist.includes(item._id) ? (
            <Heart size={20} weight='fill' />
          ) : (
            <Heart size={20} />
          )}
        </button>

        </div>
      </div>

      <div className='product-info-container'>
        <img src={item.imageUrl} alt={item.title}  className='product-picture'/>
        <div className='product-info'>
          <h3>{item.title}</h3>
          <p className='price'>{item.price}€ pro 100 g </p>
        </div>
      </div>
      <button className='dark-btn' onClick={handleAddToCart}>Add to card</button>
    </div>
  )
}