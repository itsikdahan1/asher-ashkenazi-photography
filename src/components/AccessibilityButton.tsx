import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, X, Sun, Type, Link, Moon, PlayCircle, RotateCcw } from 'lucide-react';

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    grayscale: false,
    largeFont: false,
    highlightLinks: false,
    readableFont: false,
    stopAnimations: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      grayscale: false,
      largeFont: false,
      highlightLinks: false,
      readableFont: false,
      stopAnimations: false,
    });
  };

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('accessibility-high-contrast', settings.highContrast);
    html.classList.toggle('accessibility-grayscale', settings.grayscale);
    html.classList.toggle('accessibility-large-font', settings.largeFont);
    html.classList.toggle('accessibility-highlight-links', settings.highlightLinks);
    html.classList.toggle('accessibility-readable-font', settings.readableFont);
    html.classList.toggle('accessibility-stop-animations', settings.stopAnimations);
  }, [settings]);

  const menuItems = [
    { key: 'highContrast', icon: <Moon size={20} />, label: 'ניגודיות גבוהה' },
    { key: 'grayscale', icon: <Sun size={20} />, label: 'גווני אפור' },
    { key: 'largeFont', icon: <Type size={20} />, label: 'הגדלת טקסט' },
    { key: 'highlightLinks', icon: <Link size={20} />, label: 'הדגשת קישורים' },
    { key: 'readableFont', icon: <Type size={20} />, label: 'פונט קריא' },
    { key: 'stopAnimations', icon: <PlayCircle size={20} />, label: 'הפסקת אנימציות' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start translate-y-0" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-charcoal border border-white/10 p-4 rounded-3xl shadow-2xl w-64 glass overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="text-sm font-bold text-turquoise">תפריט נגישות</span>
              <button 
                onClick={resetSettings}
                className="text-[10px] uppercase tracking-widest text-white/40 hover:text-turquoise flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} />
                איפוס
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleSetting(item.key as keyof typeof settings)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-medium ${
                    settings[item.key as keyof typeof settings]
                      ? 'bg-turquoise text-charcoal'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-white/30 text-center">
              נגישות ישראל 5568
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative z-10 ${
          isOpen ? 'bg-charcoal text-turquoise' : 'bg-white/10 text-white backdrop-blur-xl border border-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="תפריט נגישות"
      >
        {isOpen ? <X size={28} /> : <Accessibility size={28} />}
      </motion.button>
    </div>
  );
}
