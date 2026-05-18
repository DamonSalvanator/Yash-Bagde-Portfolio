import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

const skills = [
  "REACT", "NODE.JS", "MONGODB", "EXPRESS", "PYTHON",
  "GSAP", "HTML", "CSS", "JAVASCRIPT",
  "TAILWIND", "BOOTSTRAP", "NEXT.JS", "REDUX",
  "REST API", "GIT", "FIGMA", "THREE.JS", "ML / AI",
  "TENSORFLOW", "PYTORCH", "NUMPY", "PANDAS",
  "SCIKIT", "FIREBASE", "MYSQL",
  "FRAMER", "WEBFLOW", "SASS", "VITE",
];

const WORDS = skills.map(s => s + " · ").join("").repeat(5);

// ─── spiral constants ──────────────────────────────────────────────────────────
const TURNS = 3;       // number of full rotations
const TOTAL_RAD = TURNS * 2 * Math.PI;

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const spiral = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  const [spiralConfig] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return { R_START: 155, R_END: 35, CHAR_ARC: 10 };
      } else if (window.innerWidth < 768) {
        return { R_START: 180, R_END: 45, CHAR_ARC: 10.5 };
      }
    }
    return { R_START: 215, R_END: 80, CHAR_ARC: 11 };
  });

  // Pre-compute one position per character using arc-length integration.
  // At each step: dθ = CHAR_ARC / r(θ)  →  uniform spacing along the curve.
  const positions = useMemo(() => {
    const { R_START, R_END, CHAR_ARC } = spiralConfig;
    const pts: { theta: number; r: number }[] = [];
    let theta = 0;
    while (theta < TOTAL_RAD) {
      const r = R_START - (theta / TOTAL_RAD) * (R_START - R_END);
      pts.push({ theta, r });
      theta += CHAR_ARC / r;
    }
    return pts;
  }, [spiralConfig]);

  const chars = useMemo(
    () => WORDS.split("").slice(0, positions.length),
    [positions]
  );

  useEffect(() => {
    // Disable scroll and interaction while loading
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    document.body.style.userSelect = "none";

    const letters = spiral.current!.querySelectorAll("span");
    gsap.fromTo(letters, { opacity: 0 }, {
      opacity: 1,
      stagger: 0.006,
      duration: 1.0,
    });
    gsap.to(spiral.current, {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 3.8,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(counter.v)),
      onComplete: () => {
        gsap.to(root.current, {
          x: "-100%",
          duration: 1.5,
          ease: "expo.inOut",
          delay: 0.2,
          onComplete: () => {
            // Re-enable scroll and interaction
            document.body.style.overflow = "";
            document.body.style.pointerEvents = "";
            document.body.style.userSelect = "";
            onDone();
          },
        });
      },
    });

    return () => {
      // Cleanup in case of sudden unmount
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      document.body.style.userSelect = "";
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10001] bg-cream flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center">
        <div ref={spiral} className="absolute inset-0">
          {chars.map((ch, i) => {
            const { theta, r } = positions[i];

            // Convert polar to cartesian
            // Start from top (−π/2) and go clockwise
            const angle = theta - Math.PI / 2;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;

            // The tangent direction for a clockwise Archimedean spiral.
            // Tangent angle = spiral angle + 90° (clockwise tangent)
            // We add a small dr/dθ correction for the inward drift, but
            // for visual purposes the pure tangent works well.
            const drDtheta = -(spiralConfig.R_START - spiralConfig.R_END) / TOTAL_RAD;
            // atan2 of tangent vector: d(r·cosθ)/dθ, d(r·sinθ)/dθ
            const tx = drDtheta * Math.cos(angle) - r * Math.sin(angle);
            const ty = drDtheta * Math.sin(angle) + r * Math.cos(angle);
            const tangentDeg = (Math.atan2(ty, tx) * 180) / Math.PI;

            return (
              <span
                key={i}
                className="absolute text-ink font-body text-[11px] opacity-0"
                style={{
                  left: `calc(50% + ${x.toFixed(3)}px)`,
                  top: `calc(50% + ${y.toFixed(3)}px)`,
                  transform: `rotate(${tangentDeg.toFixed(3)}deg)`,
                  transformOrigin: "0 0",
                  whiteSpace: "nowrap",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        <div className="font-body text-ink text-sm md:text-base tabular-nums">{pct}%</div>
      </div>
    </div>
  );
}
