'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { ContactSectionData } from '../../types';

export default function Contact({ data }: { data: ContactSectionData }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      router.push('/thank-you');
    }, 600);
  };

  return (
    <section className="bg-[#fcfaf7] py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3.5 mb-3">
            <span className="w-12 h-[1.5px] bg-[#c5a059]" />
            <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.28em] text-[#8c7853] uppercase">
              {data.eyebrow || "GET IN TOUCH"}
            </span>
            <span className="w-12 h-[1.5px] bg-[#c5a059]" />
          </div>
          <h2 className="font-serif text-[34px] sm:text-[46px] md:text-[50px] font-normal text-[#243c30] leading-tight mb-4">
            {data.title_line1} <span className="italic text-[#c5a059]">{data.title_highlight}</span>
          </h2>
          <p className="text-[14px] sm:text-[15.5px] text-[#556259] leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Cards & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 sm:p-8 rounded-[28px] border border-[#e8d8b6]/60 shadow-md space-y-6">
              <h3 className="font-serif text-[24px] text-[#243c30] font-normal">
                Guest Services & Concierge
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] bg-[#f7f3ea] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#8c7853] uppercase tracking-wider">Address</span>
                    <span className="text-[14px] text-[#243c30]">{data.info.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] bg-[#f7f3ea] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#8c7853] uppercase tracking-wider">Phone Inquiries</span>
                    <span className="text-[14px] text-[#243c30] font-semibold">{data.info.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] bg-[#f7f3ea] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#8c7853] uppercase tracking-wider">Email Address</span>
                    <span className="text-[14px] text-[#243c30]">{data.info.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] bg-[#f7f3ea] shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#8c7853] uppercase tracking-wider">Concierge Hours</span>
                    <span className="text-[14px] text-[#243c30]">{data.info.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Embed */}
            <div className="h-64 rounded-[28px] overflow-hidden border border-[#e8d8b6]/60 shadow-md bg-neutral-200">
              <iframe
                title="Valmere Resort Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.26442651475!2d-64.81944588320315!3d18.33805626240232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c06f3630f9a5629%3A0x7d94f2791e84f697!2sSaint%20Thomas!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-[32px] border border-[#e8d8b6]/60 shadow-xl">
              <span className="block text-[11px] font-bold tracking-[0.25em] text-[#8c7853] uppercase mb-1">
                SEND US A MESSAGE
              </span>
              <h3 className="font-serif text-[28px] sm:text-[32px] text-[#243c30] font-normal mb-8">
                How May We Assist You?
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#6d7971] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={data.form.name_placeholder}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] placeholder:text-neutral-400 focus:outline-none focus:border-[#243c30]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#6d7971] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={data.form.email_placeholder}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] placeholder:text-neutral-400 focus:outline-none focus:border-[#243c30]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#6d7971] uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder={data.form.phone_placeholder}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] placeholder:text-neutral-400 focus:outline-none focus:border-[#243c30]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#6d7971] uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3.5 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] focus:outline-none focus:border-[#243c30] bg-white">
                      <option>Room & Suite Reservations</option>
                      <option>Private Island Dining</option>
                      <option>Spa & Wellness Packages</option>
                      <option>Airport & Yacht Transfers</option>
                      <option>Events & Wedding Inquiries</option>
                      <option>Other Special Requests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#6d7971] uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder={data.form.message_placeholder}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e8d8b6] text-[14px] text-[#243c30] placeholder:text-neutral-400 focus:outline-none focus:border-[#243c30] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#243c30] hover:bg-[#1a2c23] text-white px-9 py-4 rounded-full text-[13px] font-bold tracking-[0.16em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                >
                  <span>{submitting ? 'SENDING...' : data.form.button_text}</span>
                  <Send size={15} className="text-[#c5a059]" />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
