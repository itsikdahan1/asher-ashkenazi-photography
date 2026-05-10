import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { useContent } from '../contexts/ContentContext';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { content } = useContent();
  const { hero } = content;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-32">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        {hero.backgroundImageUrl ? (
          <img 
            src={hero.backgroundImageUrl} 
            alt={hero.titleLine} 
            className="w-full h-full object-cover opacity-28"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(42,193,188,0.18),transparent_55%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/55 to-charcoal" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-2 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {hero.eyebrow && (
            <motion.span 
              className="text-turquoise uppercase tracking-[0.32em] sm:tracking-[0.4em] text-xs sm:text-sm font-bold mb-6 block opacity-95"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {hero.eyebrow}
            </motion.span>
          )}
          
          <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-extrabold tracking-tighter mb-6 leading-[0.92] max-w-5xl mx-auto text-balance">
            <span className="block mb-2 text-white">{hero.titleLine}</span>
            <span className="text-turquoise glow-text">{hero.titleAccent}</span>
          </h1>

          {hero.subtitle && (
            <div className="flex items-center justify-center gap-4 mb-10 max-w-3xl mx-auto">
              <div className="hidden sm:block h-[1px] w-10 bg-white/25" />
              <p className="text-white/80 text-lg md:text-xl font-normal tracking-wide leading-relaxed">{hero.subtitle}</p>
              <div className="hidden sm:block h-[1px] w-10 bg-white/25" />
            </div>
          )}
          
          {(hero.primaryCtaLabel || hero.secondaryCtaLabel) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 translate-y-2">
              {hero.primaryCtaLabel && (
                <motion.a
                  href="#contact"
                  className="group relative w-full sm:w-auto bg-turquoise text-charcoal px-10 py-4 rounded-full font-black text-lg transition-all shadow-[0_14px_44px_-18px_rgba(42,193,188,0.8)] hover:brightness-110 hover:shadow-[0_18px_54px_-18px_rgba(42,193,188,0.95)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{hero.primaryCtaLabel}</span>
                </motion.a>
              )}
              {hero.secondaryCtaLabel && (
                <motion.a
                  href="#gallery"
                  className="w-full sm:w-auto border border-white/15 bg-white/[0.07] backdrop-blur-md px-10 py-4 rounded-full font-bold text-lg hover:bg-white/[0.12] hover:border-white/25 transition-all text-white/95"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {hero.secondaryCtaLabel}
                </motion.a>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-turquoise/40"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown size={40} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
