import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getBusinesses } from '../api';

interface Business {
  id: number;
  name: string;
  name_ar?: string;
  name_ku?: string;
  governorate: string;
  category: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  description?: string;
  rating?: number;
  is_premium?: boolean;
}

interface InfiniteScrollBusinessesProps {
  governorate?: string;
  category?: string;
  search?: string;
}

export const InfiniteScrollBusinesses: React.FC<InfiniteScrollBusinessesProps> = ({ 
  governorate, 
  category, 
  search 
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const loadBusinesses = useCallback(async (pageNum: number, append: boolean = true) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await getBusinesses({
        page: pageNum,
        limit: 20,
        governorate,
        category,
        search
      });
      
      const newBusinesses = response.businesses || response.data || [];
      const totalCount = response.total || 0;
      
      setTotal(totalCount);
      
      if (append) {
        setBusinesses(prev => [...prev, ...newBusinesses]);
      } else {
        setBusinesses(newBusinesses);
      }
      
      setHasMore(businesses.length + newBusinesses.length < totalCount);
    } catch (error) {
      console.error('Failed to load businesses:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [governorate, category, search, loading, businesses.length]);

  // Reset and reload when filters change
  useEffect(() => {
    setBusinesses([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
    loadBusinesses(1, false);
  }, [governorate, category, search]);

  // Setup intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !initialLoading) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadBusinesses(nextPage, true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, page, initialLoading, loadBusinesses]);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">جاري تحميل المتاجر...</span>
      </div>
    );
  }

  if (businesses.length === 0 && !initialLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">لا توجد متاجر في هذه المحافظة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 mb-4">
        عرض {businesses.length} من {total} متجر
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business, index) => (
          <div 
            key={`${business.id}-${index}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {business.is_premium && (
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 text-center">
                ⭐ PREMIUM - رائد أعمال عراقي 👑
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {business.name}
                {business.name_ar && <span className="text-gray-500 text-sm block">{business.name_ar}</span>}
                {business.name_ku && <span className="text-gray-500 text-sm block">{business.name_ku}</span>}
              </h3>
              
              {business.rating && (
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-semibold ml-1">{business.rating}</span>
                  <span className="text-gray-400 text-sm ml-1">/ 5</span>
                </div>
              )}
              
              <div className="space-y-2 text-gray-600 text-sm">
                <p className="flex items-start gap-2">
                  <span className="font-medium min-w-[70px]">📍 المحافظة:</span>
                  <span>{business.governorate}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-medium min-w-[70px]">📂 الفئة:</span>
                  <span>{business.category}</span>
                </p>
                {business.phone && (
                  <p className="flex items-start gap-2">
                    <span className="font-medium min-w-[70px]">📞 هاتف:</span>
                    <span dir="ltr">{business.phone}</span>
                  </p>
                )}
                {business.whatsapp && (
                  <p className="flex items-start gap-2">
                    <span className="font-medium min-w-[70px]">💬 واتساب:</span>
                    <span dir="ltr">{business.whatsapp}</span>
                  </p>
                )}
                {business.address && (
                  <p className="flex items-start gap-2">
                    <span className="font-medium min-w-[70px]">🏠 العنوان:</span>
                    <span className="flex-1">{business.address}</span>
                  </p>
                )}
                {business.description && (
                  <p className="text-gray-500 text-xs mt-2 pt-2 border-t">{business.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Infinite scroll trigger */}
      <div ref={lastElementRef} className="h-10" />
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="mr-3 text-gray-600">جاري تحميل المزيد...</span>
        </div>
      )}
      
      {!hasMore && businesses.length > 0 && (
        <div className="text-center py-8 text-gray-500 border-t pt-8">
          ✓ تم تحميل جميع المتاجر ({businesses.length})
        </div>
      )}
    </div>
  );
};
