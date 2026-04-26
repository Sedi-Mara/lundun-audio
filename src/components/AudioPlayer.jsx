import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AudioPlayer = ({ title, audioSrc, tags = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    const newTime = percentage * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(percentage * 100);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      return () => {
        audio.removeEventListener('play', () => setIsPlaying(true));
        audio.removeEventListener('pause', () => setIsPlaying(false));
      };
    }
  }, []);

  return (
    <div className="group relative w-full bg-surface border border-border-subtle rounded-3xl p-6 transition-all duration-500 hover:border-accent/40 shadow-lg hover:shadow-2xl">
      <div className="flex items-center gap-6">
        
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="flex-shrink-0 w-14 h-14 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-white/5 group-hover:scale-105"
        >
          {isPlaying ? (
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
          ) : (
             <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" className="ml-1" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"></path></svg>
          )}
        </button>

        {/* Track Info & Progress */}
        <div className="flex-grow flex flex-col justify-center min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-3 gap-2 sm:gap-4">
             <div className="flex items-center gap-3 min-w-0 group/title relative">
               <h3 className="text-lg font-medium text-text-main tracking-wide truncate cursor-default">
                 {title || 'Untitled Snippet'}
               </h3>
               
               {/* Custom Tooltip */}
               <div className="absolute left-0 bottom-full mb-2 opacity-0 group-hover/title:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                 <div className="bg-black/90 backdrop-blur-md border border-white/10 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap">
                   {title || 'Untitled Snippet'}
                 </div>
               </div>

               <a 
                 href={`mailto:LundunJohn@gmail.com?subject=Inquiry about track: ${title || 'Untitled Snippet'}`}
                 title="Inquire about this track"
                 className="flex-shrink-0 text-text-muted hover:text-white transition-colors p-1"
               >
                 <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
               </a>
             </div>
             <div className="flex items-center gap-4 flex-shrink-0">
               {/* Volume Control */}
               <div className="flex items-center gap-3 group/vol">
                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px" className="text-text-muted group-hover/vol:text-text-main transition-colors" xmlns="http://www.w3.org/2000/svg">
                   {volume === 0 ? (
                     <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                   ) : volume < 0.5 ? (
                     <path d="M5 9v6h4l5 5V4L9 9H5zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>
                   ) : (
                     <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                   )}
                 </svg>
                 <div className="relative w-20 h-[3px] bg-white/10 rounded-full cursor-pointer flex items-center group/slider transition-all">
                   {/* Custom Track Fill */}
                   <div 
                     className="absolute top-0 left-0 h-full bg-text-main rounded-full pointer-events-none group-hover/vol:bg-accent transition-colors" 
                     style={{ width: `${volume * 100}%` }}
                   />
                   {/* Custom Thumb */}
                   <div 
                     className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg opacity-0 group-hover/vol:opacity-100 pointer-events-none transition-opacity duration-200"
                     style={{ left: `calc(${volume * 100}% - 5px)` }}
                   />
                   {/* Native Input */}
                   <input 
                     type="range" 
                     min="0" 
                     max="1" 
                     step="0.01" 
                     value={volume} 
                     onChange={handleVolumeChange}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0"
                   />
                 </div>
               </div>
               <span className="text-xs font-mono text-text-muted">
                 {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'} / {formatTime(duration)}
               </span>
             </div>
          </div>

          {/* Interactive Progress Bar */}
          <div 
            className="w-full h-2 bg-black/40 rounded-full cursor-pointer overflow-hidden border border-white/5 relative group/progress"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
            {/* Hover indicator (optional enhancement) */}
            <div className="absolute top-0 left-0 h-full bg-white/20 w-0 group-hover/progress:w-full transition-all duration-700 opacity-0 group-hover/progress:opacity-100 mix-blend-overlay pointer-events-none" />
          </div>
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />
    </div>
  );
};

export default AudioPlayer;
