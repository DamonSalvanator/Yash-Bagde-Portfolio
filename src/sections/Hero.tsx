import { useEffect, useRef } from "react";
import gsap from "gsap";
import Marquee from "@/components/Marquee";
import KeyboardHero from "./keyboard3d";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = ref.current!.querySelectorAll(".hero-line > div");
    gsap.fromTo(lines,
      { y: 100, opacity: 0, clipPath: "inset(0 0 100% 0)" },
      { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1, stagger: 0.15, ease: "expo.out", delay: 0.3 }
    );
    gsap.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" });
    gsap.to(".badge-circle", { rotation: 360, duration: 12, repeat: -1, ease: "none" });
  }, []);

  return (
    <section id="home" ref={ref} className="hero-section hero-bg-custom relative min-h-screen bg-ink text-white pt-40 pb-12 px-2 md:px-8 flex flex-col justify-between overflow-hidden">
      <style>{`
        @font-face {
          font-family: 'Thunder-LC';
          /* src: url('/fonts/Thunder-LC.woff2') format('woff2'); */
          font-weight: 800;
        }
        .hero-title {
          font-size: clamp(38px, 8.8vw, 128px);
        }
        @media (max-width: 1300px) {
          .hero-title {
            font-size: clamp(65px, 19vw, 120px);
            line-height: 0.95;
          }
        }
      `}</style>
      {/* Keyboard positioned as background */}
      <div className="absolute inset-0 z-0 hidden min-[1300px]:block">
        <KeyboardHero />
      </div>

      <div className="relative z-0 flex-1 flex flex-col justify-start pointer-events-none opacity-100 min-[1300px]:opacity-40 mt-12 min-[1300px]:mt-0 transition-opacity duration-500" style={{ transform: "translateY(-45px)" }}>
        <h1 className="leading-[0.95] text-white tracking-tight hero-title flex flex-col gap-[16px]" style={{ fontFamily: "'Thunder-LC', 'Anton', sans-serif", fontWeight: 800, wordSpacing: "0.15em" }}>
          <div className="hero-line overflow-hidden"><div>CREATIVE</div></div>
          <div className="hero-line overflow-hidden"><div className="flex items-center gap-6 md:gap-10 flex-nowrap">
            DEVELOPER <span className="inline-block rounded-full" style={{ width: 14, height: 14, background: "#2D2DFF" }} /> &amp;
          </div></div>
          <div className="hero-line overflow-hidden"><div>DESIGNER.</div></div>
        </h1>
        <p className="hero-sub mt-8 max-w-md font-body text-xs md:text-sm font-bold" style={{ color: "#ffffffff" }}>
          Crafting digital experiences that move people.
        </p>
      </div>

      <div className="relative z-20 flex items-end justify-between pointer-events-none mb-12">
        <div className="font-body text-[11px] uppercase tracking-[0.25em] text-white/60 max-w-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" /> Based anywhere — working everywhere.
          </div>
        </div>
        <div className="badge-circle w-28 h-28 md:w-36 md:h-36">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
            </defs>
            <text className="font-body fill-white font-bold" fontSize="13" letterSpacing="4">
              <textPath href="#circ">· AVAILABLE FOR WORK · SCROLL DOWN ·  · AVAILABLE FOR WORK · SCROLL DOWN ·</textPath>
            </text>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <Marquee items={["GSAP", "REACT", "NODE.JS", "MONGODB", "PYTHON", "AI/ML", "THREE.JS", "TAILWIND", "WEBFLOW"]} dark />
      </div>
    </section>
  );
}
