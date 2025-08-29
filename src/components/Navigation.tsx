import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Mic, Info, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Music },
    { name: 'Hornbill Festival', href: '/hornbill-music-festival', icon: Mountain },
    { name: 'Pre-Ticket to Hornbill', href: '/auditions', icon: Mic },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      {/* Desktop and Mobile Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-gray-700/50 md:bg-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-righteous text-white">TaFMA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'bg-primary/20 text-primary'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <Button className="btn-festival ml-4">
                Book Tickets
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg active:bg-gray-800/50 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black/98 backdrop-blur-md z-40 animate-fade-in">
            <div className="px-4 pt-6 pb-20 space-y-2 h-full overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 ${
                      location.pathname === item.href
                        ? 'bg-primary/20 text-primary shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="px-4 py-4">
                <Button className="btn-festival w-full py-4 text-lg font-semibold">
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-700/50 z-50 safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2 px-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg min-w-[60px] transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-400 hover:text-white active:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
