import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateRange(startDate: string, endDate?: string | null) {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })

  if (!endDate) {
    return `${start} - Present`
  }

  const end = new Date(endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })

  return `${start} - ${end}`
}
