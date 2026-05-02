import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2670&auto=format&fit=crop" 
          alt="Wedding photography background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/0 via-charcoal/40 to-charcoal" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.span 
            className="text-turquoise uppercase tracking-[0.4em] text-sm font-semibold mb-6 block opacity-80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            סדר | רגש | איכות
          </motion.span>
          
          <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter mb-8 leading-[0.85] max-w-5xl mx-auto">
            <span className="block mb-2 text-white">רואים את</span>
            <span className="text-turquoise italic font-serif glow-text">הרגש.</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-white/20" />
            <p className="text-white/80 text-xl md:text-2xl font-light">צילום אירועים | מגנטים פרימיום</p>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 translate-y-4">
            <motion.a
              href="#contact"
              className="group relative w-full sm:w-auto bg-turquoise text-charcoal px-14 py-5 rounded-full font-bold text-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 rounded-full bg-turquoise blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
              <span className="relative z-10">בדוק זמינות אישית</span>
            </motion.a>
            <motion.a
              href="#gallery"
              className="w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-md px-14 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              הגלריות שלנו
            </motion.a>
          </div>
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
