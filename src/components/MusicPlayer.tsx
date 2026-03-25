import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { Track } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'CyberSynth AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/400/400',
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon2/400/400',
  },
  {
    id: '3',
    title: 'Digital Horizon',
    artist: 'SynthWave Gen',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/neon3/400/400',
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-md bg-black glitch-border p-8 flex flex-col gap-8 screen-tear">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 glitch-border shrink-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTrack.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover grayscale contrast-150"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-cyan/20">
              <div className="flex gap-1 items-end h-8">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 32, 8, 24, 4] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                    className="w-1.5 bg-magenta"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col overflow-hidden">
          <h3 className="pixel-font text-lg text-cyan truncate mb-1">{currentTrack.title}</h3>
          <p className="pixel-font text-[9px] text-magenta uppercase tracking-widest">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-2 w-full bg-cyan/10 border border-cyan/30 overflow-hidden">
          <motion.div 
            className="h-full bg-magenta shadow-[4px_0_0_#00ffff]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between pixel-font text-[8px] text-cyan/60">
          <span>0x0000</span>
          <span>0xFFFF</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10">
        <button onClick={handlePrev} className="text-cyan hover:text-magenta transition-colors">
          <SkipBack size={32} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-20 h-20 flex items-center justify-center bg-cyan text-black hover:bg-magenta transition-all active:translate-y-1"
        >
          {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
        </button>

        <button onClick={handleNext} className="text-cyan hover:text-magenta transition-colors">
          <SkipForward size={32} />
        </button>
      </div>

      <div className="flex items-center gap-4 px-4 py-3 bg-cyan/5 border border-cyan/20">
        <Volume2 size={18} className="text-cyan/60" />
        <div className="flex-1 h-1 bg-cyan/20">
          <div className="w-3/4 h-full bg-cyan" />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
};
