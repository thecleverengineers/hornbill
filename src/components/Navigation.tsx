
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Calendar, Users, Mic, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Music },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Artists', href: '/artists', icon: Users },
    { name: 'Pre-Ticket to Hornbill', href: '/auditions', icon: Mic },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile Status Bar Spacer */}
      <div className="status-bar-height bg-black md:hidden"></div>

      {/* Desktop and Mobile Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-gray-700/50 md:bg-black/90 safe-area-inset-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 haptic-light">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-righteous text-white no-select">TaFMA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 haptic-light ${
                      location.pathname === item.href
                        ? 'bg-primary/20 text-primary shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="no-select">{item.name}</span>
                  </Link>
                );
              })}
              <Button className="btn-festival ml-4 haptic-medium">
                Book Tickets
              </Button>
            </div>

            {/* Mobile menu button with native styling */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-3 rounded-xl active:bg-gray-800/50 transition-all duration-200 haptic-medium touch-target"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Native-style Mobile Slide-out Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black/98 backdrop-blur-xl z-40 animate-native-slide-up">
            <div className="px-4 pt-8 pb-20 space-y-3 h-full overflow-y-auto native-scroll">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`native-list-item text-lg font-medium haptic-medium ${
                      location.pathname === item.href
                        ? 'bg-primary/20 text-primary border-primary/30'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <Icon className="w-6 h-6 mr-4" />
                    <span className="no-select">{item.name}</span>
                  </Link>
                );
              })}
              <div className="px-4 py-6">
                <Button className="btn-festival w-full py-4 text-lg font-semibold haptic-heavy elevation-2">
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Native-style Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/98 backdrop-blur-xl border-t border-gray-700/50 z-50 bottom-safe-area">
        <div className="flex justify-around items-center py-2 px-2">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`mobile-nav-item ${
                  isActive
                    ? 'text-primary bg-primary/10 shadow-lg'
                    : 'text-gray-400 hover:text-white active:bg-gray-800/30'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-xs font-medium no-select truncate max-w-[60px] ${isActive ? 'text-primary' : ''}`}>
                  {item.name === 'Pre-Ticket to Hornbill' ? 'Auditions' : item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
