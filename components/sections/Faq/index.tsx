'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, MessageSquare } from 'lucide-react';
import { FaqSectionData } from '../../types';

export default function Faq({ data }: { data: FaqSectionData }) {
  return (
    <section className="relative overflow-hidden bg-[#edf3ea] py-16 lg:py-24">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Overlapping Dual Circular Badges matching screenshot */}
        <div className="flex items-center justify-center -space-x-4 mb-8">
          {/* Left Circular Avatar (Concierge Receptionist) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-neutral-200"
          >
            <img
              src={data.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
              alt="Valmere Concierge"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          {/* Right Circular Green/Gold Phone Badge with Circular Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#243c30] border-4 border-white shadow-xl flex items-center justify-center text-white"
          >
            {/* Center Phone Icon */}
            <div className="w-10 h-10 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
              <Phone size={18} />
            </div>

            {/* Rotating SVG Circular Badge Ring */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] pointer-events-none"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="7.5" fontWeight="bold" fill="#e8d8b6" letterSpacing="2.5">
                <textPath href="#circlePath">
                  CONTACT US NOW • CALL US •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Headline matching screenshot */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-[34px] sm:text-[46px] md:text-[52px] leading-tight font-normal text-[#243c30] mb-4"
        >
          <span>{data.title_line1} </span>
          <span className="italic text-[#c5a059]">{data.title_highlight}</span>
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[14px] sm:text-[15.5px] text-[#556259] leading-[1.8] max-w-xl mx-auto mb-8 font-normal"
        >
          {data.description}
        </motion.p>

        {/* White Pill Button with Gold Circle Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href={data.button?.href || "/contact"}
            className="inline-flex items-center gap-3 bg-white hover:bg-neutral-50 text-[#243c30] pl-2.5 pr-7 py-2.5 rounded-full text-[12.5px] font-bold tracking-[0.16em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#e8d8b6]/60"
          >
            {/* Small Gold Circle Icon */}
            <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center text-white shrink-0 shadow-sm">
              <ArrowRight size={14} />
            </div>
            <span>{data.button?.text || "GET IN TOUCH"}</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
