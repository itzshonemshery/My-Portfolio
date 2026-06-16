import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AchievementsTimeline.css';

const timelineData = [
  { year: "2025", title: "Miss CU Freshers", desc: "Title Winner" },
  { year: "2025", title: "Miss Literatus", desc: "Title Winner" },
  { year: "2025", title: "Speak'O'Vista Winner", desc: "1st Place" },
  { year: "2024", title: "One Nation One Election Winner", desc: "1st Place" },
  { year: "2024", title: "39th AIU Youth Festival", desc: "Overall Championship Team" },
  { year: "2024", title: "Google Student Ambassador", desc: "Program Participation" },
  { year: "2023", title: "Career Counselling Prefect", desc: "Leadership" }
];

const AchievementsTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="section-container timeline-section">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          JOURNEY SO FAR
        </motion.h2>

        <div className="timeline-container">
          <div className="timeline-line-bg"></div>
          <motion.div className="timeline-line-progress" style={{ height: lineHeight }}></motion.div>

          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content glass magnetic">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsTimeline;
