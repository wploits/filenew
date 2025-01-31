import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isHovering) {
      setShowVolumeControl(true);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowVolumeControl(false);
      }, 2000);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovering]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      className="fixed top-4 right-4 flex items-center gap-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <audio ref={audioRef} loop autoPlay onError={(e) => console.error('Audio failed to load:', e)}>
        <source src="/bgm.ogg" type="audio/ogg" />
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {showVolumeControl && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <motion.input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMute}
        className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition-colors border border-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
