import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';

const achievements = [
  { 
    title: "CU Super Achiever", 
    desc: "Top Performance Title", 
    year: "2024", 
    impact: "Recognized as a Chandigarh University Super Achiever for overall excellence in academics, technical projects, and debate leadership.",
    details: "Received direct recognition for outstandingly balancing B.Tech workload while building active projects and competing nationally."
  },
  { 
    title: "Miss CU Freshers 2025", 
    desc: "Title Winner", 
    year: "2025", 
    impact: "Crowned Miss CU Freshers 2025, representing Chandigarh University's first-year class at major institutional campaigns.",
    details: "Won the title among 100+ contestants after rounds of presentation, intellectual testing, and talent showcases."
  },
  { 
    title: "Miss Literatus 2025", 
    desc: "Title Winner", 
    year: "2025", 
    impact: "First place title winner at the national-level Literatus literature and rhetoric symposium.",
    details: "Earned overall championship honors for speech delivery, critical writing, and cultural presentation."
  },
  { 
    title: "Speak'O'Vista Winner", 
    desc: "Public Speaking Contest", 
    year: "2025", 
    impact: "Won overall championship in the Speak'O'Vista national public speaking debate tournament.",
    details: "Presented critical positions on contemporary socioeconomic themes, judged on presentation, voice projection, and structural reasoning."
  },
  { 
    title: "Debate Winner", 
    desc: "One Nation One Election", 
    year: "2024", 
    impact: "Awarded first prize in the national-level debate on the electoral reform agenda.",
    details: "Argued policy positions on constitutional viability and economic cost-benefit assessments of election consolidation."
  },
  { 
    title: "AIU Youth Championship", 
    desc: "Overall Champion Team", 
    year: "2024", 
    impact: "Represented Chandigarh University's winning delegation at the 39th Association of Indian Universities (AIU) Youth Festival.",
    details: "Contributed to overall team championship points in regional debate, literary, and elocution segments."
  },
  { 
    title: "Google Cloud AI Certified", 
    desc: "Professional Certificate", 
    year: "2024", 
    impact: "Earned professional cloud certification from Google Cloud for Generative AI and model deployment.",
    details: "Validated engineering competency in large language model configuration, prompt engineering, and Vertex AI vector search workflow."
  },
  { 
    title: "Generative AI Certified", 
    desc: "Professional Certificate", 
    year: "2024", 
    impact: "Completed specialized training and project certification on diffusion models and transformers.",
    details: "Built end-to-end model workflows implementing customized embeddings, fine-tuning scripts, and retrieval-augmented generation architectures."
  }
];

const countersData = [
  { value: "7+", label: "Achievements" },
  { value: "2+", label: "AI Certifications" },
  { value: "Multiple", label: "Competition Wins" }
];

// Counting Upward Animation
const AnimatedCounter = ({ targetValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numTarget = parseInt(targetValue, 10);
      if (isNaN(numTarget)) {
        setCount(targetValue);
        return;
      }
      
      const startTime = performance.now();
      
      const updateCount = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeVal = progress * (2 - progress); // easeOutQuad
        const current = Math.floor(easeVal * numTarget);
        
        setCount(current);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(targetValue); 
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, targetValue, duration]);

  return <span ref={ref}>{count}{typeof targetValue === 'number' ? '' : targetValue.replace(/[0-9]/g, '')}</span>;
};

// Interactive Spotlight Card with Sparks
const SpotlightCard = ({ item, onClick, delayIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Sparks rising animation loop on hover
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        const id = Math.random();
        const newSpark = {
          id,
          x: Math.random() * 220 + 20,
          size: Math.random() * 2 + 1,
        };
        setSparks(prev => [...prev, newSpark]);
        setTimeout(() => {
          setSparks(prev => prev.filter(s => s.id !== id));
        }, 1000);
      }, 150);
      return () => clearInterval(interval);
    } else {
      setSparks([]);
    }
  }, [isHovered]);

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}px ${mouseY}px,
      rgba(212, 175, 55, 0.12),
      transparent 80%
    )
  `;

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: delayIndex * 0.08, duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.025,
        y: -5,
        borderColor: 'rgba(212, 175, 55, 0.4)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 15px var(--accent-gold-glow)'
      }}
      className="glass"
      style={{
        padding: '2.5rem 2rem',
        borderRadius: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.8rem',
        cursor: 'none',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s ease, transform 0.2s ease-out'
      }}
    >
      {/* Spotlight layer */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: spotlightBg,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Gold sparks */}
      <AnimatePresence>
        {sparks.map(spark => (
          <motion.div
            key={spark.id}
            initial={{ y: 220, opacity: 0.8, x: spark.x }}
            animate={{ y: 20, opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: spark.size,
              height: spark.size,
              borderRadius: '50%',
              backgroundColor: '#ebd197',
              boxShadow: '0 0 8px #ebd197',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
        ))}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{ 
          fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', 
          color: 'var(--text-main)', 
          fontFamily: 'var(--font-display)',
          letterSpacing: '1px',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          {item.title}
        </h3>
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '0.95rem', 
          fontFamily: 'var(--font-serif)', 
          fontStyle: 'italic',
          margin: 0
        }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

const Impact = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="section-container" style={{ minHeight: 'auto', padding: '100px 5%' }}>
      <div className="container">
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          IMPACT & ACHIEVEMENTS
        </motion.h2>

        {/* Animated Counters Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          marginBottom: '5rem',
          flexWrap: 'wrap'
        }}>
          {countersData.map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <h3 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
                color: 'var(--accent-gold)', 
                margin: 0, 
                fontFamily: 'var(--font-display)',
                fontWeight: 600
              }}>
                <AnimatedCounter targetValue={item.value} />
              </h3>
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', 
                margin: '0.5rem 0 0 0', 
                fontFamily: 'var(--font-serif)', 
                fontStyle: 'italic' 
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Staggered Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {achievements.map((item, index) => (
            <SpotlightCard
              key={index}
              item={item}
              delayIndex={index}
              onClick={() => setActiveModal(item)}
            />
          ))}
        </div>
      </div>

      {/* Expandable Details Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(5, 5, 8, 0.85)',
              backdropFilter: 'blur(15px)',
              zIndex: 10000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              cursor: 'none'
            }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              style={{
                width: '100%',
                maxWidth: '650px',
                background: 'rgba(20, 20, 30, 0.75)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '24px',
                padding: '3.5rem 3rem',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.15)',
                textAlign: 'left'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ebd197'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                ✕
              </button>

              <span style={{ 
                fontFamily: 'var(--font-display)', 
                color: 'var(--accent-gold)', 
                fontSize: '1.1rem', 
                letterSpacing: '2px',
                display: 'block',
                marginBottom: '0.8rem'
              }}>
                {activeModal.year} • {activeModal.desc}
              </span>

              <h3 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', 
                color: 'var(--text-main)',
                lineHeight: '1.2',
                marginBottom: '1.8rem',
                letterSpacing: '1px'
              }}>
                {activeModal.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ 
                    fontFamily: 'var(--font-serif)', 
                    color: 'var(--accent-gold)', 
                    fontStyle: 'italic', 
                    fontSize: '1.2rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    Impact & Achievement
                  </h4>
                  <p style={{ 
                    color: 'var(--text-main)', 
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', 
                    lineHeight: '1.75',
                    margin: 0
                  }}>
                    {activeModal.impact}
                  </p>
                </div>

                <div>
                  <h4 style={{ 
                    fontFamily: 'var(--font-serif)', 
                    color: 'var(--accent-gold)', 
                    fontStyle: 'italic', 
                    fontSize: '1.2rem',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    Details
                  </h4>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', 
                    lineHeight: '1.75',
                    margin: 0
                  }}>
                    {activeModal.details}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Impact;
