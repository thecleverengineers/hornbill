
import React from 'react';
import { Navigation } from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import AboutTaFMA from '@/components/AboutTaFMA';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();
  const { elementRef: featuredRef, isVisible: featuredVisible } = useScrollAnimation<HTMLElement>();
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <main className="mobile-page-content">
        <section 
          ref={heroRef}
          className={`transition-all duration-1000 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <HeroSection />
        </section>
        
        <section 
          ref={featuredRef}
          className={`transition-all duration-1000 px-4 md:px-0 ${
            featuredVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <FeaturedSection />
        </section>

        <section 
          ref={aboutRef}
          className={`transition-all duration-1000 px-4 md:px-0 ${
            aboutVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <AboutTaFMA />
        </section>
      </main>
    </div>
  );
};

export default Index;
