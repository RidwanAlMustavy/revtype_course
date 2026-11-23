import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-deep border-t border-dark-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shadow-glow-sm bg-dark-deep border border-green-vivid/30">
                <img src="/images/logo.png" alt="RevType Academy" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-text-primary">
                  RevType
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-green-surface text-green-vivid border border-green-vivid/30">
                  Academy
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed">
              Official video learning companion for revtype.com.
              Learn how to navigate micro tasks, digital marketplaces, courses, and platform features safely.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <a href="#overview" className="hover:text-green-vivid transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#lessons" className="hover:text-green-vivid transition-colors">
                  Video Lessons
                </a>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Official RevType Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-text-muted">
              <li>
                <a
                  href="https://revtype.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-green-vivid transition-colors"
                >
                  <span>RevType Homepage</span>
                  <ExternalLink className="w-3 h-3 text-text-dim" />
                </a>
              </li>
              <li>
                <a
                  href="https://revtype.com/help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-green-vivid transition-colors"
                >
                  <span>Help & Knowledge Base</span>
                  <ExternalLink className="w-3 h-3 text-text-dim" />
                </a>
              </li>
              <li>
                <a
                  href="https://revtype.com/features/courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-green-vivid transition-colors"
                >
                  <span>RevType Courses Platform</span>
                  <ExternalLink className="w-3 h-3 text-text-dim" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-dark-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-dim">
          <p>© {currentYear} RevType Academy. All rights reserved.</p>
          <p>Designed for responsive desktop and mobile devices.</p>
        </div>

      </div>
    </footer>
  );
}
