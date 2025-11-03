import React, { useState, useEffect, useCallback, memo } from "react";
import ReactDOM from "react-dom";
import { useSwipeable } from "react-swipeable";

function PhotoCarousel({ images, priority = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
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

  // Prefetch next/prev images to avoid swipe stalls
  useEffect(() => {
    if (!total) return;
    const next = (currentIndex + 1) % total;
    const prev = (currentIndex - 1 + total) % total;
    [next, prev].forEach(i => {
      const src = images[i]?.src;
      if (src) {
        const im = new Image();
        im.decoding = "async";
        im.loading = "eager";
        im.src = src;
      }
    });
  }, [currentIndex, images, total]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = (lightboxIndex !== null) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const prevSlide = useCallback(() => setCurrentIndex(i => (i - 1 + total) % total), [total]);
  const nextSlide = useCallback(() => setCurrentIndex(i => (i + 1) % total), [total]);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(() => setLightboxIndex(i => (i - 1 + total) % total), [total]);
  const nextLightbox = useCallback(() => setLightboxIndex(i => (i + 1) % total), [total]);

  const carouselHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  const lightboxHandlers = useSwipeable({
    onSwipedLeft: nextLightbox,
    onSwipedRight: prevLightbox,
    trackMouse: true,
  });

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      {/* Main Carousel */}
      <div className={`carousel ${isDark ? 'dark-mode' : ''}`} {...carouselHandlers}>
        <div
          className="carousel-track"
          style={{
            width: `${100 * total}%`,
            transform: `translate3d(-${(100 / Math.max(total, 1)) * currentIndex}%, 0, 0)`,
            transitionDuration: prefersReducedMotion ? '0ms' : undefined
          }}
        >
          {images.map((img, idx) => {
            const isHero = priority && idx === 0;
            return (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                className="carousel-image"
                style={{ width: `${100 / Math.max(total, 1)}%` }}
                loading={isHero ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={isHero ? "high" : "low"}
                sizes="100vw"
                onClick={() => openLightbox(idx)}
                draggable={false}
              />
            );
          })}
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
              loading="eager"
              decoding="async"
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

export default memo(PhotoCarousel);
