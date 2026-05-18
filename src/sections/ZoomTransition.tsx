import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./Services";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const plusContainerRef = useRef<HTMLDivElement>(null);
  const mainZoomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that triggers on the spacer
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom bottom", // Focused only on the zoom and reveal over 100vh
          scrub: 1.5,
        }
      });

      // Set to dark cursor theme initially (black background)
      tl.set(sectionRef.current, { attr: { "data-cursor-theme": "dark" } }, 0);

      // 1. Moderate zoom for the entire block to get the motion started
      tl.to(mainZoomRef.current, {
        scale: 2,
        ease: "power2.inOut",
        duration: 2,
        force3D: false,
      }, 0);

      // 2. Aggressive zoom for the Plus sign to go "inside" it
      // This creates a parallax effect where the plus grows much faster than the text
      tl.to(plusContainerRef.current, {
        scale: 100,
        ease: "power4.in",
        duration: 2,
        force3D: false,
      }, 0);

      // 3. Move text away horizontally while zooming
      tl.to(".zoom-text-left", {
        x: -500,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
      }, 0);

      tl.to(".zoom-text-right", {
        x: 500,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
      }, 0);

      // 3. Fade in the white content seamlessly 
      // The background is now solid white because of the zoomed +
      tl.to(contentRef.current, {
        opacity: 1,
        duration: 0.1,
      }, "-=0.2");

      // Switch to light cursor theme once white screen reveals
      tl.set(sectionRef.current, { attr: { "data-cursor-theme": "light" } }, "-=0.2");

      // 5. Reveal Grid Lines (scale Y from 0 to 1)
      tl.fromTo(".zoom-grid-line",
        { scaleY: 0 },
        { scaleY: 1, stagger: 0.1, duration: 1.5, ease: "power3.inOut" }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="zoom-transition"
        ref={sectionRef}
        className="sticky top-0 w-full h-screen bg-[#111111] overflow-hidden"
        style={{ zIndex: 0 }}
        data-cursor-theme="dark"
      >
        <style>{`
        @font-face {
          font-family: 'Thunder-LC';
          /* src: url('/fonts/Thunder-LC.woff2') format('woff2'); */
          font-weight: 100;
        }
      `}</style>
        <div className="w-full h-full flex items-center justify-center">
          {/* Dark Initial Screen */}
          <div className="absolute inset-0 flex items-center justify-center z-10">

            {/* Dark Grid Background */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-10 h-full opacity-40">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-white/25 relative"></div>
              ))}
            </div>

            {/* Big Text with zooming + */}
            <div
              ref={mainZoomRef}
              style={{
                fontFamily: "'Thunder-LC', 'Anton', sans-serif",
                fontWeight: 800
              }}
              className="text-white text-[16vw] md:text-[7.6vw] uppercase flex flex-col md:flex-row items-center justify-center gap-[2vw] md:gap-[4vw] z-20 w-full px-4 whitespace-nowrap will-change-transform"
            >
              {/* We specifically target these spans so the + logo is NOT affected by the fade out */}
              <span className="zoom-text-left inline-block flex-shrink-0 scale-y-[2] [backface-visibility:hidden] [transform:translateZ(0)] antialiased" style={{ textRendering: "optimizeLegibility" }}>DESIGN</span>

              {/* The zooming Plus Logo - Using SVG for maximum sharpness */}
              <div
                ref={plusContainerRef}
                className="relative flex items-center justify-center flex-shrink-0 [backface-visibility:hidden] [transform:translateZ(0)] w-[16vw] h-[16vw] md:w-[7vw] md:h-[7vw]"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full fill-white"
                  style={{ shapeRendering: "crispEdges" }}
                >
                  {/* Vertical line */}
                  <rect x="37.5" y="0" width="25" height="100" />
                  {/* Horizontal line */}
                  <rect x="0" y="37.5" width="100" height="25" />
                </svg>
              </div>

              <span className="zoom-text-right inline-block flex-shrink-0 scale-y-[2] [backface-visibility:hidden] [transform:translateZ(0)] antialiased" style={{ textRendering: "optimizeLegibility" }}>DEVELOPMENT</span>
            </div>
          </div>

          {/* The White Screen Reveal */}
          <div
            ref={contentRef}
            className="absolute inset-0 bg-[#FDFDFD] z-20 opacity-0"
          >
            {/* Vertical Grid Background */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-10 h-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-full w-[1px] relative flex justify-center">
                  <div className="zoom-grid-line absolute top-0 w-full h-full bg-black/15 origin-top"></div>
                  <span className="absolute top-10 text-black/40 text-[12px] font-body">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Spacer to allow scroll for animation before Services overlaps */}
      <div ref={triggerRef} className="w-full h-screen pointer-events-none"></div>
    </>
  );
}
