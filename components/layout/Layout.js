import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout({ children, settings }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    
    // Toggle body overflow untuk mencegah scroll saat sidebar terbuka
    if (!sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
  };

  // Pastikan sidebar tertutup saat ganti halaman
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Initialize animations when component mounts
  useEffect(() => {
    const initializeAnimations = () => {
      if (typeof window !== 'undefined' && window.gsap) {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Fade up animations
        const fadeUpElements = document.querySelectorAll('.fade-up');
        fadeUpElements.forEach(element => {
          gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      } else {
        // Fallback for when GSAP isn't available
        document.querySelectorAll('.fade-up, .slide-in-right, .slide-in-left').forEach(el => {
          el.style.opacity = 1;
          el.style.transform = 'none';
        });
        
        console.warn('GSAP not available, animations disabled');
      }
    };

    // Initialize animations after a short delay to ensure scripts are loaded
    const timer = setTimeout(() => {
      initializeAnimations();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header settings={settings} toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} settings={settings} closeSidebar={closeSidebar} />
      {children}
      <Footer settings={settings} />
    </>
  );
}
