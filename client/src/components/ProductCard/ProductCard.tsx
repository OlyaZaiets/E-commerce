
import type { Product } from '../../types/products';
import './ProductCard.scss';
import { useCart } from '../../context/CartContext';
  import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { ProductTagsFav } from '../ProductTagsFav/ProductTagsFav';
import { deleteProduct } from '../../api/products';

interface Props {
  item: Product,
  wishlist: string[],
  toggleWishlist: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({ item, wishlist, toggleWishlist, onDelete } : Props) => {
  const { addToCart } = useCart();
  const { isLoggedInUser, isAdmin } = useAuth();

  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/products/${item._id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // щоб не відкривалась details page

    if (!isLoggedInUser) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    addToCart(item._id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!onDelete) return; 

    if (!confirm(`Delete '${item.title}'?`)) return;

    try {
      await deleteProduct(item._id);
      onDelete(item._id);
      alert('Product deleted');

    } catch (err: any) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div className='product-card' key={item._id}>
      <ProductTagsFav
        tags= {item.tags}
        productId={item._id}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        stopPropagation
      />

      <div 
        className='product-info-container'
        onClick={openDetails}
      >
        <img src={item.imageUrl} alt={item.title}  className='product-picture'/>
        <div className='product-info'>
          <h3>{item.title}</h3>
          <p className='price'>{item.price}€ pro 100 g </p>
        </div>
      </div>
      <div className='button-wrapper'>
        <button 
          className='dark-btn' 
          onClick={handleAddToCart}
        >
          Add to card
        </button>
        {isAdmin && onDelete && (
          <button
            className='admin-delete-btn'
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}