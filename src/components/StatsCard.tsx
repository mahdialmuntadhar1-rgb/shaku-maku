import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Sparkles } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  percentage?: string;
  isPositive?: boolean;
  subText?: string;
  icon: React.ComponentType<any>;
  chartColor?: string;
  chartPathPoints?: string; // e.g. "M0,45 Q15,10 30,30 T60,5 T90,20 T120,5 T150,30"
}

export default function StatsCard({
  title,
  value,
  percentage,
  isPositive = true,
  subText,
  icon: IconComponent,
  chartColor = '#F59E0B',
  chartPathPoints = 'M 0 35 C 20 10, 40 40, 60 20 C 80 5, 100 15, 120 10'
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-5 bg-[#121215]/90 border border-white/5 rounded-3xl relative overflow-hidden text-left"
    >
      {/* Top Background Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-2xl pointer-events-none" />

      {/* Title Header Block */}
      <div className="flex items-center justify-between gap-2.5">
        <span className="text-[10px] text-zinc-500 font-extrabold tracking-widest uppercase font-mono truncate">
          {title}
        </span>
        <div className="w-8 h-8 rounded-xl bg-zinc-950/80 border border-white/5 flex items-center justify-center text-zinc-400 shrink-0">
          <IconComponent className="w-4 h-4 text-zinc-400" />
        </div>
      </div>

      {/* Main Stats Value */}
      <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-black text-white tracking-tight leading-none">
          {value}
        </span>
        {percentage && (
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-md ${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
          }`}>
            <span>{isPositive ? '+' : '-'}</span>
            <span>{percentage}</span>
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
          </span>
        )}
      </div>

      {/* Subtext and mini sparklines chart */}
      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-4 font-sans text-[11px] text-zinc-450 leading-relaxed font-semibold">
        {subText ? (
          <span className="truncate max-w-[120px]">{subText}</span>
        ) : (
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Active growth</span>
          </span>
        )}

        {/* Beautiful vector chart sparks */}
        <div className="w-20 h-7 overflow-visible opacity-80 shrink-0 select-none">
          <svg className="w-full h-full" viewBox="0 0 120 40" fill="none" preserveAspectRatio="none">
            {/* Linear Gradient for Chart Underlay */}
            <defs>
              <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity="0.15" />
                <stop offset="100%" stopColor={chartColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled sparkline area */}
            <path
              d={`${chartPathPoints} L 120 40 L 0 40 Z`}
              fill={`url(#grad-${title.replace(/\s+/g, '')})`}
            />

            {/* Stroke path */}
            <path
              d={chartPathPoints}
              stroke={chartColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

    </motion.div>
  );
}
