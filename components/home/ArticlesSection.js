import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity';

export default function ArticlesSection({ data }) {
  const swiperRef = useRef(null);
  
  // Default articles if none are provided
  const articles = data || [
    {
      title: 'How to Build a Professional Network While in College',
      excerpt: 'Learn effective strategies for building a professional network that will serve you well after graduation.',
      mainImage: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1147&q=80',
      author: 'Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
      publishedAt: '2024-06-15T00:00:00Z',
      slug: { current: 'how-to-build-network' }
    },
    {
      title: 'The Top Skills Employers Are Looking For in 2024',
      excerpt: 'Discover the most in-demand skills in today\'s job market and how you can develop them.',
      mainImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      author: 'Michael Brown',
      authorImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      publishedAt: '2024-05-28T00:00:00Z',
      slug: { current: 'top-skills-employers' }
    },
    {
      title: 'How to Balance Academics and Career Development',
      excerpt: 'Practical tips for managing your coursework while also building your professional skills and experience.',
      mainImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1106&q=80',
      author: 'John Smith',
      authorImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      publishedAt: '2024-05-10T00:00:00Z',
      slug: { current: 'balancing-academics-career' }
    },
    {
      title: 'Leveraging Student Organizations for Career Growth',
      excerpt: 'How to make the most of your involvement in student organizations to enhance your professional development.',
      mainImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      author: 'Jane Doe',
      authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      publishedAt: '2024-04-22T00:00:00Z',
      slug: { current: 'leveraging-student-organizations' }
    }
  ];
  
  // Initialize Swiper when component mounts
  useEffect(() => {
    let swiperInstance = null;
    
    const initSwiper = () => {
      if (typeof window !== 'undefined' && window.Swiper && !swiperInstance) {
        swiperInstance = new window.Swiper('.article-carousel', {
          slidesPerView: 'auto',
          spaceBetween: 20,
          centeredSlides: false,
          loop: false,
          pagination: {
            el: '.article-carousel .swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
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
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <section id="articles" className="py-16 section-gradient-4 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">Artikel Terbaru</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">Latest Articles</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Wawasan, cerita, dan sumber daya untuk membantu Anda dalam perjalanan karir.
          </p>
        </div>
        
        {/* Articles carousel */}
        <div className="article-carousel-container fade-up">
          <div className="swiper article-carousel">
            <div className="swiper-wrapper pb-10">
              {articles.map((article, index) => {
                // Process image URLs if they're Sanity images
                const imageUrl = article.mainImage && article.mainImage._type === 'image' 
                  ? urlFor(article.mainImage).url()
                  : article.mainImage;
                
                const authorImageUrl = article.authorImage && article.authorImage._type === 'image' 
                  ? urlFor(article.authorImage).url()
                  : article.authorImage;
                
                // Format date
                const formattedDate = formatDate(article.publishedAt);
                
                return (
                  <div key={index} className="swiper-slide">
                    <div className="article-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20">
                      <div className="article-img-container">
                        <Image
                          src={imageUrl}
                          alt="Article thumbnail"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                          className="object-cover"
                        />
                      </div>
                      <div className="article-content p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={authorImageUrl}
                              alt={article.author}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-apple-darkgray dark:text-white">{article.author}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">{formattedDate}</p>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold heading-apple mb-3 text-apple-darkgray dark:text-white">{article.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="mt-auto">
                          <Link 
                            href={`/articles/${article.slug.current}`}
                            className="text-blue-500 dark:text-blue-300 font-medium inline-flex items-center"
                          >
                            Read Article
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </Link>
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
        
        {/* View all articles button */}
        <div className="text-center mt-10">
          <Link 
            href="/articles"
            className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-full shadow-lg transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
