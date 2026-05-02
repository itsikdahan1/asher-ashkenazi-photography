import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappNumber = "972528735900";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("הגעתי מהאתר שלך, אשמח לפרטים")}`;

  return (
    <footer id="contact" className="relative pt-32 pb-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 mb-32">
        {/* Brand Column */}
        <div className="lg:w-1/3">
          <div className="mb-10">
            <span className="text-4xl font-bold tracking-tighter text-white block mb-1">אשר אשכנזי</span>
            <span className="text-xs uppercase tracking-[0.5em] text-turquoise/80 font-medium">צילום פרימיום</span>
          </div>
          <p className="text-white/40 text-2xl font-light leading-relaxed mb-12 italic">
            "מנציח את הרגעים שתרצו לזכור לעד, עם הדיוק והרגש שמגיע לכם."
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            {[
              { icon: Phone, href: `tel:+${whatsappNumber}` },
              { icon: Instagram, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Mail, href: "mailto:Ashkenazi.photo@gmail.com" }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                className="w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-turquoise hover:border-turquoise transition-all duration-500"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <item.icon size={22} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="lg:w-2/3 glass p-10 md:p-16 rounded-[3rem]">
          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">בואו נצור <span className="text-turquoise">זכרונות.</span></h3>
          <p className="text-white/40 mb-12 font-light text-lg">מעדיפים שיחה קצרה? אני זמין בוואטסאפ לכל שאלה.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between p-8 rounded-[2rem] bg-turquoise text-charcoal h-[200px] transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <Phone size={32} />
              <div>
                <span className="text-xs font-black uppercase tracking-widest block mb-1 opacity-60">שיחה מהירה</span>
                <span className="text-2xl font-bold flex items-center gap-2">הודעה בוואטסאפ <ArrowUpRight size={20} /></span>
              </div>
            </motion.a>
            
            <div className="flex flex-col justify-between p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 h-[200px]">
               <Mail size={32} className="text-turquoise" />
               <div>
                 <span className="text-xs font-black uppercase tracking-widest block mb-1 text-white/40">כתובת מייל</span>
                 <span className="text-2xl font-bold text-white">Ashkenazi.photo@gmail.com</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/20">
        <p>© {currentYear} אשר אשכנזי – אמנות הצילום והמגנטים</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-turquoise transition-colors">מדיניות פרטיות</a>
          <a href="#" className="hover:text-turquoise transition-colors">תקנון אתר</a>
        </div>
      </div>
    </footer>
  );
}
