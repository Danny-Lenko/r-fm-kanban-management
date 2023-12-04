import { createPortal } from 'react-dom';

export const LoadingOverlay = () => {
   return createPortal(
      <div
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 200000,
            cursor: 'wait',
         }}
      >
         Loading...
      </div>,
      document.body,
   );
};
