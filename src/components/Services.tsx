import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { getIconComponent } from '../utils/contentHelpers';

export default function Services() {
  const { content } = useContent();
  const services = content.services.items.filter((service) => service.enabled);

  if (!services.length) {
    return null;
  }

  return (
    <section id="services" className="py-24 md:py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-14 md:mb-20 gap-5">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">{content.services.title} <span className="text-turquoise">{content.services.accent}</span></h2>
          {content.services.subtitle && <p className="text-cream/70 font-normal text-lg leading-relaxed md:text-left">{content.services.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = getIconComponent(service.icon);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group min-h-[460px] md:h-[600px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white/[0.04] border border-white/[0.07] shadow-[0_28px_90px_-62px_rgba(0,0,0,0.9)]"
              >
                {service.imageUrl ? (
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,193,188,0.18),transparent_55%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/5 transition-opacity duration-500 group-hover:opacity-90" />
                
                <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 p-6 md:p-8 glass rounded-[1.5rem] translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-turquoise/10 ring-1 ring-turquoise/15 transition-colors duration-500 text-turquoise">
                        <Icon size={24} />
                      </div>
                      {service.subtitle && <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-turquoise/90">{service.subtitle}</span>}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-cream/75 text-sm leading-relaxed font-normal mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-2 text-turquoise font-bold text-xs uppercase tracking-widest ring-1 ring-turquoise/15 hover:bg-turquoise hover:text-charcoal hover:gap-3 transition-all w-fit">
                    פרטים נוספים <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
