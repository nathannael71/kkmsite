import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { getArticles, getArticleCount, getCategories, getSiteSettings } from '../../lib/api';
import { urlFor } from '../../lib/sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ARTICLES_PER_PAGE = 8;

export default function ArticlesPage({ articles, categories, totalArticles, currentPage, settings }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Layout settings={settings}>
      <Head>
        <title>Articles | Karir dan Karya Mahasiswa BEM KM UNY</title>
        <meta name="description" content="Explore articles about career development, creative opportunities, and student life at UNY." />
      </Head>
      
      <main>
        {/* Articles header section */}
        <section className="pt-32 pb-16 section-gradient-1">
          <div className="main-container">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6">Articles</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Insights, stories, and resources to help you on your career journey.
              </p>
            </div>
            
            {/* Categories filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-apple ${selectedCategory === null ? 'bg-apple-blue text-white' : 'bg-white/20 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-white/30 dark:hover:bg-white/20'}`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-apple ${selectedCategory === category.slug.current ? 'bg-apple-blue text-white' : 'bg-white/20 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-white/30 dark:hover:bg-white/20'}`}
                  onClick={() => setSelectedCategory(category.slug.current)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            
            {/* Articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                  <div key={index} className="article-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20">
                    <div className="article-img-container">
                      <Image
                        src={imageUrl}
                        alt="Article thumbnail"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                );
              })}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center">
                <Link 
                  href={`/articles?page=${Math.max(1, currentPage - 1)}`}
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
                    href={`/articles?page=${i + 1}`}
                    className={`px-4 py-2 border-t border-b border-gray-300 dark:border-gray-700 ${currentPage === i + 1 ? 'bg-apple-blue text-white' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    {i + 1}
                  </Link>
                ))}
                
                <Link 
                  href={`/articles?page=${Math.min(totalPages, currentPage + 1)}`}
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

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page || '1');
  const category = query.category || null;
  const offset = (page - 1) * ARTICLES_PER_PAGE;
  
  // Fetch articles with pagination
  const articles = await getArticles({ 
    limit: ARTICLES_PER_PAGE, 
    offset, 
    category 
  });
  
  // Get total count for pagination
  const totalArticles = await getArticleCount(category);
  
  // Get categories for filter
  const categories = await getCategories();
  
  // Get site settings
  const settings = await getSiteSettings();
  
  return {
    props: {
      articles,
      categories,
      totalArticles,
      currentPage: page,
      settings: settings || null
    }
  };
}
