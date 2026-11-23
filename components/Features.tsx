import React from 'react';
import { 
  CheckSquare, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  Wallet, 
  Megaphone,
  ArrowUpRight 
} from 'lucide-react';

export default function Features() {
  const learningTopics = [
    {
      title: 'Micro Tasks System',
      description:
        'Understand task guidelines, acceptance criteria, accurate completion techniques, and proof submissions to get your work approved reliably.',
      icon: CheckSquare,
      badge: 'Core Earning',
      link: 'https://revtype.com/help',
    },
    {
      title: 'Digital Marketplace',
      description:
        'Learn how digital products, templates, and services are cataloged, purchased, and delivered securely across the RevType marketplace ecosystem.',
      icon: ShoppingBag,
      badge: 'Commerce',
      link: 'https://revtype.com/',
    },
    {
      title: 'Academy & Courses',
      description:
        'Discover organized curriculum pathways to upskill yourself in freelancing, marketing, writing, and platform proficiency.',
      icon: GraduationCap,
      badge: 'Education',
      link: 'https://revtype.com/features/courses',
    },
    {
      title: 'Affiliate & Referrals',
      description:
        'Review the platform referral policies, link generation process, commission tracking rules, and sustainable community growth methods.',
      icon: Users,
      badge: 'Community',
      link: 'https://revtype.com/help',
    },
    {
      title: 'Wallet & Withdrawals',
      description:
        'Detailed overview of account balances, minimum withdrawal thresholds, supported payout options, and transparent processing timelines.',
      icon: Wallet,
      badge: 'Finance',
      link: 'https://revtype.com/help',
    },
    {
      title: 'Advertiser Suite',
      description:
        'How creators and business owners can launch micro-task campaigns, set parameters, allocate budgets, and verify completed submissions.',
      icon: Megaphone,
      badge: 'Advertiser',
      link: 'https://revtype.com/',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-card border border-dark-border text-green-vivid text-xs font-semibold tracking-wide">
            <span>Comprehensive Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            What You Will Learn in This Course
          </h2>
          <p className="text-base text-text-muted">
            Our structured video modules break down every major capability of revtype.com.
            Follow along on your own screen as we demonstrate real workflows.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col justify-between p-7 rounded-card-lg bg-dark-card border border-dark-border hover:border-green-vivid/40 transition-all duration-300 hover:-translate-y-1 group shadow-card"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-surface flex items-center justify-center text-green-vivid border border-green-vivid/20 group-hover:scale-105 transition-transform shadow-glow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-dark-deep border border-dark-border text-text-muted">
                      {topic.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-text-primary mb-2.5 group-hover:text-green-vivid transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Footer link to official docs */}
                <div className="pt-6 mt-6 border-t border-dark-border flex items-center justify-between">
                  <a
                    href={topic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-green-vivid transition-colors focus:outline-none focus:underline"
                  >
                    <span>Read official docs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] text-text-dim">Video module included</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
