
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Play, Instagram, Youtube } from 'lucide-react';

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Rock', 'Folk', 'Electronic', 'Traditional', 'Fusion'];
  
  const artists = [
    {
      id: 1,
      name: 'The Hornbill Collective',
      genre: 'Folk',
      district: 'Kohima',
      language: 'Angami',
      bio: 'Blending traditional Angami folk with modern arrangements',
      image: '🎵',
      socials: { instagram: '@hornbillcollective', youtube: 'HornbillMusic' }
    },
    {
      id: 2,
      name: 'Naga Thunder',
      genre: 'Rock',
      district: 'Dimapur',
      language: 'English',
      bio: 'High-energy rock band representing the spirit of modern Nagaland',
      image: '⚡',
      socials: { instagram: '@nagathunder', youtube: 'NagaThunderBand' }
    },
    {
      id: 3,
      name: 'Bamboo Beats',
      genre: 'Traditional',
      district: 'Wokha',
      language: 'Lotha',
      bio: 'Masters of traditional Lotha percussion and bamboo instruments',
      image: '🎋',
      socials: { instagram: '@bamboobeats', youtube: 'BambooBeatsOfficial' }
    },
    {
      id: 4,
      name: 'Digital Dao',
      genre: 'Electronic',
      district: 'Mon',
      language: 'Konyak',
      bio: 'Electronic music infused with Konyak tribal chants and rhythms',
      image: '🎛️',
      socials: { instagram: '@digitaldao', youtube: 'DigitalDaoMusic' }
    },
    {
      id: 5,
      name: 'Mountain Echo',
      genre: 'Fusion',
      district: 'Zunheboto',
      language: 'Sumi',
      bio: 'Contemporary fusion of Sumi folk melodies with jazz influences',
      image: '🏔️',
      socials: { instagram: '@mountainecho', youtube: 'MountainEchoMusic' }
    },
    {
      id: 6,
      name: 'Tribal Harmony',
      genre: 'Traditional',
      district: 'Tuensang',
      language: 'Chang',
      bio: 'Preserving and performing ancient Chang tribe songs and dances',
      image: '🎭',
      socials: { instagram: '@tribalharmony', youtube: 'TribalHarmonyNL' }
    }
  ];

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || artist.genre === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="festival-bg rounded-3xl p-8 md:p-16 text-center mb-12 tribal-pattern">
            <h1 className="font-righteous text-4xl md:text-6xl mb-4">
              <span className="festival-title neon-text">Featured Artists</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover the incredible musicians from all 16 tribes of Nagaland
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                placeholder="Search artists, genres, districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white neon-glow-pink'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Artists Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <Card key={artist.id} className="artist-card overflow-hidden group cursor-pointer">
                <CardContent className="p-0">
                  {/* Artist Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-300">
                    {artist.image}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-pink-500/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="text-white ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🎵</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-righteous text-xl mb-2 text-white group-hover:text-pink-400 transition-colors">
                      {artist.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        artist.genre === 'Rock' ? 'bg-pink-500/20 text-pink-400' :
                        artist.genre === 'Folk' ? 'bg-purple-500/20 text-purple-400' :
                        artist.genre === 'Electronic' ? 'bg-orange-500/20 text-orange-400' :
                        artist.genre === 'Traditional' ? 'bg-teal-500/20 text-teal-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {artist.genre}
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                        {artist.district}
                      </span>
                      <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                        {artist.language}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {artist.bio}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <Instagram size={20} className="text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                        <Youtube size={20} className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
                      </div>
                      <Button className="btn-festival">
                        Listen Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Collaboration CTA */}
          <div className="festival-card mt-16 text-center">
            <h3 className="font-righteous text-3xl mb-4">
              <span className="festival-title">Bring Nagaland's Sound to Your Stage</span>
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Interested in collaborating with our talented artists? Connect with musicians 
              who can bring the authentic sounds of Nagaland to your events and projects.
            </p>
            <Button className="btn-stage text-lg px-8 py-4">
              Start Collaboration
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Artists;
