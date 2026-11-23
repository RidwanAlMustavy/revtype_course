'use client';

import React, { useMemo, useCallback } from 'react';
import { LESSONS } from '@/data/lessons';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';
import { getNextLesson, getPreviousLesson } from '@/lib/course';
import YouTubePlayer from './YouTubePlayer';
import LessonPlaylist from './LessonPlaylist';
import { Video, Sparkles, BookOpen, Clock, PlayCircle, RotateCcw } from 'lucide-react';

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
    <section id="lessons" className="pt-2 pb-8 lg:pt-2.5 lg:pb-12 bg-dark-bg relative">
      <span id="overview" className="sr-only" />
      <div className="max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8">
        
        {/* Unified Top Action & Progress Bar */}
        <div className="rounded-xl bg-dark-card border border-dark-border px-3.5 py-2 shadow-sm mb-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Title & Badge */}
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-text-primary tracking-tight">
              Earn Video Masterclass
            </h2>
            <span className="text-[10px] font-semibold text-green-vivid bg-green-surface px-2 py-0.5 rounded-full border border-green-vivid/30 hidden sm:inline-block">
              Official Lessons
            </span>
          </div>

          {/* Right: Progress & Controls */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-text-primary">
                {stats.completedCount}/{stats.playableLessons}
              </span>
              <span className="text-[10px] text-text-muted hidden sm:inline">({stats.completionPercentage}%)</span>
              <div
                role="progressbar"
                aria-valuenow={stats.completionPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course completion progress"
                className="w-20 sm:w-32 h-1.5 rounded-full bg-dark-deep border border-dark-border overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-green-vivid to-green-hover transition-all duration-500 rounded-full"
                  style={{ width: `${stats.completionPercentage}%` }}
                />
              </div>
            </div>

            {hasSavedProgress && !stats.isCompleted && (
              <button
                type="button"
                onClick={resumeProgress}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-dark-deep bg-green-vivid hover:bg-green-hover transition-colors shadow-glow-sm"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            {stats.completedCount > 0 && (
              <button
                type="button"
                onClick={resetProgress}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-text-muted hover:text-text-primary bg-dark-deep hover:bg-dark-hover border border-dark-border transition-colors"
                title="Reset all progress stored on this device"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
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
                The course author is uploading video tutorials.
                Please check back soon for updates.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Main Interactive Grid: Video Player (65%) & Playlist (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-4 items-start">
              
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
