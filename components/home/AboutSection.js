import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faPaintBrush, 
  faNetworkWired 
} from '@fortawesome/free-solid-svg-icons';

export default function AboutSection({ data }) {
  // Default data if none is provided
  const aboutData = data || {
    sectionLabel: 'Tentang Kami',
    title: 'Why We Born?',
    description: 'Kami hadir untuk menjembatani aspirasi dan peluang Anda. Baik itu pengembangan karir, ekspresi kreatif, atau jaringan profesional, misi kami adalah mendukung mahasiswa dalam menemukan passion dan mencapai tujuan mereka.',
    features: [
      {
        title: 'Skill Development',
        description: 'Memberikan pelatihan dan sumber daya untuk mengembangkan keterampilan teknis dan soft skill yang relevan dengan kebutuhan dunia kerja modern.',
        icon: 'fa-graduation-cap'
      },
      {
        title: 'Creative Outlet',
        description: 'Menyediakan platform bagi mahasiswa untuk mengekspresikan kreativitas mereka melalui berbagai proyek dan kolaborasi yang inovatif.',
        icon: 'fa-paintbrush'
      },
      {
        title: 'Career Networking',
        description: 'Menghubungkan mahasiswa dengan profesional industri dan pemberi kerja potensial untuk memfasilitasi peluang karir yang berkelanjutan.',
        icon: 'fa-network-wired'
      }
    ]
  };
  
  // Icon mapping
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'fa-graduation-cap': return faGraduationCap;
      case 'fa-paintbrush': return faPaintBrush;
      case 'fa-network-wired': return faNetworkWired;
      default: return faGraduationCap;
    }
  };

  return (
    <section id="about" className="py-16 section-gradient-1 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">
            {aboutData.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {aboutData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {aboutData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutData.features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-apple transform hover:-translate-y-2 fade-up border border-white/20"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={getIcon(feature.icon)} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold heading-apple text-apple-darkgray dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
