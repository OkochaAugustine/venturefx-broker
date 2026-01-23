"use client";

import { useEffect } from "react";

export default function ScaleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    function adjustLayout() {
      const el = document.getElementById("scale-wrapper");
      if (!el) return;

      // ✅ Remove all zoom, use full width
      el.style.zoom = "0";
      el.style.width = "100%";
      el.style.margin = "0 auto";
    }

    adjustLayout();
    window.addEventListener("resize", adjustLayout);
    return () => window.removeEventListener("resize", adjustLayout);
  }, []);

  return (
    <div
      id="scale-wrapper"
      className="
        bg-white min-h-screen w-full
        text-base font-normal
      "
    >
      {children}
    </div>
  );
}
