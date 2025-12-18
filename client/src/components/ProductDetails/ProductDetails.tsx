import { useParams } from 'react-router-dom';
import { ProductTagsFav } from '../ProductTagsFav/ProductTagsFav';
import './ProductDetails.scss';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/products';
import { useWishlist } from '../../context/wishlistContext';
import { useCart } from '../../context/CartContext';
import { getProductById, updateProduct, updateProductPrice } from '../../api/products';
import { useAuth } from '../../context/useAuth';
import { EditProductModal } from '../EditProductModal/EditProductModal';


export const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [priceValue, setPriceValue] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);



  const { wishlist, toggleWishlist} = useWishlist();
  const { addToCart } =useCart();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product) {
      setPriceValue(product.price);
    }
  }, [product]);


  const handleSavePrice = async () => {
    if (!product || priceValue === null) return;

    try {
      const updated = await updateProductPrice(product._id, priceValue);

      setProduct(prev =>
        prev ? { ...prev, price: updated.price } : prev
      );

      setIsEditingPrice(false);
    } catch (e: any) {
      alert(e.message || 'Failed to update price');
    }
  };

  const isPriceUnchanged =  product ? priceValue === product.price : true;

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

        <div className='right-side-price'>
          {isEditingPrice ? (
            <div className='price-edit'>
              <input
                type='number'
                min={0}
                step={0.1}
                value={priceValue ?? ''}
                onChange={(e) => setPriceValue(Number(e.target.value))}
              />

              <button 
                onClick={handleSavePrice}
                disabled={isPriceUnchanged}
              >
                Save
              </button>

              <button onClick={() => setIsEditingPrice(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className='price-view'>
              <h3>{product.price}€ pro 100 g</h3>

              {isAdmin && (
                <button
                  className='edit-price-btn'
                  onClick={() => setIsEditingPrice(true)}
                >
                  ✏️
                </button>
              )}
            </div>
          )}
        </div>


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
        {isAdmin && (
          <button
            className="edit-product-btn"
            onClick={() => setIsEditModalOpen(true)}
          >
            ✏️ Edit product
          </button>
        )}
        </div>

      </div>
        {isEditModalOpen && product && (
          <EditProductModal
            product={product}
            onClose={() => setIsEditModalOpen(false)}
            isSaving={isSaving}
            onSave={async (draft) => {
              try {
                setIsSaving(true);
                
                const updated = await updateProduct(product._id, {
                title: draft.title,
                description: draft.description,
                price: draft.price,
                imageUrl: draft.imageUrl,
                tags: draft.tags,
                ingredients: draft.ingredients,
              });
                setProduct(updated);
                setIsEditModalOpen(false);
              } catch (error: any) {
                alert(error.message || 'Failed to update product');
              } finally {
                setIsSaving(false);
              }
            }}
          />
        )}

    
    </div>
  )
}