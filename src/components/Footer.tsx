
import React from 'react';
import { Heart, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur-md border-t border-border/50 mt-auto">
      <div className="mobile-container py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Festival Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Music className="h-6 w-6 text-neon-pink" />
              <h3 className="text-lg font-semibold">Hornbill Music Festival</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Celebrating Nagaland's rich musical heritage and empowering local artists since the grand Hornbill Festival.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/events" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Events
              </a>
              <a href="/artists" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Artists
              </a>
              <a href="/auditions" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Auditions
              </a>
              <a href="/about" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                About
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Nagaland, India</p>
              <p>info@hornbillmusicfest.com</p>
              <p className="text-xs mt-4">
                Follow us for updates and announcements
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-neon-pink" />
              <span>by TaFMA</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hornbill Music Festival. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Safe Area */}
      <div className="h-safe-area-inset-bottom md:hidden"></div>
    </footer>
  );
};

export default Footer;
