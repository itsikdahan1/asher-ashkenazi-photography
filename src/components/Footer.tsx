import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { getWhatsappUrl, normalizePhoneNumber } from '../utils/contentHelpers';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useContent();
  const { business } = content;
  const whatsappNumber = normalizePhoneNumber(business.whatsappNumber);
  const whatsappUrl = getWhatsappUrl(business.whatsappNumber);
  const socialLinks = [
    whatsappNumber ? { icon: Phone, href: `tel:+${whatsappNumber}` } : null,
    business.instagramUrl ? { icon: Instagram, href: business.instagramUrl } : null,
    business.facebookUrl ? { icon: Facebook, href: business.facebookUrl } : null,
    business.email ? { icon: Mail, href: `mailto:${business.email}` } : null,
  ].filter(Boolean) as Array<{ icon: typeof Phone; href: string }>;

  return (
    <footer id="contact" className="relative pt-28 md:pt-32 pb-12 px-6 overflow-hidden bg-charcoal-light">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 mb-20 md:mb-24">
        {/* Brand Column */}
        <div className="lg:w-1/3">
          <div className="mb-8">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={`${business.name} - ${business.tagline}`} className="mb-4 h-20 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]" loading="lazy" />
            ) : (
              <>
                <span className="text-4xl font-bold tracking-tighter text-white block mb-2">{business.name}</span>
                <span className="text-xs uppercase tracking-[0.5em] text-turquoise/90 font-medium">{business.tagline}</span>
              </>
            )}
          </div>
          {business.description && (
            <p className="text-cream/60 text-lg md:text-xl font-normal leading-relaxed mb-10 italic">
              {business.description}
            </p>
          )}
          
          {!!socialLinks.length && (
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.035] flex items-center justify-center text-cream/70 hover:text-turquoise hover:border-turquoise/35 hover:bg-white/[0.06] transition-all duration-300"
                whileHover={{ y: -3, scale: 1.05 }}
              >
                <item.icon size={20} />
              </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Contact Strip */}
        <div className="lg:w-2/3 border border-white/[0.08] bg-white/[0.025] p-8 md:p-12 rounded-[2rem] shadow-[0_24px_90px_-66px_rgba(0,0,0,0.95)]">
          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">בואו ניצור <span className="text-turquoise">זכרונות.</span></h3>
          <p className="text-cream/66 mb-10 font-normal text-lg leading-relaxed">מעדיפים שיחה קצרה? אני זמין בוואטסאפ לכל שאלה.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatsappUrl && (
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between p-8 rounded-[1.5rem] bg-turquoise text-charcoal min-h-[180px] transition-all hover:brightness-110 shadow-[0_18px_54px_-24px_rgba(42,193,188,0.8)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={28} />
                <div>
                  <span className="text-xs font-black uppercase tracking-widest block mb-1 opacity-70">שיחה מהירה</span>
                  <span className="text-xl font-bold flex items-center gap-2">הודעה בוואטסאפ <ArrowUpRight size={18} /></span>
                </div>
              </motion.a>
            )}
            
            {business.email && <div className="flex flex-col justify-between p-8 rounded-[1.5rem] bg-white/[0.04] border border-white/10 min-h-[180px]">
               <Mail size={28} className="text-turquoise" />
               <div className="overflow-hidden">
                 <span className="text-xs font-bold uppercase tracking-widest block mb-1 text-cream/52">כתובת מייל</span>
                 <span className="text-lg lg:text-xl font-medium text-cream/90 break-all block">{business.email}</span>
               </div>
            </div>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.07] text-[10px] font-medium uppercase tracking-[0.2em] text-cream/48">
        <p>© {currentYear} {business.name} – {business.tagline}</p>
        <a
          href="https://wa.me/972559296626?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%9E%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20%D7%90%D7%A9%D7%A8%20%D7%90%D7%A9%D7%9B%D7%A0%D7%96%D7%99%20%D7%95%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%A9%D7%90%D7%9C%D7%94."
          target="_blank"
          rel="noreferrer"
          className="text-center text-cream/55 transition-colors hover:text-turquoise"
        >
          חזון ופיתוח: יצחק דהן - מבית האימפקט לעסקים
        </a>
        <div className="flex gap-8">
          {business.privacyPolicyUrl && <a href={business.privacyPolicyUrl} className="hover:text-turquoise transition-colors">מדיניות פרטיות</a>}
          {business.termsUrl && <a href={business.termsUrl} className="hover:text-turquoise transition-colors">תקנון אתר</a>}
        </div>
      </div>
    </footer>
  );
}
