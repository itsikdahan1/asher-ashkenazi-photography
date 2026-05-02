import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['border-transparent', 'border-white/10']
  );

  const headerPadding = useTransform(
    scrollY,
    [0, 100],
    ['2.5rem', '1.5rem']
  );

  const navItems = [
    { name: 'שירותים', href: '#services' },
    { name: 'חבילות', href: '#packages' },
    { name: 'גלריה', href: '#gallery' },
    { name: 'עלי', href: '#about' },
    { name: 'צור קשר', href: '#contact' },
  ];

  return (
    <motion.header 
      style={{ backgroundColor: headerBg, paddingTop: headerPadding, paddingBottom: headerPadding }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent backdrop-blur-sm"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/972528735900"
          target="_blank"
          rel="noreferrer"
          className="bg-turquoise text-charcoal px-6 py-2.5 rounded-full font-bold shadow-[0_4px_20px_rgba(42,193,188,0.3)] hover:brightness-110 transition-all text-sm hidden md:flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={18} fill="currentColor" />
          <span>בדיקה מהירה</span>
        </motion.a>

        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-bold tracking-tighter text-cream uppercase leading-none">אשר אשכנזי</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-[1px] w-4 bg-turquoise/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-turquoise font-medium opacity-80">צילום פרימיום</span>
            <div className="h-[1px] w-4 bg-turquoise/50" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-cream/60 hover:text-turquoise transition-all font-medium text-sm tracking-wide"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-cream p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-charcoal border-t border-white/10 px-6 py-8 overflow-hidden"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-cream/80 hover:text-turquoise transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://wa.me/972528735900"
              className="flex items-center justify-center gap-2 bg-turquoise text-charcoal py-4 rounded-xl font-bold"
            >
              <MessageCircle size={24} />
              <span>דבר איתי בוואטסאפ</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
