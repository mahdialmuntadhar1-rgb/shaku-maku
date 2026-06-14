import React, { useState } from 'react';
import { Check, Edit3, Image as ImageIcon, Lock, Save, Trash2 } from 'lucide-react';
import { api, API_BASE_URL, businessesApi, getApiErrorMessage, postsApi } from '../api';
import { readSession } from '../auth/session';
import { Business, HeroSlide, Language, SocialPost, UserProfile } from '../types';
import { IRAQ_GOVERNORATES, APP_CATEGORIES, normalizeGovernorate, normalizeCategory, getGovernorateLabel, getCategoryLabel } from '../utils/taxonomy';

interface AdminPanelProps {
  currentLang: Language;
  businesses: Business[];
  setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  userProfile: UserProfile | null;
  heroSlides: HeroSlide[];
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
}

interface DiagnosticItem {
  label: string;
  ok: boolean;
  status: string;
  detail: string;
}

interface BusinessSubmission {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone: string;
  category?: string;
  governorate?: string;
  media_url?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  created_at?: string;
}

const t = (lang: Language, en: string, ar: string, ku: string) => {
  if (lang === 'ar') return ar;
  if (lang === 'ku') return ku;
  return en;
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  currentLang,
  businesses,
  setBusinesses,
  posts,
  setPosts,
  userProfile,
  heroSlides,
  setHeroSlides
}) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingPostText, setEditingPostText] = useState('');
  const [editingBusinessId, setEditingBusinessId] = useState<string | null>(null);
  const [businessDraft, setBusinessDraft] = useState({
    name: '',
    description: '',
    address: '',
    phoneNumber: '',
    category: '',
    governorate: ''
  });
  const [businessStatus, setBusinessStatus] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [savingNewPost, setSavingNewPost] = useState(false);
  const [newPostDraft, setNewPostDraft] = useState({
    businessId: '',
    captionAr: '',
    captionKu: '',
    captionEn: '',
    mediaUrl: '',
    videoUrl: '',
    governorate: '',
    category: ''
  });
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [diagnosticsLoading, setDiagnosticsLoading] = useState(false);
  const [businessSubmissions, setBusinessSubmissions] = useState<BusinessSubmission[]>([]);
  const [businessSubmissionsLoading, setBusinessSubmissionsLoading] = useState(false);
  const [businessSubmissionsStatus, setBusinessSubmissionsStatus] = useState('');
  const session = readSession();
  const signedInEmail = (userProfile?.email || session?.user?.email || '').toLowerCase();
  const hasAdminAccess =
    signedInEmail === 'safaribosafar@gmail.com' ||
    userProfile?.role === 'admin' ||
    session?.user?.role === 'admin';

  if (!hasAdminAccess) {
    return (
      <div className="max-w-3xl mx-auto bg-[#18191a] border border-red-500/25 rounded-2xl p-8 text-center shadow-xl">
        <Lock className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h1 className="text-xl font-black text-white">
          {t(currentLang, 'Admin access required', 'ÙŠÙ„Ø²Ù… Ø­Ø³Ø§Ø¨ Ù…Ø¯ÙŠØ±', 'Ù‡Û•Ú˜Ù…Ø§Ø±ÛŒ Ø¨Û•Ú•ÛŽÙˆÛ•Ø¨Û•Ø± Ù¾ÛŽÙˆÛŒØ³ØªÛ•')}
        </h1>
      </div>
    );
  }

  const updateHeroField = (slideId: string, field: 'slogan' | 'badge', value: string) => {
    setHeroSlides((prev) =>
      prev.map((slide) =>
        slide.id === slideId
          ? { ...slide, [field]: { ...slide[field], [currentLang]: value } }
          : slide
      )
    );
  };

  const updateHeroImage = (slideId: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setHeroSlides((prev) =>
        prev.map((slide) => (slide.id === slideId ? { ...slide, image: String(reader.result) } : slide))
      );
    };
    reader.readAsDataURL(file);
  };

  const addHeroSlide = () => {
    const now = Date.now();
    const newSlide: HeroSlide = {
      id: `hero-${now}`,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=85',
      slogan: {
        ar: 'Ø¥Ø¹Ù„Ø§Ù† Ø¬Ø¯ÙŠØ¯ Ù…Ù† Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ',
        ku: 'Ú•ÛŒÚ©Ù„Ø§Ù…ÛŒ Ù†ÙˆÛŽ Ù„Û• Ø´Û•Ú©Ùˆ Ù…Û•Ú©Ùˆ',
        en: 'New Shaku Maku promotion'
      },
      governorate: 'all' as any,
      category: 'restaurant',
      badge: {
        ar: 'Ù…Ø³Ø§Ø­Ø© ØªØ±ÙˆÙŠØ¬ÙŠØ©',
        ku: 'Ø´ÙˆÛŽÙ†ÛŒ Ú•ÛŒÚ©Ù„Ø§Ù…',
        en: 'Promotional space'
      }
    };

    // Put new slide first so it becomes visible/active immediately in the hero.
    setHeroSlides((prev) => [newSlide, ...prev]);
  };

  const deleteHeroSlide = (slideId: string) => {
    setHeroSlides((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((slide) => slide.id !== slideId);
    });
  };

  const approvePost = async (postId: string) => {
    try {
      await postsApi.update(postId, { status: 'approved' });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, status: 'approved', updatedAt: new Date().toISOString() } : post
        )
      );
      setPostStatus(t(currentLang, 'Post approved.', 'ØªÙ…Øª Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù†Ø´ÙˆØ±.', 'Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ù¾Û•Ø³Û•Ù†Ø¯Ú©Ø±Ø§.'));
    } catch (error) {
      setPostStatus(getApiErrorMessage(error));
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await postsApi.delete(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setPostStatus(t(currentLang, 'Post deleted.', 'ØªÙ… Ø­Ø°Ù Ø§Ù„Ù…Ù†Ø´ÙˆØ±.', 'Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ø³Ú•Ø§ÛŒÛ•ÙˆÛ•.'));
    } catch (error) {
      setPostStatus(getApiErrorMessage(error));
    }
  };

  const handleNewPostBusinessChange = (businessId: string) => {
    const linkedBusiness = businesses.find((business) => business.id === businessId);
    setNewPostDraft((prev) => ({
      ...prev,
      businessId,
      governorate: linkedBusiness ? normalizeGovernorate(linkedBusiness.governorate) : prev.governorate,
      category: linkedBusiness ? normalizeCategory(linkedBusiness.category) : prev.category
    }));
  };  async function compressImageFileForPost(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Only image files are supported.'));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const maxSize = 720;
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not prepare image.'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.62;
          let output = canvas.toDataURL('image/jpeg', quality);

          while (output.length > 75000 && quality > 0.24) {
            quality -= 0.06;
            output = canvas.toDataURL('image/jpeg', quality);
          }

          if (output.length > 95000) {
            reject(new Error('Image is still too large after compression. Please choose a smaller photo.'));
            return;
          }

          resolve(output);
        };

        img.onerror = () => reject(new Error('Could not load image.'));
        img.src = String(reader.result || '');
      };

      reader.onerror = () => reject(new Error('Could not read image.'));
      reader.readAsDataURL(file);
    });
  }

  async function handlePostImageUpload(file?: File | null) {
    if (!file) return;

    try {
      setPostStatus(t(
        currentLang,
        'Compressing image...',
        'Ø¬Ø§Ø±ÙŠ Ø¶ØºØ· Ø§Ù„ØµÙˆØ±Ø©...',
        'Ù¾Û•Ø³ØªØ§Ù†Ø¯Ù†ÛŒ ÙˆÛŽÙ†Û•...'
      ));

      const compressed = await compressImageFileForPost(file);

      setNewPostDraft((prev) => ({
        ...prev,
        mediaUrl: compressed
      }));

      setPostStatus(t(
        currentLang,
        'Image ready. You can publish now.',
        'Ø§Ù„ØµÙˆØ±Ø© Ø¬Ø§Ù‡Ø²Ø©. ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„Ù†Ø´Ø± Ø§Ù„Ø¢Ù†.',
        'ÙˆÛŽÙ†Û•Ú©Û• Ø¦Ø§Ù…Ø§Ø¯Û•ÛŒÛ•. Ø¦ÛŽØ³ØªØ§ Ø¯Û•ØªÙˆØ§Ù†ÛŒØª Ø¨ÚµØ§ÙˆÛŒ Ø¨Ú©Û•ÛŒØªÛ•ÙˆÛ•.'
      ));
    } catch (error: any) {
      setPostStatus(t(
        currentLang,
        error?.message || 'Image upload failed.',
        'ÙØ´Ù„ Ø±ÙØ¹ Ø§Ù„ØµÙˆØ±Ø©. Ø¬Ø±Ù‘Ø¨ ØµÙˆØ±Ø© Ø£ØµØºØ±.',
        'Ø¨Ø§Ø±Ú©Ø±Ø¯Ù†ÛŒ ÙˆÛŽÙ†Û• Ø´Ú©Ø³ØªÛŒ Ù‡ÛŽÙ†Ø§. ÙˆÛŽÙ†Û•ÛŒÛ•Ú©ÛŒ Ø¨Ú†ÙˆÙˆÚ©ØªØ± ØªØ§Ù‚ÛŒØ¨Ú©Û•ÙˆÛ•.'
      ));
    }
  }

  function isTooLargeInlineMedia(value: string): boolean {
    return String(value || '').startsWith('data:') && String(value || '').length > 100000;
  }

  function getSafePostMediaUrl(value: string): string {
    const media = String(value || '').trim();

    if (!media) {
      return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85';
    }

    if (isTooLargeInlineMedia(media)) {
      return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85';
    }

    return media;
  }



  const createPost = async () => {
    const rawMediaUrl = String(newPostDraft.mediaUrl || '').trim();
    if (isTooLargeInlineMedia(rawMediaUrl)) {
      setPostStatus(t(
        currentLang,
        'The selected image is too large to save directly. Please use an image URL for now.',
        'Ø§Ù„ØµÙˆØ±Ø© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø© ÙƒØ¨ÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ Ù„Ù„Ø­ÙØ¸ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±. Ø­Ø§Ù„ÙŠØ§Ù‹ Ø§Ø³ØªØ®Ø¯Ù… Ø±Ø§Ø¨Ø· ØµÙˆØ±Ø©.',
        'ÙˆÛŽÙ†Û•ÛŒ Ù‡Û•ÚµØ¨Ú˜ÛŽØ±Ø¯Ø±Ø§Ùˆ Ø²Û†Ø± Ú¯Û•ÙˆØ±Û•ÛŒÛ•. ØªÚ©Ø§ÛŒÛ• Ø¦ÛŽØ³ØªØ§ Ù„ÛŒÙ†Ú©ÛŒ ÙˆÛŽÙ†Û• Ø¨Û•Ú©Ø§Ø±Ø¨Ù‡ÛŽÙ†Û•.'
      ));
      return;
    }
const linkedBusiness = businesses.find((business) => business.id === newPostDraft.businessId) || businesses[0];
    const captionAr = newPostDraft.captionAr.trim();
    const captionKu = newPostDraft.captionKu.trim() || captionAr;
    const captionEn = newPostDraft.captionEn.trim() || captionAr;
    const mediaUrl = newPostDraft.mediaUrl.trim();
    const videoUrl = newPostDraft.videoUrl.trim();

    if (!captionAr && !captionKu && !captionEn) {
      setPostStatus(t(currentLang, 'Write a caption first.', 'Ø§ÙƒØªØ¨ Ø§Ù„Ù†Øµ Ø£ÙˆÙ„Ø§Ù‹.', 'Ø³Û•Ø±Û•ØªØ§ Ø¯Û•Ù‚ÛŽÚ© Ø¨Ù†ÙˆÙˆØ³Û•.'));
      return;
    }

    if (!linkedBusiness) {
      setPostStatus(t(currentLang, 'No business available to link this post.', 'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù†Ø´Ø§Ø· Ù„Ø±Ø¨Ø· Ø§Ù„Ù…Ù†Ø´ÙˆØ± Ø¨Ù‡.', 'Ù‡ÛŒÚ† Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒÛŒÛ•Ú© Ù†ÛŒÛŒÛ•.'));
      return;
    }

    if (!newPostDraft.governorate || !newPostDraft.category) {
      setPostStatus(t(currentLang, 'Please choose governorate and category.', 'ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø© ÙˆØ§Ù„ØªØµÙ†ÙŠÙ.', 'ØªÚ©Ø§ÛŒÛ• Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§ Ùˆ Ù¾Û†Ù„ Ù‡Û•ÚµØ¨Ú˜ÛŽØ±Û•.'));
      return;
    }

    const optimisticPost: SocialPost = {
      id: `local-post-${Date.now()}`,
      businessId: linkedBusiness.id,
      businessName: linkedBusiness.name[currentLang] || linkedBusiness.name.en,
      businessAvatar: linkedBusiness.avatar,
      category: normalizeCategory(newPostDraft.category || linkedBusiness.category),
      governorate: normalizeGovernorate(newPostDraft.governorate || linkedBusiness.governorate) as SocialPost['governorate'],
      mediaUrl,
      caption: {
        ar: captionAr || captionKu || captionEn,
        ku: captionKu || captionAr || captionEn,
        en: captionEn || captionAr || captionKu
      },
      likes: 0,
      commentsCount: 0,
      shares: 0,
      views: 0,
      timeAgo: { ar: 'Ø§Ù„Ø¢Ù†', ku: 'Ø¦ÛŽØ³ØªØ§', en: 'Just now' },
      likedByUser: false,
      savedByUser: false,
      comments: [],
      videoUrl: videoUrl || undefined,
      status: 'approved',
      updatedAt: new Date().toISOString(),
      authorEmail: signedInEmail
    };

    try {
      setSavingNewPost(true);

      try {
        const created: any = await postsApi.create({
          business_id: linkedBusiness.id,
          caption_ar: optimisticPost.caption.ar,
          caption_ku: optimisticPost.caption.ku,
          caption_en: optimisticPost.caption.en,
          media_url: mediaUrl,
          video_url: videoUrl || null,
          category: normalizeCategory(newPostDraft.category || linkedBusiness.category),
          governorate: normalizeGovernorate(newPostDraft.governorate || linkedBusiness.governorate) as SocialPost['governorate'],
          status: 'approved'
        });

        const createdId = created?.id || created?.data?.id || optimisticPost.id;
        setPosts((prev) => [{ ...optimisticPost, id: String(createdId) }, ...prev]);
        setPostStatus(t(currentLang, 'Post added.', 'ØªÙ…Øª Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†Ø´ÙˆØ±.', 'Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ø²ÛŒØ§Ø¯Ú©Ø±Ø§.'));
      } catch (backendError) {
        console.warn('Post backend create failed, using local fallback:', backendError);
        setPosts((prev) => [optimisticPost, ...prev]);
        setPostStatus(t(currentLang, 'Post added locally. Backend create route may need review.', 'ØªÙ…Øª Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†Ø´ÙˆØ± Ù…Ø­Ù„ÙŠØ§Ù‹. Ù‚Ø¯ ÙŠØ­ØªØ§Ø¬ Ø§Ù„Ø®Ø§Ø¯Ù… Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©.', 'Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ù†Ø§ÙˆØ®Û†ÛŒÛŒ Ø²ÛŒØ§Ø¯Ú©Ø±Ø§.'));
      }

      setNewPostDraft({
        businessId: '',
        captionAr: '',
        captionKu: '',
        captionEn: '',
        mediaUrl: '',
        videoUrl: '',
        governorate: '',
        category: ''
      });
    } finally {
      setSavingNewPost(false);
    }
  };

  const savePost = async (postId: string) => {
    const caption = editingPostText.trim();
    if (!caption) return;

    try {
      await postsApi.update(postId, { caption });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, caption: { ar: caption, ku: caption, en: caption }, updatedAt: new Date().toISOString() }
            : post
        )
      );
      setEditingPostId(null);
      setEditingPostText('');
      setPostStatus(t(currentLang, 'Post updated.', 'ØªÙ… ØªØ­Ø¯ÙŠØ« Ø§Ù„Ù…Ù†Ø´ÙˆØ±.', 'Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ù†ÙˆÛŽÚ©Ø±Ø§ÛŒÛ•ÙˆÛ•.'));
    } catch (error) {
      setPostStatus(getApiErrorMessage(error));
    }
  };

  const toggleBusinessVerification = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === businessId ? { ...business, isVerified: !business.isVerified } : business
      )
    );
  };

  const startEditBusiness = (business: Business) => {
    setEditingBusinessId(business.id);
    setBusinessDraft({
      name: business.name[currentLang] || business.name.en,
      description: business.description[currentLang] || business.description.en,
      address: business.address[currentLang] || business.address.en,
      phoneNumber: business.phoneNumber || '',
      category: business.category,
      governorate: business.governorate
    });
  };

  const saveBusiness = async (businessId: string) => {
    const payload = {
      name: businessDraft.name.trim(),
      description: businessDraft.description.trim(),
      address: businessDraft.address.trim(),
      phone: businessDraft.phoneNumber.trim(),
      category: businessDraft.category.trim(),
      governorate: businessDraft.governorate.trim()
    };

    try {
      await businessesApi.update(businessId, payload);
      setBusinesses((prev) =>
        prev.map((business) =>
          business.id === businessId
            ? {
                ...business,
                name: { ar: payload.name, ku: payload.name, en: payload.name },
                description: {
                  ar: payload.description,
                  ku: payload.description,
                  en: payload.description
                },
                address: { ar: payload.address, ku: payload.address, en: payload.address },
                phoneNumber: payload.phone,
                category: payload.category,
                governorate: payload.governorate as any
              }
            : business
        )
      );
      setBusinessStatus(t(currentLang, 'Business saved.', 'ØªÙ… Ø­ÙØ¸ Ø§Ù„Ù†Ø´Ø§Ø·.', 'Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒ Ù¾Ø§Ø´Û•Ú©Û•ÙˆØª Ú©Ø±Ø§.'));
      setEditingBusinessId(null);
    } catch (error) {
      setBusinessStatus(getApiErrorMessage(error));
    }
  };

  const deleteBusiness = async (businessId: string) => {
    try {
      await businessesApi.delete(businessId);
      setBusinesses((prev) => prev.filter((business) => business.id !== businessId));
      setBusinessStatus(t(currentLang, 'Business deleted.', 'ØªÙ… Ø­Ø°Ù Ø§Ù„Ù†Ø´Ø§Ø·.', 'Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒ Ø³Ú•Ø§ÛŒÛ•ÙˆÛ•.'));
    } catch (error) {
      setBusinessStatus(getApiErrorMessage(error));
    }
  };

  const loadBusinessSubmissions = async () => {
    setBusinessSubmissionsLoading(true);
    setBusinessSubmissionsStatus('');

    try {
      const response = await api.get('/business-submissions', { params: { status: 'pending', limit: 100 } });
      const rows = response?.data?.data || response?.data || response || [];
      setBusinessSubmissions(Array.isArray(rows) ? rows : []);
      setBusinessSubmissionsStatus(t(currentLang, 'Business requests loaded.', 'تم تحميل طلبات الأنشطة.', 'داواکارییەکانی بازرگانی بارکران.'));
    } catch (error) {
      setBusinessSubmissionsStatus(getApiErrorMessage(error));
    } finally {
      setBusinessSubmissionsLoading(false);
    }
  };

  const updateBusinessSubmissionStatus = async (submissionId: string, status: 'approved' | 'rejected') => {
    setBusinessSubmissionsLoading(true);
    setBusinessSubmissionsStatus('');

    try {
      const response = await api.patch(`/business-submissions/${submissionId}`, { status });
      const payload = response?.data?.data || response?.data || response || {};
      const publishedBusiness = payload?.business;

      setBusinessSubmissions((prev) => prev.filter((item) => item.id !== submissionId));

      if (status === 'approved' && publishedBusiness?.id) {
        const name = publishedBusiness.name_en || publishedBusiness.name_ar || publishedBusiness.name_ku || 'New Business';
        const description =
          publishedBusiness.description_en ||
          publishedBusiness.description_ar ||
          publishedBusiness.description_ku ||
          '';
        const address =
          publishedBusiness.address_en ||
          publishedBusiness.address_ar ||
          publishedBusiness.address_ku ||
          '';
        const image =
          publishedBusiness.image ||
          publishedBusiness.avatar ||
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';

        const normalizedBusiness: Business = {
          id: String(publishedBusiness.id),
          name: {
            ar: publishedBusiness.name_ar || name,
            ku: publishedBusiness.name_ku || name,
            en: publishedBusiness.name_en || name
          },
          description: {
            ar: publishedBusiness.description_ar || description,
            ku: publishedBusiness.description_ku || description,
            en: publishedBusiness.description_en || description
          },
          category: normalizeCategory(publishedBusiness.category || 'services'),
          governorate: normalizeGovernorate(publishedBusiness.governorate || 'baghdad') as any,
          rating: Number(publishedBusiness.rating || 0),
          reviewsCount: Number(publishedBusiness.reviews_count || 0),
          image,
          images: [image],
          avatar: publishedBusiness.avatar || image,
          isVerified: Boolean(publishedBusiness.is_verified),
          phoneNumber: publishedBusiness.phone_number || '',
          address: {
            ar: publishedBusiness.address_ar || address,
            ku: publishedBusiness.address_ku || address,
            en: publishedBusiness.address_en || address
          },
          likes: Number(publishedBusiness.like_count || 0),
          saves: Number(publishedBusiness.save_count || 0),
          mapCoords: {
            x: Number(publishedBusiness.map_coords_x || 0),
            y: Number(publishedBusiness.map_coords_y || 0)
          },
          likedByUser: false,
          savedByUser: false
        };

        setBusinesses((prev) => {
          const withoutDuplicate = prev.filter((business) => business.id !== normalizedBusiness.id);
          return [normalizedBusiness, ...withoutDuplicate];
        });
      }

      setBusinessSubmissionsStatus(
        status === 'approved'
          ? t(currentLang, 'Request approved, business published, and request removed.', '\u062a\u0645\u062a \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0648\u0646\u0634\u0631 \u0627\u0644\u0646\u0634\u0627\u0637 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628.', '\u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc\u06cc\u06d5\u06a9\u06d5 \u067e\u06d5\u0633\u06d5\u0646\u062f\u06a9\u0631\u0627\u060c \u0628\u0627\u0632\u0631\u06af\u0627\u0646\u06cc\u06cc\u06d5\u06a9\u06d5 \u0628\u06b5\u0627\u0648\u06a9\u0631\u0627\u06cc\u06d5\u0648\u06d5 \u0648 \u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc\u06cc\u06d5\u06a9\u06d5 \u0644\u0627\u0628\u0631\u0627.')
          : t(currentLang, 'Request rejected and removed from the list.', '\u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0648\u0625\u0632\u0627\u0644\u062a\u0647 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.', '\u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc\u06cc\u06d5\u06a9\u06d5 \u0695\u06d5\u062a\u06a9\u0631\u0627\u06cc\u06d5\u0648\u06d5 \u0648 \u0644\u06d5 \u0644\u06cc\u0633\u062a\u06d5\u06a9\u06d5 \u0644\u0627\u0628\u0631\u0627.')
      );
    } catch (error) {
      setBusinessSubmissionsStatus(getApiErrorMessage(error));
    } finally {
      setBusinessSubmissionsLoading(false);
    }
  };

  const deleteBusinessSubmission = async (submissionId: string) => {
    setBusinessSubmissionsLoading(true);
    setBusinessSubmissionsStatus('');

    try {
      await api.delete(`/business-submissions/${submissionId}`);
      setBusinessSubmissions((prev) => prev.filter((item) => item.id !== submissionId));
      setBusinessSubmissionsStatus(t(currentLang, 'Request deleted permanently.', '\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0646\u0647\u0627\u0626\u064a\u0627\u064b.', '\u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc\u06cc\u06d5\u06a9\u06d5 \u0628\u06d5 \u062a\u06d5\u0648\u0627\u0648\u06cc \u0633\u0695\u0627\u06cc\u06d5\u0648\u06d5.'));
    } catch (error) {
      setBusinessSubmissionsStatus(getApiErrorMessage(error));
    } finally {
      setBusinessSubmissionsLoading(false);
    }
  };

  const runDiagnostics = async () => {
    setDiagnosticsLoading(true);
    const next: DiagnosticItem[] = [];

    const capture = async (label: string, call: () => Promise<{ status: number; data: any }>) => {
      try {
        const response = await call();
        const preview = JSON.stringify(response.data).slice(0, 180);
        next.push({
          label,
          ok: response.status >= 200 && response.status < 400,
          status: String(response.status),
          detail: preview || 'OK'
        });
      } catch (error: any) {
        const status = error?.response?.status ? String(error.response.status) : 'NETWORK';
        next.push({
          label,
          ok: false,
          status,
          detail: getApiErrorMessage(error)
        });
      }
    };

    next.push({
      label: 'Auth/session',
      ok: Boolean(session?.token && session?.user?.email),
      status: session ? 'ACTIVE' : 'NONE',
      detail: session ? `Signed in as ${session.user.email}` : 'No active session'
    });

    await capture('GET /api/businesses', () => api.get('/businesses', { params: { page: 1, limit: 1 } }));
    await capture('GET /api/posts', () => api.get('/posts', { params: { page: 1, limit: 1 } }));
    await capture('GET /api/feed/business-posts', () =>
      api.get('/feed/business-posts', { params: { page: 1, limit: 1 } })
    );
    await capture('Filter probe (governorate+category)', () =>
      api.get('/businesses', {
        params: { governorate: 'Baghdad', category: 'Restaurants', page: 1, limit: 5 }
      })
    );
    await capture('Write route probe (OPTIONS /api/businesses)', () => api.options('/businesses'));

    setDiagnostics(next);
    setDiagnosticsLoading(false);
  };

  const pendingPosts = posts.filter((post) => post.status === 'pending').length;
  const displayEmail = userProfile?.email || session?.user?.email || 'admin@shaku-maku';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
      <div className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white">
        <h1 className="text-2xl font-black mb-2">
          {t(currentLang, 'Admin Control Center', 'Ù…Ø±ÙƒØ² ØªØ­ÙƒÙ… Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©', 'Ù†Ø§ÙˆÛ•Ù†Ø¯ÛŒ Ú©Û†Ù†ØªØ±Û†ÚµÛŒ Ø¨Û•Ú•ÛŽÙˆÛ•Ø¨Û•Ø±')}
        </h1>
        <p className="text-sm text-zinc-400">{displayEmail}</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <span className="text-xs text-zinc-400">{t(currentLang, 'Businesses', 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', 'Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒÛŒÛ•Ú©Ø§Ù†')}</span>
            <strong className="block text-2xl">{businesses.length}</strong>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <span className="text-xs text-zinc-400">{t(currentLang, 'Posts', 'Ø§Ù„Ù…Ù†Ø´ÙˆØ±Ø§Øª', 'Ø¨Ø§Ø¨Û•ØªÛ•Ú©Ø§Ù†')}</span>
            <strong className="block text-2xl">{posts.length}</strong>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-amber-500/25">
            <span className="text-xs text-zinc-400">
              {t(currentLang, 'Pending Approval', 'Ø¨Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©', 'Ú†Ø§ÙˆÛ•Ú•ÙˆØ§Ù†ÛŒ Ù¾Û•Ø³Û•Ù†Ø¯Ú©Ø±Ø¯Ù†')}
            </span>
            <strong className="block text-2xl text-amber-300">{pendingPosts}</strong>
          </div>
        </div>
      </div>      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">
              {t(currentLang, 'Business Owner Requests', 'طلبات أصحاب الأنشطة', 'داواکاری خاوەن بازرگانییەکان')}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {t(currentLang, 'Review businesses submitted by normal users before publishing.', 'راجع الأنشطة المرسلة من المستخدمين قبل النشر.', 'پێداچوونەوە بکە بە بازرگانییە نێردراوەکان پێش بڵاوکردنەوە.')}
            </p>
          </div>

          <button
            type="button"
            onClick={loadBusinessSubmissions}
            disabled={businessSubmissionsLoading}
            className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black disabled:opacity-60"
          >
            {businessSubmissionsLoading
              ? t(currentLang, 'Loading...', 'جاري التحميل...', 'بارکردن...')
              : t(currentLang, 'Load Requests', 'تحميل الطلبات', 'بارکردنی داواکارییەکان')}
          </button>
        </div>

        {businessSubmissionsStatus && (
          <div className="text-sm font-semibold text-amber-300">
            {businessSubmissionsStatus}
          </div>
        )}

        {businessSubmissions.length === 0 ? (
          <div className="text-sm text-zinc-400 bg-white/5 rounded-xl p-4 border border-white/10">
            {t(currentLang, 'No requests loaded yet. Click Load Requests.', 'لا توجد طلبات محملة حالياً. اضغط تحميل الطلبات.', 'هێشتا هیچ داواکارییەک بار نەکراوە. کرتە لە بارکردنی داواکارییەکان بکە.')}
          </div>
        ) : (
          <div className="space-y-3">
            {businessSubmissions.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-black text-white">{item.name}</h3>
                    <p className="text-sm text-zinc-300">{item.description || '-'}</p>
                    <p className="text-xs text-zinc-400">
                      {item.phone} · {item.governorate || '-'} · {item.category || '-'}
                    </p>
                    <p className="text-xs text-zinc-500">{item.address || ''}</p>
                    <span className="inline-flex text-xs px-2 py-1 rounded-full bg-black/30 border border-white/10 text-amber-200">
                      {item.status}
                    </span>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateBusinessSubmissionStatus(item.id, 'approved')}
                      disabled={businessSubmissionsLoading || item.status === 'approved'}
                      className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-black disabled:opacity-50"
                    >
                      {t(currentLang, 'Approve', 'موافقة', 'پەسەندکردن')}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBusinessSubmissionStatus(item.id, 'rejected')}
                      disabled={businessSubmissionsLoading || item.status === 'rejected'}
                      className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-black disabled:opacity-50"
                    >
                      {t(currentLang, 'Reject', 'رفض', 'ڕەتکردنەوە')}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteBusinessSubmission(item.id)}
                      disabled={businessSubmissionsLoading}
                      className="px-3 py-2 rounded-lg bg-zinc-700 text-white text-xs font-black disabled:opacity-50"
                    >
                      {t(currentLang, 'Delete', '\u062d\u0630\u0641', '\u0633\u0695\u06cc\u0646\u06d5\u0648\u06d5')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black">Admin API Diagnostics</h2>
          <button
            type="button"
            onClick={runDiagnostics}
            disabled={diagnosticsLoading}
            className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black disabled:opacity-60"
          >
            {diagnosticsLoading ? 'Running...' : 'Run checks'}
          </button>
        </div>
        <div className="text-xs text-zinc-400 space-y-1">
          <p>API base: {API_BASE_URL}</p>
          <p>Signed-in email: {signedInEmail || 'none'}</p>
          <p>Backend admin role: {hasAdminAccess ? 'yes' : 'no'}</p>
        </div>
        {diagnostics.length > 0 && (
          <div className="space-y-2">
            {diagnostics.map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold">{item.label}</span>
                  <span className={item.ok ? 'text-emerald-300' : 'text-red-300'}>
                    {item.ok ? 'OK' : 'FAIL'} ({item.status})
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 break-all">{item.detail}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-luxury-gold" />
          {t(currentLang, 'Hero Editor', 'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©', 'Ø¯Û•Ø³ØªÚ©Ø§Ø±ÛŒ Ù‡ÛŒØ±Ùˆ')}
        </h2>
        <p className="text-xs text-amber-300">
          Hero edits save to this app immediately and persist in browser storage.
        </p>
        <button
          type="button"
          onClick={addHeroSlide}
          className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black"
        >
          Add promotional slide
        </button>
        <div className="grid lg:grid-cols-2 gap-4">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <img src={slide.image} alt="" className="w-full h-36 object-cover rounded-lg bg-black" />
              <input
                value={slide.slogan[currentLang]}
                onChange={(event) => updateHeroField(slide.id, 'slogan', event.target.value)}
                className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm"
                dir={currentLang === 'en' ? 'ltr' : 'rtl'}
              />
              <input
                value={slide.badge[currentLang]}
                onChange={(event) => updateHeroField(slide.id, 'badge', event.target.value)}
                className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm"
                dir={currentLang === 'en' ? 'ltr' : 'rtl'}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => updateHeroImage(slide.id, event.target.files?.[0] || null)}
                className="block w-full text-xs text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-luxury-gold file:px-3 file:py-2 file:text-black file:font-bold"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setHeroSlides((prev) => [slide, ...prev.filter((item) => item.id !== slide.id)])}
                  className="px-3 py-2 rounded-lg bg-blue-500/15 text-blue-200 border border-blue-400/30 text-xs font-black"
                >
                  â­ Use as main slide
                </button>

                <button
                  type="button"
                  onClick={() => deleteHeroSlide(slide.id)}
                  className="px-3 py-2 rounded-lg bg-red-500/15 text-red-200 border border-red-400/30 text-xs font-black"
                >
                  ðŸ—‘ Delete this slide
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black">
          {t(currentLang, 'Social Feed Moderation', 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ù†Ø´ÙˆØ±Ø§Øª', 'Ø¨Û•Ú•ÛŽÙˆÛ•Ø¨Ø±Ø¯Ù†ÛŒ Ø¨Ø§Ø¨Û•ØªÛ•Ú©Ø§Ù†')}
        </h2>
        
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <label className="text-xs font-black text-zinc-300">
                  {t(currentLang, 'Upload post photo', 'Ø±ÙØ¹ ØµÙˆØ±Ø© Ø§Ù„Ù…Ù†Ø´ÙˆØ±', 'Ø¨Ø§Ø±Ú©Ø±Ø¯Ù†ÛŒ ÙˆÛŽÙ†Û•ÛŒ Ø¨Ø§Ø¨Û•Øª')}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handlePostImageUpload(event.target.files?.[0])}
                    className="mt-2 block w-full text-sm text-zinc-200 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-black file:text-white hover:file:bg-cyan-400"
                  />
                </label>
                <p className="mt-2 text-[11px] text-zinc-400">
                  {t(
                    currentLang,
                    'The app will compress the image automatically before posting.',
                    'Ø³ÙŠÙ‚ÙˆÙ… Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ø¶ØºØ· Ø§Ù„ØµÙˆØ±Ø© ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ù‚Ø¨Ù„ Ø§Ù„Ù†Ø´Ø±.',
                    'Ø¦Û•Ù¾Û•Ú©Û• ÙˆÛŽÙ†Û•Ú©Û• Ø®Û†Ú©Ø§Ø±Ø§Ù†Û• Ù¾ÛŽØ´ Ø¨ÚµØ§ÙˆÚ©Ø±Ø¯Ù†Û•ÙˆÛ• Ù¾Û•Ø³ØªØ§Ù† Ø¯Û•Ú©Ø§Øª.'
                  )}
                </p>
              </div>


              {postStatus && <p className="text-xs text-zinc-300">{postStatus}</p>}

        <div className="bg-white/5 border border-luxury-gold/20 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-black text-luxury-gold">Create New Social Post</h3>

          <select
            value={newPostDraft.businessId}
            onChange={(event) => handleNewPostBusinessChange(event.target.value)}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
          >
            <option value="">Link to first available business</option>
            {businesses.slice(0, 80).map((business) => (
              <option key={business.id} value={business.id}>
                {business.name[currentLang] || business.name.en}
              </option>
            ))}
          </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="text-xs font-black text-zinc-300">
                  {t(currentLang, 'Governorate', 'Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø©', 'Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§')}
                  <select
                    value={newPostDraft.governorate}
                    onChange={(event) => setNewPostDraft((prev) => ({ ...prev, governorate: event.target.value }))}
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-3 text-sm text-white"
                  >
                    <option value="">{t(currentLang, 'Choose governorate for this post', 'Ø§Ø®ØªØ± Ù…Ø­Ø§ÙØ¸Ø© Ø§Ù„Ù…Ù†Ø´ÙˆØ±', 'Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§ÛŒ Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ù‡Û•ÚµØ¨Ú˜ÛŽØ±Û•')}</option>
                    {IRAQ_GOVERNORATES.map((gov) => (
                      <option key={gov.id} value={gov.id}>
                        {getGovernorateLabel(gov.id, currentLang)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-black text-zinc-300">
                  {t(currentLang, 'Category', 'Ø§Ù„ØªØµÙ†ÙŠÙ', 'Ù¾Û†Ù„')}
                  <select
                    value={newPostDraft.category}
                    onChange={(event) => setNewPostDraft((prev) => ({ ...prev, category: event.target.value }))}
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-3 text-sm text-white"
                  >
                    <option value="">{t(currentLang, 'Choose category for this post', 'Ø§Ø®ØªØ± ØªØµÙ†ÙŠÙ Ø§Ù„Ù…Ù†Ø´ÙˆØ±', 'Ù¾Û†Ù„ÛŒ Ø¨Ø§Ø¨Û•ØªÛ•Ú©Û• Ù‡Û•ÚµØ¨Ú˜ÛŽØ±Û•')}</option>
                    {APP_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {getCategoryLabel(category.id, currentLang)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>


          <textarea
            value={newPostDraft.captionAr}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, captionAr: event.target.value }))}
            placeholder="Arabic caption"
            rows={2}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="rtl"
          />

          <textarea
            value={newPostDraft.captionKu}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, captionKu: event.target.value }))}
            placeholder="Kurdish caption"
            rows={2}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="rtl"
          />

          <textarea
            value={newPostDraft.captionEn}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, captionEn: event.target.value }))}
            placeholder="English caption"
            rows={2}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="ltr"
          />

          <input
            value={newPostDraft.mediaUrl}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, mediaUrl: event.target.value }))}
            placeholder="Image/media URL"
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="ltr"
          />

          <input
            value={newPostDraft.videoUrl}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, videoUrl: event.target.value }))}
            placeholder="Optional video URL"
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="ltr"
          />

          <button
            type="button"
            onClick={() => void createPost()}
            disabled={savingNewPost}
            className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black disabled:opacity-60"
          >
            {savingNewPost ? 'Saving...' : 'Add post'}
          </button>
        </div>

        <div className="space-y-3">
          {posts.length === 0 && (
            <p className="text-sm text-zinc-400">
              {t(currentLang, 'No posts yet.', 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†Ø´ÙˆØ±Ø§Øª Ø¨Ø¹Ø¯.', 'Ù‡ÛŽØ´ØªØ§ Ù‡ÛŒÚ† Ø¨Ø§Ø¨Û•ØªÛŽÚ© Ù†ÛŒÛŒÛ•.')}
            </p>
          )}
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong className="block text-sm">{post.businessName}</strong>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      post.status === 'pending'
                        ? 'bg-amber-500/15 text-amber-300'
                        : 'bg-emerald-500/15 text-emerald-300'
                    }`}
                  >
                    {post.status || 'approved'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {post.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => void approvePost(post.id)}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPostId(post.id);
                      setEditingPostText(post.caption[currentLang] || post.caption.en);
                    }}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void deletePost(post.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
              {editingPostId === post.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editingPostText}
                    onChange={(event) => setEditingPostText(event.target.value)}
                    rows={3}
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm"
                    dir={currentLang === 'en' ? 'ltr' : 'rtl'}
                  />
                  <button
                    type="button"
                    onClick={() => void savePost(post.id)}
                    className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              ) : (
                <p className="text-sm text-zinc-300" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
                  <bdi>{post.caption[currentLang]}</bdi>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black">
          {t(currentLang, 'Business Listings', 'Ù‚ÙˆØ§Ø¦Ù… Ø§Ù„Ø£Ø¹Ù…Ø§Ù„', 'Ù„ÛŒØ³ØªÛŒ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒÛŒÛ•Ú©Ø§Ù†')}
        </h2>
        {businessStatus && <p className="text-xs text-zinc-300">{businessStatus}</p>}
        <div className="grid md:grid-cols-2 gap-3">
          {businesses.slice(0, 12).map((business) => (
            <div key={business.id} className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
              {editingBusinessId === business.id ? (
                <div className="space-y-2">
                  <input
                    value={businessDraft.name}
                    onChange={(event) => setBusinessDraft((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                  />
                  <textarea
                    value={businessDraft.description}
                    onChange={(event) =>
                      setBusinessDraft((prev) => ({ ...prev, description: event.target.value }))
                    }
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                    rows={2}
                  />
                  <input
                    value={businessDraft.address}
                    onChange={(event) => setBusinessDraft((prev) => ({ ...prev, address: event.target.value }))}
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                  />
                  <input
                    value={businessDraft.phoneNumber}
                    onChange={(event) =>
                      setBusinessDraft((prev) => ({ ...prev, phoneNumber: event.target.value }))
                    }
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void saveBusiness(business.id)}
                      className="px-3 py-1.5 rounded-lg bg-luxury-gold text-black text-[10px] font-black flex items-center gap-1"
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingBusinessId(null)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-zinc-200 text-[10px] font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="block text-sm truncate">{business.name[currentLang]}</strong>
                    <span className="text-[11px] text-zinc-500">{business.governorate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEditBusiness(business)}
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteBusiness(business.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBusinessVerification(business.id)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-black ${
                        business.isVerified
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-white/10 text-zinc-300'
                      }`}
                    >
                      {business.isVerified ? 'Verified' : 'Verify'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;




