import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

interface AddBusinessFormProps {
  currentLang: Language;
  onClose: () => void;
  onBusinessAdded?: () => void;
}

const AddBusinessForm: React.FC<AddBusinessFormProps> = ({ currentLang, onClose, onBusinessAdded }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('This feature is temporarily disabled. Please use admin panel later.');
    setTimeout(() => {
      setLoading(false);
      if (onBusinessAdded) onBusinessAdded();
      onClose();
    }, 2000);
  };

  const t = (en: string, ar: string, ku: string) => {
    if (currentLang === 'ar') return ar;
    if (currentLang === 'ku') return ku;
    return en;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{t('Add Business', 'إضافة متجر', 'زیادەکردنی بازرگانی')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800">
            {t('This form is under construction. Please use the admin dashboard.', 'هذا النموذج قيد الإنشاء. استخدم لوحة التحكم.', 'ئەم فۆرمە لە ژێر دروستکردندایە. تکایە پانێلێ بەکاربهێنە.')}
          </div>
          {message && <div className="text-green-600 text-center">{message}</div>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              {t('Cancel', 'إلغاء', 'ڕەتکردنەوە')}
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50">
              {loading ? t('Saving...', 'جاري الحفظ...', 'پاشەکەوتکردن...') : t('Save', 'حفظ', 'پاشەکەوت')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessForm;
