'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Lesson, CourseStats, calculateCourseStats } from '@/lib/course';

const STORAGE_KEY = 'earn_academy_progress_v4';

export interface UseCourseProgressReturn {
  currentLessonId: string;
  completedLessonIds: string[];
  lastPlaybackTime: number;
  stats: CourseStats;
  isLoaded: boolean;
  hasSavedProgress: boolean;
  setCurrentLesson: (lessonId: string) => void;
  markCompleted: (lessonId: string) => void;
  savePlaybackTime: (seconds: number) => void;
  resumeProgress: () => void;
  resetProgress: () => void;
}

export function useCourseProgress(
  lessons: Lesson[],
  defaultFirstLessonId?: string
): UseCourseProgressReturn {
  const firstPlayable = useMemo(() => {
    return lessons.find((l) => l.enabled && Boolean(l.youtubeId.trim()))?.id || lessons[0]?.id || '';
  }, [lessons]);

  const [currentLessonId, setCurrentLessonIdState] = useState<string>(
    defaultFirstLessonId || firstPlayable
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [lastPlaybackTime, setLastPlaybackTime] = useState<number>(0);
  const [hasSavedProgress, setHasSavedProgress] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.completedLessonIds) && parsed.completedLessonIds.length > 0) {
            setCompletedLessonIds(parsed.completedLessonIds);
            setHasSavedProgress(true);
          }
          if (typeof parsed.lastPlaybackTime === 'number') {
            setLastPlaybackTime(parsed.lastPlaybackTime);
          }
          if (parsed.currentLessonId && lessons.some((l) => l.id === parsed.currentLessonId)) {
            setCurrentLessonIdState(parsed.currentLessonId);
            setHasSavedProgress(true);
          }
        }
      }
    } catch {
      // LocalStorage access issues handled silently
    } finally {
      setIsLoaded(true);
    }
  }, [lessons]);

  // Persist state updates to localStorage
  const persist = useCallback(
    (newLessonId: string, newCompleted: string[], newPlaybackTime: number) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            currentLessonId: newLessonId,
            completedLessonIds: newCompleted,
            lastPlaybackTime: Math.floor(newPlaybackTime),
            lastUpdated: Date.now(),
          })
        );
      } catch {
        // Ignored
      }
    },
    []
  );

  const setCurrentLesson = useCallback(
    (lessonId: string) => {
      setCurrentLessonIdState(lessonId);
      // When explicitly choosing a new lesson, reset the last position pointer for that lesson
      setLastPlaybackTime(0);
      persist(lessonId, completedLessonIds, 0);
    },
    [completedLessonIds, persist]
  );

  const markCompleted = useCallback(
    (lessonId: string) => {
      setCompletedLessonIds((prev) => {
        if (prev.includes(lessonId)) return prev;
        const updated = [...prev, lessonId];
        persist(currentLessonId, updated, lastPlaybackTime);
        return updated;
      });
    },
    [currentLessonId, lastPlaybackTime, persist]
  );

  const savePlaybackTime = useCallback(
    (seconds: number) => {
      if (seconds > 0) {
        setLastPlaybackTime(seconds);
        persist(currentLessonId, completedLessonIds, seconds);
      }
    },
    [completedLessonIds, currentLessonId, persist]
  );

  const resumeProgress = useCallback(() => {
    // If current saved lesson exists, keep it
    if (currentLessonId) {
      persist(currentLessonId, completedLessonIds, lastPlaybackTime);
    }
  }, [completedLessonIds, currentLessonId, lastPlaybackTime, persist]);

  const resetProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignored
    }
    setCompletedLessonIds([]);
    setLastPlaybackTime(0);
    setCurrentLessonIdState(firstPlayable);
    setHasSavedProgress(false);
  }, [firstPlayable]);

  const stats = useMemo(() => {
    return calculateCourseStats(lessons, completedLessonIds);
  }, [lessons, completedLessonIds]);

  return {
    currentLessonId,
    completedLessonIds,
    lastPlaybackTime,
    stats,
    isLoaded,
    hasSavedProgress,
    setCurrentLesson,
    markCompleted,
    savePlaybackTime,
    resumeProgress,
    resetProgress,
  };
}
