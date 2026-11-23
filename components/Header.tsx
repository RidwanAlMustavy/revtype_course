'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-dark-bg/85 border-b border-dark-border transition-colors">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-13">
          {/* Logo / Wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-glow-sm bg-dark-deep border border-green-vivid/30">
              <img src="/images/logo.png" alt="Earn Academy Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-text-primary">
                  Earn
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded bg-green-surface text-green-vivid border border-green-vivid/30">
                  Academy
                </span>
              </div>
              <span className="text-[10px] text-text-muted hidden sm:inline">
                Official Video Learning Guide
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
