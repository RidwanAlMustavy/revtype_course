'use client';

import React from 'react';
import { CourseStats } from '@/lib/course';
import { CheckCircle2, RotateCcw, PlayCircle, Award, Sparkles } from 'lucide-react';

interface CourseProgressProps {
  stats: CourseStats;
  hasSavedProgress: boolean;
  onResume: () => void;
  onReset: () => void;
}

export default function CourseProgress({
  stats,
  hasSavedProgress,
  onResume,
  onReset,
}: CourseProgressProps) {
  return (
    <div className="rounded-xl bg-dark-card border border-dark-border px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-sm mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Progress info & percentage */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-green-vivid">
            Progress
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-text-primary">
            <span className="font-bold">{stats.completedCount}/{stats.playableLessons}</span>
            <span className="text-text-dim text-[11px]">Completed ({stats.completionPercentage}%)</span>
          </div>
          {stats.isCompleted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-surface text-green-vivid text-[10px] font-semibold border border-green-vivid/30">
              <Award className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>

        {/* Center: Slim Progress Bar */}
        <div className="flex-1 min-w-[120px] max-w-sm hidden sm:block">
          <div
            role="progressbar"
            aria-valuenow={stats.completionPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Course completion progress"
            className="w-full h-1.5 rounded-full bg-dark-deep border border-dark-border overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-green-vivid to-green-hover transition-all duration-500 rounded-full"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Right: Quick actions for resume / reset */}
        <div className="flex items-center gap-2">
          {hasSavedProgress && !stats.isCompleted && (
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-dark-deep bg-green-vivid hover:bg-green-hover transition-colors shadow-glow-sm"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          )}

          {stats.completedCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-text-muted hover:text-text-primary bg-dark-deep hover:bg-dark-hover border border-dark-border transition-colors"
              title="Reset all progress stored on this device"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile-only Progress Bar */}
      <div className="mt-2 sm:hidden">
        <div
          role="progressbar"
          aria-valuenow={stats.completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion progress"
          className="w-full h-1.5 rounded-full bg-dark-deep border border-dark-border overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-green-vivid to-green-hover transition-all duration-500 rounded-full"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
