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
      searchBtn: "Search Manually 🔍",
      registerBtn: "Register New Spot 🚀",
      supportTitle: "Saku Maku Support Desk",
      supportDesc: "Need direct assistance with verification? Drop a message to our verification audit specialists.",
      contactWhatsApp: "Contact Support Chat"
    },
    ar: {
      title: "لم نتمكن من العثور على مشروعك بعد",
      description: "لم يطابق أي رقم هاتف أو تفاصيل الأماكن الحالية مدخلاتك. يمكنك البحث في سجلات شكو ماكو يدوياً لتثبيت ملكيتك، أو يمكنك تسجيل مشروع جديد فوراً.",
      searchBtn: "البحث يدوياً في السجل 🔍",
      registerBtn: "تسجيل مكان جديد كلياً 🚀",
      supportTitle: "مركز دعم شكو ماكو تليجرام/واتساب",
      supportDesc: "هل تواجه مشكلة في تفعيل الملكية؟ تواصل مباشرة مع فريق تدقيق الهوية وتنشيط التوثيق.",
      contactWhatsApp: "مراسلة الدعم الفني"
    },
    ku: {
      title: "نەمانتوانی شوێنەکەت بدۆزینەوە",
      description: "هیچ ژمارەیەکی مۆبایل یان شوێنێکی فەرمی لەگەڵ داواکاریەکەت یەکی نەگرتەوە. دەتوانیت بە دروستی بگەڕێیت یان شوێنی نوێ تۆمار بکەیت.",
      searchBtn: "گەڕانی دەستی لە تۆماردا 🔍",
      registerBtn: "زیادکردنی شوێنی نوێ 🚀",
      supportTitle: "بنکەی پشتیوانی شکو ماکۆ",
      supportDesc: "پێویستت بە یارمەتی ڕاستەوخۆ هەیە بۆ پشتڕاستکردنەوە؟ پەیوەندی بە دەستەی پاڵپشتی ئێمەوە بکە.",
      contactWhatsApp: "پەیوەندی بە پشتیوانییەوە بکە"
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
          <span>{currentLang === 'en' ? 'Need verification help?' : isRtl ? 'هل تحتاج إلى مساعدة الدعم الفني؟' : 'پێویستت بە یارمەتی هەیە؟'}</span>
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
