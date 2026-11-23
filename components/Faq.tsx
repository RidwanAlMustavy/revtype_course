'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ExternalLink } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is RevType Academy?',
      answer:
        'RevType Academy is a free, dedicated single-page video learning portal designed to explain how revtype.com operates. It features step-by-step video tutorials covering account setup, micro tasks, the digital marketplace, structured courses, referral features, and wallet withdrawals.',
    },
    {
      question: 'Is my course progress saved if I close my browser?',
      answer:
        'Yes! Your progress (including completed lessons and current position) is safely stored in your browser local storage on your device. When you revisit the page, you can choose "Resume Learning" or "Start Over" at any time.',
    },
    {
      question: 'What should I do if a video fails to play or shows an error?',
      answer:
        'If a video is temporarily unavailable, region-restricted, or still processing on YouTube, our player displays a helpful prompt allowing you to immediately skip to the next lesson without breaking the learning experience.',
    },
    {
      question: 'How do I contact official RevType support?',
      answer:
        'For account inquiries, payout assistance, or task disputes, please visit the official RevType Help Center at https://revtype.com/help or reach out to official support channels on the main website.',
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-card border border-dark-border text-green-vivid text-xs font-semibold tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-text-muted">
            Clear answers about using this learning platform, video playback, and RevType essentials.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-card bg-dark-card border border-dark-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-green-vivid"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-text-primary">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-dark-deep flex items-center justify-center text-green-vivid shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-green-surface' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-text-muted leading-relaxed border-t border-dark-border/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Help Callout */}
        <div className="mt-12 p-6 rounded-card bg-dark-deep border border-dark-border text-center space-y-3">
          <h4 className="text-sm font-bold text-text-primary">
            Still need assistance with your RevType account?
          </h4>
          <p className="text-xs text-text-muted max-w-lg mx-auto">
            Browse official tutorials, policies, and ticketing systems on the main support desk.
          </p>
          <div>
            <a
              href="https://revtype.com/help"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-green-vivid hover:text-green-hover transition-colors"
            >
              <span>Visit Official Help Desk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
