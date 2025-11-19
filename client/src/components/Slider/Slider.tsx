import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import './Slider.scss';

import img1 from '../../assets/slider/Kutya.png'
import img2 from '../../assets/slider/Borch.png'
import img3 from '../../assets/slider/Pampushki.png'
import img4 from '../../assets/slider/Vareniki_with_cherries.png'
import img5 from '../../assets/slider/golybci.png'


// import required modules
// import { Pagination, Navigation } from 'swiper/modules';
import { Autoplay, Pagination } from 'swiper/modules';

export const Slider = () => {
  const images = [img1, img2, img3, img4, img5];

  return (
    <>
      <Swiper
        // pagination={{
        //   type: 'progressbar',
        // }}
        
        // navigation={true}
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
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`slider-${index}`}/>
          </SwiperSlide>
        ))}


      </Swiper>
    </>
  )
}