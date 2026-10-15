'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { CtaSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Green circular badge with curved text (top: label, bottom: phone)
function CallBadge({ label, phone }: { label: string; phone: string }) {
  return (
    <a
      href={`tel:${phone.replace(/[^+\d]/g, '')}`}
      aria-label={`${label} ${phone}`}
      className="group/badge relative block w-full h-full"
    >
      <svg viewBox="0 0 160 160" className="w-full h-full" aria-hidden="true">
        <defs>
          <path id="cta-arc-top" d="M23,80 A57,57 0 0 1 137,80" />
          <path id="cta-arc-bottom" d="M14,80 A66,66 0 0 0 146,80" />
        </defs>
        {/* Outer gold ring + cream gap */}
        <circle cx="80" cy="80" r="79" fill="#f6f0e4" stroke="#c9a57a" strokeWidth="1.3" />
        {/* Green fill */}
        <circle cx="80" cy="80" r="74.5" fill="#5b6f58" className="transition-[fill] duration-500 group-hover/badge:fill-[#4e624c]" />

        <text fill="#ffffff" fontSize="11.5" letterSpacing="1.6" style={{ fontWeight: 400 }}>
          <textPath href="#cta-arc-top" startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
        <text fill="#ffffff" fontSize="12" letterSpacing="1.4" style={{ fontWeight: 400 }}>
          <textPath href="#cta-arc-bottom" startOffset="50%" textAnchor="middle">
            {phone}
          </textPath>
        </text>

        {/* Short gold side lines */}
        <line x1="25" y1="80" x2="36" y2="80" stroke="#c9a57a" strokeWidth="1.2" />
        <line x1="124" y1="80" x2="135" y2="80" stroke="#c9a57a" strokeWidth="1.2" />
      </svg>

      {/* Centre phone icon */}
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span data-cta-phone className="inline-flex text-[#d2ae80]">
          <Phone className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px]" strokeWidth={1.3} />
        </span>
      </span>
    </a>
  );
}

export default function Cta({ data }: { data: CtaSectionData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(sectionRef);

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });

        tl
          // Photo circle grows in from the left
          .fromTo(
            q('[data-cta-photo]'),
            { x: -60, scale: 0.6, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.5)', clearProps: 'transform,opacity' }
          )
          // Badge rolls in from the right
          .fromTo(
            q('[data-cta-badge]'),
            { x: 70, rotate: -120, scale: 0.6, opacity: 0 },
            { x: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.4)', clearProps: 'transform,opacity' },
            '-=0.85'
          )
          // Headline words rise out of masks
          .fromTo(
            q('[data-cta-word]'),
            { yPercent: 115 },
            { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out', clearProps: 'transform' },
            '-=0.7'
          )
          // Paragraph lines fade up
          .fromTo(
            q('[data-cta-desc]'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' },
            '-=0.6'
          )
          // Button pops in, arrow circle spins
          .fromTo(
            q('[data-cta-btn]'),
            { y: 20, scale: 0.85, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)', clearProps: 'transform,opacity' },
            '-=0.45'
          )
          .fromTo(
            q('[data-cta-arrow]'),
            { rotate: -180, scale: 0 },
            { rotate: 0, scale: 1, duration: 0.7, ease: 'back.out(2.2)', clearProps: 'transform' },
            '-=0.5'
          );

        // Idle: gentle float on the circles (inner wrappers, separate from entrance)
        gsap.to(q('[data-cta-float-a]'), {
          y: -8,
          duration: 2.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(q('[data-cta-float-b]'), {
          y: 8,
          duration: 2.9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.4,
        });

        // Idle: phone icon "ringing" wiggle every few seconds
        gsap
          .timeline({ repeat: -1, repeatDelay: 2.4, delay: 2 })
          .to(q('[data-cta-phone]'), { rotate: -14, duration: 0.08, ease: 'none' })
          .to(q('[data-cta-phone]'), { rotate: 14, duration: 0.08, ease: 'none', repeat: 5, yoyo: true })
          .to(q('[data-cta-phone]'), { rotate: 0, duration: 0.12, ease: 'power2.out' });

        // Subtle scroll parallax on the circle cluster
        gsap.fromTo(
          q('[data-cta-cluster]'),
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const words = data.title.split(' ');
  const highlightWords = data.title_highlight.split(' ');

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full overflow-hidden bg-[#eef1e6] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Circle cluster */}
        <div data-cta-cluster className="flex items-center justify-center">
          {/* Photo */}
          <div data-cta-photo className="relative z-10">
            <div data-cta-float-a>
              <div className="relative w-[112px] h-[112px] sm:w-[136px] sm:h-[136px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden border-[3px] border-[#2f4538] bg-white shadow-[0_10px_30px_-12px_rgba(47,69,56,0.35)]">
                <Image
                  src={data.image}
                  alt={data.image_alt}
                  fill
                  sizes="(min-width: 1024px) 150px, (min-width: 640px) 136px, 112px"
                  className="object-cover scale-[1.07]"
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div data-cta-badge className="relative z-20 -ml-[14px] sm:-ml-[18px] lg:-ml-[20px]">
            <div data-cta-float-b className="w-[118px] h-[118px] sm:w-[142px] sm:h-[142px] lg:w-[158px] lg:h-[158px] drop-shadow-[0_10px_22px_rgba(47,69,56,0.25)]">
              <CallBadge label={data.badge_text} phone={data.phone} />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h2 className="mt-6 sm:mt-7 font-serif font-normal leading-[1.1] tracking-[-0.01em] text-[34px] sm:text-[46px] lg:text-[54px]">
          {words.map((w, i) => (
            <span key={`w-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.24em]">
              <span data-cta-word className="inline-block text-[#2f4a3a]">
                {w}
              </span>
            </span>
          ))}
          {highlightWords.map((w, i) => (
            <span
              key={`h-${i}`}
              className={`inline-block overflow-hidden align-bottom pb-[0.08em] ${i < highlightWords.length - 1 ? 'mr-[0.24em]' : ''}`}
            >
              <span data-cta-word className="inline-block text-[#b98a57]">
                {w}
              </span>
            </span>
          ))}
        </h2>

        {/* Description */}
        <p
          data-cta-desc
          className="mt-4 sm:mt-5 max-w-[560px] sm:max-w-none text-[14px] sm:text-[15px] leading-[1.75] text-[#5f665f] sm:whitespace-pre-line"
        >
          {data.description}
        </p>

        {/* Button */}
        <Link
          data-cta-btn
          href={data.button.href}
          className="group mt-7 sm:mt-8 inline-flex items-center gap-4 sm:gap-5 rounded-full border border-[#c9a57a] bg-white pl-[5px] pr-8 sm:pr-10 py-[5px] text-[#2f4538] shadow-[0_6px_20px_-10px_rgba(185,138,87,0.5)] transition-[background-color,color,box-shadow] duration-500 hover:bg-[#2f4538] hover:text-white hover:shadow-[0_12px_28px_-10px_rgba(47,69,56,0.55)]"
        >
          <span
            data-cta-arrow
            className="flex w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] items-center justify-center rounded-full bg-[#b98a57] text-white"
          >
            <ArrowUpRight
              className="w-[18px] h-[18px] transition-[rotate] duration-500 group-hover:rotate-45"
              strokeWidth={1.6}
            />
          </span>
          <span className="text-[13px] sm:text-[14px] font-medium tracking-[0.14em] uppercase">
            {data.button.text}
          </span>
        </Link>
      </div>
    </section>
  );
}
