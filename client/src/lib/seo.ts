/**
 * SEO helper functions for SEYO Academy
 */

export const seoConfig = {
  siteName: 'SEYO Academy',
  siteUrl: 'https://seyo-academy.manus.space',
  description: 'SEYO Academy - Sports Education Youth Organization. Empowering youth through soccer, education, and mentorship in Toronto, Ontario.',
  keywords: ['soccer academy', 'youth sports', 'Toronto', 'soccer training', 'youth development'],
  author: 'SEYO Academy',
  twitterHandle: '@seyoacademy',
};

export function getPageMeta(page: 'home' | 'about' | 'programs' | 'gallery' | 'register' | 'support' | 'contact') {
  const baseUrl = seoConfig.siteUrl;
  
  const pages = {
    home: {
      title: 'SEYO Academy - Youth Soccer Excellence in Toronto',
      description: 'Empower youth through soccer, education, and mentorship. Join SEYO Academy for comprehensive youth soccer development programs.',
      url: baseUrl,
      image: `${baseUrl}/og-home.jpg`,
    },
    about: {
      title: 'About SEYO Academy - Our Mission & Values',
      description: 'Learn about SEYO Academy\'s mission to empower Toronto youth through sports, education, and mentorship.',
      url: `${baseUrl}/about`,
      image: `${baseUrl}/og-about.jpg`,
    },
    programs: {
      title: 'Soccer Programs for Youth Ages 5-15 | SEYO Academy',
      description: 'Explore our year-round soccer programs for different age groups and skill levels. Professional coaching and youth development.',
      url: `${baseUrl}/programs`,
      image: `${baseUrl}/og-programs.jpg`,
    },
    gallery: {
      title: 'Gallery - SEYO Academy Training & Events',
      description: 'View photos and videos from SEYO Academy training sessions, matches, and community events.',
      url: `${baseUrl}/gallery`,
      image: `${baseUrl}/og-gallery.jpg`,
    },
    register: {
      title: 'Register for Soccer Programs | SEYO Academy',
      description: 'Enroll your child in SEYO Academy soccer programs. Simple registration process with professional coaching.',
      url: `${baseUrl}/register`,
      image: `${baseUrl}/og-register.jpg`,
    },
    support: {
      title: 'Support SEYO Academy - Donate & Sponsor',
      description: 'Support youth development. Make a donation or become a sponsor of SEYO Academy.',
      url: `${baseUrl}/support`,
      image: `${baseUrl}/og-support.jpg`,
    },
    contact: {
      title: 'Contact SEYO Academy - Get in Touch',
      description: 'Contact SEYO Academy in Toronto. Send us a message or visit our location.',
      url: `${baseUrl}/contact`,
      image: `${baseUrl}/og-contact.jpg`,
    },
  };

  return pages[page];
}

export function getStructuredData(type: 'organization' | 'localBusiness' | 'event') {
  const baseData = {
    '@context': 'https://schema.org',
    name: 'SEYO Academy',
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    image: `${seoConfig.siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '201-1949 Weston Rd',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M6N 3P1',
      addressCountry: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'Seyofootballclub@gmail.com',
    },
    sameAs: [
      'https://facebook.com/seyoacademy',
      'https://instagram.com/seyoacademy',
      'https://twitter.com/seyoacademy',
    ],
  };

  const types = {
    organization: {
      '@type': 'Organization',
      ...baseData,
      foundingDate: '2025-09-02',
      areaServed: 'Toronto, Ontario, Canada',
      knowsAbout: ['Youth Soccer Training', 'Sports Education', 'Youth Mentorship'],
    },
    localBusiness: {
      '@type': 'LocalBusiness',
      ...baseData,
      priceRange: '$150-$300',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    },
    event: {
      '@type': 'Event',
      name: 'SEYO Academy Soccer Training',
      description: 'Professional youth soccer training and development programs',
      organizer: {
        '@type': 'Organization',
        name: 'SEYO Academy',
        url: seoConfig.siteUrl,
      },
      location: baseData.address,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    },
  };

  return types[type];
}
