'use client';

import React from 'react';
import { Lesson, groupLessonsByModule } from '@/lib/course';
import { CheckCircle2, Play, Lock, Clock, ExternalLink } from 'lucide-react';

interface LessonPlaylistProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
}

export default function LessonPlaylist({
  lessons,
  currentLessonId,
  completedLessonIds,
  onSelectLesson,
}: LessonPlaylistProps) {
  const moduleGroups = groupLessonsByModule(lessons);

  return (
    <div className="flex flex-col h-full rounded-card-lg bg-dark-card border border-dark-border shadow-card overflow-hidden">
      {/* Playlist Header */}
      <div className="p-4 sm:p-5 border-b border-dark-border bg-dark-card/90 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text-primary">
              Course Playlist
            </h3>
            <p className="text-xs text-text-muted">
              {lessons.filter((l) => l.enabled).length} playable lessons
            </p>
          </div>
          <span className="text-[11px] font-semibold text-green-vivid bg-green-surface px-2.5 py-1 rounded-full border border-green-vivid/30">
            Step by Step
          </span>
        </div>
      </div>

      {/* Scrollable List of Lessons */}
      <div className="flex-1 overflow-y-auto max-h-[620px] divide-y divide-dark-border/50 focus:outline-none">
        {moduleGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="py-2">
            {/* Module Name Header */}
            <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-text-dim">
              {group.name}
            </div>

            {/* Lessons within this module */}
            <div className="space-y-1 px-2">
              {group.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isPlayable = lesson.enabled && Boolean(lesson.youtubeId.trim());

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    disabled={!isPlayable}
                    onClick={() => onSelectLesson(lesson.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-green-vivid ${
                      isActive
                        ? 'bg-green-surface border border-green-vivid/40 shadow-glow-sm'
                        : isPlayable
                        ? 'hover:bg-dark-deep hover:border hover:border-dark-border text-text-muted hover:text-text-primary'
                        : 'opacity-40 cursor-not-allowed bg-transparent'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-green-vivid" />
                      ) : isActive ? (
                        <div className="w-4 h-4 rounded-full bg-green-vivid flex items-center justify-center">
                          <Play className="w-2.5 h-2.5 fill-dark-deep text-dark-deep ml-0.5" />
                        </div>
                      ) : isPlayable ? (
                        <div className="w-4 h-4 rounded-full border border-dark-border-light flex items-center justify-center">
                          <span className="text-[9px] font-bold text-text-dim">{lesson.order}</span>
                        </div>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-text-dim" />
                      )}
                    </div>

                    {/* Lesson Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isActive ? 'text-text-primary' : 'text-text-muted'
                          }`}
                        >
                          {lesson.order}. {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-text-dim">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.durationLabel || 'TBD'}
                        </span>
                        {!isPlayable && (
                          <span className="text-[10px] bg-dark-deep px-1.5 py-0.2 rounded border border-dark-border text-text-dim">
                            Unlisted link pending
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Playlist Footer Tip */}
      <div className="p-3 bg-dark-deep border-t border-dark-border text-[11px] text-text-dim text-center">
        Unlisted video links provided by course author
      </div>
    </div>
  );
}
