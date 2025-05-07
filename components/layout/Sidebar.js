import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle, 
  faBox, 
  faUsers, 
  faCalendarAlt, 
  faImages, 
  faEnvelope, 
  faMapMarkerAlt,
  faTimes,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ open, settings, closeSidebar }) {
  const sidebar = useRef(null);
  const overlay = useRef(null);
  const darkmodeToggle = useRef(null);
  
  // CSS styling yang benar - pastikan sidebar tersembunyi secara default
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: 0, // Sidebar muncul dari kanan
    width: '270px',
    maxWidth: '80%',
    height: '100vh',
    transform: open ? 'translateX(0)' : 'translateX(100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 50,
    transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
    padding: '1.5rem',
    overflowY: 'auto'
  };
  
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
    zIndex: 39
  };
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (open && overlay.current && overlay.current.contains(e.target)) {
        closeSidebar();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, closeSidebar]);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };
  
  // Get menu items from settings or use defaults
  const menuItems = settings?.header?.menuItems || [
    { label: 'Home', url: '#home', icon: 'fa-home' },
    { label: 'About', url: '#about', icon: 'fa-info-circle' },
    { label: 'Program', url: '#programs', icon: 'fa-box' },
    { label: 'Team', url: '#team', icon: 'fa-users' },
    { label: 'Timeline', url: '#timeline', icon: 'fa-calendar-alt' },
    { label: 'Gallery', url: '#gallery', icon: 'fa-images' },
    { label: 'Contact', url: '#contact', icon: 'fa-envelope' },
    { label: 'Location', url: '#location', icon: 'fa-map-marker-alt' }
  ];
  
  // Handle icon mapping from string to FontAwesome component
  const getIcon = (iconName) => {
    const iconMap = {
      'fa-home': faHome,
      'fa-info-circle': faInfoCircle,
      'fa-box': faBox,
      'fa-users': faUsers,
      'fa-calendar-alt': faCalendarAlt,
      'fa-images': faImages,
      'fa-envelope': faEnvelope,
      'fa-map-marker-alt': faMapMarkerAlt
    };
    
    return iconMap[iconName] || faHome;
  };

  return (
    <>
      {/* Sidebar overlay */}
      <div 
        ref={overlay}
        style={overlayStyle}
        onClick={closeSidebar}
      ></div>

      {/* Mobile sidebar menu - gunakan inline styles untuk memastikan style bekerja */}
      <div 
        ref={sidebar}
        style={sidebarStyle}
      >
        {/* Close button (X) */}
        <button 
          className="close-btn"
          onClick={closeSidebar}
          aria-label="Close Menu"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            color: 'white',
            transition: 'all 0.3s ease'
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        {/* Sidebar header */}
        <div className="sidebar-header">
          <h3 className="text-lg font-semibold heading-apple text-black dark:text-white">Menu</h3>
        </div>
        
        {/* Menu links */}
        <div className="menu-links">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.url} 
              className="font-semibold heading-apple hover:text-apple-blue transition-apple"
              onClick={closeSidebar}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white'
              }}
            >
              <div className="menu-icon" style={{
                backgroundColor: '#2871e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}>
                <FontAwesomeIcon icon={getIcon(item.icon)} />
              </div>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        
        {/* Dark mode toggle */}
        <div id="darkmode-toggle-container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(60, 60, 67, 0.5)',
          padding: '10px 12px',
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <div className="menu-icon" style={{ backgroundColor: '#F4A83A', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', color: 'white' }}>
            <FontAwesomeIcon icon={faSun} />
          </div>
          <span className="font-semibold heading-apple" style={{color: 'white'}}>Dark Mode</span>
          <button 
            ref={darkmodeToggle}
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            style={{
              marginLeft: 'auto',
              width: '48px',
              height: '28px',
              borderRadius: '9999px',
              background: 'rgba(120, 120, 128, 0.5)',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              background: 'white',
              borderRadius: '9999px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              transform: document.documentElement.classList.contains('dark') ? 'translateX(20px)' : 'translateX(0)',
              transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FontAwesomeIcon icon={document.documentElement.classList.contains('dark') ? faMoon : faSun} style={{color: document.documentElement.classList.contains('dark') ? '#5d8af5' : '#f6ad37', fontSize: '12px'}} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
