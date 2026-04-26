import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getPageContent } from '../utils/content';
import AudioPlayer from '../components/AudioPlayer';
import SEO from '../components/SEO';

const CustomVideoPlayer = ({ videoId, title, customCover, native }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbState, setThumbState] = useState(0);
  
  const isRawVideo = videoId && videoId.match(/\.(mp4|webm|ogg)|data:video/i);

  if (native) {
    return (
      <div className="absolute inset-0 w-full h-full z-30 bg-black">
        {isRawVideo ? (
          <video src={videoId} controls autoPlay className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  }

  const thumbUrls = isRawVideo ? [customCover].filter(Boolean) : [
    customCover,
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`
  ].filter(Boolean);

  return (
    <div className="absolute inset-0 w-full h-full cursor-pointer group/video" onClick={() => setIsPlaying(true)}>
      {isPlaying ? (
        isRawVideo ? (
          <video src={videoId} controls autoPlay className="absolute inset-0 w-full h-full object-cover bg-black" />
        ) : (
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
            title={title}
            className="absolute inset-0 w-full h-full border-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        )
      ) : (
        <>
          {thumbUrls.length > 0 ? (
            <img 
              src={thumbUrls[thumbState]} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover" 
              onError={() => {
                if (thumbState < thumbUrls.length - 1) {
                  setThumbState(prev => prev + 1);
                }
              }} 
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center border border-white/5">
              <span className="text-white/30 text-xs font-mono">VIDEO</span>
            </div>
          )}
          <div className="absolute inset-0 bg-bg-dark/30 group-hover/video:bg-transparent transition-colors duration-700" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-surface/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover/video:scale-110 group-hover/video:bg-surface/90 transition-all duration-500 shadow-2xl z-20">
             <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-text-main ml-1 transition-colors"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Home({ previewContent }) {
  const content = previewContent || getPageContent('home');

  return (
    <>
      <SEO
        title="International Advertising Music Production"
        description="Lundun Audio creates bespoke commercial soundtracks, sonic branding, and sync-ready music for global brands and advertising agencies. SAMA award-winning composer John Lundun — trusted by Netflix, Showmax, Nando's, Game Stores, and Sony Music."
        path="/"
        image="/main_hero.png"
      />
      

      {/* Hero Section */}
      <section className="min-h-[95vh] flex items-center justify-center pt-20 relative overflow-hidden">
        
        {/* Studio Photographic Background - Soft & Muted */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/main_hero.png" 
            alt="Studio Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/50 via-bg-dark/80 to-bg-dark z-0" />
        </div>

        {/* Ambient Ring Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur-md border border-white/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-muted">Recording Studio & Composer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight mb-8 whitespace-pre-wrap"
          >
            {content.heroTitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-12 whitespace-pre-wrap"
          >
            {content.heroSubtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/10">
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Client Logos - Soft Fade */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-center text-xs font-medium tracking-widest text-text-muted mb-10 opacity-60 uppercase">Trusted By Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center">
            {content.logos?.map((logo, i) => (
              <div key={i} className={logo.colored ? "opacity-90 hover:opacity-100 transition-all duration-700" : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"}>
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={`h-8 md:h-12 lg:h-14 w-auto object-contain drop-shadow-sm transition-all duration-700 ${logo.colored ? '' : 'filter brightness-0 invert'}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns (Video Ads) - Uses Custom Cleaner Embeds */}
      <section className="py-32 border-b border-border-subtle bg-[#0a0a0b]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">{content.campaignsTitle || 'Featured Campaigns'}</h2>
            <p className="text-text-muted max-w-xl mx-auto font-light leading-relaxed">
              {content.campaignsSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {content.campaigns?.map((ad, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group flex flex-col"
              >
                {/* 16:9 Video Container */}
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-border-subtle mb-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] bg-surface flex items-center justify-center group-hover:border-accent/40 transition-colors duration-500">
                  <CustomVideoPlayer videoId={ad.videoId} title={`${ad.brand} - ${ad.campaign}`} customCover={ad.customCover} native={ad.native} />
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-medium tracking-tight text-text-main mb-1">{ad.brand}</h3>
                  <p className="text-accent font-light text-sm tracking-wide uppercase">{ad.campaign}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Library */}
      <section className="py-24 bg-surface/30 border-b border-border-subtle">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{content.libraryTitle || 'Soundtrack Library'}</h2>
            <p className="text-text-muted font-light max-w-xl mx-auto">{content.librarySubtitle || 'Curated short audio snippets for advertisement soundtracks.'}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {content.library?.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <AudioPlayer title={track.title} audioSrc={track.audioSrc} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Link to="/library" className="inline-flex items-center gap-2 text-accent hover:text-text-main transition-colors font-medium">
               Explore full library <FiArrowRight />
             </Link>
          </div>
        </div>
      </section>

      {/* Services Preview - Soft rounded cards */}
      <section className="py-32 bg-[#050506]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">{content.capabilitiesTitle || 'Our Capabilities'}</h2>
            <p className="text-text-muted max-w-xl mx-auto font-light leading-relaxed">
              {content.capabilitiesSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.capabilities?.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] border border-border-subtle hover:border-accent/40 transition-all duration-700 shadow-2xl flex flex-col justify-end"
              >
                {/* Background Image per card */}
                <div className="absolute inset-0 z-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-bg-dark/10 z-10" />
                </div>
                
                <div className="relative z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 backdrop-blur-md flex items-center justify-center text-white font-medium mb-6 border border-white/10">
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-medium mb-3 text-text-main">{service.title}</h3>
                  <p className="text-text-muted font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link to="/services" className="inline-flex items-center gap-2 text-accent hover:text-text-main transition-colors font-medium">
               Explore all services <FiArrowRight />
             </Link>
          </div>
        </div>
      </section>

      {/* Soft Minimal CTA */}
      <section className="py-32 border-t border-border-subtle relative overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img src={content.ctaImage || "/cta_mic.png"} alt="Call To Action Background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 max-w-3xl text-left md:ml-[15%] relative z-10">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            {content.ctaTitle}
          </h2>
          <p className="text-text-muted font-light mb-10 max-w-lg mx-auto whitespace-pre-wrap">
            {content.ctaSubtitle}
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-surface border border-border-subtle hover:bg-white hover:text-black rounded-full font-medium transition-all duration-300">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
