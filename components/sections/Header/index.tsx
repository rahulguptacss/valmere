'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { HeaderData, LinkType } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Which mobile sub-menu (accordion) is open
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Esc or when resized to desktop
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  // Reset sub-menu whenever the drawer closes
  useEffect(() => {
    if (!mobileMenuOpen) setOpenSub(null);
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-1 border-b border-[#e8d8b6]/40'
          : 'bg-white py-1 sm:py-1.5 border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        
        {/* Brand Logo with /logo/logo.webp */}
        <Link href="/" className="flex items-center shrink min-w-0 group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center"
          >
            <img
              src={data.logo || "/logo/logo.webp"}
              alt={data.logo_text || "The Valmere Hotels & Resorts"}
              className="block h-[56px] min-[400px]:h-[64px] sm:h-[76px] md:h-[84px] w-auto max-w-full object-contain -my-[9px] min-[400px]:-my-[11px] sm:-my-[14px] md:-my-[16px] -ml-[4px] sm:-ml-[5px] md:-ml-[6px]"
            />
          </motion.div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {data.links.map((link: LinkType) => {
            const active = isActive(link.href);
            const hasChildren = !!link.children?.length;
            return (
              <div key={link.name} className="relative group/nav">
                <Link
                  href={link.href}
                  className="relative py-1 group flex items-center gap-1"
                  aria-haspopup={hasChildren || undefined}
                >
                  <span
                    className={`text-[12px] xl:text-[12.5px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                      active
                        ? 'text-[#516854]'
                        : 'text-[#252926] group-hover:text-[#516854]'
                    }`}
                  >
                    {link.name}
                  </span>
                  {hasChildren && (
                    <ChevronDown
                      size={13}
                      strokeWidth={2.2}
                      className="text-[#516854] transition-[rotate] duration-300 group-hover/nav:rotate-180"
                    />
                  )}

                  {/* Underline Indicator: active is visible, hover expands smoothly from left */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#516854] rounded-full transition-transform duration-300 origin-left ${
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>

                {/* Desktop sub-menu (hover / keyboard focus) */}
                {hasChildren && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-focus-within/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 transition-[opacity,translate,visibility] duration-300">
                    <ul className="min-w-[240px] bg-white border border-[#e8d8b6]/60 shadow-[0_18px_40px_-12px_rgba(31,52,39,0.25)] py-2">
                      {link.children!.map((child) => (
                        <li key={child.href + child.name}>
                          <Link
                            href={child.href}
                            className={`group/sub flex items-center justify-between gap-3 px-5 py-2.5 text-[13px] tracking-[0.02em] transition-colors duration-200 ${
                              pathname === child.href
                                ? 'text-[#516854] bg-[#f7f3ea]'
                                : 'text-[#252926] hover:text-[#516854] hover:bg-[#f7f3ea]'
                            }`}
                          >
                            <span>{child.name}</span>
                            <ArrowRight
                              size={12}
                              className="text-[#c5a059] opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-[opacity,translate] duration-200"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Section: Divider + ENQUIRE NOW Button (visible on mobile too) */}
        <div className="flex items-center gap-1.5 min-[400px]:gap-2.5 sm:gap-4 shrink-0">
          {/* Thin Vertical Divider matching screenshot */}
          <div className="h-6 w-[1px] bg-[#c5a059]/40 hidden lg:block" />

          {/* Compact ENQUIRE NOW Button with rounded-[5px] and Arrow */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={data.button_link || "/enquiry-now"}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#596c58] hover:bg-[#495948] text-white px-3 py-2 sm:px-5 sm:py-2 rounded-[5px] text-[10px] min-[400px]:text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-200 shadow-sm"
            >
              <span>{data.button_text || "ENQUIRE NOW"}</span>
              <ArrowRight
                size={13}
                className="hidden min-[400px]:block transform group-hover:translate-x-1 transition-transform duration-200 text-white"
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#252926] hover:bg-[#f7f3ea] transition"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer — absolutely positioned overlay so it never pushes page sections down */}
      <AnimatePresence>
        {mobileMenuOpen && (
            /* Backdrop (click to close) */
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              aria-hidden="true"
              className="lg:hidden absolute left-0 right-0 top-full h-[100vh] bg-[#1f3427]/25 backdrop-blur-[2px] z-40"
            />
        )}
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute left-0 right-0 top-full z-50 overflow-hidden bg-white border-b border-[#e8d8b6]/40 shadow-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-5 max-h-[calc(100vh-90px)] overflow-y-auto">
              {data.links.map((link: LinkType) => {
                const active = isActive(link.href);
                const hasChildren = !!link.children?.length;
                const subOpen = openSub === link.name;

                const linkClass = `text-[13.5px] font-semibold tracking-[0.14em] uppercase py-2.5 transition-colors ${
                  active
                    ? 'text-[#516854] font-bold border-l-2 border-[#516854] pl-3'
                    : 'text-[#252926] hover:text-[#516854]'
                }`;

                if (!hasChildren) {
                  return (
                    <Link key={link.name} href={link.href} onClick={closeMenu} className={linkClass}>
                      {link.name}
                    </Link>
                  );
                }

                // Link with nested dropdown (accordion)
                return (
                  <div key={link.name}>
                    <div className="flex items-center justify-between">
                      <Link href={link.href} onClick={closeMenu} className={`${linkClass} flex-1`}>
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenSub(subOpen ? null : link.name)}
                        aria-expanded={subOpen}
                        aria-label={`Toggle ${link.name} sub-menu`}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                          subOpen ? 'bg-[#596c58] text-white' : 'text-[#516854] hover:bg-[#f7f3ea]'
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-[rotate] duration-300 ${subOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {subOpen && (
                        <motion.div
                          key="sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="ml-1 mt-1 mb-2 border-l border-[#e8d8b6] pl-4 flex flex-col">
                            {link.children!.map((child) => (
                              <li key={child.href + child.name}>
                                <Link
                                  href={child.href}
                                  onClick={closeMenu}
                                  className={`block py-2 text-[13.5px] tracking-[0.02em] transition-colors ${
                                    pathname === child.href
                                      ? 'text-[#516854] font-semibold'
                                      : 'text-[#4d5550] hover:text-[#516854]'
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
