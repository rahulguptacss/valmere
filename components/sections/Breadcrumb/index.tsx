'use client';

import React from 'react';
import Link from 'next/link';
import { BreadcrumbData } from '../../types';

export default function Breadcrumb({ data }: { data: BreadcrumbData }) {
  return (
    <section className="relative bg-[#243c30] text-white py-14 sm:py-20 overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full border border-white/10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute right-12 top-6 w-64 h-64 rounded-full border border-[#c5a059]/20 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[54px] font-normal leading-tight mb-4 text-white">
          {data.title}
        </h1>

        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-[12px] sm:text-[13px] tracking-[0.16em] uppercase font-semibold text-[#e8d8b6]">
          {data.items?.map((item, index) => {
            const isLast = index === data.items.length - 1;
            return (
              <React.Fragment key={item.name}>
                {index > 0 && <span className="text-[#c5a059]/60">•</span>}
                {isLast ? (
                  <span className="text-white">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-white transition">
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
