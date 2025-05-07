import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ settings, toggleSidebar }) {
  const [scrolled, setScrolled] = useState(false);
  
  // Update header class on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Update header class based on dark mode
  useEffect(() => {
    const updateHeaderClass = () => {
      const header = document.querySelector('header');
      if (!header) return;
      
      if (document.documentElement.classList.contains('dark')) {
        header.classList.remove('light');
        header.classList.add('dark');
      } else {
        header.classList.remove('dark');
        header.classList.add('light');
      }
    };
    
    updateHeaderClass();
    
    // Listen for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateHeaderClass();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-apple glassmorphism light border-b border-gray-200 dark:border-gray-800 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <div className="flex items-center">
            <div className="flex space-x-2 mr-4">
              {settings?.logo ? (
                <Image
                  src={settings.logo}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <>
                  {/* Placeholders when no logo is available */}
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">UNY</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">BEM</span>
                  </div>
                </>
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold heading-apple hidden sm:block">
                {settings?.header?.title || 'KARIR DAN KARYA MAHASISWA'}
              </h1>
              <h1 className="text-lg font-bold heading-apple sm:hidden">
                {settings?.header?.title || 'KARIR DAN KARYA MAHASISWA'}
              </h1>
              <p className="text-xs text-apple-gray">
                {settings?.header?.subtitle || 'BEM KM Universitas Negeri Yogyakarta'}
              </p>
            </div>
          </div>

          {/* Menu toggle button - pastikan ini berfungsi dengan benar */}
          <button
            id="menu-toggle"
            className="p-2 focus:outline-none z-50"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="hamburger-line w-full h-0.5 bg-apple-darkgray dark:bg-white rounded-full line-1"></span>
              <span className="hamburger-line w-full h-0.5 bg-apple-darkgray dark:bg-white rounded-full line-2"></span>
              <span className="hamburger-line w-full h-0.5 bg-apple-darkgray dark:bg-white rounded-full line-3"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
