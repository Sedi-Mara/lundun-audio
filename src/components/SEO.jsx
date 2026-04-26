import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://lundunaudio.com';

/**
 * SEO component with full meta tags, Open Graph, Twitter Cards,
 * hreflang international targeting, and JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = '/main_hero.png',
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | Lundun Audio` : 'Lundun Audio — International Advertising Music Production';
  const fullUrl = `${BASE_URL}${path}`;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // Default JSON-LD: ProfessionalService focused on advertising music
  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'MusicGroup'],
    name: 'Lundun Audio',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    image: fullImage,
    description:
      'Lundun Audio is an international advertising music production studio led by SAMA award-winning composer John Lundun. We create bespoke commercial soundtracks, sonic branding, film scores, and sync-ready music for brands, advertising agencies, and broadcasters worldwide.',
    priceRange: '$$',
    founder: {
      '@type': 'Person',
      name: 'John Lundun',
      jobTitle: 'CEO & Lead Composer — Advertising Music',
      sameAs: ['https://music.apple.com'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pretoria',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
    areaServed: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Continent', name: 'Africa' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'LundunJohn@gmail.com',
      telephone: '+27 76 086 6806',
      contactType: 'sales',
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Advertising Music Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Soundtrack Composition' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TV & Radio Advertising Music' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sonic Branding & Brand Identity' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sync Licensing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Film & TV Scoring' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mixing & Mastering' } },
      ],
    },
    award: 'SAMA Award — Best Produced Album',
    sameAs: [
      'https://music.apple.com',
    ],
  };

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="John Lundun" />
      <meta name="keywords" content="advertising music production, commercial music composer, TV commercial music, brand music, sonic branding, music for ads, advertising soundtrack, commercial score, sync licensing, film score composer, African advertising music, international music production, Amapiano advertising, John Lundun, Lundun Audio, Netflix music, Showmax scoring" />

      {/* International / Language targeting */}
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      <link rel="alternate" hrefLang="en-ZA" href={fullUrl} />
      <link rel="alternate" hrefLang="en-GB" href={fullUrl} />
      <link rel="alternate" hrefLang="en-US" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lundun Audio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${fullTitle} preview image`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_ZA" />
      <meta property="og:locale:alternate" content="en_GB" />

      {/* Twitter / X Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
}
