import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

const packages = [
  {
    name: 'קלאסיקה משפחתית',
    description: 'תיעוד סטילס מלא לאירוע המרגש שלכם',
    price: '1,500',
    features: [
      'צילום סטילס מקצועי ללא הגבלה',
      'עריכה קפדנית לכל פריים',
      'גלריה דיגיטלית תוך 7 ימים',
      'דיסק-און-קי ממותג במארז יוקרתי',
      'נוכחות נעימה וסבלנית'
    ],
    highlight: false,
  },
  {
    name: 'קומבו פרימיום',
    description: 'השילוב המושלם: סטילס + מגנטים',
    price: '2,800',
    features: [
      'כל מה שבחבילה הקלאסית',
      'עמדת מגנטים יוקרתית (ללא הגבלה)',
      'הדפסה טרמית איכותית - לא דוהה',
      '6 הגדלות במתנה',
      'בלוקים מעץ איכותי במתנה',
      'מארז עץ יוקרתי לכל המוצרים'
    ],
    highlight: true,
  },
  {
    name: 'מגנטים & בלוקים',
    description: 'עמדת בוטיק לכל סוגי האירועים',
    price: '1,200',
    features: [
      'צילום מגנטים ללא הגבלה',
      'שירות מקצועי וחיוך לאורחים',
      'איכות הדפסה מעבדה',
      '4 הגדלות במתנה',
      'קבלת כל התמונות בסוף האירוע'
    ],
    highlight: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">בחירת המסלול <span className="text-turquoise">שלכם.</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto font-light leading-relaxed text-lg">
            החבילות עוצבו כדי לתת מענה מושלם, אך תמיד ניתן להתאים אישית.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${
                pkg.highlight 
                  ? 'bg-white/[0.04] border-turquoise/40 shadow-[0_32px_64px_-16px_rgba(42,193,188,0.2)] md:-translate-y-4' 
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-turquoise text-charcoal px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  הבחירה המועדפת
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-2 tracking-tight">{pkg.name}</h3>
                <p className="text-white/40 text-sm font-light mb-6">{pkg.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tighter">₪{pkg.price}</span>
                  <span className="text-white/30 text-sm font-medium">/ החל מ-</span>
                </div>
              </div>
              
              <ul className="space-y-5 mb-12">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-white/70 text-sm md:text-base">
                    <div className="p-1 rounded-full bg-turquoise/10">
                      <Check size={14} className="text-turquoise" strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="https://wa.me/972528735900"
                className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  pkg.highlight 
                    ? 'bg-turquoise text-charcoal shadow-lg shadow-turquoise/20 hover:brightness-110' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
                whileHover={{ gap: '1.2rem' }}
                whileTap={{ scale: 0.98 }}
              >
                <span>הזמן עכשיו</span>
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
