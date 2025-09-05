// components/KitePointer.tsx
import React from "react";

type Direction = "up" | "down" | "left" | "right";

interface KitePointerProps {
  size?: number; // px
  color?: string; // fill color
  direction?: Direction; // arrow pointing direction
  stroke?: string; // optional border color
  strokeWidth?: number; // border width
  className?: string; // extra classes (e.g., shadows)
}

export function KitePointer({
  size = 16,
  color = "currentColor",
  direction = "up",
  stroke,
  strokeWidth = 1.5,
  className,
}: KitePointerProps) {
  const rotation = { up: 0, right: 90, down: 180, left: 270 }[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation">
      {/* Kite (diamond) shape */}
      <path
        d="M12 2 L19 12 L12 22 L5 12 Z"
        fill={color}
        stroke={stroke ?? "none"}
        strokeWidth={stroke ? strokeWidth : 0}
      />
    </svg>
  );
}

// // Right-pointing blue pointer with soft shadow
// <KitePointer
//   direction="right"
//   size={18}
//   color="#2563eb"
//   className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
// />

// // As a tooltip arrow
// <div className="relative bg-white rounded-md p-3 shadow-md">
//   <KitePointer
//     direction="down"
//     size={14}
//     color="#ffffff"
//     stroke="rgba(0,0,0,0.08)"
//     className="absolute -top-2 left-6"
//   />
//   Tooltip content…
// </div>
