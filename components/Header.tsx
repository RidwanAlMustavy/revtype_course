'use client';

import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Video Lessons', href: '#lessons' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-dark-bg/85 border-b border-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Wordmark */}
          <a
            href="#overview"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-green-vivid rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform bg-dark-deep border border-green-vivid/30">
              <img src="/images/logo.png" alt="RevType Academy Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-text-primary">
                  RevType
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-green-surface text-green-vivid border border-green-vivid/30">
                  Academy
                </span>
              </div>
              <span className="text-[11px] text-text-muted hidden sm:inline">
                Official Video Learning Guide
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-green-vivid transition-colors focus:outline-none focus:ring-2 focus:ring-green-vivid rounded-md px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://revtype.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-text-primary bg-dark-card hover:bg-dark-hover border border-dark-border hover:border-green-vivid transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-vivid"
            >
              <span>Visit RevType</span>
              <ExternalLink className="w-4 h-4 text-green-vivid" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-green-vivid"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-dark-border bg-dark-bg/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-base font-medium text-text-muted hover:text-green-vivid hover:bg-dark-card transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-dark-border">
            <a
              href="https://revtype.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-text-primary bg-dark-card border border-dark-border hover:border-green-vivid transition-colors"
            >
              <span>Visit RevType</span>
              <ExternalLink className="w-4 h-4 text-green-vivid" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
