import { useEffect, useState, useMemo, useRef } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const roles = [
  "AI/ML Engineer",
  "Builder",
  "Creator",
  "Public Speaker",
  "Model",
  "Future Founder"
];

// Split-character morphing animation
const AnimatedRole = ({ text }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.05 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 250,
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 250,
      },
    },
  };

  return (
    <motion.span
      style={{ display: 'inline-flex', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', minWidth: letter === " " ? "0.3em" : "auto" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Interactive Canvas Gold Particle with Orbit & Trail Physics
const InteractiveDot = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let angle = 0;
    let targetX = canvas.width / 2;
    let targetY = canvas.height / 2;
    
    const trail = [];
    const maxTrail = 18;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 50;
      
      // Compute screen-size adaptive orbit radius
      const orbitRadiusX = Math.min(canvas.width * 0.35, 320);
      const orbitRadiusY = Math.min(canvas.height * 0.22, 160);
      
      angle += 0.006; 
      const orbitX = centerX + Math.cos(angle) * orbitRadiusX;
      const orbitY = centerY + Math.sin(angle) * orbitRadiusY;
      
      const dx = mouseRef.current.x - targetX;
      const dy = mouseRef.current.y - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Reactive magnet pull on cursor proximity
      if (dist < 280) {
        const force = ((280 - dist) / 280) * 0.06;
        targetX += dx * force;
        targetY += dy * force;
      } else {
        targetX += (orbitX - targetX) * 0.04;
        targetY += (orbitY - targetY) * 0.04;
      }
      
      trail.push({ x: targetX, y: targetY });
      if (trail.length > maxTrail) {
        trail.shift();
      }
      
      // Render glowing trail
      for (let i = 0; i < trail.length; i++) {
        const opacity = (i / trail.length) * 0.35;
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, 2 + (i / trail.length) * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.fill();
      }

      // Render glowing active core
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#d4af37';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.shadowBlur = 0; 
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }} />;
};

// Spring-based Magnetic Button
const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 80) {
      const pullX = (dx / 80) * 12;
      const pullY = (dy / 80) * 12;
      setPosition({ x: pullX, y: pullY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      style={{ position: 'relative' }}
    >
      {children}
    </motion.button>
  );
};

const backgroundFloatingTexts = [
  { text: "AI", x: "12%", y: "15%", duration: 25, delay: 0 },
  { text: "ML", x: "85%", y: "18%", duration: 28, delay: 2 },
  { text: "NLP", x: "8%", y: "78%", duration: 32, delay: 1 },
  { text: "CV", x: "82%", y: "75%", duration: 26, delay: 3 },
  { text: "CODE", x: "45%", y: "82%", duration: 35, delay: 0 },
  { text: "BUILD", x: "88%", y: "45%", duration: 30, delay: 4 }
];

const Hero = () => {
  const [init, setInit] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000); // Changed to 2 seconds
    return () => clearInterval(interval);
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#d4af37", 
        },
        links: {
          color: "#d4af37",
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2.5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section className="hero-section">
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="particles-bg"
        />
      )}

      {/* Interactive gold particle canvas */}
      <InteractiveDot />

      {/* Ambient background floating text */}
      {backgroundFloatingTexts.map((item, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            opacity: 0.04, 
            color: 'var(--text-main)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            pointerEvents: 'none',
            zIndex: 0
          }}
          animate={{
            x: [0, 15, -12, 0],
            y: [0, -18, 12, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          {item.text}
        </motion.div>
      ))}
      
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="title-wrapper"
        >
          <h1 className="main-title">
            <span className="text-line" style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                style={{ display: 'block' }}
              >
                SHONE
              </motion.span>
            </span>
            <span className="text-line" style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
                style={{ display: 'block' }}
              >
                MARIYAM
              </motion.span>
            </span>
            <span className="text-line text-gradient-gold" style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.35 }}
                style={{ display: 'block' }}
              >
                SHERY
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <div className="role-wrapper">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentRole}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="role-text"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <AnimatedRole text={roles[currentRole]} />
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.div 
          className="cta-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <MagneticButton className="btn-primary">Explore My Journey</MagneticButton>
          <MagneticButton className="btn-secondary">View Projects</MagneticButton>
          <MagneticButton className="btn-outline">Download Resume</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
