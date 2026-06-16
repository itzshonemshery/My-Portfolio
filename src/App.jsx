import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Impact from './components/Impact';
import FeaturedProjects from './components/FeaturedProjects';
import ModellingGallery from './components/ModellingGallery';
import AchievementsTimeline from './components/AchievementsTimeline';
import SkillsConstellation from './components/SkillsConstellation';
import Experience from './components/Experience';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      
      <main>
        <Hero />
        <Introduction />
        <Impact />
        <FeaturedProjects />
        <ModellingGallery />
        <AchievementsTimeline />
        <SkillsConstellation />
        <Experience />
        <Philosophy />
        <Contact />
      </main>
    </>
  );
}

export default App;
