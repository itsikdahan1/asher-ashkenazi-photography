import { motion } from 'motion/react';
import { Maximize2, ArrowLeft } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2670&auto=format&fit=crop',
];

export default function GalleryTeaser() {
  return (
    <section id="gallery" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight">
            זכרונות <br /><span className="text-turquoise">בפריים מושלם.</span>
          </h2>
          <p className="text-white/40 font-light text-xl">
            יותר מתיעוד – זו האמנות שלכם. הצצה לרגעים שהפכו לנצחיים בעדשה שלי.
          </p>
        </div>
        <motion.a 
          href="/gallery"
          className="group flex items-center gap-3 bg-white/5 border border-white/10 px-10 py-4 rounded-full text-white font-bold hover:bg-white/10 transition-all"
          whileHover={{ x: -10 }}
        >
          <ArrowLeft size={20} className="text-turquoise group-hover:-translate-x-1 transition-transform" />
          לכל הגלריות
        </motion.a>
      </div>

      <div className="masonry-grid">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 1, 
              ease: [0.215, 0.61, 0.355, 1] 
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="masonry-item relative group overflow-hidden rounded-[2rem] bg-white/5"
          >
            <img 
              src={img} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="bg-turquoise text-charcoal p-4 rounded-full shadow-2xl"
              >
                <Maximize2 size={24} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
