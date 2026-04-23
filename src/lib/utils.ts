import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes with ease.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * AI Studio Proxy for Gemini API
 */
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;
export const getGemini = () => {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set.");
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }
  return aiInstance;
};
