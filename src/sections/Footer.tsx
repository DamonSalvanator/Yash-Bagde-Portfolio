import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Inject Sofia Sans Condensed once ──
if (typeof document !== "undefined" && !document.getElementById("sofia-font")) {
  const link = document.createElement("link");
  link.id = "sofia-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:wght@700&display=swap";
  document.head.appendChild(link);
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const brandContainer = useRef<HTMLDivElement>(null);
  const emailContainer = useRef<HTMLHeadingElement>(null);
  const subtitleContainer = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  const name = "YASH BAGDE";

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour12: false });
    setTime(fmt());
    const tick = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const nameChars = brandContainer.current?.querySelectorAll(".char");
    if (nameChars) {
      gsap.fromTo(
        nameChars,
        { y: "105%" },
        {
          y: "0%",
          ease: "power3.out",
          stagger: {
            amount: 0.55,
            from: "center",
          },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );
    }

    const emailEl = emailContainer.current?.querySelector(".email-content");
    if (emailEl) {
      gsap.fromTo(
        emailEl,
        { y: "200%" },
        {
          y: "0%",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }

    const subEl = subtitleContainer.current?.querySelector(".sub-content");
    if (subEl) {
      gsap.fromTo(
        subEl,
        { y: "105%" },
        {
          y: "0%",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }

    // Curtain Reveal Effect (Native GSAP Pin for zero jitter)
    if (ref.current && innerRef.current) {
      ScrollTrigger.create({
        trigger: ref.current,
        pin: innerRef.current,
        start: "top bottom",
        end: "+=99999", // Keep pinned indefinitely while at the bottom
        pinSpacing: false, // Don't add extra scroll space
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const navCol = ["HOME", "ABOUT", "APPROACH", "SERVICES", "CONTACT"];
  const socialRight = [
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/yash-bagde-182b14358" },
    { label: "GITHUB", url: "https://github.com/DamonSalvanator" }
  ];

  const go = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    const id = label.toLowerCase() === "approach" ? "skills" : label.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative w-full"
      style={{ zIndex: 1 }}
    >
      <div
        ref={innerRef}
        className="w-full pt-24 pb-4 overflow-hidden"
        style={{
          background: "#111111",
          color: "white",
          transform: "translateY(-100%)",
          willChange: "transform"
        }}
      >
        {/* ── Top Layout ── */}
        <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-12 gap-4">
          <div className="col-span-4 font-mono text-[11px] space-y-4 uppercase tracking-tighter">
            {navCol.map((l) => (
              <div key={l}>
                <a
                  href={`#${l.toLowerCase() === "approach" ? "skills" : l.toLowerCase()}`}
                  onClick={(e) => go(e, l)}
                  className="hover:opacity-40 transition-opacity"
                >
                  {l}
                </a>
              </div>
            ))}
          </div>

          <div className="col-span-8 flex flex-col items-end">
            <div
              className="overflow-hidden mb-10"
              style={{ height: "5.4vw", paddingTop: "0.25vw" }}
            >
              <h2
                ref={emailContainer}
                className="text-[3.8vw] font-medium tracking-tighter leading-none"
              >
                <span className="email-content inline-block will-change-transform">
                  yashbagde2004july@gmail.com
                </span>
              </h2>
            </div>

            <div className="flex gap-8 font-mono text-[11px] uppercase">
              {socialRight.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-white pb-1 flex items-center gap-1 hover:opacity-50 transition-opacity"
                >
                  {s.label} <span className="text-[10px] transform -rotate-45">→</span>
                </a>
              ))}
            </div>
            <div className="mt-8 text-right text-[10px] leading-tight text-white uppercase tracking-widest font-medium">
              Based in India <br />
              Available for Freelance
            </div>
          </div>
        </div>

        {/* ── BIG NAME ── */}
        <div
          ref={brandContainer}
          className="mt-4 px-6 w-full select-none"
          style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        >
          <h1
            className="flex justify-center w-full uppercase"
            style={{
              fontFamily: "'Sofia Sans Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "17.5vw",
              lineHeight: 1,
              // FIX: positive letter spacing so letters breathe (was -0.04em)
              letterSpacing: "0.01em",
            }}
          >
            {name.split("").map((char, index) => (
              <span
                key={index}
                className="relative inline-block overflow-hidden"
                style={{
                  // FIX: pad ALL four sides so overflow-hidden never clips glyphs.
                  // Top 0.15em catches ascenders, bottom 0.15em catches descenders.
                  // Negative margins cancel the extra space so letters stay visually flush.
                  paddingTop: "0.15em",
                  paddingBottom: "0.15em",
                  marginTop: "-0.15em",
                  marginBottom: "-0.15em",
                }}
              >
                <span
                  className="char inline-block will-change-transform"
                  style={{ paddingRight: char === " " ? "0.25em" : "0" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h1>

          <div
            ref={subtitleContainer}
            className="overflow-hidden mt-4 text-center"
          >
            <p className="sub-content inline-block text-[1.2vw] font-mono tracking-[0.4em] uppercase">
              Full Stack Developer
            </p>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="px-10 mt-2 flex justify-between items-center font-mono text-[9px] uppercase">
          <div>© 2026 YASH BAGDE</div>
          <div>
            <span>Local Time / {time}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}