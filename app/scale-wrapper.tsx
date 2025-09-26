"use client";

import { useEffect } from "react";

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function scaleApp() {
      const el = document.getElementById("scale-wrapper");
      if (!el) return;
      const designWidth = 1280;
      const currentWidth = window.innerWidth;

      if (currentWidth < designWidth) {
        const scale = currentWidth / designWidth;
        el.style.zoom = String(scale); // shrink only on mobile
        el.style.width = `${designWidth}px`; // keep base width for scaling
        el.style.margin = "0 auto"; // center it
      } else {
        el.style.zoom = "1"; // normal size
        el.style.width = "100%"; // take full width
        el.style.margin = "0"; // no auto margin
      }
    }

    scaleApp();
    window.addEventListener("resize", scaleApp);
    return () => window.removeEventListener("resize", scaleApp);
  }, []);

  return (
    <div id="scale-wrapper" className="bg-white min-h-screen">
      {children}
    </div>
  );
}
