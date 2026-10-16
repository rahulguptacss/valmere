'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AboutSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About({ data, showButton = true }: { data: AboutSectionData; showButton?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(containerRef);

        // Prepare leaf strokes for line-drawing
        const leafPaths = Array.from(
          containerRef.current?.querySelectorAll<SVGPathElement>('[data-leaf-svg] path') ?? []
        );
        leafPaths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        /* ---------- 1. Entrance timeline (once, when section enters view) ---------- */
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
        });

        tl
          // Main image wipes up from the bottom
          .fromTo(
            q('[data-mask="main"]'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath' }
          )
          // Top-right wipes in from the right
          .fromTo(
            q('[data-mask="top"]'),
            { clipPath: 'inset(0% 0% 0% 100%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut', clearProps: 'clipPath' },
            '-=0.95'
          )
          // Bottom-right wipes down from the top
          .fromTo(
            q('[data-mask="bottom"]'),
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut', clearProps: 'clipPath' },
            '-=0.85'
          )
          // Inner photos settle from a zoom (stay at 1.15 to leave room for parallax)
          .fromTo(
            q('[data-par-img]'),
            { scale: 1.4 },
            { scale: 1.15, duration: 1.8, stagger: 0.15, ease: 'power2.out' },
            0
          )
          // Eyebrow + gold line
          .fromTo(
            q('[data-eyebrow]'),
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, clearProps: 'transform,opacity' },
            0.4
          )
          .fromTo(
            q('[data-eyebrow-line]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: 'power2.inOut', clearProps: 'transform' },
            '<0.2'
          )
          // Headline lines rise out of masks
          .fromTo(
            q('[data-line]'),
            { yPercent: 110, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1, stagger: 0.13, ease: 'power4.out', clearProps: 'transform' },
            '-=0.6'
          )
          // Description
          .fromTo(
            q('[data-desc]'),
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' },
            '-=0.55'
          );

        if (showButton && q('[data-btn]').length) {
          tl.fromTo(
            q('[data-btn]'),
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' },
            '-=0.6'
          ).to(q('[data-btn-arrow]'), {
            x: 7,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
            clearProps: 'transform',
          });
        }
        // Botanical leaf lines draw themselves
        tl.to(
          leafPaths,
          { strokeDashoffset: 0, duration: 2.2, stagger: 0.07, ease: 'power2.inOut' },
          0.5
        );

        /* ---------- 2. Scroll-linked parallax ---------- */
        const scrub = {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        };

        // Photos glide inside their frames (main opposite to the stack → depth)
        gsap.fromTo(q('[data-par-img="main"]'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: scrub });
        gsap.fromTo(q('[data-par-img="top"]'), { yPercent: 7 }, { yPercent: -7, ease: 'none', scrollTrigger: scrub });
        gsap.fromTo(q('[data-par-img="bottom"]'), { yPercent: 5 }, { yPercent: -5, ease: 'none', scrollTrigger: scrub });
        // Right stack column drifts slightly against the main photo
        gsap.fromTo(q('[data-stack]'), { y: 30 }, { y: -30, ease: 'none', scrollTrigger: scrub });
        // Leaf art rises gently
        gsap.fromTo(q('[data-leaf-wrap]'), { y: 50 }, { y: -20, ease: 'none', scrollTrigger: scrub });

        /* ---------- 3. Idle motion: leaf sways like a breeze ---------- */
        gsap.to(q('[data-leaf-svg]'), {
          rotation: -2.5,
          transformOrigin: '100% 100%',
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white pt-10 pb-4 sm:pt-12 sm:pb-6 lg:pt-14 lg:pb-6">
      
      {/* Decorative Botanical Leaf Line Art matching screenshot bottom-right corner */}
      <div
        data-leaf-wrap
        className="absolute -right-2 bottom-0 pointer-events-none z-0 hidden md:block select-none"
      >
        <svg
          data-leaf-svg
          width="460"
          height="430"
          viewBox="0 0 460 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          {/* Top Gold Leaf Frond with delicate internal ribs */}
          <path
            d="M460 430 C410 320 370 210 340 140 C360 190 410 260 460 300"
            stroke="#cba372"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Gold Frond Ribs */}
          <path d="M410 340 C385 300 365 250 355 200" stroke="#caa272" strokeWidth="0.85" strokeOpacity="0.8" />
          <path d="M425 365 C400 325 380 275 370 230" stroke="#caa272" strokeWidth="0.85" strokeOpacity="0.8" />
          <path d="M440 390 C420 350 405 310 395 270" stroke="#caa272" strokeWidth="0.85" strokeOpacity="0.8" />

          {/* Middle Gold Leaf Blade arching out */}
          <path
            d="M460 430 C380 340 310 270 240 220 C280 280 360 360 460 430 Z"
            stroke="#caa272"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Middle Leaf Radiating Veins */}
          <path d="M410 390 C365 330 315 280 270 250" stroke="#d5b38a" strokeWidth="0.8" strokeOpacity="0.75" />
          <path d="M380 370 C340 315 295 270 255 240" stroke="#d5b38a" strokeWidth="0.8" strokeOpacity="0.75" />
          <path d="M430 410 C395 360 350 310 310 280" stroke="#d5b38a" strokeWidth="0.8" strokeOpacity="0.75" />

          {/* Center Transition Vein */}
          <path
            d="M460 430 C370 360 270 310 180 280 C230 330 330 390 460 430 Z"
            stroke="#b8aa82"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* Lower Sage Green Leaf Frond sweeping left */}
          <path
            d="M460 430 C350 380 260 340 170 340 C220 385 330 420 460 430 Z"
            stroke="#8ea493"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Sage Green Ribs */}
          <path d="M410 420 C330 385 260 360 200 355" stroke="#9bb3a0" strokeWidth="0.8" strokeOpacity="0.7" />
          <path d="M370 415 C305 385 245 365 190 365" stroke="#9bb3a0" strokeWidth="0.8" strokeOpacity="0.7" />
          <path d="M330 422 C280 400 230 385 185 385" stroke="#9bb3a0" strokeWidth="0.8" strokeOpacity="0.7" />

          {/* Bottom Deep Moss Arc */}
          <path
            d="M460 430 C380 415 300 405 220 410 C270 425 360 430 460 430"
            stroke="#7a9580"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left: 3-Photo Collage with NO border-radius (sharp corners) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-3.5 sm:gap-4.5 items-stretch">

            {/* Main Tall Left Photo */}
            <div data-mask="main" className="group col-span-7 rounded-none overflow-hidden bg-neutral-100">
              <img
                data-par-img="main"
                src={data.image_large || "/img/about.webp"}
                alt="Outdoor Living Lounge with Ocean View"
                className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] object-cover rounded-none transition-[scale] duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right Stack of 2 Photos */}
            <div data-stack className="col-span-5 flex flex-col gap-3.5 sm:gap-4.5 justify-between">
              {/* Top Photo */}
              <div data-mask="top" className="group h-[48.5%] rounded-none overflow-hidden bg-neutral-100">
                <img
                  data-par-img="top"
                  src={data.image_top_right || "/img/about-s1.webp"}
                  alt="Master Suite Bedroom"
                  className="w-full h-full object-cover rounded-none transition-[scale] duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bottom Photo */}
              <div data-mask="bottom" className="group h-[48.5%] rounded-none overflow-hidden bg-neutral-100">
                <img
                  data-par-img="bottom"
                  src={data.image_bottom_right || "/img/about-s2.webp"}
                  alt="Spa Essentials and Flora"
                  className="w-full h-full object-cover rounded-none transition-[scale] duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>

          {/* Right: Text and Button Area */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pl-2 xl:pl-4 relative z-10">

            {/* Eyebrow: ABOUT US —————— */}
            <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
              <span data-eyebrow className="text-[12px] sm:text-[12.5px] font-semibold tracking-[0.22em] text-[#3a4f3c] uppercase">
                {data.eyebrow}
              </span>
              <span data-eyebrow-line className="w-16 sm:w-20 md:w-24 h-[1.5px] bg-[#d7b68b] origin-left" />
            </div>

            {/* Headline: each line inside a mask for slide-up reveal */}
            <h2 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] lg:text-[68px] xl:text-[76px] leading-[1.03] font-normal tracking-[-0.015em] mb-4 sm:mb-5">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="text-[#354e3d] block origin-left">{data.title_line1}</span>
              </span>
              {data.title_line2 && (
                <span className="block overflow-hidden pb-[0.06em]">
                  <span data-line className="text-[#354e3d] block origin-left">{data.title_line2}</span>
                </span>
              )}
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="text-[#be8e52] block origin-left">{data.title_highlight}</span>
              </span>
            </h2>

            {/* Description Paragraph with exact 3-line breakdown from data.json */}
            <p data-desc className="text-[14px] sm:text-[15px] leading-[1.65] text-[#55685a] font-normal mb-7 sm:mb-8 max-w-[480px] whitespace-pre-line">
              {data.description}
            </p>

            {/* Warm Ochre Gold Rectangular Button: DISCOVER MORE —> */}
            {showButton && data.button && (
              <Link
                data-btn
                href={data.button.href || '/about'}
                className="group inline-flex items-center justify-center gap-4 bg-[#cba372] hover:bg-[#b88e5b] text-white px-7 sm:px-8 py-3.5 rounded-none text-[11.5px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase transition-[background-color,box-shadow] duration-300 shadow-sm hover:shadow-md relative z-20 shrink-0"
              >
                <span>{data.button.text || 'DISCOVER MORE'}</span>
                <span data-btn-arrow className="inline-flex">
                  <svg
                    width="24"
                    height="12"
                    viewBox="0 0 24 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 group-hover:translate-x-1.5 transition-[translate] duration-300"
                  >
                    <path
                      d="M0 6H22M22 6L16.5 1M22 6L16.5 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
