// Blob.jsx
import React, { useState, useEffect } from 'react';

const Blob = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
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
      }}
    />
  );
};

export default Blob;
