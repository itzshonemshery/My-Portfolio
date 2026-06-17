import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

const Experience = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const bullets = [
    "Mentored students in navigating career choices and academic paths.",
    "Conducted career guidance sessions and one-on-one consultations.",
    "Organized large-scale educational events and workshops.",
    "Developed extensive leadership and communication skills."
  ];

  return (
    <section id="experience" className="section-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}>
        
        {/* Creative Title Entrance */}
        <motion.h2 
          initial={{ opacity: 0, letterSpacing: '0.2em', y: -20 }}
          whileInView={{ opacity: 1, letterSpacing: '0.08em', y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '4rem', 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            color: 'var(--accent-gold)' 
          }}
        >
          EXPERIENCE
        </motion.h2>

        {/* Dynamic Card with Mouse Tracker Glow */}
        <motion.div 
          className="glass"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onMouseMove={handleMouseMove}
          whileHover={{ 
            scale: 1.015,
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-gold-glow)'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            padding: '4rem 3.5rem',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(15px)',
            transition: 'border-color 0.3s ease'
          }}
        >
          {/* Animated Glow Spot */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              background: useMotionTemplate`
                radial-gradient(
                  400px circle at ${mouseX}px ${mouseY}px,
                  rgba(212, 175, 55, 0.12),
                  transparent 80%
                )
              `,
              zIndex: 1
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div variants={bulletVariants}>
              <h3 style={{ 
                fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', 
                color: 'var(--text-main)', 
                fontFamily: 'var(--font-display)',
                marginBottom: '0.5rem',
                letterSpacing: '1px',
                fontWeight: 600
              }}>
                Career Counselling Prefect
              </h3>
              <h4 style={{ 
                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', 
                color: 'var(--accent-gold)', 
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                marginBottom: '2.5rem',
                fontWeight: 500,
                letterSpacing: '1px'
              }}>
                La Martiniere Girls' College
              </h4>
            </motion.div>
            
            {/* Animated Bullet list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {bullets.map((bullet, index) => (
                <motion.div 
                  key={index} 
                  variants={bulletVariants}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                >
                  <span style={{ 
                    color: 'var(--accent-gold)', 
                    fontSize: '1.2rem', 
                    lineHeight: '1.3',
                    display: 'inline-block',
                    animation: 'pulse 2s infinite ease-in-out'
                  }}>
                    ✦
                  </span>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', 
                    lineHeight: '1.65', 
                    margin: 0,
                    fontFamily: 'var(--font-sans)'
                  }}>
                    {bullet}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
