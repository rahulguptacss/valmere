'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicked = useRef(false);
  const isVisible = useRef(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client and only on devices with a mouse (pointer: fine)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check if hovering over clickable/interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], label, .cursor-pointer');
        isHovered.current = !!interactive;
      }
    };

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = () => {
      isClicked.current = false;
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance 60/120fps animation loop using RAF
    let animationFrameId: number;

    const render = () => {
      // Lerp (linear interpolation) for smooth trailing ring effect
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      // Update Dot (instant snappy tracking)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${isClicked.current ? 0.7 : isHovered.current ? 1.4 : 1
          })`;
      }

      // Update Ring (smooth trailing & expansion on hover)
      if (ringRef.current) {
        const scale = isClicked.current ? 0.8 : isHovered.current ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        if (isHovered.current) {
          ringRef.current.style.borderColor = 'rgba(197, 160, 89, 0.85)';
          ringRef.current.style.backgroundColor = 'rgba(197, 160, 89, 0.14)';
        } else {
          ringRef.current.style.borderColor = 'rgba(197, 160, 89, 0.55)';
          ringRef.current.style.backgroundColor = 'rgba(197, 160, 89, 0.04)';
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#c5a059]/60 bg-[#c5a059]/5 backdrop-blur-[0.5px] transition-[opacity,background-color,border-color] duration-200 ease-out will-change-transform opacity-0 pointer-events-none"
        style={{
          boxShadow: '0 0 16px rgba(197, 160, 89, 0.18)',
        }}
      />

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.8)] transition-opacity duration-150 ease-out will-change-transform opacity-0 pointer-events-none"
      />
    </div>
  );
}
