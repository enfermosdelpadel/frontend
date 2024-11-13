
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const images = [
    'https://lastrafoto.com/wp-content/uploads/2023/09/BN24.jpg?123',
    '<https://via.placeholder.com/800x400.png?text=Slide+2>',
    '<https://via.placeholder.com/800x400.png?text=Slide+3>',
  ];
function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }
    return (

    <div className="relative w-full max-w-8xl mx-auto">
        <div className="overflow-hidden relative h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform transform ${
                index === currentIndex ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
           
          onClick={prevSlide}
        >
        <ChevronLeftIcon className="h-6 w-6" /> 
          
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
    </div>

      
    );
}

export { Carousel };
