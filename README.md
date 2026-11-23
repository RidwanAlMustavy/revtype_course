# RevType Academy

> **Official Step-by-Step Video Learning Platform for [revtype.com](https://revtype.com/)**  
> Responsive single-page course landing page built with **Next.js App Router (Static Export)**, **React 19**, **TypeScript**, and **Tailwind CSS**, hosted on **Laragon Apache (Windows, port 80)**.

---

## 1. Project Overview

RevType Academy is a single-page, responsive, step-by-step video learning website explaining how [revtype.com](https://revtype.com/) operates. Visitors can watch an ordered curriculum of owner-supplied YouTube Unlisted lessons directly in an integrated player with client-side progress tracking, seamless playlist navigation, and auto-resume.

### Visual Design System (GreenBank-Inspired)
- **Background**: `#171D19` (Dark charcoal)
- **Deep Surface**: `#121914`
- **Raised Card**: `#242D28`
- **Subtle Border**: `#334139`
- **Vivid Green (Accent & CTAs)**: `#23C530`
- **Green Hover**: `#38DA45`
- **Primary Text**: `#F7FAF7`
- **Muted Text**: `#ADB8B0`
- **Radius**: `14px` to `22px` rounded cards
- **Accents**: Glowing badges, thin curved orbit lines, floating platform cards.

---

## 2. Technology Stack

- **Framework**: Next.js 15 (App Router with `output: 'export'`)
- **UI Library**: React 19 + TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Video Integration**: YouTube IFrame Player API (client-side dynamic loader)
- **Local Storage**: Client-side progress tracking (completed lessons, last playback time, active lesson)
- **Hosting Environment**: Laragon v8.9.0, Apache 2.4.71 (port 80), PHP 8.3.37 TS (Windows)

---

## 3. Project File Structure

```
revtype-academy/
├── app/
│   ├── layout.tsx         # Root layout with SEO metadata & viewport settings
│   ├── page.tsx           # Single-page layout assembling all sections
│   └── globals.css        # Tailwind directives, theme variables, scrollbars & a11y
├── components/
│   ├── Header.tsx         # Top nav with wordmark, section links & mobile drawer
│   ├── Hero.tsx           # Screenshot-inspired hero with headline & floating card
│   ├── Benefits.tsx       # Quick learning benefits strip (4 feature promises)
│   ├── Features.tsx       # "What you will learn" 6-card feature grid
│   ├── CourseSection.tsx  # PRIMARY SECTION: coordinates player, progress & playlist
│   ├── CourseProgress.tsx # Progress bar, completion stats, resume & reset buttons
│   ├── YouTubePlayer.tsx  # Responsive 16:9 player, native controls, prev/next, fallback
│   ├── LessonPlaylist.tsx # Module groupings, order, active state, checkmarks
│   ├── HowItWorks.tsx     # 4-stage platform process overview
│   ├── Faq.tsx            # Accessible accordion answering common questions
│   └── Footer.tsx         # Brand info, outgoing links, legal & YouTube disclaimer
├── data/
│   └── lessons.ts         # Central catalog of all course lessons
├── hooks/
│   ├── useYouTubePlayer.ts  # Client-side YouTube Iframe API lifecycle & controls
│   └── useCourseProgress.ts # LocalStorage state persistence & completion logic
├── lib/
│   ├── course.ts          # Lesson data types, stats calculation & navigation helpers
│   └── youtube.ts         # YouTube URL regex parser & embed URL generator
├── public/
│   ├── api/
│   │   ├── lessons.json   # Static JSON feed of all lessons
│   │   └── lessons.php    # Lightweight PHP 8.3 REST API with CORS headers
│   └── images/            # Static assets
├── next.config.ts         # output: 'export', unoptimized images, trailingSlash
├── tailwind.config.ts     # Dark charcoal and vivid green custom palette
├── tsconfig.json          # Strict TypeScript configuration
├── package.json           # Dependencies and build/deploy scripts
├── README.md              # Project documentation and video insertion guide
└── QA_CHECKLIST.md        # Comprehensive quality assurance matrix
```

---

## 4. Local Development

### Prerequisites
- Node.js `v20+` or `v26+` and npm
- Windows PowerShell

### Running the Development Server
```powershell
# Navigate into the project directory
cd c:\laragon\www\rcourse\revtype-academy

# Install dependencies (if not already installed)
npm install

# Start Next.js local development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to test live changes.

---

## 5. Production Build & Laragon Apache Deployment

Because the project is configured with `output: 'export'`, running `next build` outputs static HTML, JS, and CSS files to the `out/` folder. Apache on Laragon serves these static files directly without needing Node.js to be running.

### One-Command Build and Deploy
```powershell
cd c:\laragon\www\rcourse\revtype-academy
npm run deploy
```
This runs `next build` and automatically copies the static bundle into `c:\laragon\www\rcourse\public` (the Apache virtual host document root).

### Accessing the Live Site in Laragon
- Virtual Host URL: **[http://rcourse.test/](http://rcourse.test/)**
- Direct Localhost URL: **[http://localhost/rcourse/public/](http://localhost/rcourse/public/)**
- Optional PHP 8.3 API: **[http://rcourse.test/api/lessons.php](http://rcourse.test/api/lessons.php)**

---

## 6. How to Add the Next Video (Owner Guide)

Whenever you have a new Unlisted YouTube video to add or replace:

### Step 1: Open `data/lessons.ts`
Locate the lesson object you wish to update in `c:\laragon\www\rcourse\revtype-academy\data\lessons.ts`.

### Step 2: Paste Your YouTube URL or ID
Replace the `youtubeId` with your Unlisted video link (the parser supports standard watch links, youtu.be, shorts, embeds, or bare IDs). Set `enabled: true` and specify the duration:

```typescript
{
  id: 'lesson-04-micro-tasks',
  order: 4,
  title: 'Micro Tasks: How to Choose & Complete',
  description: 'Understand micro task requirements, instructions, and proof submissions.',
  youtubeId: 'https://youtu.be/YOUR_UNLISTED_ID', // <--- Paste your YouTube URL or 11-char ID
  module: 'Core Features',
  durationLabel: '06:30', // <--- Set lesson duration
  enabled: true,          // <--- Enable the lesson
  resources: [
    { title: 'Task Guidelines', url: 'https://revtype.com/help' }
  ],
}
```

### Step 3: Deploy the Change
Run the deploy command in PowerShell:
```powershell
cd c:\laragon\www\rcourse\revtype-academy
npm run deploy
```
Refresh **[http://rcourse.test/](http://rcourse.test/)** in your browser. The new video will immediately appear in the playlist and player.

---

## 7. Key Features Implemented

1. **YouTube Iframe Player API**:
   - Clean client-side dynamic script injection without duplicate loading.
   - Native player controls exposed: timeline scrubbing, volume, playback speed, captions, fullscreen.
   - Autoplay on initial load disabled by default (FR01 compliance).
   - Autoplay fallback prompt (`Play Next Lesson`) if browser autoplay restrictions block advancing automatically (FR05).
2. **Accessible Controls**:
   - Touch targets $\ge 44 \times 44\text{ px}$.
   - External Previous, Next, and Replay buttons.
   - Keyboard accessible navigation and full screenreader labeling.
3. **Local Progress Persistence**:
   - Tracks completed lesson IDs and playback position in `localStorage`.
   - "Resume Learning" and "Start Over" actions available on page load.
   - Progress bar with percentage and checkmarks on completed items.
4. **Resilient Error & Completed States**:
   - Friendly skip prompt if a YouTube video is unavailable or restricted.
   - Course completion celebration banner with "Replay Course" and "Visit RevType" actions upon finishing the last lesson.
5. **Completely Static**:
   - 100% exportable to pure HTML/CSS/JS.
   - Requires zero Node server runtime on Laragon Apache.
