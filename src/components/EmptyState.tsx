import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, HelpCircle, PhoneCall, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface EmptyStateProps {
  currentLang: Language;
  onSearchManually?: () => void;
  onRegisterNew?: () => void;
  title?: string;
  description?: string;
  searchBtnText?: string;
  registerBtnText?: string;
}

export default function EmptyState({
  currentLang,
  onSearchManually,
  onRegisterNew,
  title,
  description,
  searchBtnText,
  registerBtnText
}: EmptyStateProps) {
  const isRtl = currentLang === 'ar' || currentLang === 'ku';
  const [showSupport, setShowSupport] = useState<boolean>(false);

  const defaults = {
    en: {
      title: "We couldn't find your business yet",
      description: "No active phone number or spot details matched your input. You can search Saku Maku's directories manually or register a new listing right away.",
      searchBtn: "Search Manually ðŸ”",
      registerBtn: "Register New Spot ðŸš€",
      supportTitle: "Saku Maku Support Desk",
      supportDesc: "Need direct assistance with verification? Drop a message to our verification audit specialists.",
      contactWhatsApp: "Contact Support Chat"
    },
    ar: {
      title: "Ù„Ù… Ù†ØªÙ…ÙƒÙ† Ù…Ù† Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ù…Ø´Ø±ÙˆØ¹Ùƒ Ø¨Ø¹Ø¯",
      description: "Ù„Ù… ÙŠØ·Ø§Ø¨Ù‚ Ø£ÙŠ Ø±Ù‚Ù… Ù‡Ø§ØªÙ Ø£Ùˆ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø£Ù…Ø§ÙƒÙ† Ø§Ù„Ø­Ø§Ù„ÙŠØ© Ù…Ø¯Ø®Ù„Ø§ØªÙƒ. ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„Ø¨Ø­Ø« ÙÙŠ Ø³Ø¬Ù„Ø§Øª Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ ÙŠØ¯ÙˆÙŠØ§Ù‹ Ù„ØªØ«Ø¨ÙŠØª Ù…Ù„ÙƒÙŠØªÙƒØŒ Ø£Ùˆ ÙŠÙ…ÙƒÙ†Ùƒ ØªØ³Ø¬ÙŠÙ„ Ù…Ø´Ø±ÙˆØ¹ Ø¬Ø¯ÙŠØ¯ ÙÙˆØ±Ø§Ù‹.",
      searchBtn: "Ø§Ù„Ø¨Ø­Ø« ÙŠØ¯ÙˆÙŠØ§Ù‹ ÙÙŠ Ø§Ù„Ø³Ø¬Ù„ ðŸ”",
      registerBtn: "ØªØ³Ø¬ÙŠÙ„ Ù…ÙƒØ§Ù† Ø¬Ø¯ÙŠØ¯ ÙƒÙ„ÙŠØ§Ù‹ ðŸš€",
      supportTitle: "Ù…Ø±ÙƒØ² Ø¯Ø¹Ù… Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ ØªÙ„ÙŠØ¬Ø±Ø§Ù…/ÙˆØ§ØªØ³Ø§Ø¨",
      supportDesc: "Ù‡Ù„ ØªÙˆØ§Ø¬Ù‡ Ù…Ø´ÙƒÙ„Ø© ÙÙŠ ØªÙØ¹ÙŠÙ„ Ø§Ù„Ù…Ù„ÙƒÙŠØ©ØŸ ØªÙˆØ§ØµÙ„ Ù…Ø¨Ø§Ø´Ø±Ø© Ù…Ø¹ ÙØ±ÙŠÙ‚ ØªØ¯Ù‚ÙŠÙ‚ Ø§Ù„Ù‡ÙˆÙŠØ© ÙˆØªÙ†Ø´ÙŠØ· Ø§Ù„ØªÙˆØ«ÙŠÙ‚.",
      contactWhatsApp: "Ù…Ø±Ø§Ø³Ù„Ø© Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ"
    },
    ku: {
      title: "Ù†Û•Ù…Ø§Ù†ØªÙˆØ§Ù†ÛŒ Ø´ÙˆÛŽÙ†Û•Ú©Û•Øª Ø¨Ø¯Û†Ø²ÛŒÙ†Û•ÙˆÛ•",
      description: "Ù‡ÛŒÚ† Ú˜Ù…Ø§Ø±Û•ÛŒÛ•Ú©ÛŒ Ù…Û†Ø¨Ø§ÛŒÙ„ ÛŒØ§Ù† Ø´ÙˆÛŽÙ†ÛŽÚ©ÛŒ ÙÛ•Ø±Ù…ÛŒ Ù„Û•Ú¯Û•Úµ Ø¯Ø§ÙˆØ§Ú©Ø§Ø±ÛŒÛ•Ú©Û•Øª ÛŒÛ•Ú©ÛŒ Ù†Û•Ú¯Ø±ØªÛ•ÙˆÛ•. Ø¯Û•ØªÙˆØ§Ù†ÛŒØª Ø¨Û• Ø¯Ø±ÙˆØ³ØªÛŒ Ø¨Ú¯Û•Ú•ÛŽÛŒØª ÛŒØ§Ù† Ø´ÙˆÛŽÙ†ÛŒ Ù†ÙˆÛŽ ØªÛ†Ù…Ø§Ø± Ø¨Ú©Û•ÛŒØª.",
      searchBtn: "Ú¯Û•Ú•Ø§Ù†ÛŒ Ø¯Û•Ø³ØªÛŒ Ù„Û• ØªÛ†Ù…Ø§Ø±Ø¯Ø§ ðŸ”",
      registerBtn: "Ø²ÛŒØ§Ø¯Ú©Ø±Ø¯Ù†ÛŒ Ø´ÙˆÛŽÙ†ÛŒ Ù†ÙˆÛŽ ðŸš€",
      supportTitle: "Ø¨Ù†Ú©Û•ÛŒ Ù¾Ø´ØªÛŒÙˆØ§Ù†ÛŒ Ø´Ú©Ùˆ Ù…Ø§Ú©Û†",
      supportDesc: "Ù¾ÛŽÙˆÛŒØ³ØªØª Ø¨Û• ÛŒØ§Ø±Ù…Û•ØªÛŒ Ú•Ø§Ø³ØªÛ•ÙˆØ®Û† Ù‡Û•ÛŒÛ• Ø¨Û† Ù¾Ø´ØªÚ•Ø§Ø³ØªÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ØŸ Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ø¨Û• Ø¯Û•Ø³ØªÛ•ÛŒ Ù¾Ø§ÚµÙ¾Ø´ØªÛŒ Ø¦ÛŽÙ…Û•ÙˆÛ• Ø¨Ú©Û•.",
      contactWhatsApp: "Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ø¨Û• Ù¾Ø´ØªÛŒÙˆØ§Ù†ÛŒÛŒÛ•ÙˆÛ• Ø¨Ú©Û•"
    }
  }[currentLang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-6 sm:py-9 space-y-6 max-w-md mx-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Visual illustration box */}
      <div className="relative mx-auto w-16 h-16 bg-zinc-950/80 border border-white/5 rounded-3xl flex items-center justify-center text-zinc-550 shadow-sm">
        <Store className="w-8 h-8 text-zinc-500" />
        <div className="absolute top-[-5px] right-[-5px] w-5 h-5 bg-amber-500/20 text-[10px] text-amber-500 rounded-full border border-amber-500/30 flex items-center justify-center font-black">
          ?
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-black text-zinc-200 tracking-tight leading-tight">
          {title || defaults.title}
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
          {description || defaults.description}
        </p>
      </div>

      {/* Button groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans font-bold">
        {onSearchManually && (
          <button
            onClick={onSearchManually}
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-750 text-white rounded-2xl text-xs transition active:scale-97 cursor-pointer border border-white/5 truncate"
          >
            {searchBtnText || defaults.searchBtn}
          </button>
        )}

        {onRegisterNew && (
          <button
            onClick={onRegisterNew}
            className="px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-black rounded-2xl text-xs transition active:scale-97 cursor-pointer truncate"
          >
            {registerBtnText || defaults.registerBtn}
          </button>
        )}
      </div>

      <div className="border-t border-white/5 pt-4">
        <button
          onClick={() => setShowSupport(!showSupport)}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-500 font-bold hover:underline transition-all cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{currentLang === 'en' ? 'Need verification help?' : isRtl ? 'Ù‡Ù„ ØªØ­ØªØ§Ø¬ Ø¥Ù„Ù‰ Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠØŸ' : 'Ù¾ÛŽÙˆÛŒØ³ØªØª Ø¨Û• ÛŒØ§Ø±Ù…Û•ØªÛŒ Ù‡Û•ÛŒÛ•ØŸ'}</span>
        </button>

        <AnimatePresence>
          {showSupport && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 text-left overflow-hidden"
            >
              <div className="p-4 bg-zinc-950/80 border border-white/5 rounded-2xl space-y-3 font-sans">
                <h5 className="text-[11.5px] font-black text-zinc-300 uppercase flex items-center gap-1.5 font-mono">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                  <span>{defaults.supportTitle}</span>
                </h5>
                <p className="text-[10.5px] text-zinc-450 leading-relaxed">
                  {defaults.supportDesc}
                </p>

                <a
                  href="https://wa.me/9647700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 font-black text-[10.5px] uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer leading-7"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366]/10" />
                  <span>{defaults.contactWhatsApp}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
