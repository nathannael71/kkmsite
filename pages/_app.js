import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Prevent Font Awesome from dynamically adding CSS

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
      
      // Listen for changes to the prefers-color-scheme media query
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
