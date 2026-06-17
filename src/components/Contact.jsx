import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Send } from 'lucide-react';
import imgProfile from '../assets/images/ModellingGallery.jsx/passportsize.jpg.jpg';
import './Contact.css';

// Physics-based Connecting Particle Constellation
const ConstellationBg = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles based on screen size
    const particleCount = Math.min(Math.floor(canvas.width / 22), 65);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Connect/React to mouse coordinates
        if (mx !== null && my !== null) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            // Draw lines connecting ideas (mouse connection)
            const mouseAlpha = (1 - dist / 140) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(212, 175, 55, ${mouseAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            // Attract/drift slightly towards cursor
            p.x += dx * 0.006;
            p.y += dy * 0.006;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-canvas" />;
};

// Premium Editorial Profile Card with 3D Tilt Hover
const EditorialProfile = () => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="profile-editorial-card"
    >
      <div className="profile-image-container">
        <img 
          src={imgProfile} 
          alt="Shone Mariyam Shery Profile Portrait" 
          className="profile-editorial-image" 
        />
      </div>
      <div className="profile-details-text">
        <h4>SHONE M. SHERY</h4>
        <p>Future Founder</p>
        <p className="profile-description">
          Designing intelligent neural architectures, exploring cloud workloads, and creating visual interfaces that impact the future.
        </p>
      </div>
    </motion.div>
  );
};

// Interactive Contact Cards
const InteractiveCard = ({ card }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      // Magnetic pull to center
      setPosition({ x: (dx / 100) * 10, y: (dy / 100) * 10 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={card.url}
      target={card.name !== "Email" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className={`interactive-contact-card ${card.class}`}
    >
      <div className="interactive-contact-card-icon">
        {card.icon}
      </div>
      <h4>{card.name}</h4>
      <p>{card.desc}</p>
    </motion.a>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [signatureSparks, setSignatureSparks] = useState([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight Mouse Follower Tracker
  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Rising Gold Sparks trigger when signature writes itself
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        const id = Math.random();
        setSignatureSparks(prev => [
          ...prev, 
          {
            id,
            x: Math.random() * 260 - 130, // scatter horizontally
            size: Math.random() * 2.5 + 1.2,
            duration: Math.random() * 2 + 1.8
          }
        ]);
        setTimeout(() => {
          setSignatureSparks(prev => prev.filter(p => p.id !== id));
        }, 3800);
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulate flight / server post latency
    setTimeout(() => {
      setFormState('success');
    }, 1800);
  };

  const contactCards = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={22} />,
      desc: "Let's grow professionally.",
      url: "https://www.linkedin.com/in/shone-mariyam-shery-5ba641363/",
      class: "card-linkedin"
    },
    {
      name: "GitHub",
      icon: <Github size={22} />,
      desc: "Explore what I'm building.",
      url: "https://github.com/itzshonemshery",
      class: "card-github"
    },
    {
      name: "Instagram",
      icon: <Instagram size={22} />,
      desc: "A glimpse beyond the code.",
      url: "https://www.instagram.com/_shonemary_/",
      class: "card-instagram"
    },
    {
      name: "Email",
      icon: <Mail size={22} />,
      desc: "Let's start a conversation.",
      url: "mailto:shonemshery@gmail.com",
      class: "card-email"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mouseX.get()}px`,
        '--mouse-y': `${mouseY.get()}px`
      }}
      className={`contact-section-wrapper ${isInView ? 'in-view' : ''}`}
    >
      {/* Background vignette & spotlight follow */}
      <div className="contact-vignette" />
      <div className="contact-spotlight" />

      {/* Physics constellation connection line background */}
      <ConstellationBg />

      <div className="contact-container">
        
        {/* Entrance Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="contact-title"
        >
          LET'S CREATE SOMETHING THAT MATTERS.
        </motion.h2>

        <div className="contact-grid-layout">
          
          {/* Left Column: Portrait and Expanding Cards */}
          <div className="contact-left-col">
            <EditorialProfile />
            
            {/* Live Greeting Character Reveal */}
            <div className="live-greeting-container">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="live-greeting-hello"
              >
                Hello 👋
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="live-greeting-body"
              >
                I'm always excited to connect with builders, creators, innovators, recruiters, and people with big ideas.
              </motion.p>
            </div>

            {/* Micro contact cards */}
            <div className="cards-layout">
              {contactCards.map((card, idx) => (
                <InteractiveCard key={idx} card={card} />
              ))}
            </div>
          </div>

          {/* Right Column: Quote and Message form */}
          <div className="contact-right-col">
            
            {/* Personal Quote Reveal */}
            <div className="personal-quote-wrapper">
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="personal-quote-text"
              >
                "Curiosity brought you here. Let's see where it takes us next."
              </motion.p>
            </div>

            {/* Contact Form or Success Banner */}
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="form-success-banner"
              >
                <h4>Message Received!</h4>
                <p>Let's build something amazing.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="modern-contact-form">
                <div className="floating-form-group">
                  <input type="text" id="form-name" placeholder=" " required />
                  <label htmlFor="form-name">Name</label>
                </div>
                
                <div className="floating-form-group">
                  <input type="email" id="form-email" placeholder=" " required />
                  <label htmlFor="form-email">Email</label>
                </div>

                <div className="floating-form-group">
                  <textarea id="form-msg" placeholder=" " rows="5" required></textarea>
                  <label htmlFor="form-msg">Message</label>
                </div>

                <div className="submit-btn-container">
                  <button 
                    type="submit" 
                    className={`grand-submit-btn ${formState}`}
                    disabled={formState !== 'idle'}
                  >
                    {formState === 'idle' && (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                    {formState === 'sending' && (
                      <>
                        <span>Sending</span>
                        <motion.div
                          animate={{ 
                            x: [0, 45, -45, 0],
                            y: [0, -45, 45, 0],
                            opacity: [1, 0, 0, 1]
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                          style={{ display: 'inline-block' }}
                        >
                          <Send size={18} />
                        </motion.div>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Grand Finale: Handwritten Cursive Signature */}
        <div className="contact-finale-container">
          <h3 className={`signature-writing-mask ${isInView ? 'animate' : ''}`}>
            Shone Mariyam Shery
          </h3>
          <p className={`finale-subtitle ${isInView ? 'animate' : ''}`}>
            AI/ML Engineer • Creator • Builder
          </p>
          <p className={`finale-thanks ${isInView ? 'animate' : ''}`}>
            Thank you for visiting.
          </p>

          {/* Golden rising particles animation */}
          {isInView && (
            <div style={{
              position: 'absolute',
              bottom: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '350px',
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: -1
            }}>
              {signatureSparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ y: 320, x: spark.x, opacity: 0, scale: 0.5 }}
                  animate={{ y: -50, opacity: [0, 0.8, 0.8, 0], scale: 1.3 }}
                  transition={{ duration: spark.duration, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    width: spark.size,
                    height: spark.size,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold)',
                    boxShadow: '0 0 6px var(--accent-gold)'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
