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
    <div className="rounded-card bg-dark-card border border-dark-border p-5 sm:p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Progress info & checkmarks */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-vivid">
              Course Progress
            </span>
            {stats.isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-surface text-green-vivid text-xs font-semibold border border-green-vivid/30">
                <Award className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-text-primary">
              {stats.completedCount} of {stats.playableLessons}
            </span>
            <span className="text-sm text-text-muted">lessons completed</span>
            <span className="text-xs font-semibold text-text-dim">
              ({stats.completionPercentage}%)
            </span>
          </div>
        </div>

        {/* Right: Quick actions for resume / reset */}
        <div className="flex items-center gap-3">
          {hasSavedProgress && !stats.isCompleted && (
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-dark-deep bg-green-vivid hover:bg-green-hover transition-colors shadow-glow-sm focus:outline-none focus:ring-2 focus:ring-green-vivid"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Resume Learning</span>
            </button>
          )}

          {stats.completedCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-text-muted hover:text-text-primary bg-dark-deep hover:bg-dark-hover border border-dark-border transition-colors focus:outline-none focus:ring-2 focus:ring-green-vivid"
              title="Reset all progress stored on this device"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-4">
        <div
          role="progressbar"
          aria-valuenow={stats.completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course completion progress"
          className="w-full h-2.5 rounded-full bg-dark-deep border border-dark-border overflow-hidden"
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
