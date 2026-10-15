'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter, FaPinterestP } from 'react-icons/fa';
import { FooterData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Social icon by name from data.json
function SocialIcon({ name }: { name: string }) {
  const size = 12;
  switch (name.toLowerCase()) {
    case 'facebook':
      return <FaFacebookF size={size} />;
    case 'instagram':
      return <FaInstagram size={size} />;
    case 'linkedin':
      return <FaLinkedinIn size={size} />;
    case 'youtube':
      return <FaYoutube size={size} />;
    case 'twitter':
      return <FaTwitter size={size} />;
    default:
      return <FaPinterestP size={size} />;
  }
}

// Gold filled circle with white icon
function InfoIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-f-icon
      className="w-[34px] h-[34px] sm:w-[30px] sm:h-[30px] rounded-full bg-[#c29a6b] text-white flex items-center justify-center shrink-0 [&_svg]:w-[15px] [&_svg]:h-[15px] sm:[&_svg]:w-[14px] sm:[&_svg]:h-[14px]"
    >
      {children}
    </span>
  );
}

// Column heading with short gold underline
function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 sm:mb-7">
      <h4 data-f-title className="font-serif font-normal text-[30px] sm:text-[24px] lg:text-[26px] leading-tight text-[#2f4538]">
        {children}
      </h4>
      <span data-f-title-line className="block mt-3 sm:mt-3 w-[46px] sm:w-[34px] h-px bg-[#c29a6b] origin-left" />
    </div>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(footerRef);

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%', once: true },
        });

        tl
          // Logo fades & slides in
          .fromTo(
            q('[data-f-logo]'),
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, clearProps: 'transform,opacity' }
          )
          // Headline lines rise out of masks
          .fromTo(
            q('[data-f-line]'),
            { yPercent: 110 },
            { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out', clearProps: 'transform' },
            '-=0.55'
          )
          // Column titles + gold underline draw
          .fromTo(
            q('[data-f-title]'),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, clearProps: 'transform,opacity' },
            '-=0.9'
          )
          .fromTo(
            q('[data-f-title-line]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, stagger: 0.12, ease: 'power2.inOut', clearProps: 'transform' },
            '<0.2'
          )
          // Info rows slide in, icons pop
          .fromTo(
            q('[data-f-item]'),
            { x: -18, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.07, clearProps: 'transform,opacity' },
            '-=0.6'
          )
          .fromTo(
            q('[data-f-icon]'),
            { scale: 0, rotate: -45 },
            { scale: 1, rotate: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(2.2)', clearProps: 'transform' },
            '<'
          )
          // Divider grows from the centre
          .fromTo(
            q('[data-f-divider]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: 'power3.inOut', clearProps: 'transform' },
            '-=0.5'
          )
          // Bottom bar
          .fromTo(
            q('[data-f-copy]'),
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform,opacity' },
            '-=0.5'
          )
          .fromTo(
            q('[data-f-social]'),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'back.out(2.5)', clearProps: 'transform,opacity' },
            '<0.1'
          );
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="bg-[#f8f3ec] text-[#4d5550] overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">

        {/* ================= Top: Brand + 2 info columns ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_0.95fr] gap-x-8 gap-y-9 sm:gap-y-12 pt-8 sm:pt-14 pb-7 sm:pb-12">

          {/* Brand (centred on mobile) */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <Link href="/" data-f-logo className="block w-fit mx-auto sm:mx-0">
              <img
                src={data.logo}
                alt={data.logo_alt}
                className="block h-[104px] sm:h-[112px] lg:h-[124px] w-auto max-w-full object-contain -my-[26px] sm:-my-[28px] lg:-my-[31px] sm:-ml-[23px] lg:-ml-[26px]"
              />
            </Link>

            <h3 className="mt-4 sm:mt-3 font-serif font-normal tracking-[-0.01em] leading-[1.12] sm:leading-[1.17] text-[42px] sm:text-[46px] lg:text-[52px] xl:text-[58px]">
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-f-line className="block text-[#2f4538]">{data.headline_line1}</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-f-line className="block text-[#2f4538]">{data.headline_line2}</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-f-line className="block text-[#b98d5e]">{data.headline_highlight}</span>
              </span>
            </h3>
          </div>

          {/* Contact Info (mobile: left-aligned block centred on the page) */}
          <div className="w-full max-w-[340px] mx-auto sm:max-w-none sm:mx-0 lg:pt-[64px]">
            <ColumnTitle>{data.contact_title}</ColumnTitle>
            <ul className="space-y-4 sm:space-y-5 text-[15.5px] sm:text-[15px] lg:text-[16px] text-[#4d5550]">
              <li data-f-item className="flex items-start gap-3.5">
                <InfoIcon><MapPin strokeWidth={2} /></InfoIcon>
                <span className="whitespace-pre-line leading-[1.7] -mt-[2px]">{data.contact.address}</span>
              </li>
              <li data-f-item className="flex items-center gap-3.5">
                <InfoIcon><Phone strokeWidth={2} /></InfoIcon>
                <a href={`tel:${data.contact.phone}`} className="hover:text-[#b98d5e] transition-colors">
                  {data.contact.phone}
                </a>
              </li>
              <li data-f-item className="flex items-center gap-3.5 min-w-0">
                <InfoIcon><Mail strokeWidth={2} /></InfoIcon>
                <a href={`mailto:${data.contact.email}`} className="hover:text-[#b98d5e] transition-colors break-all">
                  {data.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Reservations (mobile: divider line above) */}
          <div className="relative w-full max-w-[340px] mx-auto sm:max-w-none sm:mx-0 pt-9 sm:pt-0 lg:pt-[64px]">
            <span aria-hidden="true" className="sm:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100vw-40px)] max-w-[440px] h-px bg-[#e4d8c2]" />
            <ColumnTitle>{data.reservations_title}</ColumnTitle>
            <ul className="space-y-4 sm:space-y-5 text-[15.5px] sm:text-[15px] lg:text-[16px] text-[#4d5550]">
              <li data-f-item className="flex items-center gap-3.5">
                <InfoIcon><Phone strokeWidth={2} /></InfoIcon>
                <a href={`tel:${data.reservations.phone}`} className="hover:text-[#b98d5e] transition-colors">
                  {data.reservations.phone}
                </a>
              </li>
              <li data-f-item className="flex items-center gap-3.5 min-w-0">
                <InfoIcon><Mail strokeWidth={2} /></InfoIcon>
                <a href={`mailto:${data.reservations.email}`} className="hover:text-[#b98d5e] transition-colors break-all">
                  {data.reservations.email}
                </a>
              </li>
              <li data-f-item className="flex items-center gap-3.5">
                <InfoIcon><Clock strokeWidth={2} /></InfoIcon>
                <span>{data.reservations.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div data-f-divider className="h-px bg-[#e4d8c2] origin-center" />

        {/* ================= Bottom bar ================= */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-5 sm:gap-5 py-6 sm:py-5">
          <p data-f-copy className="text-[14px] sm:text-[14px] lg:text-[15px] text-[#5b6560] text-center sm:text-left leading-relaxed max-w-[320px] sm:max-w-none">
            {data.copyright_text}{' '}
            <span className="whitespace-nowrap">
              {data.powered_by.label}{' '}
              <a
                href={data.powered_by.href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#2f4538] hover:text-[#b98d5e] transition-colors"
              >
                {data.powered_by.name}
              </a>
            </span>
          </p>

          <div className="flex items-center gap-3 sm:gap-2.5">
            {data.socials.map((s) => (
              <a
                key={s.name}
                data-f-social
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="w-[42px] h-[42px] sm:w-[30px] sm:h-[30px] rounded-full border border-[#d6bf9f] text-[#b98d5e] flex items-center justify-center [&_svg]:w-[15px] [&_svg]:h-[15px] sm:[&_svg]:w-[12px] sm:[&_svg]:h-[12px] hover:bg-[#c29a6b] hover:border-[#c29a6b] hover:text-white hover:-translate-y-0.5 transition-[background-color,border-color,color,translate] duration-300"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
