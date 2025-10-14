import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import '../styles/about-me.css';
import '../styles/photography.css';

export default function PhotoCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = lightbox closed
  const [isDark, setIsDark] = useState(false);
  const total = images.length;

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

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => setLightboxIndex((lightboxIndex - 1 + total) % total);
  const nextLightbox = () => setLightboxIndex((lightboxIndex + 1) % total);

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

      {/* Lightbox rendered via portal */}
      {lightboxIndex !== null && ReactDOM.createPortal(
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="lightbox-image"
            />

            <button className="lightbox-btn left" onClick={prevLightbox} aria-label="Previous">&#10094;</button>
            <button className="lightbox-btn right" onClick={nextLightbox} aria-label="Next">&#10095;</button>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">&times;</button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
