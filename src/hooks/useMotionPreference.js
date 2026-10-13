import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const getSnapshot = () => window.matchMedia(query).matches;

// Keep live canvas and UI effects in sync when the OS preference changes.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
