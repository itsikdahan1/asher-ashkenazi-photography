import { motion } from 'motion/react';

export default function Packaging() {
  return (
    <section className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 order-2 md:order-1"
        >
          <span className="text-turquoise uppercase tracking-widest text-sm font-bold block mb-4">
            הגשה ללא פשרות
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            יותר מסתם תמונה – <br />
            <span className="text-turquoise">מוצר פרימיום.</span>
          </h2>
          <p className="text-cream/60 leading-relaxed font-light mb-8 text-lg">
            אני מאמין שהזיכרון שלך ראוי לכבוד הכי גדול. לכן, אני לא מסתפק רק ב"מגנטים על המקרר". 
            אצלי תקבלו אריזה יוקרתית שמגיעה עם שקית ממותגת, דיסק-און-קי מעוצב עם כל התמונות מהאירוע באיכות הכי גבוהה, ומגנטים ובלוקים מחומרי הגלם הכי טובים שיש. 
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'חומרי גלם שלא דוהים לעולם',
              'דיסק-און-קי ממותג לכל אירוע',
              'שקית יוקרתית להגשה',
              'עריכה קפדנית לכל פריים',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-cream/80 font-medium">
                <div className="w-2 h-2 rounded-full bg-turquoise" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 order-1 md:order-2"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-turquoise/20 blur-3xl rounded-full" />
            <div className="grid grid-cols-2 gap-4 relative z-10">
               <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2680&auto=format&fit=crop" 
                alt="Premium packaging" 
                className="rounded-2xl shadow-2xl border border-white/10 w-full h-48 object-cover translate-y-4"
              />
               <img 
                src="https://images.unsplash.com/photo-1493723843671-1d655e7d98f2?q=80&w=2670&auto=format&fit=crop" 
                alt="Branded USB" 
                className="rounded-2xl shadow-2xl border border-white/10 w-full h-48 object-cover -translate-y-4"
              />
               <img 
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2670&auto=format&fit=crop" 
                alt="High quality prints" 
                className="rounded-2xl shadow-2xl border border-white/10 w-full h-48 object-cover translate-y-4"
              />
               <img 
                src="https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2672&auto=format&fit=crop" 
                alt="Magnet display" 
                className="rounded-2xl shadow-2xl border border-white/10 w-full h-48 object-cover -translate-y-4"
              />
            </div>
            <div className="absolute -bottom-10 -right-4 bg-charcoal p-6 rounded-2xl border border-white/10 shadow-2xl z-20 hidden lg:block">
              <span className="text-turquoise font-bold block mb-1">הלקוחות קונים עם העיניים</span>
              <span className="text-cream/60 text-xs">מארזים פיזיים שמכבדים את המעמד</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
