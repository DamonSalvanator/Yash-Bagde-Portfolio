import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import ZoomTransition from "@/sections/ZoomTransition";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // hero is dark

  useEffect(() => {
    if (loading) return;
    // sections: hero(dark) about(light) services(dark) skills(dark) contact(light) footer(light)
    const triggers: ScrollTrigger[] = [];
    const setups: Array<{ id: string; theme: "light" | "dark" }> = [
      { id: "home", theme: "dark" },
      { id: "about", theme: "dark" },
      { id: "skills", theme: "dark" },
      { id: "zoom-transition", theme: "light" },
      { id: "services", theme: "light" },
      { id: "contact", theme: "light" },
      { id: "footer", theme: "dark" },
    ];
    setups.forEach(({ id, theme: t }) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(ScrollTrigger.create({
        trigger: el, start: "top 20%", end: "bottom 20%",
        onEnter: () => setTheme(t),
        onEnterBack: () => setTheme(t),
      }));
    });
    return () => triggers.forEach(t => t.kill());
  }, [loading]);

  return (
    <main className="relative bg-ink text-white z-0">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <CustomCursor theme={theme} />
      <Navbar theme={theme} />
      <Hero />
      <About />
      <Skills />
      <ZoomTransition />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
