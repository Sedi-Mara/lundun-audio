import React from 'react';
import MediaUploader from './MediaUploader';

export const formatLabel = (key) => {
  const map = {
    ctaTitle: 'Call-to-Action Heading',
    ctaSubtitle: 'Call-to-Action Subtext',
    ctaImage: 'Call-to-Action Background Image',
    videoId: 'Video Link or YouTube ID',
    src: 'Image/Media File',
    desc: 'Description',
    customCover: 'Custom Video Thumbnail',
    heroTitle: 'Hero Main Heading',
    heroSubtitle: 'Hero Introduction Subtext',
    isWhiteBlock: 'Use Original Brand Colors',
    campaignsTitle: 'Campaigns Section Heading',
    campaignsSubtitle: 'Campaigns Section Subtext',
    libraryTitle: 'Audio Library Heading',
    librarySubtitle: 'Audio Library Subtext',
    capabilitiesTitle: 'Capabilities Section Heading',
    capabilitiesSubtitle: 'Capabilities Section Subtext',
  };
  return map[key] || key.replace(/([A-Z])/g, ' $1').trim();
};

/**
 * A highly recursive and dynamic form editor built to traverse our siteContent schema.
 */
const DynamicEditor = ({ data, onChange, isRoot = false }) => {

  const handleChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  const isMediaField = (keyName) => {
    const k = keyName.toLowerCase();
    return k.includes('image') || k.includes('src') || k.includes('cover') || k.includes('video') || k.includes('audio');
  };

  const renderField = (key, value) => {
    // Skip internal fields if needed
    if (key === 'title' && typeof value === 'string') {
      // Don't let them rename the actual Page type title to keep tabs clean, but wait, maybe they want to. 
      // We will allow it but just render it normally.
    }

    if (typeof value === 'string') {
      if (isMediaField(key)) {
        return (
          <div key={key} id={isRoot ? `editor-${key}` : undefined} className="form-group glass-panel" style={{ padding: '1rem', marginTop: '1rem' }}>
            <label style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', textTransform: 'capitalize' }}>
              {formatLabel(key)}
            </label>
            {value && (!key.toLowerCase().includes('video') || value.match(/\.(mp4|webm|ogg)|data:video/i)) && (
               <div className="mb-4 h-32 w-48 relative rounded overflow-hidden border border-white/10 bg-black/40">
                 {value.match(/\.(mp3|wav|ogg)|data:audio/i) ? (
                    <audio src={value} controls className="w-full h-full object-contain" />
                 ) : value.match(/\.(mp4|webm|ogg)|data:video/i) ? (
                    <video src={value} muted className="w-full h-full object-contain" />
                 ) : (
                    <img src={value} alt="Preview" className="w-full h-full object-contain" />
                 )}
               </div>
            )}
            <MediaUploader 
              currentUrl={value}
              onAddMedia={(url) => handleChange(key, url)} 
            />
          </div>
        );
      }

      // regular string
      const isLongText = value.length > 80 || key.toLowerCase().includes('desc') || key.toLowerCase().includes('content') || key.toLowerCase().includes('bio');
      return (
        <div key={key} id={isRoot ? `editor-${key}` : undefined} className="form-group">
          <label style={{ textTransform: 'capitalize' }}>{formatLabel(key)}</label>
          {isLongText ? (
            <textarea
              className="form-input"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="form-input"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )}
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={key} id={isRoot ? `editor-${key}` : undefined} className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(key, e.target.checked)}
            style={{ width: '20px', height: '20px' }}
          />
          <label style={{ margin: 0, textTransform: 'capitalize' }}>{formatLabel(key)}</label>
        </div>
      );
    }

    if (Array.isArray(value)) {
      // Special case: array of strings → Tag editor
      if (value.length === 0 || typeof value[0] === 'string') {
        return (
          <div key={key} id={isRoot ? `editor-${key}` : undefined} className="form-group glass-panel" style={{ padding: '1rem', marginTop: '1rem' }}>
            <label style={{ textTransform: 'capitalize', color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              {formatLabel(key)}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {value.map((tag, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '9999px', padding: '0.2rem 0.75rem', fontSize: '0.85rem', color: '#fff' }}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => { const n = [...value]; n.splice(i, 1); handleChange(key, n); }}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '1rem' }}
                    title="Remove tag"
                  >×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add a tag and press Enter"
                style={{ flex: 1, padding: '0.4rem 0.75rem', fontSize: '0.9rem' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    handleChange(key, [...value, e.target.value.trim()]);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        );
      }

      return (
        <div key={key} id={isRoot ? `editor-${key}` : undefined} className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
            <h3 style={{ textTransform: 'capitalize', margin: 0 }}>
              List: {formatLabel(key)}
            </h3>
            <button 
              type="button" 
              className="btn btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
              onClick={() => {
                let newObj = {};
                if (value.length > 0) {
                   Object.keys(value[0]).forEach(k => {
                      if (typeof value[0][k] === 'string') newObj[k] = '';
                      if (typeof value[0][k] === 'boolean') newObj[k] = false;
                   });
                } else {
                   newObj = { title: '', desc: '' };
                }
                handleChange(key, [newObj, ...value]);
              }}
            >
              + Add {formatLabel(key)}
            </button>
          </div>
          {value.map((item, index) => (
            <div key={index} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Item {index + 1}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {index > 0 && (
                    <button 
                      type="button" 
                      className="btn"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => {
                        const newArr = [...value];
                        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
                        handleChange(key, newArr);
                      }}
                    >
                      ↑ Up
                    </button>
                  )}
                  {index < value.length - 1 && (
                    <button 
                      type="button" 
                      className="btn"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => {
                        const newArr = [...value];
                        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
                        handleChange(key, newArr);
                      }}
                    >
                      ↓ Down
                    </button>
                  )}
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => {
                      const newArr = [...value];
                      newArr.splice(index, 1);
                      handleChange(key, newArr);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <DynamicEditor 
                data={item} 
                isRoot={false}
                onChange={(updatedItem) => {
                  const newArr = [...value];
                  newArr[index] = updatedItem;
                  handleChange(key, newArr);
                }} 
              />
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div key={key} id={isRoot ? `editor-${key}` : undefined} style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
                <h4 style={{ textTransform: 'capitalize' }}>{formatLabel(key)}</h4>
                <DynamicEditor data={value} isRoot={false} onChange={(upd) => handleChange(key, upd)} />
            </div>
        )
    }

    return null;
  };

  return (
    <div className="dynamic-editor">
      {Object.entries(data).map(([key, val]) => renderField(key, val))}
    </div>
  );
};

export default DynamicEditor;
