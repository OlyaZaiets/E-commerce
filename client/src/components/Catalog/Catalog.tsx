import './Catalog.scss';

import type { Product } from '../../types/products';
import { useEffect, useMemo, useState } from 'react';
import { createProduct, getProducts } from '../../api/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { useWishlist } from '../../context/wishlistContext';
import { useAuth } from '../../context/useAuth';
import { ProductModal } from '../ProductModal/ProductModal';
import type { ProductFormValues } from '../ProductForm/ProductForm';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { isAdmin } = useAuth();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const { wishlist, toggleWishlist } = useWishlist();

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  //load products
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);


//handlers

const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  setSelectedCategories(prev =>
    prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
  );
};

const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  setSelectedIngredients(prev =>
    prev.includes(value)
      ? prev.filter(item => item !== value)
      : [...prev, value]
  );
};

const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSortBy(e.target.value);
};


const filteredProducts = useMemo(() => {
  return products
    .filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      if (selectedIngredients.length > 0) {
        const hasIngredient = selectedIngredients.every(ing =>
          product.ingredients.includes(ing)
        );
        if (!hasIngredient) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'newest') return b._id.localeCompare(a._id);
      return 0;
    });
}, [products, selectedCategories, selectedIngredients, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedIngredients, sortBy]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedIngredients([]);
    setSortBy('');
    setPage(1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);
  
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='catalog-container '>
      <div className='container catalog'>
        <div>
          <h1>Catalog</h1>
        </div>
          {isAdmin && (
            <button
              className='dark-btn'
              onClick={() => setIsCreateOpen(true)}
            >
              + Add product
            </button>
          )}

        <div className='catalog-wrapper-container'>
          <div className='wrapper-filter'>
            <div className='sort-container'>
              <label 
                htmlFor='sort'

              >
                Sort by:
              </label>
              <select 
                id='sort' 
                name='sort'
                value={sortBy} 
                onChange={handleSortChange}
              >
                <option value=''>Select...</option>
                <option value='popularity'>By Popularity</option>
                <option value='price'>By Price</option>
                <option value='newest'>By Newest</option>
              </select>
            </div>

            <div className='food-category'>
              <h3>Food Categories</h3>

              <label htmlFor='soup'>
                <input 
                  id='soup'
                  type='checkbox'
                  name='category'
                  value='soup'
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes('soup')}
                />
                Soups & First Courses
              </label>

              <label htmlFor='main'>
                <input 
                  id='main'
                  type='checkbox'
                  name='category'
                  value='main'
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes('main')}

                />
                Main Dishes
              </label>

              <label htmlFor='bakery'>
                <input 
                  id='bakery'
                  type='checkbox'
                  name='category'
                  value='bakery'
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes('bakery')}

              />
                Bread & Pastries
              </label>

              <label htmlFor='dessert'>
                <input 
                  id='dessert'
                  type='checkbox'
                  name='category'
                  value='dessert'
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes('dessert')}

                />
                Desserts & Sweets
              </label>

              <label htmlFor='salad'>
                <input 
                  id='salad'
                  type='checkbox'
                  name='category'
                  value='salad'
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes('salad')}

                />
                Starters & Salads
              </label>

              <label htmlFor='drink'>
                <input 
                  id='drink'
                  type='checkbox'
                  name='category'
                  value='drink'
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes('drink')}

                />
                Drinks & Beverages
              </label>
            </div>

            <div className='food-ingredients'>
              <h3>Ingredient Filters</h3>

              <label htmlFor='potato'>
                <input 
                  id='potato'
                  type='checkbox'
                  name='ingredient'
                  value='potato'
                  onChange={handleIngredientChange}
                  checked={selectedIngredients.includes('potato')}
                />
                Potatoes
              </label>

              <label htmlFor='cheese'>
                <input 
                  id='cheese'
                  type='checkbox'
                  name='ingredient'
                  value='cheese'
                  onChange={handleIngredientChange}
                  checked={selectedIngredients.includes('cheese')}
                />
                Cheese / Cottage Cheese
              </label>

              <label htmlFor='mushrooms'>
                <input 
                  id='mushrooms'
                  type='checkbox'
                  name='ingredient'
                  value='mushrooms'
                  onChange={handleIngredientChange}
                  checked={selectedIngredients.includes('mushrooms')}
                />
                Mushrooms
              </label>

              <label htmlFor='fish'>
                <input 
                  id='fish'
                  type='checkbox'
                  name='ingredient'
                  value='fish'
                  onChange={handleIngredientChange}
                  checked={selectedIngredients.includes('fish')}
                />
                Fish
              </label>

              <label htmlFor='flour'>
                <input 
                  id='flour'
                  type='checkbox'
                  name='ingredient'
                  value='flour'
                  onChange={handleIngredientChange}
                  checked={selectedIngredients.includes('flour')}
                />
                Flour-Based Dishes
              </label>
            </div>
            <button className='dark-btn' onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className='wrapper-products'>
          {paginatedProducts.length === 0 ? (
            <div className='empty-state'>
              <p>No dishes match your filters.</p>
              <button onClick={resetFilters}>Reset filters</button>
            </div>
          ) : (
            paginatedProducts.map((item) => (
              <ProductCard 
                key={item._id}
                item={item}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                onDelete={handleDeleteProduct}
              />
            ))
          )}
          </div>

          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className='pagination'>
              <button
                className='dark-btn-pagination'
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className='pagination-info'>
                Page {page} of {totalPages}
              </span>

              <button
                className='dark-btn-pagination'
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {isCreateOpen && (
          <ProductModal
            isSaving={isSaving}
            onClose={() => setIsCreateOpen(false)}
            onSave={async (data: ProductFormValues) => {
              try {
                setIsSaving(true);

                const created = await createProduct(data);

                // optimistic prepend
                setProducts(prev => [created, ...prev]);
                setIsCreateOpen(false);
              } catch (e: any) {
                alert(e.message || 'Failed to create product');
              } finally {
                setIsSaving(false);
              }
            }}
          />
        )}
      </div>
    </div>
  )
}