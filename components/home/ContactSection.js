import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function ContactSection({ data }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });
  
  // Default contact info if none is provided
  const contactInfo = data || {
    instagram: 'Follow us for updates',
    instagramUrl: 'https://instagram.com/kkm.bemuny',
    instagramHandle: '@kkm.bemuny',
    email: 'kkmbemuny@gmail.com',
    emailText: 'We\'d love to hear from you',
    address: 'Student Center Building, Universitas Negeri Yogyakarta, Karangmalang, Yogyakarta',
    addressText: 'Visit our office'
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });
    
    try {
      // In a real app, you'd send the form data to your backend or a form service
      // This is a simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated success
      setStatus({ submitting: false, success: true, error: false });
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ submitting: false, success: false, error: true });
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, error: false }));
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-16 section-gradient-2 gradient-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">Kontak Kami</span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Punya pertanyaan atau ingin berkolaborasi? Hubungi kami segera!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="fade-up">
            <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-apple h-full border border-white/20">
              <h3 className="text-2xl font-bold heading-apple mb-6 text-apple-darkgray dark:text-white">Connect With Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <FontAwesomeIcon icon={faInstagram} className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">Instagram</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{contactInfo.instagram}</p>
                    <a 
                      href={contactInfo.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 dark:text-blue-300 font-medium"
                    >
                      {contactInfo.instagramHandle}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{contactInfo.emailText}</p>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="text-blue-500 dark:text-blue-300 font-medium"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{contactInfo.addressText}</p>
                    <p className="text-apple-darkgray dark:text-white">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="fade-up">
            <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-apple border border-white/20">
              <h3 className="text-2xl font-bold heading-apple mb-6 text-apple-darkgray dark:text-white">Send a Message</h3>
              
              <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" 
                    required
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-apple-blue text-white rounded-full btn-apple transition-apple font-medium" 
                    id="submit-button"
                    disabled={status.submitting}
                  >
                    {status.submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
              
              {/* Success & Error Messages */}
              {status.success && (
                <div id="form-success" className="form-alert alert-success mt-4">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}
              
              {status.error && (
                <div id="form-error" className="form-alert alert-error mt-4">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-3" />
                  <span>Oops! Something went wrong. Please try again later.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
