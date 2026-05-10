import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { getWhatsappUrl } from '../utils/contentHelpers';

export default function Packages() {
  const { content } = useContent();
  const packages = content.packages.items.filter((pkg) => pkg.enabled);
  const whatsappUrl = getWhatsappUrl(content.business.whatsappNumber);

  if (!packages.length) {
    return null;
  }

  return (
    <section id="packages" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{content.packages.title} <span className="text-turquoise">{content.packages.accent}</span></h2>
          {content.packages.description && (
            <p className="text-white/40 max-w-2xl mx-auto font-light leading-relaxed text-lg">
              {content.packages.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${
                pkg.highlight 
                  ? 'bg-white/[0.04] border-turquoise/40 shadow-[0_32px_64px_-16px_rgba(42,193,188,0.2)] md:-translate-y-4' 
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-turquoise text-charcoal px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  הבחירה המועדפת
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">{pkg.name}</h3>
                <p className="text-white/40 text-sm font-light mb-6">{pkg.description}</p>
                {pkg.price && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tighter">₪{pkg.price}</span>
                    <span className="text-white/30 text-sm font-medium">/ החל מ-</span>
                  </div>
                )}
              </div>
              
              <ul className="space-y-5 mb-12">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-white/70 text-sm md:text-base">
                    <div className="p-1 rounded-full bg-turquoise/10">
                      <Check size={14} className="text-turquoise" strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {whatsappUrl && (
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    pkg.highlight 
                      ? 'bg-turquoise text-charcoal shadow-lg shadow-turquoise/20 hover:brightness-110' 
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                  whileHover={{ gap: '1.2rem' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>הזמן עכשיו</span>
                  <ArrowRight size={18} />
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
