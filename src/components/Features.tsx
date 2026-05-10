import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';
import { getIconComponent } from '../utils/contentHelpers';

export default function Features() {
  const { content } = useContent();
  const features = content.features.items.filter((feature) => feature.enabled);

  if (!features.length) {
    return null;
  }

  return (
    <section className="py-24 md:py-28 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">{content.features.title} <span className="text-turquoise">{content.features.accent}</span></h2>
        {content.features.subtitle && <p className="text-cream/70 font-normal max-w-2xl mx-auto italic tracking-wide leading-relaxed">{content.features.subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 md:auto-rows-[240px]">
        {features.map((feature, index) => {
          const Icon = getIconComponent(feature.icon);

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`bento-card flex min-h-[220px] flex-col justify-between ${
                feature.size === 'large' ? 'md:row-span-2' : ''
              }`}
            >
              <div>
                <div className="mb-5 inline-flex p-3.5 rounded-2xl bg-turquoise/10 text-turquoise ring-1 ring-turquoise/15">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
              </div>
              <p className="text-cream/70 text-sm leading-relaxed font-normal">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
