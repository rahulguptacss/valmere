'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { RoomsSectionData, RoomItem } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Rooms({
  data,
  limit,
}: {
  data: RoomsSectionData;
  limit?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const items = limit ? data.items.slice(0, limit) : data.items;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(containerRef);

        gsap.fromTo(
          q('[data-room-card]'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
            clearProps: 'transform,opacity',
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#fdfcf9] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* 2-Column Luxury Rooms Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:gap-x-12 lg:gap-y-14">
          {items.map((room: RoomItem, index: number) => {
            const imageSrc = room.image || room.image_main || (index % 2 === 0 ? '/rooms/1.webp' : '/rooms/2.webp');
            const href = room.href || `/rooms/${room.slug || 'ocean-view-suite'}`;
            const ratingCount = room.rating || 5;

            return (
              <div
                key={room.id || index}
                data-room-card
                className="group flex flex-col"
              >
                {/* Room Image Container with slightly reduced height (aspect 16/9) */}
                <Link
                  href={href}
                  className="relative w-full aspect-[16/9] sm:aspect-[16/9.2] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-neutral-100 mb-4 sm:mb-4.5 shadow-[0_12px_36px_-12px_rgba(31,52,39,0.14)] block"
                >
                  <Image
                    src={imageSrc}
                    alt={room.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Room Title */}
                <h3 className="font-serif text-[26px] sm:text-[28px] lg:text-[31px] font-normal text-[#1f3d33] leading-snug tracking-[-0.01em]">
                  <Link
                    href={href}
                    className="transition-colors duration-300 group-hover:text-[#b98a57]"
                  >
                    {room.title}
                  </Link>
                </h3>

                {/* Location with Pin Icon */}
                <div className="flex items-center gap-1.5 text-[13px] sm:text-[13.5px] text-[#6d7871] font-normal mt-1.5 mb-2.5 sm:mb-3">
                  <MapPin className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] text-[#b98a57] shrink-0" strokeWidth={1.8} />
                  <span>{room.location || 'Maldives, Indian Ocean'}</span>
                </div>

                {/* Horizontal Divider Line matching screenshot */}
                <div className="w-full h-px bg-[#e7ded0] mb-3 sm:mb-3.5" />

                {/* Bottom Row: Stars + Reviews on Left, View Details on Right */}
                <div className="flex items-center justify-between pt-0.5">
                  {/* Rating Stars + Reviews Count */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-[#b98a57]" aria-label={`${ratingCount} out of 5 stars`}>
                      {[...Array(ratingCount)].map((_, starI) => (
                        <span key={starI} className="text-[13.5px] sm:text-[14.5px] leading-none">★</span>
                      ))}
                    </div>
                    <span className="text-[12.5px] sm:text-[13px] text-[#616c65] font-normal ml-0.5">
                      {room.reviews || '3 Reviews'}
                    </span>
                  </div>

                  {/* View Details Action with Circular Bronze Arrow Button */}
                  <Link
                    href={href}
                    className="group/btn inline-flex items-center gap-2.5 sm:gap-3 text-[#1f3d33] transition-colors duration-300"
                  >
                    <span className="font-serif text-[14.5px] sm:text-[15.5px] text-[#1f3d33] transition-colors duration-300 group-hover/btn:text-[#b98a57]">
                      View Details
                    </span>
                    <span className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] rounded-full bg-[#b98a57] text-white flex items-center justify-center transition-all duration-300 group-hover/btn:scale-105 group-hover/btn:bg-[#a67946] shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={1.8} />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
