import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Slider.scss';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../types/products';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/products';

export const Slider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);
  
  const sliderProducts = useMemo(() => {
    if (!products.length) return [];

    const popular = products.filter(p =>
      p.tags?.includes('popular')
    );

    // 5 або більше 
    if (popular.length >= 5) {
      return popular.slice(0, 5);
    }

    //  1–4 popular
    if (popular.length > 0) {
      const rest = products
        .filter(p => !popular.includes(p))
        .slice(0, 5 - popular.length);

      return [...popular, ...rest];
    }

    return [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

  }, [products]);

  if (!sliderProducts.length) return null;

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        loop={true}
        speed={600}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
      >
        {sliderProducts.map(product => (
          <SwiperSlide 
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className='slider-slide'
          >
            <img src={product.imageUrl} alt={product.title}/>

            <div className="slider-caption">
              <h4>{product.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}