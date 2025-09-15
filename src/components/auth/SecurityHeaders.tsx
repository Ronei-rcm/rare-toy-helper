import { useEffect } from 'react';

// Component to inject security headers via meta tags
export const SecurityHeaders = () => {
  useEffect(() => {
    // Content Security Policy
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cexanvnemkltpvaxcnmx.supabase.co;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      connect-src 'self' https://cexanvnemkltpvaxcnmx.supabase.co wss://cexanvnemkltpvaxcnmx.supabase.co;
      frame-src 'none';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim();
    
    // X-Frame-Options
    const frameMeta = document.createElement('meta');
    frameMeta.httpEquiv = 'X-Frame-Options';
    frameMeta.content = 'DENY';
    
    // X-Content-Type-Options
    const contentTypeMeta = document.createElement('meta');
    contentTypeMeta.httpEquiv = 'X-Content-Type-Options';
    contentTypeMeta.content = 'nosniff';
    
    // Referrer Policy
    const referrerMeta = document.createElement('meta');
    referrerMeta.name = 'referrer';
    referrerMeta.content = 'strict-origin-when-cross-origin';
    
    // Permissions Policy
    const permissionsMeta = document.createElement('meta');
    permissionsMeta.httpEquiv = 'Permissions-Policy';
    permissionsMeta.content = 'camera=(), microphone=(), geolocation=(), payment=()';

    // Add meta tags to head
    document.head.appendChild(cspMeta);
    document.head.appendChild(frameMeta);
    document.head.appendChild(contentTypeMeta);
    document.head.appendChild(referrerMeta);
    document.head.appendChild(permissionsMeta);

    // Cleanup function
    return () => {
      document.head.removeChild(cspMeta);
      document.head.removeChild(frameMeta);
      document.head.removeChild(contentTypeMeta);
      document.head.removeChild(referrerMeta);
      document.head.removeChild(permissionsMeta);
    };
  }, []);

  return null;
};