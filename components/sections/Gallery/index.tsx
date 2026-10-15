'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GallerySectionData, GalleryItem } from '../../types';

export default function Gallery({ data }: { data: GallerySectionData }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = data.categories || ['All', 'Suites', 'Pool & Beach', 'Dining', 'Wellness'];
  const items = data.items || [];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredItems.findIndex((img) => img.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActivePhoto(filteredItems[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredItems.findIndex((img) => img.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActivePhoto(filteredItems[nextIndex]);
  };

  return (
    <section className="bg-[#fcfaf7] py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3.5 mb-3">
            <span className="w-12 h-[1.5px] bg-[#c5a059]" />
            <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.28em] text-[#8c7853] uppercase">
              {data.eyebrow || "VISUAL RETREAT"}
            </span>
            <span className="w-12 h-[1.5px] bg-[#c5a059]" />
          </div>
          <h2 className="font-serif text-[34px] sm:text-[46px] md:text-[50px] font-normal text-[#243c30] leading-tight mb-4">
            {data.title_line1} <span className="italic text-[#c5a059]">{data.title_highlight}</span>
          </h2>
          <p className="text-[14px] sm:text-[15.5px] text-[#556259] leading-relaxed">
            {data.description}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-[12px] font-bold tracking-[0.14em] uppercase transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#243c30] text-white shadow-md'
                    : 'bg-white text-[#4a554d] hover:bg-[#e8d8b6]/40 border border-[#e8d8b6]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActivePhoto(item)}
                className="group relative aspect-[4/3] rounded-[22px] overflow-hidden shadow-lg border-2 border-white bg-neutral-100 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-[#c5a059] uppercase mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-[17px] font-bold leading-snug">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-2 text-[12px] text-white/90">
                    <Eye size={14} className="text-[#c5a059]" />
                    <span>View Photo</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Close photo preview"
              >
                <X size={24} />
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>

              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-neutral-900"
              >
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                />
                <div className="bg-[#243c30] p-4 text-center text-white">
                  <span className="text-[11px] tracking-[0.2em] font-semibold text-[#c5a059] uppercase block mb-1">
                    {activePhoto.category}
                  </span>
                  <h3 className="font-serif text-[20px] font-bold">{activePhoto.title}</h3>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
