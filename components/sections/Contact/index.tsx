'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  User,
  LayoutGrid,
  PenLine,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from 'react-icons/fa';
import { ContactSectionData } from '../../types';

function SocialIcon({ name }: { name: string }) {
  const size = 13;
  switch (name.toLowerCase()) {
    case 'facebook':
      return <FaFacebookF size={size} />;
    case 'instagram':
      return <FaInstagram size={size} />;
    case 'twitter':
      return <FaTwitter size={size} />;
    case 'pinterest':
      return <FaPinterestP size={size} />;
    default:
      return <Share2 size={size} />;
  }
}

export default function Contact({ data }: { data: ContactSectionData }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push('/thank-you');
    }, 400);
  };

  const contactItems = data.contact_items || [
    {
      type: 'location',
      title: 'Our Location',
      lines: [
        data.info?.address || '123 Education Lane, New York, NY 10001',
      ],
    },
    {
      type: 'phone',
      title: 'Phone',
      lines: [data.info?.phone || '+100000000000'],
    },
    {
      type: 'email',
      title: 'Email',
      lines: [data.info?.email || 'info@xyz.com'],
    },
    {
      type: 'social',
      title: 'Follow Us',
      socials: [
        { name: 'facebook', href: 'https://facebook.com' },
        { name: 'instagram', href: 'https://instagram.com' },
        { name: 'twitter', href: 'https://twitter.com' },
        { name: 'pinterest', href: 'https://pinterest.com' },
      ],
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 text-[#16241b]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
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
                {data.eyebrow}
              </span>
            </div>

            {/* Title: Contact Us */}
            <h2 className="font-serif text-[42px] sm:text-[50px] lg:text-[54px] font-normal leading-[1.08] text-[#16241b] mb-4 sm:mb-5">
              {data.title_line1}{' '}
              <span className="text-[#ba8538]">{data.title_highlight}</span>
            </h2>

            {/* Description */}
            <p className="text-[14px] sm:text-[14.5px] text-[#616c65] leading-[1.72] mb-8 sm:mb-10 max-w-[560px]">
              {data.description}
            </p>

            {/* 2x2 Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7 sm:gap-y-8 mb-8 sm:mb-10">
              {contactItems.map((item, idx) => {
                return (
                  <motion.div
                    key={item.title || idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="flex items-start gap-3.5"
                  >
                    {/* Circle Icon Container */}
                    <div className="w-[46px] h-[46px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#f8f3ea] text-[#ba8538] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {item.type === 'location' && <MapPin size={20} strokeWidth={1.8} />}
                      {item.type === 'phone' && <Phone size={20} strokeWidth={1.8} />}
                      {item.type === 'email' && <Mail size={20} strokeWidth={1.8} />}
                      {item.type === 'social' && <Share2 size={20} strokeWidth={1.8} />}
                    </div>

                    {/* Text / Social links */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[17px] sm:text-[18px] text-[#16241b] font-medium leading-snug mb-1">
                        {item.title}
                      </h3>

                      {item.type === 'social' && item.socials ? (
                        <div className="flex items-center gap-2 mt-2">
                          {item.socials.map((soc) => (
                            <a
                              key={soc.name}
                              href={soc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={soc.name}
                              className="w-[30px] h-[30px] rounded-full border border-[#ede7dc] bg-[#faf8f5] hover:bg-[#ba8538] hover:border-[#ba8538] text-[#16241b] hover:text-white flex items-center justify-center transition-all duration-200"
                            >
                              <SocialIcon name={soc.name} />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-0.5 text-[13px] sm:text-[13.5px] text-[#616c65] leading-[1.5]">
                          {item.lines?.map((line, lIdx) => {
                            if (item.type === 'phone') {
                              return (
                                <a
                                  key={lIdx}
                                  href={`tel:${line.replace(/[^+\d]/g, '')}`}
                                  className="block hover:text-[#ba8538] transition-colors"
                                >
                                  {line}
                                </a>
                              );
                            }
                            if (item.type === 'email') {
                              return (
                                <a
                                  key={lIdx}
                                  href={`mailto:${line}`}
                                  className="block hover:text-[#ba8538] transition-colors break-all"
                                >
                                  {line}
                                </a>
                              );
                            }
                            return (
                              <p key={lIdx} className="m-0">
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Wide Bottom Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-sm border border-[#ede7dc]/70"
            >
              <Image
                src={data.image || '/img/contact-resort.webp'}
                alt={data.image_alt || 'The Valmere Luxury Resort'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN (FORM CARD) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-[#ede7dc] p-6 sm:p-9 lg:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.025)]">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-8 sm:w-10 h-[1.5px] bg-[#c28b38]" />
                <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.22em] text-[#ba8538] uppercase">
                  {data.form.eyebrow}
                </span>
              </div>

              {/* Title: Fill Up The Form */}
              <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[46px] font-normal leading-[1.1] text-[#16241b] mb-2">
                {data.form.title_line1}{' '}
                <span className="text-[#ba8538]">{data.form.title_highlight}</span>
              </h2>

              {/* Subtitle */}
              <div className="text-[13px] sm:text-[13.5px] text-[#6a756f] leading-snug mb-7 sm:mb-8 space-y-0.5">
                <p className="m-0">{data.form.subtitle_line1}</p>
                <p className="m-0">{data.form.subtitle_line2}</p>
              </div>

              {/* Form Status Message */}
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-[#f4f8f4] border border-[#a8cfb4] text-[#1b432a] text-[13.5px] flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 size={18} className="text-[#2e7d4d] shrink-0" />
                  <span>Thank you! Your message has been sent successfully. We will contact you shortly.</span>
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                {/* 1. Name */}
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

                {/* 2. Email Address */}
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

                {/* 3. Phone Number */}
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

                {/* 4. Subject */}
                <div className="relative flex items-center rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                  <div className="absolute left-4 text-[#8f9b93] pointer-events-none flex items-center justify-center">
                    <LayoutGrid size={18} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={data.form.subject_placeholder}
                    className="w-full pl-12 pr-4 py-3.5 sm:py-3.5 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none"
                  />
                </div>

                {/* 5. Message Textarea */}
                <div className="relative rounded-[10px] border border-[#ede7dc] bg-white transition-all duration-200 focus-within:border-[#ba8538] focus-within:ring-2 focus-within:ring-[#ba8538]/15">
                  <div className="absolute left-4 top-4 text-[#8f9b93] pointer-events-none">
                    <PenLine size={18} strokeWidth={1.8} />
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={data.form.message_placeholder}
                    className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-transparent text-[13.5px] sm:text-[14px] text-[#16241b] placeholder:text-[#8e9891] focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full mt-2 py-4 sm:py-4 px-6 rounded-[10px] bg-[#ba8538] hover:bg-[#a6742b] active:bg-[#946522] text-white text-[15px] sm:text-[15.5px] font-medium tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-70 cursor-pointer"
                >
                  <span>{submitting ? 'Sending...' : data.form.button_text}</span>
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
