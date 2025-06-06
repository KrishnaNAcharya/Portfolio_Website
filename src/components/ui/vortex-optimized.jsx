import { cn } from "../../lib/utils";
import { useEffect, useRef, useCallback, useMemo, memo } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const Vortex = memo((props) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  
  // Memoize configuration values
  const config = useMemo(() => ({
    particleCount: props.particleCount || 700,
    particlePropCount: 9,
    rangeY: props.rangeY || 100,
    baseTTL: 50,
    rangeTTL: 150,
    baseSpeed: props.baseSpeed || 0.0,
    rangeSpeed: props.rangeSpeed || 1.5,
    baseRadius: props.baseRadius || 1,
    rangeRadius: props.rangeRadius || 2,
    baseHue: props.baseHue || 220,
    rangeHue: 100,
    noiseSteps: 3,
    xOff: 0.00125,
    yOff: 0.00125,
    zOff: 0.00025,
    backgroundColor: props.backgroundColor || "#000000"
  }), [
    props.particleCount,
    props.rangeY,
    props.baseSpeed,
    props.rangeSpeed,
    props.baseRadius,
    props.rangeRadius,
    props.baseHue,
    props.backgroundColor
  ]);

  const particlePropsLength = config.particleCount * config.particlePropCount;
  
  // Memoize noise function and other heavy computations
  const noise3D = useMemo(() => createNoise3D(), []);
  const particlePropsRef = useRef(new Float32Array(particlePropsLength));
  const centerRef = useRef([0, 0]);
  const tickRef = useRef(0);

  // Memoize mathematical constants and utility functions
  const mathUtils = useMemo(() => ({
    TAU: 2 * Math.PI,
    rand: (n) => n * Math.random(),
    randRange: (n) => n - (n * Math.random() * 2),
    fadeInOut: (t, m) => {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    },
    lerp: (n1, n2, speed) => (1 - speed) * n1 + speed * n2
  }), []);

  const initParticle = useCallback((i) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { rand, randRange } = mathUtils;
    const { baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue, rangeY } = config;

    const x = rand(canvas.width);
    const y = centerRef.current[1] + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  }, [config, mathUtils]);

  const initParticles = useCallback(() => {
    tickRef.current = 0;
    particlePropsRef.current = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += config.particlePropCount) {
      initParticle(i);
    }
  }, [particlePropsLength, config.particlePropCount, initParticle]);

  const checkBounds = useCallback((x, y, canvas) => {
    return x > canvas.width || x < 0 || y > canvas.height || y < 0;
  }, []);

  const drawParticle = useCallback((x, y, x2, y2, life, ttl, radius, hue, ctx) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${mathUtils.fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }, [mathUtils]);

  const updateParticle = useCallback((i, ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particleProps = particlePropsRef.current;
    const { xOff, yOff, zOff, noiseSteps, particlePropCount } = config;
    const { TAU, lerp } = mathUtils;

    const i2 = 1 + i;
    const i3 = 2 + i;
    const i4 = 3 + i;
    const i5 = 4 + i;
    const i6 = 5 + i;
    const i7 = 6 + i;
    const i8 = 7 + i;
    const i9 = 8 + i;

    const x = particleProps[i];
    const y = particleProps[i2];
    const n = noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
    const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
    const vy = lerp(particleProps[i4], Math.sin(n), 0.5);
    const life = particleProps[i5];
    const ttl = particleProps[i6];
    const speed = particleProps[i7];
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    const radius = particleProps[i8];
    const hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

    const newLife = life + 1;

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = newLife;

    if (checkBounds(x, y, canvas) || newLife > ttl) {
      initParticle(i);
    }
  }, [config, mathUtils, noise3D, drawParticle, checkBounds, initParticle]);

  const drawParticles = useCallback((ctx) => {
    for (let i = 0; i < particlePropsLength; i += config.particlePropCount) {
      updateParticle(i, ctx);
    }
  }, [particlePropsLength, config.particlePropCount, updateParticle]);

  const renderGlow = useCallback((canvas, ctx) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }, []);

  const renderToScreen = useCallback((canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }, []);

  const draw = useCallback((canvas, ctx) => {
    tickRef.current++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawParticles(ctx);
    renderGlow(canvas, ctx);
    renderToScreen(canvas);

    animationIdRef.current = window.requestAnimationFrame(() => draw(canvas, ctx));
  }, [config.backgroundColor, drawParticles, renderGlow, renderToScreen]);

  const resize = useCallback((canvas) => {
    const { innerWidth, innerHeight } = window;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    centerRef.current[0] = 0.5 * canvas.width;
    centerRef.current[1] = 0.5 * canvas.height;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      resize(canvas);
    }
  }, [resize]);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas);
        initParticles();
        draw(canvas, ctx);
      }
    }
  }, [resize, initParticles, draw]);

  useEffect(() => {
    setup();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        window.cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [setup, handleResize]);

  // Memoize style object
  const backgroundStyle = useMemo(() => ({ 
    backgroundColor: config.backgroundColor 
  }), [config.backgroundColor]);

  const canvasStyle = useMemo(() => ({ 
    pointerEvents: 'none' 
  }), []);

  return (
    <div className={cn("h-full w-full", props.containerClassName)} style={backgroundStyle}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="fixed inset-0 h-full w-full flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full" style={canvasStyle}></canvas>
      </motion.div>
      {props.children && (
        <div className={cn("relative z-10", props.className)}>
          {props.children}
        </div>
      )}
    </div>
  );
});

// PropTypes validation
Vortex.propTypes = {
  particleCount: PropTypes.number,
  rangeY: PropTypes.number,
  baseSpeed: PropTypes.number,
  rangeSpeed: PropTypes.number,
  baseRadius: PropTypes.number,
  rangeRadius: PropTypes.number,
  baseHue: PropTypes.number,
  backgroundColor: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

Vortex.displayName = 'Vortex';
