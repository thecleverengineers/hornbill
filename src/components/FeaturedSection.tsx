import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Music, Camera, Users, ChevronLeft, ChevronRight, Eye, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link, useNavigate } from 'react-router-dom';
import GalleryModal from './GalleryModal';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: documentaryRef, isVisible: documentaryVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation<HTMLDivElement>();

  // Gallery modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const featuredCards = [
    {
      title: '🎤 Pre-Ticket Auditions',
      description: 'Submit your band for a chance to perform at Hornbill Music Festival',
      cta: 'Apply Now',
      variant: 'festival',
      icon: Music,
      gradient: 'from-pink-500/20 to-purple-600/20',
      border: 'border-pink-500/30',
      link: '/auditions'
    },
    {
      title: '🦅 Hornbill Music Festival',
      description: 'Explore event highlights, stages, and experiences waiting for you this December.',
      cta: 'Explore Festival →',
      variant: 'stage',
      icon: Users,
      gradient: 'from-orange-500/20 to-teal-500/20',
      border: 'border-orange-500/30',
      link: '/hornbill-music-festival'
    },
    {
      title: '📅 Live Schedule',
      description: 'Check out the complete festival lineup and plan your experience',
      cta: 'View Schedule',
      variant: 'tribal',
      icon: Camera,
      gradient: 'from-purple-600/20 to-yellow-500/20',
      border: 'border-purple-500/30',
      link: '/schedule'
    }
  ];

  const galleryImages = [
    {
      id: 1,
      title: 'Main Stage Performance',
      description: 'Traditional Naga folk performance at sunset',
      category: 'Performance',
      gradient: 'from-orange-500/80 to-pink-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Tribal Dance',
      description: 'Colorful traditional costumes and rhythmic movements',
      category: 'Culture',
      gradient: 'from-purple-500/80 to-blue-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Festival Crowd',
      description: 'Thousands gathered to celebrate music and culture',
      category: 'Atmosphere',
      gradient: 'from-teal-500/80 to-green-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Night Concert',
      description: 'Electric atmosphere under the stars',
      category: 'Performance',
      gradient: 'from-indigo-500/80 to-purple-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Traditional Instruments',
      description: 'Ancient instruments creating modern magic',
      category: 'Music',
      gradient: 'from-yellow-500/80 to-orange-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Cultural Exchange',
      description: 'Artists from different tribes collaborating',
      category: 'Culture',
      gradient: 'from-pink-500/80 to-red-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Backstage Moments',
      description: 'Behind the scenes with performing artists',
      category: 'Behind Scenes',
      gradient: 'from-emerald-500/80 to-cyan-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Festival Food',
      description: 'Traditional Naga cuisine and festival treats',
      category: 'Food',
      gradient: 'from-amber-500/80 to-yellow-500/80',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
    }
  ];

  const scrollGallery = (direction: 'left' | 'right') => {
    const gallery = document.getElementById('festival-gallery');
    if (gallery) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 320;
      gallery.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scrollGallery('right');
    }
    if (isRightSwipe) {
      scrollGallery('left');
    }
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

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
              onClick={() => navigate(card.link)}
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

        <div 
          ref={galleryRef}
          className={`mt-16 transition-all duration-800 ${
            galleryVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className={`font-righteous text-2xl md:text-3xl transition-all duration-1000 delay-200 ${
              galleryVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <span className="festival-title">Live from the Festival</span>
            </h3>
            
            <div className="flex gap-2">
              <button
                onClick={() => scrollGallery('left')}
                className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-full hover:bg-gray-700/50 hover:border-pink-500/50 transition-all duration-300"
              >
                <ChevronLeft className="text-gray-400 hover:text-pink-400" size={20} />
              </button>
              <button
                onClick={() => scrollGallery('right')}
                className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-full hover:bg-gray-700/50 hover:border-pink-500/50 transition-all duration-300"
              >
                <ChevronRight className="text-gray-400 hover:text-pink-400" size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden -mx-4 px-4">
            <div 
              id="festival-gallery"
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory touch-pan-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {galleryImages.map((image, index) => (
                <div 
                  key={image.id}
                  className={`flex-shrink-0 w-72 sm:w-80 h-64 relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-105 snap-start select-none ${
                    galleryVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    animationDelay: galleryVisible ? `${index * 100}ms` : '0ms'
                  }}
                  onClick={() => openModal(index)}
                >
                  {/* Background Image */}
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30">
                        {image.category}
                      </span>
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-pink-500/50 transition-all duration-300">
                        <Eye className="text-white" size={16} />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-righteous text-lg md:text-xl text-white mb-2 group-hover:text-pink-200 transition-colors duration-300">
                        {image.title}
                      </h4>
                      <p className="text-gray-200 text-sm opacity-90 line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-400/50 rounded-2xl transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-8">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="btn-festival w-full sm:w-auto"
            >
              <Camera className="mr-2" size={20} />
              Quick View Gallery
            </Button>
            
            <Link to="/gallery" className="w-full sm:w-auto">
              <Button className="btn-festival w-full">
                <ExternalLink className="mr-2" size={20} />
                Full Gallery Page
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />
    </section>
  );
};

export default FeaturedSection;
