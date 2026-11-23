import React from 'react';
import { UserPlus, Search, CheckCircle, CreditCard, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description:
        'Register on revtype.com with your verified email and password. Configure two-factor authentication to secure your profile.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Choose Tasks or Products',
      description:
        'Browse the active micro-task feed, review requirements, or explore curated digital products and educational tracks.',
      icon: Search,
    },
    {
      step: '03',
      title: 'Complete & Submit Proof',
      description:
        'Execute the required task steps carefully. Upload specified screenshots, URLs, or text proofs for administrative review.',
      icon: CheckCircle,
    },
    {
      step: '04',
      title: 'Review Balance & Withdraw',
      description:
        'Track verified earnings credited to your wallet balance. Request payouts through supported methods once minimum threshold is reached.',
      icon: CreditCard,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-dark-deep border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-card border border-dark-border text-green-vivid text-xs font-semibold tracking-wide">
            <span>Simplified Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            How RevType Works
          </h2>
          <p className="text-base text-text-muted">
            A clear four-stage roadmap explaining how users engage with tasks, marketplace offerings, and platform rewards.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative p-7 rounded-card-lg bg-dark-card border border-dark-border hover:border-green-vivid/40 transition-all duration-300 group shadow-card flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-vivid to-text-dim">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-green-surface flex items-center justify-center text-green-vivid border border-green-vivid/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-green-vivid transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-dark-border flex items-center text-[11px] text-green-vivid font-medium">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Reminder */}
        <div className="mt-12 p-4 rounded-xl bg-dark-card border border-dark-border max-w-2xl mx-auto text-center text-xs text-text-muted">
          Note: Always review task terms and guidelines on the official RevType platform before starting any task.
        </div>

      </div>
    </section>
  );
}
