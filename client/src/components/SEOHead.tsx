import { useEffect } from 'react';
import { getPageMeta, getStructuredData, seoConfig } from '@/lib/seo';

interface SEOHeadProps {
  page: 'home' | 'about' | 'programs' | 'gallery' | 'register' | 'support' | 'contact';
  structuredDataType?: 'organization' | 'localBusiness' | 'event';
}

export function SEOHead({ page, structuredDataType = 'organization' }: SEOHeadProps) {
  useEffect(() => {
    const meta = getPageMeta(page);

    // Update title
    document.title = meta.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', meta.description);
    updateMetaTag('keywords', seoConfig.keywords.join(', '));
    updateMetaTag('author', seoConfig.author);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', meta.title, true);
    updateMetaTag('og:description', meta.description, true);
    updateMetaTag('og:url', meta.url, true);
    updateMetaTag('og:image', meta.image, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', seoConfig.siteName, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', meta.title);
    updateMetaTag('twitter:description', meta.description);
    updateMetaTag('twitter:image', meta.image);
    updateMetaTag('twitter:creator', seoConfig.twitterHandle);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = meta.url;

    // Structured data
    let structuredScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredScript) {
      structuredScript = document.createElement('script');
      structuredScript.type = 'application/ld+json';
      document.head.appendChild(structuredScript);
    }
    structuredScript.textContent = JSON.stringify(getStructuredData(structuredDataType));

    return () => {
      // Cleanup is handled by React
    };
  }, [page, structuredDataType]);

  return null;
}
