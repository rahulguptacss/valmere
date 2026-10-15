'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  Waves,
  Bed,
  Sparkles,
  Sun,
  Bath,
  Coffee,
  Leaf,
  ArrowUpDown,
  ShieldCheck,
  Flame,
  Armchair,
  Laptop,
  Users,
  Eye,
  Maximize2,
  Grid,
  BedDouble,
  Phone,
  PhoneCall,
  Mail,
  Headphones,
  ArrowRight,
  Calendar,
  User,
  MessageSquare,
} from 'lucide-react';
import { RoomItem, RoomInfoItem, RoomFeatureCard, RoomAmenityItem, RoomSupportItem } from '../../types';

// Helper to render feature card icons
function renderFeatureIcon(icon: string) {
  const props = { className: 'w-7 h-7 text-[#b98a57]', strokeWidth: 1.5 };
  switch (icon.toLowerCase()) {
    case 'waves':
      return <Waves {...props} />;
    case 'bed':
      return <Bed {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
    case 'sun':
      return <Sun {...props} />;
    case 'bath':
      return <Bath {...props} />;
    case 'coffee':
      return <Coffee {...props} />;
    case 'leaf':
      return <Leaf {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

// Helper to render amenity icons
function renderAmenityIcon(icon: string) {
  const props = { className: 'w-5 h-5 text-[#b98a57]', strokeWidth: 1.6 };
  switch (icon.toLowerCase()) {
    case 'leaf':
      return <Leaf {...props} />;
    case 'arrowupdown':
      return <ArrowUpDown {...props} />;
    case 'shieldcheck':
      return <ShieldCheck {...props} />;
    case 'flame':
      return <Flame {...props} />;
    case 'armchair':
      return <Armchair {...props} />;
    case 'laptop':
      return <Laptop {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

// Helper to render information spec icons
function renderInfoIcon(icon: string) {
  const props = { className: 'w-4 h-4 text-[#b98a57]', strokeWidth: 1.6 };
  switch (icon.toLowerCase()) {
    case 'users':
      return <Users {...props} />;
    case 'eye':
      return <Eye {...props} />;
    case 'maximize2':
      return <Maximize2 {...props} />;
    case 'bed':
      return <Bed {...props} />;
    case 'grid':
      return <Grid {...props} />;
    case 'beddouble':
      return <BedDouble {...props} />;
    case 'bath':
      return <Bath {...props} />;
    case 'mappin':
      return <MapPin {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

// Helper to render support icons
function renderSupportIcon(icon: string) {
  const props = { className: 'w-5 h-5 text-[#b98a57]', strokeWidth: 1.8 };
  switch (icon.toLowerCase()) {
    case 'phone':
    case 'phonecall':
      return <PhoneCall {...props} />;
    case 'mail':
      return <Mail {...props} />;
    case 'headphones':
      return <Headphones {...props} />;
    default:
      return <PhoneCall {...props} />;
  }
}

export default function RoomDetails({ data }: { data: RoomItem }) {
  const gallery = data.gallery && data.gallery.length > 0
    ? data.gallery
    : ['/rooms/1.png', '/img/why-choose-1.jpg', '/rooms/2.png', '/img/testimonials/bedroom-balcony.jpg'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-[#fcfaf7] py-10 sm:py-14 lg:py-18">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Responsive Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* LEFT COLUMN: Gallery, Title, Included, Feature Cards, Amenities */}
          <div className="lg:col-span-8 flex flex-col space-y-7 sm:space-y-9">
            
            {/* 1. Main Stage Image with Prev / Next Arrow Overlay */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.8] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-neutral-100 shadow-[0_16px_45px_-15px_rgba(31,52,39,0.18)]">
              <Image
                src={gallery[activeImageIndex]}
                alt={data.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-all duration-500"
              />

              {/* Prev Button Overlay */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#b98a57] hover:bg-[#a67946] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
              </button>

              {/* Next Button Overlay */}
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#b98a57] hover:bg-[#a67946] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
              </button>
            </div>

            {/* 2. Four Thumbnails Row */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {gallery.slice(0, 4).map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View photo ${idx + 1}`}
                    className={`relative aspect-[4/3] rounded-[14px] sm:rounded-[18px] overflow-hidden border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-[#b98a57] ring-2 ring-[#b98a57]/30 scale-[1.02] shadow-md'
                        : 'border-transparent opacity-85 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${data.title} photo ${idx + 1}`}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>



            {/* 4. Room Title & Location */}
            <div className="pt-2">
              <h1 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] font-normal text-[#1f3d33] leading-tight tracking-[-0.01em]">
                {data.title}
              </h1>
              <div className="flex items-center gap-1.5 text-[13.5px] sm:text-[14px] text-[#6d7871] font-normal mt-2 mb-4">
                <MapPin className="w-4 h-4 text-[#b98a57] shrink-0" strokeWidth={1.8} />
                <span>{data.location || 'Maldives, Indian Ocean'}</span>
              </div>
              <p className="text-[13.5px] sm:text-[14.5px] leading-[1.75] text-[#556259] font-normal">
                {data.description}
              </p>
            </div>

            {/* 5. What's Included in This Room? */}
            <div className="pt-2 border-t border-[#eee5d6]/70">
              <h2 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#1f3d33] mb-4.5">
                What&apos;s Included in This Room?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {(data.included || [
                  'King-size bed with premium linens',
                  'Air-conditioning and heating',
                  'High-speed WiFi',
                  'Daily housekeeping service',
                  'Private balcony with ocean view',
                  'Complimentary breakfast',
                  'Smart TV with streaming channels',
                  'In-room safe',
                  'Mini bar',
                  'Luxurious bathroom with rain shower',
                  '24/7 room service',
                  'Concierge assistance',
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] text-[#47524b] py-2.5 border-b border-[#eee4d6]/60">
                    <span className="w-[18px] h-[18px] rounded-full bg-[#c99a5e] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                    <span className="font-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Feature Cards Grid (2 per row on mobile, 3 per row on desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-4 pt-2">
              {(data.features_grid || [
                { title: 'Ocean View', description: 'Breathtaking sea views from your private balcony', icon: 'Waves' },
                { title: 'Spacious Room', description: 'Generous living space with modern interiors', icon: 'Bed' },
                { title: 'Premium Bedding', description: 'Ultra-comfortable beds & pillows', icon: 'Sparkles' },
                { title: 'Private Balcony', description: 'Relax with panoramic ocean views', icon: 'Sun' },
                { title: 'Luxury Bathroom', description: 'Rain shower & premium toiletries', icon: 'Bath' },
                { title: 'Complimentary Breakfast', description: 'Start your day with delicious meals', icon: 'Coffee' },
              ]).map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf6ee] rounded-[16px] sm:rounded-[20px] p-3 sm:p-5 text-center flex flex-col items-center justify-center border border-[#eee4d6] transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_16px_-6px_rgba(31,52,39,0.04)]"
                >
                  <div className="mb-1.5 sm:mb-2">
                    {renderFeatureIcon(card.icon)}
                  </div>
                  <h3 className="font-serif text-[14.5px] sm:text-[17px] font-medium text-[#1f3d33] mb-1 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-[12.5px] text-[#717c75] leading-snug">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 7. Room Amenities Section (2 Columns with outline icons) */}
            <div className="pt-3 border-t border-[#eee5d6]/70">
              <h2 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#1f3d33] mb-5">
                Room Amenities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {(data.amenities || [
                  { label: '100% Eco Friendly', icon: 'Leaf' },
                  { label: '24/7 Elevator Services', icon: 'ArrowUpDown' },
                  { label: '24/7 Security', icon: 'ShieldCheck' },
                  { label: 'Fireplace For Atmosphere', icon: 'Flame' },
                  { label: 'Comfortable Seating', icon: 'Armchair' },
                  { label: 'Work Desk', icon: 'Laptop' },
                ]).map((amenity, idx) => {
                  const label = typeof amenity === 'string' ? amenity : amenity.label;
                  const icon = typeof amenity === 'string' ? 'Sparkles' : amenity.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-[13.5px] sm:text-[14px] text-[#424e47]">
                      <span className="shrink-0">{renderAmenityIcon(icon)}</span>
                      <span className="font-normal">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (SIDEBAR): Room Info, Photo, Send Enquiry Form, Need Help */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col space-y-6 sm:space-y-7">
            
            {/* 1. Room Information Card */}
            <div className="bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 border border-[#eee4d6] shadow-[0_10px_35px_-15px_rgba(31,52,39,0.06)]">
              <h3 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#1f3d33] mb-4">
                Room Information
              </h3>

              <div className="divide-y divide-[#f4eee4]">
                {(data.information || [
                  { label: 'Guests', value: '4 (2 Adults + 2 Children)', icon: 'Users' },
                  { label: 'View', value: 'Ocean View', icon: 'Eye' },
                  { label: 'Size', value: '850 ft²', icon: 'Maximize2' },
                  { label: 'Bed Type', value: 'King Bed', icon: 'Bed' },
                  { label: 'Category', value: 'Suite', icon: 'Grid' },
                  { label: 'Bedrooms', value: '2', icon: 'BedDouble' },
                  { label: 'Bathrooms', value: '2', icon: 'Bath' },
                  { label: 'Location', value: data.location || 'Maldives, Indian Ocean', icon: 'MapPin' },
                ]).map((item: RoomInfoItem, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 py-2.5 sm:py-3">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f6f0e4] text-[#b98a57] flex items-center justify-center shrink-0">
                      {renderInfoIcon(item.icon)}
                    </span>
                    <div className="flex-1 flex items-baseline justify-between gap-2 text-[13px] sm:text-[13.5px]">
                      <span className="font-semibold text-[#1f3d33]">{item.label}:</span>
                      <span className="text-[#59655e] text-right font-normal">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Middle Visual Photo */}
            <div className="relative w-full aspect-[4/3] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-md">
              <Image
                src={data.sidebar_image || '/rooms/1.png'}
                alt={`${data.title} terrace view`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* 3. Send Us an Enquiry Card (Dark Green) */}
            <div className="bg-[#17372b] rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 text-white shadow-xl">
              <h3 className="font-serif text-[24px] font-normal text-white mb-4">
                Send Us an Enquiry
              </h3>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#c5a059] text-white flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-serif text-[18px] text-white">Thank You!</h4>
                  <p className="text-[12.5px] text-white/80 mt-1">Your enquiry has been received. Our concierge will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9990] pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full bg-white text-[#1f3d33] placeholder-[#809087] rounded-md pl-10 pr-3.5 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9990] pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      className="w-full bg-white text-[#1f3d33] placeholder-[#809087] rounded-md pl-10 pr-3.5 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9990] pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full bg-white text-[#1f3d33] placeholder-[#809087] rounded-md pl-10 pr-3.5 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9990] pointer-events-none" />
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                      placeholder="Check In Date"
                      className="w-full bg-white text-[#1f3d33] placeholder-[#809087] rounded-md pl-10 pr-3.5 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9990] pointer-events-none" />
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                      placeholder="Check Out Date"
                      className="w-full bg-white text-[#1f3d33] placeholder-[#809087] rounded-md pl-10 pr-3.5 py-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8a9990] pointer-events-none" />
                    <textarea
                      rows={3}
                      placeholder="Your Message"
                      className="w-full bg-white text-[#1f3d33] placeholder-[#809087] rounded-md pl-10 pr-3.5 py-2.5 text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3.5 relative py-3.5 px-6 rounded-full bg-[#c59a58] hover:bg-[#b38848] text-white font-medium text-[13px] uppercase tracking-[0.12em] flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-98"
                  >
                    <span>SEND ENQUIRY</span>
                    <span className="absolute right-3 w-7 h-7 rounded-full bg-white text-[#c59a58] flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.4} />
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* 4. Need Help? Card matching user's uploaded screenshot */}
            <div className="bg-[#faf6ee] rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 border border-[#ede3d3]/80 shadow-[0_4px_20px_-8px_rgba(31,52,39,0.05)]">
              <h3 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#17372b]">
                {data.need_help?.title || 'Need Help?'}
              </h3>
              
              {/* Gold accent line matching screenshot */}
              <div className="w-10 h-[2.5px] bg-[#c5a059] mt-2 mb-5 rounded-full" />

              <div className="flex flex-col">
                {(data.need_help?.support || [
                  { label: 'Customer Support', value: '+960 1234 5678', href: 'tel:+96012345678', icon: 'PhoneCall' },
                  { label: 'Email Us', value: 'info@thevalmere.com', href: 'mailto:info@thevalmere.com', icon: 'Mail' },
                  { label: 'Live Support', value: '24/7 Assistance', icon: 'Headphones' },
                ]).map((sup: RoomSupportItem, idx: number, arr: RoomSupportItem[]) => {
                  const content = (
                    <div className="flex items-center gap-3.5 group cursor-pointer">
                      <span className="w-12 h-12 rounded-full bg-[#f4ebdc] text-[#b98a57] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                        {renderSupportIcon(sup.icon)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-normal text-[#6b7770]">
                          {sup.label}
                        </span>
                        <span className="text-[15px] sm:text-[16px] font-bold text-[#17372b] tracking-tight group-hover:text-[#b98a57] transition-colors leading-tight mt-0.5">
                          {sup.value}
                        </span>
                      </div>
                    </div>
                  );

                  return (
                    <React.Fragment key={idx}>
                      {sup.href ? (
                        <a href={sup.href} className="block">
                          {content}
                        </a>
                      ) : (
                        <div>{content}</div>
                      )}
                      {idx < arr.length - 1 && (
                        <div className="w-full h-px bg-[#eee3d1] my-3.5" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
