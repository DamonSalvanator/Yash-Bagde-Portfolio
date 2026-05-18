import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface NavbarProps {
  theme?: "light" | "dark";
}

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Mount guard so overlay is in DOM before GSAP touches it
  useEffect(() => setMounted(true), []);

  // Time ticker
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Kill any running timeline
    if (tlRef.current) tlRef.current.kill();

    const links = overlay.querySelectorAll<HTMLElement>(".nav-link-inner");
    const footer = overlay.querySelectorAll<HTMLElement>(".nav-footer-item");

    // Set initial states
    gsap.set(overlay, { display: "flex", opacity: 0 });
    gsap.set(links, { y: "105%" });
    gsap.set(footer, { opacity: 0, y: 16 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Overlay fades in fast
    tl.to(overlay, { opacity: 1, duration: 0.25, ease: "none" });

    // 2. Links clip-reveal upward — staggered
    tl.to(
      links,
      {
        y: "0%",
        duration: 0.75,
        ease: "power4.out",
        stagger: 0.07,
      },
      "-=0.05"
    );

    // 3. Footer fades in
    tl.to(
      footer,
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
      "-=0.4"
    );
  };

  const closeMenu = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (tlRef.current) tlRef.current.kill();

    const links = overlay.querySelectorAll<HTMLElement>(".nav-link-inner");
    const footer = overlay.querySelectorAll<HTMLElement>(".nav-footer-item");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = "";
        gsap.set(overlay, { display: "none" });
      },
    });
    tlRef.current = tl;

    // 1. Links slide back down into masks
    tl.to(links, {
      y: "105%",
      duration: 0.5,
      ease: "power3.in",
      stagger: { each: 0.04, from: "end" },
    });

    // 2. Footer fades
    tl.to(footer, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in" }, 0);

    // 3. Overlay fades out fast
    tl.to(overlay, { opacity: 0, duration: 0.2, ease: "none" }, "-=0.1");
  };

  const handleMenuToggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.currentTarget.blur();
    }
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleLinkClick = (id: string) => {
    closeMenu();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 650);
  };

  const isLight = theme === "light" && !isOpen;

  const menuLinks = [
    { label: "Home", id: "home", video: "/image/videos/3d website.mp4" },
    { label: "About", id: "about", video: "/image/videos/fullstack.mp4" },
    { label: "Approach", id: "skills", video: "/image/videos/gsap animation.mp4" },
    { label: "Services", id: "services", video: "/image/videos/UIUX.mp4" },
    { label: "Contact", id: "contact", video: "/image/videos/webdesign.mp4" },
  ];

  return (
    <>
      {/* ── Fixed Header ── */}
      <header className="fixed top-0 left-0 w-full z-[9999] px-6 md:px-12 py-6 md:py-8 flex justify-end items-center">
        {/* Brand Logo */}




        {/* Toggle Button */}
        <button
          onClick={handleMenuToggle}
          onKeyDown={(e) => {
            if (e.key === " " || e.code === "Space") {
              e.preventDefault();
            }
          }}
          className="relative flex items-center gap-2.5 transition-all duration-300 group focus:outline-none cursor-none z-[9999]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#0022FF] group-hover:scale-125 transition-transform duration-300 flex-shrink-0" />
          <span
            className="text-2xl transition-colors duration-500 select-none"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: isLight ? "#121212" : "#E8E8E2" }}
          >
            {isOpen ? "close." : "menu."}
          </span>
        </button>
      </header>

      {/* ── Fullscreen Overlay ── */}
      {mounted && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9998] bg-[#0A0A0A] w-full h-screen flex-col justify-between px-8 md:px-16 py-6 md:py-8 grain"
          style={{ display: "none", opacity: 0 }}
        >
          {/* Background Video per hovered link */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {menuLinks.map((link) => {
              const isActive = hoveredLink === link.id;
              return (
                isActive && (
                  <div
                    key={link.id}
                    className="absolute inset-0 opacity-30 transition-opacity duration-500"
                  >
                    <video
                      src={link.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover grayscale brightness-50"
                    />
                  </div>
                )
              );
            })}
          </div>

          {/* Header spacer */}
          <div className="relative z-10 h-16 md:h-20 flex-shrink-0" />

          {/* ── Nav Links — each wrapped in overflow:hidden mask ── */}
          <nav className="relative z-10 flex flex-col justify-center items-center flex-grow gap-0 w-full">
            {menuLinks.map((link) => (
              <div
                key={link.id}
                className="overflow-hidden w-full flex justify-center border-b border-white/10 last:border-b-0"
              >
                <button
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="nav-link-inner inline-block text-center font-display uppercase tracking-tight leading-none text-white transition-opacity duration-300 py-3 md:py-4 opacity-100"
                  style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
                >
                  <span className="inline-block transition-colors duration-300 hover:text-accent">
                    {link.label}
                  </span>
                </button>
              </div>
            ))}
          </nav>

          {/* ── Footer ── */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-5 border-t border-white/10 flex-shrink-0">

            <span className="nav-footer-item flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-body text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping flex-shrink-0" />
              Local time / {time}
            </span>
          </div>
        </div>
      )}
    </>
  );
}