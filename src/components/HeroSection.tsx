import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Calendar, Mic } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 w-full h-full">
        {isVideoPlaying ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
            }}
          />
        )}
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
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-righteous text-4xl md:text-7xl lg:text-8xl mb-4 leading-tight">
            <span className="block festival-title neon-text">HORNBILL</span>
            <span className="block text-white">MUSIC FESTIVAL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-2 font-light">
            India's Biggest Music Festival
          </p>
          
          <p className="text-lg md:text-xl text-neon-purple mb-8 font-medium">
            🎵 Where the Hills Sing • Nagaland's Cultural Soul
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auditions">
              <Button className="btn-festival text-lg px-8 py-4">
                <Mic className="mr-2" size={20} />
                Register Band
              </Button>
            </Link>
            <Link to="/events">
              <Button className="btn-stage text-lg px-8 py-4">
                🎟️ Book Tickets
              </Button>
            </Link>
            <Link to="/schedule">
              <Button className="btn-tribal text-lg px-8 py-4">
                <Calendar className="mr-2" size={20} />
                Festival Schedule
              </Button>
            </Link>
          </div>
        </div>

        {/* Festival Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 ${
            statsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className={`festival-card text-center transition-all duration-700 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '0ms' : '0ms' }}>
            <div className="text-3xl md:text-4xl font-bold text-neon-pink mb-2">200+</div>
            <div className="text-gray-400">Musicians</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '150ms' : '0ms' }}>
            <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2">16</div>
            <div className="text-gray-400">Tribes</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '300ms' : '0ms' }}>
            <div className="text-3xl md:text-4xl font-bold text-electric-orange mb-2">5</div>
            <div className="text-gray-400">Days</div>
          </div>
          <div className={`festival-card text-center transition-all duration-700 ${
            statsVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: statsVisible ? '450ms' : '0ms' }}>
            <div className="text-3xl md:text-4xl font-bold text-cyber-teal mb-2">50K+</div>
            <div className="text-gray-400">Fans</div>
          </div>
        </div>

        {/* Play/Pause Button for Festival Video */}
        <div className="mt-16">
          <button className="group relative" onClick={toggleVideo}>
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center neon-glow-pink group-hover:scale-110 transition-all duration-300 animate-festival-pulse">
              {isVideoPlaying ? (
                <Pause className="text-white" size={32} fill="currentColor" />
              ) : (
                <Play className="text-white ml-1" size={32} fill="currentColor" />
              )}
            </div>
            <p className="text-gray-300 mt-4 text-sm font-medium">
              {isVideoPlaying ? 'Pause Festival Video' : 'Watch Festival Highlights'}
            </p>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
