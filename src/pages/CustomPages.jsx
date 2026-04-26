import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPages } from '../utils/content';

const CustomPages = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(getPages());
  }, []);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Projects & Pages - Lundun Audio</title>
        <meta name="description" content="View our managed projects and pages." />
      </Helmet>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-space">
          Custom <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Pages</span>
        </h1>
        <p className="text-gray-400 text-lg">
          These pages are dynamically generated from the Admin CMS.
        </p>
      </div>

      {pages.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No pages available yet. Please add content via the Admin Dashboard.</p>
        </div>
      ) : (
        <div className="space-y-24">
          {pages.map((page, index) => (
            <div key={page.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              {/* Content Side */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold">{page.title}</h2>
                <div className="w-12 h-1 bg-white/20"></div>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                  {page.description}
                </p>
              </div>

              {/* Media Side */}
              <div className="lg:w-1/2 w-full">
                {page.media && page.media.length > 0 ? (
                  <div className={`grid gap-4 ${page.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {page.media.map((mediaUrl, mIndex) => (
                      <div key={mIndex} className="relative rounded-2xl overflow-hidden aspect-[4/3] group bg-black/20">
                        {mediaUrl.match(/\.(mp4|webm|ogg)|data:video/) ? (
                          <video 
                            src={mediaUrl} 
                            muted 
                            loop 
                            playsInline 
                            autoPlay
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img 
                            src={mediaUrl} 
                            alt={`${page.title} media ${mIndex + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-black/20 flex items-center justify-center">
                    <span className="text-gray-500">No media available</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomPages;
