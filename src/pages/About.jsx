import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | John Lundun</title>
        <meta name="description" content="John Lundun is a SAMA-Nominated artist and SAMA-winning music producer and composer bridging artistic innovation and commercial excellence." />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 leading-tight"
          >
            Creative force & <br/> <span className="text-accent italic font-normal">SAMA-winning</span> producer.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted font-light leading-relaxed"
          >
            John Lundun is a SAMA-Nominated artist and SAMA-winning music producer and composer, specializing in creating iconic sound for major brands, television, and film. 
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
             {[
               { src: '/SAMA31-Black-1.png', alt: 'SAMA Award', label: 'SAMA Nominated', isWhiteBlock: true },
               { src: '/Netflix_2015_logo.svg', alt: 'Netflix', label: 'Netflix', isWhiteBlock: false },
               { src: '/Self_service_showmax_logo_new.svg', alt: 'Showmax', label: 'Showmax', isWhiteBlock: false },
               { src: '/Apple_Music_logo.svg', alt: 'Apple Music', label: 'Apple Music', isWhiteBlock: false },
               { src: '/Damelin_logo_and_motto.svg', alt: 'Damelin College', label: 'Damelin', isWhiteBlock: false },
               { src: '/Tshwane_University_of_Technology_logo.svg', alt: 'TUT', label: 'TUT Alumni', isWhiteBlock: false }
             ].map((item, i) => (
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
                   className={`w-full h-10 md:h-12 lg:h-16 object-contain mb-3 transition-all duration-500 opacity-40 group-hover:opacity-100 ${item.isWhiteBlock ? 'invert mix-blend-screen' : 'filter brightness-0 invert'}`} 
                 />
                 <span className="text-[9px] md:text-[10px] lg:text-xs font-medium tracking-widest text-text-muted uppercase group-hover:text-accent transition-colors duration-500">
                   {item.label}
                 </span>
               </motion.div>
             ))}
          </div>

          <div className="order-1 md:order-2 space-y-12">
            <div>
              <h2 className="text-xs font-medium tracking-widest text-accent mb-4 uppercase">Academic Foundation</h2>
              <p className="text-text-main font-light leading-relaxed text-lg">
                Built on a rigid professional foundation, including a Damelin College certificate in Contemporary Music and a TUT Diploma in Jazz & Popular Music. We expertly bridge true artistic innovation with commercial excellence, ensuring every project is not just heard, but deeply felt.
              </p>
            </div>
            
            <div>
              <h2 className="text-xs font-medium tracking-widest text-accent mb-4 uppercase">Industry Collaborator</h2>
              <p className="text-text-main font-light leading-relaxed text-lg">
                With a versatile, genre-spanning expertise, Lundun has engineered and composed alongside South Africa's music elite. Credits include: K.O, Kabza De Small, Kwesta, Jesse Clegg, Manana, Samthing Soweto, Msaki, Berita, Ndlovu Youth Choir, Sun El Musician, Thando Zide, and Simphiwe Dana.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-medium tracking-widest text-accent mb-4 uppercase">Innovator in Sound</h2>
              <p className="text-text-main font-light leading-relaxed text-lg">
                Pioneering the new genre <strong>Lo-Fiano</strong> (a fusion of Amapiano and Lofi) in collaboration with Apple Music, Lundun is at the forefront of musical trends. His scoring credentials for film and TV such as <em>Outlaws, Piano Love (Netflix), Mpondoland, and Mkhize to Masemola</em> highlight his ability to craft compelling narratives and emotional depth through music.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
