import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope 
} from '@fortawesome/free-regular-svg-icons';
import { urlFor } from '../../lib/sanity';

export default function TeamSection({ data }) {
  const swiperRef = useRef(null);
  
  // Default team members if none are provided
  const teamMembers = data || [
    {
      name: 'Jane Doe',
      position: 'Head of Department',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      instagram: '#',
      email: 'jane@example.com',
      linkedin: '#'
    },
    {
      name: 'John Smith',
      position: 'Vice Head of Department',
      photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      instagram: '#',
      email: 'john@example.com',
      linkedin: '#'
    },
    {
      name: 'Sarah Johnson',
      position: 'Creative Director',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
      instagram: '#',
      email: 'sarah@example.com',
      linkedin: '#'
    },
    {
      name: 'Michael Brown',
      position: 'Event Coordinator',
      photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      instagram: '#',
      email: 'michael@example.com',
      linkedin: '#'
    },
    {
      name: 'Emma Wilson',
      position: 'Marketing Specialist',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      instagram: '#',
      email: 'emma@example.com',
      linkedin: '#'
    },
    {
      name: 'David Chen',
      position: 'Content Creator',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      instagram: '#',
      email: 'david@example.com',
      linkedin: '#'
    }
  ];
  
  // Initialize Swiper when component mounts
  useEffect(() => {
    let swiperInstance = null;
    
    const initSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper && !swiperInstance) {
        swiperInstance = new window.Swiper('.team-carousel', {
          slidesPerView: 'auto',
          spaceBetween: 20,
          centeredSlides: false,
          loop: false,
          pagination: {
            el: '.team-carousel .swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 3,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 4,
              centeredSlides: false,
            },
          },
        });
        
        swiperRef.current = swiperInstance;
      }
    };
    
    // Initialize with a delay to ensure Swiper JS is loaded
    const timer = setTimeout(() => {
      initSwiper();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);
  
  // Add social buttons toggle functionality
  useEffect(() => {
    const teamButtons = document.querySelectorAll('.team-card .team-btn');
    
    const handleButtonClick = (e) => {
      const teamCard = e.currentTarget.closest('.team-card');
      
      // First close all other team cards
      document.querySelectorAll('.team-card.active').forEach(card => {
        if (card !== teamCard) {
          card.classList.remove('active');
        }
      });
      
      // Then toggle the current team card
      teamCard.classList.toggle('active');
    };
    
    teamButtons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });
    
    // Close team social buttons when clicking elsewhere
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.team-card')) {
        document.querySelectorAll('.team-card.active').forEach(card => {
          card.classList.remove('active');
        });
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      teamButtons.forEach(button => {
        button.removeEventListener('click', handleButtonClick);
      });
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <section id="team" className="py-16 section-gradient-3 gradient-section overflow-hidden">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">Tim Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">Meet With Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Tim mahasiswa kami yang berdedikasi untuk membantu sesama tumbuh dan berkembang dalam meraih cita-cita mereka.
          </p>
        </div>
        
        {/* Team carousel */}
        <div className="carousel-container fade-up">
          <div className="swiper team-carousel">
            <div className="swiper-wrapper pb-10">
              {teamMembers.map((member, index) => {
                // Process image URL if it's a Sanity image
                const photoUrl = member.photo && member.photo._type === 'image' 
                  ? urlFor(member.photo).url()
                  : member.photo;
                
                return (
                  <div key={index} className="swiper-slide">
                    <div className="team-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple h-full border border-white/20 relative">
                      <div className="relative overflow-hidden">
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          width={280}
                          height={280}
                          className="w-full aspect-square object-cover img-zoom"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold heading-apple mb-1 text-apple-darkgray dark:text-white">{member.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.position}</p>
                        <button className="team-btn w-full py-2 bg-apple-blue text-white rounded-full btn-apple transition-apple">
                          Get in Touch
                        </button>
                        <div className="team-social-buttons">
                          {member.instagram && (
                            <a href={member.instagram} className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faInstagram} className="text-white" />
                            </a>
                          )}
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Add pagination */}
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
