import Image from 'next/image';
import { urlFor } from '../../lib/sanity';

export default function ProgramsSection({ data }) {
  // Default programs if none are provided
  const programsData = data || [
    {
      title: 'KKM Space',
      description: 'A collaborative workspace for students to work, share ideas, and network.',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      status: 'Coming Soon'
    },
    {
      title: 'SkillUp [InsightUp]',
      description: 'Workshops and seminars focused on practical skill development.',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      status: 'Coming Soon'
    },
    {
      title: '[WeGrowth!]',
      description: 'Mentorship program connecting students with experienced professionals.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      status: 'Coming Soon'
    },
    {
      title: '[WeLearn!]',
      description: 'Educational resources and online courses for self-paced learning.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      status: 'Coming Soon'
    },
    {
      title: 'Company Visit',
      description: 'Field trips to companies to gain firsthand industry experience.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      status: 'Coming Soon'
    }
  ];

  return (
    <section id="programs" className="py-16 section-gradient-2 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">Program Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">Our Programs</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Kami menawarkan berbagai program yang dirancang untuk meningkatkan keterampilan, menampilkan bakat, dan mempersiapkan perjalanan karir Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {programsData.map((program, index) => {
            // Process image URL if it's a Sanity image
            const imageUrl = program.image && program.image._type === 'image' 
              ? urlFor(program.image).url()
              : program.image;
            
            return (
              <div 
                key={index} 
                className="bg-white/70 dark:bg-white/10 backdrop-blur-lg program-card overflow-hidden shadow-lg transition-apple fade-up border border-white/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={program.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover img-zoom"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold heading-apple mb-2 text-apple-darkgray dark:text-white">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {program.description}
                  </p>
                  <span className="bg-purple-100 dark:bg-purple-400/20 text-purple-600 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-400/40">
                    {program.status || 'Coming Soon'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
