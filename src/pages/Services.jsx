import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const servicesList = [
  {
    title: 'Original Composition',
    desc: 'Bespoke scores for film, television series, advertising campaigns, and documentaries. We craft compelling sonic narratives tailored to your unique visual story.',
    image: '/cap_composition.png'
  },
  {
    title: 'Voice Over Recording',
    desc: 'Highly professional voice over capture services for commercials, narrations, and broadcast media. Pristine recording environments for absolute clarity.',
    image: '/srv_voiceover.png'
  },
  {
    title: 'Sync Licensing',
    desc: 'Access to high-quality, fully licensable tracks ready for immediate media placement. An expansive library crossing varying genres and emotional palletes.',
    image: '/cap_licensing.png'
  },
  {
    title: 'Mixing & Mastering',
    desc: 'Industry-standard mixing and mastering services designed to heavily enhance your audio quality, ensuring it translates perfectly across all modern playback platforms.',
    image: '/cap_mixing.png'
  }
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Lundun Audio</title>
        <meta name="description" content="Original Composition, Voice Over Recording, Sync Licensing, and Mixing services by John Lundun." />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Refined Capabilities.
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Professional composition, licensing, and audio engineering ready for premium media format placements.
          </p>
        </div>
      </section>

      <section className="py-20 mb-20">
        <div className="container mx-auto px-6 max-w-6xl focus:outline-none">
          <div className="flex flex-col gap-24 md:gap-32">
            {servicesList.map((svc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}
              >
                {/* Image Showcase */}
                <div className="w-full md:w-1/2">
                   <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-border-subtle shadow-2xl group">
                     <img src={svc.image} alt={svc.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity" />
                     {/* Soft dark vignette */}
                     <div className="absolute inset-0 bg-radial-gradient from-transparent to-bg-dark/40 pointer-events-none" />
                   </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xl font-medium mb-8">
                    0{i+1}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-main mb-4">{svc.title}</h2>
                  <p className="text-text-muted leading-relaxed font-light text-lg">
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
