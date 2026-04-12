"use client";

import React from "react";

export function FloatingHearts({ className = "" }: { className?: string }) {
  // Simple decorative floating hearts
  return (
    <div className={className} aria-hidden>
      <div
        style={{ position: "absolute", left: "10%", top: "20%", opacity: 0.9 }}
      >
        ❤️
      </div>
      <div
        style={{ position: "absolute", left: "60%", top: "40%", opacity: 0.7 }}
      >
        💗
      </div>
      <div
        style={{ position: "absolute", left: "30%", top: "70%", opacity: 0.8 }}
      >
        💕
      </div>
    </div>
  );
}

export default FloatingHearts;
