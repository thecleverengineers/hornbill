
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Music, Camera, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FeaturedSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { elementRef: documentaryRef, isVisible: documentaryVisible } = useScrollAnimation();
  const { elementRef: socialRef, isVisible: socialVisible } = useScrollAnimation();

  const featuredCards = [
    {
      title: '🎤 Pre-Ticket Auditions',
      description: 'Submit your band for a chance to perform at Hornbill Music Festival',
      cta: 'Apply Now',
      variant: 'festival',
      icon: Music,
      gradient: 'from-pink-500/20 to-purple-600/20',
      border: 'border-pink-500/30'
    },
    {
      title: '🌟 Featured Artists',
      description: 'Discover incredible musicians from all 16 tribes of Nagaland',
      cta: 'Explore Artists',
      variant: 'stage',
      icon: Users,
      gradient: 'from-orange-500/20 to-teal-500/20',
      border: 'border-orange-500/30'
    },
    {
      title: '📅 Live Schedule',
      description: 'Check out the complete festival lineup and plan your experience',
      cta: 'View Schedule',
      variant: 'tribal',
      icon: Camera,
      gradient: 'from-purple-600/20 to-yellow-500/20',
      border: 'border-purple-500/30'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-righteous text-4xl md:text-5xl mb-4">
            <span className="festival-title">Festival Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Immerse yourself in the sounds, culture, and spirit of Nagaland
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            cardsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          {featuredCards.map((card, index) => (
            <Card 
              key={index} 
              className={`festival-card ${card.gradient} ${card.border} group cursor-pointer transition-all duration-500 ${
                cardsVisible ? 'animate-fade-in' : ''
              }`}
              style={{
                animationDelay: cardsVisible ? `${index * 200}ms` : '0ms'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <card.icon className="text-4xl text-pink-400" size={48} />
                  <ArrowRight className="text-gray-400 group-hover:text-pink-400 group-hover:translate-x-2 transition-all duration-300" size={24} />
                </div>
                
                <h3 className="font-righteous text-2xl mb-4 text-white">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                <Button className={`btn-${card.variant} w-full`}>
                  {card.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mini Documentary Section */}
        <div 
          ref={documentaryRef}
          className={`festival-card transition-all duration-800 ${
            documentaryVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-1000 delay-200 ${
              documentaryVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="font-righteous text-3xl mb-4">
                <span className="festival-title">"Sounds of Nagaland"</span>
              </h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Dive deep into the musical heritage of the 16 tribes of Nagaland. 
                Watch our exclusive documentary showcasing the traditional instruments, 
                songs, and stories that make this festival unique.
              </p>
              <Button className="btn-festival">
                <Camera className="mr-2" size={20} />
                Watch Documentary
              </Button>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-400 ${
              documentaryVisible 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-8 scale-95'
            }`}>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center neon-glow-purple">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto neon-glow-pink">
                    <Camera className="text-white" size={32} />
                  </div>
                  <p className="text-gray-300 font-medium">Mini Documentary</p>
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Wall Preview */}
        <div 
          ref={socialRef}
          className={`mt-16 transition-all duration-800 ${
            socialVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          <h3 className={`font-righteous text-3xl text-center mb-8 transition-all duration-1000 delay-200 ${
            socialVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <span className="festival-title">Live from the Festival</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={index} 
                className={`aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-500 cursor-pointer border border-gray-700/50 hover:border-pink-500/50 ${
                  socialVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}
                style={{
                  animationDelay: socialVisible ? `${index * 100}ms` : '0ms'
                }}
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
