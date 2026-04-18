import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CustomVideoPlayer = ({ videoId, title, customCover, native }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbState, setThumbState] = useState(0);
  
  if (native) {
    return (
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full border-0 bg-black z-30"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  const thumbUrls = [
    customCover,
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`
  ].filter(Boolean);

  return (
    <div className="absolute inset-0 w-full h-full cursor-pointer group/video" onClick={() => setIsPlaying(true)}>
      {isPlaying ? (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
          title={title}
          className="absolute inset-0 w-full h-full border-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      ) : (
        <>
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
          <div className="absolute inset-0 bg-bg-dark/30 group-hover/video:bg-transparent transition-colors duration-700" />
          
          {/* Custom elegant play button matching the site aesthetic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-surface/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover/video:scale-110 group-hover/video:bg-surface/90 transition-all duration-500 shadow-2xl">
             <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-text-main ml-1 transition-colors"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Home() {
  const logos = [
    { src: "/Netflix_2015_logo.svg", alt: "Netflix", colored: false },
    { src: "/Apple_Music_logo.svg", alt: "Apple Music", colored: false },
    { src: "/Self_service_showmax_logo_new.svg", alt: "Showmax", colored: false },
    { src: "/Nando's_wordmark.svg", alt: "Nando's", colored: false },
    { src: "/Sony_Music_Entertainment_Logo_2023.svg", alt: "Sony Music", colored: false },
    { src: "/game-seeklogo.svg", alt: "Game Stores", colored: true },
    { src: "/JSE.svg", alt: "JSE", colored: false },
    { src: "/msmlogoweb.png", alt: "MSM Property Fund", colored: false },
    { src: "/clover-logo-2024.svg", alt: "Clover", colored: true }
  ];

  return (
    <>
      <Helmet>
        <title>Lundun Audio | John Lundun</title>
        <meta name="description" content="Lundun Audio crafted by SAMA-winning producer John Lundun. Explore bespoke film scores, sonic branding, and audio post-production." />
        <link rel="canonical" href="https://lundunaudio.com/" />
        <meta property="og:title" content="Lundun Audio | John Lundun" />
        <meta property="og:description" content="Lundun Audio crafted by SAMA-winning producer John Lundun. Explore bespoke film scores, sonic branding, and audio post-production." />
        <meta property="og:image" content="/main_hero.png" />
        <meta property="og:url" content="https://lundunaudio.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lundun Audio | John Lundun" />
        <meta name="twitter:description" content="Lundun Audio crafted by SAMA-winning producer John Lundun. Explore bespoke film scores, sonic branding, and audio post-production." />
        <meta name="twitter:image" content="/main_hero.png" />
      </Helmet>
      
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
            className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight mb-8"
          >
            Audio solutions that <br className="hidden md:block" />
            <span className="text-accent italic font-normal">elevate stories.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            From compelling film scores and immersive TV themes to dynamic commercial soundtracks. We deliver professional composition, sound design, and full post-production.
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
            {logos.map((logo, i) => (
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
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Featured Campaigns</h2>
            <p className="text-text-muted max-w-xl mx-auto font-light leading-relaxed">
              Our premier commercial scores and native audio themes, crafting identity for global brands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {[
              { brand: "Nando's", campaign: "Open Letter", videoId: "lV5yMuKeTlE" }, 
              { brand: "Game Stores", campaign: "Back to School", videoId: "85_I3SGIY1o" },
              { brand: "Nando's x Kwesta", campaign: "Oh What A Place", videoId: "di10pOkQxrk", native: true },
              { brand: "Game Stores", campaign: "Heritage Day", videoId: "xWyXW8s_Rp8" },
              { brand: "JSE", campaign: "Claim It", videoId: "RLaC7aGCtNE", native: true },
              { brand: "Tropika", campaign: "Nothing Smoother", videoId: "DtucbqCEB4M" },
              { brand: "Game Stores", campaign: "Black Friday", videoId: "4V3wM-29cho" }
            ].map((ad, i) => (
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

      {/* Latest Releases - Music Showcase */}
      <section className="py-24 bg-surface/30 border-b border-border-subtle">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Latest Releases</h2>
              <p className="text-text-muted font-light">Recent productions and collaborations available on all major streaming platforms.</p>
            </div>
            <div className="flex gap-6 pb-1">
               <a href="https://open.spotify.com/artist/0yZ5REAJnSQ71pr9yC9CVk" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-[#1DB954] transition-colors"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-72.5-47-158.5-56.6-241.6-43.7-4.9 1.3-13.6 2.6-17.8 2.6-11.6 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.6 8.1 5.2 11.3 11 11.3 18.8 0 10.6-8.7 34.6-20.7 34.6zm21-74.9c-8.7-4.2-177.3-88.7-302.2-29.4-4.5 1.9-15.5 5.5-20.4 5.5-12.6 0-20.1-10.7-20.1-23.7 0-16.2 8.7-22.3 18.4-25.9 76.7-30.7 163.7-43.1 228.3-43.1 82.2 0 162.7 30.7 199.1 52.8 10 5.5 14.6 12.3 14.6 22 0 13.5-10.7 41.8-22 41.8z"></path></svg> Spotify</a>
               <a href="https://music.apple.com/ke/artist/john-lundun/583567559" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium hover:text-[#FA243C] transition-colors"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg> Apple Music</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Sabela", artist: "John Lundun, uBeyond, Mzizi", src: "/Telepathy Cover.jpeg" },
              { title: "Ngengoma", artist: "John Lundun, uBeyond, Mzizi", src: "/Telepathy Cover.jpeg" },
              { title: "Ingoma", artist: "John Lundun, uBeyond, Novex", src: "/Telepathy Cover.jpeg" },
              { title: "Seasons (Tinguva)", artist: "John Lundun, uBeyond", src: "/Telepathy Cover.jpeg" }
            ].map((release, i) => (
              <motion.a 
                href="https://open.spotify.com/artist/0yZ5REAJnSQ71pr9yC9CVk"
                target="_blank"
                rel="noreferrer"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5 shadow-2xl border border-white/5 bg-surface">
                  <img src={release.src} alt={release.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-[2px] transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl pl-1">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="28px" width="28px" xmlns="http://www.w3.org/2000/svg"><path d="M7 6v12l10-6z"></path></svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium tracking-tight text-text-main group-hover:text-accent transition-colors truncate">{release.title}</h3>
                <p className="text-sm font-light text-text-muted truncate">{release.artist}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview - Soft rounded cards */}
      <section className="py-32 bg-[#050506]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Our Capabilities</h2>
            <p className="text-text-muted max-w-xl mx-auto font-light leading-relaxed">
              We specialize in creating audio assets that don't overpower, but seamlessly integrate and elevate the user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Original Composition', desc: 'Bespoke scores crafted for film, television series, advertising, and documentaries.', image: '/cap_composition.png' },
              { title: 'Sync Licensing', desc: 'High-quality, licensable tracks completely ready for media placement and campaigns.', image: '/cap_licensing.png' },
              { title: 'Mixing & Mastering', desc: 'Professional audio refinement services to enhance overall presence and sonic quality.', image: '/cap_mixing.png' }
            ].map((service, i) => (
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
          <img src="/cta_mic.png" alt="High End Microphone" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 max-w-3xl text-left md:ml-[15%] relative z-10">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Ready to elevate your sound?
          </h2>
          <p className="text-text-muted font-light mb-10 max-w-lg mx-auto">
            Reach out to discuss how a refined auditory presence can quietly transform your brand or production.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-surface border border-border-subtle hover:bg-white hover:text-black rounded-full font-medium transition-all duration-300">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
