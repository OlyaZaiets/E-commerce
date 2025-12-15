import { ProductCard } from '../ProductCard/ProductCard';
import './Wishlist.scss';
import { useWishlist } from '../../context/wishlistContext';





export const Wishlist = () => {
const { wishlistProducts, wishlist, toggleWishlist } = useWishlist();
  return (
    <div className='wishlist-page'>
      <div className='container'>
        <h2>Your Wishlist</h2>
        <h2>Amount: {wishlist.length}</h2>

        <div className='wrapper-products'>
          {wishlistProducts.map((item: any) => (
            <ProductCard 
                key={item._id}
                item={item}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
          ))}
        </div>
        
        {wishlist.length === 0 && (
          <div className='wishlist-empty'>
            <img
              src='/empty-wishlist.svg'
              alt='Empty wishlist'
              className='wishlist-empty__img'
            />

          <h3 className='wishlist-empty__title'>Your wishlist is empty</h3>

          <p className='wishlist-empty__text'>
            Save your favorite dishes so you can find them quickly anytime.
          </p>

          <a href='/catalog' className='wishlist-empty__button'>
            Browse catalog
          </a>
        </div>
        )}
      </div>

    
    </div>
  );
};
