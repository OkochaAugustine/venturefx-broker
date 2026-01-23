"use client";

import { useEffect } from "react";

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function adjustLayout() {
      const el = document.getElementById("scale-wrapper");
      if (!el) return;

      // Always use full width, no zoom
      el.style.zoom = "1";
      el.style.width = "100%";
      el.style.margin = "0 auto"; // center content
    }

    adjustLayout();
    window.addEventListener("resize", adjustLayout);
    return () => window.removeEventListener("resize", adjustLayout);
  }, []);

  return (
    <div
      id="scale-wrapper"
      className="bg-white min-h-screen w-full"
    >
      {children}
    </div>
  );
}
