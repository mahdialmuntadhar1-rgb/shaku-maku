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
          {isEn ? 'Iraq’s Pulse • Saku Maku' : isKu ? 'لێدانی دڵی عێراق • ساكۆ ماكۆ' : 'نبض الشارع العراقي • شكو ماكو'}
        </h2>
        <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
          {isEn 
            ? 'We are transforming Saku Maku from a flat local directory into Baghdad and Kurdistan’s most visual, addictive business-discovery social hub.'
            : isKu
              ? 'ئێمە ساكۆ ماكۆ دەگۆڕین لە ڕێبەرییەکی وشکەوە بۆ چاوگێکی زیندوو و سەرنجڕاکێش بۆ دۆزینەوەی باشترین شوێنەکانی عێراق.'
              : 'نحن نصل بك إلى أفضل كافيهات ومطاعم وبوتيكات العراق الحبيبة برؤية رقمية عصرية وروح مستوحاة من الإنستغرام والتيك توك.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Discover Lifestyle' : isKu ? 'شێوازی ژیان بدۆزەرەوە' : 'اكتشف النمط العصري'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'Browse places emotionally. Every cafÃ©, boutique or spa is listed with live visual indicators, reviews, and interactive directions.'
              : isKu
                ? 'باشترین شوێنەکان بۆ خۆشی و ئارامگرتن هەڵبژێرە، بە نمرەی گەشتیاران و پێشنیارەکانیان.'
                : 'تصفح الأماكن بمتعة الشغف والمظهر السينمائي الجميل، مع صور حية واستعراض حي ومكالمات مباشرة.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Street Pulse Feeds' : isKu ? 'تۆڕی کۆمەڵایەتی زیندوو' : 'الفيد والستوريات الحية'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'See announcements, discounts, event schedules, and seasonal campaigns posted directly by verified Iraqi merchant souls.'
              : isKu
                ? 'جوانترین پڕۆمۆشن و ئۆفەری بەردەست ببینی، کە ڕاستەوخۆ لەلایەن خاوەن کارەکانەوە دادەنرێن.'
                : 'اطلع على أحدث العروض والستوريات المنشورة فوراً بواسطة رواد الأعمال العراقيين وأصحاب المشاريع.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Store className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Host Your Project Free' : isKu ? 'بێبەرامبەر پڕۆژەکەت دابنێ' : 'انشر مشروعك مجاناً'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'Claim your digital presence and let our local Iraqi community discover your specialties. No charges, no corporate setups.'
              : isKu
                ? 'شوێنکەوتوو و موشتەری زیاتر پەیدا بکە لە ڕێگەی بڵاوکردنەوەی کارەکەت ژێر چاودێری ساكۆ ماكۆ.'
                : 'روّج لمطعمك، كافيهك أو صيدليتك بالمجان دون أي تكاليف وموافقات بيروقراطية وعقيمة.'}
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEn ? 'Proudly Local' : isKu ? 'شانازی دەکەین بە لۆکاڵ بوون' : 'محلي بفخر واعتزاز'}
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {isEn 
              ? 'Supporting Baghdad, Erbil, Basra, Mosul, Sulaymaniyah, Najaf and every governorate in Iraq under a unified aesthetic.'
              : isKu
                ? 'پشتیوانیکردنی هەموو گەنجانی عێراق بە زمانەکانی کوردی، عەرەبی و ئینگلیزی.'
                : 'ندعم رواد الأعمال العراقيين في بغداد، أربيل، البصرة، السليمانية، الموصل والنجف بنفس الروح العربية والكردية الجميلة.'}
          </p>
        </div>

      </div>

      <div className="text-center pt-2">
        <span className="text-[10px] text-zinc-500 font-mono">
          Saku Maku Platform Version 3.4.0 • Made with ❤️ in Iraq
        </span>
      </div>

    </div>
  );
}
