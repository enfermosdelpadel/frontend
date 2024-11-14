import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const images = [
  "https://media.istockphoto.com/id/1080225792/es/foto/juego-de-padel-de-sportsman.jpg?s=1024x1024&w=is&k=20&c=BtSsccsl3vtojLvGjIeI0nJKVxfI_J9_iqZG0YSI-kI=",
  "https://media.istockphoto.com/id/1995857598/es/foto/padel-blue-net-court-tennis.jpg?s=1024x1024&w=is&k=20&c=Ghldp5gtB6igRrBdfZ1Vh2AszGyKOqX0kwHfFcEafrc=",
  "https://media.istockphoto.com/id/1451156981/es/foto/tenista-femenina-jugando-al-p%C3%A1del.jpg?s=1024x1024&w=is&k=20&c=5NlzoV30Ly-0Gq29P1hoo8a9vp0-7LgGL8X5K7h2xpw=",
]

const autoSlide = true
const autoSlideInterval = 6000
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, autoSlideInterval)
      return () => clearInterval(slideInterval)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }
  return (
    <div className="relative w-full max-w-8xl mx-auto">
      <div className="overflow-hidden relative h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform transform ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <button className="btn-carousel-left" onClick={prevSlide}>
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button className="btn-carousel-right" onClick={nextSlide}>
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

export { Carousel }
