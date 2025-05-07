import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity';

export default function GallerySection({ data }) {
  const swiperRef = useRef(null);
  
  // Default gallery items if none are provided
  const galleryItems = data || [
    {
      title: 'Workshop: Resume Building',
      date: 'March 2024',
      image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: { current: 'workshop-resume-building' }
    },
    {
      title: 'Company Visit: Tech Startup',
      date: 'February 2024',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: { current: 'company-visit-tech-startup' }
    },
    {
      title: 'Career Fair 2024',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: { current: 'career-fair-2024' }
    },
    {
      title: 'Networking Night',
      date: 'December 2023',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: { current: 'networking-night' }
    },
    {
      title: 'Panel Discussion: Future of Work',
      date: 'November 2023',
      image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: { current: 'panel-discussion-future-of-work' }
    },
    {
      title: 'Student Work Exhibition',
      date: 'October 2023',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80',
      slug: { current: 'student-work-exhibition' }
    }
  ];
  
  // Initialize Swiper when component mounts
  useEffect(() => {
    let swiperInstance = null;
    
    const initSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper && !swiperInstance) {
        swiperInstance = new window.Swiper('.album-carousel', {
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
          loopedSlides: 3,
          speed: 800,
          effect: 'slide',
          grabCursor: true,
          pagination: {
            el: '.album-carousel .swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 'auto',
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

  return (
    <section id="gallery" className="py-16 section-gradient-1 gradient-section overflow-hidden">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">Galeri Kegiatan</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">Our Activity Gallery</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Dokumentasi kegiatan dan acara kami yang telah membantu mahasiswa tumbuh dan berkembang.
          </p>
        </div>
        
        {/* Album carousel */}
        <div className="album-carousel-container fade-up">
          <div className="swiper album-carousel">
            <div className="swiper-wrapper pb-10">
              {galleryItems.map((item, index) => {
                // Process image URL if it's a Sanity image
                const imageUrl = item.image && item.image._type === 'image' 
                  ? urlFor(item.image).url()
                  : item.image;
                
                return (
                  <div key={index} className="swiper-slide">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                      <div className="gallery-img-container">
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 75vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-white text-xl font-bold heading-apple">{item.title}</h3>
                          <p className="text-white/80 text-sm mt-2">{item.date}</p>
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
        
        {/* View all button */}
        <div className="text-center mt-12">
          <Link 
            href="/gallery"
            className="px-8 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-full transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20 fade-up"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
