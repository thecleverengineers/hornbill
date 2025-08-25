
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
        <div className="absolute top-20 left-10 text-4xl animate-on-scroll">🎵</div>
        <div className="absolute top-32 right-20 text-3xl animate-on-scroll-delay-100">🎸</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-on-scroll-delay-200">🥁</div>
        <div className="absolute bottom-32 right-10 text-4xl animate-on-scroll-delay-300">🎤</div>
        <div className="absolute top-1/2 left-5 text-2xl animate-on-scroll-delay-400">✨</div>
        <div className="absolute top-1/4 right-5 text-3xl animate-on-scroll-delay-500">🎺</div>
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
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="font-righteous text-4xl md:text-7xl lg:text-8xl mb-4 leading-tight">
            <span className="block text-gradient animate-on-scroll">HORNBILL</span>
            <span className="block text-white animate-on-scroll-delay-200">MUSIC FESTIVAL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-2 font-light animate-on-scroll-delay-300">
            India's Biggest Music Festival 🇮🇳
          </p>
          
          <p className="text-lg md:text-xl text-purple-400 mb-8 font-medium animate-on-scroll-delay-400">
            🎵 Where the Hills Sing • Nagaland's Cultural Soul 🏔️
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-on-scroll-delay-500">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-4 transition-all duration-300 hover:scale-105">
              <Mic className="mr-2" size={20} />
              Register Band
              <Sparkles className="ml-2" size={16} />
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white text-lg px-8 py-4 transition-all duration-300 hover:scale-105">
              🎟️ Book Tickets 🚀
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white text-lg px-8 py-4 transition-all duration-300 hover:scale-105">
              <Calendar className="mr-2" size={20} />
              Festival Schedule ⚡
            </Button>
          </div>
        </div>

        {/* Festival Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-on-scroll-delay-600">
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2 transition-transform duration-300 group-hover:scale-110">
              200+
            </div>
            <div className="text-gray-400">Musicians 🎸</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 transition-transform duration-300 group-hover:scale-110">
              16
            </div>
            <div className="text-gray-400">Tribes 🏛️</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2 transition-transform duration-300 group-hover:scale-110">
              5
            </div>
            <div className="text-gray-400">Days 📅</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2 transition-transform duration-300 group-hover:scale-110">
              50K+
            </div>
            <div className="text-gray-400">Fans 🎉</div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="mt-16 animate-on-scroll-delay-700">
          <button className="group relative" onClick={toggleVideo}>
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              {isVideoPlaying ? (
                <Pause className="text-white" size={32} fill="currentColor" />
              ) : (
                <Play className="text-white ml-1" size={32} fill="currentColor" />
              )}
            </div>
            <p className="text-gray-300 mt-4 text-sm font-medium group-hover:text-pink-400 transition-colors">
              {isVideoPlaying ? 'Pause Festival Video ⏸️' : 'Watch Festival Highlights ▶️'}
            </p>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mt-2"></div>
        </div>
        <p className="text-gray-400 text-xs mt-2">Scroll Down 👇</p>
      </div>
    </section>
  );
};

export default HeroSection;
