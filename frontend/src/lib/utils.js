import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullname) {
  if (!fullname || typeof fullname !== "string") {
    return "";
  }

  return fullname
    .trim()
    .split(/\s+/) // Split by any whitespace (handles multiple spaces)
    .filter((name) => name.length > 0) // Remove empty strings
    .slice(0, 2) // Take only first 2 names (first + last)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
}

export function formatMongoDate(createdAt) {
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now - date;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let relativeTime;

  if (seconds < 60) relativeTime = "just now";
  else if (minutes < 60)
    relativeTime = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  else if (hours < 24)
    relativeTime = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  else if (days < 7) relativeTime = `${days} day${days !== 1 ? "s" : ""} ago`;
  else if (weeks < 5)
    relativeTime = `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  else if (months < 12)
    relativeTime = `${months} month${months !== 1 ? "s" : ""} ago`;
  else relativeTime = `${years} year${years !== 1 ? "s" : ""} ago`;

  // Time formatting (10:44 AM)
  let hours12 = date.getHours();
  const minutesStr = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours12 >= 12 ? "PM" : "AM";
  hours12 = hours12 % 12 || 12;

  const timeString = `${hours12}:${minutesStr} ${ampm}`;

  return {
    relative: relativeTime,
    time: timeString,
    full: `${relativeTime} at ${timeString}`,
  };
}
