'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import CourseSection from '@/components/CourseSection';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg selection:bg-green-vivid selection:text-dark-deep">
      {/* Top Navigation */}
      <Header />

      {/* Main Single Page Content */}
      <main id="main-content" className="flex-1">
        {/* Section B: Hero */}
        <Hero />

        {/* Section C: Quick Learning Benefits Strip */}
        <Benefits />

        {/* Section D: What You Will Learn */}
        <Features />

        {/* Section E: Primary Video Course Player & Playlist */}
        <CourseSection />

        {/* Section F: How RevType Works */}
        <HowItWorks />

        {/* Section H: FAQ */}
        <Faq />
      </main>

      {/* Section I: Footer */}
      <Footer />
    </div>
  );
}
