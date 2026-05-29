import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface ClaimFlowLayoutProps {
  children: React.ReactNode;
  activeStep: 'entry' | 'phone' | 'search' | 'match' | 'otp' | 'success' | 'suspicious';
  totalSteps?: number;
  currentStepIndex?: number;
  onBack?: () => void;
  showBack?: boolean;
}

export default function ClaimFlowLayout({
  children,
  activeStep,
  totalSteps = 4,
  currentStepIndex = 1,
  onBack,
  showBack = false
}: ClaimFlowLayoutProps) {
  
  // Custom steps array
  const steps = [
    { key: 'phone', label: 'Primary Contact' },
    { key: 'match', label: 'Match Search' },
    { key: 'otp', label: 'Verification' },
    { key: 'success', label: 'Claim Synced' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Dynamic Background Premium Orbs */}
      <div className="absolute top-[-10%] left-[-15%] w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main glass card container */}
      <div className="w-full bg-[#111113]/90 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative">
        
        {/* Top Header Segment with Back buttons */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between min-h-[64px]">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[11px] font-bold text-zinc-300 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] text-zinc-550 font-mono tracking-widest font-black uppercase">
                Owner Port Facility
              </span>
            </div>
          )}

          {/* Saku Maku Crest Emblem */}
          <div className="flex items-center gap-1.5">
            <span className="text-amber-550 text-xs font-black tracking-widest">SAKU MAKU</span>
            <ShieldCheck className="w-4 h-4 text-amber-500 fill-amber-500/5" />
          </div>
        </div>

        {/* Beautiful Slim Progress Indicator */}
        {activeStep !== 'entry' && activeStep !== 'success' && activeStep !== 'suspicious' && (
          <div className="bg-zinc-950/40 px-6 py-3 border-b border-white/5 flex items-center justify-between text-[11px] font-bold text-zinc-400">
            <div className="flex gap-1 items-center">
              <span className="text-zinc-550">Onboarding Step:</span>
              <span className="text-amber-500 font-extrabold uppercase font-mono tracking-wider">{activeStep}</span>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    step <= currentStepIndex 
                      ? 'w-6 bg-gradient-to-r from-amber-500 to-orange-500' 
                      : 'w-2.5 bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content body with responsive padding */}
        <div className="p-6 sm:p-8 md:p-10 relative z-10">
          {children}
        </div>

      </div>
    </div>
  );
}
