import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Box, Camera, Heart, Clock } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="text-turquoise" size={32} />,
    title: 'שקט תעשייתי',
    description: 'מאירועים קטנים ועד חגיגות גדולות – אני כאן כדי שתהיו רגועים. בלי לחץ, עם המון סבלנות וחיוך.',
    size: 'small'
  },
  {
    icon: <Sparkles className="text-turquoise" size={32} />,
    title: 'חומרי פרימיום',
    description: 'מגנטים שלא דוהים לעולם, בלוקים מעץ איכותי וציוד צילום מהשורה הראשונה.',
    size: 'small'
  },
  {
    icon: <Box className="text-turquoise" size={32} />,
    title: 'האריזה וההגשה',
    description: 'החוויה לא נגמרת באירוע. תקבלו מארז יוקרתי, דיסק-און-קי ממותג והגשה שמכבדת את הזכרונות.',
    size: 'large'
  },
  {
    icon: <Heart className="text-turquoise" size={32} />,
    title: 'תשומת לב לפרטים',
    description: 'כל רגש, כל דמעה וכל חיוך נתפסים בעדשה שלי ברגע הנכון ביותר.',
    size: 'small'
  },
  {
    icon: <Clock className="text-turquoise" size={32} />,
    title: 'עמידה בזמנים',
    description: 'הגשה מהירה של החומרים ודיוק מקסימלי בלוח הזמנים של האירוע שלכם.',
    size: 'small'
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">הסטנדרט החדש <span className="text-turquoise">בצילום.</span></h2>
        <p className="text-white/40 font-light max-w-2xl mx-auto italic">"לא רק מצלמים, אלא יוצרים זכרון שמרגיש כמו הרגע עצמו"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className={`bento-card flex flex-col justify-between ${
              feature.size === 'large' ? 'md:row-span-2' : ''
            }`}
          >
            <div>
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-white/[0.03]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {feature.description}
            </p>
          </motion.div>
        ))}
        
        {/* Placeholder for visual balance */}
        <div className="hidden md:block bento-card border-none bg-gradient-to-br from-turquoise/20 to-transparent flex items-center justify-center p-0">
           <Camera size={120} className="text-turquoise/10" strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
