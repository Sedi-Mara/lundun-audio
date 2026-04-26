import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Library from './pages/Library';
import AdminDashboard from './components/AdminDashboard';
import { getPageContent } from './utils/content';

const FONT_OPTIONS = [
  { name: 'Inter',              google: 'Inter:wght@300;400;500;600;700' },
  { name: 'Outfit',             google: 'Outfit:wght@300;400;500;600;700' },
  { name: 'Manrope',            google: 'Manrope:wght@300;400;500;600;700' },
  { name: 'DM Sans',            google: 'DM+Sans:wght@300;400;500;600;700' },
  { name: 'Playfair Display',   google: 'Playfair+Display:wght@400;500;600;700' },
  { name: 'Cormorant Garamond', google: 'Cormorant+Garamond:wght@300;400;500;600;700' },
];

export { FONT_OPTIONS };

function FontManager() {
  useEffect(() => {
    const applyFont = () => {
      const settings = getPageContent('settings');
      const fontName = settings?.font || 'Inter';
      const fontOption = FONT_OPTIONS.find(f => f.name === fontName) || FONT_OPTIONS[0];

      // Inject or update Google Fonts link
      let link = document.getElementById('gfont-loader');
      if (!link) {
        link = document.createElement('link');
        link.id = 'gfont-loader';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${fontOption.google}&display=swap`;

      // Override the CSS variable and body font directly (beats Tailwind's body rule)
      document.body.style.setProperty('--font-sans', `'${fontName}', system-ui, sans-serif`);
      document.body.style.fontFamily = `'${fontName}', system-ui, sans-serif`;
    };

    applyFont();

    // Re-apply on storage changes (e.g. admin saves font)
    const onStorage = (e) => {
      if (e.key && e.key.startsWith('lundun_audio')) applyFont();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-white">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/library" element={<Library />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <FontManager />
        <MainLayout />
      </Router>
    </HelmetProvider>
  );
}

export default App;
