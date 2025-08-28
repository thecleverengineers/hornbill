
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
    <section className="relative min-h-screen overflow-hidden native-bg">
      <Carousel 
        className="w-full h-screen"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-screen px-4 py-8 md:p-8 flex items-center justify-center pb-40 md:pb-24">
                {/* Background Image with native parallax effect */}
                <div className="absolute inset-0 w-full h-full">
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{
                      backgroundImage: `url("${slide.backgroundImage}")`,
                      filter: 'brightness(0.7) saturate(1.1)'
                    }}
                  />
                </div>
                
                {/* Native-style gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>

                {/* Content with native animations */}
                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full">
                  <div className="animate-native-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <h1 className="font-righteous text-3xl sm:text-5xl md:text-6xl lg:text-8xl mb-6 leading-tight no-select">
                      <span className="block festival-title">{slide.title}</span>
                      <span className="block text-white drop-shadow-md">{slide.subtitle}</span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-3 font-light no-select drop-shadow-sm">
                      {slide.description}
                    </p>
                    
                    <p className="text-base sm:text-lg md:text-xl text-neon-purple mb-8 md:mb-12 font-medium px-2 no-select drop-shadow-sm">
                      {slide.tagline}
                    </p>
                    
                    {/* Native-style button group */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center mb-8 md:mb-12 px-2">
                      <Link to={slide.primaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-festival text-base sm:text-lg px-8 py-4 w-full sm:w-auto haptic-heavy elevation-2">
                          {slide.primaryAction.icon && <slide.primaryAction.icon className="mr-3" size={20} />}
                          <span className="no-select">{slide.primaryAction.text}</span>
                        </Button>
                      </Link>
                      <Link to={slide.secondaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-stage text-base sm:text-lg px-8 py-4 w-full sm:w-auto haptic-medium">
                          <span className="no-select">{slide.secondaryAction.text}</span>
                        </Button>
                      </Link>
                      <Link to={slide.tertiaryAction.link} className="w-full sm:w-auto">
                        <Button className="btn-tribal text-base sm:text-lg px-8 py-4 w-full sm:w-auto haptic-medium">
                          {slide.tertiaryAction.icon && <slide.tertiaryAction.icon className="mr-3" size={20} />}
                          <span className="no-select">{slide.tertiaryAction.text}</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Native-style navigation - hidden on mobile for cleaner look */}
        <CarouselPrevious className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 border-white/20 hover:bg-black/80 text-white backdrop-blur-md rounded-xl w-12 h-12 haptic-light" />
        <CarouselNext className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 border-white/20 hover:bg-black/80 text-white backdrop-blur-md rounded-xl w-12 h-12 haptic-light" />
      </Carousel>

      {/* Native-style Festival Stats with better mobile positioning */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20 px-4">
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto transition-all duration-1000 ${
            statsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className={`festival-card text-center transition-all duration-700 py-4 px-3 sm:py-4 md:py-6 elevation-1 haptic-light ${
            statsVisible ? 'animate-native-spring' : ''
          }`} style={{ animationDelay: statsVisible ? '0ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon-pink mb-2 no-select">200+</div>
            <div className="text-gray-400 text-sm sm:text-base md:text-lg no-select">Musicians</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-4 px-3 sm:py-4 md:py-6 elevation-1 haptic-light ${
            statsVisible ? 'animate-native-spring' : ''
          }`} style={{ animationDelay: statsVisible ? '100ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neon-purple mb-2 no-select">16</div>
            <div className="text-gray-400 text-sm sm:text-base md:text-lg no-select">Tribes</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-4 px-3 sm:py-4 md:py-6 elevation-1 haptic-light ${
            statsVisible ? 'animate-native-spring' : ''
          }`} style={{ animationDelay: statsVisible ? '200ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-electric-orange mb-2 no-select">5</div>
            <div className="text-gray-400 text-sm sm:text-base md:text-lg no-select">Days</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 py-4 px-3 sm:py-4 md:py-6 elevation-1 haptic-light ${
            statsVisible ? 'animate-native-spring' : ''
          }`} style={{ animationDelay: statsVisible ? '300ms' : '0ms' }}>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-teal mb-2 no-select">50K+</div>
            <div className="text-gray-400 text-sm sm:text-base md:text-lg no-select">Fans</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
