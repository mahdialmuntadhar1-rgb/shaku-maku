import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Phone,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Business, Language, OwnershipClaim } from '../types';
import { normalizePhoneForSearch } from '../utils/phone';
import { sha256Hex } from '../utils/hash';
import { CATEGORIES, GOVERNORATES } from '../data';

type Step = 'phone' | 'matches' | 'manual' | 'otp' | 'done';

function nowIso() {
  return new Date().toISOString();
}

async function reserveCooldown(actionId: string, cooldownSeconds: number) {
  const ref = doc(db, 'rate_limits', actionId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const now = Timestamp.now();
    if (snap.exists()) {
      const nextAllowedAt = (snap.data() as any).nextAllowedAt as Timestamp | undefined;
      if (nextAllowedAt && nextAllowedAt.toMillis() > now.toMillis()) {
        const secondsLeft = Math.ceil((nextAllowedAt.toMillis() - now.toMillis()) / 1000);
        throw new Error(`RATE_LIMIT:${secondsLeft}`);
      }
    }
    tx.set(
      ref,
      {
        nextAllowedAt: Timestamp.fromMillis(now.toMillis() + cooldownSeconds * 1000),
        updatedAt: now,
      },
      { merge: true }
    );
  });
}

function bizCover(b: Business) {
  return b.image || b.images?.[0] || b.avatar;
}

function getBizPhoneCandidates(b: Business): string[] {
  return [
    b.primary_phone,
    b.secondary_phone,
    b.whatsapp_number,
    b.phoneNumber,
  ].filter(Boolean) as string[];
}

function inferBizPhoneTokens(b: Business): string[] {
  const explicit = (b.phoneSearchTokens || []).filter(Boolean);
  if (explicit.length) return explicit;
  const fromPhones = getBizPhoneCandidates(b)
    .flatMap((p) => normalizePhoneForSearch(p).tokens);
  return Array.from(new Set(fromPhones));
}

interface OwnerClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  allBusinesses: Business[]; // fallback for manual search / and local filtering if needed
  onClaimSuccess: (businessId: string) => void; // redirect to dashboard
}

export default function OwnerClaimModal({
  isOpen,
  onClose,
  currentLang,
  allBusinesses,
  onClaimSuccess,
}: OwnerClaimModalProps) {
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const [step, setStep] = useState<Step>('phone');
  const [countryCallingCode, setCountryCallingCode] = useState('964');
  const [phoneInput, setPhoneInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [matches, setMatches] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState('');

  // Manual search state
  const [manualQuery, setManualQuery] = useState('');
  const [manualGov, setManualGov] = useState<'all' | Business['governorate']>('all');
  const [manualCategory, setManualCategory] = useState<string>('all');

  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    // Reset every time opened
    setStep('phone');
    setError('');
    setLoading(false);
    setMatches([]);
    setSelectedBusinessId(null);
    setConfirmation(null);
    setOtp('');
    setManualQuery('');
    setManualGov('all');
    setManualCategory('all');
  }, [isOpen]);

  const ui = useMemo(() => {
    return {
      title: currentLang === 'en' ? 'Claim your business' : currentLang === 'ku' ? 'کارەکەت بەخۆت بکە' : 'طالب بعملك التجاري',
      subtitle:
        currentLang === 'en'
          ? 'Manage photos, posts, offers, WhatsApp, and business details.'
          : currentLang === 'ku'
          ? 'وێنە، پۆست، ئافر، واتساپ و زانیارییەکان بەڕێوەببە.'
          : 'تحكم بالصور والمنشورات والعروض والواتساب وتفاصيل العمل.',
      phoneLabel: currentLang === 'en' ? 'Phone number' : currentLang === 'ku' ? 'ژمارەی مۆبایل' : 'رقم الهاتف',
      continue: currentLang === 'en' ? 'Continue' : currentLang === 'ku' ? 'بەردەوام' : 'متابعة',
      thisIsMine: currentLang === 'en' ? 'This is my business' : currentLang === 'ku' ? 'ئەمە کارەکەی منە' : 'هذا عملي',
      notMine: currentLang === 'en' ? 'Not mine' : currentLang === 'ku' ? 'هی من نییە' : 'ليس لي',
      couldntFind: currentLang === 'en' ? 'We could not find your business.' : currentLang === 'ku' ? 'کارەکەت نەدۆزرایەوە.' : 'لم نعثر على عملك.',
      searchManually: currentLang === 'en' ? 'Search manually' : currentLang === 'ku' ? 'بەدەست بگەڕێ' : 'بحث يدوي',
      registerNew: currentLang === 'en' ? 'Register new business' : currentLang === 'ku' ? 'کارێکی نوێ تۆمار بکە' : 'سجل عمل جديد',
      otpTitle: currentLang === 'en' ? 'Verify OTP' : currentLang === 'ku' ? 'کۆدی OTP پشتڕاست بکە' : 'تأكيد رمز OTP',
      otpHint: currentLang === 'en' ? 'Enter the code sent to your phone.' : currentLang === 'ku' ? 'کۆدەکە بنووسە.' : 'أدخل الرمز المرسل إلى هاتفك.',
      verify: currentLang === 'en' ? 'Verify' : currentLang === 'ku' ? 'پشتڕاستکردن' : 'تحقق',
      back: currentLang === 'en' ? 'Back' : currentLang === 'ku' ? 'گەڕانەوە' : 'رجوع',
      selectBusiness: currentLang === 'en' ? 'Select your business' : currentLang === 'ku' ? 'کارەکەت هەڵبژێرە' : 'اختر عملك',
      noOtp: currentLang === 'en' ? 'Could not send OTP. Try again.' : currentLang === 'ku' ? 'OTP نەنێردرا. دووبارە هەوڵ بدە.' : 'تعذر إرسال الرمز. حاول مرة أخرى.',
      suspicious: currentLang === 'en' ? 'This claim needs review.' : currentLang === 'ku' ? 'ئەم داواکارییە پێویستی بە پێداچوونەوەیە.' : 'هذا الطلب يحتاج مراجعة.',
    };
  }, [currentLang]);

  const manualResults = useMemo(() => {
    const q = manualQuery.trim().toLowerCase();
    return allBusinesses
      .filter((b) => (manualGov === 'all' ? true : b.governorate === manualGov))
      .filter((b) => (manualCategory === 'all' ? true : b.category === manualCategory))
      .map((b) => {
        const name = (b.name[currentLang] || b.name.en || '').toLowerCase();
        const addr = (b.address[currentLang] || b.address.en || '').toLowerCase();
        const category = (b.category || '').toLowerCase();
        const score =
          !q
            ? 0
            : (name.includes(q) ? 4 : 0) +
              (addr.includes(q) ? 2 : 0) +
              (category.includes(q) ? 1 : 0);
        return { b, score };
      })
      .filter(({ score }) => (q ? score > 0 : true))
      .sort((a, c) => c.score - a.score)
      .slice(0, 30)
      .map(({ b }) => b);
  }, [allBusinesses, manualCategory, manualGov, manualQuery, currentLang]);

  if (!isOpen) return null;

  const ensureRecaptcha = () => {
    if (recaptchaRef.current) return recaptchaRef.current;
    // Firebase expects a DOM element id for reCAPTCHA
    const verifier = new RecaptchaVerifier(auth, 'owner-claim-recaptcha', {
      size: 'invisible',
    });
    recaptchaRef.current = verifier;
    return verifier;
  };

  const runPhoneSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const normalized = normalizePhoneForSearch(phoneInput, { defaultCountryCallingCode: countryCallingCode });
      if (!normalized.tokens.length) {
        setError(currentLang === 'en' ? 'Enter a valid phone number.' : currentLang === 'ku' ? 'ژمارەی دروست بنووسە.' : 'أدخل رقم هاتف صحيح.');
        return;
      }

      // Preferred scalable path: query by phoneSearchTokens array-contains-any
      // Fallback path: local filter (works even if businesses are not backfilled with tokens yet)
      let found: Business[] = [];
      try {
        const qref = query(
          collection(db, 'businesses'),
          where('phoneSearchTokens', 'array-contains-any', normalized.tokens)
        );
        const snap = await getDocs(qref);
        const list: Business[] = [];
        snap.forEach((d) => list.push(d.data() as Business));
        found = list;
      } catch {
        // ignore and fallback
      }

      if (!found.length) {
        const tokenSet = new Set(normalized.tokens);
        found = allBusinesses.filter((b) => {
          const bt = inferBizPhoneTokens(b);
          return bt.some((t) => tokenSet.has(t));
        });
      }

      // Deduplicate by id
      const uniq = new Map<string, Business>();
      found.forEach((b) => uniq.set(b.id, b));
      const finalFound = Array.from(uniq.values());

      setMatches(finalFound);
      if (finalFound.length === 1) {
        setSelectedBusinessId(finalFound[0].id);
        setStep('matches');
      } else if (finalFound.length > 1) {
        setStep('matches');
      } else {
        setStep('manual'); // show "not found" view with actions, including manual search
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to search.');
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (businessId: string) => {
    setLoading(true);
    setError('');
    try {
      const normalized = normalizePhoneForSearch(phoneInput, { defaultCountryCallingCode: countryCallingCode });
      if (!normalized.e164) {
        setError(currentLang === 'en' ? 'Enter a valid phone number.' : currentLang === 'ku' ? 'ژمارەی دروست بنووسە.' : 'أدخل رقم هاتف صحيح.');
        return;
      }

      // Rate limit by phone hash + by current auth uid (if any)
      // (Firebase Phone Auth also rate limits, but we add app-level protections + logging.)
      const phoneHash = await sha256Hex(`claim:${normalized.e164}`);
      await reserveCooldown(`otp_send_phone_${phoneHash}`, 60);
      if (auth.currentUser?.uid) {
        await reserveCooldown(`otp_send_uid_${auth.currentUser.uid}`, 30);
      }

      const verifier = ensureRecaptcha();
      const result = await signInWithPhoneNumber(auth, normalized.e164, verifier);
      setConfirmation(result);
      setStep('otp');

      // Create a lightweight claim stub now (status decided after OTP)
      const claimId = `claim_${businessId}_${Date.now()}`;
      const claim: OwnershipClaim = {
        id: claimId,
        user_id: 'pending_auth',
        business_id: businessId,
        phone_e164: normalized.e164,
        status: 'pending',
        suspicious: false,
        created_at: nowIso(),
        created_at_ts: Timestamp.now(),
      };
      await setDoc(doc(db, 'ownership_claims', claimId), claim, { merge: true });
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.startsWith('RATE_LIMIT:')) {
        const seconds = msg.split(':')[1] || '0';
        setError(
          currentLang === 'en'
            ? `Please wait ${seconds}s before trying again.`
            : currentLang === 'ku'
            ? `تکایە ${seconds}s چاوەڕێ بکە.`
            : `يرجى الانتظار ${seconds}s قبل المحاولة مرة أخرى.`
        );
      } else {
        setError(ui.noOtp);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndLink = async () => {
    if (!confirmation || !selectedBusinessId) return;
    setLoading(true);
    setError('');
    try {
      const normalized = normalizePhoneForSearch(phoneInput, { defaultCountryCallingCode: countryCallingCode });
      const cred = await confirmation.confirm(otp.trim());
      const firebaseUser = cred.user;

      // Upsert user profile (minimal, fast onboarding)
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      const base = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || 'Business Owner',
        photoURL:
          firebaseUser.photoURL ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        email: firebaseUser.email || '',
        phone: normalized.e164,
        createdAt: userSnap.exists() ? (userSnap.data() as any).createdAt || nowIso() : nowIso(),
        role: 'owner' as const,
        onboarded: true,
      };
      await setDoc(userRef, base, { merge: true });

      // Suspicious detection (v1 hardened):
      // - business already has verified owner(s)
      // - user already owns another business (future policy; for now: flag)
      // - repeated claims from same phone in short time window
      let suspicious = false;
      let reason = '';
      try {
        const ownersSnap = await getDocs(
          query(collection(db, 'business_owners'), where('business_id', '==', selectedBusinessId), where('verified', '==', true))
        );
        if (!ownersSnap.empty) {
          suspicious = true;
          reason = 'Existing verified owners found';
        }
      } catch {
        // ignore
      }

      try {
        const myOwnersSnap = await getDocs(
          query(collection(db, 'business_owners'), where('user_id', '==', firebaseUser.uid), where('verified', '==', true))
        );
        if (!myOwnersSnap.empty) {
          suspicious = true;
          reason = reason ? `${reason}; user already has verified ownership` : 'User already has verified ownership';
        }
      } catch {
        // ignore
      }

      try {
        // last 10 minutes claims by same phone
        const tenMinAgo = Timestamp.fromMillis(Date.now() - 10 * 60 * 1000);
        const phoneClaimsSnap = await getDocs(
          query(collection(db, 'ownership_claims'), where('phone_e164', '==', normalized.e164 || ''))
        );
        let recent = 0;
        phoneClaimsSnap.forEach((d) => {
          const data = d.data() as any;
          const ts = data.created_at_ts as Timestamp | undefined;
          if (ts && ts.toMillis() >= tenMinAgo.toMillis()) recent += 1;
        });
        if (recent >= 3) {
          suspicious = true;
          reason = reason ? `${reason}; too many recent claims` : 'Too many recent claims';
        }
      } catch {
        // ignore
      }

      // Finalize claim record
      const claimId = `claim_${selectedBusinessId}_${Date.now()}`;
      const claim: OwnershipClaim = {
        id: claimId,
        user_id: firebaseUser.uid,
        business_id: selectedBusinessId,
        phone_e164: normalized.e164 || '',
        status: suspicious ? 'pending' : 'approved',
        suspicious,
        reason: suspicious ? reason : undefined,
        created_at: nowIso(),
        created_at_ts: Timestamp.now(),
        decided_at: suspicious ? undefined : nowIso(),
        decided_at_ts: suspicious ? undefined : Timestamp.now(),
        decided_by: suspicious ? undefined : 'auto',
      };
      await setDoc(doc(db, 'ownership_claims', claimId), claim, { merge: true });

      if (!suspicious) {
        // Create business owner link
        const ownerId = `${firebaseUser.uid}_${selectedBusinessId}`;
        await setDoc(
          doc(db, 'business_owners', ownerId),
          {
            id: ownerId,
            user_id: firebaseUser.uid,
            business_id: selectedBusinessId,
            role: 'owner',
            verified: true,
            created_at: nowIso(),
          },
          { merge: true }
        );
      }

      setStep('done');
      setTimeout(() => {
        onClose();
        onClaimSuccess(selectedBusinessId);
      }, 600);
    } catch (e: any) {
      setError(e?.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const selectedBusiness = matches.find((m) => m.id === selectedBusinessId) || allBusinesses.find((b) => b.id === selectedBusinessId) || null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl"
      />

      <motion.div
        initial={{ scale: 0.97, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.97, y: 16, opacity: 0 }}
        className="relative bg-[#101014] border border-luxury-gold/25 rounded-[28px] w-full max-w-lg p-5 sm:p-6 overflow-hidden shadow-2xl z-[1000] text-white"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="absolute top-[-30%] left-[-30%] w-72 h-72 bg-luxury-teal/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-30%] w-72 h-72 bg-luxury-gold/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition border border-white/5`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-5 relative">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-luxury-teal to-luxury-gold flex items-center justify-center text-white shadow-lg border border-white/10">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-black bg-gradient-to-r from-luxury-gold to-white bg-clip-text text-transparent">
              {ui.title}
            </h2>
            <p className="text-[11px] text-zinc-400 max-w-sm mx-auto leading-relaxed">
              {ui.subtitle}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-200 flex items-start gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="font-semibold leading-normal">{error}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-luxury-gold/80 tracking-wider block font-mono">
                    {ui.phoneLabel}
                  </label>
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <select
                      value={countryCallingCode}
                      onChange={(e) => setCountryCallingCode(e.target.value)}
                      className="bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-3 py-3 rounded-xl text-white focus:outline-none transition font-semibold"
                    >
                      <option value="964">🇮🇶 +964</option>
                      <option value="966">🇸🇦 +966</option>
                      <option value="971">🇦🇪 +971</option>
                      <option value="962">🇯🇴 +962</option>
                      <option value="965">🇰🇼 +965</option>
                      <option value="20">🇪🇬 +20</option>
                      <option value="90">🇹🇷 +90</option>
                    </select>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder={currentLang === 'en' ? 'e.g. 07712345678' : currentLang === 'ku' ? 'وەک: 07712345678' : 'مثال: 07712345678'}
                      className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition font-semibold"
                    />
                  </div>
                </div>

                <button
                  onClick={runPhoneSearch}
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-luxury-teal via-[#1E4143] to-luxury-gold hover:opacity-90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-xl border border-white/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span>{ui.continue}</span>
                </button>

                <div id="owner-claim-recaptcha" />
              </motion.div>
            )}

            {step === 'matches' && (
              <motion.div
                key="matches"
                initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep('phone')}
                    className="text-xs text-zinc-300 hover:text-white transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{ui.back}</span>
                  </button>
                  <span className="text-[10px] text-zinc-500 font-mono font-bold">
                    {matches.length} {currentLang === 'en' ? 'match(es)' : currentLang === 'ku' ? 'هاوشێوە' : 'مطابقة'}
                  </span>
                </div>

                {matches.length === 1 && selectedBusiness ? (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3 items-start">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                      <img src={bizCover(selectedBusiness)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-white truncate">{selectedBusiness.name[currentLang] || selectedBusiness.name.en}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                        {CATEGORIES.find((c) => c.id === selectedBusiness.category)?.name[currentLang] || selectedBusiness.category}{' '}
                        • {GOVERNORATES.find((g) => g.code === selectedBusiness.governorate)?.name[currentLang] || selectedBusiness.governorate}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                        {selectedBusiness.address[currentLang] || selectedBusiness.address.en}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs font-black text-zinc-200">{ui.selectBusiness}</div>
                    <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                      {matches.map((b) => {
                        const active = selectedBusinessId === b.id;
                        return (
                          <button
                            key={b.id}
                            onClick={() => setSelectedBusinessId(b.id)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition flex gap-3 items-start ${
                              active ? 'bg-luxury-teal/15 border-luxury-teal' : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                              <img src={bizCover(b)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-black text-white truncate">{b.name[currentLang] || b.name.en}</div>
                              <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                                {CATEGORIES.find((c) => c.id === b.category)?.name[currentLang] || b.category}{' '}
                                • {GOVERNORATES.find((g) => g.code === b.governorate)?.name[currentLang] || b.governorate}
                              </div>
                            </div>
                            {active && <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setStep('manual')}
                    className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-black uppercase tracking-wider text-zinc-200 transition"
                  >
                    {ui.notMine}
                  </button>
                  <button
                    disabled={!selectedBusinessId || loading}
                    onClick={() => selectedBusinessId && sendOtp(selectedBusinessId)}
                    className="py-3 rounded-xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-xs font-black uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    <span>{ui.thisIsMine}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'manual' && (
              <motion.div
                key="manual"
                initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
                className="space-y-4"
              >
                <button
                  onClick={() => setStep('phone')}
                  className="text-xs text-zinc-300 hover:text-white transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{ui.back}</span>
                </button>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-xs font-black text-white">{ui.couldntFind}</div>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    {currentLang === 'en'
                      ? 'Try manual search (fast) or request a new listing.'
                      : currentLang === 'ku'
                      ? 'بەدەست بگەڕێ (خێرا) یان داواکارییەک بنێرە بۆ زیادکردن.'
                      : 'جرّب البحث اليدوي (سريع) أو اطلب إضافة نشاط جديد.'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setStep('manual')}
                      className="py-3 rounded-xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-xs font-black uppercase tracking-wider transition"
                    >
                      {ui.searchManually}
                    </button>
                    <button
                      onClick={() => {
                        // V1: send them to existing Host tab (will be refactored to "request listing" later)
                        onClose();
                      }}
                      className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-black uppercase tracking-wider text-zinc-200 transition"
                    >
                      {ui.registerNew}
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] uppercase font-black text-luxury-gold/80 tracking-wider block font-mono">
                      {currentLang === 'en' ? 'Manual search' : currentLang === 'ku' ? 'گەڕانی دەستی' : 'بحث يدوي'}
                    </div>
                    <input
                      value={manualQuery}
                      onChange={(e) => setManualQuery(e.target.value)}
                      placeholder={currentLang === 'en' ? 'Type business name or address…' : currentLang === 'ku' ? 'ناو یان ناونیشان…' : 'اكتب الاسم أو العنوان…'}
                      className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition font-semibold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={manualGov}
                        onChange={(e) => setManualGov(e.target.value as any)}
                        className="bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-3 py-3 rounded-xl text-white focus:outline-none transition font-semibold"
                      >
                        <option value="all">{currentLang === 'en' ? 'All governorates' : currentLang === 'ku' ? 'هەموو پارێزگا' : 'كل المحافظات'}</option>
                        {GOVERNORATES.filter((g) => g.code !== 'all').map((g) => (
                          <option key={g.code} value={g.code}>
                            {g.name[currentLang]}
                          </option>
                        ))}
                      </select>
                      <select
                        value={manualCategory}
                        onChange={(e) => setManualCategory(e.target.value)}
                        className="bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-3 py-3 rounded-xl text-white focus:outline-none transition font-semibold"
                      >
                        <option value="all">{currentLang === 'en' ? 'All categories' : currentLang === 'ku' ? 'هەموو پۆلەکان' : 'كل الفئات'}</option>
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.icon} {c.name[currentLang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                      {manualResults.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBusinessId(b.id);
                            setMatches((prev) => (prev.some((x) => x.id === b.id) ? prev : [b, ...prev]));
                            setStep('matches');
                          }}
                          className="w-full text-left p-3 rounded-2xl border bg-white/5 border-white/10 hover:border-white/20 transition flex gap-3 items-start"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                            <img src={bizCover(b)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-black text-white truncate">{b.name[currentLang] || b.name.en}</div>
                            <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                              {CATEGORIES.find((c) => c.id === b.category)?.name[currentLang] || b.category}{' '}
                              • {GOVERNORATES.find((g) => g.code === b.governorate)?.name[currentLang] || b.governorate}
                            </div>
                          </div>
                        </button>
                      ))}
                      {!manualResults.length && (
                        <div className="text-center text-xs text-zinc-500 py-6">
                          {currentLang === 'en'
                            ? 'No results. Try a shorter keyword.'
                            : currentLang === 'ku'
                            ? 'هیچ ئەنجامێک نییە. وشەی کورتتر بنووسە.'
                            : 'لا توجد نتائج. جرّب كلمة أقصر.'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep('matches')}
                    className="text-xs text-zinc-300 hover:text-white transition flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{ui.back}</span>
                  </button>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-xs font-black text-white">{ui.otpTitle}</div>
                  <div className="text-[11px] text-zinc-400 mt-1">{ui.otpHint}</div>
                </div>

                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  inputMode="numeric"
                  placeholder="123456"
                  className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition font-semibold tracking-widest text-center"
                />

                <button
                  onClick={verifyOtpAndLink}
                  disabled={loading || otp.trim().length < 4}
                  className="w-full py-3.5 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-xl border border-white/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{ui.verify}</span>
                </button>

                <div className="text-[10px] text-zinc-500 text-center">
                  {currentLang === 'en'
                    ? 'Protected by OTP + Firebase reCAPTCHA.'
                    : currentLang === 'ku'
                    ? 'پارێزراو بە OTP + reCAPTCHA.'
                    : 'محمي عبر OTP و reCAPTCHA.'}
                </div>
              </motion.div>
            )}

            {step === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="p-5 bg-emerald-950/35 border border-emerald-500/20 rounded-2xl text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-sm font-black text-white mt-2">
                    {currentLang === 'en'
                      ? 'Business unlocked'
                      : currentLang === 'ku'
                      ? 'کارەکە کرایەوە'
                      : 'تم فتح لوحة التحكم'}
                  </div>
                  <div className="text-[11px] text-emerald-200/80 mt-1">
                    {currentLang === 'en'
                      ? 'Redirecting to your dashboard…'
                      : currentLang === 'ku'
                      ? 'دەچیت بۆ داشبۆرد…'
                      : 'جارٍ تحويلك للوحة التحكم…'}
                  </div>
                </div>

                {selectedBusiness && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                      <img src={bizCover(selectedBusiness)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black text-white truncate">{selectedBusiness.name[currentLang] || selectedBusiness.name.en}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 truncate">
                        {GOVERNORATES.find((g) => g.code === selectedBusiness.governorate)?.name[currentLang] || selectedBusiness.governorate}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-1 text-center">
            <span className="text-[10px] text-zinc-500">
              {currentLang === 'en'
                ? 'Your business already exists. Unlock and manage it.'
                : currentLang === 'ku'
                ? 'کارەکەت هەیە. بکەرەوە و بەڕێوەببە.'
                : 'عملك موجود مسبقاً. افتحه وأدره.'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

