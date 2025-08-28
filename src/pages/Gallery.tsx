
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, ArrowLeft, Download, Share2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation<HTMLDivElement>();

  const allGalleryImages = [
    {
      id: 1,
      title: 'Main Stage Performance',
      description: 'Traditional Naga folk performance at sunset with vibrant costumes',
      category: 'Performance',
      gradient: 'from-orange-500/80 to-pink-500/80',
      tags: ['Main Stage', 'Traditional', 'Folk Music']
    },
    {
      id: 2,
      title: 'Tribal Dance',
      description: 'Colorful traditional costumes and rhythmic movements celebrating heritage',
      category: 'Culture',
      gradient: 'from-purple-500/80 to-blue-500/80',
      tags: ['Dance', 'Traditional', 'Culture']
    },
    {
      id: 3,
      title: 'Festival Crowd',
      description: 'Thousands gathered to celebrate music and culture under the stars',
      category: 'Atmosphere',
      gradient: 'from-teal-500/80 to-green-500/80',
      tags: ['Crowd', 'Atmosphere', 'Unity']
    },
    {
      id: 4,
      title: 'Night Concert',
      description: 'Electric atmosphere under the stars with spectacular lighting',
      category: 'Performance',
      gradient: 'from-indigo-500/80 to-purple-500/80',
      tags: ['Night', 'Concert', 'Lighting']
    },
    {
      id: 5,
      title: 'Traditional Instruments',
      description: 'Ancient instruments creating modern magic in perfect harmony',
      category: 'Music',
      gradient: 'from-yellow-500/80 to-orange-500/80',
      tags: ['Instruments', 'Traditional', 'Music']
    },
    {
      id: 6,
      title: 'Cultural Exchange',
      description: 'Artists from different tribes collaborating and sharing stories',
      category: 'Culture',
      gradient: 'from-pink-500/80 to-red-500/80',
      tags: ['Collaboration', 'Tribes', 'Exchange']
    },
    {
      id: 7,
      title: 'Backstage Moments',
      description: 'Behind the scenes with performing artists preparing for shows',
      category: 'Behind Scenes',
      gradient: 'from-emerald-500/80 to-cyan-500/80',
      tags: ['Backstage', 'Artists', 'Preparation']
    },
    {
      id: 8,
      title: 'Festival Food',
      description: 'Traditional Naga cuisine and festival treats bringing people together',
      category: 'Food',
      gradient: 'from-amber-500/80 to-yellow-500/80',
      tags: ['Food', 'Traditional', 'Cuisine']
    },
    {
      id: 9,
      title: 'Workshop Sessions',
      description: 'Learning traditional music techniques from master artists',
      category: 'Education',
      gradient: 'from-rose-500/80 to-pink-500/80',
      tags: ['Workshop', 'Learning', 'Masters']
    },
    {
      id: 10,
      title: 'Sunset Performance',
      description: 'Golden hour magic with silhouetted performers against the sky',
      category: 'Performance',
      gradient: 'from-orange-600/80 to-red-500/80',
      tags: ['Sunset', 'Silhouette', 'Golden Hour']
    },
    {
      id: 11,
      title: 'Children\'s Corner',
      description: 'Young talents showcasing their skills and cultural pride',
      category: 'Youth',
      gradient: 'from-cyan-500/80 to-blue-500/80',
      tags: ['Children', 'Youth', 'Talent']
    },
    {
      id: 12,
      title: 'Craft Exhibition',
      description: 'Traditional Naga handicrafts and artisanal works on display',
      category: 'Crafts',
      gradient: 'from-violet-500/80 to-purple-500/80',
      tags: ['Crafts', 'Handicrafts', 'Art']
    }
  ];

  const categories = ['All', 'Performance', 'Culture', 'Atmosphere', 'Music', 'Behind Scenes', 'Food', 'Education', 'Youth', 'Crafts'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? allGalleryImages 
    : allGalleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2" size={16} />
                Back to Festival
              </Button>
            </Link>
          </div>
          
          <h1 className="font-righteous text-4xl md:text-6xl mb-4">
            <span className="festival-title">Festival Gallery</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Relive the magical moments from Hornbill Music Festival through our comprehensive photo gallery
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                  : 'border-gray-700 text-gray-300 hover:border-pink-500 hover:text-pink-400'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className={`transition-all duration-800 ${
            galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id}
                className={`festival-card group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  galleryVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}
                style={{
                  animationDelay: galleryVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} opacity-90`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30">
                          {image.category}
                        </span>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-pink-500/50 transition-all duration-300">
                            <Share2 className="text-white" size={14} />
                          </button>
                          <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-pink-500/50 transition-all duration-300">
                            <Download className="text-white" size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-righteous text-lg text-white mb-2 group-hover:text-pink-200 transition-colors duration-300">
                          {image.title}
                        </h3>
                        <p className="text-gray-200 text-sm opacity-90 mb-3 line-clamp-2">
                          {image.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {image.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-400/50 rounded-lg transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="btn-festival">
            <Camera className="mr-2" size={20} />
            Load More Images
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
