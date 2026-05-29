import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { businessesApi, postsApi } from '../api';

interface AdminPanelProps {
  currentLang: Language;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentLang }) => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bizData, postData] = await Promise.all([
          businessesApi.getAll(),
          postsApi.getAll()
        ]);
        setBusinesses(bizData.businesses || bizData.data || []);
        setPosts(postData.posts || postData.data || []);
      } catch (error) {
        console.error('Failed to load admin data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const t = (en: string, ar: string, ku: string) => {
    if (currentLang === 'ar') return ar;
    if (currentLang === 'ku') return ku;
    return en;
  };

  if (loading) return <div className="p-8 text-center">{t('Loading...', 'جاري التحميل...', 'بارکردن...')}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('Admin Panel', 'لوحة التحكم', 'پانێلی بەڕێوەبردن')}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">{t('Businesses', 'المتاجر', 'بازرگانییەکان')}</h2>
          <p className="text-gray-600">{t('Total:', 'المجموع:', 'کۆی گشتی:')} {businesses.length}</p>
          <button className="mt-3 text-sm text-emerald-600">Manage →</button>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">{t('Posts', 'المنشورات', 'بڵاوکراوەکان')}</h2>
          <p className="text-gray-600">{t('Total:', 'المجموع:', 'کۆی گشتی:')} {posts.length}</p>
          <button className="mt-3 text-sm text-emerald-600">Manage →</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
