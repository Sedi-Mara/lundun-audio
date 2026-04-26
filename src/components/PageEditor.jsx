import React, { useState, useEffect } from 'react';
import MediaUploader from './MediaUploader';

const PageEditor = ({ page, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: []
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        description: page.description || '',
        media: page.media || []
      });
    }
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMedia = (mediaUrl) => {
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, mediaUrl]
    }));
  };

  const handleRemoveMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="glass-panel page-editor">
      <h2>{page ? 'Edit Page' : 'Create New Page'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Page Title</label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Summer Campaign"
          />
        </div>
        
        <div className="form-group">
          <label>Description / Content</label>
          <textarea
            name="description"
            className="form-input"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe the page content..."
          />
        </div>

        <div className="form-group">
          <MediaUploader onAddMedia={handleAddMedia} />
          
          {formData.media.length > 0 && (
            <div className="media-preview-list">
              {formData.media.map((item, index) => (
                <div key={index} className="media-preview-item">
                  {item.match(/\.(mp4|webm|ogg)|data:video/) ? (
                    <video src={item} muted loop playsInline />
                  ) : (
                    <img src={item} alt={`Media ${index}`} />
                  )}
                  <button 
                    type="button" 
                    className="remove-media-btn"
                    onClick={() => handleRemoveMedia(index)}
                    title="Remove media"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">
            {page ? 'Save Changes' : 'Create Page'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageEditor;
