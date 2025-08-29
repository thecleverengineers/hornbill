import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Mic } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  const carouselSlides = [
    {
      id: 1,
      title: "YOUR BIGGEST STAGE",
      subtitle: "AWAITS",
      description: "Audition now for Hornbill Music Festival 2025.",
      backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      primaryAction: { text: "Submit Audition", icon: Mic, link: "/auditions" }
    },
    {
      id: 2,
      title: "INDIA'S BIGGEST",
      subtitle: "MUSIC FESTIVAL",
      description: "10 Days. Endless Music in the Hills of Nagaland.",
      backgroundImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      primaryAction: { text: "Book Tickets", link: "/events" }
    },
    {
      id: 3,
      title: "WHERE CULTURE",
      subtitle: "MEETS SOUND",
      description: "Discover the spirit of Nagaland — one celebration, countless memories.",
      backgroundImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      primaryAction: { text: "Learn More", link: "/about" }
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Carousel 
        className="w-full h-screen"
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-screen px-4 py-8 md:p-8 flex items-center justify-center pb-32 md:pb-24">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url("${slide.backgroundImage}")`
                    }}
                  />
                </div>
                
                {/* Animated Background Overlay */}
                <div className="absolute inset-0 festival-bg opacity-60"></div>
                
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full">
                  <div className="animate-fade-in">
                    <h1 className="font-righteous text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4 leading-tight">
                      <span className="block festival-title neon-text">{slide.title}</span>
                      <span className="block text-white">{slide.subtitle}</span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 font-light">
                      {slide.description}
                    </p>
                    
                    <div className="flex justify-center items-center mb-8 md:mb-12">
                      <Link to={slide.primaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-festival text-base sm:text-lg px-8 py-4 w-full sm:w-auto">
                          {slide.primaryAction.icon && <slide.primaryAction.icon className="mr-2" size={18} />}
                          {slide.primaryAction.text}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom Navigation Buttons - Hidden on mobile */}
        <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 hover:bg-black/70 text-white" />
        <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 hover:bg-black/70 text-white" />
      </Carousel>

      {/* Festival Stats - Outside carousel to avoid duplication, positioned to avoid overlap */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 z-20 px-4">
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-6xl mx-auto transition-all duration-1000 ${
            statsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className={`festival-card text-center transition-all duration-700 py-2 px-1 sm:py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '0ms' : '0ms' }}>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-neon-pink mb-1">200+</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Musicians</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-2 px-1 sm:py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '150ms' : '0ms' }}>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-neon-purple mb-1">16</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Tribes</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-2 px-1 sm:py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '300ms' : '0ms' }}>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-electric-orange mb-1">5</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Days</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-2 px-1 sm:py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '450ms' : '0ms' }}>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-cyber-teal mb-1">50K+</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Fans</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
