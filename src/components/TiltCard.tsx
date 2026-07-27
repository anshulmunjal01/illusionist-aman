import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  id?: string;
  key?: React.Key;
}

export default function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(212, 175, 55, 0.12)',
  onClick,
  id,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -8; // Max 8 deg rotation
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setSpotlightPos({ x: -100, y: -100 });
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 border border-[#E8E0D5] hover:border-[#D7C19C] dark:border-white/10 bg-[#FFFCF7] dark:bg-[#08080e]/60 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(168,123,59,0.08)] dark:shadow-2xl ${className}`}
    >
      {/* Dynamic Specular Glass Light Reflection on Hover */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-2xl z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${glowColor || 'rgba(200, 168, 107, 0.18)'}, transparent 70%)`,
        }}
      />

      {/* Shimmer Border Edge highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border transition-all duration-500 z-20"
        style={{
          borderColor: isHovered ? '#D7C19C' : 'transparent',
          boxShadow: isHovered ? '0 0 30px rgba(200, 168, 107, 0.18)' : 'none',
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
