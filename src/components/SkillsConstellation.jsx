import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillsConstellation.css';

const skills = [
  { name: "Python", category: "Core", x: 0, y: 0, w: 100 },
  { name: "Java", category: "Core", x: -140, y: -90, w: 90 },
  { name: "Machine Learning", category: "AI", x: 140, y: -70, w: 160 },
  { name: "Deep Learning", category: "AI", x: 80, y: -180, w: 140 },
  { name: "Computer Vision", category: "AI", x: -200, y: 50, w: 150 },
  { name: "NLP", category: "AI", x: -100, y: 150, w: 90 },
  { name: "Artificial Intelligence", category: "AI", x: 120, y: 80, w: 170 },
  { name: "Google Cloud AI", category: "Cloud", x: 230, y: 10, w: 140 },
  { name: "Cybersecurity", category: "Security", x: -240, y: -50, w: 140 },
  { name: "Public Speaking", category: "Soft", x: 70, y: 220, w: 140 },
  { name: "Leadership", category: "Soft", x: -140, y: 230, w: 120 }
];

const connections = [
  { from: "Python", to: "Machine Learning" },
  { from: "Python", to: "Java" },
  { from: "Python", to: "Cybersecurity" },
  { from: "Python", to: "Leadership" },
  { from: "Machine Learning", to: "Deep Learning" },
  { from: "Machine Learning", to: "Computer Vision" },
  { from: "Machine Learning", to: "NLP" },
  { from: "Machine Learning", to: "Artificial Intelligence" },
  { from: "Deep Learning", to: "Google Cloud AI" },
  { from: "Deep Learning", to: "Artificial Intelligence" },
  { from: "Leadership", to: "Public Speaking" }
];

const SkillsConstellation = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const isConnected = (nodeA, nodeB) => {
    return connections.some(c => 
      (c.from === nodeA && c.to === nodeB) || 
      (c.from === nodeB && c.to === nodeA)
    );
  };

  return (
    <section className="section-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '3rem', 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-display)'
          }}
        >
          SKILLS NETWORK
        </motion.h2>

        {/* Constellation Container */}
        <div className="constellation-wrapper">
          <svg viewBox="-360 -280 720 560" className="skills-svg">
            <defs>
              {/* Laser neon glow filter */}
              <filter id="glow-laser" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection Lines */}
            {connections.map((conn, idx) => {
              const fromNode = skills.find(s => s.name === conn.from);
              const toNode = skills.find(s => s.name === conn.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = hoveredSkill === conn.from || hoveredSkill === conn.to;
              const isAnyHovered = hoveredSkill !== null;

              return (
                <motion.line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHighlighted ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: idx * 0.04 }}
                  filter={isHighlighted ? 'url(#glow-laser)' : 'none'}
                  style={{
                    opacity: isAnyHovered && !isHighlighted ? 0.2 : 1,
                    transition: 'stroke 0.4s ease, stroke-width 0.4s ease, opacity 0.4s ease'
                  }}
                />
              );
            })}

            {/* Nodes */}
            {skills.map((skill, index) => {
              const isNodeHovered = hoveredSkill === skill.name;
              const isAnyNodeHovered = hoveredSkill !== null;
              const isNodeConnected = isAnyNodeHovered && isConnected(hoveredSkill, skill.name);

              return (
                <foreignObject
                  key={index}
                  x={skill.x - (skill.w / 2)}
                  y={skill.y - 20}
                  width={skill.w}
                  height={42}
                  className="skill-node-wrapper"
                >
                  <motion.div
                    className={`skill-node type-${skill.category.toLowerCase()}`}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 80 }}
                    animate={{
                      y: isNodeHovered ? 0 : [0, -5, 0],
                      x: isNodeHovered ? 0 : [0, 3, 0],
                      scale: isNodeHovered ? 1.08 : isNodeConnected ? 1.03 : 1,
                      opacity: isAnyNodeHovered && !isNodeHovered && !isNodeConnected ? 0.45 : 1,
                      boxShadow: isNodeHovered 
                        ? '0 10px 30px rgba(212, 175, 55, 0.35)' 
                        : isNodeConnected 
                        ? '0 10px 20px rgba(255, 255, 255, 0.1)' 
                        : '0 8px 20px rgba(0,0,0,0.3)',
                      borderColor: isNodeHovered 
                        ? 'var(--accent-gold)' 
                        : isNodeConnected 
                        ? 'var(--text-main)' 
                        : 'var(--border-color)',
                      color: isNodeHovered ? 'var(--accent-gold)' : 'var(--text-main)'
                    }}
                    style={{
                      transformOrigin: 'center center',
                    }}
                  >
                    {skill.name}
                  </motion.div>
                </foreignObject>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
