'use client';

import React, { useMemo, useCallback } from 'react';
import { LESSONS } from '@/data/lessons';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';
import { getNextLesson, getPreviousLesson } from '@/lib/course';
import CourseProgress from './CourseProgress';
import YouTubePlayer from './YouTubePlayer';
import LessonPlaylist from './LessonPlaylist';
import { Video, Sparkles, BookOpen, Clock } from 'lucide-react';

export default function CourseSection() {
  const {
    currentLessonId,
    completedLessonIds,
    lastPlaybackTime,
    stats,
    hasSavedProgress,
    setCurrentLesson,
    markCompleted,
    savePlaybackTime,
    resumeProgress,
    resetProgress,
  } = useCourseProgress(LESSONS);

  // Active lesson object
  const currentLesson = useMemo(() => {
    return LESSONS.find((l) => l.id === currentLessonId) || null;
  }, [currentLessonId]);

  // Next and previous playable lessons
  const nextLesson = useMemo(() => {
    return currentLesson ? getNextLesson(LESSONS, currentLesson.id) : null;
  }, [currentLesson]);

  const previousLesson = useMemo(() => {
    return currentLesson ? getPreviousLesson(LESSONS, currentLesson.id) : null;
  }, [currentLesson]);

  // Handle video completion
  const handleVideoEnded = useCallback(() => {
    if (currentLesson) {
      markCompleted(currentLesson.id);
      if (nextLesson) {
        setCurrentLesson(nextLesson.id);
      }
    }
  }, [currentLesson, nextLesson, markCompleted, setCurrentLesson]);

  // Setup YouTube player hook
  const player = useYouTubePlayer({
    videoId: currentLesson?.youtubeId || null,
    containerId: 'youtube-player-mount',
    initialStartTime: lastPlaybackTime,
    onEnded: handleVideoEnded,
  });

  // Replay entire course action
  const handleReplayCourse = useCallback(() => {
    resetProgress();
    const first = LESSONS.find((l) => l.enabled && Boolean(l.youtubeId.trim()));
    if (first) {
      setCurrentLesson(first.id);
    }
  }, [resetProgress, setCurrentLesson]);

  return (
    <section id="lessons" className="pt-3 pb-12 lg:pt-4 lg:pb-16 bg-dark-bg relative">
      <span id="overview" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
              RevType Video Masterclass
            </h2>
            <span className="text-[11px] font-semibold text-green-vivid bg-green-surface px-2.5 py-0.5 rounded-full border border-green-vivid/30">
              Official Lessons
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-muted">
            Watch each lesson in sequence. Your progress is automatically saved as you learn.
          </p>
        </div>

        {/* Empty State Guard if 0 Playable Lessons (PRD Section 5) */}
        {stats.playableLessons === 0 ? (
          <div className="rounded-card-lg bg-dark-card border border-dark-border p-12 text-center space-y-5 max-w-2xl mx-auto shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-green-surface text-green-vivid flex items-center justify-center mx-auto border border-green-vivid/20 shadow-glow-sm">
              <Clock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-text-primary">
                Lessons Coming Soon
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                The course author is uploading unlisted YouTube video tutorials for RevType.
                Please check back soon, or visit the official RevType documentation.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://revtype.com/help"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-dark-deep bg-green-vivid hover:bg-green-hover transition-colors shadow-glow-sm"
              >
                <span>Read Help Center Docs</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* Progress Bar & Actions Strip */}
            <CourseProgress
              stats={stats}
              hasSavedProgress={hasSavedProgress}
              onResume={resumeProgress}
              onReset={resetProgress}
            />

            {/* Main Interactive Grid: Video Player (65%) & Playlist (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left / Top: Video Player & Details (approx 65% width) */}
              <div className="lg:col-span-8 w-full">
                <YouTubePlayer
                  currentLesson={currentLesson}
                  previousLesson={previousLesson}
                  nextLesson={nextLesson}
                  player={player}
                  isCompleted={stats.isCompleted}
                  onSelectLesson={setCurrentLesson}
                  onReplayCourse={handleReplayCourse}
                />
              </div>

              {/* Right / Bottom: Lesson Playlist (approx 35% width) */}
              <div className="lg:col-span-4 w-full">
                <LessonPlaylist
                  lessons={LESSONS}
                  currentLessonId={currentLessonId}
                  completedLessonIds={completedLessonIds}
                  onSelectLesson={setCurrentLesson}
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
