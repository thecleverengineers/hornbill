
import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: filtersRef, isVisible: filtersVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: scheduleRef, isVisible: scheduleVisible } = useScrollAnimation<HTMLDivElement>();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const days = [
    { id: 1, date: 'Dec 1, 2024', day: 'Day 1' },
    { id: 2, date: 'Dec 2, 2024', day: 'Day 2' },
    { id: 3, date: 'Dec 3, 2024', day: 'Day 3' },
    { id: 4, date: 'Dec 4, 2024', day: 'Day 4' },
    { id: 5, date: 'Dec 5, 2024', day: 'Day 5' },
    { id: 6, date: 'Dec 6, 2024', day: 'Day 6' },
    { id: 7, date: 'Dec 7, 2024', day: 'Day 7' },
    { id: 8, date: 'Dec 8, 2024', day: 'Day 8' },
    { id: 9, date: 'Dec 9, 2024', day: 'Day 9' },
    { id: 10, date: 'Dec 10, 2024', day: 'Day 10' }
  ];

  const scheduleData = {
    1: [
      { id: 1, time: '10:00 AM', title: 'Festival Gates Open', venue: 'Main Entrance', type: 'info', status: 'completed' },
      { id: 2, time: '2:00 PM', title: 'Traditional Welcome Ceremony', venue: 'Main Stage', type: 'culture', status: 'completed', featured: true },
      { id: 3, time: '4:00 PM', title: 'Naga Folk Orchestra', venue: 'Folk Stage', type: 'music', status: 'live' },
      { id: 4, time: '6:00 PM', title: 'Opening Night Gala', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 5, time: '8:30 PM', title: 'Tribal Dance Showcase', venue: 'Cultural Arena', type: 'culture', status: 'upcoming' }
    ],
    2: [
      { id: 6, time: '11:00 AM', title: 'Morning Meditation with Nature Sounds', venue: 'Zen Garden', type: 'wellness', status: 'upcoming' },
      { id: 7, time: '1:00 PM', title: 'Rock Fusion Concert', venue: 'Rock Arena', type: 'music', status: 'upcoming', featured: true },
      { id: 8, time: '3:30 PM', title: 'Traditional Instrument Workshop', venue: 'Workshop Hall', type: 'workshop', status: 'upcoming' },
      { id: 9, time: '6:00 PM', title: 'International Artist Showcase', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 10, time: '9:00 PM', title: 'Night Market & Food Festival', venue: 'Food Court', type: 'food', status: 'upcoming' }
    ],
    3: [
      { id: 11, time: '10:30 AM', title: 'Youth Band Competition', venue: 'Youth Stage', type: 'competition', status: 'upcoming' },
      { id: 12, time: '2:00 PM', title: 'Folk Fusion Collaborative Session', venue: 'Folk Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 13, time: '4:30 PM', title: 'Storytelling Circle', venue: 'Cultural Tent', type: 'culture', status: 'upcoming' },
      { id: 14, time: '7:00 PM', title: 'Headliner Concert Night', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 15, time: '10:00 PM', title: 'Acoustic Campfire Sessions', venue: 'Campfire Area', type: 'music', status: 'upcoming' }
    ],
    4: [
      { id: 16, time: '12:00 PM', title: 'Cultural Documentary Screening', venue: 'Cinema Tent', type: 'film', status: 'upcoming' },
      { id: 17, time: '2:30 PM', title: 'Battle of the Bands', venue: 'Competition Stage', type: 'competition', status: 'upcoming', featured: true },
      { id: 18, time: '5:00 PM', title: 'Traditional Cuisine Masterclass', venue: 'Culinary Stage', type: 'workshop', status: 'upcoming' },
      { id: 19, time: '7:30 PM', title: 'Gospel & Spiritual Music Night', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 20, time: '9:30 PM', title: 'Silent Disco Under the Stars', venue: 'Open Field', type: 'music', status: 'upcoming' }
    ],
    5: [
      { id: 21, time: '11:00 AM', title: 'Poetry & Spoken Word', venue: 'Literary Stage', type: 'culture', status: 'upcoming' },
      { id: 22, time: '3:00 PM', title: 'Electronic Music Showcase', venue: 'Electronic Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 23, time: '6:00 PM', title: 'Traditional Craft Workshop', venue: 'Craft Hall', type: 'workshop', status: 'upcoming' },
      { id: 24, time: '8:00 PM', title: 'Jazz & Blues Night', venue: 'Jazz Lounge', type: 'music', status: 'upcoming', featured: true },
      { id: 25, time: '10:30 PM', title: 'Midnight Jam Session', venue: 'Open Mic Stage', type: 'music', status: 'upcoming' }
    ],
    6: [
      { id: 26, time: '9:00 AM', title: 'Sunrise Yoga Session', venue: 'Wellness Area', type: 'wellness', status: 'upcoming' },
      { id: 27, time: '1:00 PM', title: 'Hip Hop & Urban Music', venue: 'Urban Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 28, time: '4:00 PM', title: 'Children\'s Cultural Program', venue: 'Kids Zone', type: 'culture', status: 'upcoming' },
      { id: 29, time: '7:00 PM', title: 'International Dance Festival', venue: 'Main Stage', type: 'culture', status: 'upcoming', featured: true },
      { id: 30, time: '9:45 PM', title: 'Late Night Comedy Show', venue: 'Comedy Tent', type: 'entertainment', status: 'upcoming' }
    ],
    7: [
      { id: 31, time: '10:00 AM', title: 'Photography Workshop', venue: 'Media Center', type: 'workshop', status: 'upcoming' },
      { id: 32, time: '2:30 PM', title: 'Classical Music Concert', venue: 'Concert Hall', type: 'music', status: 'upcoming', featured: true },
      { id: 33, time: '5:30 PM', title: 'Fashion & Cultural Dress Show', venue: 'Fashion Stage', type: 'culture', status: 'upcoming' },
      { id: 34, time: '8:00 PM', title: 'Rock Legends Tribute Night', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 35, time: '11:00 PM', title: 'Bonfire Stories & Songs', venue: 'Bonfire Area', type: 'culture', status: 'upcoming' }
    ],
    8: [
      { id: 36, time: '11:30 AM', title: 'Wellness & Meditation Workshop', venue: 'Zen Garden', type: 'wellness', status: 'upcoming' },
      { id: 37, time: '3:00 PM', title: 'Folk Music Marathon', venue: 'Folk Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 38, time: '6:30 PM', title: 'Cultural Exchange Program', venue: 'Cultural Center', type: 'culture', status: 'upcoming' },
      { id: 39, time: '8:30 PM', title: 'World Music Fusion Night', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 40, time: '10:15 PM', title: 'Acoustic Singer-Songwriter Circle', venue: 'Intimate Stage', type: 'music', status: 'upcoming' }
    ],
    9: [
      { id: 41, time: '12:00 PM', title: 'Art & Craft Exhibition Opening', venue: 'Art Gallery', type: 'culture', status: 'upcoming' },
      { id: 42, time: '3:30 PM', title: 'Battle of Genres Music Competition', venue: 'Competition Stage', type: 'competition', status: 'upcoming', featured: true },
      { id: 43, time: '6:00 PM', title: 'Community Feast Preparation', venue: 'Community Kitchen', type: 'food', status: 'upcoming' },
      { id: 44, time: '8:00 PM', title: 'Grand Musical Collaboration', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 45, time: '10:30 PM', title: 'Night Market Extended Hours', venue: 'Market Area', type: 'food', status: 'upcoming' }
    ],
    10: [
      { id: 46, time: '11:00 AM', title: 'Final Rehearsals', venue: 'All Stages', type: 'info', status: 'upcoming' },
      { id: 47, time: '3:00 PM', title: 'Unity Concert - All Tribes Together', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 48, time: '6:00 PM', title: 'Award Ceremony', venue: 'Main Stage', type: 'ceremony', status: 'upcoming' },
      { id: 49, time: '8:00 PM', title: 'Grand Finale Celebration', venue: 'Main Stage', type: 'music', status: 'upcoming', featured: true },
      { id: 50, time: '10:30 PM', title: 'Closing Ceremony & Fireworks', venue: 'Main Stage', type: 'ceremony', status: 'upcoming', featured: true }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'upcoming': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'music': return 'bg-pink-500/20 text-pink-400';
      case 'culture': return 'bg-purple-500/20 text-purple-400';
      case 'workshop': return 'bg-orange-500/20 text-orange-400';
      case 'competition': return 'bg-yellow-500/20 text-yellow-400';
      case 'food': return 'bg-green-500/20 text-green-400';
      case 'wellness': return 'bg-teal-500/20 text-teal-400';
      case 'film': return 'bg-indigo-500/20 text-indigo-400';
      case 'ceremony': return 'bg-red-500/20 text-red-400';
      case 'entertainment': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div 
            ref={heroRef}
            className={`festival-bg rounded-3xl p-8 md:p-16 text-center mb-12 tribal-pattern transition-all duration-700 ${
              heroVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <h1 className="font-righteous text-4xl md:text-6xl mb-4">
              <span className="festival-title neon-text">Festival Schedule</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Complete festival program and event timeline
            </p>
            <div className="text-lg text-neon-purple font-medium">
              📅 10 Days of Music, Culture & Celebration
            </div>
          </div>

          {/* Mobile-Optimized Day Filter */}
          <div 
            ref={filtersRef}
            className={`mb-12 transition-all duration-700 ${
              filtersVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Mobile: Horizontal scroll with very compact buttons */}
            <div className="md:hidden">
              <div className="flex gap-1.5 overflow-x-auto pb-4 px-1 hide-scrollbar">
                {days.map((day, index) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`flex-shrink-0 px-2.5 py-1.5 rounded-md font-medium transition-all duration-300 min-w-[60px] touch-target text-xs ${
                      selectedDay === day.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white neon-glow-pink'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    } ${filtersVisible ? 'animate-fade-in' : ''}`}
                    style={{
                      animationDelay: filtersVisible ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    <div className="text-xs font-semibold leading-tight">{day.day}</div>
                    <div className="text-[9px] opacity-75 leading-tight">{day.date.replace(', 2024', '').replace('Dec ', '')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Single row with flex wrap */}
            <div className="hidden md:flex md:flex-wrap md:gap-4 md:justify-center">
              {days.map((day, index) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedDay === day.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white neon-glow-pink'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  } ${filtersVisible ? 'animate-fade-in' : ''}`}
                  style={{
                    animationDelay: filtersVisible ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="text-sm font-semibold">{day.day}</div>
                  <div className="text-xs opacity-75">{day.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Grid */}
          <div 
            ref={scheduleRef}
            className={`space-y-6 transition-all duration-1000 ${
              scheduleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            {scheduleData[selectedDay as keyof typeof scheduleData]?.map((event, index) => (
              <Card 
                key={event.id} 
                className={`festival-card overflow-hidden transition-all duration-700 ${
                  event.featured ? 'ring-2 ring-pink-500/30' : ''
                } ${event.status === 'live' ? 'neon-glow-pink' : ''} ${
                  scheduleVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}
                style={{
                  animationDelay: scheduleVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-3">
                        <div className="flex items-center text-gray-400">
                          <Clock size={16} className="mr-2 text-pink-400" />
                          <span className="font-medium text-lg">{event.time}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)} flex-shrink-0`}>
                            {event.status === 'live' && <span className="animate-pulse mr-1">🔴</span>}
                            {event.status.toUpperCase()}
                          </span>
                          {event.featured && (
                            <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex-shrink-0">
                              <Star size={10} className="mr-1 fill-current" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-righteous text-lg md:text-2xl mb-2 text-white group-hover:text-pink-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-400">
                        <div className="flex items-center min-w-0">
                          <MapPin size={14} className="mr-1 text-pink-400 flex-shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
