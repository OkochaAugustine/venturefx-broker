"use client";

import { useEffect } from "react";

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function scaleApp() {
      const el = document.getElementById("scale-wrapper");
      if (!el) return;
      const scaleX = window.innerWidth / el.scrollWidth;
      const scaleY = window.innerHeight / el.scrollHeight;
      const scale = Math.min(scaleX, scaleY);
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = "top center";
      el.style.width = el.scrollWidth + "px";
      el.style.height = el.scrollHeight + "px";
    }

    window.addEventListener("resize", scaleApp);
    scaleApp(); // run once on mount

    return () => window.removeEventListener("resize", scaleApp);
  }, []);

  return (
    <div id="scale-wrapper" className="min-h-screen flex flex-col w-full">
      {children}
    </div>
  );
}
