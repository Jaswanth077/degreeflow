import React from "react";

export default function Avatar({ name, size = "default", className = "" }) {
  // Get initials for avatar
  const getAvatarInitials = () => {
    if (!name) return "ST";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    default: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-base",
  };

  const resolvedSizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] font-bold text-[#0B0B14] ${resolvedSizeClass} ${className}`}
    >
      {getAvatarInitials()}
    </div>
  );
}
