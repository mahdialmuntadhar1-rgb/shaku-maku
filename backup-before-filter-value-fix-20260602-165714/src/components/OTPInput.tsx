import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MessageSquare, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface OTPInputProps {
  currentLang: Language;
  phoneWithCountry: string;
  onVerify: (otpCode: string) => void;
  onBack: () => void;
  simulationCode?: string;
}

export default function OTPInput({
  currentLang,
  phoneWithCountry,
  onVerify,
  onBack,
  simulationCode = '123456'
}: OTPInputProps) {
  const isRtl = currentLang === 'ar' || currentLang === 'ku';
  
  // 6 digit code inputs
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState<number>(59);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Focus refs
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Count down resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    // Only permit digits
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    const valueChar = cleanValue.substring(cleanValue.length - 1);
    const newOtp = [...otp];
    newOtp[index] = valueChar;
    setOtp(newOtp);

    // Autofocus next field
    if (index < 5 && valueChar) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').substring(0, 6);
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      
      // Focus on the last filled or next empty field
      const focusIndex = Math.min(pasteData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorText(
        currentLang === 'en' 
          ? 'Please enter the complete 6-digit code' 
          : currentLang === 'ku'
          ? 'تکایە کۆدی ٦ ژمارەیی بەڕێکی بنووسە'
          : 'يرجى إدخال الرمز المكون من 6 أرقام كاملاً'
      );
      return;
    }
    setErrorText(null);
    onVerify(code);
  };

  const handleResend = () => {
    if (resendTimer > 0 || isResending) return;
    setIsResending(true);
    setOtp(['', '', '', '', '', '']);
    
    setTimeout(() => {
      setIsResending(false);
      setResendTimer(59);
      setErrorText(null);
      inputRefs.current[0]?.focus();
    }, 800);
  };

  const t = {
    en: {
      header: 'Enter Verification Code',
      sub: `We've sent a 6-digit claim validation key to ${phoneWithCountry} via Saku Maku channels.`,
      label: 'Security Verification',
      resendCode: 'Resend verification key',
      changePhone: 'Change phone number',
      indicator: 'Secure verification channel active',
      submitBtn: 'Verify Code & Unlock Control 🔓',
      codeAlert: 'SIMULATION SANDBOX PASSCODE IS:',
    },
    ar: {
      header: 'أدخل رمز التحقق الأمني',
      sub: `لقد أرسلنا رمز موافقة إثبات الملكية المكون من 6 أرقام إلى ${phoneWithCountry} عبر شريحة واتساب/رسائل النوافذ.`,
      label: 'تأكيد أمني',
      resendCode: 'إعادة إرسال رمز التحقق التجريبي',
      changePhone: 'تغيير رقم الهاتف',
      indicator: 'قناة التحقق المشفرة نشطة',
      submitBtn: 'تأكيد الرمز وفتح لوحة التحكم 🔓',
      codeAlert: 'رمز التحقق التجريبي الفعال هو:',
    },
    ku: {
      header: 'کۆدی پشتڕاستکردنەوە بنووسە',
      sub: `ئێمە کۆدی دڵنیابوونەوەی ٦ ژمارەییمان نارد بۆ ${phoneWithCountry} لە ڕێگەی نامەی مۆبایلەوە.`,
      label: 'پشتڕاستکردنەوەی پاراستن',
      resendCode: 'دوبارە ناردنەوەی کۆد',
      changePhone: 'گۆڕینی ژمارەی مۆبایل',
      indicator: 'هێڵی دڵنیابوونەوەی پارێزراو چالاکە',
      submitBtn: 'پشتڕاستکردنەوەی کۆد و چوونەژوورەوە 🔓',
      codeAlert: 'کۆدی تاقیکردنەوەی سەرکەوتوو بریتییە لە:',
    }
  }[currentLang];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 text-center max-w-md mx-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Visual Identity Logo */}
      <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-amber-500/25 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-sm">
        <ShieldCheck className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] text-amber-500 tracking-wider font-extrabold uppercase font-mono block">
          {t.label}
        </span>
        <h4 className="text-lg font-black text-white tracking-tight">
          {t.header}
        </h4>
        <p className="text-xs text-zinc-400 leading-normal max-w-sm mx-auto">
          {t.sub}
        </p>
      </div>

      {/* Verification Code Box Callout */}
      <div className="p-3.5 bg-zinc-950/80 border border-white/5 rounded-2xl flex items-center gap-2 justify-center">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
        <span className="text-[10.5px] text-zinc-300 font-bold">
          {t.codeAlert} <span className="font-mono text-amber-400 font-black text-xs tracking-wider bg-white/5 py-0.5 px-2 rounded ml-1">{simulationCode}</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Key codes grids */}
        <div className="flex items-center justify-center gap-3 py-1.5" dir="ltr">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => { inputRefs.current[idx] = el as HTMLInputElement; }}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className={`w-11 h-14 bg-zinc-950 text-white rounded-2xl text-center text-xl font-bold font-mono focus:outline-none transition-all border ${
                digit 
                  ? 'border-amber-500 ring-2 ring-amber-500/10' 
                  : 'border-white/10 hover:border-white/20 focus:border-zinc-500'
              }`}
            />
          ))}
        </div>

        {/* Dynamic Alerts */}
        <AnimatePresence>
          {errorText && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2 justify-center"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions bar for change/resend */}
        <div className="flex items-center justify-between text-[11.5px] font-bold font-sans px-2 text-zinc-400">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || isResending}
            className="text-amber-500 hover:text-amber-400 hover:underline transition-all disabled:opacity-45 disabled:hover:no-underline cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>
              {resendTimer > 0 ? `${t.resendCode} (${resendTimer}s)` : t.resendCode}
            </span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer"
          >
            {t.changePhone}
          </button>
        </div>

        {/* Submit action triggering verifying OTP */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg active:scale-98 cursor-pointer"
        >
          {t.submitBtn}
        </button>

      </form>

      {/* Secondary trust footer indicator */}
      <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-550 font-mono">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>{t.indicator}</span>
      </div>
    </motion.div>
  );
}
