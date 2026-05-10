import { motion } from 'motion/react';
import { Check, MessageSquare } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export default function Testimonials() {
  const { content } = useContent();
  const testimonials = content.testimonials.items.filter((testimonial) => testimonial.enabled);

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="py-24 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-turquoise/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
          <MessageSquare className="text-turquoise" size={24} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{content.testimonials.title} <span className="text-turquoise">{content.testimonials.accent}</span></h2>
        </div>

        <div className="flex flex-col gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'}`}
            >
              <div 
                className={`max-w-[96%] md:max-w-[75%] p-5 md:p-6 rounded-3xl shadow-[0_24px_80px_-58px_rgba(0,0,0,0.95)] relative border ${
                  i % 2 === 0 
                    ? 'bg-white/[0.04] border-white/10 rounded-tr-none' 
                    : 'bg-turquoise-deep/25 border-turquoise/25 rounded-tl-none'
                }`}
              >
                <div className="flex justify-between items-center gap-4 mb-3">
                  <span className={`text-xs font-bold ${i % 2 === 0 ? 'text-turquoise' : 'text-cream'}`}>{t.name}{t.role ? ` · ${t.role}` : ''}</span>
                </div>
                <p className="text-sm md:text-lg leading-relaxed mb-3 font-normal text-cream/90">
                  {t.content}
                </p>
                <div className="flex items-center justify-end gap-1.5 opacity-55 text-[10px] md:text-xs">
                  <span>{t.time}</span>
                  <div className="flex -space-x-1">
                    <Check size={12} className="text-turquoise" />
                    <Check size={12} className="text-turquoise" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {content.testimonials.footerNote && (
          <div className="text-center mt-16">
            <p className="text-cream/50 text-sm font-normal italic">{content.testimonials.footerNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
