import { motion } from 'framer-motion';
import imgProfile from '../assets/images/ModellingGallery.jsx/profile.jpg.jpeg';

const Introduction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section-container flex-center">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}
        >
          <motion.div variants={childVariants} style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              <img 
                src={imgProfile} 
                alt="Shone Mariam Shery Profile" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(110%) brightness(95%)'
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '100%',
              height: '100%',
              border: '2px solid var(--accent-gold)',
              borderRadius: '20px',
              zIndex: -1
            }}></div>
          </motion.div>

          <div style={{ textAlign: 'left' }}>
            <motion.h2 variants={childVariants} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem', color: 'var(--accent-gold)' }}>
              More Than Just A Student
            </motion.h2>
            
            <motion.p variants={childVariants} style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>
              I am a first-year B.Tech student specializing in Artificial Intelligence and Machine Learning at Chandigarh University.
            </motion.p>
            
            <motion.p variants={childVariants} style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', lineHeight: '1.8', marginBottom: '2rem' }}>
              I build intelligent systems, create digital experiences, compete on national platforms, work with brands, and constantly challenge myself to grow beyond the classroom.
            </motion.p>
            
            <motion.p variants={childVariants} style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', lineHeight: '1.6', fontWeight: 'bold', color: 'var(--text-main)' }}>
              I believe technology should solve real problems while creativity makes people remember them.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
