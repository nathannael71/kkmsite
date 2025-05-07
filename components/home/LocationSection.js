import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faDirections } from '@fortawesome/free-solid-svg-icons';

export default function LocationSection({ data }) {
  // Default location data if none is provided
  const locationData = data || {
    sectionLabel: 'Lokasi Kami',
    title: 'Our Location',
    description: 'Kunjungi kami di Student Center Building, Universitas Negeri Yogyakarta.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1633170025876!2d110.38421261477832!3d-7.773598894403988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b2d7b98905%3A0x19ad4f9a195770c7!2sUniversitas%20Negeri%20Yogyakarta!5e0!3m2!1sen!2sid!4v1656483265685!5m2!1sen!2sid',
    locationName: 'Student Center Building',
    fullAddress: 'Universitas Negeri Yogyakarta, Karangmalang, Yogyakarta',
    shareUrl: 'https://goo.gl/maps/8XYZabcdefg',
    directionsUrl: 'https://www.google.com/maps/dir//Universitas+Negeri+Yogyakarta/',
    cta: {
      title: 'For Your Better Future',
      description: 'Join us at Karir dan Karya Mahasiswa to enhance your skills, showcase your talent, and prepare for your future career.',
      buttonText: 'Join Our Community',
      buttonUrl: '/join'
    }
  };
  
  // Share location function
  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lokasi BEM KM UNY',
        url: locationData.shareUrl
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      window.open(locationData.shareUrl, '_blank');
    }
  };

  return (
    <section id="location" className="py-16 section-gradient-3 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">
            {locationData.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {locationData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {locationData.description}
          </p>
        </div>
        
        {/* Map container */}
        <div className="rounded-2xl overflow-hidden shadow-lg transition-apple fade-up">
          <div className="map-container">
            <iframe 
              src={locationData.mapUrl} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
          
          {/* Map info overlay */}
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg p-6 transition-apple border-t border-white/20 rounded-b-2xl">
            <div className="flex flex-wrap justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold heading-apple mb-2 text-apple-darkgray dark:text-white">
                  {locationData.locationName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{locationData.fullAddress}</p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={shareLocation} 
                  className="px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-lg transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20"
                >
                  <FontAwesomeIcon icon={faShareAlt} className="mr-2" /> Share
                </button>
                <a 
                  href={locationData.directionsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 bg-apple-blue text-white rounded-lg transition-apple hover:bg-blue-600"
                >
                  <FontAwesomeIcon icon={faDirections} className="mr-2" /> Directions
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="mt-24 text-center fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple mb-6 text-apple-darkgray dark:text-white">
            {locationData.cta.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto mb-10">
            {locationData.cta.description}
          </p>
          <a 
            href={locationData.cta.buttonUrl} 
            className="px-8 py-4 bg-apple-blue text-white rounded-full btn-apple transition-apple text-lg font-medium"
          >
            {locationData.cta.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
