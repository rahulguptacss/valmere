'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RiDoubleQuotesL } from 'react-icons/ri';
import { TestimonialsSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AUTOPLAY_MS = 6500;

// Circular outline arrow button (gold ring, green chevron)
function NavButton({
  dir,
  onClick,
  className = '',
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
  className?: string;
}) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
      className={`group w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full border border-[#c9a57a] bg-white/70 text-[#1f3d33] flex items-center justify-center transition-[background-color,color,border-color,box-shadow] duration-300 hover:bg-[#b98a5e] hover:border-[#b98a5e] hover:text-white hover:shadow-[0_10px_24px_-10px_rgba(185,138,94,0.7)] ${className}`}
    >
      <Icon
        size={19}
        strokeWidth={1.6}
        className={`transition-[translate] duration-300 ${dir === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
      />
    </button>
  );
}

export default function Testimonials({
  data,
  variant = 'slider',
}: {
  data: TestimonialsSectionData;
  variant?: 'slider' | 'grid';
}) {
  const items = data.items || [];
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const touchX = useRef<number | null>(null);

  // Middle item active by default (matches screenshot: centre avatar + centre dot)
  const [index, setIndex] = useState(Math.floor(items.length / 2));
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (!items.length) return;
      setDirection(dir);
      setIndex((prev) => (prev + dir + items.length) % items.length);
    },
    [items.length]
  );

  const goTo = (i: number) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Autoplay (resets after every change, pauses on hover/focus)
  useEffect(() => {
    if (variant === 'grid' || paused || items.length < 2) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, go, items.length, variant]);

  // Scroll entrance
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(sectionRef);

        if (variant === 'grid') {
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
          });

          tl
            .fromTo(
              q('[data-t-line]'),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.9, ease: 'power2.inOut', clearProps: 'transform' }
            )
            .fromTo(
              q('[data-t-eyebrow]'),
              { y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' },
              '<0.1'
            )
            .fromTo(
              q('[data-t-word]'),
              { yPercent: 115 },
              { yPercent: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out', clearProps: 'transform' },
              '-=0.5'
            )
            .fromTo(
              q('[data-t-subtitle]'),
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity' },
              '-=0.4'
            )
            .fromTo(
              q('[data-t-grid-card]'),
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity' },
              '-=0.4'
            );
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        });

        tl
          // Eyebrow lines draw outward from the label
          .fromTo(
            q('[data-t-line]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: 'power2.inOut', clearProps: 'transform' }
          )
          .fromTo(
            q('[data-t-eyebrow]'),
            { y: 12, opacity: 0, letterSpacing: '0.5em' },
            { y: 0, opacity: 1, letterSpacing: '0.3em', duration: 0.9, clearProps: 'transform,opacity,letterSpacing' },
            '<0.1'
          )
          // Headline words rise out of masks
          .fromTo(
            q('[data-t-word]'),
            { yPercent: 115 },
            { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out', clearProps: 'transform' },
            '-=0.6'
          )
          // Quote mark pops
          .fromTo(
            q('[data-t-quote-icon]'),
            { scale: 0, rotate: -30, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: 'back.out(2.4)', clearProps: 'transform,opacity' },
            '-=0.6'
          )
          // Review content fades up
          .fromTo(
            q('[data-t-content-wrap]'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, clearProps: 'transform,opacity' },
            '-=0.4'
          )
          // Arrows slide in from the sides
          .fromTo(
            q('[data-t-nav="prev"]'),
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' },
            '<0.1'
          )
          .fromTo(
            q('[data-t-nav="next"]'),
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' },
            '<'
          )
          // Avatars + dots
          .fromTo(
            q('[data-t-avatar-row]'),
            { y: 24, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.8)', clearProps: 'transform,opacity' },
            '-=0.5'
          )
          .fromTo(
            q('[data-t-dot]'),
            { scale: 0 },
            { scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(3)', clearProps: 'transform' },
            '-=0.4'
          );

        // Idle: soft breathing glow ring on the active avatar
        gsap.to(q('[data-t-glow]'), {
          scale: 1.12,
          opacity: 0,
          duration: 1.8,
          ease: 'sine.out',
          repeat: -1,
        });
      });
    },
    { scope: sectionRef }
  );

  // Slide change animation
  useGSAP(
    () => {
      if (variant === 'grid') return;
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        contentRef.current,
        { x: 40 * direction, opacity: 0, filter: 'blur(6px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity,filter' }
      );
      gsap.fromTo(
        q('[data-t-content] [data-t-meta]'),
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.15, ease: 'power3.out', clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        q('[data-t-avatar]'),
        { scale: 0.75, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'back.out(2)', clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        q('[data-t-quote-icon]'),
        { rotate: -12 * direction, scale: 0.85 },
        { rotate: 0, scale: 1, duration: 0.6, ease: 'back.out(2.5)', clearProps: 'transform' }
      );
    },
    { scope: sectionRef, dependencies: [index, variant] }
  );

  if (!items.length) return null;
  const current = items[index];

  const titleWords = data.title_line1.split(' ');
  const highlightWords = data.title_highlight.split(' ');

  // Grid layout for Testimonials Page matching screenshot
  if (variant === 'grid') {
    return (
      <section
        ref={sectionRef}
        id="testimonials"
        className="relative w-full overflow-hidden bg-[#fdfcf9] py-14 sm:py-20 lg:py-24"
      >
        <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          {/* Eyebrow with gold lines */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <span data-t-line className="block w-[38px] sm:w-[64px] h-px bg-[#c9a57a] origin-right" />
            <span
              data-t-eyebrow
              className="text-[11px] sm:text-[12.5px] font-medium tracking-[0.28em] text-[#a87d55] uppercase whitespace-nowrap"
            >
              {data.eyebrow}
            </span>
            <span data-t-line className="block w-[38px] sm:w-[64px] h-px bg-[#c9a57a] origin-left" />
          </div>

          {/* Headline */}
          <h2 className="mt-3 sm:mt-4 text-center font-serif font-normal leading-[1.12] tracking-[-0.01em] text-[34px] sm:text-[46px] lg:text-[54px]">
            {titleWords.map((w, i) => (
              <span key={`t-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.24em]">
                <span data-t-word className="inline-block text-[#1f4a3a]">
                  {w}
                </span>
              </span>
            ))}
            {highlightWords.map((w, i) => (
              <span
                key={`h-${i}`}
                className={`inline-block overflow-hidden align-bottom pb-[0.08em] ${i < highlightWords.length - 1 ? 'mr-[0.24em]' : ''}`}
              >
                <span data-t-word className="inline-block text-[#b98a63]">
                  {w}
                </span>
              </span>
            ))}
          </h2>

          {/* Subtitle description */}
          {data.description && (
            <p
              data-t-subtitle
              className="mt-3 sm:mt-4 text-center max-w-[680px] mx-auto text-[13.5px] sm:text-[14.5px] text-[#556259] leading-[1.65] font-light"
            >
              {data.description}
            </p>
          )}

          {/* 2x2 Testimonials Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 mt-10 sm:mt-12">
            {items.map((item) => (
              <div
                key={item.id}
                data-t-grid-card
                className="group bg-white rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4 border border-[#eee4d6] shadow-[0_10px_35px_-15px_rgba(31,52,39,0.06)] hover:shadow-[0_20px_45px_-15px_rgba(31,52,39,0.12)] transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5"
              >
                {/* Left: Resort Image */}
                <div className="relative w-full sm:w-[200px] md:w-[220px] lg:w-[210px] xl:w-[230px] shrink-0 aspect-[4/3] sm:aspect-auto rounded-[16px] sm:rounded-[20px] overflow-hidden">
                  <Image
                    src={item.image || '/img/why-choose-1.webp'}
                    alt={item.author}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 220px, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Right: Quote, 5 Stars, Author */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:py-1.5 w-full">
                  {/* Top: Gold Quote Icon & 5 Stars */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex text-[#c5a059]">
                      <RiDoubleQuotesL className="w-6 h-6 sm:w-7 sm:h-7" />
                    </span>
                    <div className="flex items-center gap-0.5 text-[#c5a059]" aria-label="5 out of 5 stars">
                      {[...Array(item.rating || 5)].map((_, starI) => (
                        <span key={starI} className="text-[13px] sm:text-[14px] leading-none">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Review text */}
                  <p className="text-[12.5px] sm:text-[13px] xl:text-[13.5px] leading-[1.65] text-[#525a55] font-light my-3 sm:my-3.5">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Bottom: Avatar + Author Info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#f4ede2]/80">
                    <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-full overflow-hidden border border-[#c9a57a]/40 shrink-0">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        sizes="42px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif font-medium text-[15px] sm:text-[16px] text-[#1f3d33] leading-snug truncate">
                        {item.author}
                      </h3>
                      <p className="text-[11px] sm:text-[11.5px] text-[#7a867f] leading-tight truncate mt-0.5">
                        {item.location || item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show prev / active / next around the active one (active always centred)
  const visible =
    items.length >= 3
      ? [-1, 0, 1].map((o) => ({ item: items[(index + o + items.length) % items.length], offset: o }))
      : items.map((item, i) => ({ item, offset: i - index }));

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#fdfcf9] py-16 sm:py-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 text-center">
        {/* Eyebrow with gold lines */}
        <div className="flex items-center justify-center gap-4 sm:gap-5">
          <span data-t-line className="block w-[38px] sm:w-[64px] h-px bg-[#c9a57a] origin-right" />
          <span
            data-t-eyebrow
            className="text-[11px] sm:text-[12.5px] font-normal tracking-[0.3em] text-[#a87d55] uppercase whitespace-nowrap"
          >
            {data.eyebrow}
          </span>
          <span data-t-line className="block w-[38px] sm:w-[64px] h-px bg-[#c9a57a] origin-left" />
        </div>

        {/* Headline */}
        <h2 className="mt-3 sm:mt-4 font-serif font-normal leading-[1.12] tracking-[-0.01em] text-[34px] sm:text-[46px] lg:text-[54px]">
          {titleWords.map((w, i) => (
            <span key={`t-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.24em]">
              <span data-t-word className="inline-block text-[#1f4a3a]">
                {w}
              </span>
            </span>
          ))}
          {highlightWords.map((w, i) => (
            <span
              key={`h-${i}`}
              className={`inline-block overflow-hidden align-bottom pb-[0.08em] ${i < highlightWords.length - 1 ? 'mr-[0.24em]' : ''}`}
            >
              <span data-t-word className="inline-block text-[#b98a63]">
                {w}
              </span>
            </span>
          ))}
        </h2>

        {/* Quote mark */}
        <div className="mt-3 sm:mt-4 flex justify-center">
          <span data-t-quote-icon className="inline-flex text-[#b98a5e]">
            <RiDoubleQuotesL className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]" />
          </span>
        </div>

        {/* Review + side arrows */}
        <div
          className="relative mt-3 sm:mt-4"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Desktop arrows (vertically centred on quote) */}
          <div data-t-nav="prev" className="hidden md:block absolute left-0 lg:left-[2%] top-1/2 -translate-y-1/2">
            <NavButton dir="prev" onClick={() => go(-1)} />
          </div>
          <div data-t-nav="next" className="hidden md:block absolute right-0 lg:right-[2%] top-1/2 -translate-y-1/2">
            <NavButton dir="next" onClick={() => go(1)} />
          </div>

          <div data-t-content-wrap className="mx-auto max-w-[620px] lg:max-w-[660px] md:px-4">
            <div
              ref={contentRef}
              data-t-content
              aria-live="polite"
              className="min-h-[210px] sm:min-h-[190px] lg:min-h-[180px] flex flex-col items-center"
            >
              <p className="text-[15.5px] sm:text-[17px] lg:text-[19px] leading-[1.6] text-[#4b514d] font-light">
                {current.quote}
              </p>
              <h3 data-t-meta className="mt-5 sm:mt-6 font-serif font-normal text-[20px] sm:text-[22px] text-[#1f3d33]">
                {current.author}
              </h3>
              <p data-t-meta className="mt-1 text-[11px] sm:text-[12px] tracking-[0.24em] text-[#b98a5e] uppercase">
                {current.role}
              </p>
            </div>
          </div>
        </div>

        {/* Avatars (mobile arrows sit beside them) */}
        <div data-t-avatar-row className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4">
          <div data-t-nav="prev" className="md:hidden mr-1">
            <NavButton dir="prev" onClick={() => go(-1)} />
          </div>

          {visible.map(({ item, offset }) => {
            const active = offset === 0;
            return (
              <button
                key={item.id}
                data-t-avatar
                type="button"
                onClick={() => goTo(items.indexOf(item))}
                aria-label={`Show review by ${item.author}`}
                aria-current={active}
                className={`relative shrink-0 rounded-full transition-[opacity,filter] duration-300 ${
                  active ? '' : 'opacity-90 hover:opacity-100'
                }`}
              >
                {active && (
                  <span
                    data-t-glow
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-[#c9a57a] pointer-events-none"
                  />
                )}
                <span
                  className={`block rounded-full ${
                    active
                      ? 'w-[62px] h-[62px] sm:w-[74px] sm:h-[74px] p-[3px] border border-[#b98a5e] bg-white shadow-[0_10px_24px_-12px_rgba(31,61,51,0.45)]'
                      : 'w-[44px] h-[44px] sm:w-[52px] sm:h-[52px]'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={item.author}
                    loading="lazy"
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </span>
              </button>
            );
          })}

          <div data-t-nav="next" className="md:hidden ml-1">
            <NavButton dir="next" onClick={() => go(1)} />
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 sm:mt-7 flex items-center justify-center gap-[10px]">
          {items.map((item, i) => (
            <button
              key={item.id}
              data-t-dot
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-[8px] h-[8px] rounded-full transition-[background-color,scale] duration-300 ${
                i === index ? 'bg-[#b98a5e] scale-110' : 'bg-[#e6d9c8] hover:bg-[#d4bc9c]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
