import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ModellingGallery.css';

// Import images
import imgIvoryStitch from '../assets/images/ModellingGallery.jsx/ivory_stitch.jpg.jpeg';
import imgModel from '../assets/images/ModellingGallery.jsx/model.jpg.jpeg';
import imgModelling1 from '../assets/images/ModellingGallery.jsx/modelling1.jpg.jpeg';
import imgModelling2 from '../assets/images/ModellingGallery.jsx/modelling2.jpg.jpeg';
import imgProfile from '../assets/images/ModellingGallery.jsx/profile.jpg.jpeg';

gsap.registerPlugin(ScrollTrigger);

const ModellingGallery = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let pinWrap = scrollRef.current;
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;

    const timer = setTimeout(() => {
      gsap.to(pinWrap, {
        scrollTrigger: {
          scrub: true,
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: pinWrapWidth,
        },
        x: -horizontalScrollLength,
        ease: "none"
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
    { title: "Brand Photoshoots", src: imgModelling2 },
    { title: "Creative Portraits", src: imgProfile }
  ];

  return (
    <section ref={containerRef} className="horizontal-section">
      <div className="horizontal-intro">
        <h2>BEYOND TECHNOLOGY</h2>
        <p>Alongside technology and leadership, I have worked as a model and creative collaborator with fashion and lifestyle brands.</p>
      </div>
      
      <div className="pin-wrap" ref={scrollRef}>
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
