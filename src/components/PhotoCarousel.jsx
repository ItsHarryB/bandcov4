import React, { useState, useEffect } from "react";
import '../styles/about-me.css';

export default function PhotoCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;

  // Detect dark mode dynamically
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    setIsDark(html.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const prevSlide = () => setCurrentIndex((currentIndex - 1 + total) % total);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % total);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
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
              onClick={() => openLightbox(idx)}
            />
          ))}
        </div>

        <button className="carousel-btn left" onClick={prevSlide} aria-label="Previous">&#10094;</button>
        <button className="carousel-btn right" onClick={nextSlide} aria-label="Next">&#10095;</button>

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

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="lightbox-image"
            />
            <button className="lightbox-btn left" onClick={prevSlide} aria-label="Previous">&#10094;</button>
            <button className="lightbox-btn right" onClick={nextSlide} aria-label="Next">&#10095;</button>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">&#10005;</button>
          </div>
        </div>
      )}
    </>
  );
}
