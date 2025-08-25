
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Calendar, Mic, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating emoji decorations */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-20 left-10 text-4xl emoji-float">🎵</div>
        <div className="absolute top-32 right-20 text-3xl emoji-bounce">🎸</div>
        <div className="absolute bottom-40 left-20 text-5xl emoji-wiggle">🥁</div>
        <div className="absolute bottom-32 right-10 text-4xl emoji-float">🎤</div>
        <div className="absolute top-1/2 left-5 text-2xl emoji-bounce">✨</div>
        <div className="absolute top-1/4 right-5 text-3xl emoji-wiggle">🎺</div>
      </div>

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
      <div className="absolute inset-0 festival-bg opacity-70"></div>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80">
        <div className="absolute inset-0 opacity-30 tribal-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-righteous text-4xl md:text-7xl lg:text-8xl mb-4 leading-tight">
            <span className="block festival-title neon-text bounce-animation">HORNBILL</span>
            <span className="block text-white float-animation">MUSIC FESTIVAL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-2 font-light animate-fade-in">
            India's Biggest Music Festival <span className="emoji-bounce">🇮🇳</span>
          </p>
          
          <p className="text-lg md:text-xl text-neon-purple mb-8 font-medium animate-fade-in">
            <span className="emoji-wiggle">🎵</span> Where the Hills Sing • Nagaland's Cultural Soul <span className="emoji-bounce">🏔️</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
            <Button className="btn-festival text-lg px-8 py-4 group">
              <Mic className="mr-2 group-hover:animate-bounce" size={20} />
              Register Band
              <Sparkles className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
            </Button>
            <Button className="btn-stage text-lg px-8 py-4 group">
              <span className="emoji-bounce mr-2">🎟️</span>
              Book Tickets
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity emoji-wiggle">🚀</span>
            </Button>
            <Button className="btn-tribal text-lg px-8 py-4 group">
              <Calendar className="mr-2 group-hover:animate-spin" size={20} />
              Festival Schedule
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity emoji-float">⚡</span>
            </Button>
          </div>
        </div>

        {/* Festival Stats with enhanced animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in">
          <div className="festival-card text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-neon-pink mb-2 group-hover:animate-bounce">
              200+
            </div>
            <div className="text-gray-400">Musicians <span className="emoji-wiggle">🎸</span></div>
          </div>
          <div className="festival-card text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2 group-hover:animate-pulse">
              16
            </div>
            <div className="text-gray-400">Tribes <span className="emoji-bounce">🏛️</span></div>
          </div>
          <div className="festival-card text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-electric-orange mb-2 group-hover:animate-spin">
              5
            </div>
            <div className="text-gray-400">Days <span className="emoji-float">📅</span></div>
          </div>
          <div className="festival-card text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-bold text-cyber-teal mb-2 group-hover:animate-bounce">
              50K+
            </div>
            <div className="text-gray-400">Fans <span className="emoji-wiggle">🎉</span></div>
          </div>
        </div>

        {/* Play/Pause Button with enhanced effects */}
        <div className="mt-16">
          <button className="group relative" onClick={toggleVideo}>
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center neon-glow-pink group-hover:scale-125 group-active:scale-95 transition-all duration-300 animate-festival-pulse relative overflow-hidden">
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-300"></div>
              
              {isVideoPlaying ? (
                <Pause className="text-white z-10" size={32} fill="currentColor" />
              ) : (
                <Play className="text-white ml-1 z-10" size={32} fill="currentColor" />
              )}
            </div>
            <p className="text-gray-300 mt-4 text-sm font-medium group-hover:text-pink-400 transition-colors">
              {isVideoPlaying ? (
                <>Pause Festival Video <span className="emoji-bounce">⏸️</span></>
              ) : (
                <>Watch Festival Highlights <span className="emoji-wiggle">▶️</span></>
              )}
            </p>
          </button>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden">
          <div className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-gray-400 text-xs mt-2 animate-pulse">Scroll Down <span className="emoji-bounce">👇</span></p>
      </div>
    </section>
  );
};

export default HeroSection;
