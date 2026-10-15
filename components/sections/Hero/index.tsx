'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HeroSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero({ data }: { data: HeroSectionData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleLine3Ref = useRef<HTMLSpanElement>(null);
  const rotatingBadgeRef = useRef<HTMLSpanElement>(null);
  const beachBadgeRef = useRef<HTMLDivElement>(null);
  const mainCircleRef = useRef<HTMLDivElement>(null);
  const goldArcRef = useRef<HTMLDivElement>(null);
  const greenDotRef = useRef<HTMLDivElement>(null);
  const rightSliceRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const beachScrollRef = useRef<HTMLDivElement>(null);
  const beachImgRef = useRef<HTMLImageElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useGSAP(
    () => {
      // 1. Entrance Master Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Eyebrow Entrance
      if (eyebrowRef.current) {
        tl.from(eyebrowRef.current, {
          x: -25,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      }

      // Staggered Title Lines
      const titleLines = [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current].filter(Boolean);
      if (titleLines.length) {
        tl.from(
          titleLines,
          {
            y: 45,
            opacity: 0,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power4.out',
          },
          '-=0.6'
        );
      }

      // Gold Rotating Badge Pop
      if (rotatingBadgeRef.current) {
        tl.from(
          rotatingBadgeRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.8)',
          },
          '-=0.8'
        );

        // Infinite 360 smooth spin with GSAP
        gsap.to(rotatingBadgeRef.current, {
          rotation: 360,
          repeat: -1,
          ease: 'none',
          duration: 25,
        });
      }

      // Beach Thumbnail Badge Entrance
      if (beachBadgeRef.current) {
        tl.from(
          beachBadgeRef.current,
          {
            scale: 0.7,
            opacity: 0,
            y: 20,
            duration: 0.9,
            ease: 'back.out(1.5)',
          },
          '-=0.7'
        );
      }

      // Center Bedroom Circle Entrance
      if (mainCircleRef.current) {
        tl.from(
          mainCircleRef.current,
          {
            scale: 0.86,
            opacity: 0,
            duration: 1.3,
            ease: 'power3.out',
          },
          '-=1.2'
        );
      }

      // Outer Concentric Gold Arc
      if (goldArcRef.current) {
        tl.from(
          goldArcRef.current,
          {
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1.1'
        );
      }

      // Green Dot Badge Entrance + Infinite Floating Bob
      if (greenDotRef.current) {
        tl.from(
          greenDotRef.current,
          {
            scale: 0,
            y: -15,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(2)',
          },
          '-=0.9'
        );

        gsap.to(greenDotRef.current, {
          y: -6,
          repeat: -1,
          yoyo: true,
          duration: 2.4,
          ease: 'sine.inOut',
        });
      }

      // Right Arch Terrace Slice Entrance
      if (rightSliceRef.current) {
        tl.from(
          rightSliceRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 1.3,
            ease: 'power3.out',
          },
          '-=1.2'
        );
      }

      const mm = gsap.matchMedia();

      // 2. Subtle scroll animation on the small bottom-left circle image
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollCfg = {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        };
        if (beachScrollRef.current) {
          gsap.to(beachScrollRef.current, { y: -40, ease: 'none', scrollTrigger: scrollCfg });
        }
        if (beachImgRef.current) {
          gsap.fromTo(
            beachImgRef.current,
            { rotation: 0, scale: 1 },
            { rotation: 35, scale: 1.12, ease: 'none', scrollTrigger: scrollCfg }
          );
        }
      });

      // 3. 3D magnetic effect on the right arch image (desktop + mouse only)
      mm.add('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const el = magnetRef.current;
        if (!el) return;

        gsap.set(el, { transformPerspective: 900, transformOrigin: 'center center' });

        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
        const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const sTo = gsap.quickTo(el, 'scale', { duration: 0.6, ease: 'power3.out' });

        let active = false;

        const onMove = (e: MouseEvent) => {
          const rect = (el.parentElement ?? el).getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          // Magnetic range: a radius around the image bigger than the image itself
          const range = Math.max(rect.width, rect.height) * 0.85;
          const dist = Math.hypot(dx, dy);

          if (dist < range) {
            active = true;
            const nx = dx / range; // -1 → 1
            const ny = dy / range;
            xTo(dx * 0.22);
            yTo(dy * 0.12);
            ryTo(nx * 18);
            rxTo(-ny * 12);
            sTo(1.03);
          } else if (active) {
            active = false;
            gsap.to(el, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 1.2,
              ease: 'elastic.out(1, 0.45)',
              overwrite: 'auto',
            });
          }
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      });
    },
    { scope: containerRef }
  );

  // Subtle Interactive Mouse Parallax on Desktop (center circle only; right image is magnetic)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rightColumnRef.current || window.innerWidth < 1024) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const xPos = (clientX - rect.left) / rect.width - 0.5;
    const yPos = (clientY - rect.top) / rect.height - 0.5;

    gsap.to(mainCircleRef.current, {
      x: xPos * -15,
      y: yPos * -12,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!mainCircleRef.current) return;
    gsap.to(mainCircleRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-white pt-8 pb-6 sm:pb-8 lg:pt-14 lg:pb-8"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Story */}
          <div className="lg:col-span-5 relative z-10">
            {/* Eyebrow: LUXURY GETAWAYS — */}
            <div ref={eyebrowRef} className="flex items-center gap-3.5 mb-5 sm:mb-6">
              <span className="text-[13px] sm:text-[13px] lg:text-[13px] xl:text-[14px] font-medium tracking-[0.26em] text-[#28392f] uppercase">
                {data.eyebrow || 'LUXURY GETAWAYS'}
              </span>
              <span className="w-14 sm:w-16 h-[1px] bg-[#9ca89e]" />
            </div>

            {/* Main Headline: Where (o) \n Every Stay \n Feels Exceptional. */}
            <div className="relative">
              <h1 className="font-serif text-[clamp(36px,10.5vw,46px)] sm:text-[50px] md:text-[54px] lg:text-[56px] xl:text-[64px] 2xl:text-[70px] leading-[1.12] font-normal text-[#1f3427] tracking-[-0.01em]">
                {/* Line 1: Where + Rotating Gold Circle Badge */}
                <span ref={titleLine1Ref} className="inline-flex items-center gap-3 sm:gap-4">
                  <span>{data.title_line1 || 'Where'}</span>
                  <span
                    ref={rotatingBadgeRef}
                    className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full border border-[#c5a059] shrink-0"
                  >
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#c5a059]" />
                  </span>
                </span>
                <br />
                {/* Line 2: Every Stay */}
                <span ref={titleLine2Ref} className="inline-block">
                  {data.title_line2 || 'Every Stay'}
                </span>
                <br />
                {/* Line 3: Feels Exceptional. */}
                <span ref={titleLine3Ref} className="whitespace-nowrap inline-block">
                  Feels{' '}
                  <span className="font-serif italic font-normal text-[#c5a059]">
                    {data.title_highlight || 'Exceptional.'}
                  </span>
                </span>
              </h1>
            </div>

            {/* Bottom Left: Circular Beach Thumbnail with Gold Ring */}
            <div
              ref={beachBadgeRef}
              className="mt-8 sm:mt-12 inline-block"
            >
              <div ref={beachScrollRef} className="will-change-transform">
                <div className="p-1 rounded-full border border-[#c5a059] shadow-md hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-neutral-100">
                    <img
                      ref={beachImgRef}
                      src={data.image_circle || '/img/luxury-travel-hero-1.png'}
                      alt="Resort View"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scaled Down Center Circle + Arc + Dot + Arch Slice with Parallax */}
          <div ref={rightColumnRef} className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            <div className="relative flex items-center justify-end gap-3 sm:gap-4 max-w-[600px] sm:max-w-[660px] xl:max-w-[700px] w-full">
              
              {/* Center Circle Wrapper with Arc and Dot */}
              <div className="relative w-[63%] sm:w-[64%] aspect-square shrink-0">
                {/* Outer Decorative Concentric Gold Arc on Top-Right */}
                <div
                  ref={goldArcRef}
                  className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 w-[110%] h-[110%] rounded-full border border-[#c5a059]/40 pointer-events-none hidden sm:block"
                />

                {/* Sage Green Dot on Arc */}
                <div
                  ref={greenDotRef}
                  className="absolute top-3 -right-1 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#5b7159] hidden sm:block"
                />

                {/* Circular Photo with GSAP Reference */}
                <div
                  ref={mainCircleRef}
                  className="w-full h-full rounded-full overflow-hidden relative z-10"
                >
                  <img
                    src={data.image_main || '/img/luxury-travel-hero-2.png'}
                    alt="Luxury Oceanfront Suite Bedroom"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </div>

              {/* Right Arch Slice with GSAP Reference */}
              <div
                ref={rightSliceRef}
                className="relative w-[31%] sm:w-[31%] aspect-[256/564] shrink-0 z-10"
              >
                {/* Magnetic 3D layer (separate from entrance tween) */}
                <div ref={magnetRef} className="w-full h-full will-change-transform [transform-style:preserve-3d]">
                  <img
                    src={data.image_side || '/img/luxury-travel-hero-3.png'}
                    alt="Outdoor Scenic Terrace Overlooking Sea"
                    className="w-full h-full object-contain object-left-top drop-shadow-[0_18px_25px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
