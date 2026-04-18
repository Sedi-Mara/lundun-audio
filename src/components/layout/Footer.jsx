import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-bg-dark pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="bg-surface border border-border-subtle rounded-[2rem] p-10 md:p-16 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-2">
              <Link to="/" className="block mb-8">
                <img src={logo} alt="Lundun Audio" className="h-20 md:h-28 w-auto object-contain hover:opacity-80 transition-opacity" />
              </Link>
              <p className="text-text-muted max-w-sm mt-6 font-light leading-relaxed">
                Elevating brands through thoughtful, restrained, and elegant audio design. We craft sounds that speak softly but resonate deeply.
              </p>
              <div className="flex gap-4 mt-8 flex-wrap">
                <a href="https://open.spotify.com/artist/0yZ5REAJnSQ71pr9yC9CVk" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bg-dark border border-border-subtle flex items-center justify-center text-text-muted hover:text-[#1DB954] hover:border-[#1DB954]/50 transition-all duration-300 shadow-sm hover:shadow-[#1DB954]/10">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-72.5-47-158.5-56.6-241.6-43.7-4.9 1.3-13.6 2.6-17.8 2.6-11.6 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.6 8.1 5.2 11.3 11 11.3 18.8 0 10.6-8.7 34.6-20.7 34.6zm21-74.9c-8.7-4.2-177.3-88.7-302.2-29.4-4.5 1.9-15.5 5.5-20.4 5.5-12.6 0-20.1-10.7-20.1-23.7 0-16.2 8.7-22.3 18.4-25.9 76.7-30.7 163.7-43.1 228.3-43.1 82.2 0 162.7 30.7 199.1 52.8 10 5.5 14.6 12.3 14.6 22 0 13.5-10.7 41.8-22 41.8z"></path></svg>
                </a>
                <a href="https://music.apple.com/ke/artist/john-lundun/583567559" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bg-dark border border-border-subtle flex items-center justify-center text-text-muted hover:text-[#FA243C] hover:border-[#FA243C]/50 transition-all duration-300 pt-[2px] shadow-sm hover:shadow-[#FA243C]/10">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                </a>
                <a href="https://za.linkedin.com/in/john-lundun-9b357162" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bg-dark border border-border-subtle flex items-center justify-center text-text-muted hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-all duration-300 shadow-sm hover:shadow-[#0a66c2]/10">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
                </a>
                <a href="https://www.instagram.com/johnlundun/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bg-dark border border-border-subtle flex items-center justify-center text-text-muted hover:text-[#E1306C] hover:border-[#E1306C]/50 transition-all duration-300 pt-[1px] shadow-sm hover:shadow-[#E1306C]/10">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-text-main mb-6">Navigation</h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li><Link to="/about" className="text-text-muted hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-text-muted hover:text-accent transition-colors">Expertise</Link></li>
                <li><Link to="/portfolio" className="text-text-muted hover:text-accent transition-colors">Selected Works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text-main mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li><a href="mailto:LundunJohn@gmail.com" className="text-text-muted hover:text-accent transition-colors">LundunJohn@gmail.com</a></li>
                <li><a href="tel:+27760866806" className="text-text-muted hover:text-accent transition-colors">+27 76 086 6806</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-text-muted px-4">
          <p>&copy; {new Date().getFullYear()} Lundun Audio. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0 justify-center">
            <a href="https://open.spotify.com/artist/0yZ5REAJnSQ71pr9yC9CVk" target="_blank" rel="noreferrer" className="hover:text-[#1DB954] transition-colors">Spotify</a>
            <a href="https://music.apple.com/ke/artist/john-lundun/583567559" target="_blank" rel="noreferrer" className="hover:text-[#FA243C] transition-colors">Apple Music</a>
            <a href="https://www.instagram.com/johnlundun/" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors">Instagram</a>
            <a href="https://za.linkedin.com/in/john-lundun-9b357162" target="_blank" rel="noreferrer" className="hover:text-[#0a66c2] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
