import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES: { html: string }[] = [
  { html: `<span class="drop-cap">I</span><strong style="letter-spacing: 0.025em"> have dedicated years to creating modern, high-performing digital</strong>` },
  { html: `<strong style="letter-spacing: 0.04em">experiences that combine creativity with precision. I focus on</strong>` },
  { html: `<strong style="letter-spacing: 0.01em">understanding the vision deeply before transforming it into immersive</strong>` },
  { html: `<strong style="letter-spacing: -0.03em">digital experiences through design, development, animation, and interaction.</strong>` },
];

// ── Scroll band — shifted to delay the start so it reveals in the center ──
const BAND_START = 50;
const BAND_END = 10;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const total = BAND_START - BAND_END;          // 100 vp-units
      const perLine = total / LINES.length;            // equal split per line

      fillRefs.current.forEach((el, i) => {
        if (!el) return;

        const s = BAND_START - i * perLine;
        const e = BAND_START - (i + 1) * perLine;

        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",                    // scrub provides all easing feel
            scrollTrigger: {
              trigger: section,
              start: `top ${s.toFixed(2)}%`,
              end: `top ${e.toFixed(2)}%`,
              scrub: 0.45,                 // 0.45 s lag — silky, zero jitter
              invalidateOnRefresh: true,     // recalc on window resize
            },
          }
        );
      });

      // Ambient orb float
      gsap.utils.toArray<HTMLElement>(".about-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? "-40px" : "40px",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 6 + i * 2,
        });
      });

      // Mobile continuous text animation
      const mobileText = section.querySelector(".about-mobile-text");
      if (mobileText) {
        gsap.fromTo(
          mobileText,
          { opacity: 0.1, y: 30 },
          {
            opacity: 0.9,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "top 45%",
              scrub: 0.5,
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Google Fonts ─────────────────────────────────────────────── */}
      {/*
          Add these two <link> tags to your index.html <head> (or _document.tsx):

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,400;1,9..144,200;1,9..144,400&display=swap"
            rel="stylesheet"
          />
      */}    <style>{CSS}</style>

      <section id="about" ref={sectionRef} className="about-section">

        {/* Dark Grid Background — exact same as Skills page */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-10 h-full opacity-40 z-0">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-white/25 relative"></div>
          ))}
        </div>

        {/* ── Ambient depth orbs ──────────────────────────────────────── */}
        <div className="about-orb about-orb--tl" />
        <div className="about-orb about-orb--br" />
        <div className="about-orb about-orb--mid" />

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="about-content">

          {/* Header */}
          <header className="about-header">
            <div className="about-meta">
              <p className="about-tag">Story</p>
              <h2 className="about-heading">
                A little bit
                <em>About me</em>
              </h2>
            </div>
            <span className="about-idx">001 / 004</span>
          </header>

          {/* Eyebrow */}
          <p className="about-eyebrow">
            <span className="about-eyebrow-dot" />
            A bit more about yours truly
          </p>

          {/* ── Line-by-line scroll fill (Desktop) ──────────────────────── */}
          <div className="about-fill-block hidden md:flex">
            {LINES.map((line, i) => (
              <div key={i} className="about-line-wrap">

                {/* Dim base — always visible */}
                <span
                  className="about-line-base"
                  dangerouslySetInnerHTML={{ __html: line.html }}
                />

                {/* Bright overlay — revealed left→right on scroll */}
                <span
                  ref={(el) => { fillRefs.current[i] = el; }}
                  className="about-line-overlay"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: line.html }}
                />

              </div>
            ))}
          </div>

          {/* ── Continuous Paragraph (Mobile) ────────────────────────────── */}
          <div className="about-mobile-block md:hidden">
            <p className="about-mobile-text">
              <span className="drop-cap">I</span> have dedicated years to creating modern, high-performing digital experiences that combine creativity with precision. I focus on understanding the vision deeply before transforming it into immersive digital experiences through design, development, animation, and interaction.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}

// ── All styles co-located — no external CSS file needed ──────────────────
const CSS = /* css */`
  .about-section {
    background: #111111;
    min-height: 30vh; /* Reduced page height by 10% */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding-top: clamp(50px, 6vw, 90px); /* Restored upper space */
    padding-bottom: clamp(90px, 10.8vw, 162px); /* Shrunk by 10% */
    padding-left: clamp(12px, 3vw, 40px); /* Shrunk left padding to shift heading more towards left */
    padding-right: clamp(16px, 4vw, 60px);
    -webkit-font-smoothing: antialiased;
  }

  /* ── Orbs ── */
  .about-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .about-orb--tl {
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 70%);
    top: -20%;
    left: -22%;
  }
  .about-orb--br {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(220,200,180,0.028) 0%, transparent 70%);
    bottom: -12%;
    right: -14%;
  }
  .about-orb--mid {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%);
    top: 35%;
    left: 55%;
  }

  /* ── Content wrapper ── */
  .about-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 100%; /* Stretched to 100% to allow heading to go fully towards the left edge */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  /* ── Header ── */
  .about-header {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: clamp(10px, 1.8vw, 20px); /* Reduced space directly below heading */
    margin-bottom: clamp(12px, 2.2vw, 24px); /* Reduced gap below header line */
  }
  .about-meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .about-tag {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.44em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
  }
  .about-tag::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  .about-heading {
    font-family: 'Fraunces', serif;
    font-size: clamp(26px, 4vw, 34px);
    font-weight: 200;
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: #fafafa;
    margin: 0;
  }
  .about-heading em {
    font-style: italic;
    padding-left: clamp(20px, 3.2vw, 48px);
    display: block;
    color: rgba(255, 255, 255, 0.55);
  }
  .about-idx {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: rgba(255, 255, 255, 0.12);
    align-self: flex-start;
    margin-top: 4px;
  }

  /* ── Eyebrow ── */
  .about-eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center; /* Centered */
    align-self: center; /* Centered */
    gap: 10px;
    margin: 0 0 clamp(8px, 1.2vw, 16px) 0; /* Tightened space below eyebrow capsule */
    padding: 7px 16px 7px 14px;
    border: 1px solid rgba(255, 255, 255, 0.17);
    border-radius: 100px;
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.35);
  }
  .about-eyebrow-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #2D2DFF; /* Electric Brand Blue */
    flex-shrink: 0;
  }

  /* ── Fill block ── */
  .about-fill-block {
    width: max-content;
    max-width: 100%; /* Prevents horizontal overflow on very small screens */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch; /* Stretch each line to the full width */
    gap: 0; /* Tightened line gap */
    margin-top: clamp(10px, 1.5vw, 20px); /* Reduced gap to tighten the marked area space */
    margin-bottom: clamp(24px, 4.5vw, 60px); /* More vertical space below text area */
  }
  .about-line-wrap {
    position: relative;
    display: block;
    width: 100%;
    line-height: 1.42;
    text-align: justify;
    text-align-last: justify;
  }

  /* Dim base — always rendered, provides layout + ghosted text */
  .about-line-base {
    display: block;
    width: 100%;
    font-family: 'Fraunces', serif;
    font-size: clamp(1.25rem, 2.5vw, 2.15rem); /* Elegant filler font size */
    font-weight: 400;
    line-height: 1.42; /* Tightened line height */
    letter-spacing: -0.01em; /* Elegant spacing */
    color: rgba(255, 255, 255, 0.07);
    white-space: nowrap;
    user-select: none;
    text-align: justify;
    text-align-last: justify;
  }
  .about-line-base strong {
    font-weight: 700;
    color: rgba(255, 255, 255, 0.09);
  }

  /* Bright overlay — clip-path animated by GSAP */
  .about-line-overlay {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    font-family: 'Fraunces', serif;
    font-size: clamp(1.25rem, 2.5vw, 2.15rem); /* Elegant filler font size */
    font-weight: 400;
    line-height: 1.42; /* Tightened line height */
    letter-spacing: -0.01em; /* Elegant spacing */
    color: #f0ece7;
    white-space: nowrap;
    clip-path: inset(0 100% 0 0);
    will-change: clip-path;
    pointer-events: none;
    text-align: justify;
    text-align-last: justify;
  }
  .about-line-overlay strong {
    font-weight: 700;
  }

  /* ── Drop Cap ── */
  .drop-cap {
    font-family: 'Fraunces', serif;
    font-size: 1.15em; /* Slight bump to visually match the sans-serif height */
    font-weight: 400;
    margin-right: 1px;
  }

  /* ── Bottom strip ── */
  .about-bottom {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: clamp(40px, 6vw, 80px);
    padding-top: clamp(20px, 3vw, 36px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    width: 100%;
  }
  .about-bottom-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2D2DFF; /* Electric Brand Blue */
    flex-shrink: 0;
  }
  .about-bottom-label {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.18);
  }
  .about-bottom-rule {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
  }
  .about-bottom-year {
    font-family: 'Fraunces', serif;
    font-size: 13px;
    font-weight: 200;
    color: rgba(255, 255, 255, 0.18);
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    .about-section {
      min-height: auto;
      padding-top: 40px;
      padding-bottom: 40px;
      padding-left: 20px;
      padding-right: 20px;
    }
    .about-fill-block {
      display: none !important;
    }
    .about-heading {
      font-size: clamp(28px, 8vw, 36px);
    }
    .about-heading em {
      padding-left: 20px;
    }
    .about-orb {
      display: none; /* Hide for mobile performance */
    }
    .about-eyebrow {
      align-self: flex-start;
      margin-top: 12px;
      margin-bottom: 28px;
    }
    .about-mobile-block {
      width: 100%;
      margin-top: 0;
      margin-bottom: 40px;
    }
    .about-mobile-text {
      font-family: 'Fraunces', serif;
      font-size: clamp(1.2rem, 5.8vw, 1.8rem);
      line-height: 1.45;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.85);
      text-align: left;
      letter-spacing: -0.01em;
    }
    .about-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-top: 20px;
    }
  }

`;