import { useRef, useState, useEffect } from 'react';

import blurred from '../../resources/assets/blurred2.jpg';
import normal from '../../resources/assets/norma2.png';

const radius = 64;

export const TestingPage = () => {
   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

   const handleMouseMove = (
      e: React.MouseEvent<HTMLImageElement, MouseEvent>,
   ) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
   };

   const getCroppedStyles = () => {
      const { x, y } = cursorPosition;
      const cursorHeight = 25;

      const yCorrection = y - radius - cursorHeight;

      return {
         clipPath: `circle(${radius}px at ${x}px ${yCorrection}px)`,
      };
   };

   const ref = useRef<HTMLImageElement | null>(null);

   useEffect(() => {
      const refElement = ref.current!;

      const config = {
         attributes: true,
         attributeFilter: ['style'],
      };
      const observer = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
               const style = refElement.getAttribute('style');
               if (style) {
                  const match = style.match(/circle\((\d+)px/);
                  if (!match) {
                     refElement.style.clipPath = `circle(${radius}px at ${cursorPosition.x}px ${cursorPosition.y}px)`;
                  }
                  if (match && match[1]) {
                     const currentRadius = parseInt(match[1], 10);
                     if (currentRadius !== radius) {
                        console.log('try return');
                        refElement.style.clipPath = `circle(${radius}px at ${cursorPosition.x}px ${cursorPosition.y}px)`;
                     }
                  }
               }
            }
         });
      });
      observer.observe(ref.current as Node, config);

      return () => {
         observer.disconnect();
      };
   }, []);

   return (
      <>
         <h1>Hello Testing Page</h1>
         <div onMouseMove={handleMouseMove}>
            <div
               style={{
                  position: 'relative',
                  display: 'inline-block',
                  overflow: 'hidden',
               }}
            >
               <img
                  src={blurred}
                  alt='Blurred Questoin'
                  style={{ position: 'absolute' }}
               />
               <img
                  ref={ref}
                  // id='myId'
                  src={normal}
                  alt='Normal Question'
                  style={{
                     ...getCroppedStyles(),
                     position: 'relative',
                     zIndex: 1000,
                  }}
               />
            </div>
         </div>
      </>
   );
};
