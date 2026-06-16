import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import './FeaturedProjects.css';

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="project-card glass"
    >
      <div style={{ transform: "translateZ(50px)" }} className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        
        <div className="tech-stack">
          {project.tech.map((t, i) => (
            <span key={i} className="tech-badge">{t}</span>
          ))}
        </div>

        <div className="project-links">
          {project.title !== "Future AI Projects" && (
            <>
              <button className="magnetic icon-btn"><Github size={20} /></button>
              <button className="magnetic icon-btn"><ExternalLink size={20} /></button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const projects = [
    {
      title: "PitchPerfect",
      desc: "AI-powered interview coach that analyses introductions, vocal delivery, confidence, communication quality, resume alignment, and provides personalized coaching in real-time.",
      tech: ["Python", "AI", "Machine Learning", "Speech Analysis", "NLP"]
    },
    {
      title: "Fruit Ninja 2.0",
      desc: "A next-generation computer vision version of Fruit Ninja featuring real-time hand tracking, gesture recognition, interactive slicing effects, particle explosions, and AI-powered motion detection.",
      tech: ["Python", "OpenCV", "Computer Vision", "MediaPipe"]
    },
    {
      title: "Future AI Projects",
      desc: "Currently Building innovations that blend bleeding-edge artificial intelligence with stunning user experiences.",
      tech: ["Coming Soon"]
    }
  ];

  return (
    <section className="section-container">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          FEATURED PROJECTS
        </motion.h2>

        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
