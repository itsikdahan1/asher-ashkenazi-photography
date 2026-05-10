import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

export default function Logos() {
  const { content } = useContent();
  const logos = content.logos.items.filter((logo) => logo.enabled && logo.imageUrl);

  if (!logos.length) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          {content.logos.title} <span className="text-turquoise">{content.logos.accent}</span>
        </h2>
        {content.logos.subtitle && (
          <p className="mt-4 text-cream/65 font-normal text-lg leading-relaxed">{content.logos.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {logos.map((logo, index) => {
          const LogoContent = (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_60px_-48px_rgba(0,0,0,0.9)] transition hover:border-turquoise/40 hover:bg-white/[0.06]"
            >
              <img src={logo.imageUrl} alt={logo.name} className="max-h-full max-w-full object-contain opacity-85" loading="lazy" />
            </motion.div>
          );

          if (!logo.url) {
            return <div key={logo.id}>{LogoContent}</div>;
          }

          return (
            <a key={logo.id} href={logo.url} target="_blank" rel="noreferrer" aria-label={logo.name}>
              {LogoContent}
            </a>
          );
        })}
      </div>
    </section>
  );
}
