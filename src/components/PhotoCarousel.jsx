import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSwipeable } from "react-swipeable";
import '../styles/about-me.css';
import '../styles/photography.css';

export default function PhotoCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = lightbox closed
  const [isDark, setIsDark] = useState(false);
  const total = images.length;

  // Detect dark mode changes
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    setIsDark(html.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Main carousel navigation
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + total) % total);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % total);

  // Lightbox navigation
  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => setLightboxIndex((lightboxIndex - 1 + total) % total);
  const nextLightbox = () => setLightboxIndex((lightboxIndex + 1) % total);

  // Swipe handlers for main carousel
  const carouselHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  // Swipe handlers for lightbox
  const lightboxHandlers = useSwipeable({
    onSwipedLeft: nextLightbox,
    onSwipedRight: prevLightbox,
    trackMouse: true,
  });

  return (
    <>
      {/* Main Carousel */}
      <div className={`carousel ${isDark ? 'dark-mode' : ''}`} {...carouselHandlers}>
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

      {/* Lightbox Portal */}
      {lightboxIndex !== null && ReactDOM.createPortal(
        <div className="lightbox-overlay" {...lightboxHandlers} onClick={closeLightbox}>
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
