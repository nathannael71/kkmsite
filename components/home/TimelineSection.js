import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function TimelineSection({ data }) {
  // Default timeline events if none are provided
  const timelineEvents = data || [
    {
      title: 'SkillUp Workshop Series',
      date: 'April 2025',
      description: 'A series of workshops focusing on key skills such as resume writing, interview preparation, and professional communication.',
      buttonText: 'Coming Soon'
    },
    {
      title: 'KKM Space Launch',
      date: 'May 2025',
      description: 'Grand opening of our collaborative workspace with networking opportunities, guest speakers, and workshops.',
      buttonText: 'Coming Soon'
    },
    {
      title: 'Company Visit Week',
      date: 'July 2025',
      description: 'A week-long series of visits to various companies and organizations in the region to provide students with insights into different industries.',
      buttonText: 'Coming Soon'
    },
    {
      title: 'WeGrowth Mentorship Program',
      date: 'August 2025',
      description: 'Launch of our mentorship program connecting students with experienced professionals in their field of interest.',
      buttonText: 'Coming Soon'
    },
    {
      title: 'Student Work Exhibition',
      date: 'September 2025',
      description: 'An exhibition showcasing student projects, artwork, and innovative ideas to the university community and industry professionals.',
      buttonText: 'Coming Soon'
    }
  ];

  // Accordion functionality
  useEffect(() => {
    const accordionHeaders = document.querySelectorAll('.apple-accordion-header');
    
    const handleAccordionClick = (e) => {
      const accordion = e.currentTarget.parentElement;
      const wasActive = accordion.classList.contains('accordion-active');
      
      // Close all accordions first
      document.querySelectorAll('.apple-accordion').forEach(acc => {
        acc.classList.remove('accordion-active');
      });
      
      // If it wasn't active before, activate it
      if (!wasActive) {
        accordion.classList.add('accordion-active');
      }
    };
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', handleAccordionClick);
    });
    
    return () => {
      accordionHeaders.forEach(header => {
        header.removeEventListener('click', handleAccordionClick);
      });
    };
  }, []);

  return (
    <section id="timeline" className="py-16 section-gradient-5 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">Timeline Program</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">Program Timeline</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Jadwal kegiatan dan program kami untuk tahun akademik 2025.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Timeline accordion */}
          <div className="space-y-6 relative pl-10">
            {timelineEvents.map((event, index) => (
              <div key={index} className="timeline-node">
                <div className="timeline-dot"></div>
                <div className="apple-accordion bg-white/70 dark:bg-white/10 backdrop-blur-lg shadow-lg transition-apple fade-up border border-white/20">
                  <div className="apple-accordion-header flex justify-between items-center cursor-pointer">
                    <div className="pl-4">
                      <h3 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{event.date}</p>
                    </div>
                    <span className="accordion-icon pr-4">
                      <div className="custom-accordion-arrow">
                        <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                      </div>
                    </span>
                  </div>
                  <div className="accordion-content px-4 text-gray-600 dark:text-gray-300">
                    <p className="mb-4">{event.description}</p>
                    <button className="px-6 py-2 bg-apple-blue text-white rounded-full btn-apple transition-apple">
                      {event.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
