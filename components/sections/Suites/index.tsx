'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Car, Compass, Waves, Wifi, Leaf } from 'lucide-react';
import { SuiteSectionData, SuiteFeature } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Map feature icon name from data.json to an icon
function SuiteFeatureIcon({ name }: { name: string }) {
  const props = { size: 10, strokeWidth: 2.4, className: 'text-white' };
  switch (name.toLowerCase()) {
    case 'car':
      return <Car {...props} />;
    case 'compass':
      return <Compass {...props} />;
    case 'waves':
      return <Waves {...props} />;
    case 'wifi':
      return <Wifi {...props} />;
    default:
      return <Leaf {...props} />;
  }
}

// `reverse` mirrors the layout (content left, photos right) — default stays as before
export default function Suites({ data, reverse = false }: { data: SuiteSectionData; reverse?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animations only when the user has not asked for reduced motion
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(containerRef);

        /* ---------- 1. Entrance timeline (plays once when section enters view) ---------- */
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        });

        tl
          // Stone panel rises from the bottom
          .fromTo(
            q('[data-panel]'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut', clearProps: 'clipPath' }
          )
          // Watermark outline draws (from the panel side)
          .fromTo(
            q('[data-watermark]'),
            { clipPath: reverse ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power2.inOut', clearProps: 'clipPath' },
            '-=0.6'
          )
          // Main image curtain reveal + inner zoom-out
          .fromTo(
            q('[data-main-mask]'),
            { clipPath: reverse ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', clearProps: 'clipPath' },
            '-=1.2'
          )
          .fromTo(
            q('[data-main-img]'),
            { scale: 1.25 },
            { scale: 1, duration: 1.6, ease: 'power2.out', clearProps: 'transform' },
            '<'
          )
          // Secondary framed image slides in from bottom-right
          .fromTo(
            q('[data-sec-reveal]'),
            { x: reverse ? -40 : 40, y: 50, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' },
            '-=0.7'
          )
          // Eyebrow text + gold line
          .fromTo(
            q('[data-eyebrow]'),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform,opacity' },
            '-=1.1'
          )
          .fromTo(
            q('[data-eyebrow-line]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'power2.inOut', clearProps: 'transform' },
            '<0.15'
          )
          // Headline words slide up from inside their masks
          .fromTo(
            q('[data-headline-word]'),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out', clearProps: 'transform' },
            '-=0.5'
          )
          // Features stagger + icon pop
          .fromTo(
            q('[data-feature]'),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity' },
            '-=0.5'
          )
          .fromTo(
            q('[data-feature-icon]'),
            { scale: 0 },
            { scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2.5)', clearProps: 'transform' },
            '<0.1'
          )
          // Description + button
          .fromTo(
            q('[data-desc]'),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform,opacity' },
            '-=0.4'
          )
          .fromTo(
            q('[data-btn]'),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform,opacity' },
            '-=0.5'
          )
          // Arrow nudges once to draw attention
          .to(q('[data-btn-arrow]'), {
            x: 6,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
            clearProps: 'transform',
          });

        /* ---------- 2. Scroll-linked parallax (scrubbed while scrolling) ---------- */
        const scrub = {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        };

        // Watermark drifts horizontally
        gsap.fromTo(
          q('[data-watermark-par]'),
          { xPercent: reverse ? -6 : 6 },
          { xPercent: reverse ? 8 : -8, ease: 'none', scrollTrigger: scrub }
        );
        // Main image moves up slightly, secondary moves down → depth
        gsap.fromTo(q('[data-main-par]'), { y: 30 }, { y: -30, ease: 'none', scrollTrigger: scrub });
        gsap.fromTo(q('[data-sec-par]'), { y: -20 }, { y: 45, ease: 'none', scrollTrigger: scrub });
        // Panel drifts very gently
        gsap.fromTo(q('[data-panel-par]'), { y: 15 }, { y: -15, ease: 'none', scrollTrigger: scrub });
      });
    },
    { scope: containerRef, dependencies: [reverse] }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 ${reverse ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]'} gap-10 lg:gap-10 xl:gap-12 items-center`}
        >

          {/* ================= PHOTOS: Panel + Watermark + 2 Photos (right side when reversed) ================= */}
          <div className={`relative w-full aspect-[467/480] ${reverse ? 'lg:order-2' : ''}`}>

            {/* Warm limestone panel (full height, ~70% width) */}
            <div data-panel-par className={`absolute ${reverse ? 'right-0' : 'left-0'} top-0 h-full w-[70%] z-0`}>
              <div
                data-panel
                className="w-full h-full"
                style={{
                  backgroundColor: '#efe8dc',
                  backgroundImage:
                    'radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.55) 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(214,199,176,0.35) 0%, transparent 55%), linear-gradient(160deg, rgba(255,255,255,0.25) 0%, rgba(230,220,204,0.3) 100%)',
                }}
              />
            </div>

            {/* Giant outline watermark: LUXURY HOTEL (overflows into the content column) */}
            <div
              data-watermark-par
              className={`absolute z-[1] ${reverse ? 'right-[26%]' : 'left-[26%]'} top-[1%] pointer-events-none select-none`}
            >
              <span
                aria-hidden="true"
                data-watermark
                className="block font-serif font-normal uppercase whitespace-nowrap leading-none tracking-[0.04em] text-transparent text-[clamp(34px,7.2vw,104px)]"
                style={{ WebkitTextStroke: '1px rgba(190, 150, 104, 0.45)' }}
              >
                {data.watermark}
              </span>
            </div>

            {/* Main photo – no radius */}
            <div
              data-main-par
              className={`absolute z-[2] ${reverse ? 'right-[16.5%]' : 'left-[16.5%]'} top-[16.7%] w-[66%] h-[58.2%]`}
            >
              <div data-main-mask className="group w-full h-full overflow-hidden">
                <div className="w-full h-full transition-transform duration-[900ms] ease-out group-hover:scale-105">
                  <img
                    data-main-img
                    src={data.image_main}
                    alt={`${data.title_line1} ${data.title_line2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Secondary photo – white frame, shadow, no radius */}
            <div
              data-sec-par
              className={`absolute z-[3] ${reverse ? 'right-[46%]' : 'left-[46%]'} top-[62.5%] w-[46%] h-[33.7%]`}
            >
              <div
                data-sec-reveal
                className="w-full h-full bg-white p-[5px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 transition-[translate,box-shadow] duration-500"
              >
                <img
                  src={data.image_secondary}
                  alt={`${data.title_line1} ${data.title_line2} view`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ================= CONTENT (left side when reversed) ================= */}
          <div className={`relative z-[4] flex flex-col items-start ${reverse ? 'lg:order-1 lg:pl-[6%]' : ''}`}>

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-4 sm:mb-5">
              <span data-eyebrow className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.3em] text-[#3a4f3c] uppercase">
                {data.eyebrow}
              </span>
              <span data-eyebrow-line className="w-[60px] sm:w-[76px] h-px bg-[#c9a57a] origin-left" />
            </div>

            {/* Headline – each part inside a mask for slide-up reveal */}
            <h2 className="font-serif font-normal leading-[1.1] tracking-[-0.01em] text-[34px] sm:text-[42px] lg:text-[44px] xl:text-[54px] lg:whitespace-nowrap mb-7 sm:mb-9">
              <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                <span data-headline-word className="inline-block text-[#2f4a3a]">{data.title_line1}</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                <span data-headline-word className="inline-block text-[#b98a57]">{data.title_line2}</span>
              </span>
            </h2>

            {/* Features 2x2 */}
            <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-4 mb-7 sm:mb-8">
              {data.features.map((item: SuiteFeature, idx: number) => (
                <div key={idx} data-feature className="flex items-center gap-2.5">
                  <span data-feature-icon className="w-[18px] h-[18px] rounded-full bg-[#c49a68] flex items-center justify-center shrink-0">
                    <SuiteFeatureIcon name={item.icon} />
                  </span>
                  <span className="text-[13px] sm:text-[13.5px] text-[#4d5550] whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p data-desc className="text-[13.5px] sm:text-[14px] leading-[1.75] text-[#5b6560] max-w-[400px] mb-8 sm:mb-9">
              {data.description}
            </p>

            {/* Button */}
            <Link
              data-btn
              href={data.button.href}
              className="group inline-flex items-center justify-center gap-4 bg-[#c49a68] hover:bg-[#b0855a] text-white min-w-[183px] h-[43px] px-8 rounded-none text-[11.5px] sm:text-[12px] font-medium tracking-[0.18em] uppercase transition-colors duration-300"
            >
              <span>{data.button.text}</span>
              <span data-btn-arrow className="inline-flex">
                <svg
                  width="22"
                  height="10"
                  viewBox="0 0 22 10"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  <path d="M0 5H20M20 5L16 1M20 5L16 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
