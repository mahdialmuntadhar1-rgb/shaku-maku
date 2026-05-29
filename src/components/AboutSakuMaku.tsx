import React from 'react';
import { Sparkles, Heart, Rocket, Compass, Store, Award } from 'lucide-react';
import { Language } from '../types';

interface AboutSakuMakuProps {
  currentLang: Language;
}

export default function AboutSakuMaku({ currentLang }: AboutSakuMakuProps) {
  const isEn = currentLang === 'en';
  const isKu = currentLang === 'ku';

  return (
    <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 md:p-8 space-y-6 max-w-2xl mx-auto relative overflow-hidden">
      
      {/* Visual background lights */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-600/20 to-transparent rounded-full blur-2xl"></div>

      <div className="text-center space-y-3 pb-4 border-b border-white/5">
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
          {isEn ? 'Iraqâ€™s Pulse â€¢ Saku Maku' : isKu ? 'Ù„ÛŽØ¯Ø§Ù†ÛŒ Ø¯ÚµÛŒ Ø¹ÛŽØ±Ø§Ù‚ â€¢ Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ†' : 'Ù†Ø¨Ø¶ Ø§Ù„Ø´Ø§Ø±Ø¹ Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠ â€¢ Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ'}
        </h2>
        <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
          {isEn 
            ? 'We are transforming Saku Maku from a flat local directory into Baghdad and Kurdistanâ€™s most visual, addictive business-discovery social hub.'
            : isKu
              ? 'Ø¦ÛŽÙ…Û• Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ† Ø¯Û•Ú¯Û†Ú•ÛŒÙ† Ù„Û• Ú•ÛŽØ¨Û•Ø±ÛŒÛŒÛ•Ú©ÛŒ ÙˆØ´Ú©Û•ÙˆÛ• Ø¨Û† Ú†Ø§ÙˆÚ¯ÛŽÚ©ÛŒ Ø²ÛŒÙ†Ø¯ÙˆÙˆ Ùˆ Ø³Û•Ø±Ù†Ø¬Ú•Ø§Ú©ÛŽØ´ Ø¨Û† Ø¯Û†Ø²ÛŒÙ†Û•ÙˆÛ•ÛŒ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø´ÙˆÛŽÙ†Û•Ú©Ø§Ù†ÛŒ Ø¹ÛŽØ±Ø§Ù‚.'
              : 'Ù†Ø­Ù† Ù†ØµÙ„ Ø¨Ùƒ Ø¥Ù„Ù‰ Ø£ÙØ¶Ù„ ÙƒØ§ÙÙŠÙ‡Ø§Øª ÙˆÙ…Ø·Ø§Ø¹Ù… ÙˆØ¨ÙˆØªÙŠÙƒØ§Øª Ø§Ù„Ø¹Ø±Ø§Ù‚ Ø§Ù„Ø­Ø¨ÙŠØ¨Ø© Ø¨Ø±Ø¤ÙŠØ© Ø±Ù‚Ù…ÙŠØ© Ø¹ØµØ±ÙŠØ© ÙˆØ±ÙˆØ­ Ù…Ø³ØªÙˆØ­Ø§Ø© Ù…Ù† Ø§Ù„Ø¥Ù†Ø³ØªØºØ±Ø§Ù… ÙˆØ§Ù„ØªÙŠÙƒ ØªÙˆÙƒ.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Discover Lifestyle' : isKu ? 'Ø´ÛŽÙˆØ§Ø²ÛŒ Ú˜ÛŒØ§Ù† Ø¨Ø¯Û†Ø²Û•Ø±Û•ÙˆÛ•' : 'Ø§ÙƒØªØ´Ù Ø§Ù„Ù†Ù…Ø· Ø§Ù„Ø¹ØµØ±ÙŠ'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'Browse places emotionally. Every cafÃ©, boutique or spa is listed with live visual indicators, reviews, and interactive directions.'
              : isKu
                ? 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø´ÙˆÛŽÙ†Û•Ú©Ø§Ù† Ø¨Û† Ø®Û†Ø´ÛŒ Ùˆ Ø¦Ø§Ø±Ø§Ù…Ú¯Ø±ØªÙ† Ù‡Û•ÚµØ¨Ú˜ÛŽØ±Û•ØŒ Ø¨Û• Ù†Ù…Ø±Û•ÛŒ Ú¯Û•Ø´ØªÛŒØ§Ø±Ø§Ù† Ùˆ Ù¾ÛŽØ´Ù†ÛŒØ§Ø±Û•Ú©Ø§Ù†ÛŒØ§Ù†.'
                : 'ØªØµÙØ­ Ø§Ù„Ø£Ù…Ø§ÙƒÙ† Ø¨Ù…ØªØ¹Ø© Ø§Ù„Ø´ØºÙ ÙˆØ§Ù„Ù…Ø¸Ù‡Ø± Ø§Ù„Ø³ÙŠÙ†Ù…Ø§Ø¦ÙŠ Ø§Ù„Ø¬Ù…ÙŠÙ„ØŒ Ù…Ø¹ ØµÙˆØ± Ø­ÙŠØ© ÙˆØ§Ø³ØªØ¹Ø±Ø§Ø¶ Ø­ÙŠ ÙˆÙ…ÙƒØ§Ù„Ù…Ø§Øª Ù…Ø¨Ø§Ø´Ø±Ø©.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Street Pulse Feeds' : isKu ? 'ØªÛ†Ú•ÛŒ Ú©Û†Ù…Û•ÚµØ§ÛŒÛ•ØªÛŒ Ø²ÛŒÙ†Ø¯ÙˆÙˆ' : 'Ø§Ù„ÙÙŠØ¯ ÙˆØ§Ù„Ø³ØªÙˆØ±ÙŠØ§Øª Ø§Ù„Ø­ÙŠØ©'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'See announcements, discounts, event schedules, and seasonal campaigns posted directly by verified Iraqi merchant souls.'
              : isKu
                ? 'Ø¬ÙˆØ§Ù†ØªØ±ÛŒÙ† Ù¾Ú•Û†Ù…Û†Ø´Ù† Ùˆ Ø¦Û†ÙÛ•Ø±ÛŒ Ø¨Û•Ø±Ø¯Û•Ø³Øª Ø¨Ø¨ÛŒÙ†ÛŒØŒ Ú©Û• Ú•Ø§Ø³ØªÛ•ÙˆØ®Û† Ù„Û•Ù„Ø§ÛŒÛ•Ù† Ø®Ø§ÙˆÛ•Ù† Ú©Ø§Ø±Û•Ú©Ø§Ù†Û•ÙˆÛ• Ø¯Ø§Ø¯Û•Ù†Ø±ÛŽÙ†.'
                : 'Ø§Ø·Ù„Ø¹ Ø¹Ù„Ù‰ Ø£Ø­Ø¯Ø« Ø§Ù„Ø¹Ø±ÙˆØ¶ ÙˆØ§Ù„Ø³ØªÙˆØ±ÙŠØ§Øª Ø§Ù„Ù…Ù†Ø´ÙˆØ±Ø© ÙÙˆØ±Ø§Ù‹ Ø¨ÙˆØ§Ø³Ø·Ø© Ø±ÙˆØ§Ø¯ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠÙŠÙ† ÙˆØ£ØµØ­Ø§Ø¨ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Store className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Host Your Project Free' : isKu ? 'Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù¾Ú•Û†Ú˜Û•Ú©Û•Øª Ø¯Ø§Ø¨Ù†ÛŽ' : 'Ø§Ù†Ø´Ø± Ù…Ø´Ø±ÙˆØ¹Ùƒ Ù…Ø¬Ø§Ù†Ø§Ù‹'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'Claim your digital presence and let our local Iraqi community discover your specialties. No charges, no corporate setups.'
              : isKu
                ? 'Ø´ÙˆÛŽÙ†Ú©Û•ÙˆØªÙˆÙˆ Ùˆ Ù…ÙˆØ´ØªÛ•Ø±ÛŒ Ø²ÛŒØ§ØªØ± Ù¾Û•ÛŒØ¯Ø§ Ø¨Ú©Û• Ù„Û• Ú•ÛŽÚ¯Û•ÛŒ Ø¨ÚµØ§ÙˆÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ú©Ø§Ø±Û•Ú©Û•Øª Ú˜ÛŽØ± Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ†.'
                : 'Ø±ÙˆÙ‘Ø¬ Ù„Ù…Ø·Ø¹Ù…ÙƒØŒ ÙƒØ§ÙÙŠÙ‡Ùƒ Ø£Ùˆ ØµÙŠØ¯Ù„ÙŠØªÙƒ Ø¨Ø§Ù„Ù…Ø¬Ø§Ù† Ø¯ÙˆÙ† Ø£ÙŠ ØªÙƒØ§Ù„ÙŠÙ ÙˆÙ…ÙˆØ§ÙÙ‚Ø§Øª Ø¨ÙŠØ±ÙˆÙ‚Ø±Ø§Ø·ÙŠØ© ÙˆØ¹Ù‚ÙŠÙ…Ø©.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Proudly Local' : isKu ? 'Ø´Ø§Ù†Ø§Ø²ÛŒ Ø¯Û•Ú©Û•ÛŒÙ† Ø¨Û• Ù„Û†Ú©Ø§Úµ Ø¨ÙˆÙˆÙ†' : 'Ù…Ø­Ù„ÙŠ Ø¨ÙØ®Ø± ÙˆØ§Ø¹ØªØ²Ø§Ø²'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'Supporting Baghdad, Erbil, Basra, Mosul, Sulaymaniyah, Najaf and every governorate in Iraq under a unified aesthetic.'
              : isKu
                ? 'Ù¾Ø´ØªÛŒÙˆØ§Ù†ÛŒÚ©Ø±Ø¯Ù†ÛŒ Ù‡Û•Ù…ÙˆÙˆ Ú¯Û•Ù†Ø¬Ø§Ù†ÛŒ Ø¹ÛŽØ±Ø§Ù‚ Ø¨Û• Ø²Ù…Ø§Ù†Û•Ú©Ø§Ù†ÛŒ Ú©ÙˆØ±Ø¯ÛŒØŒ Ø¹Û•Ø±Û•Ø¨ÛŒ Ùˆ Ø¦ÛŒÙ†Ú¯Ù„ÛŒØ²ÛŒ.'
                : 'Ù†Ø¯Ø¹Ù… Ø±ÙˆØ§Ø¯ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠÙŠÙ† ÙÙŠ Ø¨ØºØ¯Ø§Ø¯ØŒ Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø§Ù„Ø¨ØµØ±Ø©ØŒ Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©ØŒ Ø§Ù„Ù…ÙˆØµÙ„ ÙˆØ§Ù„Ù†Ø¬Ù Ø¨Ù†ÙØ³ Ø§Ù„Ø±ÙˆØ­ Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© ÙˆØ§Ù„ÙƒØ±Ø¯ÙŠØ© Ø§Ù„Ø¬Ù…ÙŠÙ„Ø©.'}
          </p>
        </div>

      </div>

      <div className="text-center pt-2">
        <span className="text-[10px] text-zinc-500 font-mono">
          Saku Maku Platform Version 3.4.0 â€¢ Made with â¤ï¸ in Iraq
        </span>
      </div>

    </div>
  );
}
