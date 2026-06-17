import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ModellingGallery.css';

// Import images (excluding profile.jpg.jpeg to avoid duplicates)
import imgIvoryStitch from '../assets/images/ModellingGallery.jsx/ivory_stitch.jpg.jpeg';
import imgModel from '../assets/images/ModellingGallery.jsx/model.jpg.jpeg';
import imgModelling1 from '../assets/images/ModellingGallery.jsx/modelling1.jpg.jpeg';
import imgModelling2 from '../assets/images/ModellingGallery.jsx/modelling2.jpg.jpeg';

gsap.registerPlugin(ScrollTrigger);

const ModellingGallery = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const pinWrap = scrollRef.current;
    const pinWrapWidth = pinWrap.offsetWidth;
    const horizontalScrollLength = pinWrapWidth - window.innerWidth;

    const timer = setTimeout(() => {
      // Create the horizontal scroll tween
      const horizontalTween = gsap.to(pinWrap, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          invalidateOnRefresh: true,
        }
      });

      // Animate the text slide elements on load or entry
      gsap.fromTo(".gallery-intro-slide h2", 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(".gallery-intro-slide p", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // Creative entrance animations for individual photo cards as they enter the screen horizontally
      const cards = gsap.utils.toArray(".gallery-item");
      cards.forEach((card) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            scale: 0.85, 
            y: 100, 
            rotation: 4 
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween, // Link to horizontal scroll
              start: "left 95%",
              end: "left 65%",
              scrub: true,
            }
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const photos = [
    { title: "Ivory Stitch", src: imgIvoryStitch },
    { title: "Modelling Campaign", src: imgModel },
    { title: "Runway Experiences", src: imgModelling1 },
    { title: "Brand Photoshoots", src: imgModelling2 }
  ];

  return (
    <section ref={containerRef} className="horizontal-section">
      <div className="pin-wrap" ref={scrollRef}>
        {/* Slide 1: Beyond Technology Text Intro */}
        <div className="gallery-intro-slide">
          <h2>BEYOND TECHNOLOGY</h2>
          <p>
            Alongside technology and leadership, I have worked as a model and creative collaborator 
            with fashion and lifestyle brands.
          </p>
        </div>

        {/* Slide 2-5: Premium Photo Items */}
        {photos.map((photo, i) => (
          <div key={i} className="gallery-item">
            <img src={photo.src} alt={photo.title} />
            <div className="gallery-caption">
              <h3>{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModellingGallery;
