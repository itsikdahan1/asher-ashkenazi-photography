import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { getWhatsappUrl } from '../utils/contentHelpers';

export default function WhatsAppButton() {
  const { content } = useContent();
  const whatsappUrl = getWhatsappUrl(content.business.whatsappNumber, 'האתר של אשר אשכנזי צילום');

  if (!whatsappUrl) {
    return null;
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center group flex-row"
      aria-label="פתיחת שיחה בוואטסאפ"
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
