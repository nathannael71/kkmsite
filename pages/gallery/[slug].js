import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import { getGalleryItemBySlug, getSiteSettings } from '../../lib/api';
import { urlFor } from '../../lib/sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function GalleryItemDetail({ galleryItem, settings }) {
  // If item not found
  if (!galleryItem) {
    return (
      <Layout settings={settings}>
        <Head>
          <title>Gallery Item Not Found | Karir dan Karya Mahasiswa BEM KM UNY</title>
        </Head>
        <div className="pt-32 pb-20 section-gradient-1">
          <div className="main-container text-center">
            <h1 className="text-3xl font-bold mb-4">Gallery Item Not Found</h1>
            <p className="mb-8">The gallery item you're looking for doesn't exist or has been removed.</p>
            <Link 
              href="/gallery"
              className="px-6 py-3 bg-apple-blue text-white rounded-full inline-flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Gallery
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Process image URL if it's a Sanity image
  const imageUrl = galleryItem.image && galleryItem.image._type === 'image' 
    ? urlFor(galleryItem.image).width(1920).url()
    : galleryItem.image;

  return (
    <Layout settings={settings}>
      <Head>
        <title>{galleryItem.title} | Karir dan Karya Mahasiswa BEM KM UNY</title>
        <meta name="description" content={galleryItem.description || galleryItem.title} />
      </Head>
      
      <main>
        {/* Gallery item header */}
        <section className="pt-32 pb-16 section-gradient-1">
          <div className="main-container">
            <Link 
              href="/gallery"
              className="inline-flex items-center text-apple-blue dark:text-blue-300 mb-6 hover:underline"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Gallery
            </Link>
            
            <h1 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6">
              {galleryItem.title}
            </h1>
            
            <div className="flex items-center mb-8 text-sm text-gray-600 dark:text-gray-300">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-apple-blue" />
              {galleryItem.date}
              
              {galleryItem.categories && galleryItem.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 ml-4">
                  {galleryItem.categories.map((category, index) => (
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
            
            {/* Main image */}
            <div className="rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={imageUrl}
                alt={galleryItem.title}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
            
            {/* Description */}
            {galleryItem.description && (
              <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 max-w-3xl mx-auto">
                <p className="text-gray-700 dark:text-gray-300">
                  {galleryItem.description}
                </p>
              </div>
            )}
            
            {/* Back to gallery button */}
            <div className="text-center mt-12">
              <Link 
                href="/gallery"
                className="px-6 py-3 bg-apple-blue text-white rounded-full inline-flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Gallery
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
  
  // Fetch gallery item by slug
  const galleryItem = await getGalleryItemBySlug(slug);
  
  // Get site settings
  const settings = await getSiteSettings();
  
  // If gallery item not found, still return the settings to render the layout
  if (!galleryItem) {
    return {
      props: {
        galleryItem: null,
        settings: settings || null
      }
    };
  }
  
  return {
    props: {
      galleryItem,
      settings: settings || null
    }
  };
}
