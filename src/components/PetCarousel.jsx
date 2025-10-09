import React, { useState, useEffect } from "react";
import '../styles/about-me.css';

export default function PetCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const total = images.length;

  useEffect(() => {
    // check if html has dark class
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    // set initial state
    setIsDark(html.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  const prevSlide = () => setCurrentIndex((currentIndex - 1 + total) % total);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % total);

  return (
    <div className={`carousel ${isDark ? 'dark-mode' : ''}`}>
      <div
        className="carousel-track"
        style={{
          width: `${100 * total}%`,
          transform: `translateX(-${(100 / total) * currentIndex}%)`
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            className="carousel-image"
            style={{ width: `${100 / total}%` }}
          />
        ))}
      </div>

      <button
        className="carousel-btn left"
        onClick={prevSlide}
        aria-label="Previous"
      >&#10094;</button>
      <button
        className="carousel-btn right"
        onClick={nextSlide}
        aria-label="Next"
      >&#10095;</button>

      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
