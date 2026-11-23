import { Lesson } from '@/lib/course';

/**
 * RevType Academy Lesson Catalog
 * 
 * Configured with authentic RevType tutorial videos.
 */
export const LESSONS: Lesson[] = [
  {
    id: 'lesson-01-manual-signup',
    order: 1,
    title: 'Manual Signup Guide',
    description:
      'Learn how to register manually on RevType using email and password, verify credentials, and complete initial onboarding.',
    youtubeId: 'fHV3KFYbE3k',
    module: 'Getting Started',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'RevType Registration', url: 'https://revtype.com/' },
      { title: 'Official Help Center', url: 'https://revtype.com/help' },
    ],
  },
  {
    id: 'lesson-02-google-signup',
    order: 2,
    title: 'Google One-Click Signup',
    description:
      'A quick and secure onboarding walkthrough using Google Authentication to create and connect your RevType account instantly.',
    youtubeId: 'Ad8dskLXB2Y',
    module: 'Getting Started',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Account Security Guide', url: 'https://revtype.com/help' },
    ],
  },
  {
    id: 'lesson-03-revtype-tour',
    order: 3,
    title: 'RevType Platform Tour',
    description:
      'A complete visual walkthrough of the RevType platform interface, exploring the main dashboard, active feeds, menus, and feature hubs.',
    youtubeId: 'cw3SjZrzhFQ',
    module: 'Getting Started',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Dashboard Overview', url: 'https://revtype.com/' },
    ],
  },
  {
    id: 'lesson-04-referrals',
    order: 4,
    title: 'Referrals & Affiliate Program',
    description:
      'Learn how to find and share your referral link, invite new members, track your community growth, and understand commission payouts.',
    youtubeId: 'gwIwlAZDS4c',
    module: 'Referral Program',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Referral Policy', url: 'https://revtype.com/help' },
    ],
  },
  {
    id: 'lesson-05-social-task-pinterest',
    order: 5,
    title: 'Social Task: Pinterest Walkthrough',
    description:
      'Step-by-step instructions on selecting, completing, and submitting accurate proof for Pinterest social engagement tasks.',
    youtubeId: 'CtFHdjbDzYs',
    module: 'Micro Tasks & Earning',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Task Guidelines', url: 'https://revtype.com/help' },
    ],
  },
  {
    id: 'lesson-06-social-task-facebook-x',
    order: 6,
    title: 'Social Task: Facebook & X (Twitter)',
    description:
      'How to complete micro tasks for Facebook and X (Twitter) properly, following strict verification rules and screenshot proof uploads.',
    youtubeId: 'XFDvk5vxE5k',
    module: 'Micro Tasks & Earning',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Task Proof Guidelines', url: 'https://revtype.com/help' },
    ],
  },
  {
    id: 'lesson-07-read-article-task',
    order: 7,
    title: 'Read Article Task Guide',
    description:
      'Learn how to complete reading and browsing tasks, adhere to required reading duration, and verify your submission successfully.',
    youtubeId: 'OAL2prhb1zM',
    module: 'Micro Tasks & Earning',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Reading Tasks FAQ', url: 'https://revtype.com/help' },
    ],
  },
  {
    id: 'lesson-08-games',
    order: 8,
    title: 'Playing & Earning with Games',
    description:
      'Discover gaming opportunities on RevType: explore available games, understand point mechanics, and track your gameplay earnings.',
    youtubeId: 'pprh3GHMk5Q',
    module: 'Entertainment & Games',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Games Hub', url: 'https://revtype.com/' },
    ],
  },
  {
    id: 'lesson-09-wallet',
    order: 9,
    title: 'Wallet, Balances & Withdrawals',
    description:
      'Everything you need to know about checking your account balance, minimum withdrawal thresholds, supported payout options, and timelines.',
    youtubeId: 'lvCp0_YVL8o',
    module: 'Wallet & Payouts',
    durationLabel: 'Shorts',
    enabled: true,
    resources: [
      { title: 'Withdrawal Rules', url: 'https://revtype.com/help' },
    ],
  },
];
