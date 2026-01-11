'use client';

import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer footer-center absolute right-0 bottom-0 left-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-6 backdrop-blur-xs">
      <aside className="flex flex-col">
        <p className="text-sm text-white/70 font-medium">Built for the love of God</p>
        <div className="flex items-center">
          <a
            href="https://github.com/schoi80/vine"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm gap-2 text-white/70"
          >
            <Github size={18} />
            <span>vine</span>
          </a>
          <a
            href="https://github.com/schoi80/vine-graph"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm gap-2 text-white/70"
          >
            <Github size={18} />
            <span>vine-graph</span>
          </a>
        </div>
      </aside>
    </footer>
  );
}
