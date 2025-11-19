import { Slider } from "../../components/Slider/Slider"
import './HomePage.scss';
import StarIcon from '../../assets/icons/Star.svg?react';
import CandleIcon from '../../assets/icons/Candle.svg?react';




export const HomePage = () => {
  return (
    <div className='homepage-container'>
      <div className="container homepage-inner">
        <div className='homepage-slider'>
          <Slider />
        </div>
        <div className="homepage-idea">
          <h3>Our Idea</h3>
          <div className="homepage-text">
            <StarIcon className="idea-icon idea-icon-star" />
            <p>Christmas is not only about dishes on the table — it is about gathering with loved ones, creating an atmosphere of comfort, joy, and togetherness.
              In Ukrainian homes, the holiday spirit comes alive through meaningful conversations, laughter, and the aromas of familiar foods that remind us of 
              family traditions passed down through generations. 
              These traditional Ukrainian Christmas dishes are more than just meals — they carry memories, warmth, and the true taste of home.
            </p>
            <p>
              Our mission is to help you bring this feeling to your own celebration. We offer a curated selection of authentic Ukrainian dishes and 
              festive meals so you can enjoy real Ukrainian Christmas flavors at your holiday table. Whether you are recreating childhood memories or 
              discovering these traditions for the first time, our foods bring the warmth, comfort, and magic of Ukrainian festive cuisine straight to your 
              home — ready to order and easy to serve.
            </p>
              <CandleIcon className="idea-icon idea-icon-candle" />
          </div>

        </div>
      </div>


    </div>
  )
}