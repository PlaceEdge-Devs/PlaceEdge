import { useState, useEffect } from 'react';

export default function useImage(url, crossOrigin) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!url) {
      setImage(null);
      setStatus('loading');
      return;
    }
    const img = new window.Image();
    
    img.onload = () => {
      setImage(img);
      setStatus('loaded');
    };
    
    img.onerror = () => {
      setImage(null);
      setStatus('failed');
    };
    
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.src = url;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url, crossOrigin]);

  return [image, status];
}
