/**
 * Font Configuration
 *
 * Self-hosted open-source fonts for the Bible Graph application.
 * Uses Next.js font optimization for automatic preloading and fallback metrics.
 */

import localFont from 'next/font/local';
import {
  Gowun_Batang,
  Song_Myung,
  Nanum_Pen_Script,
  Stylish,
  Kaushan_Script,
} from 'next/font/google';

/**
 * Source Serif 4 - Variable font for English verse text
 * Features: Optical sizing, old-style numerals
 */
export const sourceSerif = localFont({
  src: [
    {
      path: '../app/fonts/SourceSerif4Variable-Roman.woff2',
      weight: '200 900',
      style: 'normal',
    },
    {
      path: '../app/fonts/SourceSerif4Variable-Italic.woff2',
      weight: '200 900',
      style: 'italic',
    },
  ],
  variable: '--font-source-serif',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
});

/**
 * Noto Serif KR - Korean verse text
 * Harmonizes with Source Serif 4 for bilingual reading
 */
export const notoSerifKR = localFont({
  src: [
    {
      path: '../app/fonts/NotoSerifKR-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/NotoSerifKR-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-noto-serif-kr',
  display: 'swap',
  preload: false, // Lazy-load Korean fonts
  adjustFontFallback: false,
  fallback: ['Noto Serif KR', 'Nanum Myeongjo', 'serif'],
});

/**
 * IBM Plex Sans - Variable font for UI elements (English)
 * Compact, modern, technical elegance
 */
export const ibmPlexSans = localFont({
  src: '../app/fonts/IBMPlexSansVariable.woff2',
  variable: '--font-ibm-plex-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});

/**
 * Pretendard - Korean UI text
 * Popular open-source Korean font with excellent hinting
 */
export const pretendard = localFont({
  src: [
    {
      path: '../app/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Apple SD Gothic Neo',
    'Pretendard',
    'sans-serif',
  ],
});

export const gowunBatang = Gowun_Batang({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-gowun-batang',
  display: 'swap',
  preload: true,
});

export const songMyung = Song_Myung({
  weight: '400',
  variable: '--font-song-myung',
  display: 'swap',
});

export const nanumPenScript = Nanum_Pen_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nanum-pen-script',
  display: 'swap',
});

export const stylish = Stylish({
  weight: '400',
  variable: '--font-stylish',
  display: 'swap',
});

export const kaushanScript = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-kaushan-script',
  display: 'swap',
});
