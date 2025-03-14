'use client';

import React, { useEffect, useState } from 'react';

export default function StylesheetLoader({ href }: { href: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    
    link.onload = () => {
      link.media = 'all';
      setLoaded(true);
    };
    
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [href]);
  
  return null;
}
