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
    <section id="packages" className="py-24 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{content.packages.title} <span className="text-turquoise">{content.packages.accent}</span></h2>
          {content.packages.description && (
            <p className="text-cream/70 max-w-2xl mx-auto font-normal leading-relaxed text-lg">
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
              className={`relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 shadow-[0_24px_80px_-60px_rgba(0,0,0,0.95)] hover:-translate-y-1 ${
                pkg.highlight 
                  ? 'bg-white/[0.045] border-turquoise/35 shadow-turquoise/10 md:-translate-y-2' 
                  : 'bg-white/[0.025] border-white/[0.08] hover:border-white/15'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-turquoise text-charcoal px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  הבחירה המועדפת
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">{pkg.name}</h3>
                <p className="text-cream/70 text-sm font-normal mb-6 min-h-10 leading-relaxed">{pkg.description}</p>
                {pkg.price && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-cream tracking-tighter">₪{pkg.price}</span>
                    <span className="text-cream/40 text-sm font-medium">/ החל מ-</span>
                  </div>
                )}
              </div>
              
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-cream/75 text-sm leading-relaxed">
                    <div className="p-0.5 mt-0.5 rounded-full bg-turquoise/10 shrink-0">
                      <Check size={14} className="text-turquoise" strokeWidth={2.5} />
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
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm transition-all ${
                    pkg.highlight 
                      ? 'bg-turquoise text-charcoal shadow-md shadow-turquoise/10 hover:brightness-110' 
                      : 'bg-white/[0.055] text-cream hover:bg-white/[0.09] border border-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ gap: '0.75rem' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>הזמן עכשיו</span>
                  <ArrowRight size={16} />
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
