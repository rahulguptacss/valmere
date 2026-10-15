'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, BedDouble, Users, Maximize2, Eye, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { RoomItem } from '../../types';

export default function RoomDetails({ data }: { data: RoomItem }) {
  const [activeImage, setActiveImage] = useState(data.image_main);
  const images = data.gallery || [data.image_main, data.image_secondary];

  return (
    <section className="bg-[#fcfaf7] py-12 lg:py-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#8c7853] uppercase">
              {data.category}
            </span>
            <span className="w-12 h-[1px] bg-[#c5a059]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[54px] font-normal text-[#243c30] leading-tight">
              {data.title_line1} <span className="italic text-[#c5a059]">{data.title_line2}</span>
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[34px] sm:text-[42px] font-bold text-[#243c30]">{data.price}</span>
              <span className="text-[14px] text-[#6d7971] tracking-wide">/ {data.period || "night"}</span>
            </div>
          </div>
        </div>

        {/* Media & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-neutral-100">
              <img
                src={activeImage}
                alt={data.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img ? 'border-[#c5a059] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specs Bar (Capacity, Size, Bed, View) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-[#e8d8b6]/40 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f3ea] flex items-center justify-center text-[#c5a059]">
                  <Users size={18} />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#8c7853] uppercase tracking-wider">Guests</span>
                  <span className="text-[13.5px] font-bold text-[#243c30]">{data.capacity || "2 Adults"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f3ea] flex items-center justify-center text-[#c5a059]">
                  <Maximize2 size={18} />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#8c7853] uppercase tracking-wider">Size</span>
                  <span className="text-[13.5px] font-bold text-[#243c30]">{data.size || "75 m²"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f3ea] flex items-center justify-center text-[#c5a059]">
                  <BedDouble size={18} />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#8c7853] uppercase tracking-wider">Bed</span>
                  <span className="text-[13.5px] font-bold text-[#243c30]">{data.bed || "1 King Bed"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f3ea] flex items-center justify-center text-[#c5a059]">
                  <Eye size={18} />
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-[#8c7853] uppercase tracking-wider">View</span>
                  <span className="text-[13.5px] font-bold text-[#243c30]">{data.view || "Ocean View"}</span>
                </div>
              </div>
            </div>

            {/* Overview Description */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e8d8b6]/40 shadow-sm space-y-5">
              <h2 className="font-serif text-[28px] font-normal text-[#243c30]">Suite Overview</h2>
              <p className="text-[15px] sm:text-[16px] text-[#556259] leading-[1.8]">
                {data.description}
              </p>
              <p className="text-[15px] sm:text-[16px] text-[#556259] leading-[1.8]">
                Designed in harmony with the natural surroundings of our tropical paradise, each room features locally sourced teak wood, bespoke linen bedding, and seamless indoor-outdoor living spaces that invite the gentle ocean breezes inside.
              </p>
            </div>

            {/* Premium Amenities Checklist */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#e8d8b6]/40 shadow-sm">
              <h3 className="font-serif text-[26px] font-normal text-[#243c30] mb-6">Suite Amenities & Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.amenities || [
                  "Private Balcony with Panoramic Ocean Sunbed",
                  "Marble En-Suite with Rainfall Shower & Soaking Tub",
                  "Complimentary High-Speed Fiber Internet",
                  "24-Hour In-Suite Dining & Chef on Request",
                  "Artisanal Island Breakfast Included",
                  "VIP Island Transfers & Valet Parking",
                  "Evening Turn-Down Ritual with Island Aromatherapy",
                  "Complimentary Yoga Mat & Beach Essentials"
                ]).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[14.5px] text-[#4a554d]">
                    <div className="w-5 h-5 rounded-full bg-[#243c30] flex items-center justify-center text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white p-7 sm:p-8 rounded-[28px] border border-[#c5a059]/40 shadow-xl">
              <span className="block text-[11px] font-bold tracking-[0.25em] text-[#8c7853] uppercase mb-1">
                RESERVE YOUR STAY
              </span>
              <h3 className="font-serif text-[28px] text-[#243c30] font-normal mb-5">
                {data.title}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[12px] font-semibold text-[#6d7971] mb-1.5 uppercase tracking-wider">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-11-01"
                    className="w-full px-4 py-3 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] focus:outline-none focus:border-[#243c30]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#6d7971] mb-1.5 uppercase tracking-wider">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-11-06"
                    className="w-full px-4 py-3 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] focus:outline-none focus:border-[#243c30]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#6d7971] mb-1.5 uppercase tracking-wider">
                    Guests
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] focus:outline-none focus:border-[#243c30] bg-white">
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>3 Adults</option>
                    <option>4 Guests</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-[#e8d8b6]/60 pt-4 mb-6 space-y-2 text-[13.5px] text-[#556259]">
                <div className="flex justify-between">
                  <span>{data.price} x 5 Nights</span>
                  <span className="font-bold text-[#243c30]">$2,400</span>
                </div>
                <div className="flex justify-between">
                  <span>Resort Fee & Island Taxes</span>
                  <span className="font-bold text-[#243c30]">$180</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dashed border-[#e8d8b6] text-[16px] font-bold text-[#243c30]">
                  <span>Total Due</span>
                  <span className="text-[#c5a059]">$2,580</span>
                </div>
              </div>

              <Link
                href={`/reservation?room=${data.slug}`}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#243c30] hover:bg-[#1a2c23] text-white py-4 rounded-full text-[13px] font-bold tracking-[0.16em] uppercase shadow-lg hover:shadow-xl transition-all"
              >
                <span>CONFIRM BOOKING</span>
                <ArrowRight size={15} className="text-[#c5a059]" />
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-[#8c7853]">
                <ShieldCheck size={16} />
                <span>Best Rate Guarantee • Free Cancellation</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
