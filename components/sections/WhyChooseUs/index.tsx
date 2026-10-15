'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { WhyChooseUsSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhyChooseUs({ data }: { data: WhyChooseUsSectionData }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(containerRef);

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        });

        tl
          // Eyebrow lines draw outward
          .fromTo(
            q('[data-w-line]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' }
          )
          .fromTo(
            q('[data-w-eyebrow]'),
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform,opacity' },
            '<0.1'
          )
          // Title lines reveal up
          .fromTo(
            q('[data-w-title-line]'),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out', clearProps: 'transform' },
            '-=0.5'
          )
          // Left image wipe in + gentle zoom settle
          .fromTo(
            q('[data-w-img-left]'),
            { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.15 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath,transform' },
            '-=0.7'
          )
          // 4 feature rows stagger in
          .fromTo(
            q('[data-w-item]'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, clearProps: 'transform,opacity' },
            '-=0.9'
          )
          // Horizontal divider lines wipe across
          .fromTo(
            q('[data-w-row-divider]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, stagger: 0.1, ease: 'power2.inOut', clearProps: 'transform' },
            '<0.1'
          )
          // Right image wipe in
          .fromTo(
            q('[data-w-img-right]'),
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath,transform' },
            '-=0.8'
          );

        // Smooth scroll-scrubbed parallax depth on left & right images
        const scrub = {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        };

        gsap.fromTo(q('[data-w-par-left]'), { y: -20 }, { y: 30, ease: 'none', scrollTrigger: scrub });
        gsap.fromTo(q('[data-w-par-right]'), { y: 35 }, { y: -30, ease: 'none', scrollTrigger: scrub });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#fcfaf7] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-12 lg:pb-16"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Mobile / Tablet Header: visible when stacked */}
        <div className="lg:hidden text-center mb-3 sm:mb-4">
          <div className="flex items-center justify-center gap-3.5 mb-2">
            <span data-w-line className="block w-10 sm:w-14 h-px bg-[#c9a57a] origin-right" />
            <span
              data-w-eyebrow
              className="text-[11px] sm:text-[12px] tracking-[0.28em] font-medium text-[#b98a57] uppercase whitespace-nowrap"
            >
              {data.eyebrow}
            </span>
            <span data-w-line className="block w-10 sm:w-14 h-px bg-[#c9a57a] origin-left" />
          </div>

          <h2 className="font-serif font-normal tracking-[-0.01em] text-[34px] sm:text-[42px] leading-[1.06]">
            <span className="block overflow-hidden">
              <span data-w-title-line className="block text-[#1f3d33]">{data.title_line1}</span>
            </span>
            <span className="block overflow-hidden">
              <span data-w-title-line className="block text-[#b98a57]">{data.title_highlight}</span>
            </span>
          </h2>
        </div>

        {/* 3-Column Magazine Staggered Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1.2fr_1.15fr] xl:grid-cols-[1.25fr_1.25fr_1.25fr] gap-8 lg:gap-8 xl:gap-12 items-start">

          {/* Left Column: Villa Infinity Pool Image (aligned to top) */}
          <div data-w-par-left className="w-full flex justify-center lg:justify-start lg:pt-1">
            <div
              data-w-img-left
              className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-none aspect-[4/3] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_18px_45px_-15px_rgba(31,52,39,0.18)]"
            >
              <Image
                src={data.image_left}
                alt={`${data.title_line1} ${data.title_highlight}`}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 480px, 95vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Center Column: Eyebrow + 2-line Headline + 4 Items with Dividers */}
          <div className="w-full max-w-[500px] mx-auto lg:max-w-none flex flex-col">

            {/* Desktop-only Centered Header inside Middle Column */}
            <div className="hidden lg:block text-center mb-1 sm:mb-1.5 lg:mb-2">
              <div className="flex items-center justify-center gap-3.5 sm:gap-4 mb-2">
                <span data-w-line className="block w-10 sm:w-14 h-px bg-[#c9a57a] origin-right" />
                <span
                  data-w-eyebrow
                  className="text-[11px] sm:text-[12px] tracking-[0.28em] font-medium text-[#b98a57] uppercase whitespace-nowrap"
                >
                  {data.eyebrow}
                </span>
                <span data-w-line className="block w-10 sm:w-14 h-px bg-[#c9a57a] origin-left" />
              </div>

              <h2 className="font-serif font-normal tracking-[-0.01em] text-[40px] xl:text-[48px] 2xl:text-[54px] leading-[1.04]">
                <span className="block overflow-hidden">
                  <span data-w-title-line className="block text-[#1f3d33]">{data.title_line1}</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-w-title-line className="block text-[#b98a57]">{data.title_highlight}</span>
                </span>
              </h2>
            </div>

            {/* 4 Numbered Items with Horizontal Dividers */}
            <div className="flex flex-col">
              {data.items?.map((item, index) => {
                const isLast = index === (data.items.length - 1);
                return (
                  <div key={item.number} className="w-full">
                    <div
                      data-w-item
                      className={`group flex items-start ${
                        index === 0 ? 'pt-0.5 pb-2.5 sm:pb-3' : 'py-2.5 sm:py-3'
                      }`}
                    >
                      {/* Number: 01. / 02. / 03. / 04. */}
                      <span className="font-serif text-[28px] sm:text-[32px] lg:text-[34px] font-normal text-[#1f3d33] leading-none shrink-0 w-[48px] sm:w-[56px] tracking-tight transition-colors duration-300 group-hover:text-[#b98a57]">
                        {item.number}
                      </span>

                      {/* Vertical Divider Line */}
                      <span className="w-px h-[30px] sm:h-[34px] bg-[#dfd6c6] mx-3 sm:mx-3.5 shrink-0 self-start mt-0.5 transition-colors duration-300 group-hover:bg-[#b98a57]" />

                      {/* Content: Title & Description */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[17px] sm:text-[18.5px] font-medium text-[#1f3d33] leading-snug mb-1 transition-colors duration-300 group-hover:text-[#b98a57]">
                          {item.title}
                        </h3>
                        <p className="text-[12.5px] sm:text-[13.5px] text-[#5d6761] leading-[1.58]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Horizontal Divider Line between rows matching screenshot */}
                    {!isLast && (
                      <div
                        data-w-row-divider
                        className="w-full h-px bg-[#eee6d8] origin-left"
                      />
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Outdoor Dining Terrace Image (shifted lower down as requested) */}
          <div data-w-par-right className="w-full flex justify-center lg:justify-end lg:pt-36 xl:pt-44 2xl:pt-48">
            <div
              data-w-img-right
              className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-none aspect-[4/3] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_18px_45px_-15px_rgba(31,52,39,0.18)]"
            >
              <Image
                src={data.image_right}
                alt={`${data.title_line1} ${data.title_highlight}`}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 480px, 95vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
