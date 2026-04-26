import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { getPageContent } from '../utils/content';
import AudioPlayer from '../components/AudioPlayer';
import SEO from '../components/SEO';

export default function Library({ previewContent }) {
  const content = previewContent || getPageContent('libraryPage');
  const tracks = content.tracks || [];

  const [activeTag, setActiveTag] = useState('All');

  // Collect all unique tags across every track
  const allTags = useMemo(() => {
    const set = new Set();
    tracks.forEach(t => (t.tags || []).forEach(tag => set.add(tag)));
    return ['All', ...Array.from(set).sort()];
  }, [tracks]);

  const filtered = useMemo(() => {
    if (activeTag === 'All') return tracks;
    return tracks.filter(t => (t.tags || []).includes(activeTag));
  }, [tracks, activeTag]);

  return (
    <>
      <SEO
        title="Sync-Ready Soundtrack Library — License for Advertising"
        description="Browse Lundun Audio's sync-ready soundtrack library. Curated tracks across Amapiano, cinematic, jazz, gospel, and corporate genres — ready to license for TV commercials, digital ads, and brand campaigns worldwide."
        path="/library"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'MusicPlaylist',
          name: 'Lundun Audio Advertising Soundtrack Library',
          url: 'https://lundunaudio.com/library',
          description: 'Sync-ready advertising music tracks by Lundun Audio — available for global licensing.',
          numTracks: tracks.length,
          creator: { '@type': 'Person', name: 'John Lundun' },
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-bg-dark relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-bg-dark pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4"
          >
            {content.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-text-muted font-light max-w-2xl mx-auto"
          >
            {content.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-30 bg-bg-dark/80 backdrop-blur-xl border-b border-border-subtle py-4">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-white text-black border-white shadow-lg scale-105'
                    : 'bg-white/5 text-text-muted border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {tag}
                {tag !== 'All' && (
                  <span className="ml-1.5 opacity-50 text-xs">
                    {tracks.filter(t => (t.tags || []).includes(tag)).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Track Grid */}
      <section className="py-16 bg-surface/30 min-h-screen">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* Result count */}
          <p className="text-text-muted text-sm mb-8 text-center">
            {filtered.length} {filtered.length === 1 ? 'track' : 'tracks'}
            {activeTag !== 'All' ? ` tagged "${activeTag}"` : ' in total'}
          </p>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((track, i) => (
                <motion.div
                  key={track.audioSrc}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                >
                  <AudioPlayer
                    title={track.title}
                    audioSrc={track.audioSrc}
                    tags={track.tags || []}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-text-muted">
              No tracks found for <span className="text-white">"{activeTag}"</span>.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
