"use client";

import React from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Just return children (no i18next)
  return <>{children}</>;
}

