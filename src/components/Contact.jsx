import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="section-container">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', color: 'var(--accent-gold)' }}
        >
          LET'S CONNECT
        </motion.h2>

        <div className="contact-grid">
          <motion.div 
            className="contact-info glass"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Get In Touch</h3>
            <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
            
            <div className="social-links">
              <a href="https://www.linkedin.com/in/shone-mariyam-shery-5ba641363/" target="_blank" rel="noopener noreferrer" className="magnetic icon-btn"><Linkedin size={24} /></a>
              <a href="https://github.com/itzshonemshery" target="_blank" rel="noopener noreferrer" className="magnetic icon-btn"><Github size={24} /></a>
              <a href="https://www.instagram.com/_shonemary_/" target="_blank" rel="noopener noreferrer" className="magnetic icon-btn"><Instagram size={24} /></a>
              <a href="mailto:shonemshery@gmail.com" className="magnetic icon-btn"><Mail size={24} /></a>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <input type="text" placeholder="Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="5" required></textarea>
            </div>
            <button className="magnetic btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
