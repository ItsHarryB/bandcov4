import { useState, useEffect, useCallback } from "preact/hooks";
import { memo, createPortal } from "preact/compat";
import { useSwipeable } from "react-swipeable";
import "../styles/photocarousel.css";

function PhotoCarousel({ images, priority = false, theme = "default" }) {  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Helper to get image src, srcSet, and alt
  const getImageData = useCallback((img) => {
    if (typeof img === 'string') {
      return { src: img, srcSet: undefined, alt: '', url: null };
    }
    const srcValue = img?.src?.src || img?.src || img;
    return {
      src: typeof srcValue === 'string' ? srcValue : srcValue?.src || '',
      srcSet: img?.srcSet || undefined,
      alt: img?.alt || '',
      url: img?.url || null
    };
  }, []);

  // Interaction-based prefetch (Saves network data)
  const handleInteractionPrefetch = useCallback(() => {
    if (!total) return;
    const nextIdx = (currentIndex + 1) % total;
    const prevIdx = (currentIndex - 1 + total) % total;
    
    [nextIdx, prevIdx].forEach(idx => {
      const { src, srcSet } = getImageData(images[idx]);
      if (src) {
        const im = new Image();
        im.decoding = "async";
        if (srcSet) im.srcset = srcSet;
        im.src = src;
      }
    });
  }, [currentIndex, images, total, getImageData]);

  return (
    <>
      {/* 2. Add theme-${theme} to the main carousel wrapper */}
      <div 
        className={`carousel ${isDark ? 'dark-mode' : ''} theme-${theme}`} 
        {...carouselHandlers}
        onMouseEnter={handleInteractionPrefetch} 
        onTouchStart={handleInteractionPrefetch} 
      >
        <div
          className="carousel-track"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: '100%', /* Lock track to exactly container width */
            transform: `translate3d(-${currentIndex * 100}%, 0, 0)`, /* Move by exact whole slides */
            transitionDuration: prefersReducedMotion ? '0ms' : undefined
          }}
        >
          {images.map((img, idx) => {
            const { src, srcSet, alt } = getImageData(img); 
            const isHero = priority && idx === 0;
            return (
              <img
                key={idx}
                src={src}
                srcSet={srcSet}
                alt={alt}
                className="carousel-image"
                style={{ 
                  flex: '0 0 100%', /* Force image to take 100% of container, refusing to shrink */
                  width: '100%', 
                  minWidth: '100%',
                  objectFit: 'cover' /* Keeps the images looking great without distorting */
                }}
                loading={isHero ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={isHero ? "high" : "low"}
                sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1400px" 
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
      {lightboxIndex !== null && (() => {
        const activeImage = getImageData(images[lightboxIndex]);
        
        return createPortal(
          <div className={`lightbox-overlay theme-${theme}`} {...lightboxHandlers} onClick={closeLightbox}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <img
                src={activeImage.src}
                srcSet={activeImage.srcSet} 
                sizes="100vw"
                alt={activeImage.alt}
                className="lightbox-image"
                loading="eager"
                decoding="async"
                /* Changes cursor to a pointing hand ONLY if a link exists */
                style={{ cursor: activeImage.url ? 'pointer' : 'default' }}
                /* Opens the link in a new tab if clicked */
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeImage.url) {
                    window.open(activeImage.url, '_blank');
                  }
                }}
              />
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">&times;</button>
              <button className="lightbox-btn left" onClick={prevLightbox} aria-label="Previous">&#10094;</button>
              <button className="lightbox-btn right" onClick={nextLightbox} aria-label="Next">&#10095;</button>
            </div>
          </div>,
          document.body
        );
      })()}
    </>
  );
}

export default memo(PhotoCarousel);