'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CourseSection from '@/components/CourseSection';
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

        {/* Section E: Primary Video Course Player & Playlist */}
        <CourseSection />
      </main>

      {/* Section I: Footer */}
      <Footer />
    </div>
  );
}
