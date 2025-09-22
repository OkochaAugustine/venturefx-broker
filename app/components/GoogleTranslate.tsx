"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  useEffect(() => {
    (window as any).googleTranslateElementInit = function () {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );

        // Hide "Powered by Google" + unwanted logos
        const interval = setInterval(() => {
          const powered = document.querySelector(".goog-logo-link");
          const img = document.querySelector("#google_translate_element img");
          const banner = document.querySelector(".goog-te-banner-frame");

          if (powered) (powered as HTMLElement).style.display = "none";
          if (img) (img as HTMLElement).style.display = "none";
          if (banner) (banner as HTMLElement).style.display = "none"; // hide top banner
        }, 500);

        setTimeout(() => clearInterval(interval), 5000);
      }
    };
  }, []);

  return (
    <>
      {/* Google Translate script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Widget container — force inside navbar (top-right) */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          top: "2rem",
          right: "15rem",
          zIndex: 50,
        }}
      />

      {/* Styling */}
      <style jsx global>{`
        .goog-te-combo {
          background: linear-gradient(135deg, #4f46e5, #3b82f6);
          color: white !important;
          font-weight: bold;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          border: none !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        .goog-te-combo option {
          background-color: #4f46e5 !important;
          color: white !important;
        }
      `}</style>
    </>
  );
}


