import React, { useRef, useState } from 'react';

const CLOUDINARY_HINT = 'https://res.cloudinary.com/YOUR_CLOUD_NAME/';

const isCloudinaryUrl = (url) => url && url.includes('res.cloudinary.com');
const isAudioUrl = (url) => url && /\.(mp3|wav|ogg|flac|aac|m4a)/i.test(url);
const isVideoUrl = (url) => url && /\.(mp4|webm|mov)/i.test(url);

const MediaUploader = ({ currentUrl, onAddMedia }) => {
  const fileInputRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onAddMedia(reader.result);
      reader.readAsDataURL(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const urlType = isAudioUrl(currentUrl) ? 'audio'
    : isVideoUrl(currentUrl) ? 'video'
    : currentUrl ? 'image/other' : null;

  return (
    <div style={{ marginTop: '0.5rem' }}>

      {/* URL Input Row */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <div style={{ flexGrow: 1, position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Paste Cloudinary URL, image/audio/video URL, or YouTube link…"
            value={currentUrl || ''}
            onChange={(e) => onAddMedia(extractYouTubeId(e.target.value))}
            style={{ width: '100%', paddingRight: currentUrl ? '2.5rem' : undefined }}
          />
          {currentUrl && (
            <button
              type="button"
              onClick={() => onAddMedia('')}
              title="Clear"
              style={{
                position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1
              }}
            >×</button>
          )}
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{ flexShrink: 0, fontSize: '0.85rem' }}
        >
          Local File
        </button>
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {isCloudinaryUrl(currentUrl) && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#22c55e', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '9999px', padding: '0.15rem 0.6rem' }}>
              ☁ Cloudinary CDN
            </span>
          )}
          {urlType && (
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'capitalize' }}>
              {urlType}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowHelp(h => !h)}
          style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}
        >
          {showHelp ? 'Hide help' : 'Using Cloudinary?'}
        </button>
      </div>

      {/* Collapsible Cloudinary guide */}
      {showHelp && (
        <div style={{
          marginTop: '0.75rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '1rem',
          fontSize: '0.82rem',
          color: '#9ca3af',
          lineHeight: 1.6
        }}>
          <p style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>☁ Cloudinary Quick Guide</p>
          <p><strong style={{ color: '#d1d5db' }}>Images:</strong> Media Library → click asset → copy URL → paste above.</p>
          <p style={{ marginTop: '0.4rem' }}><strong style={{ color: '#d1d5db' }}>Audio files:</strong> Upload your .wav/.mp3 — they appear under the <em>Video</em> tab. Copy the URL, then change <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0 4px', borderRadius: 4 }}>.wav</code> → <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0 4px', borderRadius: 4 }}>.mp3</code> to serve a smaller compressed version automatically.</p>
          <p style={{ marginTop: '0.4rem' }}>
            <strong style={{ color: '#d1d5db' }}>Your cloud name</strong> is visible on your Cloudinary Dashboard, or in any asset URL:{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0 4px', borderRadius: 4, wordBreak: 'break-all' }}>
              res.cloudinary.com/<span style={{ color: '#f59e0b' }}>YOUR_CLOUD_NAME</span>/...
            </code>
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
