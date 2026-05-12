import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { getWhatsappUrl } from '../utils/contentHelpers';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const { content } = useContent();
  const { business } = content;
  const whatsappUrl = getWhatsappUrl(business.whatsappNumber);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(13, 14, 16, 0)', 'rgba(13, 14, 16, 0.9)']
  );

  const headerPadding = useTransform(
    scrollY,
    [0, 100],
    ['2rem', '1rem']
  );

  const navItems = [
    { name: 'גלריה', href: '#gallery' },
    { name: 'שירותים', href: '#services' },
    { name: 'חבילות', href: '#packages' },
    { name: 'עלי', href: '#about' },
    { name: 'צור קשר', href: '#contact' },
  ];

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const newTimer = setTimeout(() => {
      setClickCount(0);
    }, 1000);

    setClickTimer(newTimer);

    if (clickCount + 1 === 3) {
      setClickCount(0);
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      navigate('/admin');
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
    };
  }, [clickTimer]);

  return (
    <motion.header 
      style={{ backgroundColor: headerBg, paddingTop: headerPadding, paddingBottom: headerPadding }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.055] transition-colors duration-300 backdrop-blur-md"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* WhatsApp CTA */}
        {whatsappUrl ? (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-white/[0.07] hover:bg-white/[0.12] text-cream px-6 py-3 rounded-full font-bold transition-all text-sm hidden md:flex items-center gap-2 border border-white/15 shadow-[0_12px_34px_-24px_rgba(0,0,0,0.9)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={18} className="text-turquoise" />
            <span>לתיאום צילום</span>
          </motion.a>
        ) : <div className="hidden md:block" />}

        {/* Logo Section */}
        <motion.div
          className="flex flex-col items-center cursor-pointer select-none transition-opacity hover:opacity-85"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {business.logoUrl ? (
            <img src={business.logoUrl} alt={`${business.name} - ${business.tagline}`} className="h-10 w-auto md:h-14 max-w-[200px] md:max-w-[280px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]" />
          ) : (
            <>
              <span className="text-2xl md:text-3xl font-bold tracking-tighter text-cream uppercase leading-none">{business.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-4 bg-turquoise/30" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-turquoise/90 font-medium">{business.tagline}</span>
                <div className="h-[1px] w-4 bg-turquoise/30" />
              </div>
            </>
          )}
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-cream/78 hover:text-turquoise transition-all font-semibold text-sm tracking-wide"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-cream p-3 rounded-full border border-white/10 bg-white/[0.04]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="פתיחת תפריט ניווט"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-charcoal/95 border-t border-white/10 px-6 py-8 overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-cream/85 hover:text-turquoise transition-colors"
              >
                {item.name}
              </a>
            ))}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                className="flex items-center justify-center gap-2 bg-turquoise text-charcoal py-4 rounded-2xl font-black shadow-lg shadow-turquoise/10"
              >
                <MessageCircle size={24} />
                <span>לתיאום צילום בוואטסאפ</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
