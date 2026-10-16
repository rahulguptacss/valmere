'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogSectionData, BlogPostItem, toSlug } from '../../types';

export default function Blog({ data }: { data: BlogSectionData }) {
  const containerRef = useRef<HTMLElement>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Read pagination config and posts strictly from data.json
  const postsPerPage = data.posts_per_page || 6;
  const allPosts = data.posts || [];
  const totalPages = Math.max(1, Math.ceil(allPosts.length / postsPerPage));

  // Slice posts for active page
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#fdfcf9] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading from data.json with Framer Motion reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow with centered gold divider lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3">
            <span className="w-6 sm:w-9 h-[1.5px] bg-[#c28b38]" />
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] text-[#c28b38] uppercase">
              {data.eyebrow}
            </span>
            <span className="w-6 sm:w-9 h-[1.5px] bg-[#c28b38]" />
          </div>

          {/* Heading: Title from data.json */}
          <h2 className="font-serif text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-normal leading-[1.16] tracking-[-0.01em] text-[#16241b]">
            {data.title_line1}{' '}
            <span className="font-serif italic text-[#c28b38] font-normal">
              {data.title_highlight}
            </span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-[14px] md:text-[14.5px] text-[#64748b] leading-relaxed max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Scroll anchor for pagination */}
        <div ref={gridTopRef} className="scroll-mt-24" />

        {/* 2-Column Responsive Blog Grid with AnimatePresence Page Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-5 sm:mt-6 lg:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
          >
            {currentPosts.map((post: BlogPostItem, index: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                className="group relative bg-white rounded-xl sm:rounded-2xl border border-[#e8e4dc] overflow-hidden flex flex-col sm:flex-row shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_rgba(22,36,27,0.07)] hover:border-[#ded5c6] transition-all duration-300"
              >
                {/* Left Image: Flush to borders, refined compact proportions */}
                <div className="relative w-full sm:w-[38%] md:w-[40%] lg:w-[41%] h-[190px] sm:h-auto min-h-[190px] sm:min-h-[210px] md:min-h-[220px] shrink-0 overflow-hidden bg-[#e8e2d5]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Right Content Area: Sleek refined padding */}
                <div className="flex flex-col justify-between flex-1 p-4 sm:p-5 lg:p-5.5">
                  <div>
                    {/* Meta: Calendar Icon + Date + Divider + Category */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] leading-none mb-2 sm:mb-2.5">
                      <Calendar
                        className="w-[15px] h-[15px] text-[#c28b38] shrink-0"
                        strokeWidth={1.8}
                      />
                      <span className="text-[#475569] font-normal">{post.date}</span>
                      <span className="text-[#c28b38]/70 mx-0.5 select-none">|</span>
                      <span className="text-[#c28b38] font-normal tracking-wide">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Title: Refined serif font */}
                    {(() => {
                      const postSlug = post.slug || toSlug(post.title);
                      const postHref = post.href && post.href !== '/blog' ? post.href : `/blog/${postSlug}`;
                      return (
                        <>
                          <h3 className="font-serif text-[17px] sm:text-[18.5px] lg:text-[19.5px] font-normal text-[#16241b] leading-[1.3] tracking-[-0.01em] group-hover:text-[#c28b38] transition-colors duration-200 line-clamp-2">
                            <Link href={postHref} className="focus:outline-none">
                              {post.title}
                            </Link>
                          </h3>

                          {/* Excerpt Description: Clean 2-line clamp */}
                          <p className="mt-2 text-[12.5px] sm:text-[13px] text-[#64748b] leading-[1.55] line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Horizontal Divider Line & Read More Row */}
                          <div className="mt-3.5 pt-3 sm:mt-4 sm:pt-3.5 border-t border-[#ede8e1]">
                            <Link
                              href={postHref}
                              className="inline-flex items-center gap-3 group/btn"
                            >
                              <span className="font-serif text-[15px] sm:text-[16px] text-[#16241b] font-normal group-hover/btn:text-[#c28b38] group-hover:text-[#c28b38] transition-colors duration-200">
                                Read More
                              </span>
                              <span className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#c28b38] text-white flex items-center justify-center shrink-0 shadow-sm group-hover/btn:bg-[#a9752b] group-hover:bg-[#a9752b] group-hover:translate-x-1 transition-all duration-300">
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
                              </span>
                            </Link>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Working Pagination: Centered pill container matching screenshot */}
        {totalPages > 1 && (
          <div className="mt-10 sm:mt-14 flex items-center justify-center">
            <nav
              aria-label="Blog Pagination"
              className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-[10px] bg-[#f8f5ee] border border-[#e8dfd1] shadow-sm"
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-[16px] transition-all cursor-pointer ${
                  currentPage === 1
                    ? 'text-[#b0aba0] opacity-40 cursor-not-allowed'
                    : 'text-[#8e8b82] hover:text-[#16241b] hover:bg-white/70'
                }`}
                aria-label="Previous page"
              >
                «
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md text-[13.5px] transition-all cursor-pointer ${
                      isActive
                        ? 'font-semibold text-[#16241b] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#e8dfd1]'
                        : 'font-normal text-[#6f756e] hover:text-[#16241b] hover:bg-white/70'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-[16px] transition-all cursor-pointer ${
                  currentPage === totalPages
                    ? 'text-[#b0aba0] opacity-40 cursor-not-allowed'
                    : 'text-[#8e8b82] hover:text-[#16241b] hover:bg-white/70'
                }`}
                aria-label="Next page"
              >
                »
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
