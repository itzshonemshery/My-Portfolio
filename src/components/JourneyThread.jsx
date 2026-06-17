import { motion, useScroll, useSpring } from 'framer-motion';

const JourneyThread = () => {
  const { scrollYProgress } = useScroll();
  // Smooth out the scroll progress using a spring
  const scaleY = useSpring(scrollYProgress, { 
    stiffness: 70, 
    damping: 25, 
    restDelta: 0.001 
  });

  return (
    <motion.div 
      style={{
        position: 'absolute',
        left: '3.5vw',
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'linear-gradient(to bottom, #ebd197 0%, #d4af37 50%, #f2994a 100%)',
        transformOrigin: 'top center',
        scaleY: scaleY,
        boxShadow: '0 0 8px rgba(212, 175, 55, 0.6), 0 0 15px rgba(212, 175, 55, 0.3)',
        zIndex: 4,
        pointerEvents: 'none'
      }}
    />
  );
};

export default JourneyThread;
