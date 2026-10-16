'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  BedDouble,
  Sparkles,
  PenLine,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Check,
  FileText,
  Headphones,
  CalendarCheck,
} from 'lucide-react';
import type { EnquiryNowSectionData } from '../../types';

// Helper to render icon for "How It Works" step
function StepIcon({ name }: { name: string }) {
  const size = 22;
  switch (name.toLowerCase()) {
    case 'file-text':
    case 'document':
      return <FileText size={size} strokeWidth={1.8} />;
    case 'headphones':
    case 'support':
      return <Headphones size={size} strokeWidth={1.8} />;
    case 'mail':
    case 'email':
      return <Mail size={size} strokeWidth={1.8} />;
    case 'calendar-check':
    case 'calendar':
      return <CalendarCheck size={size} strokeWidth={1.8} />;
    default:
      return <Check size={size} strokeWidth={1.8} />;
  }
}

// Custom Luxury Dropdown Component
interface CustomSelectProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function CustomSelect({
  icon,
  placeholder,
  value,
  options,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full relative flex items-center justify-between rounded-[10px] border border-[#ede7dc] bg-white pl-12 pr-4 py-3.5 sm:py-3.5 text-left transition-all duration-200 focus:outline-none focus:border-[#ba8538] focus:ring-2 focus:ring-[#ba8538]/15 cursor-pointer"
      >
        {/* Left Icon */}
        <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
          {icon}
        </div>

        {/* Selected Label or Placeholder */}
        <span
          className={`text-[13.5px] sm:text-[14px] truncate pr-2 ${
            value ? 'text-[#16241b] font-normal' : 'text-[#8e9891]'
          }`}
        >
          {value || placeholder}
        </span>

        {/* Chevron Icon */}
        <ChevronDown
          size={16}
          className={`text-[#8f9b93] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#ba8538]' : ''
          }`}
        />
      </button>

      {/* Floating Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-xl border border-[#ede7dc] bg-white p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.08)] focus:outline-none"
          >
            {options.map((opt) => {
              const isSelected = value === opt;
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13.5px] cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#f8f3ea] text-[#ba8538] font-medium'
                      : 'text-[#16241b] hover:bg-[#faf6ee] hover:text-[#ba8538]'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && (
                    <Check size={14} className="text-[#ba8538] shrink-0 ml-2" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EnquiryNow({ data }: { data: EnquiryNowSectionData }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: '',
    roomType: '',
    specialRequests: '',
    message: '',
  });

  const [checkinFocused, setCheckinFocused] = useState(false);
  const [checkoutFocused, setCheckoutFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push('/thank-you');
    }, 400);
  };

  const steps = data.how_it_works?.steps || [
    {
      title: 'Submit Enquiry',
      description: 'Fill in your travel details in the form.',
      icon: 'file-text',
    },
    {
      title: 'Our Team Reviews',
      description: 'We check availability and suggest the best options.',
      icon: 'headphones',
    },
    {
      title: 'Get a Personalized Plan',
      description: 'Receive a customized recommendation.',
      icon: 'mail',
    },
    {
      title: 'Confirm & Enjoy',
      description: 'Book your stay and create unforgettable memories.',
      icon: 'calendar-check',
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-14 text-[#16241b]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        
        {/* ================= 2-COLUMN MAIN ENQUIRY SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start mb-8 sm:mb-10 lg:mb-12">
          
          {/* LEFT COLUMN: Eyebrow, Heading, Description, Luxury Bedroom Photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#c28b38]" />
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.22em] text-[#ba8538] uppercase">
                {data.eyebrow || 'ENQUIRY NOW'}
              </span>
            </div>

            {/* Heading: Plan Your Perfect Stay */}
            <h2 className="font-serif text-[48px] sm:text-[58px] md:text-[66px] lg:text-[72px] xl:text-[78px] font-normal leading-[1.04] text-[#16241b] tracking-[-0.015em] mb-2.5 sm:mb-3.5">
              {data.title_line1 || 'Plan Your'}{' '}
              <span className="text-[#ba8538] block">
                {data.title_highlight || 'Perfect Stay'}
              </span>
            </h2>

            {/* Description */}
            <p className="text-[14px] sm:text-[14.5px] text-[#616c65] leading-[1.72] mb-4 sm:mb-5 max-w-[520px]">
              {data.description}
            </p>

            {/* Luxury Bedroom Suite Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative w-full h-[260px] sm:h-[320px] md:h-[340px] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-sm border border-[#ede7dc]/70"
            >
              <Image
                src={data.image || '/img/enquire-bedroom.webp'}
                alt={data.image_alt || 'The Valmere Luxury Bedroom Suite'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-[#ede7dc] p-6 sm:p-9 lg:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.025)]">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="w-8 sm:w-10 h-[1.5px] bg-[#c28b38]" />
                <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.22em] text-[#ba8538] uppercase">
                  {data.form.eyebrow || 'SEND US AN ENQUIRY'}
                </span>
              </div>

              {/* Form Grid */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                    <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                      <User size={18} strokeWidth={1.8} />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={data.form.name_placeholder}
                      className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                    <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                      <Mail size={18} strokeWidth={1.8} />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={data.form.email_placeholder}
                      className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number & Check In Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone (Numbers only) */}
                  <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                    <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                      <Phone size={18} strokeWidth={1.8} />
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.phone}
                      onKeyDown={(e) => {
                        if (
                          [
                            'Backspace',
                            'Delete',
                            'Tab',
                            'Escape',
                            'Enter',
                            'ArrowLeft',
                            'ArrowRight',
                            'ArrowUp',
                            'ArrowDown',
                          ].includes(e.key) ||
                          e.ctrlKey ||
                          e.metaKey
                        ) {
                          return;
                        }
                        if (!/^[0-9]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                        setFormData({ ...formData, phone: onlyNums });
                      }}
                      placeholder={data.form.phone_placeholder}
                      className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none"
                    />
                  </div>

                  {/* Check In Date */}
                  <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                    <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                      <Calendar size={18} strokeWidth={1.8} />
                    </div>
                    <input
                      type={checkinFocused || formData.checkin ? 'date' : 'text'}
                      onFocus={() => setCheckinFocused(true)}
                      onBlur={() => setCheckinFocused(false)}
                      value={formData.checkin}
                      onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                      placeholder={data.form.checkin_placeholder}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Row 3: Check Out Date & Number of Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Check Out Date */}
                  <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                    <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                      <Calendar size={18} strokeWidth={1.8} />
                    </div>
                    <input
                      type={checkoutFocused || formData.checkout ? 'date' : 'text'}
                      onFocus={() => setCheckoutFocused(true)}
                      onBlur={() => setCheckoutFocused(false)}
                      value={formData.checkout}
                      onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                      placeholder={data.form.checkout_placeholder}
                      min={formData.checkin || new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none cursor-pointer"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                    <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                      <Users size={18} strokeWidth={1.8} />
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.guests}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setFormData({ ...formData, guests: val });
                      }}
                      onKeyDown={(e) => {
                        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      placeholder={data.form.guests_placeholder}
                      className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Row 4: Custom Luxury Dropdowns (Room Type & Special Requests) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Room Type Dropdown */}
                  <CustomSelect
                    icon={<BedDouble size={18} strokeWidth={1.8} />}
                    placeholder={data.form.room_type_placeholder}
                    value={formData.roomType}
                    options={data.form.room_options}
                    onChange={(val) => setFormData({ ...formData, roomType: val })}
                  />

                  {/* Special Requests Dropdown */}
                  <CustomSelect
                    icon={<Sparkles size={18} strokeWidth={1.8} />}
                    placeholder={data.form.special_requests_placeholder}
                    value={formData.specialRequests}
                    options={data.form.special_request_options}
                    onChange={(val) => setFormData({ ...formData, specialRequests: val })}
                  />
                </div>

                {/* Row 5: Message Textarea */}
                <div className="relative rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                  <div className="absolute left-4 top-4 text-[#8f9b93] pointer-events-none">
                    <PenLine size={18} strokeWidth={1.8} />
                  </div>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={data.form.message_placeholder}
                    className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Row 6: Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full mt-2 py-4 sm:py-4 px-6 rounded-[10px] bg-[#ba8538] hover:bg-[#a6742b] active:bg-[#946522] text-white text-[15px] sm:text-[15.5px] font-medium tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-70 cursor-pointer"
                >
                  <span>{submitting ? 'Submitting...' : data.form.button_text}</span>
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* ================= BOTTOM "HOW IT WORKS" SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pt-5 sm:pt-7 border-t border-[#ede7dc]/60"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#c28b38]" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.22em] text-[#ba8538] uppercase">
              {data.how_it_works?.eyebrow || 'HOW IT WORKS'}
            </span>
          </div>

          {/* 4 Process Steps in a Horizontal Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div key={step.title} className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    {/* Step Icon Circle */}
                    <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#f8f3ea] text-[#ba8538] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 hover:scale-105">
                      <StepIcon name={step.icon} />
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-serif text-[16px] sm:text-[16.5px] text-[#16241b] font-medium leading-snug mb-1 truncate">
                        {step.title}
                      </h4>
                      <p className="text-[12.5px] sm:text-[13px] text-[#616c65] leading-[1.4] line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Chevron separator (between steps on large screen) */}
                  {!isLast && (
                    <ChevronRight
                      size={18}
                      className="text-[#d8cfc1] shrink-0 hidden lg:block mx-1"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
