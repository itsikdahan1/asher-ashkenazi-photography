import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/972528735900?text=%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20%D7%90%D7%A9%D7%9B%D7%A0%D7%96%D7%99%20%D7%A6%D7%99%D7%9C%D7%95%D7%9D"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center group flex-row"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Icon */}
      <div className="w-14 h-14 md:w-16 md:h-16 bg-turquoise text-charcoal rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(42,193,188,0.4)] hover:scale-110 transition-transform cursor-pointer relative z-10">
        <MessageCircle size={32} fill="currentColor" />
        <span className="absolute -top-1 -left-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
        </span>
      </div>

      {/* Label */}
      <div className="bg-turquoise text-charcoal px-6 py-2 rounded-full font-bold shadow-xl -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block whitespace-nowrap mr-4">
        בדקו זמינות עכשיו
      </div>
    </motion.a>
  );
}
