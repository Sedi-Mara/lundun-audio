import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { getPageContent } from '../utils/content';
import SEO from '../components/SEO';

export default function Contact({ previewContent }) {
  const content = previewContent || getPageContent('contact');

  return (
    <>
      <SEO
        title="Commission Advertising Music — Get a Quote"
        description="Commission a bespoke commercial soundtrack, sonic brand identity, or sync license from Lundun Audio. Serving advertising agencies, brands, and broadcasters globally. Contact John Lundun to start your project."
        path="/contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Commission Advertising Music — Lundun Audio',
          url: 'https://lundunaudio.com/contact',
          mainEntity: {
            '@type': 'ProfessionalService',
            name: 'Lundun Audio',
            email: 'LundunJohn@gmail.com',
            telephone: '+27 76 086 6806',
            areaServed: ['International', 'South Africa', 'United Kingdom', 'United States', 'Africa'],
            address: { '@type': 'PostalAddress', addressLocality: 'Pretoria', addressCountry: 'ZA' },
          }
        }}
      />

      <section className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-surface border border-border-subtle rounded-[3rem] p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 shadow-2xl shadow-black/20">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 whitespace-pre-wrap">
                {content.heroTitle}
              </h1>
              <p className="text-lg text-text-muted font-light mb-12 leading-relaxed whitespace-pre-wrap">
                {content.heroSubtitle}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-medium tracking-widest text-accent uppercase mb-3">Direct Connect</h3>
                  <a href={`mailto:${content.email}`} className="text-2xl font-light hover:text-accent transition-colors block">{content.email}</a>
                  <a href={`tel:${content.phone?.replace(/\s+/g, '')}`} className="text-xl font-light hover:text-accent transition-colors block mt-2">{content.phone}</a>
                </div>

                <div>
                   <h3 className="text-xs font-medium tracking-widest text-accent uppercase mb-3">Priority Channel</h3>
                  <a href="https://wa.me/27760866806" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 text-text-main border border-[#25D366]/20 hover:bg-[#25D366] hover:text-bg-dark rounded-full transition-all duration-300 font-medium">
                    <FaWhatsapp size={18} />
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-text-muted pl-4">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="bg-bg-dark border border-border-subtle focus:border-accent rounded-full px-6 py-4 text-text-main outline-none transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-text-muted pl-4">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="bg-bg-dark border border-border-subtle focus:border-accent rounded-full px-6 py-4 text-text-main outline-none transition-colors"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-text-muted pl-4">Inquiry</label>
                  <textarea 
                    id="message" 
                    rows="4"
                    className="bg-bg-dark border border-border-subtle focus:border-accent rounded-3xl px-6 py-4 text-text-main outline-none transition-colors resize-none"
                    placeholder="Let's shape your sound..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="mt-4 px-8 py-4 bg-text-main text-bg-dark rounded-full font-medium hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
