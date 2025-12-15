import { Heart } from 'phosphor-react';
import './ProductTagsFav.scss';

// item.tags, item._id, wishlist, toggleWishlist
interface Props {
  tags?: string[];
  productId: string;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  stopPropagation?: boolean;
}

export const ProductTagsFav = ({ tags, productId, wishlist, onToggleWishlist, stopPropagation = false } : Props )  => {
    
  const handleWishlist = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onToggleWishlist(productId);
  };

  
  return (
      <div className='tags-fav-container'>
        <div className='tags-container'>
          {tags?.map(tag => (
            <span key={tag} className={`product-label product-label--${tag}`}>
              {tag.toUpperCase()}
            </span>
          ))}


        </div>
        <div>
        <button
          className='favorite-btn'
          onClick={handleWishlist}
        >
          {wishlist.includes(productId) ? (
            <Heart size={20} weight='fill' />
          ) : (
            <Heart size={20} />
          )}
        </button>

        </div>
      </div>
  )
}