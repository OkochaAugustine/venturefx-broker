"use client";

import { useEffect } from "react";

export default function ScaleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    function scaleApp() {
      const el = document.getElementById("scale-wrapper");
      if (!el) return;
      const designWidth = 1280; // 👈 your desktop design width
      const scale = window.innerWidth / designWidth;
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = "top left";
      el.style.width = `${designWidth}px`;
    }
    scaleApp();
    window.addEventListener("resize", scaleApp);
    return () => window.removeEventListener("resize", scaleApp);
  }, []);

  return (
    <div id="scale-wrapper" className="min-h-screen bg-white">
      {children}
    </div>
  );
}
