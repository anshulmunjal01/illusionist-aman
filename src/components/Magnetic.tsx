import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
  key?: React.Key;
}

export default function Magnetic({ children, intensity = 0.35, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.6 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
