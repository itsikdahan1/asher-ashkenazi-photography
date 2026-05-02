import { motion } from 'motion/react';
import { Check, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: 'מיכל (אמא של איתי - בר מצווה)',
    time: '11:42',
    content: 'אשר היקר! רצינו להגיד תודה ענקית. התמונות פשוט וואו. היית כל כך סבלני עם הילדים והאורחים לא הפסיקו להחמיא על המגנטים. רואים שזה פרימיום!',
  },
  {
    name: 'יוסי כהן (ברית)',
    time: '09:15',
    content: 'וואו איזה תמונות!! תודה על השירות והחיוך. המארז ששלחת פשוט מושלם, הדיסק און קי הממותג זה ליגה אחרת. נפגש בשמחות הבאות.',
    isMe: true
  },
  {
    name: 'דבורה (בת מצווה)',
    time: '22:10',
    content: 'היה לנו פשוט תענוג איתך. היית השקט שלנו בתוך כל הטירוף. התמונות יצאו טבעיות ויפות בדיוק כמו שרצינו. תודה רבה!',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-turquoise/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-16">
          <MessageSquare className="text-turquoise" size={24} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">מה הם <span className="text-turquoise">אומרים?</span></h2>
        </div>

        <div className="flex flex-col gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'}`}
            >
              <div 
                className={`max-w-[90%] md:max-w-[75%] p-5 rounded-3xl shadow-2xl relative border ${
                  i % 2 === 0 
                    ? 'bg-white/[0.03] border-white/10 rounded-tr-none' 
                    : 'bg-turquoise-deep/20 border-turquoise/20 rounded-tl-none'
                }`}
              >
                <div className="flex justify-between items-center gap-4 mb-3">
                  <span className={`text-xs font-bold ${i % 2 === 0 ? 'text-turquoise' : 'text-cream'}`}>{t.name}</span>
                </div>
                <p className="text-sm md:text-lg leading-relaxed mb-3 font-light text-cream/90">
                  {t.content}
                </p>
                <div className="flex items-center justify-end gap-1.5 opacity-40 text-[10px] md:text-xs">
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
        
        <div className="text-center mt-16">
          <p className="text-white/30 text-sm font-light italic">"צילומי מסך אמיתיים שנשלחו באהבה"</p>
        </div>
      </div>
    </section>
  );
}
