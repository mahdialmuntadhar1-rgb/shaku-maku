import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  { id: '1', image: 'https://picsum.photos/id/104/1920/600', title: 'اكتشف العراق', subtitle: 'أفضل المتاجر والخدمات', buttonText: 'استكشف', buttonLink: '/businesses' },
  { id: '2', image: 'https://picsum.photos/id/106/1920/600', title: 'دعم المحلي', subtitle: 'رواد أعمال عراقيون', buttonText: 'اعرف أكثر', buttonLink: '/about' }
];

interface EditableHeroProps {
  currentLang: string;
}

export const EditableHero: React.FC<EditableHeroProps> = ({ currentLang }) => {
  const { isAdmin } = useAdmin();
  const [slides, setSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('hero_slides');
    return saved ? JSON.parse(saved) : DEFAULT_SLIDES;
  });
  const [editing, setEditing] = useState(false);

  const saveToLocal = (newSlides: HeroSlide[]) => {
    setSlides(newSlides);
    localStorage.setItem('hero_slides', JSON.stringify(newSlides));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, slideId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSlides = slides.map(s =>
          s.id === slideId ? { ...s, image: reader.result as string } : s
        );
        saveToLocal(newSlides);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSlide = (id: string, field: keyof HeroSlide, value: string) => {
    const newSlides = slides.map(s => s.id === id ? { ...s, [field]: value } : s);
    saveToLocal(newSlides);
  };

  const addSlide = () => {
    const newId = Date.now().toString();
    const newSlide: HeroSlide = { id: newId, image: '', title: 'عنوان جديد', buttonText: 'اقرأ المزيد', buttonLink: '#' };
    saveToLocal([...slides, newSlide]);
  };

  const deleteSlide = (id: string) => {
    saveToLocal(slides.filter(s => s.id !== id));
  };

  if (editing && isAdmin) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">تحرير السلايدر</h3>
          <div className="space-x-2">
            <button onClick={addSlide} className="bg-green-600 text-white px-3 py-1 rounded">+ إضافة شريحة</button>
            <button onClick={() => setEditing(false)} className="bg-gray-600 text-white px-3 py-1 rounded">إنهاء التحرير</button>
          </div>
        </div>
        {slides.map(slide => (
          <div key={slide.id} className="border p-3 rounded bg-white space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">شريحة {slide.id}</span>
              <button onClick={() => deleteSlide(slide.id)} className="text-red-600 text-sm">حذف</button>
            </div>
            <div>
              <label className="block text-sm">الصورة</label>
              {slide.image && <img src={slide.image} className="h-32 object-cover mb-1" alt="preview" />}
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, slide.id)} />
            </div>
            <input value={slide.title} onChange={(e) => updateSlide(slide.id, 'title', e.target.value)} className="border p-1 w-full" placeholder="العنوان" />
            <input value={slide.subtitle || ''} onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)} className="border p-1 w-full" placeholder="النص الفرعي" />
            <input value={slide.buttonText || ''} onChange={(e) => updateSlide(slide.id, 'buttonText', e.target.value)} className="border p-1 w-full" placeholder="نص الزر" />
            <input value={slide.buttonLink || ''} onChange={(e) => updateSlide(slide.id, 'buttonLink', e.target.value)} className="border p-1 w-full" placeholder="رابط الزر" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {isAdmin && (
        <button onClick={() => setEditing(true)} className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded z-10 text-sm">
          ✏️ تعديل السلايدر
        </button>
      )}
      <div className="carousel-container overflow-hidden relative">
        <div className="flex transition-transform duration-500">
          {slides.map(slide => (
            <div key={slide.id} className="min-w-full relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                {slide.subtitle && <p className="text-xl mb-4">{slide.subtitle}</p>}
                {slide.buttonText && (
                  <a href={slide.buttonLink} className="bg-emerald-600 px-6 py-2 rounded-full hover:bg-emerald-700">
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
