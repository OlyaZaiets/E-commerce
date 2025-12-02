import './Catalog.scss';
import Kutya from '../../assets/slider/Kutya.png';
import Borch from '../../assets/slider/Borch.png';
import Pampushki from '../../assets/slider/Pampushki.png';
import Vareniki from '../../assets/slider/Vareniki_with_cherries.png';
import { Heart } from 'phosphor-react';

export const Catalog = () => {
  return (
    <div className='catalog-container '>
      <div className='container catalog'>
        <div>
          <h1>Catalog</h1>
        </div>
        <div className='catalog-wrapper-container'>
          <div className='wrapper-filter'>
            <div className="sort-container">
              <label htmlFor="sort">Sort by:</label>
              <select id="sort" name="sort">
                <option value="">Select...</option>
                <option value="popularity">By Popularity</option>
                <option value="price">By Price</option>
                <option value="newest">By Newest</option>
              </select>
            </div>

            <div className='food-category'>
              <h3>Food Categories</h3>

              <label htmlFor='soups'>
                <input 
                  id='soups'
                  type='checkbox'
                  name='category'
                  value='soups'
                />
                Soups & First Courses
              </label>

              <label htmlFor='mains'>
                <input 
                  id='mains'
                  type='checkbox'
                  name='category'
                  value='mains'
                />
                Main Dishes
              </label>

              <label htmlFor='bread'>
                <input 
                  id='bread'
                  type='checkbox'
                  name='category'
                  value='bread'
                />
                Bread & Pastries
              </label>

              <label htmlFor='desserts'>
                <input 
                  id='desserts'
                  type='checkbox'
                  name='category'
                  value='desserts'
                />
                Desserts & Sweets
              </label>

              <label htmlFor='starters'>
                <input 
                  id='starters'
                  type='checkbox'
                  name='category'
                  value='starters'
                />
                Starters & Salads
              </label>

              <label htmlFor='drinks'>
                <input 
                  id='drinks'
                  type='checkbox'
                  name='category'
                  value='drinks'
                />
                Drinks & Beverages
              </label>
            </div>

            <div className='food-ingredients'>
              <h3>Ingredient Filters</h3>

              <label htmlFor='potatoes'>
                <input 
                  id='potatoes'
                  type='checkbox'
                  name='ingredient'
                  value='potatoes'
                />
                Potatoes
              </label>

              <label htmlFor='cheese'>
                <input 
                  id='cheese'
                  type='checkbox'
                  name='ingredient'
                  value='cheese'
                />
                Cheese / Cottage Cheese
              </label>

              <label htmlFor='mushrooms'>
                <input 
                  id='mushrooms'
                  type='checkbox'
                  name='ingredient'
                  value='mushrooms'
                />
                Mushrooms
              </label>

              <label htmlFor='fish'>
                <input 
                  id='fish'
                  type='checkbox'
                  name='ingredient'
                  value='fish'
                />
                Fish
              </label>

              <label htmlFor='flour'>
                <input 
                  id='flour'
                  type='checkbox'
                  name='ingredient'
                  value='flour'
                />
                Flour-Based Dishes
              </label>
            </div>
            <button className='dark-btn'>
              Reset
            </button>
          </div>

          <div className='wrapper-products'>
            <div className='product-card'>
              
            <span className="product-label new">NEW </span>
            <span className="product-label hot">HOT</span>

            <button className="favorite-btn">
              <Heart size={20} weight="fill" />
            </button>

              <img src={Kutya} alt="Kutya"  className='product-picture'/>
              <div className='product-info'>
                <h3>Kutya</h3>
                <p className='price'>3€ pro 100 g </p>
              </div>
              <button className='dark-btn'>Add to card</button>
            </div>

            <div className='product-card'>
              <img src={Borch} alt="Kutya"  className='product-picture'/>
              <div className='product-info'>
                <h3>Kutya</h3>
                <p className='price'>3€ pro 100 g </p>
              </div>
              <button className='dark-btn'>Add to card</button>
            </div>

            <div className='product-card'>
              <img src={Pampushki} alt="Kutya"  className='product-picture'/>
              <div className='product-info'>
                <h3>Kutya</h3>
                <p className='price'>3€ pro 100 g </p>
              </div>
              <button className='dark-btn'>Add to card</button>
            </div>

            <div className='product-card'>
              <img src={Vareniki} alt="Kutya"  className='product-picture'/>
              <div className='product-info'>
                <h3>Kutya</h3>
                <p className='price'>3€ pro 100 g </p>
              </div>
              <button className='dark-btn'>Add to card</button>
            </div>


          </div>
        </div>

      </div>

    </div>
  )
}