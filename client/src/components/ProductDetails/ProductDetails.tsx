import { useParams } from 'react-router-dom';
import { ProductTagsFav } from '../ProductTagsFav/ProductTagsFav';
import './ProductDetails.scss';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/products';
import { useWishlist } from '../../context/wishlistContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../api/products';


export const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { wishlist, toggleWishlist} = useWishlist();
  const { addToCart } =useCart();

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;



  return(
    <div className='container'>
      <div className='all-details'>
        <div className='left-side'>
          <ProductTagsFav 
          tags={product.tags}
          productId={product._id}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div className='right-side'>
        <h1>{product.title}</h1>
        <h3 className='right-side-price'>{product.price}€ pro 100 g</h3>
        <p><b>Description:</b> {product.description}</p>

        <div className="ingredients">
          <h3>Ingredients:</h3>
          <ul className='list-ingredients'>
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className='button-wrapper'>
          <button
            className="dark-btn"
            onClick={() => addToCart(product._id)}
          >
            Add to cart
          </button>
        </div>


        </div>

      </div>


    
    </div>
  )
}