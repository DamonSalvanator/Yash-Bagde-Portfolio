

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "01",
    bg: "#E8E8E2",
    title: "PERFORMANCE FIRST",
    body: "I focus on building websites that load fast and feel smooth from the first interaction. Performance is considered at every stage, from structure and assets to code quality and optimization, ensuring reliable results on real devices and networks.",
  },
  {
    id: "02",
    bg: "#769C81",
    title: "CLEAN & SCALABLE CODE",
    body: "I write clean, well-structured, and maintainable code with a strong focus on clarity and long-term scalability. This approach makes projects easier to understand, update, and extend over time, while reducing complexity and keeping the codebase reliable as it grows.",
  },
  {
    id: "03",
    bg: "#E8E8E2",
    title: "MODERN UI & UX",
    body: "I design and build interfaces with clarity, usability, and consistency in mind. Layouts, interactions, and responsive behavior are carefully crafted to provide an intuitive experience that works seamlessly across all devices and screen sizes.",
  },
  {
    id: "04",
    bg: "#769C81",
    title: "OPTIMIZATION & REFINEMENT",
    body: "After design and development, every project goes through a refinement process focused on performance, responsiveness, smooth interactions, and overall user experience. The goal is to ensure the final product feels polished, fast, stable, and ready for real-world use across all devices.",
  },
  {
    id: "05",
    bg: "#E8E8E2",
    title: "RELIABLE DELIVERY",
    body: "From the initial idea to the final launch, I focus on clear communication, thoughtful planning, and reliable delivery at every stage of the process. Each project is carefully tested and refined to ensure stability, quality, and confidence when the product goes live.",
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const nextCard = cards[i + 1];

        // Stage 1: Continuous pushback from the moment this card pins until the next card pins
        gsap.fromTo(card,
          { scale: 1, y: 0, filter: "blur(0px)", opacity: 1 },
          {
            scale: 0.90, // Stronger initial shrink so it's very noticeable early on
            y: -50,
            filter: "blur(2px)", // Reduced blur to keep it crisp longer
            opacity: 0.7, // Keep it slightly more visible
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 15%", // Starts exactly when THIS card pins
              endTrigger: nextCard,
              end: "top 15%",   // Ends exactly when NEXT card pins
              scrub: true,
            },
            immediateRender: false,
          }
        );

        // Stage 2: Continuous exit from the screen as the 3rd card approaches
        if (i < cards.length - 2) {
          const nextNextCard = cards[i + 2];
          gsap.fromTo(card,
            { scale: 0.90, y: -50, filter: "blur(2px)", opacity: 0.7 }, // Match end of stage 1
            {
              scale: 0.80,
              y: -120,
              filter: "blur(10px)", // Heavy blur kicks in here
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: nextCard,
                start: "top 15%", // Starts exactly when NEXT card pins (seamless handoff)
                endTrigger: nextNextCard,
                end: "top 15%",   // Ends exactly when NEXT NEXT card pins
                scrub: true,
              },
              immediateRender: false,
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      style={{
        background: "#111111",
        position: "relative",
        paddingBottom: "0vh", // Removed padding to connect closely with next section
        scrollMarginTop: "120px", // Offset navigation so 'how I approach' is perfectly visible below navbar
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;700&display=swap');
        
        @font-face {
          font-family: 'Thunder-LC';
          /* src: url('/fonts/Thunder-LC.woff2') format('woff2'); */
          font-weight: 800;
        }
        @font-face {
          font-family: 'Nohemi';
          /* src: url('/fonts/Nohemi-Regular.woff2') format('woff2'); */
          font-weight: 400;
        }

        .skill-card {
          position: sticky;
          top: 15vh; /* All cards pin at the exact same spot! */
          width: calc(100% - 40px);
          margin: 0 auto;
          height: 300px; /* Updated height */
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 16px 32px 0 6px; /* Further reduced top and left padding */
          will-change: transform, filter, opacity;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
          transform-origin: top center;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0px; /* Sharp brutalist corners */
        }
        
        .ghost-number {
          position: absolute;
          right: 2%;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(160px, 18vw, 300px);
          font-family: 'Thunder-LC', 'Anton', sans-serif;
          font-weight: 900;
          color: #000;
          opacity: 0.1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .skill-title {
          font-family: 'Thunder-LC', 'Anton', sans-serif;
          font-size: clamp(40px, 6.5vw, 90px);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 0.9;
          margin: 0 0 20px 0;
          text-transform: uppercase;
          max-width: 80%;
          z-index: 2;
        }

        .skill-body {
          font-family: 'Nohemi', 'DM Sans', sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          color: #333;
          line-height: 1.4;
          max-width: 400px;
          margin-left: 2%; /* Further reduced left margin */
          margin-bottom: 20px;
          z-index: 2;
        }

        .skills-header-container {
          height: 10vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 40px 40px;
          margin-bottom: 5vh;
        }

        .skills-subtitle {
          font-family: 'Nohemi', 'DM Sans', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .skills-title {
          font-family: 'Fraunces', serif;
          font-size: 34px;
          color: #FDFDFD;
          font-weight: 200;
          line-height: normal;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .skills-title-italic {
          margin-left: 64px;
          display: inline-block;
          font-style: italic;
          color: rgba(255,255,255,0.55);
        }

        @media (max-width: 768px) {
          .skill-card {
            height: auto;
            min-height: 250px;
            padding: 16px 16px 20px 16px;
          }
          .ghost-number {
            top: auto;
            bottom: -5%;
            transform: none;
            font-size: clamp(100px, 35vw, 160px);
          }
          .skill-title {
            max-width: 100%;
            font-size: clamp(32px, 10vw, 50px);
          }
          .skill-body {
            font-size: clamp(12px, 3.5vw, 15px);
            margin-left: 0;
            max-width: 90%;
            margin-bottom: 30px;
          }
          .skills-header-container {
            padding: 5px 20px 30px;
            height: auto;
          }
          .skills-title {
            font-size: 28px;
          }
          .skills-title-italic {
            margin-left: 20px;
          }
        }
      `}</style>

      {/* Dark Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-10 h-full opacity-40 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-full w-[1px] bg-white/25 relative"></div>
        ))}
      </div>

      {/* Intro Header */}
      <div className="skills-header-container">
        <p className="skills-subtitle">
          Strategy
        </p>
        <h1 className="skills-title">
          How I approach
          <br />
          <span className="skills-title-italic">every project?</span>
        </h1>
      </div>

      {/* Cards Scroll Flow */}
      <div style={{ position: "relative" }}>
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="skill-card"
            style={{
              background: card.bg,
              zIndex: 10 + i,
              marginBottom: i === CARDS.length - 1 ? "0px" : "50px", // No gap after the last card
            }}
          >
            {/* Ghost Number */}
            <div className="ghost-number">
              {card.id}
            </div>

            {/* Content */}
            <h2 className="skill-title">
              {card.title}
            </h2>

            <p className="skill-body">
              {card.body}
            </p>
          </div>
        ))}
      </div>


    </section>
  );
}
