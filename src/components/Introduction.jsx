import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import imgProfile from '../assets/images/ModellingGallery.jsx/profile.jpg.jpeg';
import './Introduction.css';

const Introduction = () => {
  const containerRef = useRef(null);

  // Scroll tracking for parallax and vertical journey line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate parallax offsets
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  // Calculate journey line height
  const journeyHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  // Motion values for 3D card tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative mouse position from card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Rotate max 10 degrees
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;
    
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 70 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  return (
    <section id="introduction" ref={containerRef} className="intro-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="intro-grid"
      >
        {/* Left Side: Photo Container with 3D Tilt & Parallax Image */}
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d", 
            perspective: 1000 
          }}
          className="intro-image-container"
        >
          <div className="intro-image-overlay" style={{ transform: "translateZ(20px)" }}></div>
          <motion.img 
            src={imgProfile} 
            alt="Shone Mariyam Shery Profile" 
            className="intro-image"
            style={{ 
              y: yParallax, 
              scale: 1.15,
              transformOrigin: "center center"
            }}
          />
        </motion.div>

        {/* Right Side: Content Column woven with Journey Line */}
        <div style={{ display: 'flex', alignItems: 'stretch' }} className="intro-content-wrapper">
          {/* Vertical Journey Line beside text */}
          <div className="journey-line-track">
            <motion.div 
              className="journey-line-fill"
              style={{ height: journeyHeight }}
            />
          </div>

          {/* Text panel */}
          <div className="intro-content-container" style={{ padding: '4% 0 4% 3rem' }}>
            <h2 className="intro-title">
              NOT YOUR TYPICAL FIRST YEAR.
            </h2>
            
            {/* Alternating Slide Reveals */}
            <div className="intro-highlight-block">
              <motion.p 
                variants={slideLeftVariants}
                className="intro-highlight"
              >
                AI & ML Student.
              </motion.p>
              <motion.p 
                variants={slideRightVariants}
                className="intro-highlight"
              >
                Builder of intelligent systems.
              </motion.p>
              <motion.p 
                variants={slideLeftVariants}
                className="intro-highlight"
              >
                Winner. Speaker. Creator.
              </motion.p>
            </div>
            
            <p className="intro-desc">
              Working on projects like{' '}
              <motion.span 
                whileHover={{ scale: 1.03 }}
                className="interactive-keyword"
              >
                PitchPerfect
              </motion.span>{' '}
              and{' '}
              <motion.span 
                whileHover={{ scale: 1.03 }}
                className="interactive-keyword"
              >
                Fruit Ninja 2.0
              </motion.span>, while collaborating with brands and pursuing opportunities beyond the classroom.
            </p>
            
            {/* Signature wipe reveal mask */}
            <motion.p 
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="intro-footer"
            >
              Learning fast. Building faster.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Introduction;
