"use client";

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
    <div className={className}>
      {prefix}
      {text}
    </div>
  );
}

export default StandardText;
