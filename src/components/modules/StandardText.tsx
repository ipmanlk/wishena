"use client";

import React from "react";

interface StandardTextProps {
  className?: string;
  text?: string;
  prefix?: string;
}

export function StandardText({
  className = "",
  text = "",
  prefix = "",
}: StandardTextProps) {
  return (
    <div className={className} style={{ color: "#333" }}>
      {prefix}
      {text}
    </div>
  );
}

export default StandardText;
