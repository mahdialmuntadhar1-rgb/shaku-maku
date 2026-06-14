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
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-600/20 to-transparent rounded-full blur-2xl"></div>

      <div className="text-center space-y-3 pb-4 border-b border-white/5">
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
          {isEn ? 'Iraq’s Pulse — Saku Maku' : isKu ? 'نبزی عێراق — شەکو مەکو' : 'نبض العراق — شكو ماكو'}
        </h2>
        <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
          {isEn
            ? 'We are transforming Saku Maku from a flat local directory into Iraq’s visual business-discovery social hub.'
            : isKu
              ? 'شەکو مەکو لە پێڕستی بازرگانییەوە دەکەینە ناوەندێکی بینراوی دۆزینەوەی بازرگانی لە عێراق.'
              : 'نحوّل شكو ماكو من دليل محلي بسيط إلى منصة عراقية مرئية لاكتشاف الأعمال والخدمات.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Discover Lifestyle' : isKu ? 'شوێن و خزمەتگوزاری بدۆزەوە' : 'اكتشف الأماكن والخدمات'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn
              ? 'Browse cafés, shops, clinics, restaurants, and services with rich visual listings.'
              : isKu
                ? 'کافێ، دوکان، کلینیک، چێشتخانە و خزمەتگوزارییەکان بە شێوەیەکی جوان ببینە.'
                : 'تصفح المقاهي والمتاجر والعيادات والمطاعم والخدمات بطريقة منظمة وجذابة.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Street Pulse Feeds' : isKu ? 'فیدی ژیانی شار' : 'منشورات نبض المدينة'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn
              ? 'See announcements, offers, events, and updates posted by local businesses.'
              : isKu
                ? 'ڕاگەیاندن، ئۆفەر، ڕووداو و نوێکارییەکانی بازرگانییە ناوخۆییەکان ببینە.'
                : 'شاهد الإعلانات والعروض والفعاليات والتحديثات من أصحاب الأعمال المحليين.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Store className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Host Your Project Free' : isKu ? 'پڕۆژەکەت بەخۆڕایی زیاد بکە' : 'أضف مشروعك مجاناً'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn
              ? 'Claim your digital presence and help people discover what you offer.'
              : isKu
                ? 'بوونت لەسەر ئینتەرنێت بسەلمێنە و خەڵک بازرگانییەکەت بدۆزنەوە.'
                : 'احجز حضورك الرقمي وساعد الناس على اكتشاف خدماتك ومنتجاتك.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Proudly Local' : isKu ? 'شانازی بە ناوخۆوە' : 'بفخر محلي'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn
              ? 'Built for Baghdad, Erbil, Basra, Mosul, Sulaymaniyah, Najaf, and every governorate in Iraq.'
              : isKu
                ? 'دروستکراو بۆ بەغدا، هەولێر، بەسرە، مووسڵ، سلێمانی، نەجەف و هەموو پارێزگاکانی عێراق.'
                : 'مصمم لبغداد وأربيل والبصرة والموصل والسليمانية والنجف وكل محافظات العراق.'}
          </p>
        </div>
      </div>

      <div className="text-center pt-2">
        <span className="text-[10px] text-zinc-500 font-mono">
          Saku Maku Platform Version 3.4.0 — Made with ❤️ in Iraq
        </span>
      </div>
    </div>
  );
}
