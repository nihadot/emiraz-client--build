import React, { useEffect } from 'react';
import Placeholder from '../../assets/placeholder/placeholder-image.png';

function Lazyloading({ src, alt, className, onClick ,onLeftSwipe,onRightSwipe}) {
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




  // useEffect(() => {
    // let touchStartX = 0;

    // const handleTouchStart = (e) => {
    //   touchStartX = e.touches[0].clientX;
    // };

    // const handleTouchEnd = (e) => {
    //   const touchEndX = e.changedTouches[0].clientX;
    //   if (touchEndX - touchStartX > 50) {
    //     // Trigger right swipe action
    //     onRightSwipe?.();
    //   }
    // };

  //   const element = document.querySelector('.lazy-loading-component'); // Adjust selector if needed
  //   element?.addEventListener('touchstart', (e)=> console.log('start') );
  //   element?.addEventListener('touchend', (e)=> console.log('end') );

  //   return () => {
  //     element?.removeEventListener('touchstart', handleTouchStart);
  //     element?.removeEventListener('touchend', handleTouchEnd);
  //   };
  // }, [onRightSwipe]);

  
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
