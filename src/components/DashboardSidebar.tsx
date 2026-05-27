import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, LayoutDashboard, Edit3, Image, Flame, Contact, BarChart3, LogOut, ArrowLeft 
} from 'lucide-react';
import { Language } from '../types';

export type DashboardTab = 'overview' | 'edit_profile' | 'media' | 'social_feed' | 'contact' | 'analytics';

interface DashboardSidebarProps {
  currentLang: Language;
  activeTab: DashboardTab;
  onChangeTab: (tab: DashboardTab) => void;
  onExitDashboard?: () => void;
}

export default function DashboardSidebar({
  currentLang,
  activeTab,
  onChangeTab,
  onExitDashboard
}: DashboardSidebarProps) {
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const menuItems = [
    { key: 'overview', icon: LayoutDashboard, label: { en: 'Dashboard Overview', ar: 'نظرة عامة على النشاط', ku: 'تێڕوانینی گشتی' } },
    { key: 'edit_profile', icon: Edit3, label: { en: 'Edit Business Profile', ar: 'تعديل بيانات النشاط', ku: 'دەستکاریکردنی زانیاری' } },
    { key: 'media', icon: Image, label: { en: 'Photos & Covering', ar: 'معرض الألبوم وصور الغلاف', ku: 'البوم و وێنەکان' } },
    { key: 'social_feed', icon: Flame, label: { en: 'Live Community Offers', ar: 'بث العروض والمنشورات', ku: 'بڵاوکردنەوەی ئۆفەر' } },
    { key: 'contact', icon: Contact, label: { en: 'Contact Channels', ar: 'قنوات واتساب والاتصال', ku: 'هێڵەکانی پەیوەندی' } },
    { key: 'analytics', icon: BarChart3, label: { en: 'HQ Views Analytics', ar: 'إحصائيات المشاهدات والنمو', ku: 'ئامارەکانی بینین' } },
  ] as const;

  return (
    <div className="w-full flex flex-col gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Back to lobby button for premium operations */}
      {onExitDashboard && (
        <button
          onClick={onExitDashboard}
          className="flex items-center gap-2 px-4 py-3 bg-zinc-950/80 hover:bg-zinc-900 border border-white/5 rounded-2xl text-xs font-black text-zinc-300 transition-all cursor-pointer w-full text-left"
        >
          <ArrowLeft className={`w-4 h-4 text-zinc-400 ${isRtl ? 'rotate-180' : ''}`} />
          <span>
            {currentLang === 'en' ? 'Back to Discovery Lobby' : isRtl ? 'الرجوع إلى صفحة الاستكشاف' : 'گەڕانەوە بۆ لۆبی'}
          </span>
        </button>
      )}

      {/* Desktop view menu list */}
      <div className="hidden lg:flex flex-col gap-1 bg-[#141416]/90 border border-white/5 p-3 rounded-3xl text-xs font-semibold">
        {menuItems.map(item => {
          const IconComp = item.icon;
          const isActive = activeTab === item.key;
          
          return (
            <button
              key={item.key}
              onClick={() => onChangeTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all cursor-pointer font-extrabold text-[12px] text-left ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                  : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-500 bg-transparent' : 'text-zinc-500 bg-transparent'}`} />
              <span className="truncate">{item.label[currentLang] || item.label.en}</span>
              
              {item.key === 'social_feed' && (
                <span className="ml-auto bg-orange-600 text-white text-[8px] px-1.5 py-0.5 rounded font-mono font-black uppercase animate-pulse shrink-0">
                  LIVE
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile view top scroll ribbon */}
      <div className="flex lg:hidden overflow-x-auto whitespace-nowrap gap-2 pb-1.5 custom-scrollbar px-1" dir={isRtl ? 'rtl' : 'ltr'}>
        {menuItems.map(item => {
          const IconComp = item.icon;
          const isActive = activeTab === item.key;
          
          return (
            <button
              key={item.key}
              onClick={() => onChangeTab(item.key)}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                  : 'bg-zinc-950/60 border-white/5 text-zinc-400'
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span>{item.label[currentLang] || item.label.en}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
