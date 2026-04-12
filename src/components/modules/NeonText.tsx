"use client";

interface NeonTextProps {
  className?: string;
  text?: string;
  prefix?: string;
  color?: string;
}

export function NeonText({
  className = "",
  text = "",
  prefix = "",
  color = "#FF2D7C",
}: NeonTextProps) {
  const glow = `0 0 7px ${color}, 0 0 14px ${color}, 0 0 28px ${color}, 0 0 56px ${color}80`;

  return (
    <div
      className={className}
      style={{ textShadow: glow, color }}
    >
      {prefix}
      {text}
    </div>
  );
}

export default NeonText;
