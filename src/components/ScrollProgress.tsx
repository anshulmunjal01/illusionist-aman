import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A35A] via-amber-400 to-[#E5C17C] z-[100] origin-left shadow-[0_0_10px_rgba(201,163,90,0.8)] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
