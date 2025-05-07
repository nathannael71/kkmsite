import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Layout from '../../components/layout/Layout';
import { getArticleBySlug, getSiteSettings } from '../../lib/api';
import { urlFor } from '../../lib/sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';

// Portable Text components
const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Article image'}
            width={800}
            height={500}
            className="w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">{value.alt}</p>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-apple-blue dark:text-blue-300 hover:underline"
          target={!value.href.startsWith('/') ? '_blank' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default function ArticleDetail({ article, settings }) {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  
  // If article not found
  if (!article) {
    return (
      <Layout settings={settings}>
        <Head>
          <title>Article Not Found | Karir dan Karya Mahasiswa BEM KM UNY</title>
        </Head>
        <div className="pt-32 pb-20 section-gradient-1">
          <div className="main-container text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/articles"
              className="px-6 py-3 bg-apple-blue text-white rounded-full inline-flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Articles
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Process image URL if it's a Sanity image
  const imageUrl = article.mainImage && article.mainImage._type === 'image' 
    ? urlFor(article.mainImage).url()
    : article.mainImage;
    
  // Format date
  const formattedDate = formatDate(article.publishedAt);

  return (
    <Layout settings={settings}>
      <Head>
        <title>{article.title} | Karir dan Karya Mahasiswa BEM KM UNY</title>
        <meta name="description" content={article.excerpt || article.title} />
      </Head>
      
      <main>
        {/* Article header */}
        <section className="pt-32 section-gradient-1">
          <div className="main-container">
            <Link 
              href="/articles"
              className="inline-flex items-center text-apple-blue dark:text-blue-300 mb-6 hover:underline"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Articles
            </Link>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-apple-blue" />
                {article.author}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-apple-blue" />
                {formattedDate}
              </div>
              
              {article.categories && article.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/20 dark:bg-white/10 rounded-full text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Featured image */}
            {imageUrl && (
              <div className="rounded-xl overflow-hidden mb-12 w-full max-w-4xl mx-auto">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </section>
        
        {/* Article content */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="main-container">
            <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
              {article.body ? (
                <PortableText value={article.body} components={components} />
              ) : (
                <p>No content available for this article.</p>
              )}
            </div>
            
            {/* Back to articles button */}
            <div className="text-center mt-16">
              <Link 
                href="/articles"
                className="px-6 py-3 bg-apple-blue text-white rounded-full inline-flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Articles
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  
  // Fetch article by slug
  const article = await getArticleBySlug(slug);
  
  // Get site settings
  const settings = await getSiteSettings();
  
  // If article not found, still return the settings to render the layout
  if (!article) {
    return {
      props: {
        article: null,
        settings: settings || null
      }
    };
  }
  
  return {
    props: {
      article,
      settings: settings || null
    }
  };
}
