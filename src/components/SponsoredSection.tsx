
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SponsoredSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: sponsorsRef, isVisible: sponsorsVisible } = useScrollAnimation<HTMLDivElement>();

  const sponsors = [
    {
      id: 1,
      name: 'Tourism Nagaland',
      category: 'Government Partner',
      logo: '🏛️',
      description: 'Official tourism partner promoting Nagaland heritage'
    },
    {
      id: 2,
      name: 'Northeast India Music',
      category: 'Music Partner',
      logo: '🎵',
      description: 'Supporting regional music and artists'
    },
    {
      id: 3,
      name: 'Cultural Heritage Foundation',
      category: 'Cultural Partner',
      logo: '🎭',
      description: 'Preserving and promoting tribal culture'
    },
    {
      id: 4,
      name: 'Mountain View Resort',
      category: 'Hospitality Partner',
      logo: '🏔️',
      description: 'Premium accommodation for festival visitors'
    },
    {
      id: 5,
      name: 'Local Craft Co.',
      category: 'Craft Partner',
      logo: '🎨',
      description: 'Supporting local artisans and traditional crafts'
    },
    {
      id: 6,
      name: 'Tribal Foods Network',
      category: 'Food Partner',
      logo: '🍽️',
      description: 'Authentic Naga cuisine experiences'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
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
            <span className="festival-title">Our Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thank you to our amazing sponsors and partners who make Hornbill Music Festival possible
          </p>
        </div>

        <div 
          ref={sponsorsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            sponsorsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          {sponsors.map((sponsor, index) => (
            <Card 
              key={sponsor.id}
              className={`festival-card bg-card/50 backdrop-blur-md border border-border/50 group cursor-pointer transition-all duration-500 hover:scale-105 hover:border-primary/50 ${
                sponsorsVisible ? 'animate-fade-in' : ''
              }`}
              style={{
                animationDelay: sponsorsVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {sponsor.logo}
                </div>
                
                <h3 className="font-righteous text-xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {sponsor.name}
                </h3>
                
                <div className="mb-3">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium border border-primary/30">
                    {sponsor.category}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sponsor.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-800 delay-300 ${
          sponsorsVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50">
            <p className="text-muted-foreground mb-2">
              Interested in partnering with us?
            </p>
            <p className="text-lg font-medium text-foreground">
              Contact us at <span className="text-primary">partners@hornbillmusicfestival.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsoredSection;
