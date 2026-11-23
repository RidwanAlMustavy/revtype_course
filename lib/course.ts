export interface LessonResource {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  order: number;
  title: string;
  description: string;
  youtubeId: string;
  module: string;
  durationLabel?: string;
  thumbnailOverride?: string;
  resources?: LessonResource[];
  enabled: boolean;
}

export interface CourseProgress {
  currentLessonId: string;
  completedLessonIds: string[];
  lastPlaybackTime: number; // in seconds
  lastUpdated: number; // timestamp
}

export interface CourseStats {
  totalLessons: number;
  playableLessons: number;
  completedCount: number;
  completionPercentage: number;
  isCompleted: boolean;
}

export interface ModuleGroup {
  name: string;
  lessons: Lesson[];
}

/**
 * Calculates current progress statistics for the course.
 */
export function calculateCourseStats(lessons: Lesson[], completedLessonIds: string[]): CourseStats {
  const playableLessons = lessons.filter((l) => l.enabled && Boolean(l.youtubeId.trim()));
  const total = playableLessons.length;
  
  if (total === 0) {
    return {
      totalLessons: lessons.length,
      playableLessons: 0,
      completedCount: 0,
      completionPercentage: 0,
      isCompleted: false,
    };
  }

  // Count only completed lessons that are playable
  const completedCount = playableLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const completionPercentage = Math.min(100, Math.round((completedCount / total) * 100));
  const isCompleted = completedCount === total && total > 0;

  return {
    totalLessons: lessons.length,
    playableLessons: total,
    completedCount,
    completionPercentage,
    isCompleted,
  };
}

/**
 * Groups lessons by their module/section name in order of appearance.
 */
export function groupLessonsByModule(lessons: Lesson[]): ModuleGroup[] {
  const groups: ModuleGroup[] = [];
  const map = new Map<string, Lesson[]>();

  for (const lesson of lessons) {
    if (!map.has(lesson.module)) {
      const list: Lesson[] = [];
      map.set(lesson.module, list);
      groups.push({ name: lesson.module, lessons: list });
    }
    map.get(lesson.module)!.push(lesson);
  }

  return groups;
}

/**
 * Finds the next playable lesson after currentLessonId.
 */
export function getNextLesson(lessons: Lesson[], currentLessonId: string): Lesson | null {
  const playable = lessons.filter((l) => l.enabled && Boolean(l.youtubeId.trim()));
  const currentIndex = playable.findIndex((l) => l.id === currentLessonId);

  if (currentIndex >= 0 && currentIndex < playable.length - 1) {
    return playable[currentIndex + 1];
  }
  return null;
}

/**
 * Finds the previous playable lesson before currentLessonId.
 */
export function getPreviousLesson(lessons: Lesson[], currentLessonId: string): Lesson | null {
  const playable = lessons.filter((l) => l.enabled && Boolean(l.youtubeId.trim()));
  const currentIndex = playable.findIndex((l) => l.id === currentLessonId);

  if (currentIndex > 0) {
    return playable[currentIndex - 1];
  }
  return null;
}
