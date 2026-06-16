import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, UploadCloud, Trash2, CheckCircle2, AlertCircle, FileText, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface MediaUploaderProps {
  currentLang: Language;
  images: string[];
  onAddImage: (url: string) => void;
  onRemoveImage: (url: string) => void;
}

export default function MediaUploader({
  currentLang,
  images,
  onAddImage,
  onRemoveImage
}: MediaUploaderProps) {
  const isRtl = currentLang === 'ar' || currentLang === 'ku';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const t = {
    en: {
      dragTitle: 'Drag & drop photos here, or click to browse',
      dragSub: 'Supports JPEG, PNG, or WebP (max 8MB per file)',
      activeUpload: 'Uploading media buffer...',
      uploadFinished: 'Photo added to business manager successfully!',
      mockImageLabel: 'Or paste image URL directly:',
      pastePlaceholder: 'https://images.unsplash.com/photo-example...',
      addUrlBtn: 'Link Photo Asset',
      listTitle: 'Gallery Catalog & Photos',
      emptyGrid: 'No gallery photos uploaded yet. Drag photos above to populate catalog!'
    },
    ar: {
      dragTitle: 'انقر هنا لتصفح ملفاتك، أو اسحب الصور للإفلات',
      dragSub: 'يدعم صيغ JPG، PNG، WebP لغاية 8 ميغابايت لكل ملف',
      activeUpload: 'جاري رفع الملف...',
      uploadFinished: 'تمت إضافة الصورة بنجاح إلى سجل معرض الصور الخاص بك!',
      mockImageLabel: 'أو صنف رابط صورة بالإنترنت مباشرة:',
      pastePlaceholder: 'https://images.unsplash.com/photo-example...',
      addUrlBtn: 'ربط رابط ملف الصورة',
      listTitle: 'ألبوم صور المشروع وتصنيفاتها',
      emptyGrid: 'معرض صورك فارغ حالياً. قم برفع صور ممتازة لإبهار الزوار والعملاء!'
    },
    ku: {
      dragTitle: 'کۆپی کردن یان ناردنی وێنە لێرە',
      dragSub: 'پشتیوانی JPG، PNG، یان WebP دەکات تا لایەنی زۆر ٨ مێگابایت',
      activeUpload: 'بارکردنی وێنە لە سیستەمدا...',
      uploadFinished: 'وێنەکە بە سەرکەوتوویی زیادکرا بۆ ناو پیشانگاکەت!',
      mockImageLabel: 'یان بەستەری ناونیشانی وێنە بنووسە لێرە:',
      pastePlaceholder: 'https://images.unsplash.com/photo-example...',
      addUrlBtn: 'گرێدانی بەستەر',
      listTitle: 'پێشانگای وێنەکان',
      emptyGrid: 'هیچ وێنەیەک لە پیشانگاکەدا نییە. وێنە بەرز بکەرەوە تا پێشانگا گەشە بکات!'
    }
  }[currentLang];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Simulated files reader
  const simulateUpload = (fileName: string) => {
    setIsUploading(true);
    setUploadPercent(10);
    setErrorText(null);

    const interval = setInterval(() => {
      setUploadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Generate a gorgeous random unsplash photo matching the business
          const mockImages = [
            'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
          ];
          const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
          
          onAddImage(randomImg);
          setIsUploading(false);
          setPreviewURL(null);
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        setErrorText(currentLang === 'en' ? 'Only image files are allowed!' : 'الصيغ المدعومة هي الصور فقط!');
        return;
      }
      setPreviewURL(URL.createObjectURL(file));
      simulateUpload(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewURL(URL.createObjectURL(file));
      simulateUpload(file.name);
    }
  };

  const [pasteURL, setPasteURL] = useState<string>('');
  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteURL.trim().startsWith('http')) {
      setErrorText(currentLang === 'en' ? 'Please enter a valid image URL link!' : 'يرجى إدخال رابط صورة إنترنت فني صالح!');
      return;
    }
    setErrorText(null);
    onAddImage(pasteURL.trim());
    setPasteURL('');
  };

  return (
    <div className="space-y-6 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Drag outer zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3.5 relative overflow-hidden ${
          isDragging
            ? 'border-amber-500 bg-amber-500/5 ring-4 ring-amber-500/10'
            : 'border-white/10 hover:border-white/15 bg-zinc-950/40 hover:bg-zinc-950/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 w-full max-w-xs flex flex-col items-center py-2"
            >
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              <div className="space-y-1.5 w-full text-center">
                <span className="text-xs font-black text-white block">{t.activeUpload}</span>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                    animate={{ width: `${uploadPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[10px] text-zinc-550 font-mono tracking-wide block">{uploadPercent}% upload complete</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                <UploadCloud className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="space-y-1 text-center">
                <h4 className="text-xs font-black text-white leading-tight">
                  {t.dragTitle}
                </h4>
                <p className="text-[10.5px] text-zinc-500 font-medium">
                  {t.dragSub}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {previewURL && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-xl relative animate-pulse">
              <img src={previewURL} alt="Local preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Manual paste file field */}
      <form onSubmit={handleLinkSubmit} className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-2 text-xs font-semibold">
        <label className="text-zinc-400 block font-bold">{t.mockImageLabel}</label>
        <div className="flex gap-2.5">
          <input
            type="url"
            value={pasteURL}
            onChange={(e) => setPasteURL(e.target.value)}
            placeholder={t.pastePlaceholder}
            className="flex-1 bg-zinc-950 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono text-xs font-medium"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold shrink-0 transition"
          >
            {t.addUrlBtn}
          </button>
        </div>

        {errorText && (
          <p className="text-red-400 text-[10.5px] flex items-center gap-1 font-bold pt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorText}</span>
          </p>
        )}
      </form>

      {/* Grid listing */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5 font-sans">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <span>{t.listTitle} ({images.length})</span>
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.length === 0 ? (
              <div className="col-span-full py-8 text-center text-zinc-550 text-xs font-semibold bg-zinc-950/25 border border-white/5 rounded-2xl p-4">
                {t.emptyGrid}
              </div>
            ) : (
              images.map((url, idx) => (
                <motion.div
                  key={url + '-' + idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -3 }}
                  className="group relative aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-md h-24"
                >
                  <img src={url} alt={`Gallery item ${idx}`} className="w-full h-full object-cover font-sans" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onRemoveImage(url)}
                      className="p-2 bg-red-650 hover:bg-red-600 border border-red-500/20 text-white rounded-xl transition cursor-pointer"
                      title="Delete profile picture"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {idx === 0 && (
                    <span className="absolute bottom-1 right-1 bg-amber-500 text-black px-1.5 py-0.5 rounded text-[8px] font-black uppercase font-mono tracking-wider">
                      COVER PHOTO
                    </span>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
