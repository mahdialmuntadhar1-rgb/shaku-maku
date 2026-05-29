import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SkeletonsProps {
  type?: 'card' | 'list' | 'search' | 'grid';
  count?: number;
}

export default function LoadingSkeletons({
  type = 'card',
  count = 1
}: SkeletonsProps) {
  
  if (type === 'search') {
    return (
      <div className="space-y-6 text-center max-w-sm mx-auto py-8">
        {/* Animated scanning radar orb */}
        <div className="relative w-20 h-20 mx-auto">
          <motion.div
            className="absolute inset-0 bg-amber-500/10 border border-amber-500/30 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-2 bg-gradient-to-tr from-amber-500/20 to-orange-500/30 border border-white/5 rounded-full flex items-center justify-center text-amber-500"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 animate-pulse text-amber-500" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-black text-white uppercase tracking-wider animate-pulse">
            Searching Iraqi Directories...
          </h4>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">
            Matching registration history and phone records securely in real-time.
          </p>
        </div>

        {/* Pulsating list skeleton */}
        <div className="space-y-3 pt-4">
          {[1, 2].map(idx => (
            <div
              key={idx}
              className="p-3.5 bg-zinc-950/40 border border-white/5 rounded-2xl flex items-center gap-3.5 text-left opacity-60"
            >
              <div className="w-10 h-10 bg-zinc-900 rounded-xl animate-pulse shrink-0" />
              <div className="space-y-2 flex-grow min-w-0">
                <div className="h-3 w-3/5 bg-zinc-900 rounded animate-pulse" />
                <div className="h-2.5 w-4/5 bg-zinc-900 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#121215]/90 border border-white/5 rounded-2xl flex items-center justify-between gap-4 animate-pulse text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-zinc-900 rounded-xl" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-3.5 w-28 bg-zinc-900 rounded" />
                <div className="h-2.5 w-40 bg-zinc-900 rounded" />
              </div>
            </div>
            <div className="h-7 w-20 bg-zinc-900 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  // Grid list skeletons for dashboard edit or overview
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-zinc-900/60 border border-white/5 rounded-2xl space-y-3 animate-pulse text-left"
          >
            <div className="w-6 h-6 bg-zinc-950 rounded-lg ml-auto" />
            <div className="h-2 w-1/3 bg-zinc-950 rounded" />
            <div className="h-4 w-2/3 bg-zinc-950 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // Default Default Card skeleton
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="border border-white/5 bg-[#121215]/90 rounded-3xl overflow-hidden animate-pulse text-left h-[330px]"
        >
          <div className="h-44 bg-zinc-900" />
          <div className="p-5 space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl shrink-0" />
              <div className="space-y-2 flex-grow min-w-0">
                <div className="h-3.5 w-1/2 bg-zinc-900 rounded" />
                <div className="h-2.5 w-3/4 bg-zinc-900 rounded" />
              </div>
            </div>
            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="h-2.5 w-5/6 bg-zinc-900 rounded" />
              <div className="h-2.5 w-3/4 bg-zinc-900 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
