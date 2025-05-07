import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTwitter, 
  faLinkedin, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';

export default function Footer({ settings }) {
  // Get footer data from settings
  const footerData = settings?.footer || {};
  const contactInfo = settings?.contactInfo || {};
  
  // Social media icons mapping
  const socialIcons = {
    'fa-instagram': faInstagram,
    'fa-twitter': faTwitter,
    'fa-linkedin': faLinkedin,
    'fa-youtube': faYoutube
  };
  
  // Quick links from settings or defaults
  const quickLinks = footerData.quickLinks || [
    { label: 'Home', url: '#home' },
    { label: 'About Us', url: '#about' },
    { label: 'Programs', url: '#programs' },
    { label: 'Our Team', url: '#team' },
    { label: 'Articles', url: '#articles' },
    { label: 'Gallery', url: '#gallery' },
    { label: 'Contact', url: '#contact' }
  ];
  
  // Social media from settings or defaults
  const socialMedia = footerData.socialMedia || [
    { platform: 'Instagram', url: 'https://instagram.com/kkm.bemuny', icon: 'fa-instagram' },
    { platform: 'Twitter', url: '#', icon: 'fa-twitter' },
    { platform: 'LinkedIn', url: '#', icon: 'fa-linkedin' },
    { platform: 'YouTube', url: '#', icon: 'fa-youtube' }
  ];

  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="flex space-x-2 mr-4">
                {/* Placeholder for UNY logo */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">UNY</span>
                </div>
                {/* Placeholder for BEM KM logo */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">BEM</span>
                </div>
              </div>
              <h3 className="text-lg font-bold heading-apple">
                {settings?.header?.title || 'KARIR DAN KARYA MAHASISWA'}
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              {footerData.description || 'Dedicated to helping students at Universitas Negeri Yogyakarta develop their skills, showcase their talent, and prepare for their future careers.'}
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-apple"
                  aria-label={social.platform}
                >
                  <FontAwesomeIcon icon={socialIcons[social.icon] || faInstagram} className="text-xl" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-base font-bold heading-apple mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-white transition-apple"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="text-base font-bold heading-apple mb-5">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-apple-blue mt-1 mr-3" />
                <span className="text-gray-400">
                  {contactInfo.address || 'Student Center Building, Universitas Negeri Yogyakarta, Karangmalang, Yogyakarta'}
                </span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faEnvelope} className="text-apple-blue mt-1 mr-3" />
                <a 
                  href={`mailto:${contactInfo.email || 'kkmbemuny@gmail.com'}`} 
                  className="text-gray-400 hover:text-white transition-apple"
                >
                  {contactInfo.email || 'kkmbemuny@gmail.com'}
                </a>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faInstagram} className="text-apple-blue mt-1 mr-3" />
                <a 
                  href={contactInfo.instagramUrl || 'https://instagram.com/kkm.bemuny'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-apple"
                >
                  @{contactInfo.instagram || 'kkm.bemuny'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {footerData.copyright || '© 2025 Karir dan Karya Mahasiswa BEM KM UNY. All rights reserved.'}
          </p>
          <div className="flex space-x-6">
            <Link 
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-apple"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-apple"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
