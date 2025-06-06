import { useState, useEffect, memo, useMemo, useCallback } from 'react';

const Blob = memo(function Blob() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const blobStyle = useMemo(() => ({
    position: 'fixed',
    top: position.y,
    left: position.x,
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent 60%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    transition: 'top 0.1s ease-out, left 0.1s ease-out',
    zIndex: 10,
  }), [position.x, position.y]);

  return <div style={blobStyle} />;
});

export default Blob;
