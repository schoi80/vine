import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import {
  sourceSerif,
  notoSerifKR,
  ibmPlexSans,
  pretendard,
  gowunBatang,
  songMyung,
  nanumPenScript,
  stylish,
  kaushanScript,
} from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'in the vine',
  description: 'Explore the Bible with contextual insights into people, places, and events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${notoSerifKR.variable} ${ibmPlexSans.variable} ${pretendard.variable} ${gowunBatang.variable} ${songMyung.variable} ${nanumPenScript.variable} ${stylish.variable} ${kaushanScript.variable}`}
    >
      <body className="h-screen overflow-hidden font-sans antialiased">
        <Providers>
          <div className="flex h-full flex-col">
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
