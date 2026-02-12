import React from 'react';
import type { Page } from '../types';

interface LogoProps {
  onNavigate: (page: Page, subPage?: string) => void;
  className?: string;
}

const logoStyle = {
  width: '180px',
  height: 'auto'
};

const Logo: React.FC<LogoProps> = ({ onNavigate, className }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate('home');
      }}
      className={`flex items-center space-x-3 group ${className}`}
      aria-label="Volver a la página de inicio"
    >
      {/* Imagen del logo desde /public/images */}
      <div className="h-30 w-30 flex-shrink-0">
        <img
          src="https://www.triskeledu.cl/images/LOGO-CIPRESS-2.png"
          alt="Logo Cipress"
          style={logoStyle}
        />
      </div>

      {/* Wordmark */}
    </a>
  );
};

export default Logo;
