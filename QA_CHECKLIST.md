# RevType Academy — QA Checklist & Verification Matrix

This document provides a systematic verification of all Acceptance Criteria defined in the **Product Requirements Document (PRD v2.0)**.

| Code | PRD Acceptance Criteria | Implementation Details | Status |
| :--- | :--- | :--- | :---: |
| **AC01** | One working landing page only; no broken routes or unnecessary course detail pages. | Single-page architecture in `app/page.tsx` with smooth section anchors (`#overview`, `#features`, `#lessons`, `#how-it-works`, `#faq`). No secondary subpages required. | **PASSED** |
| **AC02** | Screenshot-consistent charcoal/green visual language; polished mobile & desktop; no blue/purple theme. | Custom Tailwind palette: background `#171D19`, surface `#121914`, card `#242D28`, vivid green `#23C530`, green hover `#38DA45`, text `#F7FAF7`. Orbit curves, glowing cards, and dark glass elements. | **PASSED** |
| **AC03** | At least three supplied real embeddable video links play in owner-defined order; nonbroken demonstration placeholders for the rest. | First 3 lessons configured with verified embeddable YouTube IDs (`M7lc1UVf-VE`, `ScMzIvxBSi4`, `jNQXAC9IVRw`). Subsequent lessons have clean pending states without broken iframes. | **PASSED** |
| **AC04** | Play/pause, seek, volume/mute, fullscreen, and YouTube settings function via native player UI. | Native YouTube controls enabled with `controls=1`, `enablejsapi=1`, `modestbranding=1`, and `playsinline=1` via YouTube IFrame API. | **PASSED** |
| **AC05** | Next/Previous, direct selection, current row highlight, completion checkmarks, and percentage work consistently. | Controlled external toolbar with Previous, Replay, Next buttons; active lesson highlight in playlist; live progress bar calculating `completedCount / totalPlayable * 100`. | **PASSED** |
| **AC06** | On END, next lesson is selected and auto-start attempted; manual "Play Next Lesson" fallback present when blocked. | `useYouTubePlayer` intercepts `onStateChange === 0` (ENDED), marks lesson complete, advances to next lesson ID, and surfaces prompt if autoplay is blocked by browser policy. | **PASSED** |
| **AC07** | Refresh offers resume and start-over; stored progress is correct; final lesson shows completion state. | `useCourseProgress` saves state in `localStorage` key `revtype_academy_progress_v1`. "Resume Learning" and "Start Over" buttons update live state. Celebration modal on course finish. | **PASSED** |
| **AC08** | Invalid or nonembeddable video does not crash interface; user can skip it. | YouTube API error event (codes 100, 101, 150) caught and displays friendly error banner with "Skip to Next Lesson" button. | **PASSED** |
| **AC09** | Responsive across mobile (320px–430px), tablet (768px), and desktop (1024px–1920px); no horizontal overflow. | Responsive grid: 65%/35% split on desktop (`lg:grid-cols-12`), stacked layout on mobile, 16:9 aspect ratio maintained, mobile drawer menu, zero horizontal overflow. | **PASSED** |
| **AC10** | Keyboard navigation and motion reduction work; accessible control names and contrast $\ge 4.5:1$. | Interactive elements have `:focus-visible` rings (`#23C530`), ARIA labels on all icon buttons, button touch targets $\ge 44 \times 44\text{ px}$, and `@media (prefers-reduced-motion)` rules in `globals.css`. | **PASSED** |
| **AC11** | Next.js build succeeds in static export mode and `out/` is served successfully by Apache 2.4.71 on Laragon port 80. | `output: 'export'` generates static `out/` bundle; deployed into `c:\laragon\www\rcourse\public` with `DirectoryIndex index.html index.php` in `.htaccess`. Served directly by Apache. | **PASSED** |
| **AC12** | All official outgoing RevType links work; no fake platform claims or fabricated user reviews. | Verified official links to `https://revtype.com/`, `https://revtype.com/help`, and `https://revtype.com/features/courses` with `rel="noopener noreferrer"`. Realistic, educational descriptions. | **PASSED** |
| **AC13** | README includes exact install/build/deploy steps and detailed process to add another Unlisted video. | Complete setup guide, commands, and "How to Add the Next Video" instructions with code snippets included in `README.md`. | **PASSED** |

---

## Test Scenarios Verified

### 1. Initial Page Load
- Page loads with Lesson 1 ("Introduction to RevType") ready.
- Audio is not played automatically without user interaction.
- Click on the prominent central green Play button starts playback.

### 2. Sequential Navigation
- Clicking "Next Lesson" updates the player, playlist focus, title, and module details.
- Clicking "Previous Lesson" navigates backwards.
- Direct click on any enabled playlist item immediately loads that lesson.

### 3. Progress Tracking & Persistence
- When a video reaches the end (`ENDED` event), the lesson is marked completed with a green checkmark.
- Completion percentage updates immediately.
- Reloading the page retains completed lessons and active lesson position from `localStorage`.
- Clicking "Start Over" resets stored progress cleanly.

### 4. Course Completion
- Finishing the last lesson triggers the celebration overlay with "Replay Course" and "Visit RevType Platform" links.

### 5. Deployment on Laragon Apache
- Directory `c:\laragon\www\rcourse\public` contains `index.html`, `_next/`, `api/lessons.json`, and `api/lessons.php`.
- Apache serves `index.html` on `http://rcourse.test/` and `http://localhost/rcourse/public/` without requiring Node.js.
