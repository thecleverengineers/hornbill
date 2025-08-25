
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Music, Camera, Users } from 'lucide-react';

const FeaturedSection = () => {
  const featuredCards = [
    {
      title: '🎤 Pre-Ticket Auditions',
      description: 'Submit your band for a chance to perform at Hornbill Music Festival',
      cta: 'Apply Now',
      icon: Music,
      gradient: 'from-pink-500 to-purple-600',
    },
    {
      title: '🌟 Featured Artists',
      description: 'Discover incredible musicians from all 16 tribes of Nagaland',
      cta: 'Explore Artists',
      icon: Users,
      gradient: 'from-orange-500 to-teal-500',
    },
    {
      title: '📅 Live Schedule',
      description: 'Check out the complete festival lineup and plan your experience',
      cta: 'View Schedule',
      icon: Camera,
      gradient: 'from-purple-600 to-yellow-500',
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-righteous text-4xl md:text-5xl mb-4 animate-on-scroll">
            <span className="text-gradient">Festival Experience</span>
            <div className="flex justify-center gap-4 mt-4 animate-on-scroll-delay-100">
              <span className="text-3xl">🎪</span>
              <span className="text-3xl">🎨</span>
              <span className="text-3xl">🎭</span>
            </div>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-on-scroll-delay-200">
            Immerse yourself in the sounds, culture, and spirit of Nagaland ✨
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featuredCards.map((card, index) => (
            <Card key={index} className="bg-gray-900/80 border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 animate-on-scroll group" style={{animationDelay: `${index * 200}ms`}}>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <card.icon className="text-pink-400 group-hover:scale-110 transition-transform duration-300" size={48} />
                  <ArrowRight className="text-gray-400 group-hover:text-pink-400 group-hover:translate-x-2 transition-all duration-300" size={24} />
                </div>
                
                <h3 className="font-righteous text-2xl mb-4 text-white group-hover:text-pink-400 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                <Button className={`bg-gradient-to-r ${card.gradient} hover:scale-105 transition-all duration-300 w-full text-white`}>
                  {card.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mini Documentary Section */}
        <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8 animate-on-scroll-delay-600">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-righteous text-3xl mb-4">
                <span className="text-gradient">"Sounds of Nagaland"</span>
                <div className="flex gap-2 mt-2">
                  <span>🎬</span>
                  <span>🎵</span>
                  <span>🎭</span>
                </div>
              </h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Dive deep into the musical heritage of the 16 tribes of Nagaland. 
                Watch our exclusive documentary showcasing the traditional instruments, 
                songs, and stories that make this festival unique. 📖
              </p>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 text-white">
                <Camera className="mr-2" size={20} />
                Watch Documentary 🎥
              </Button>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700 hover:border-pink-500/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Camera className="text-white" size={32} />
                  </div>
                  <p className="text-gray-300 font-medium">Mini Documentary</p>
                  <p className="text-gray-500 text-sm">Coming Soon 🔜</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Wall Preview */}
        <div className="mt-16">
          <h3 className="font-righteous text-3xl text-center mb-8 animate-on-scroll-delay-700">
            <span className="text-gradient">Live from the Festival</span>
            <div className="flex justify-center gap-4 mt-2">
              <span>📸</span>
              <span>📱</span>
              <span>💫</span>
            </div>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer border border-gray-700 hover:border-pink-500/50 animate-on-scroll-delay-800"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-white text-xs">📸</span>
                  </div>
                  <p className="text-gray-400 text-xs">Instagram</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
