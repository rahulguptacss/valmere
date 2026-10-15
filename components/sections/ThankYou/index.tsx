import Link from 'next/link';
import { Check, Compass, Palmtree } from 'lucide-react';
import type { ThankYouSectionData } from '../../types';

interface ThankYouProps {
  data: ThankYouSectionData;
}

export default function ThankYou({ data }: ThankYouProps) {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#faf8f5] px-6 py-24 relative overflow-hidden">
      {/* Decorative background watermarks */}
      <div className="absolute -top-20 -left-20 text-[#ede7d8]/60 pointer-events-none select-none">
        <Palmtree className="w-96 h-96" />
      </div>
      <div className="absolute -bottom-20 -right-20 text-[#ede7d8]/60 pointer-events-none select-none">
        <Compass className="w-96 h-96" />
      </div>

      <div className="w-full max-w-xl bg-white rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_50px_rgba(36,60,48,0.08)] border border-[#ede5d8] relative z-10">
        {/* Monogram / Check circle */}
        <div className="relative mx-auto w-20 h-20 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#c5a059] animate-spin-slow"></div>
          <div className="w-16 h-16 rounded-full bg-[#243c30] text-[#c5a059] flex items-center justify-center shadow-lg">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#c5a059] block mb-3">
          Reservation Confirmed
        </span>

        <h1 className="font-serif text-3xl md:text-4xl text-[#243c30] leading-tight mb-4">
          {data.title}
        </h1>

        <p className="text-[#5c6778] text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
          {data.description}
        </p>

        <div className="p-4 rounded-2xl bg-[#edf3ea] border border-[#d6e5d1] text-xs text-[#243c30] mb-8 leading-relaxed">
          <span className="font-semibold">Need immediate assistance?</span> Call our 24/7 guest desk at{' '}
          <a href="tel:+18002345678" className="underline font-bold text-[#243c30]">
            +1 (800) 234-5678
          </a>
        </div>

        <Link
          href={data.button.href}
          className="inline-flex items-center justify-center px-8 py-4 bg-[#243c30] text-[#f7f3ea] hover:bg-[#c5a059] rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
        >
          {data.button.text}
        </Link>
      </div>
    </section>
  );
}
