import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-deep border-t border-dark-border py-8">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-glow-sm bg-dark-deep border border-green-vivid/30">
              <img src="/images/logo.png" alt="Earn Academy" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-text-primary">
                Earn
              </span>
              <span className="text-xs uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-green-surface text-green-vivid border border-green-vivid/30">
                Academy
              </span>
            </div>
            <span className="text-xs text-text-muted hidden sm:inline ml-2">
              • Step-by-Step Video Learning Platform
            </span>
          </div>

          {/* Quick Navigation */}
          <div>
            <a href="#lessons" className="text-xs text-text-muted hover:text-green-vivid transition-colors">
              Video Lessons
            </a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-dark-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-dim">
          <p>© {currentYear} Earn Academy. All rights reserved.</p>
          <p>Designed for responsive desktop and mobile devices.</p>
        </div>

      </div>
    </footer>
  );
}
