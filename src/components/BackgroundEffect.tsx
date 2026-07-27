import { useEffect, useRef } from 'react';

interface BackgroundEffectProps {
  theme: 'dark' | 'light';
}

export default function BackgroundEffect({ theme }: BackgroundEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Microscopic Dust Particle Floating in Spotlight
    class DustParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      angle: number;
      spinSpeed: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.speedY = -Math.random() * 0.18 - 0.03; // Soft floating upward like dust in spotlight
        this.opacity = Math.random() * 0.1;
        this.maxOpacity = Math.random() * 0.35 + 0.05;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.008;
        this.color = this.getColor();
      }

      getColor() {
        if (theme === 'dark') {
          // Warm Gold Motes, Soft Champagne, Pale Silver
          const r = Math.random();
          if (r < 0.6) return '212, 175, 55'; // Antique Gold
          if (r < 0.85) return '232, 210, 166'; // Champagne
          return '245, 245, 240'; // Soft Ivory
        } else {
          // Warm Gold & Champagne Motes
          const r = Math.random();
          if (r < 0.7) return '200, 168, 107'; // #C8A86B Primary Accent
          return '168, 123, 59'; // #A87B3B Secondary Accent
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle airflow nudge when mouse passes
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          this.x -= (dx / dist) * force * 0.4;
          this.y -= (dy / dist) * force * 0.4;
        }

        // Screen wrap around
        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;

        // Soft shimmer cycle
        this.angle += this.spinSpeed;
        this.opacity = this.maxOpacity * (0.6 + Math.sin(this.angle) * 0.4);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Rolling Theatre Fog Layer
    class TheatreFogLayer {
      xOffset: number;
      yOffset: number;
      radius: number;
      speed: number;
      angle: number;
      color: string;

      constructor(xRatio: number, yRatio: number, radiusRatio: number, speed: number, color: string) {
        this.xOffset = xRatio;
        this.yOffset = yRatio;
        this.radius = radiusRatio;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        this.angle += this.speed;
        const currentX = width * this.xOffset + Math.sin(this.angle * 0.8) * (width * 0.08);
        const currentY = height * this.yOffset + Math.cos(this.angle * 0.5) * (height * 0.05);
        const currentRadius = Math.max(width, height) * this.radius;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          currentRadius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize dust particles
    let dustParticles: DustParticle[] = [];
    const dustCount = Math.min(Math.floor((width * height) / 18000), 80);
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push(new DustParticle());
    }

    // Initialize rolling fog layers
    let fogLayers: TheatreFogLayer[] = [];
    if (theme === 'dark') {
      // Midnight Velvet Theatre & Golden Reflections
      fogLayers.push(new TheatreFogLayer(0.3, 0.25, 0.45, 0.0003, 'rgba(212, 175, 55, 0.02)'));
      fogLayers.push(new TheatreFogLayer(0.7, 0.65, 0.55, 0.0002, 'rgba(20, 15, 30, 0.35)'));
      fogLayers.push(new TheatreFogLayer(0.5, 0.85, 0.6, 0.00025, 'rgba(10, 10, 18, 0.4)'));
    } else {
      // Champagne & Sheer Linen Light
      fogLayers.push(new TheatreFogLayer(0.25, 0.3, 0.45, 0.0003, 'rgba(200, 168, 107, 0.08)'));
      fogLayers.push(new TheatreFogLayer(0.75, 0.7, 0.5, 0.0002, 'rgba(243, 239, 232, 0.4)'));
    }

    let time = 0;

    const render = () => {
      time += 0.005;

      // Interpolate mouse coordinates smoothly
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Base canvas color: Deep Obsidian or Warm Ivory
      if (theme === 'dark') {
        ctx.fillStyle = '#030305'; // Deepest velvet obsidian
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = '#F8F6F2'; // Warm Ivory
        ctx.fillRect(0, 0, width, height);
      }

      // 1. Draw Rolling Fog Layers
      fogLayers.forEach((fog) => fog.draw());

      // 2. Spotlight Beam descending from Top Center
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      const spotlightX = width * 0.5 + Math.sin(time * 0.4) * 30;
      const spotGrad = ctx.createLinearGradient(spotlightX, 0, spotlightX + Math.sin(time * 0.2) * 50, height);
      if (theme === 'dark') {
        spotGrad.addColorStop(0, 'rgba(212, 175, 55, 0.035)');
        spotGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.012)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        spotGrad.addColorStop(0, 'rgba(197, 160, 89, 0.04)');
        spotGrad.addColorStop(0.5, 'rgba(232, 210, 166, 0.02)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.moveTo(spotlightX - 80, 0);
      ctx.lineTo(spotlightX + 80, 0);
      ctx.lineTo(spotlightX + width * 0.4, height);
      ctx.lineTo(spotlightX - width * 0.4, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. Glass Specular Reflection on Mouse Hovering
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const glassGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          320
        );
        if (theme === 'dark') {
          glassGrad.addColorStop(0, 'rgba(212, 175, 55, 0.03)');
          glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.008)');
          glassGrad.addColorStop(1, 'rgba(0,0,0,0)');
        } else {
          glassGrad.addColorStop(0, 'rgba(197, 160, 89, 0.05)');
          glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
          glassGrad.addColorStop(1, 'rgba(0,0,0,0)');
        }
        ctx.fillStyle = glassGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 4. Update and Render Floating Dust Motes
      dustParticles.forEach((dust) => {
        dust.update();
        dust.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      dustParticles = [];
      const newCount = Math.min(Math.floor((width * height) / 18000), 80);
      for (let i = 0; i < newCount; i++) {
        dustParticles.push(new DustParticle());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="atmospheric-dream-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-1000"
    />
  );
}
