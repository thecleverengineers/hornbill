
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

const HeroSection = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  const carouselSlides = [
    {
      id: 1,
      title: "HORNBILL",
      subtitle: "MUSIC FESTIVAL",
      description: "India's Biggest Music Festival",
      tagline: "🎵 Where the Hills Sing • Nagaland's Cultural Soul",
      backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      primaryAction: { text: "Register Band", icon: Mic, link: "/auditions" },
      secondaryAction: { text: "🎟️ Book Tickets", link: "/events" },
      tertiaryAction: { text: "Festival Schedule", icon: Calendar, link: "/schedule" }
    },
    {
      id: 2,
      title: "16 TRIBES",
      subtitle: "ONE CELEBRATION",
      description: "Experience Nagaland's Rich Heritage",
      tagline: "🏔️ Tribal Beats • Ancient Rhythms • Modern Sounds",
      backgroundImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      primaryAction: { text: "Explore Culture", link: "/about" },
      secondaryAction: { text: "Meet Artists", link: "/artists" },
      tertiaryAction: { text: "🎶 Listen Now", link: "/events" }
    },
    {
      id: 3,
      title: "5 DAYS",
      subtitle: "ENDLESS MUSIC",
      description: "December 3-8, 2024",
      tagline: "🎸 Rock • Folk • Electronic • Traditional",
      backgroundImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      primaryAction: { text: "View Schedule", icon: Calendar, link: "/schedule" },
      secondaryAction: { text: "Book Now", link: "/events" },
      tertiaryAction: { text: "Join Festival", icon: Mic, link: "/auditions" }
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Carousel className="w-full h-screen">
        <CarouselContent>
          {carouselSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-screen px-4 py-8 md:p-8 flex items-center justify-center">
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
                    
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2 font-light">
                      {slide.description}
                    </p>
                    
                    <p className="text-base sm:text-lg md:text-xl text-neon-purple mb-6 md:mb-8 font-medium px-2">
                      {slide.tagline}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 px-2">
                      <Link to={slide.primaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-festival text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                          {slide.primaryAction.icon && <slide.primaryAction.icon className="mr-2" size={18} />}
                          {slide.primaryAction.text}
                        </Button>
                      </Link>
                      <Link to={slide.secondaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-stage text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                          {slide.secondaryAction.text}
                        </Button>
                      </Link>
                      <Link to={slide.tertiaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-tribal text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                          {slide.tertiaryAction.icon && <slide.tertiaryAction.icon className="mr-2" size={18} />}
                          {slide.tertiaryAction.text}
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

      {/* Festival Stats - Outside carousel to avoid duplication */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 md:pb-8 px-4">
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto transition-all duration-1000 ${
            statsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className={`festival-card text-center transition-all duration-700 py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '0ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon-pink mb-1 md:mb-2">200+</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Musicians</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '150ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon-purple mb-1 md:mb-2">16</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Tribes</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '300ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-electric-orange mb-1 md:mb-2">5</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Days</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-3 md:py-4 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '450ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-teal mb-1 md:mb-2">50K+</div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base">Fans</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
