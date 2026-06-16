import { motion } from 'framer-motion';

const achievements = [
  { title: "CU Super Achiever", desc: "Top Performance" },
  { title: "Miss CU Freshers 2025", desc: "Title Winner" },
  { title: "Miss Literatus 2025", desc: "Title Winner" },
  { title: "1st Place", desc: "Speak'O'Vista" },
  { title: "1st Place", desc: "One Nation One Election Debate" },
  { title: "Overall Championship Team", desc: "39th AIU Youth Festival" },
  { title: "Google Cloud AI Certified", desc: "Professional Certification" },
  { title: "Generative AI Certified", desc: "Professional Certification" }
];

const Impact = () => {
  return (
    <section className="section-container" style={{ minHeight: 'auto', padding: '100px 5%' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          IMPACT & ACHIEVEMENTS
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="glass"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
              style={{
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'none'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', letterSpacing: '1px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
