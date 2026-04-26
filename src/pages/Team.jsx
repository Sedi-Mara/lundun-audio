import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getPageContent } from '../utils/content';
import SEO from '../components/SEO';

export default function Team({ previewContent }) {
  const content = previewContent || getPageContent('team');

  return (
    <>
      <SEO
        title="The Team — Lundun Audio Collective"
        description="Meet the award-winning engineers, composers, and specialists behind Lundun Audio. A focused collective obsessed with premium sound for film, television, and advertising."
        path="/team"
      />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 whitespace-pre-wrap">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-wrap">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="pb-32 mb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {content.members?.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col"
              >
                <div className="w-full aspect-[4/5] bg-surface rounded-[2rem] overflow-hidden mb-6 relative border border-border-subtle shadow-xl shadow-black/20">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-bg-dark text-text-muted/10 group-hover:text-accent/20 transition-colors duration-500">
                       <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="6rem" width="6rem" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                    </div>
                  )}
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-bg-dark/40 pointer-events-none" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-text-main mb-1 group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-accent text-[11px] tracking-[0.2em] font-medium uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
