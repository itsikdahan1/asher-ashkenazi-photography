import { useEffect, useState, type Key, type ReactNode } from 'react';
import { ArrowRight, Download, LogOut, Plus, RefreshCw, Save, Trash2, Upload } from 'lucide-react';
import { DEFAULT_CONTENT } from '../data/defaultContent';
import { useContent } from '../contexts/ContentContext';
import { getFirebaseAuth, isAllowedAdminEmail, isFirebaseConfigured, signInWithGoogle, signOutAdmin } from '../services/firebaseAuth';
import { uploadSiteImage } from '../services/mediaUpload';
import type { FeatureItem, GalleryImage, IconKey, LogoItem, PackageItem, ServiceItem, SiteContent, TestimonialItem } from '../types';
import { onAuthStateChanged, type User } from 'firebase/auth';

const tabs = [
  { id: 'business', label: 'עסק' },
  { id: 'home', label: 'בית' },
  { id: 'features', label: 'יתרונות' },
  { id: 'services', label: 'שירותים' },
  { id: 'packaging', label: 'אריזה' },
  { id: 'gallery', label: 'גלריה' },
  { id: 'testimonials', label: 'המלצות' },
  { id: 'logos', label: 'לוגואים' },
  { id: 'packages', label: 'חבילות' },
] as const;

type TabId = typeof tabs[number]['id'];

const iconOptions: Array<{ value: IconKey; label: string }> = [
  { value: 'camera', label: 'מצלמה' },
  { value: 'layers', label: 'שכבות' },
  { value: 'users', label: 'אנשים' },
  { value: 'shield', label: 'מגן' },
  { value: 'sparkles', label: 'נצנוץ' },
  { value: 'box', label: 'מארז' },
  { value: 'heart', label: 'לב' },
  { value: 'clock', label: 'שעון' },
];

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const splitLines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

const Field = ({ label, value, onChange, placeholder = '', type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-bold text-cream/70">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition focus:border-turquoise"
    />
  </label>
);

const TextArea = ({ label, value, onChange, rows = 4, placeholder = '' }: { label: string; value: string; onChange: (value: string) => void; rows?: number; placeholder?: string }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-bold text-cream/70">{label}</span>
    <textarea
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition focus:border-turquoise"
    />
  </label>
);

const ImageField = ({ label, value, onChange, onUpload, uploadLabel = 'העלה תמונה', isUploading = false }: { label: string; value: string; onChange: (value: string) => void; onUpload: (file: File) => void; uploadLabel?: string; isUploading?: boolean }) => (
  <div className="space-y-3">
    <Field label={label} value={value} onChange={onChange} />
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-black text-turquoise transition hover:bg-turquoise/15">
      <Upload size={16} /> {isUploading ? 'מעלה...' : uploadLabel}
      <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(event) => {
        const file = event.target.files?.[0];
        event.target.value = '';

        if (file) {
          onUpload(file);
        }
      }} />
    </label>
    {value && <img src={value} alt="" className="h-28 w-full rounded-2xl object-cover" />}
  </div>
);

const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`rounded-full px-4 py-2 text-sm font-bold transition ${checked ? 'bg-turquoise text-charcoal' : 'bg-white/10 text-cream/60'}`}
  >
    {label}: {checked ? 'פעיל' : 'כבוי'}
  </button>
);

const Card = ({ children }: { children: ReactNode; key?: Key }) => (
  <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
    {children}
  </div>
);

type UploadImageHandler = (file: File, folder: string, onUrl: (url: string) => void) => Promise<void>;

export default function AdminPage() {
  const { content, saveContent, reloadContent, isRemoteConfigured, source, error } = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<TabId>('business');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState('');
  const [accessError, setAccessError] = useState('');
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setIsAuthLoading(false);
      return;
    }

    return onAuthStateChanged(auth, async (user) => {
      if (user && isAllowedAdminEmail(user.email)) {
        setAdminUser(user);
        setAccessError('');
      } else {
        setAdminUser(null);
        if (user) {
          await signOutAdmin();
          setAccessError('כתובת המייל הזו אינה מורשית לניהול האתר.');
        }
      }

      setIsAuthLoading(false);
    });
  }, []);

  const patch = (updater: (current: SiteContent) => SiteContent) => {
    setDraft((current) => updater(current));
  };

  const handleGoogleLogin = async () => {
    setAccessError('');

    try {
      const user = await signInWithGoogle();
      setAdminUser(user);
    } catch (loginError) {
      setAccessError(loginError instanceof Error ? loginError.message : 'הכניסה עם Google נכשלה');
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    setAdminUser(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatus('');

    try {
      await saveContent(draft);
      setStatus(isRemoteConfigured ? 'נשמר ופורסם לכל הגולשים דרך Firebase.' : 'נשמר כטיוטה מקומית. כדי לפרסם לכולם יש להגדיר Firebase בפריסה ולהפעיל Firestore.');
    } catch (saveError) {
      setStatus(saveError instanceof Error ? saveError.message : 'השמירה נכשלה');
    } finally {
      setIsSaving(false);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'asher-site-content.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File | null) => {
    if (!file) {
      return;
    }

    const text = await file.text();
    setDraft(JSON.parse(text) as SiteContent);
    setStatus('הקובץ נטען לטיוטה. יש ללחוץ שמירה כדי לפרסם.');
  };

  const handleImageUpload = async (file: File, folder: string, onUrl: (url: string) => void) => {
    const uploadKey = `${folder}-${file.name}`;
    setUploadingField(uploadKey);
    setStatus('מעלה תמונה ל-Firebase Storage...');

    try {
      const url = await uploadSiteImage(file, folder);
      onUrl(url);
      setStatus('התמונה עלתה ונשמרה בטיוטה. יש ללחוץ שמור הכל כדי לפרסם את התוכן.');
    } catch (uploadError) {
      setStatus(uploadError instanceof Error ? uploadError.message : 'העלאת התמונה נכשלה');
    } finally {
      setUploadingField('');
    }
  };

  const enabledGallery = draft.gallery.images.filter((item) => item.enabled);

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-charcoal px-4 py-8 text-cream" dir="rtl">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">
            <h1 className="text-3xl font-black">בודק הרשאות...</h1>
          </div>
        </div>
      </main>
    );
  }

  if (!adminUser) {
    return (
      <main className="min-h-screen bg-charcoal px-4 py-8 text-cream" dir="rtl">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
            <a href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-turquoise">
              <ArrowRight size={16} /> חזרה לאתר
            </a>
            <h1 className="mb-3 text-4xl font-black tracking-tight">כניסה לניהול</h1>
            <p className="mb-8 text-cream/55">הכניסה לאדמין מוגבלת לחשבונות Google מורשים בלבד.</p>
            {!isFirebaseConfigured && (
              <p className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">
                Firebase לא מוגדר. יש להגדיר את משתני הסביבה של Firebase ב-Vercel.
              </p>
            )}
            {accessError && <p className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">{accessError}</p>}
            <button type="button" onClick={() => void handleGoogleLogin()} disabled={!isFirebaseConfigured} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-turquoise px-6 py-4 font-black text-charcoal transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
              כניסה עם Google
            </button>
            <p className="mt-6 text-xs leading-relaxed text-cream/40">
              מורשים: asher7676@gmail.com, itsikdahan1@gmail.com
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-charcoal px-4 py-8 text-cream" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="/" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-turquoise">
              <ArrowRight size={16} /> חזרה לאתר
            </a>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">ניהול תוכן האתר</h1>
            <p className="mt-3 max-w-3xl text-cream/55">כאן מנהלים רק תוכן אמיתי. אזור שלא הוזן בו תוכן יוסתר או יציג מצב ריק נקי באתר הציבורי.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => void handleSignOut()} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-cream transition hover:bg-white/10">
              <LogOut size={18} /> יציאה
            </button>
            <button onClick={handleSave} disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 font-black text-charcoal transition hover:brightness-110 disabled:opacity-50">
              <Save size={18} /> {isSaving ? 'שומר...' : 'שמור הכל'}
            </button>
            <button onClick={() => void reloadContent()} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-cream transition hover:bg-white/10">
              <RefreshCw size={18} /> טעינה מחדש
            </button>
          </div>
        </header>

        {(status || error) && (
          <div className="mb-6 rounded-2xl border border-turquoise/30 bg-turquoise/10 p-4 text-sm font-bold text-turquoise">
            {status || error}
          </div>
        )}

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <span className="block text-xs font-bold uppercase tracking-widest text-cream/40">מקור תוכן פעיל</span>
            <strong className="mt-2 block text-2xl text-turquoise">{source === 'remote' ? 'Firebase' : source === 'local' ? 'דפדפן מקומי' : 'ברירת מחדל נקייה'}</strong>
          </Card>
          <Card>
            <span className="block text-xs font-bold uppercase tracking-widest text-cream/40">פרסום לכל הגולשים</span>
            <strong className="mt-2 block text-2xl text-turquoise">{isRemoteConfigured ? 'פעיל' : 'לא מוגדר'}</strong>
          </Card>
          <Card>
            <span className="block text-xs font-bold uppercase tracking-widest text-cream/40">תמונות גלריה פעילות</span>
            <strong className="mt-2 block text-2xl text-turquoise">{enabledGallery.length}</strong>
          </Card>
        </div>

        <nav className="mb-8 flex gap-3 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${activeTab === tab.id ? 'bg-turquoise text-charcoal' : 'text-cream/60 hover:bg-white/10 hover:text-cream'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'business' && (
          <section className="grid gap-6 md:grid-cols-2">
            <Field label="שם העסק" value={draft.business.name} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, name: value } }))} />
            <Field label="סלוגן קצר" value={draft.business.tagline} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, tagline: value } }))} />
            <Field label="מספר וואטסאפ בינלאומי" value={draft.business.whatsappNumber} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, whatsappNumber: value } }))} />
            <Field label="אימייל" value={draft.business.email} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, email: value } }))} />
            <Field label="קישור אינסטגרם" value={draft.business.instagramUrl} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, instagramUrl: value } }))} />
            <Field label="קישור פייסבוק" value={draft.business.facebookUrl} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, facebookUrl: value } }))} />
            <ImageField label="לוגו" value={draft.business.logoUrl} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, logoUrl: value } }))} onUpload={(file) => void handleImageUpload(file, 'business', (url) => patch((current) => ({ ...current, business: { ...current.business, logoUrl: url } })))} isUploading={uploadingField.startsWith('business-')} />
            <Field label="מדיניות פרטיות" value={draft.business.privacyPolicyUrl} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, privacyPolicyUrl: value } }))} />
            <Field label="תקנון אתר" value={draft.business.termsUrl} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, termsUrl: value } }))} />
            <TextArea label="תיאור עסק" value={draft.business.description} onChange={(value) => patch((current) => ({ ...current, business: { ...current.business, description: value } }))} />
          </section>
        )}

        {activeTab === 'home' && (
          <section className="grid gap-6 md:grid-cols-2">
            <Field label="טקסט עליון קטן" value={draft.hero.eyebrow} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, eyebrow: value } }))} />
            <Field label="כותרת ראשית" value={draft.hero.titleLine} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, titleLine: value } }))} />
            <Field label="מילת הדגשה" value={draft.hero.titleAccent} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, titleAccent: value } }))} />
            <ImageField label="תמונת רקע" value={draft.hero.backgroundImageUrl} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, backgroundImageUrl: value } }))} onUpload={(file) => void handleImageUpload(file, 'hero', (url) => patch((current) => ({ ...current, hero: { ...current.hero, backgroundImageUrl: url } })))} isUploading={uploadingField.startsWith('hero-')} />
            <Field label="כפתור ראשי" value={draft.hero.primaryCtaLabel} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, primaryCtaLabel: value } }))} />
            <Field label="כפתור גלריה" value={draft.hero.secondaryCtaLabel} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, secondaryCtaLabel: value } }))} />
            <TextArea label="תיאור קצר" value={draft.hero.subtitle} onChange={(value) => patch((current) => ({ ...current, hero: { ...current.hero, subtitle: value } }))} rows={5} />
          </section>
        )}

        {activeTab === 'features' && (
          <EditableFeatures draft={draft} patch={patch} />
        )}

        {activeTab === 'services' && (
          <EditableServices draft={draft} patch={patch} uploadImage={handleImageUpload} uploadingField={uploadingField} />
        )}

        {activeTab === 'packaging' && (
          <EditablePackaging draft={draft} patch={patch} uploadImage={handleImageUpload} uploadingField={uploadingField} />
        )}

        {activeTab === 'gallery' && (
          <EditableGallery draft={draft} patch={patch} uploadImage={handleImageUpload} uploadingField={uploadingField} />
        )}

        {activeTab === 'testimonials' && (
          <EditableTestimonials draft={draft} patch={patch} />
        )}

        {activeTab === 'logos' && (
          <EditableLogos draft={draft} patch={patch} uploadImage={handleImageUpload} uploadingField={uploadingField} />
        )}

        {activeTab === 'packages' && (
          <EditablePackages draft={draft} patch={patch} />
        )}

        {activeTab === 'packages' && (
          <section className="mt-6">
            <Card>
              <h2 className="mb-4 text-2xl font-black">גיבוי ידני</h2>
              <div className="flex flex-wrap gap-3">
                <button onClick={exportJson} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-cream">
                  <Download size={18} /> ייצוא JSON
                </button>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-cream">
                  <Upload size={18} /> ייבוא JSON
                  <input type="file" accept="application/json" className="hidden" onChange={(event) => void importJson(event.target.files?.[0] ?? null)} />
                </label>
                <button onClick={() => setDraft(DEFAULT_CONTENT)} className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-6 py-3 font-bold text-red-200">
                  <Trash2 size={18} /> איפוס לטהור
                </button>
              </div>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}

function EditableFeatures({ draft, patch }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void }) {
  const addItem = () => patch((current) => ({
    ...current,
    features: {
      ...current.features,
      items: [...current.features.items, { id: createId('feature'), title: '', description: '', icon: 'shield', size: 'small', enabled: true }],
    },
  }));

  const updateItem = (id: string, changes: Partial<FeatureItem>) => patch((current) => ({
    ...current,
    features: { ...current.features, items: current.features.items.map((item) => item.id === id ? { ...item, ...changes } : item) },
  }));

  const removeItem = (id: string) => patch((current) => ({
    ...current,
    features: { ...current.features, items: current.features.items.filter((item) => item.id !== id) },
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="כותרת" value={draft.features.title} onChange={(value) => patch((current) => ({ ...current, features: { ...current.features, title: value } }))} />
        <Field label="הדגשה" value={draft.features.accent} onChange={(value) => patch((current) => ({ ...current, features: { ...current.features, accent: value } }))} />
        <Field label="תת כותרת" value={draft.features.subtitle} onChange={(value) => patch((current) => ({ ...current, features: { ...current.features, subtitle: value } }))} />
      </div>
      <button onClick={addItem} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-3 font-black text-charcoal"><Plus size={18} /> הוסף יתרון</button>
      <div className="grid gap-5 lg:grid-cols-2">
        {draft.features.items.map((item) => (
          <Card key={item.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Toggle label="תצוגה" checked={item.enabled} onChange={(value) => updateItem(item.id, { enabled: value })} />
              <button onClick={() => removeItem(item.id)} className="text-red-300"><Trash2 size={18} /></button>
            </div>
            <div className="grid gap-4">
              <Field label="כותרת" value={item.title} onChange={(value) => updateItem(item.id, { title: value })} />
              <TextArea label="תיאור" value={item.description} onChange={(value) => updateItem(item.id, { description: value })} />
              <select value={item.icon} onChange={(event) => updateItem(item.id, { icon: event.target.value as IconKey })} className="rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-cream">
                {iconOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <select value={item.size} onChange={(event) => updateItem(item.id, { size: event.target.value as FeatureItem['size'] })} className="rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-cream">
                <option value="small">רגיל</option>
                <option value="large">גדול</option>
              </select>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EditableServices({ draft, patch, uploadImage, uploadingField }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void; uploadImage: UploadImageHandler; uploadingField: string }) {
  const addItem = () => patch((current) => ({
    ...current,
    services: {
      ...current.services,
      items: [...current.services.items, { id: createId('service'), title: '', subtitle: '', description: '', imageUrl: '', icon: 'camera', enabled: true }],
    },
  }));

  const updateItem = (id: string, changes: Partial<ServiceItem>) => patch((current) => ({
    ...current,
    services: { ...current.services, items: current.services.items.map((item) => item.id === id ? { ...item, ...changes } : item) },
  }));

  const removeItem = (id: string) => patch((current) => ({
    ...current,
    services: { ...current.services, items: current.services.items.filter((item) => item.id !== id) },
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="כותרת" value={draft.services.title} onChange={(value) => patch((current) => ({ ...current, services: { ...current.services, title: value } }))} />
        <Field label="הדגשה" value={draft.services.accent} onChange={(value) => patch((current) => ({ ...current, services: { ...current.services, accent: value } }))} />
        <Field label="תת כותרת" value={draft.services.subtitle} onChange={(value) => patch((current) => ({ ...current, services: { ...current.services, subtitle: value } }))} />
      </div>
      <button onClick={addItem} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-3 font-black text-charcoal"><Plus size={18} /> הוסף שירות</button>
      <div className="grid gap-5 lg:grid-cols-2">
        {draft.services.items.map((item) => (
          <Card key={item.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Toggle label="תצוגה" checked={item.enabled} onChange={(value) => updateItem(item.id, { enabled: value })} />
              <button onClick={() => removeItem(item.id)} className="text-red-300"><Trash2 size={18} /></button>
            </div>
            <div className="grid gap-4">
              <Field label="שם השירות" value={item.title} onChange={(value) => updateItem(item.id, { title: value })} />
              <Field label="שורת משנה" value={item.subtitle} onChange={(value) => updateItem(item.id, { subtitle: value })} />
              <ImageField label="תמונה" value={item.imageUrl} onChange={(value) => updateItem(item.id, { imageUrl: value })} onUpload={(file) => void uploadImage(file, `services/${item.id}`, (url) => updateItem(item.id, { imageUrl: url }))} isUploading={uploadingField.startsWith(`services/${item.id}-`)} />
              <TextArea label="תיאור" value={item.description} onChange={(value) => updateItem(item.id, { description: value })} />
              <select value={item.icon} onChange={(event) => updateItem(item.id, { icon: event.target.value as IconKey })} className="rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-cream">
                {iconOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EditablePackaging({ draft, patch, uploadImage, uploadingField }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void; uploadImage: UploadImageHandler; uploadingField: string }) {
  const addImage = (url: string) => patch((current) => ({
    ...current,
    packaging: { ...current.packaging, images: [...current.packaging.images, url] },
  }));

  return (
    <section className="space-y-6">
      <Card>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">אזור אריזה/מוצרי פרימיום</h2>
            <p className="mt-2 text-sm text-cream/50">אם האזור כבוי או ללא תמונות אמיתיות הוא יוסתר באתר הציבורי.</p>
          </div>
          <Toggle label="תצוגה" checked={draft.packaging.enabled} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, enabled: value } }))} />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="טקסט עליון" value={draft.packaging.eyebrow} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, eyebrow: value } }))} />
          <Field label="כותרת" value={draft.packaging.title} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, title: value } }))} />
          <Field label="הדגשה" value={draft.packaging.accent} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, accent: value } }))} />
          <Field label="כותרת תגית" value={draft.packaging.badgeTitle} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, badgeTitle: value } }))} />
          <Field label="טקסט תגית" value={draft.packaging.badgeText} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, badgeText: value } }))} />
          <TextArea label="תיאור" value={draft.packaging.description} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, description: value } }))} rows={5} />
          <TextArea label="נקודות - שורה לכל סעיף" value={draft.packaging.bullets.join('\n')} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, bullets: splitLines(value) } }))} rows={6} />
          <TextArea label="תמונות אמיתיות - קישור בכל שורה" value={draft.packaging.images.join('\n')} onChange={(value) => patch((current) => ({ ...current, packaging: { ...current.packaging, images: splitLines(value) } }))} rows={6} />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-black text-turquoise transition hover:bg-turquoise/15">
            <Upload size={16} /> {uploadingField.startsWith('packaging-') ? 'מעלה...' : 'העלה תמונת אריזה'}
            <input type="file" accept="image/*" className="hidden" disabled={uploadingField.startsWith('packaging-')} onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = '';

              if (file) {
                void uploadImage(file, 'packaging', addImage);
              }
            }} />
          </label>
        </div>
      </Card>
    </section>
  );
}

function EditableGallery({ draft, patch, uploadImage, uploadingField }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void; uploadImage: UploadImageHandler; uploadingField: string }) {
  const addItem = () => patch((current) => ({
    ...current,
    gallery: {
      ...current.gallery,
      images: [...current.gallery.images, { id: createId('gallery'), url: '', category: '', title: '', alt: '', featured: true, enabled: true }],
    },
  }));

  const updateItem = (id: string, changes: Partial<GalleryImage>) => patch((current) => ({
    ...current,
    gallery: { ...current.gallery, images: current.gallery.images.map((item) => item.id === id ? { ...item, ...changes } : item) },
  }));

  const removeItem = (id: string) => patch((current) => ({
    ...current,
    gallery: { ...current.gallery, images: current.gallery.images.filter((item) => item.id !== id) },
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="כותרת גלריה" value={draft.gallery.title} onChange={(value) => patch((current) => ({ ...current, gallery: { ...current.gallery, title: value } }))} />
        <Field label="הדגשה בגלריה" value={draft.gallery.accent} onChange={(value) => patch((current) => ({ ...current, gallery: { ...current.gallery, accent: value } }))} />
        <Field label="הודעה כשהגלריה ריקה" value={draft.gallery.emptyMessage} onChange={(value) => patch((current) => ({ ...current, gallery: { ...current.gallery, emptyMessage: value } }))} />
        <TextArea label="תיאור גלריה" value={draft.gallery.description} onChange={(value) => patch((current) => ({ ...current, gallery: { ...current.gallery, description: value } }))} />
      </div>
      <button onClick={addItem} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-3 font-black text-charcoal"><Plus size={18} /> הוסף תמונה</button>
      <div className="grid gap-5 lg:grid-cols-2">
        {draft.gallery.images.map((item) => (
          <Card key={item.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <Toggle label="תצוגה" checked={item.enabled} onChange={(value) => updateItem(item.id, { enabled: value })} />
                <Toggle label="בית" checked={item.featured} onChange={(value) => updateItem(item.id, { featured: value })} />
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-300"><Trash2 size={18} /></button>
            </div>
            <div className="grid gap-4">
              <ImageField label="תמונה" value={item.url} onChange={(value) => updateItem(item.id, { url: value })} onUpload={(file) => void uploadImage(file, `gallery/${item.id}`, (url) => updateItem(item.id, { url }))} isUploading={uploadingField.startsWith(`gallery/${item.id}-`)} />
              <Field label="קטגוריה" value={item.category} onChange={(value) => updateItem(item.id, { category: value })} />
              <Field label="כותרת" value={item.title} onChange={(value) => updateItem(item.id, { title: value })} />
              <Field label="טקסט נגישות" value={item.alt} onChange={(value) => updateItem(item.id, { alt: value })} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EditableTestimonials({ draft, patch }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void }) {
  const addItem = () => patch((current) => ({
    ...current,
    testimonials: {
      ...current.testimonials,
      items: [...current.testimonials.items, { id: createId('testimonial'), name: '', content: '', role: '', time: '', enabled: true }],
    },
  }));

  const updateItem = (id: string, changes: Partial<TestimonialItem>) => patch((current) => ({
    ...current,
    testimonials: { ...current.testimonials, items: current.testimonials.items.map((item) => item.id === id ? { ...item, ...changes } : item) },
  }));

  const removeItem = (id: string) => patch((current) => ({
    ...current,
    testimonials: { ...current.testimonials, items: current.testimonials.items.filter((item) => item.id !== id) },
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="כותרת" value={draft.testimonials.title} onChange={(value) => patch((current) => ({ ...current, testimonials: { ...current.testimonials, title: value } }))} />
        <Field label="הדגשה" value={draft.testimonials.accent} onChange={(value) => patch((current) => ({ ...current, testimonials: { ...current.testimonials, accent: value } }))} />
        <Field label="הערת תחתית" value={draft.testimonials.footerNote} onChange={(value) => patch((current) => ({ ...current, testimonials: { ...current.testimonials, footerNote: value } }))} />
      </div>
      <button onClick={addItem} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-3 font-black text-charcoal"><Plus size={18} /> הוסף המלצה</button>
      <div className="grid gap-5 lg:grid-cols-2">
        {draft.testimonials.items.map((item) => (
          <Card key={item.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Toggle label="תצוגה" checked={item.enabled} onChange={(value) => updateItem(item.id, { enabled: value })} />
              <button onClick={() => removeItem(item.id)} className="text-red-300"><Trash2 size={18} /></button>
            </div>
            <div className="grid gap-4">
              <Field label="שם" value={item.name} onChange={(value) => updateItem(item.id, { name: value })} />
              <Field label="תפקיד/אירוע" value={item.role} onChange={(value) => updateItem(item.id, { role: value })} />
              <Field label="שעה/תאריך" value={item.time} onChange={(value) => updateItem(item.id, { time: value })} />
              <TextArea label="תוכן ההמלצה" value={item.content} onChange={(value) => updateItem(item.id, { content: value })} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EditableLogos({ draft, patch, uploadImage, uploadingField }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void; uploadImage: UploadImageHandler; uploadingField: string }) {
  const addItem = () => patch((current) => ({
    ...current,
    logos: {
      ...current.logos,
      items: [...current.logos.items, { id: createId('logo'), name: '', imageUrl: '', url: '', enabled: true }],
    },
  }));

  const updateItem = (id: string, changes: Partial<LogoItem>) => patch((current) => ({
    ...current,
    logos: { ...current.logos, items: current.logos.items.map((item) => item.id === id ? { ...item, ...changes } : item) },
  }));

  const removeItem = (id: string) => patch((current) => ({
    ...current,
    logos: { ...current.logos, items: current.logos.items.filter((item) => item.id !== id) },
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="כותרת" value={draft.logos.title} onChange={(value) => patch((current) => ({ ...current, logos: { ...current.logos, title: value } }))} />
        <Field label="הדגשה" value={draft.logos.accent} onChange={(value) => patch((current) => ({ ...current, logos: { ...current.logos, accent: value } }))} />
        <Field label="תת כותרת" value={draft.logos.subtitle} onChange={(value) => patch((current) => ({ ...current, logos: { ...current.logos, subtitle: value } }))} />
      </div>
      <button onClick={addItem} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-3 font-black text-charcoal"><Plus size={18} /> הוסף לוגו</button>
      <div className="grid gap-5 lg:grid-cols-2">
        {draft.logos.items.map((item) => (
          <Card key={item.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Toggle label="תצוגה" checked={item.enabled} onChange={(value) => updateItem(item.id, { enabled: value })} />
              <button onClick={() => removeItem(item.id)} className="text-red-300"><Trash2 size={18} /></button>
            </div>
            <div className="grid gap-4">
              <Field label="שם" value={item.name} onChange={(value) => updateItem(item.id, { name: value })} />
              <ImageField label="תמונת לוגו" value={item.imageUrl} onChange={(value) => updateItem(item.id, { imageUrl: value })} onUpload={(file) => void uploadImage(file, `logos/${item.id}`, (url) => updateItem(item.id, { imageUrl: url }))} isUploading={uploadingField.startsWith(`logos/${item.id}-`)} />
              <Field label="קישור יעד" value={item.url} onChange={(value) => updateItem(item.id, { url: value })} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EditablePackages({ draft, patch }: { draft: SiteContent; patch: (updater: (current: SiteContent) => SiteContent) => void }) {
  const addItem = () => patch((current) => ({
    ...current,
    packages: {
      ...current.packages,
      items: [...current.packages.items, { id: createId('package'), name: '', description: '', price: '', features: [], highlight: false, enabled: true }],
    },
  }));

  const updateItem = (id: string, changes: Partial<PackageItem>) => patch((current) => ({
    ...current,
    packages: { ...current.packages, items: current.packages.items.map((item) => item.id === id ? { ...item, ...changes } : item) },
  }));

  const removeItem = (id: string) => patch((current) => ({
    ...current,
    packages: { ...current.packages, items: current.packages.items.filter((item) => item.id !== id) },
  }));

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="כותרת" value={draft.packages.title} onChange={(value) => patch((current) => ({ ...current, packages: { ...current.packages, title: value } }))} />
        <Field label="הדגשה" value={draft.packages.accent} onChange={(value) => patch((current) => ({ ...current, packages: { ...current.packages, accent: value } }))} />
        <Field label="תיאור" value={draft.packages.description} onChange={(value) => patch((current) => ({ ...current, packages: { ...current.packages, description: value } }))} />
      </div>
      <button onClick={addItem} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-5 py-3 font-black text-charcoal"><Plus size={18} /> הוסף חבילה</button>
      <div className="grid gap-5 lg:grid-cols-2">
        {draft.packages.items.map((item) => (
          <Card key={item.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <Toggle label="תצוגה" checked={item.enabled} onChange={(value) => updateItem(item.id, { enabled: value })} />
                <Toggle label="מומלץ" checked={item.highlight} onChange={(value) => updateItem(item.id, { highlight: value })} />
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-300"><Trash2 size={18} /></button>
            </div>
            <div className="grid gap-4">
              <Field label="שם חבילה" value={item.name} onChange={(value) => updateItem(item.id, { name: value })} />
              <Field label="מחיר" value={item.price} onChange={(value) => updateItem(item.id, { price: value })} />
              <TextArea label="תיאור" value={item.description} onChange={(value) => updateItem(item.id, { description: value })} />
              <TextArea label="מאפיינים - שורה לכל סעיף" value={item.features.join('\n')} onChange={(value) => updateItem(item.id, { features: splitLines(value) })} rows={6} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
