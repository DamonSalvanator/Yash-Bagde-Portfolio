import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };
      const tween = gsap.to(el, {
        xPercent: -50,
        duration: isMobile ? 40 : 40,
        ease: "none",
        repeat: -1,
      });
      return () => tween.kill();
    });

    return () => {
      mm.revert();
    };
  }, []);
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden border-y ${dark ? "border-white/15 text-white" : "border-ink/15 text-ink"} py-4`}>
      <div ref={ref} className="flex w-max whitespace-nowrap gap-12 font-display text-3xl tracking-wider">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="w-2 h-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
