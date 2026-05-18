import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  {
    name: "WEB DESIGNS",
    num: "01",
    tilt: -6,
    cardSide: "right" as const,
    card: (
      <video
        src="/image/videos/webdesign.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    name: "WEBFLOW",
    num: "02",
    tilt: 8,
    cardSide: "left" as const,
    card: (
      <video
        src="/image/videos/webflow.mp4.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    name: "UI UX",
    num: "03",
    tilt: -5,
    cardSide: "right" as const,
    card: (
      <video
        src="/image/videos/UIUX.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    name: "3D WEBSITES",
    num: "04",
    tilt: 9,
    cardSide: "left" as const,
    card: (
      <video
        src="/image/videos/3d website.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    name: "FULL STACK DEV",
    num: "05",
    tilt: -7,
    cardSide: "right" as const,
    card: (
      <video
        src="/image/videos/fullstack.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
];

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const leaveTimers = useRef<(ReturnType<typeof setTimeout> | null)[]>(
    Array(CLIENTS.length).fill(null)
  );
  const mounted = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text stays in normal position initially, no mount animations needed.
    textRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transform = "translateY(0%)";
    });
  }, []);

  const handleEnter = useCallback((i: number) => {
    setHoveredIdx(i);
    if (leaveTimers.current[i]) {
      clearTimeout(leaveTimers.current[i]!);
      leaveTimers.current[i] = null;
    }
    const el = textRefs.current[i];
    if (!el) return;
    el.style.transition = "transform 0.28s cubic-bezier(0.55,0,1,0.45)";
    el.style.transform = "translateY(-110%)";
    setTimeout(() => {
      if (!el) return;
      el.style.transition = "none";
      el.style.transform = "translateY(110%)";
      void el.offsetHeight;
      el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "translateY(0%)";
    }, 280);
  }, []);

  const handleLeave = useCallback((i: number) => {
    setHoveredIdx(null);
    if (leaveTimers.current[i]) {
      clearTimeout(leaveTimers.current[i]!);
      leaveTimers.current[i] = null;
    }
    const el = textRefs.current[i];
    if (!el) return;
    el.style.transition = "transform 0.28s cubic-bezier(0.55,0,1,0.45)";
    el.style.transform = "translateY(110%)";
    leaveTimers.current[i] = setTimeout(() => {
      if (!el) return;
      el.style.transition = "none";
      el.style.transform = "translateY(-110%)";
      void el.offsetHeight;
      el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "translateY(0%)";
      leaveTimers.current[i] = null;
    }, 280);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="no-scrollbar"
      style={{
        background: "transparent",
        minHeight: "100vh",
        paddingTop: "0",
        paddingBottom: "18vh",
        fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div ref={contentRef}>
        <style>{`
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
      `}</style>



        <div className="services-header-container">
          <p className="services-subtitle">
            Expertise
          </p>
          <h1 className="services-title">
            Core offerings &
            <br />
            <span className="services-title-italic">Services</span>
          </h1>
        </div>

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&display=swap');

        .services-header-container {
          height: 20vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 40px 10px;
          margin-bottom: 2vh;
          margin-top: 0;
        }

        .services-subtitle {
          font-family: 'Nohemi', 'DM Sans', sans-serif;
          font-size: 10px;
          color: #111111;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .services-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          color: #111111;
          font-weight: 200;
          line-height: normal;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .services-title-italic {
          margin-left: 64px;
          display: inline-block;
          font-style: italic;
          color: rgba(17, 17, 17, 0.55);
        }

        #services .ag-item {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.4rem 0;
          cursor: pointer;
        }

        #services .ag-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          padding: 1.8rem 0;
          transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        #services .ag-item:hover {
          padding-left: 1.2rem;
          background: rgba(0,0,0,0.015);
        }

        #services .ag-num {
          font-size: 0.75rem;
          font-weight: 500;
          color: #111111;
          letter-spacing: 0.05em;
          margin-right: 2.2rem;
          align-self: flex-start;
          margin-top: 0.8rem;
          flex-shrink: 0;
          position: relative;
          z-index: 3;
          font-family: 'Nohemi', sans-serif;
        }

        #services .ag-text-wrap {
          overflow: hidden;
          line-height: 1.1;
          position: relative;
          z-index: 3;
        }

        #services .ag-text {
          font-size: clamp(2.35rem, 6.37vw, 5.68rem);
          font-weight: 100;
          color: #111111;
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: -0.015em;
          font-family: 'Thunder-LC', 'Anton', sans-serif;
          display: block;
          will-change: transform;
          transition: color 0.3s ease;
        }

        #services .ag-item:hover .ag-text {
          color: #000;
        }

        #services .ag-card {
          position: absolute;
          width: 360px;
          height: 204px;
          border-radius: 6px;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
          transition:
            transform 0.6s cubic-bezier(0.16,1,0.3,1),
            opacity 0.45s ease;
          will-change: transform, opacity;
          top: 50%;
          margin-top: -102px;
        }

        #services .ag-card-left  { right: 95%; left: auto; }
        #services .ag-card-right { left: 95%; right: auto; }

        @media (max-width: 768px) {
          .services-header-container {
            padding: 0 20px 10px;
          }
          .services-title {
            font-size: 28px;
          }
          .services-title-italic {
            margin-left: 20px;
          }
          #services .ag-item {
            padding: 1.2rem 0;
          }
          #services .ag-num {
            margin-right: 1.2rem;
          }
          #services .ag-card {
            width: 260px;
            height: 148px;
            margin-top: -74px;
            left: 50% !important;
            right: auto !important;
            margin-left: -130px;
            pointer-events: none;
          }
        }
      `}</style>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {CLIENTS.map((client, i) => {
            const isHovered = hoveredIdx === i;
            const cardRest = `translateY(55px) rotate(${client.tilt}deg)`;
            const cardHover = `translateY(-35px) rotate(${client.tilt}deg)`;

            return (
              <div
                key={client.name}
                className="ag-item"
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                <span className="ag-num">{client.num}</span>

                <div className="ag-text-wrap">
                  <span
                    className="ag-text"
                    ref={(el) => { textRefs.current[i] = el; }}
                  >
                    {client.name}
                  </span>
                </div>

                <div
                  className={`ag-card ag-card-${client.cardSide}`}
                  style={{
                    transform: isHovered ? cardHover : cardRest,
                    opacity: isHovered ? 1 : 0,
                    top: i === 0 ? "70%" : "50%",
                  }}
                >
                  {client.card}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Bottom Horizontal Divider */}
      <div style={{
        width: "100%",
        height: "1px",
        background: "rgba(0,0,0,0.15)",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 5
      }} />
    </section>
  );
}