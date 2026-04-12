"use client";

import React from "react";

interface NeonTextProps {
  className?: string;
  text?: string;
  prefix?: string;
}

export function NeonText({
  className = "",
  text = "",
  prefix = "",
}: NeonTextProps) {
  return (
    <div
      className={className}
      style={{ textShadow: "0 0 12px rgba(236,72,153,0.7)" }}
    >
      {prefix}
      {text}
    </div>
  );
}

export default NeonText;
