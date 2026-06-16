import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section className="section-container">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          EXPERIENCE
        </motion.h2>

        <motion.div 
          className="glass magnetic"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            padding: '3rem',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Career Counselling Prefect</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
              <p>• Mentored students in navigating career choices and academic paths.</p>
              <p>• Conducted career guidance sessions and one-on-one consultations.</p>
              <p>• Organized large-scale educational events and workshops.</p>
              <p>• Developed extensive leadership and communication skills.</p>
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'var(--accent-gold-glow)',
            filter: 'blur(80px)',
            borderRadius: '50%',
            zIndex: 1
          }}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
