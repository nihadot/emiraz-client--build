import React, { useEffect } from 'react';
import Placeholder from '../../assets/placeholder/placeholder-image.png';

function Lazyloading({ src, alt, className, onClick }) {
  const imageRef = React.useRef();
  const [isVisible, setIsVisible] = React.useState();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (imageRef.current) {
            observer.unobserve(imageRef.current);
          }

          
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);
  return (
    <img
      onClick={onClick}
      ref={imageRef}
      className={className}
      src={isVisible && src}
      alt={alt}
    />
  );
}

export default Lazyloading;
