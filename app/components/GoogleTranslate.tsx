"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  useEffect(() => {
    // Initialize when script loads
    (window as any).googleTranslateElementInit = function () {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );

      // Hide "Powered by Google" after initialization
      const interval = setInterval(() => {
        const powered = document.querySelector(".goog-logo-link");
        const img = document.querySelector("#google_translate_element img");
        if (powered) (powered as HTMLElement).style.display = "none";
        if (img) (img as HTMLElement).style.display = "none";
      }, 500);

      // Stop checking after 5 seconds
      setTimeout(() => clearInterval(interval), 5000);
    };
  }, []);

  return (
    <>
      {/* Google Translate script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Widget container */}
      <div
        id="google_translate_element"
        className="p-2"
        style={{ position: "relative" }}
      />

      {/* Global styles for dropdown */}
      <style jsx global>{`
        /* Style the Google Translate dropdown */
        .goog-te-combo {
          background: linear-gradient(135deg, #4f46e5, #3b82f6);
          color: white !important;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          border: none !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: pulse 2s infinite;
        }

        .goog-te-combo:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
        }

        /* Remove white background in dropdown options */
        .goog-te-combo option {
          background-color: #4f46e5 !important;
          color: white !important;
        }

        /* Hover effect for options */
        .goog-te-combo option:hover {
          background-color: #3b82f6 !important;
          color: white !important;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </>
  );
}


