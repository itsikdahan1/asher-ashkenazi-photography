import { motion } from 'motion/react';
import { Camera, Layers, Users, ExternalLink } from 'lucide-react';

const services = [
  {
    icon: <Camera size={28} />,
    title: 'צילום אירועים (סטילס)',
    subtitle: 'ללא חתונות',
    description: 'תיעוד מרגש ומקצועי של בר/בת מצווה, בריתות ואירועים משפחתיים. אני מתמקד בכם, כדי שכל חיבוק יונצח לנצח.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop'
  },
  {
    icon: <Layers size={28} />,
    title: 'מגנטים ובלוקים פרימיום',
    subtitle: 'לכל סוגי האירועים',
    description: 'עמדת מגנטים יוקרתית שמתאימה לכל אירוע – גם לחתונות. חומרי גלם מהשורה הראשונה וזיכרון שלא דוהה לעולם.',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    icon: <Users size={28} />,
    title: 'צילומי משפחה ובוקים',
    subtitle: 'זמן איכות בתמונות',
    description: 'צילומי חוץ באווירה רגועה. בלי פוזות מאולצות, רק אתם והרגישות שלי לעדשה.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">השירותים <span className="text-turquoise">שלנו.</span></h2>
          <p className="text-white/40 font-light text-lg">איכות ללא פשרות, בכל לחיצה על הכפתור.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group h-[600px] rounded-[2.5rem] overflow-hidden"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
              
              <div className="absolute inset-x-6 bottom-6 p-8 glass rounded-[2rem] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 transition-colors duration-500 text-turquoise">
                      {service.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-turquoise/80">{service.subtitle}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 text-turquoise font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                  פרטים נוספים <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
