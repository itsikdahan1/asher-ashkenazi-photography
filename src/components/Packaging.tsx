import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

export default function Packaging() {
  const { content } = useContent();
  const { packaging } = content;

  if (!packaging.enabled) {
    return null;
  }

  return (
    <section className="py-24 md:py-28 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 order-2 md:order-1"
        >
          {packaging.eyebrow && (
            <span className="text-turquoise uppercase tracking-widest text-sm font-bold block mb-4">
              {packaging.eyebrow}
            </span>
          )}
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {packaging.title}<br />
            <span className="text-turquoise">{packaging.accent}</span>
          </h2>
          {packaging.description && (
            <p className="text-cream/70 leading-relaxed font-normal mb-8 text-lg">
              {packaging.description}
            </p>
          )}
          {!!packaging.bullets.length && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {packaging.bullets.map((item, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-cream/85 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-turquoise shadow-[0_0_16px_rgba(42,193,188,0.55)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 order-1 md:order-2"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-turquoise/15 blur-3xl rounded-full" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {packaging.images.map((imageUrl, index) => (
                <img 
                  key={`${imageUrl}-${index}`}
                  src={imageUrl} 
                  alt={packaging.title} 
                  className={`rounded-2xl shadow-[0_22px_70px_-42px_rgba(0,0,0,0.95)] border border-white/10 w-full h-44 md:h-48 object-cover ${index % 2 === 0 ? 'translate-y-4' : '-translate-y-4'}`}
                />
              ))}
            </div>
            {(packaging.badgeTitle || packaging.badgeText) && (
              <div className="absolute -bottom-10 -right-4 bg-charcoal-light p-6 rounded-2xl border border-white/10 shadow-2xl z-20 hidden lg:block">
                {packaging.badgeTitle && <span className="text-turquoise font-bold block mb-1">{packaging.badgeTitle}</span>}
                {packaging.badgeText && <span className="text-cream/70 text-xs">{packaging.badgeText}</span>}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
