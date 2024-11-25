import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const images = [
  "https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/carusel-01.png?t=2024-11-24T23%3A17%3A37.345Z",
  "https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/carusel-02.png?t=2024-11-24T23%3A17%3A48.610Z",
  "https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/carusel-03.png?t=2024-11-24T23%3A17%3A57.254Z",
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
