import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Camera } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-muted shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Camera className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-text">AnimalSnap</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#search" className="text-text hover:text-primary transition-colors">Search</a>
            <a href="#pricing" className="text-text hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="text-text hover:text-primary transition-colors">About</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;