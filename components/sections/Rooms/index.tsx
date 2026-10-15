'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Compass, Waves, Wifi, CheckCircle2 } from 'lucide-react';
import { RoomsSectionData, RoomItem } from '../../types';

// Map icon string to Lucide icon component
function FeatureIcon({ name }: { name: string }) {
  const iconClass = "w-4 h-4 text-[#c5a059]";
  switch (name.toLowerCase()) {
    case 'car':
      return <Car className={iconClass} />;
    case 'compass':
      return <Compass className={iconClass} />;
    case 'waves':
      return <Waves className={iconClass} />;
    case 'wifi':
      return <Wifi className={iconClass} />;
    default:
      return <CheckCircle2 className={iconClass} />;
  }
}

export default function Rooms({ data, limit }: { data: RoomsSectionData; limit?: number }) {
  const items = limit ? data.items.slice(0, limit) : data.items;

  return (
    <section className="relative overflow-hidden bg-[#fcfaf7] py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
        
        {items.map((room: RoomItem, index: number) => {
          const isEven = index % 2 === 1;

          return (
            <div key={room.id || room.slug} className="relative">
              {/* Giant Watermark Outline Typography matching screenshot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden w-full text-center">
                <span
                  className="font-serif text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-black uppercase tracking-[0.1em] text-transparent"
                  style={{
                    WebkitTextStroke: '1px rgba(197, 160, 89, 0.22)',
                    opacity: 0.85,
                  }}
                >
                  {room.watermark || "LUXURY HOTEL"}
                </span>
              </div>

              {/* Suite Showcase Grid */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Visual Images (Overlapping 2 Cards) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.85 }}
                  className={`lg:col-span-7 relative ${
                    isEven ? 'lg:order-2 flex justify-end' : 'lg:order-1'
                  }`}
                >
                  <div className="relative w-full max-w-[580px] pb-12 sm:pb-16">
                    {/* Primary Large Image */}
                    <div className="w-[82%] sm:w-[80%] aspect-[4/3] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl border-4 border-white bg-neutral-100">
                      <img
                        src={room.image_main}
                        alt={room.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Secondary Overlapping Image */}
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute bottom-0 w-[55%] sm:w-[50%] aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border-4 border-white bg-neutral-100 ${
                        isEven ? 'left-0 sm:left-4' : 'right-0 sm:right-4'
                      }`}
                    >
                      <img
                        src={room.image_secondary}
                        alt={`${room.title} angle view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.85 }}
                  className={`lg:col-span-5 flex flex-col items-start ${
                    isEven ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
                  }`}
                >
                  {/* Category Eyebrow with gold line */}
                  <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.28em] text-[#8c7853] uppercase">
                      {room.category || "ROOMS & SUITES"}
                    </span>
                    <span className="w-14 h-[1.5px] bg-[#c5a059]" />
                  </div>

                  {/* Headline */}
                  <h3 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] leading-[1.1] font-normal text-[#243c30] mb-6">
                    <span>{room.title_line1} </span>
                    <span className="italic text-[#c5a059]">{room.title_line2}</span>
                  </h3>

                  {/* 4 Feature Badges (2-column layout matching screenshot) */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 w-full max-w-md mb-6">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full border border-[#c5a059] flex items-center justify-center shrink-0 bg-white shadow-sm">
                          <FeatureIcon name={feature.icon} />
                        </div>
                        <span className="text-[12.5px] sm:text-[13px] font-medium text-[#4a554d] tracking-wide">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-[14px] sm:text-[15px] leading-[1.8] text-[#556259] font-normal mb-8 max-w-lg">
                    {room.description}
                  </p>

                  {/* Reserve Action Button */}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="inline-flex items-center gap-3 bg-[#c5a059] hover:bg-[#b08b47] text-white px-8 py-3.5 rounded-full text-[12px] font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#c5a059]/25 hover:scale-[1.02] active:scale-95"
                  >
                    <span>{room.button?.text || "RESERVE NOW"}</span>
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
