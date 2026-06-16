import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ModellingGallery.css';

gsap.registerPlugin(ScrollTrigger);

const ModellingGallery = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let pinWrap = scrollRef.current;
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;

    // Wait a tick for layout
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
    { title: "Avyaana", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop" },
    { title: "Ivory Stitch", src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop" },
    { title: "Runway Experiences", src: "https://images.unsplash.com/photo-1509631179647-0c5000642f58?w=800&auto=format&fit=crop" },
    { title: "Brand Photoshoots", src: "https://images.unsplash.com/photo-1529139574466-a303027c028b?w=800&auto=format&fit=crop" },
    { title: "Campaigns", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop" }
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
