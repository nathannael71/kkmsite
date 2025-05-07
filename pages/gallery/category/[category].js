import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import { getGalleryItems, getGalleryItemCount, getCategories, getSiteSettings } from '../../../lib/api';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ITEMS_PER_PAGE = 12;

export default function CategoryPage({ galleryItems, categories, totalItems, currentPage, currentCategory, settings }) {
  const router = useRouter();
  const [categoryTitle, setCategoryTitle] = useState('');
  
  // Find the current category title
  useEffect(() => {
    if (categories) {
      const category = categories.find(cat => cat.slug.current === currentCategory);
      setCategoryTitle(category?.title || 'Category');
    }
  }, [categories, currentCategory]);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Switch category handler
  const handleCategoryChange = (categorySlug) => {
    router.push(`/gallery/category/${categorySlug}`);
  };

  return (
    <Layout settings={settings}>
      <Head>
        <title>{categoryTitle} Gallery | Karir dan Karya Mahasiswa BEM KM UNY</title>
        <meta name="description" content={`Gallery items in the ${categoryTitle} category from Karir dan Karya Mahasiswa BEM KM UNY.`} />
      </Head>
      
      <main>
        {/* Category header section */}
        <section className="pt-32 pb-16 section-gradient-1">
          <div className="main-container">
            <div className="text-center mb-16">
              <Link 
                href="/gallery"
                className="inline-flex items-center text-apple-blue dark:text-blue-300 mb-4 hover:underline"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Back to All Gallery
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6">
                {categoryTitle}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Browse all gallery items in the {categoryTitle} category.
              </p>
            </div>
            
            {/* Categories filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link 
                href="/gallery"
                className="px-4 py-2 rounded-full text-sm font-medium transition-apple bg-white/20 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-white/30 dark:hover:bg-white/20"
              >
                All
              </Link>
              
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-apple ${currentCategory === category.slug.current ? 'bg-apple-blue text-white' : 'bg-white/20 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-white/30 dark:hover:bg-white/20'}`}
                  onClick={() => handleCategoryChange(category.slug.current)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            
            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryItems.map((item, index) => {
                // Process image URL if it's a Sanity image
                const imageUrl = item.image && item.image._type === 'image' 
                  ? urlFor(item.image).url()
                  : item.image;
                
                return (
                  <Link 
                    key={index} 
                    href={`/gallery/${item.slug.current}`}
                    className="block bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20 hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold heading-apple mb-1 text-apple-darkgray dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{item.date}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center">
                <Link 
                  href={`/gallery/category/${currentCategory}?page=${Math.max(1, currentPage - 1)}`}
                  className={`p-2 rounded-l-lg border border-gray-300 dark:border-gray-700 ${currentPage === 1 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-400 dark:text-gray-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
                </Link>
                
                {/* Page numbers */}
                {[...Array(totalPages)].map((_, i) => (
                  <Link 
                    key={i}
                    href={`/gallery/category/${currentCategory}?page=${i + 1}`}
                    className={`px-4 py-2 border-t border-b border-gray-300 dark:border-gray-700 ${currentPage === i + 1 ? 'bg-apple-blue text-white' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    {i + 1}
                  </Link>
                ))}
                
                <Link 
                  href={`/gallery/category/${currentCategory}?page=${Math.min(totalPages, currentPage + 1)}`}
                  className={`p-2 rounded-r-lg border border-gray-300 dark:border-gray-700 ${currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-400 dark:text-gray-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                >
                  <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ params, query }) {
  const { category } = params;
  const page = parseInt(query.page || '1');
  const offset = (page - 1) * ITEMS_PER_PAGE;
  
  // Fetch gallery items with pagination and category filter
  const galleryItems = await getGalleryItems({ 
    limit: ITEMS_PER_PAGE, 
    offset, 
    category 
  });
  
  // Get total count for pagination
  const totalItems = await getGalleryItemCount(category);
  
  // Get categories for filter
  const categories = await getCategories();
  
  // Get site settings
  const settings = await getSiteSettings();
  
  return {
    props: {
      galleryItems,
      categories,
      totalItems,
      currentPage: page,
      currentCategory: category,
      settings: settings || null
    }
  };
}
