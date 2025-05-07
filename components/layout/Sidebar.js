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
        id="sidebar-overlay" 
        className={`sidebar-overlay ${open ? 'active' : ''}`}
      ></div>

      {/* Mobile sidebar menu */}
      <div 
        ref={sidebar}
        id="sidebar-menu" 
        className={`glassmorphism ${open ? 'translate-x-0' : ''}`}
      >
        {/* Close button (X) */}
        <button 
          id="sidebar-close" 
          className="close-btn"
          onClick={closeSidebar}
          aria-label="Close Menu"
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
            >
              <div className="menu-icon">
                <FontAwesomeIcon icon={getIcon(item.icon)} />
              </div>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        
        {/* Dark mode toggle */}
        <div id="darkmode-toggle-container">
          <div className="menu-icon" style={{ backgroundColor: '#F4A83A' }}>
            <FontAwesomeIcon icon={faSun} />
          </div>
          <span className="font-semibold heading-apple">Dark Mode</span>
          <button 
            ref={darkmodeToggle}
            id="darkmode-toggle" 
            className="ml-auto w-12 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center transition-apple p-1"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            <div id="darkmode-toggle-circle" className="w-5 h-5 bg-white rounded-full shadow-md transform dark:translate-x-5 transition-apple flex justify-center items-center">
              <FontAwesomeIcon icon={faSun} className="text-yellow-500 dark:hidden text-xs" />
              <FontAwesomeIcon icon={faMoon} className="text-blue-300 hidden dark:block text-xs" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
