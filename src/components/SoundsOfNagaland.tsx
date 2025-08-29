
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Play, Volume2, Headphones, Heart, Share2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SoundsOfNagaland = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: tracksRef, isVisible: tracksVisible } = useScrollAnimation<HTMLDivElement>();

  const traditionalTracks = [
    {
      id: 1,
      title: "Warrior's Song",
      artist: "Angami Tribe",
      duration: "4:32",
      description: "Traditional war chant passed down through generations",
      category: "Traditional",
      gradient: "from-red-500/20 to-orange-500/20",
      border: "border-red-500/30"
    },
    {
      id: 2,
      title: "Harvest Celebration",
      artist: "Ao Community",
      duration: "3:45",
      description: "Joyful melodies celebrating the season of plenty",
      category: "Folk",
      gradient: "from-green-500/20 to-teal-500/20",
      border: "border-green-500/30"
    },
    {
      id: 3,
      title: "Mountain Echoes",
      artist: "Konyak Ensemble",
      duration: "5:18",
      description: "Haunting sounds that mirror the mountain landscape",
      category: "Instrumental",
      gradient: "from-blue-500/20 to-purple-500/20",
      border: "border-blue-500/30"
    },
    {
      id: 4,
      title: "Love Ballad of the Hills",
      artist: "Sema Singers",
      duration: "4:12",
      description: "Romantic melodies under the starlit Naga sky",
      category: "Romance",
      gradient: "from-pink-500/20 to-purple-500/20",
      border: "border-pink-500/30"
    },
    {
      id: 5,
      title: "Festival Drums",
      artist: "Lotha Percussion",
      duration: "6:25",
      description: "Rhythmic beats that make hearts dance with joy",
      category: "Percussion",
      gradient: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-500/30"
    },
    {
      id: 6,
      title: "Spirit of the Forest",
      artist: "Chakhesang Collective",
      duration: "3:58",
      description: "Mystical sounds connecting with nature's essence",
      category: "Spiritual",
      gradient: "from-emerald-500/20 to-cyan-500/20",
      border: "border-emerald-500/30"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-gray-900/20">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Music className="text-pink-400" size={48} />
            <h2 className="font-righteous text-4xl md:text-5xl">
              <span className="festival-title">Sounds of Nagaland</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the rich musical heritage of Nagaland's tribes. 
            Each melody tells a story, each rhythm carries the soul of the hills.
          </p>
        </div>

        <div 
          ref={tracksRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-1000 ${
            tracksVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          {traditionalTracks.map((track, index) => (
            <Card 
              key={track.id} 
              className={`festival-card ${track.gradient} ${track.border} group cursor-pointer transition-all duration-500 hover:scale-105 ${
                tracksVisible ? 'animate-fade-in' : ''
              }`}
              style={{
                animationDelay: tracksVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-xs font-medium text-pink-300">
                    {track.category}
                  </span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Heart className="text-pink-400" size={14} />
                    </button>
                    <button className="w-8 h-8 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Share2 className="text-pink-400" size={14} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-righteous text-xl text-white mb-1 group-hover:text-pink-200 transition-colors duration-300">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{track.artist}</p>
                  <p className="text-gray-500 text-xs">{track.duration}</p>
                </div>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {track.description}
                </p>

                <div className="flex items-center gap-3">
                  <Button 
                    size="sm" 
                    className="btn-festival flex-1 group-hover:bg-pink-500/30 transition-all duration-300"
                  >
                    <Play className="mr-2" size={16} />
                    Play
                  </Button>
                  <button className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-pink-500/50 rounded-full flex items-center justify-center transition-all duration-300">
                    <Volume2 className="text-gray-400 hover:text-pink-400" size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center transition-all duration-800 delay-400 ${
          tracksVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-festival">
              <Headphones className="mr-2" size={20} />
              Listen to Full Playlist
            </Button>
            <Button variant="outline" className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
              <Music className="mr-2" size={20} />
              Discover More Artists
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoundsOfNagaland;
