import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const allImages = [
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2670&auto=format&fit=crop', category: 'אירועים' },
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop', category: 'אירועים' },
  { url: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=2670&auto=format&fit=crop', category: 'מגנטים' },
  { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop', category: 'משפחה' },
  { url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2670&auto=format&fit=crop', category: 'אירועים' },
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2670&auto=format&fit=crop', category: 'משפחה' },
  { url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop', category: 'אירועים' },
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop', category: 'אירועים' },
];

const categories = ['הכל', 'אירועים', 'מגנטים', 'משפחה'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('הכל');

  const filteredImages = filter === 'הכל' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  return (
    <main className="min-h-screen pt-32 relative">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">הגלריה שלי</h1>
          <p className="text-cream/60 max-w-2xl font-light leading-relaxed">
            מוזמנים להתרשם ממגוון עבודות בתחומי צילום האירועים, המגנטים וצילומי המשפחה. 
            כל תמונה מספרת סיפור, כל מגנט הוא מזכרת שנשארת.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2 rounded-full border transition-all text-sm font-medium ${
                filter === cat 
                  ? 'bg-turquoise border-turquoise text-charcoal' 
                  : 'border-white/10 text-cream/60 hover:border-cream/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="masonry-item group relative overflow-hidden rounded-2xl"
            >
              <img 
                src={img.url} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                alt={`Photography ${index}`}
              />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                <span className="text-xs uppercase tracking-widest text-turquoise font-bold">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
