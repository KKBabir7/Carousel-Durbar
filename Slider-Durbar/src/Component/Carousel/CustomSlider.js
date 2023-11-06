import React, { useState, useEffect } from 'react';
import SliderData from '../../CarouselData/Data';
import { BsFillCaretRightFill } from "react-icons/bs";


const MAX_DESCRIPTION_LENGTH = 200;

const CustomSlider = () => {
  const [slidesData, setSlidesData] = useState(SliderData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [startX, setStartX] = useState(0);

  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
    }
    return description;
  };

  const handleMouseDown = (e) => {
    setStartX(e.pageX);
  };

  const handleMouseUp = (e) => {
    const difference = startX - e.pageX;
    if (difference > 100) {
      // Swipe right
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length);
    } else if (difference < -100) {
      // Swipe left
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }
    setStartX(0);
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slidesData.length;
        setCurrentSlide(nextSlide);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [currentSlide, slidesData, isPaused]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className='slider-container' onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className='text-container-box'>
        {[...slidesData, ...slidesData, ...slidesData].slice(currentSlide, currentSlide + 3).map((slide, index) => (
          <div
            className={`slide ${index === 1 ? 'slick-center' : ''} ${index === 1 ? 'slide-in' : ''} ${
              index === 0 ? 'slide-out' : ''
            }`}
            key={index}
          >
            <div className="text-container">
              <h2>Coming Soon</h2>
              <h1>{slide.title}</h1>
              <div className='duarationRating'>
                <div className='duaration'>
                  <p>{slide.movieD}</p>
                </div>
                <div className='rating'>
                  <p><span className='imdb'>IMDb</span> <span>{slide.rating}</span></p>
                </div>
              </div>
              <p className='dscription'>{isDescriptionExpanded ? slide.description : truncateDescription(slide.description)}<span>{slide.description.length > MAX_DESCRIPTION_LENGTH && (
                <button onClick={toggleDescription}>
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
              )}</span></p>
              <br></br>
              <a  className='watchNow' href={slide.watchlink}><BsFillCaretRightFill />Watch Now</a>
            </div>
          </div>
        ))}
      </div>
      <div className='image-container-box'>
        <div className='image-container-flex' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          {[...slidesData, ...slidesData, ...slidesData].slice(currentSlide, currentSlide + 3).map((slide, index) => (
            <div key={index} className={`image-container p-0 animation-slide-${(index + 1) % 3}`}>
              <img
                src={slide.image}
                alt={`Slide ${currentSlide + index + 1}`}
                className={`image-scale ${index === 1 ? 'centered-image' : ''}`}
              />
            </div>
          ))}
          </div>
        </div>
    </div>
  );
};

export default CustomSlider;
