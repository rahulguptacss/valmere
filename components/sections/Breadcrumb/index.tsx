'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BreadcrumbData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Breadcrumb({ data }: { data: BreadcrumbData }) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  const bgImage = data.image || '/img/breadcrumb.webp';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Background image gentle entrance
        if (bgImgRef.current) {
          tl.fromTo(
            bgImgRef.current,
            { scale: 1.1, opacity: 0.8 },
            { scale: 1.04, opacity: 1, duration: 1.4, ease: 'power2.out', clearProps: 'opacity' }
          );
        }

        // Title reveals up
        tl.fromTo(
          titleRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity' },
          '-=1'
        ).fromTo(
          navRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', clearProps: 'transform,opacity' },
          '-=0.6'
        );

        // Subtle background image parallax on scroll
        if (bgImgRef.current) {
          gsap.fromTo(
            bgImgRef.current,
            { y: 0 },
            {
              y: 35,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#16221a] text-white min-h-[200px] sm:min-h-[250px] md:min-h-[290px] lg:min-h-[330px] flex items-center justify-center py-10 sm:py-14 md:py-16 lg:py-18"
    >
      {/* Background Image: /img/breadcrumb.webp with parallax */}
      <div
        ref={bgImgRef}
        className="absolute inset-0 -top-6 -bottom-8 w-full h-[calc(100%+56px)] z-0"
      >
        <Image
          src={bgImage}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.04]"
        />
        {/* Dark overlay matching screenshot depth and contrast */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-[0.92]" />
      </div>

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Title: Big Serif font matching screenshot */}
        <h1
          ref={titleRef}
          className="font-serif text-[40px] sm:text-[54px] md:text-[64px] lg:text-[74px] font-normal leading-[1.08] tracking-[-0.01em] mb-2 sm:mb-2.5 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          {data.title}
        </h1>

        {/* Breadcrumb Navigation: HOME / ABOUT US */}
        <nav
          ref={navRef}
          aria-label="Breadcrumb"
          className="flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 text-[11px] sm:text-[12px] md:text-[12.5px] tracking-[0.24em] uppercase font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          {data.items?.map((item, index) => {
            const isLast = index === data.items.length - 1;
            return (
              <React.Fragment key={item.name}>
                {index > 0 && (
                  <span className="text-white/80 mx-1.5 select-none font-normal">/</span>
                )}
                {isLast ? (
                  <span className="text-white">{item.name}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-[#c5a059] transition-colors duration-200"
                  >
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
