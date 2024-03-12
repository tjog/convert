import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nameof = <T>(name: keyof T) => name;

export function toMinutesAndSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return { minutes, seconds };
}