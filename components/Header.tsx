'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-dark-bg/85 border-b border-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo / Wordmark */}
          <a
            href="#overview"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-green-vivid rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform bg-dark-deep border border-green-vivid/30">
              <img src="/images/logo.png" alt="RevType Academy Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-text-primary">
                  RevType
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded bg-green-surface text-green-vivid border border-green-vivid/30">
                  Academy
                </span>
              </div>
              <span className="text-[10px] text-text-muted hidden sm:inline">
                Official Video Learning Guide
              </span>
            </div>
          </a>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <a
              href="https://revtype.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-text-primary bg-dark-card hover:bg-dark-hover border border-dark-border hover:border-green-vivid transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-vivid"
            >
              <span>Visit RevType</span>
              <ExternalLink className="w-3.5 h-3.5 text-green-vivid" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
