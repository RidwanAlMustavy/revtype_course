'use client';

import React from 'react';
import { Play, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Compass, Award } from 'lucide-react';

export default function Hero() {
  const scrollToLessons = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('lessons');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className="relative overflow-hidden pt-8 pb-8 lg:pt-16 lg:pb-10">
      {/* Background radial glow & aesthetic curves inspired by reference */}
      <div
        className="absolute top-1/4 right-5 w-96 h-96 bg-green-vivid/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-10 w-72 h-72 bg-green-vivid/5 rounded-full blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Decorative subtle orbit ring */}
      <div
        className="absolute top-12 right-1/4 w-[600px] h-[600px] rounded-full border border-green-vivid/5 pointer-events-none -z-10 hidden xl:block"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-card border border-green-vivid/30 text-green-vivid text-xs font-semibold tracking-wide shadow-glow-sm">
              <span className="w-2 h-2 rounded-full bg-green-vivid inline-block animate-pulse" />
              <span>Official RevType Learning Guide</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.12]">
              Learn RevType.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-vivid via-green-hover to-text-primary">
                Step by Step.
              </span>
            </h1>

            {/* Concise Benefit Copy */}
            <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
              Explore how revtype.com operates through an organized series of video walkthroughs.
              Master micro tasks, understand marketplace digital products, explore structured courses,
              and navigate wallet payouts with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#lessons"
                onClick={scrollToLessons}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-base font-bold text-dark-deep bg-green-vivid hover:bg-green-hover transition-all duration-200 shadow-glow-md hover:shadow-glow-lg focus:outline-none focus:ring-4 focus:ring-green-vivid/40"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Learning Now</span>
              </a>

              <a
                href="https://revtype.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-text-primary bg-dark-card hover:bg-dark-hover border border-dark-border hover:border-green-vivid transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-vivid"
              >
                <span>Explore RevType</span>
                <ArrowRight className="w-4 h-4 text-green-vivid" />
              </a>
            </div>

            {/* Trust and Key Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-dark-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-vivid shrink-0" />
                <span className="text-xs text-text-muted font-medium">100% Free Tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-vivid shrink-0" />
                <span className="text-xs text-text-muted font-medium">Progress Auto-Saved</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-green-vivid shrink-0" />
                <span className="text-xs text-text-muted font-medium">No Account Needed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Glowing Platform Mockup */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-vivid/20 to-transparent rounded-card-lg blur-2xl -z-10" />

              {/* Main Floating Platform Preview Card */}
              <div className="relative rounded-card-lg bg-dark-card/90 border border-dark-border backdrop-blur-xl p-6 shadow-card space-y-5">
                
                {/* Header of Mock Card with new Logo */}
                <div className="flex items-center justify-between pb-4 border-b border-dark-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md overflow-hidden bg-dark-deep border border-green-vivid/30 flex items-center justify-center">
                      <img src="/images/logo.png" alt="RevType" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-text-primary">
                      RevType Platform Hub
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-green-vivid bg-green-surface px-2 py-0.5 rounded-full border border-green-vivid/20">
                    Live Demo View
                  </span>
                </div>

                {/* Sub-Card 1: Micro Tasks Preview */}
                <div className="p-4 rounded-xl bg-dark-deep/80 border border-dark-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-muted">Active Module</span>
                    <span className="text-xs font-semibold text-green-vivid">Micro Tasks</span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">
                    Browsing & Submitting Work
                  </p>
                  <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-vivid h-full rounded-full w-2/3" />
                  </div>
                </div>

                {/* Sub-Card 2: Feature Quick Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-dark-deep/80 border border-dark-border space-y-1">
                    <div className="flex items-center gap-1.5 text-green-vivid">
                      <Compass className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Digital Market</span>
                    </div>
                    <p className="text-xs text-text-muted">Verified digital goods</p>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-deep/80 border border-dark-border space-y-1">
                    <div className="flex items-center gap-1.5 text-green-vivid">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Secure Wallet</span>
                    </div>
                    <p className="text-xs text-text-muted">Transparent payouts</p>
                  </div>
                </div>

                {/* Floating Accent Tag */}
                <div className="pt-2 flex items-center justify-between text-xs text-text-dim">
                  <span>Structured Curriculum</span>
                  <span className="flex items-center gap-1 text-green-vivid font-medium">
                    <Award className="w-3.5 h-3.5" />
                    9 Video Lessons
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
