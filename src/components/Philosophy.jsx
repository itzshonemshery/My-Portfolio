import { motion } from 'framer-motion';

const Philosophy = () => {
  return (
    <section className="section-container flex-center" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 6rem)', 
            lineHeight: '1.2',
            color: 'var(--text-main)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 40px rgba(255,255,255,0.1)'
          }}>
            "Technology Creates Possibilities.<br/>
            <span style={{ color: 'var(--accent-gold)' }}>People Create Impact.</span>"
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
