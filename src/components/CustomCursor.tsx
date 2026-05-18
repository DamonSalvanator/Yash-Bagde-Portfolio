import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor({ theme }: { theme: "light" | "dark" }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"default" | "link" | "view">("default");
  const [localTheme, setLocalTheme] = useState<"light" | "dark">(theme);

  // Avoid stale hook closure bugs in the mount useEffect event listeners
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
    setLocalTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const move = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power3.out" });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power3.out" });

      // Find the element currently under the mouse to check for active theme overrides
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const themedEl = el.closest("[data-cursor-theme]");
        if (themedEl) {
          const targetTheme = themedEl.getAttribute("data-cursor-theme") as "light" | "dark";
          setLocalTheme(targetTheme);
          return;
        }

        // Auto-invert cursor to white when hovering over black/dark text in a light section
        if (themeRef.current === "light") {
          const tagName = el.tagName.toLowerCase();
          const isTextTag = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "span", "li", "strong", "em", "button", "label"].includes(tagName);
          if (isTextTag) {
            const style = window.getComputedStyle(el);
            const color = style.color;
            // Matches #111111 (rgb(17, 17, 17)), #000 (rgb(0, 0, 0)), and other dark text colors
            if (color.includes("rgb(17,") || color.includes("rgb(0,") || color === "black" || color === "#111111" || color.includes("rgb(10,")) {
              setLocalTheme("dark"); // white cursor over dark text!
              return;
            }
          }
        }
      }

      // Fallback to active scroll-trigger theme
      setLocalTheme(themeRef.current);
    };
    window.addEventListener("mousemove", move);

    const linkEnter = () => setMode("link");
    const viewEnter = () => setMode("view");
    const leave = () => setMode("default");

    const handleThemeEnterOrLight = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const targetTheme = target.getAttribute("data-cursor-theme") || (target.classList.contains("skill-card") ? "light" : "dark");
      setLocalTheme(targetTheme as "light" | "dark");
    };

    const handleThemeLeave = () => {
      setLocalTheme(themeRef.current);
    };

    const bind = () => {
      document.querySelectorAll("a, button, input, textarea").forEach(n => {
        n.addEventListener("mouseenter", linkEnter);
        n.addEventListener("mouseleave", leave);
      });
      document.querySelectorAll("[data-cursor='view']").forEach(n => {
        n.addEventListener("mouseenter", viewEnter);
        n.addEventListener("mouseleave", leave);
      });
      // Attach hover listeners for light cards inside dark sections
      document.querySelectorAll(".skill-card, [data-cursor-theme]").forEach(n => {
        n.addEventListener("mouseenter", handleThemeEnterOrLight);
        n.addEventListener("mouseleave", handleThemeLeave);
      });
    };
    const t = setTimeout(bind, 500);
    return () => { window.removeEventListener("mousemove", move); clearTimeout(t); };
  }, []);

  const isLight = localTheme === "light";

  const ringStyle: React.CSSProperties = {
    width: mode === "view" ? 120 : mode === "link" ? 70 : 40,
    height: mode === "view" ? 120 : mode === "link" ? 70 : 40,
    border: isLight ? `1px solid rgba(17, 17, 17, 0.8)` : `1px solid white`,
    background: "transparent",
    transition: "width .3s, height .3s, background .3s, border-color .3s, color .3s",
    mixBlendMode: isLight ? "normal" : "difference",
  };

  const dotStyle: React.CSSProperties = {
    width: 12,
    height: 12,
    background: isLight ? "#111111" : "white",
    transform: "translate(-50%,-50%)",
    mixBlendMode: isLight ? "normal" : "difference",
    transition: "background-color .3s",
  };

  return (
    <>
      <div ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full hidden md:flex items-center justify-center font-body uppercase tracking-widest"
        style={{ ...ringStyle, transform: "translate(-50%,-50%)", color: isLight ? "#111111" : "white", fontSize: 11 }}
      >
        {mode === "view" ? "VIEW" : ""}
      </div>
      <div ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full hidden md:block"
        style={dotStyle}
      />
    </>
  );
}
