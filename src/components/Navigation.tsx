
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Mic, MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Artists', href: '/artists', icon: Users },
    { name: 'Pre-Ticket', href: '/audition', icon: Mic },
    { name: 'About', href: '/about', icon: MapPin },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="font-righteous text-xl festival-title">TaFMA</h1>
                <p className="text-xs text-gray-400">Hornbill Music Festival</p>
              </div>
            </Link>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-pink-500/10 hover:text-pink-400 ${
                    location.pathname === item.href
                      ? 'text-pink-400 bg-pink-500/10'
                      : 'text-gray-300'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button className="btn-festival">
                🎟️ Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <h1 className="font-righteous text-lg festival-title">TaFMA</h1>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 hover:text-pink-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.href
                      ? 'text-pink-400 bg-pink-500/10'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="pt-4">
                <Button className="btn-festival w-full">
                  🎟️ Book Tickets
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav md:hidden">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
              location.pathname === item.href
                ? 'text-pink-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navigation;
