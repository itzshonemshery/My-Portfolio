import { motion } from 'framer-motion';
import './SkillsConstellation.css';

const skills = [
  { name: "Python", category: "Core", x: 0, y: 0 },
  { name: "Java", category: "Core", x: -120, y: -80 },
  { name: "Machine Learning", category: "AI", x: 150, y: -50 },
  { name: "Deep Learning", category: "AI", x: 80, y: -150 },
  { name: "Computer Vision", category: "AI", x: -180, y: 60 },
  { name: "NLP", category: "AI", x: -80, y: 150 },
  { name: "Artificial Intelligence", category: "AI", x: 120, y: 100 },
  { name: "Google Cloud AI", category: "Cloud", x: 220, y: 40 },
  { name: "Cybersecurity", category: "Security", x: -250, y: -20 },
  { name: "Public Speaking", category: "Soft", x: 50, y: 220 },
  { name: "Leadership", category: "Soft", x: -150, y: 200 }
];

const SkillsConstellation = () => {
  return (
    <section className="section-container" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', height: '80vh' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          SKILLS NETWORK
        </motion.h2>

        <div className="constellation-wrapper">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`skill-node glass magnetic type-${skill.category.toLowerCase()}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                transition: {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }
              }}
              style={{
                position: 'absolute',
                top: `calc(50% + ${skill.y}px)`,
                left: `calc(50% + ${skill.x}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
