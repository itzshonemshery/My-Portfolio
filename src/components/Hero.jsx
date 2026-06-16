import { useEffect, useState, useMemo } from 'react';
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
    }, 3000);
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
          value: "#d4af37", // Gold particles
        },
        links: {
          color: "#d4af37",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
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
      
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="title-wrapper"
        >
          <h1 className="main-title">
            <span className="text-line">SHONE</span>
            <span className="text-line">MARIAM</span>
            <span className="text-line text-gradient-gold">SHERY</span>
          </h1>
        </motion.div>

        <div className="role-wrapper">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="role-text"
            >
              {roles[currentRole]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.div 
          className="cta-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <button className="magnetic btn-primary">Explore My Journey</button>
          <button className="magnetic btn-secondary">View Projects</button>
          <button className="magnetic btn-outline">Download Resume</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
