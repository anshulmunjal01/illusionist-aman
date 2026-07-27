import { useEffect, useState, useRef } from 'react';

interface SparkleMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
  isStar: boolean;
  rotation: number;
  spin: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [lensPosition, setLensPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motesRef = useRef<SparkleMote[]>([]);
  const lastPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 300, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300 });

  // Touch Device Detection
  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    touchQuery.addEventListener('change', handleQueryChange);

    return () => touchQuery.removeEventListener('change', handleQueryChange);
  }, []);

  // Spawn Sparkles & Particles Function
  const spawnSparkles = (x: number, y: number, count = 1, isBurst = false) => {
    lastPosRef.current = { x, y };

    const colors = [
      'rgba(212, 175, 55, ',   // Gold
      'rgba(232, 210, 166, ',  // Champagne
      'rgba(255, 248, 220, ',  // Cornsilk
      'rgba(255, 215, 0, ',    // Bright Amber Gold
      'rgba(255, 255, 255, ',  // Diamond White
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 2.2 + 0.8 : Math.random() * 0.8 + 0.2;
      const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.3;
      const vy = isBurst ? Math.sin(angle) * speed : -Math.random() * 0.6 - 0.2;

      const colorBase = colors[Math.floor(Math.random() * colors.length)];

      motesRef.current.push({
        x: x + (Math.random() - 0.5) * (isBurst ? 16 : 24),
        y: y + (Math.random() - 0.5) * (isBurst ? 16 : 24),
        vx,
        vy,
        size: isBurst ? Math.random() * 3 + 1.5 : Math.random() * 2.5 + 0.8,
        alpha: 1.0,
        maxAlpha: Math.random() * 0.4 + 0.6,
        decay: Math.random() * 0.018 + 0.012,
        color: colorBase,
        isStar: Math.random() < 0.45, // 45% star sparkles, 55% glowing motes
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.1,
      });
    }

    // Cap array size to prevent memory leaks
    if (motesRef.current.length > 120) {
      motesRef.current = motesRef.current.slice(-120);
    }
  };

  // Event Listeners for Mouse, Touch, Pointer, and Scroll Sparkle Generation
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      if (Math.random() < 0.35) {
        spawnSparkles(e.clientX, e.clientY, 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        spawnSparkles(t.clientX, t.clientY, 3, true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        if (Math.random() < 0.6) {
          spawnSparkles(t.clientX, t.clientY, 2);
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      spawnSparkles(e.clientX, e.clientY, 5, true);
    };

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;

      if (delta > 2) {
        // Spawn sparkles on touch & scroll
        const spawnX = lastPosRef.current.x + (Math.random() - 0.5) * 80;
        const spawnY = lastPosRef.current.y + (Math.random() - 0.5) * 80;

        spawnSparkles(spawnX, spawnY, Math.min(Math.floor(delta / 8) + 1, 3));
      }
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  // Smooth camera lens ring interpolation for Desktop
  useEffect(() => {
    if (isTouchDevice) return;

    let frameId: number;
    const updateLens = () => {
      setLensPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const ease = 0.12;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      frameId = requestAnimationFrame(updateLens);
    };
    frameId = requestAnimationFrame(updateLens);

    return () => cancelAnimationFrame(frameId);
  }, [position, isTouchDevice]);

  // Main Canvas Render Loop for Sparkle Particles & Motes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      motesRef.current = motesRef.current.filter((mote) => {
        mote.x += mote.vx;
        mote.y += mote.vy;
        mote.alpha -= mote.decay;
        mote.rotation += mote.spin;

        if (mote.alpha <= 0) return false;

        const currentAlpha = Math.max(0, mote.alpha * mote.maxAlpha);

        if (mote.isStar) {
          // Draw 4-Point Star Sparkle
          ctx.save();
          ctx.translate(mote.x, mote.y);
          ctx.rotate(mote.rotation);
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = `${mote.color}${currentAlpha})`;

          const s = mote.size;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, s * 2);
            ctx.quadraticCurveTo(0, 0, s * 0.4, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s * 2);
            ctx.quadraticCurveTo(0, 0, -s * 0.4, 0);
            ctx.quadraticCurveTo(0, 0, 0, s * 2);
            ctx.rotate(Math.PI / 2);
          }
          ctx.fill();

          // Bright center core
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        } else {
          // Draw Glowing Circular Dust Mote
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = `${mote.color}${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
          ctx.fill();

          // Outer Glow
          ctx.fillStyle = `${mote.color}${currentAlpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(mote.x, mote.y, mote.size * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-card');

      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Micro-motes & Sparkles canvas layer - Active across ALL devices */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-screen"
      />

      {/* Optical Lens Aperture Ring & Center Light - Active on Desktop Mouse Devices only */}
      {!isTouchDevice && !isHidden && (
        <>
          <div
            className="fixed top-0 left-0 w-1 h-1 bg-amber-200 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          />

          <div
            className="fixed top-0 left-0 rounded-full border border-amber-400/40 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 backdrop-blur-[0.5px]"
            style={{
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
              width: isHovering ? '52px' : '30px',
              height: isHovering ? '52px' : '30px',
              backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0, 0, 0, 0)',
              boxShadow: isHovering
                ? '0 0 24px rgba(212, 175, 55, 0.25), inset 0 0 12px rgba(212, 175, 55, 0.15)'
                : '0 0 10px rgba(212, 175, 55, 0.1)',
              borderColor: isHovering ? 'rgba(212, 175, 55, 0.7)' : 'rgba(212, 175, 55, 0.3)',
              transition:
                'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.3s ease',
            }}
          />
        </>
      )}
    </>
  );
}
