
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Music, Camera, Users, Zap, Star } from 'lucide-react';

const FeaturedSection = () => {
  const featuredCards = [
    {
      title: '🎤 Pre-Ticket Auditions',
      description: 'Submit your band for a chance to perform at Hornbill Music Festival',
      cta: 'Apply Now',
      variant: 'festival',
      icon: Music,
      gradient: 'from-pink-500/20 to-purple-600/20',
      border: 'border-pink-500/30',
      emoji: '🎤'
    },
    {
      title: '🌟 Featured Artists',
      description: 'Discover incredible musicians from all 16 tribes of Nagaland',
      cta: 'Explore Artists',
      variant: 'stage',
      icon: Users,
      gradient: 'from-orange-500/20 to-teal-500/20',
      border: 'border-orange-500/30',
      emoji: '🌟'
    },
    {
      title: '📅 Live Schedule',
      description: 'Check out the complete festival lineup and plan your experience',
      cta: 'View Schedule',
      variant: 'tribal',
      icon: Camera,
      gradient: 'from-purple-600/20 to-yellow-500/20',
      border: 'border-purple-500/30',
      emoji: '📅'
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-lg float-animation"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-righteous text-4xl md:text-5xl mb-4">
            <span className="festival-title bounce-animation">Festival Experience</span>
            <div className="flex justify-center gap-4 mt-4">
              <span className="text-3xl emoji-bounce">🎪</span>
              <span className="text-3xl emoji-wiggle">🎨</span>
              <span className="text-3xl emoji-float">🎭</span>
            </div>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
            Immerse yourself in the sounds, culture, and spirit of Nagaland
            <span className="emoji-bounce ml-2">✨</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featuredCards.map((card, index) => (
            <Card key={index} className={`festival-card ${card.gradient} ${card.border} group cursor-pointer transform hover:rotate-1 hover:scale-105`}>
              <CardContent className="p-8 relative overflow-hidden">
                {/* Animated background sparkle */}
                <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12">
                  <Star className="text-yellow-400 animate-spin" size={24} />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <card.icon className="text-4xl text-pink-400 group-hover:animate-bounce transition-all duration-300" size={48} />
                    <div className="absolute -top-2 -right-2 text-lg emoji-bounce">{card.emoji}</div>
                  </div>
                  <ArrowRight className="text-gray-400 group-hover:text-pink-400 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" size={24} />
                </div>
                
                <h3 className="font-righteous text-2xl mb-4 text-white group-hover:text-pink-400 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {card.description}
                </p>
                
                <Button className={`btn-${card.variant} w-full group-hover:animate-pulse transform group-hover:scale-105 transition-all duration-300`}>
                  {card.cta}
                  <Zap className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                </Button>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Mini Documentary Section */}
        <div className="festival-card relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0080' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'pattern-float 10s ease-in-out infinite'
            }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="font-righteous text-3xl mb-4">
                <span className="festival-title">"Sounds of Nagaland"</span>
                <div className="flex gap-2 mt-2">
                  <span className="emoji-bounce">🎬</span>
                  <span className="emoji-wiggle">🎵</span>
                  <span className="emoji-float">🎭</span>
                </div>
              </h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Dive deep into the musical heritage of the 16 tribes of Nagaland. 
                Watch our exclusive documentary showcasing the traditional instruments, 
                songs, and stories that make this festival unique.
                <span className="emoji-bounce ml-2">📖</span>
              </p>
              <Button className="btn-festival group">
                <Camera className="mr-2 group-hover:animate-spin" size={20} />
                Watch Documentary
                <span className="ml-2 emoji-wiggle">🎥</span>
              </Button>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center neon-glow-purple group-hover:neon-glow-pink transition-all duration-300 transform group-hover:scale-105">
                <div className="text-center relative">
                  {/* Animated play button */}
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto neon-glow-pink group-hover:animate-bounce relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-300"></div>
                    <Camera className="text-white z-10" size={32} />
                  </div>
                  <p className="text-gray-300 font-medium">Mini Documentary</p>
                  <p className="text-gray-500 text-sm">Coming Soon <span className="emoji-bounce">🔜</span></p>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 emoji-float">✨</div>
                  <div className="absolute -bottom-2 -left-2 text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 emoji-bounce">🎬</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Social Media Wall Preview */}
        <div className="mt-16">
          <h3 className="font-righteous text-3xl text-center mb-8">
            <span className="festival-title">Live from the Festival</span>
            <div className="flex justify-center gap-4 mt-2">
              <span className="emoji-bounce">📸</span>
              <span className="emoji-wiggle">📱</span>
              <span className="emoji-float">💫</span>
            </div>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-2 transition-transform duration-300 cursor-pointer border border-gray-700/50 hover:border-pink-500/50 group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:animate-spin">
                    <span className="text-white text-xs">📸</span>
                  </div>
                  <p className="text-gray-400 text-xs group-hover:text-pink-400 transition-colors">Instagram</p>
                </div>

                {/* Corner sparkle */}
                <div className="absolute top-1 right-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity emoji-bounce">✨</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
