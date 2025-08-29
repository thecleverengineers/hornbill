import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Music, MapPin, Calendar, Users, Utensils, Globe, Ticket, Star, Camera, Play } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useNavigate } from 'react-router-dom';
import GalleryModal from '@/components/GalleryModal';

const HornbillMusicFestival = () => {
  const navigate = useNavigate();
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: scheduleRef, isVisible: scheduleVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: ticketsRef, isVisible: ticketsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: experienceRef, isVisible: experienceVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: legacyRef, isVisible: legacyVisible } = useScrollAnimation<HTMLDivElement>();

  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const galleryImages = [
    {
      id: 1,
      title: 'Main Stage Performance',
      description: 'International artists performing under the stars at Kisama Heritage Village',
      category: 'Performances',
      gradient: 'from-pink-500 via-purple-600 to-pink-500'
    },
    {
      id: 2,
      title: 'Traditional Dance',
      description: 'Local Naga tribes showcasing their rich cultural heritage through dance',
      category: 'Culture',
      gradient: 'from-orange-500 via-red-600 to-pink-500'
    },
    {
      id: 3,
      title: 'Festival Crowd',
      description: 'Thousands of music lovers enjoying the festival atmosphere',
      category: 'Atmosphere',
      gradient: 'from-purple-500 via-blue-600 to-cyan-500'
    },
    {
      id: 4,
      title: 'Acoustic Sessions',
      description: 'Intimate acoustic performances in the hills of Nagaland',
      category: 'Performances',
      gradient: 'from-green-500 via-teal-600 to-blue-500'
    },
    {
      id: 5,
      title: 'Food Festival',
      description: 'Traditional Naga cuisine and international food stalls',
      category: 'Food & Culture',
      gradient: 'from-yellow-500 via-orange-600 to-red-500'
    },
    {
      id: 6,
      title: 'Sunset Concert',
      description: 'Golden hour performances with breathtaking mountain views',
      category: 'Performances',
      gradient: 'from-amber-500 via-orange-600 to-pink-500'
    }
  ];

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setGalleryModalOpen(true);
  };

  const highlights = [
    {
      icon: Music,
      title: 'Global & Local Artists',
      description: 'Performances from India and beyond',
      color: 'text-pink-400'
    },
    {
      icon: MapPin,
      title: 'Stunning Venue',
      description: 'Music in the hills at Kisama Heritage Village',
      color: 'text-purple-400'
    },
    {
      icon: Calendar,
      title: '10 Days of Music',
      description: 'Rock, folk, indie, EDM, gospel & more',
      color: 'text-orange-400'
    },
    {
      icon: Utensils,
      title: 'Food & Culture',
      description: "Nagaland's unique cuisine and craft market",
      color: 'text-green-400'
    },
    {
      icon: Globe,
      title: 'Tourism Meets Music',
      description: 'Discover Nagaland while you festival',
      color: 'text-cyan-400'
    }
  ];

  const ticketOptions = [
    {
      name: 'Day Pass',
      features: ['Single day entry', 'Access to all stages', 'Food court access'],
      popular: false
    },
    {
      name: 'Season Pass',
      features: ['10-day festival access', 'Priority entry', 'Special merchandise', 'Cultural events'],
      popular: true
    },
    {
      name: 'VIP Experience',
      features: ['Premium viewing areas', 'Backstage access', 'Artist meet & greet', 'Luxury amenities', 'Exclusive merchandise'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        <div 
          ref={heroRef}
          className={`relative py-20 md:py-32 overflow-hidden transition-all duration-1000 ${
            heroVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Music Festival Stage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          {/* Tribal Pattern Overlay */}
          <div className="absolute inset-0 tribal-pattern opacity-20"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-righteous text-5xl md:text-7xl mb-6">
              <span className="festival-title neon-text">Hornbill Music Festival</span>
              <span className="block text-3xl md:text-4xl text-neon-purple mt-2">2025</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-4 font-medium">
              India's Biggest Music Festival Returns!
            </p>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              10 Days. One Unforgettable Experience in the Hills of Nagaland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-festival text-lg px-8 py-4">
                Book Tickets <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black"
                onClick={() => navigate('/schedule')}
              >
                View Schedule <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* About the Festival */}
        <section 
          ref={aboutRef}
          className={`py-20 px-4 transition-all duration-1000 ${
            aboutVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-righteous text-4xl md:text-5xl mb-8 text-white">About the Festival</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Born in the heart of Nagaland, the Hornbill Music Festival is more than a stage — it's a celebration of culture, community, and creativity. From global headliners to emerging local talent, the festival is where tradition meets modern sound, creating memories that last a lifetime.
            </p>
            <Button className="btn-festival">
              Explore the Festival Story <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </section>

        {/* Festival Highlights */}
        <section 
          ref={highlightsRef}
          className={`py-20 px-4 bg-gray-900/50 transition-all duration-1000 ${
            highlightsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-righteous text-4xl md:text-5xl text-center mb-4 text-white">
              What to Expect in 2025
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12">Festival Highlights</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => (
                <Card 
                  key={index}
                  className={`festival-card group hover:scale-105 transition-all duration-500 ${
                    highlightsVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: highlightsVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <CardContent className="p-8 text-center">
                    <highlight.icon className={`mx-auto mb-4 ${highlight.color}`} size={48} />
                    <h3 className="font-righteous text-xl mb-3 text-white group-hover:text-pink-400 transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section 
          ref={galleryRef}
          className={`py-20 px-4 transition-all duration-1000 ${
            galleryVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-righteous text-4xl md:text-5xl text-center mb-4 text-white">
              Festival Moments
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12">Captured Memories from Previous Years</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {galleryImages.map((image, index) => (
                <Card 
                  key={image.id}
                  className="festival-card group cursor-pointer overflow-hidden hover:scale-105 transition-all duration-500"
                  onClick={() => openGallery(index)}
                >
                  <CardContent className="p-0 relative">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className={`w-full h-full bg-gradient-to-br ${image.gradient} opacity-90`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                          <Play className="text-white ml-1" size={24} fill="currentColor" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30 mb-2 inline-block">
                          {image.category}
                        </span>
                        <h3 className="font-righteous text-lg text-white mb-1">
                          {image.title}
                        </h3>
                        <p className="text-gray-200 text-sm line-clamp-2">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                className="btn-festival"
                onClick={() => navigate('/gallery')}
              >
                View Full Gallery <Camera className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </section>

        {/* Festival Schedule Preview */}
        <section 
          ref={scheduleRef}
          className={`py-20 px-4 transition-all duration-1000 ${
            scheduleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-righteous text-4xl md:text-5xl mb-8 text-white">Plan Your Days</h2>
            <div className="festival-card p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                Daily lineup with dates, artists, and venues. Filter by stage, date, or genre to create your perfect festival experience.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <span className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-full border border-pink-500/30">Rock</span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">Folk</span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">Indie</span>
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">EDM</span>
                <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">Gospel</span>
              </div>
            </div>
            <Button 
              className="btn-festival"
              onClick={() => navigate('/schedule')}
            >
              View Full Schedule <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </section>

        {/* Tickets & Passes */}
        <section 
          ref={ticketsRef}
          className={`py-20 px-4 bg-gray-900/50 transition-all duration-1000 ${
            ticketsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-righteous text-4xl md:text-5xl text-center mb-4 text-white">
              Book Your Spot at the Festival
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12">Tickets & Passes</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {ticketOptions.map((ticket, index) => (
                <Card 
                  key={index}
                  className={`festival-card relative ${ticket.popular ? 'ring-2 ring-pink-500/50 scale-105' : ''} transition-all duration-500 ${
                    ticketsVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
                  }`}
                  style={{ animationDelay: ticketsVisible ? `${index * 200}ms` : '0ms' }}
                >
                  {ticket.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="mr-1" size={16} fill="currentColor" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <h3 className="font-righteous text-2xl mb-6 text-white">{ticket.name}</h3>
                    <ul className="space-y-3 mb-8">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center justify-center">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={ticket.popular ? 'btn-festival w-full' : 'w-full'} variant={ticket.popular ? 'default' : 'outline'}>
                      <Ticket className="mr-2" size={18} />
                      Select Pass
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="btn-festival text-lg px-8 py-4">
                Book Tickets Now <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Nagaland Experience */}
        <section 
          ref={experienceRef}
          className={`py-20 px-4 transition-all duration-1000 ${
            experienceVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-righteous text-4xl md:text-5xl mb-8 text-white">Beyond the Music</h2>
            <div className="festival-card p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <h4 className="font-righteous text-xl text-pink-400 mb-3">Getting Here</h4>
                  <p className="text-gray-300">Complete travel guide with flight, train, and road options to reach Nagaland.</p>
                </div>
                <div>
                  <h4 className="font-righteous text-xl text-purple-400 mb-3">Stay Options</h4>
                  <p className="text-gray-300">From authentic homestays to luxury hotels - find your perfect accommodation.</p>
                </div>
                <div>
                  <h4 className="font-righteous text-xl text-orange-400 mb-3">Cultural Tours</h4>
                  <p className="text-gray-300">Explore the Hornbill Festival, local villages, and Nagaland's rich heritage.</p>
                </div>
              </div>
            </div>
            <Button className="btn-festival">
              Plan Your Trip <Camera className="ml-2" size={18} />
            </Button>
          </div>
        </section>

        {/* The Legacy */}
        <section 
          ref={legacyRef}
          className={`py-20 px-4 bg-gray-900/50 transition-all duration-1000 ${
            legacyVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-righteous text-4xl md:text-5xl mb-8 text-white">Where Culture Meets Sound</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              For over two decades, the Hornbill Festival has been a cultural phenomenon — blending the indigenous spirit of Nagaland with contemporary music. It's not just a festival, it's a movement that connects people through sound.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="festival-card p-6">
                <h4 className="font-righteous text-xl text-pink-400 mb-3">Cultural Heritage</h4>
                <p className="text-gray-300">Celebrating the rich traditions of Nagaland's tribal communities through music and art.</p>
              </div>
              <div className="festival-card p-6">
                <h4 className="font-righteous text-xl text-purple-400 mb-3">Musical Innovation</h4>
                <p className="text-gray-300">Where traditional folk meets contemporary sounds, creating unique musical experiences.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
};

export default HornbillMusicFestival;
