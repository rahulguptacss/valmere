'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, MessageSquare, Clock, Calendar, ArrowRight, Check } from 'lucide-react';
import { BlogDetailItem, RecentBlogPost } from '../../types';

interface BlogDetailsProps {
  data: BlogDetailItem;
  recentPosts?: RecentBlogPost[];
  recentPostsTitle?: string;
}

export default function BlogDetails({
  data,
  recentPosts = [],
  recentPostsTitle = 'Recent Posts',
}: BlogDetailsProps) {
  return (
    <section className="relative bg-[#fdfcf9] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Left Column: Main Blog Article matching screenshot */}
          <main className="lg:col-span-8">
            <article>
              {/* Featured Main Image with gentle entrance animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-[260px] sm:h-[380px] md:h-[450px] lg:h-[480px] rounded-2xl sm:rounded-[22px] overflow-hidden bg-[#e8e2d5] shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 860px"
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Meta bar: By Admin | Comments (03) | 5 min Read */}
              <div className="mt-4 sm:mt-5 mb-3 sm:mb-4 flex items-center flex-wrap gap-2.5 sm:gap-3 text-[12.5px] sm:text-[13px] text-[#6b7280]">
                <div className="flex items-center gap-1.5 text-[#52525b]">
                  <User className="w-3.5 h-3.5 text-[#c28b38]" strokeWidth={1.8} />
                  <span>{data.author || 'By Admin'}</span>
                </div>
                <span className="text-[#d8d1c4] select-none">|</span>
                <div className="flex items-center gap-1.5 text-[#52525b]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#c28b38]" strokeWidth={1.8} />
                  <span>{data.comments_count || 'Comments (03)'}</span>
                </div>
                <span className="text-[#d8d1c4] select-none">|</span>
                <div className="flex items-center gap-1.5 text-[#52525b]">
                  <Clock className="w-3.5 h-3.5 text-[#c28b38]" strokeWidth={1.8} />
                  <span>{data.read_time || '5 min Read'}</span>
                </div>
              </div>

              {/* Main Heading in Serif font matching screenshot */}
              <h1 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.22] tracking-[-0.01em] text-[#16241b] mb-5 sm:mb-6">
                {data.title}
              </h1>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-[14px] sm:text-[14.5px] md:text-[15px] text-[#556057] leading-[1.72]">
                {data.paragraphs &&
                  data.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
              </div>

              {/* Quote / Callout Box matching screenshot */}
              {data.quote && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="my-7 sm:my-8 bg-[#fbf9f4] border border-[#f0ebd9] rounded-2xl p-6 sm:p-7 md:p-8 flex items-start gap-4 sm:gap-5"
                >
                  <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f3ebd7] text-[#c28b38] flex items-center justify-center shrink-0 font-serif text-2xl font-bold select-none">
                    “
                  </span>
                  <div className="flex-1">
                    <blockquote className="font-serif italic text-[16px] sm:text-[17.5px] md:text-[18.5px] text-[#16241b] leading-[1.58]">
                      &ldquo;{data.quote.text}&rdquo;
                    </blockquote>
                    {data.quote.author && (
                      <div className="flex items-center gap-2 mt-3.5">
                        <span className="w-6 h-[1.5px] bg-[#c28b38]" />
                        <span className="text-[12.5px] sm:text-[13px] font-medium text-[#7a7466]">
                          {data.quote.author}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Subheading: Key Factors to Consider */}
              <h2 className="font-serif text-[22px] sm:text-[26px] md:text-[28px] font-normal text-[#16241b] mt-8 sm:mt-9 mb-5 sm:mb-6">
                {data.key_factors_title || 'Key Factors to Consider'}
              </h2>

              {/* Sub-section: Small Image on Left + Checklist on Right */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                {/* Left Thumbnail Image */}
                <div className="sm:col-span-5 relative w-full h-[190px] sm:h-[210px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#e8e2d5] shadow-sm">
                  <Image
                    src={data.key_factors_image || '/blog/1.webp'}
                    alt={data.key_factors_title || 'Key Factors to Consider'}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Right Checklist Items with Gold Badges */}
                <div className="sm:col-span-7">
                  <ul className="space-y-2.5 sm:space-y-3">
                    {data.key_factors &&
                      data.key_factors.map((factor, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 sm:gap-3 text-[13px] sm:text-[13.5px] text-[#4b5563]"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#c28b38] text-white flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-3 h-3 text-white" strokeWidth={2.8} />
                          </span>
                          <span>{factor}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </article>
          </main>

          {/* Right Column: Recent Posts Sidebar matching screenshot */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start space-y-6">
            <div className="bg-white rounded-2xl border border-[#ede8de] p-5 sm:p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              {/* Sidebar Header with vertical gold bar */}
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="w-[3px] h-5 bg-[#c28b38] rounded-full inline-block" />
                <h3 className="font-serif text-[19px] sm:text-[21px] font-normal text-[#16241b]">
                  {recentPostsTitle}
                </h3>
              </div>

              {/* Recent Posts List */}
              <div className="divide-y divide-[#ede8e1]">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={post.href || `/blog/${post.slug}`}
                    className="group flex items-center gap-3 sm:gap-3.5 py-3.5 first:pt-0 last:pb-0 hover:bg-[#faf7f2]/60 rounded-lg p-1.5 transition-colors duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-[10px] overflow-hidden shrink-0 bg-[#e8e2d5]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#717a74] mb-1">
                        <Calendar className="w-3 h-3 text-[#c28b38] shrink-0" strokeWidth={1.8} />
                        <span>{post.date}</span>
                      </div>
                      <h4 className="font-serif text-[13px] sm:text-[13.5px] font-normal text-[#16241b] leading-[1.3] line-clamp-2 group-hover:text-[#c28b38] transition-colors duration-200">
                        {post.title}
                      </h4>
                    </div>

                    {/* Gold Circular Action Button */}
                    <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#c28b38] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#a9752b] group-hover:translate-x-0.5 transition-all duration-200">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
