import React, { useEffect } from 'react';
import '../styles/variables.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add loading class to html element on initial load
    if (typeof document !== 'undefined') {
      // Remove loading class after a small delay to allow auth check to complete
      setTimeout(() => {
        document.documentElement.classList.remove('loading');
      }, 50);
    }
    
    return () => {
      // Clean up by removing the class if component unmounts
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('loading');
      }
    };
  }, []);
  
  return <Component {...pageProps} />;
}

// Add loading class to html element on server-side render
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('loading');
}

export default MyApp;
