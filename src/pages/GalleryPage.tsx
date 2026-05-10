import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { uniqueCategories } from '../utils/contentHelpers';

export default function GalleryPage() {
  const [filter, setFilter] = useState('הכל');
  const { content } = useContent();
  const allImages = content.gallery.images.filter((image) => image.enabled);
  const categories = ['הכל', ...uniqueCategories(allImages)];

  const filteredImages = filter === 'הכל' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

  return (
    <main className="min-h-screen pt-32 relative">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">{content.gallery.title}</h1>
          <p className="text-cream/60 max-w-2xl font-light leading-relaxed">
            {content.gallery.description}
          </p>
        </header>

        {/* Filter Bar */}
        {allImages.length > 0 && (
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
        )}

        {/* Masonry Grid */}
        {filteredImages.length ? (
          <div className="masonry-grid">
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="masonry-item group relative overflow-hidden rounded-2xl"
              >
                <img 
                  src={img.url} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={img.alt || img.title}
                />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                  <span className="text-xs uppercase tracking-widest text-turquoise font-bold">
                    {img.category || img.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center text-cream/50">
            {content.gallery.emptyMessage}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
