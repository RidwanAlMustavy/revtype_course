import React from 'react';
import { UserCheck, Clock, Gauge, Film } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      title: 'Beginner Friendly',
      description: 'Zero prior experience required. Every step is clearly explained on screen.',
      icon: UserCheck,
    },
    {
      title: 'Watch Anytime',
      description: 'On-demand video lessons available 24/7 at your convenience.',
      icon: Clock,
    },
    {
      title: 'Learn at Your Pace',
      description: 'Pause, review, replay, and resume anytime with automatic progress saving.',
      icon: Gauge,
    },
    {
      title: 'Step-by-Step Videos',
      description: 'Practical walkthroughs showing exactly how platform features operate.',
      icon: Film,
    },
  ];

  return (
    <section className="py-12 bg-dark-deep border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-card bg-dark-card border border-dark-border hover:border-green-vivid/40 transition-all duration-200 hover:-translate-y-1 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-green-surface flex items-center justify-center text-green-vivid mb-4 border border-green-vivid/20 group-hover:scale-105 transition-transform shadow-glow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-text-primary mb-2">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
