'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, BedDouble, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ReservationSectionData } from '../../types';

interface ReservationProps {
  data: ReservationSectionData;
}

export default function Reservation({ data }: ReservationProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '2 Guests',
    room: data.room_options[0] || 'Deluxe Room Suite ($480 / night)',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/thank-you');
    }, 600);
  };

  return (
    <section className="py-20 md:py-28 bg-[#faf8f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 justify-center mb-4">
            <span className="w-8 h-[1px] bg-[#c5a059]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#c5a059]">
              {data.eyebrow}
            </span>
            <span className="w-8 h-[1px] bg-[#c5a059]"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#243c30] tracking-tight">
            {data.title}
          </h2>
          <p className="mt-4 text-[#5c6778] text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-[0_15px_45px_rgba(36,60,48,0.06)] border border-[#ede5d8]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#243c30] mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#c5a059]" />
                    {data.checkin_label}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkin}
                    onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#243c30] mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#c5a059]" />
                    {data.checkout_label}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkout}
                    onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#243c30] mb-2 flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-[#c5a059]" />
                    {data.room_label}
                  </label>
                  <select
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    {data.room_options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#243c30] mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#c5a059]" />
                    {data.guests_label}
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Standard)</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5+ Guests">5+ Guests (Family Suite)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0ebd9]">
                <h4 className="text-sm font-serif font-bold text-[#243c30] mb-4">Guest Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm placeholder:text-[#a09a8e] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm placeholder:text-[#a09a8e] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm placeholder:text-[#a09a8e] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder="Special requests or dietary preferences (optional)"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#e5decb] bg-[#fdfbf7] text-[#243c30] text-sm placeholder:text-[#a09a8e] focus:outline-none focus:border-[#c5a059]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#243c30] text-[#f7f3ea] font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#c5a059] transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : data.button_text}
              </button>
            </form>
          </div>

          {/* Sidebar Perks */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#243c30] text-[#fcfaf7] p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border border-white/10 pointer-events-none"></div>
              <div className="flex items-center gap-3 text-[#c5a059] mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">Valmere Privileges</span>
              </div>
              <h3 className="font-serif text-2xl mb-4">Included With Every Reservation</h3>
              <ul className="space-y-3.5 text-xs text-white/80">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Complimentary VIP airport speedboat transfer</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Fresh tropical welcome drink & cold towels</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Artisanal breakfast buffet served oceanfront daily</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Unrestricted access to the cliffside infinity pool</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>Dedicated 24/7 personal island concierge</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-white/60">
                <ShieldCheck className="w-5 h-5 text-[#c5a059] shrink-0" />
                <span>Best rate guaranteed. Free cancellation up to 48 hours before check-in.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
