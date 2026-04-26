import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getPageContent } from '../utils/content';
import SEO from '../components/SEO';

export default function About({ previewContent }) {
  const content = previewContent || getPageContent('about');
  return (
    <>
      <SEO
        title="About — John Lundun, Commercial Music Composer"
        description="John Lundun is a SAMA award-winning commercial music composer and audio director. With credits spanning Netflix, Showmax, Nando's, and Sony Music, he crafts advertising music that resonates globally from his studio in Pretoria."
        path="/about"
        image="/main_hero.png"
      />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 leading-tight whitespace-pre-wrap"
          >
            {content.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted font-light leading-relaxed whitespace-pre-wrap"
          >
            {content.heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
             {content.accolades?.map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 className="bg-surface/50 rounded-3xl border border-border-subtle p-3 lg:p-6 flex flex-col items-center justify-center text-center aspect-square shadow-lg group hover:border-accent/40 hover:bg-surface transition-colors"
               >
                 <img 
                   src={item.src} 
                   alt={item.alt} 
                   className={`w-full h-10 md:h-12 lg:h-16 object-contain mb-3 transition-all duration-500 opacity-40 group-hover:opacity-100 ${item.isWhiteBlock ? 'invert mix-blend-screen' : (item.useOriginalColors ? '' : 'filter brightness-0 invert')}`} 
                 />
                 <span className="text-[9px] md:text-[10px] lg:text-xs font-medium tracking-widest text-text-muted uppercase group-hover:text-accent transition-colors duration-500">
                   {item.label}
                 </span>
               </motion.div>
             ))}
          </div>

          <div className="order-1 md:order-2 space-y-12">
            {content.sections?.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-xs font-medium tracking-widest text-accent mb-4 uppercase">{section.title}</h2>
                <p className="text-text-main font-light leading-relaxed text-lg whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
