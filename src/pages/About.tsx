
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Users, Award, Heart, Mountain, Mic } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`
          }}
        />
        <div className="absolute inset-0 festival-bg opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-righteous festival-title mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating the rich musical heritage of Nagaland and empowering local artists
          </p>
        </div>
      </section>

      {/* About Hornbill Music Festival */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-righteous festival-title mb-6">
                About the Hornbill Music Festival
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The Hornbill Music Festival emerged from the heart of Nagaland's cultural landscape, born during the grand celebration of the Hornbill Festival. Named after the revered hornbill bird that holds deep significance in Naga folklore, this festival represents the soaring spirit of musical expression that defines our tribal heritage.
                </p>
                <p>
                  Set against the breathtaking backdrop of Nagaland's rolling hills and heritage village, the festival serves as a bridge between generations—honoring the ancient melodies passed down through oral tradition while embracing contemporary sounds that reflect our evolving identity. Each performance resonates with the authentic spirit of the Naga people, creating an atmosphere where music becomes a universal language of connection.
                </p>
                <p>
                  The festival celebrates not just music, but the stories, struggles, and triumphs of the Naga tribes, showcasing how cultural preservation and artistic innovation can coexist harmoniously. It's where the hills truly sing, echoing with voices that have shaped our musical landscape for centuries.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden neon-glow-purple">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Hornbill Music Festival"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center neon-glow-pink">
                <Mountain className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About TaFMA */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-righteous festival-title mb-6">
              About TaFMA
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Task Force for Music & Arts
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <Card className="festival-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Heart className="text-pink-500" size={28} />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed">
                  The Task Force for Music & Arts (TaFMA) is dedicated to nurturing and promoting the rich musical traditions of Nagaland while supporting contemporary artists in their creative journey.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Impact Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="festival-card text-center">
              <CardContent className="pt-8">
                <Users className="mx-auto text-pink-500 mb-4" size={40} />
                <h3 className="text-3xl font-righteous text-white mb-2">200+</h3>
                <p className="text-gray-300">Local Musicians Empowered</p>
              </CardContent>
            </Card>
            <Card className="festival-card text-center">
              <CardContent className="pt-8">
                <Music className="mx-auto text-purple-500 mb-4" size={40} />
                <h3 className="text-3xl font-righteous text-white mb-2">16</h3>
                <p className="text-gray-300">Naga Tribes Documented</p>
              </CardContent>
            </Card>
            <Card className="festival-card text-center">
              <CardContent className="pt-8">
                <Award className="mx-auto text-orange-500 mb-4" size={40} />
                <h3 className="text-3xl font-righteous text-white mb-2">∞</h3>
                <p className="text-gray-300">Cultural Exchange Platforms</p>
              </CardContent>
            </Card>
          </div>

          {/* About TaFMA Description */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                TaFMA was established with the vision of creating a sustainable ecosystem for music and arts in Nagaland. We work closely with tribal elders to document and preserve traditional songs, while also providing modern recording facilities and training for young artists.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Through partnerships with institutions and festivals across India and internationally, we've helped Naga musicians share their unique sound with the world.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden neon-glow-orange">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="TaFMA Recording Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Our Initiatives */}
          <div>
            <h3 className="text-3xl font-righteous festival-title mb-8 text-center">
              Our Initiatives
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="festival-card">
                <CardContent className="pt-6">
                  <Mic className="text-pink-500 mb-4" size={32} />
                  <h4 className="text-lg font-semibold text-white mb-2">Artist Residency Programs</h4>
                  <p className="text-gray-400 text-sm">Providing space and resources for artists to create and collaborate</p>
                </CardContent>
              </Card>
              <Card className="festival-card">
                <CardContent className="pt-6">
                  <Music className="text-purple-500 mb-4" size={32} />
                  <h4 className="text-lg font-semibold text-white mb-2">Cultural Documentation</h4>
                  <p className="text-gray-400 text-sm">Preserving traditional songs and musical heritage for future generations</p>
                </CardContent>
              </Card>
              <Card className="festival-card">
                <CardContent className="pt-6">
                  <Award className="text-orange-500 mb-4" size={32} />
                  <h4 className="text-lg font-semibold text-white mb-2">Production Workshops</h4>
                  <p className="text-gray-400 text-sm">Modern music production training and state-of-the-art facilities</p>
                </CardContent>
              </Card>
              <Card className="festival-card">
                <CardContent className="pt-6">
                  <Heart className="text-teal-500 mb-4" size={32} />
                  <h4 className="text-lg font-semibold text-white mb-2">Community Outreach</h4>
                  <p className="text-gray-400 text-sm">Bringing music education to remote villages across Nagaland</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Culmination */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-righteous festival-title mb-8">
              The Hornbill Music Festival
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              The Hornbill Music Festival represents the culmination of our year-round efforts—a celebration where traditional and contemporary artists come together to showcase the incredible diversity and depth of Nagaland's musical heritage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
