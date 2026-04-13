"use client";

interface CountdownProps {
  targetDate?: string;
  className?: string;
}

export function Countdown({ targetDate, className = "" }: CountdownProps) {
  // Minimal placeholder countdown
  return (
    <div className={className}>{targetDate ? `Until ${targetDate}` : ""}</div>
  );
}

export default Countdown;
