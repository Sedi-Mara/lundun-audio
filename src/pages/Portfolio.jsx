import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

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
          className="absolute inset-0 w-full h-full border-0 bg-black z-30"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img 
            src={thumbUrls[thumbState]} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-700 opacity-80 group-hover/video:opacity-100" 
            onError={() => {
              if (thumbState < thumbUrls.length - 1) {
                setThumbState(prev => prev + 1);
              }
            }} 
          />
          <div className="absolute inset-0 bg-bg-dark/30 group-hover/video:bg-transparent transition-colors duration-700 z-10" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-surface/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover/video:scale-110 group-hover/video:bg-surface/90 transition-all duration-500 shadow-2xl z-20">
             <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-text-main ml-1 transition-colors"></div>
          </div>
        </>
      )}
    </div>
  );
};

const projects = [
  { brand: "Piano Love", desc: "Netflix Movie Scoring", category: "Film & TV", image: "/Piano Love (Piano Love Netflix Movie).png" },
  { brand: "Outlaws Season 2", desc: "Showmax Series Core Audio", category: "Film & TV", image: "/outlaws S2 (Showmax Series).png" },
  
  { brand: "Nando's", desc: "Open Letter Campaign", category: "Advertisements", videoId: "lV5yMuKeTlE" }, 
  { brand: "Game Stores", desc: "Back to School", category: "Advertisements", videoId: "85_I3SGIY1o" },

  { brand: "Berita", desc: "Songs In The Key Of Life (SAMA Award Winning Album)", category: "Original Music", image: "/Berita - Songs In The Key Of Life (SAMA Award Winning Album).jpg" },
  { brand: "John Lundun", desc: "Lo-Fiano", category: "Original Music", image: "/John Lundun - Lo-Fiano.jpeg" },

  { brand: "Nando's x Kwesta", desc: "Oh What A Place", category: "Advertisements", videoId: "di10pOkQxrk", native: true },
  
  { brand: "Mkhize to Masemola", desc: "Showmax Movie Sound Design", category: "Film & TV", image: "/Mkhize to Masemola (Showmax Movie).png" },
  { brand: "Kwesta ft Wale", desc: "Spirit", category: "Original Music", image: "/Kwesta ft Wale - Spirit.jpg" },

  { brand: "Game Stores", desc: "Heritage Day", category: "Advertisements", videoId: "xWyXW8s_Rp8" },
  { brand: "JSE", desc: "Claim It", category: "Advertisements", videoId: "RLaC7aGCtNE", native: true },

  { brand: "Dulas", desc: "eVod Movie Theme & Score", category: "Film & TV", image: "/Dulas (eVod Movie).png" },
  { brand: "Major League DJz & Azana", desc: "For A Reason", category: "Original Music", image: "/azana-major-league-djz-for-a-reason-ft-ntokzin-phonikz-john-lundun-fakaza-2024_03_08_09_02_33-ubetoo.jpg" },

  { brand: "Tropika", desc: "Nothing Smoother", category: "Advertisements", videoId: "DtucbqCEB4M" },
  
  { brand: "Berita & Ndlovu Youth Choir", desc: "GBV Campaign Song", category: "Original Music", image: "/Berita & Ndlovu Youth Choir - GBV Campaign Song.jpeg" },
  { brand: "NaakMusiq ft Bucie", desc: "Ntombi", category: "Original Music", image: "/NaakMusiq ft Bucie - Ntombi.jpg" },
  
  { brand: "Game Stores", desc: "Black Friday", category: "Advertisements", videoId: "4V3wM-29cho" },
  
  { brand: "Thabsie ft JR", desc: "African Queen", category: "Original Music", image: "/Thabsie ft JR - African Queen .jpg" },
  { brand: "Abo Mkhulu", desc: "Movie Scoring", category: "Film & TV", image: "/Abo Mkhulu Movie.jpg" },
];

const categories = ['All', 'Advertisements', 'Film & TV', 'Original Music'];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = projects.filter(p => activeTab === 'All' || p.category === activeTab);

  return (
    <>
      <Helmet>
        <title>Portfolio | Lundun Audio</title>
        <meta name="description" content="A curated selection of our sonic branding, TV scoring, and music production projects." />
      </Helmet>

      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Selected Works.
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Explore our hand-crafted commercial scores, television themes, and elite original music productions.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === cat ? 'bg-white text-black border-transparent' : 'bg-surface border-border-subtle hover:border-accent text-text-muted hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredProjects.map((proj, i) => (
                <motion.div 
                  layout
                  key={proj.brand + proj.desc}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-surface rounded-[2rem] border border-border-subtle aspect-square flex flex-col justify-end overflow-hidden shadow-lg shadow-black/10"
                >
                  {/* Background Image or Video Component */}
                  {proj.videoId ? (
                     <CustomVideoPlayer videoId={proj.videoId} title={proj.brand} customCover={proj.customCover} native={proj.native} />
                  ) : (
                     <div className="absolute inset-0 z-0">
                        <img src={proj.image} alt={proj.brand} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                     </div>
                  )}

                  {/* Soft gradient overlay for text legibility (Always on top of standard image, but under video iframe if playing) */}
                  {!proj.videoId && <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent z-10 pointer-events-none" />}
                  {proj.videoId && <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-dark to-transparent z-10 pointer-events-none" />}

                  <div className="relative z-20 p-8 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-medium mb-3 tracking-widest">
                      {proj.category}
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white mb-2 leading-tight">
                      {proj.brand}
                    </h2>
                    <p className="text-gray-300 font-light text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      {proj.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
