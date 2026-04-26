import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DynamicEditor, { formatLabel } from './DynamicEditor';
import { getSiteContent, savePageContent, resetPageToDefault, revertPageToPrevious, hasPreviousSnapshot } from '../utils/content';
import { FONT_OPTIONS } from '../App';
import './AdminStyles.css';

// Import Live Pages for Preview
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Portfolio from '../pages/Portfolio';
import Team from '../pages/Team';
import Contact from '../pages/Contact';
import Library from '../pages/Library';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [siteContent, setSiteContent] = useState({});
  const [activeTab, setActiveTab] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [canRevert, setCanRevert] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Inter');

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const data = getSiteContent();
    setSiteContent(data);
    const tabs = Object.keys(data).filter(k => k !== 'settings');
    if (tabs.length > 0) {
      const firstTab = tabs[0];
      setActiveTab(firstTab);
      setCanRevert(hasPreviousSnapshot(firstTab));
    }
    if (data.settings?.font) setSelectedFont(data.settings.font);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      loadData();
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const handleEditorChange = (updatedData) => {
    setSiteContent(prev => ({
      ...prev,
      [activeTab]: updatedData
    }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    savePageContent(activeTab, siteContent[activeTab]);
    setTimeout(() => {
      setIsSaving(false);
      setCanRevert(true); // a snapshot now exists
      alert('Changes saved successfully!');
    }, 500);
  };

  const handleRevertToPrevious = () => {
    if (window.confirm(`Revert "${activeTab}" to its previously saved state? Your current unsaved changes will be lost.`)) {
      const restored = revertPageToPrevious(activeTab);
      if (restored) {
        setSiteContent(prev => ({ ...prev, [activeTab]: restored }));
        setCanRevert(hasPreviousSnapshot(activeTab));
      } else {
        alert('No previous save found for this page.');
      }
    }
  };

  const handleResetPage = () => {
    if (window.confirm(`Are you sure you want to reset the "${activeTab}" page to its original default content? This action cannot be undone.`)) {
      const defaultData = resetPageToDefault(activeTab);
      setSiteContent(prev => ({
        ...prev,
        [activeTab]: defaultData
      }));
      setCanRevert(true); // snapshot of pre-reset state is now stored
    }
  };

  const renderPreview = () => {
    const p = siteContent[activeTab];
    switch (activeTab) {
      case 'home': return <Home previewContent={p} />;
      case 'about': return <About previewContent={p} />;
      case 'services': return <Services previewContent={p} />;
      case 'portfolio': return <Portfolio previewContent={p} />;
      case 'team': return <Team previewContent={p} />;
      case 'contact': return <Contact previewContent={p} />;
      case 'libraryPage': return <Library previewContent={p} />;
      default: return <div style={{ padding: '2rem' }}>Preview not available for this section.</div>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard login-container pointer-events-auto relative z-50">
        <Helmet><title>Admin Login - Lundun Audio</title></Helmet>
        <div className="glass-panel">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = Object.keys(siteContent).filter(k => k !== 'settings');

  const handleFontChange = (fontName) => {
    setSelectedFont(fontName);
    // Live-preview the font immediately
    const fontOption = FONT_OPTIONS.find(f => f.name === fontName);
    if (fontOption) {
      let link = document.getElementById('gfont-loader');
      if (!link) { link = document.createElement('link'); link.id = 'gfont-loader'; link.rel = 'stylesheet'; document.head.appendChild(link); }
      link.href = `https://fonts.googleapis.com/css2?family=${fontOption.google}&display=swap`;
      document.body.style.setProperty('--font-sans', `'${fontName}', system-ui, sans-serif`);
      document.body.style.fontFamily = `'${fontName}', system-ui, sans-serif`;
    }
    // Persist to content
    savePageContent('settings', { ...( siteContent.settings || {}), font: fontName });
    setSiteContent(prev => ({ ...prev, settings: { ...(prev.settings || {}), font: fontName } }));
  };

  return (
    <div className="admin-dashboard relative z-50 pointer-events-auto">
      <Helmet><title>CMS Dashboard - Lundun Audio</title></Helmet>
      
      <header className="admin-header flex justify-between items-center" style={{ margin: 0, padding: '1rem 2rem' }}>
        <h1>CMS Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="admin-content" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '1rem 2rem', width: '100%' }}>
        
        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Pages */}
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <h3 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', color: '#9ca3af', marginBottom: '1rem', paddingLeft: '0.5rem' }}>Pages</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tabs.map(tab => (
                <li key={tab}>
                  <button
                    style={{ 
                      background: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: activeTab === tab ? '#fff' : '#9ca3af',
                      border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: '0.6rem 0.75rem', borderRadius: '8px', fontSize: '0.95rem',
                      marginBottom: '0.15rem', textTransform: 'capitalize', transition: 'all 0.15s'
                    }}
                    onClick={() => {
                      setActiveTab(tab);
                      setCanRevert(hasPreviousSnapshot(tab));
                    }}
                  >
                    {formatLabel(tab)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Font Picker */}
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <h3 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', color: '#9ca3af', marginBottom: '1rem', paddingLeft: '0.5rem' }}>Site Font</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {FONT_OPTIONS.map(font => (
                <button
                  key={font.name}
                  onClick={() => handleFontChange(font.name)}
                  style={{
                    background: selectedFont === font.name ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: selectedFont === font.name ? '#fff' : '#9ca3af',
                    border: selectedFont === font.name ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                    width: '100%', textAlign: 'left', cursor: 'pointer', padding: '0.5rem 0.75rem', borderRadius: '8px',
                    fontSize: '0.9rem', fontFamily: `'${font.name}', sans-serif`, transition: 'all 0.15s'
                  }}
                >
                  {font.name}
                  {selectedFont === font.name && <span style={{ float: 'right', color: '#22c55e', fontSize: '0.8rem' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div style={{ flexGrow: showPreview ? 0 : 1, width: showPreview ? '45%' : 'auto', transition: 'width 0.3s ease' }}>
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#9ca3af' }}>Editing</span>
              <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '9999px', padding: '0.2rem 0.9rem', fontSize: '0.9rem', fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>{formatLabel(activeTab)}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button 
                className="btn"
                onClick={handleRevertToPrevious}
                disabled={!canRevert}
                style={{ 
                  background: canRevert ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.03)', 
                  color: canRevert ? '#fbbf24' : '#4b5563', 
                  border: `1px solid ${canRevert ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                  cursor: canRevert ? 'pointer' : 'not-allowed'
                }}
                title={canRevert ? 'Revert to previous save' : 'No previous save available'}
              >
                ↩ Revert to Previous
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleResetPage}
                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
              >
                Reset Default
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
          
          {/* Quick Jump Nav Strip */}
          {siteContent[activeTab] && (
            <div className="flex flex-wrap gap-2 sticky top-4 z-40 bg-bg-dark/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 mb-6 drop-shadow-xl">
              <span className="text-xs uppercase tracking-widest text-text-muted mt-2 mr-2">Quick Jump:</span>
              {Object.keys(siteContent[activeTab]).map(key => (
                 <button 
                   key={key}
                   onClick={() => {
                     const el = document.getElementById(`editor-${key}`);
                     if (el) {
                       const y = el.getBoundingClientRect().top + window.scrollY - 100;
                       window.scrollTo({ top: y, behavior: 'smooth' });
                     }
                   }}
                   className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 tracking-wider capitalize"
                 >
                   {formatLabel(key)}
                 </button>
              ))}
            </div>
          )}

          {siteContent[activeTab] && (
             <DynamicEditor 
               data={siteContent[activeTab]} 
               isRoot={true}
               onChange={handleEditorChange} 
             />
          )}
        </div>

        {/* Live Preview Area */}
        {showPreview && (
          <div 
             className="bg-bg-dark text-white rounded-2xl overflow-y-auto shadow-2xl relative" 
             style={{ 
                flexGrow: 1, 
                height: 'calc(100vh - 120px)', 
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'sticky',
                top: '1rem'
             }}
          >
             <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md px-4 py-2 border-b border-white/10 flex items-center justify-between pointer-events-auto">
               <span className="text-xs font-mono text-accent uppercase tracking-widest">Live Preview</span>
               <span className="text-xs text-gray-500">Unsaved changes are synced in real-time</span>
             </div>
             
              {/* Render the actual component container inside to simulate full screen base styles */}
              <div className="preview-canvas overflow-x-hidden relative" style={{ width: '100%', zoom: 0.8 }}>
                  {renderPreview()}
              </div>
           </div>
         )}

       </div>

       {/* Floating Scroll Buttons */}
       <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-surface border border-white/10 shadow-2xl flex items-center justify-center text-white hover:bg-accent transition-colors"
            title="Scroll to Top"
          >
            ↑
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-surface border border-white/10 shadow-2xl flex items-center justify-center text-white hover:bg-accent transition-colors"
            title="Scroll to Bottom"
          >
            ↓
          </button>
       </div>
    </div>
  );
};

export default AdminDashboard;
