import { useEffect, useMemo, useState } from 'react';
import './SearchModal.scss';
import type { Product } from '../../types/products';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  onClose: () => void;
}

export const SearchModal = ({ onClose } : Props ) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  getProducts().then(setProducts);
  }, []);


  const latestProducts = useMemo(() => {
  return [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 7);
}, [products]);

const debouncedQuery = useDebounce(query, 400)

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];

    const lowerQuery = debouncedQuery.toLowerCase();

    return products.filter(p =>
      p.title.toLowerCase().includes(lowerQuery)
    );
  }, [products, debouncedQuery]);


  const visibleProducts = debouncedQuery ? searchResults : latestProducts;

   // ⌨️ Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSelect = (id: string) => {
    if (!id) return;
    onClose();
    navigate(`/products/${id}`);
  };


  return(
        <div className='search-backdrop' onClick={onClose}>
      <div className='search-modal' onClick={e => e.stopPropagation()} >
        <input
          autoFocus
          placeholder='Search for a dish...'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className='results'>
          {visibleProducts.map(product => (
            <div
              key={product._id}
              className='result-item'
              onClick={() => handleSelect(product._id)}
            >
              <img src={product.imageUrl} alt={product.title} />
              <div>
                <p className='title'>{product.title}</p>
                <p className='price'>{product.price} €</p>
              </div>  
            </div>
          ))}
          {debouncedQuery && visibleProducts.length === 0 && (
            <p className="empty">Nothing found, try again</p>
          )}
        </div>
      </div>
    </div>
  )
}