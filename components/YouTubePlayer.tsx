'use client';

import React, { useState } from 'react';
import { Lesson } from '@/lib/course';
import { UseYouTubePlayerReturn } from '@/hooks/useYouTubePlayer';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Play, 
  AlertCircle, 
  PartyPopper, 
  ExternalLink,
  Info,
  CheckCircle2
} from 'lucide-react';

interface YouTubePlayerProps {
  currentLesson: Lesson | null;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  player: UseYouTubePlayerReturn;
  isCompleted: boolean;
  onSelectLesson: (lessonId: string) => void;
  onReplayCourse: () => void;
}

export default function YouTubePlayer({
  currentLesson,
  previousLesson,
  nextLesson,
  player,
  isCompleted,
  onSelectLesson,
  onReplayCourse,
}: YouTubePlayerProps) {
  const [hasStarted, setHasStarted] = useState(false);

  if (!currentLesson) {
    return (
      <div className="aspect-video w-full rounded-card-lg bg-dark-card border border-dark-border flex flex-col items-center justify-center p-8 text-center space-y-3">
        <Info className="w-10 h-10 text-green-vivid" />
        <h4 className="text-lg font-bold text-text-primary">No Lesson Selected</h4>
        <p className="text-xs text-text-muted max-w-md">
          Please select a playable lesson from the playlist to begin learning.
        </p>
      </div>
    );
  }

  const handleManualPlay = () => {
    setHasStarted(true);
    player.playVideo();
  };

  const handleNextClick = () => {
    if (nextLesson) {
      setHasStarted(false);
      onSelectLesson(nextLesson.id);
    }
  };

  const handlePreviousClick = () => {
    if (previousLesson) {
      setHasStarted(false);
      onSelectLesson(previousLesson.id);
    }
  };

  return (
    <div className="flex flex-col space-y-2.5">
      {/* Video Container (16:9 ratio) */}
      <div 
        className="relative aspect-video w-full rounded-card-lg bg-dark-deep border border-dark-border overflow-hidden shadow-card group select-none"
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        
        {/* Actual YouTube IFrame Mounting Target */}
        <div id="youtube-player-mount" className="w-full h-full" />

        {/* Top mask overlay: cleanly conceals external YouTube channel logo, avatar, and share/copy buttons */}
        <div 
          className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-dark-bg/95 via-dark-bg/85 to-transparent z-[15] pointer-events-auto flex items-center justify-between px-4 select-none"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md overflow-hidden bg-dark-deep border border-green-vivid/30 flex items-center justify-center shrink-0">
              <img src="/images/logo.png" alt="Earn" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold tracking-wide px-3 py-1 rounded-full bg-dark-deep/95 text-green-vivid border border-dark-border shadow-md backdrop-blur-md">
              Earn Academy • Lesson {currentLesson.order}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-medium text-text-dim px-2.5 py-1 rounded-full bg-dark-deep/90 border border-dark-border">
              Official Walkthrough
            </span>
          </div>
        </div>

        {/* Poster / Play Overlay before first play */}
        {!hasStarted && !player.isPlaying && (
          <div className="absolute inset-0 bg-dark-deep/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 space-y-4">
            <button
              type="button"
              onClick={handleManualPlay}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-green-vivid hover:bg-green-hover text-dark-deep flex items-center justify-center transition-all duration-200 shadow-glow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-vivid/50"
              aria-label={`Play ${currentLesson.title}`}
            >
              <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current ml-1" />
            </button>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-green-vivid uppercase tracking-wider">
                Lesson {currentLesson.order}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-text-primary max-w-lg">
                {currentLesson.title}
              </h3>
            </div>
            <p className="text-xs text-text-dim">
              Click play to load and watch video
            </p>
          </div>
        )}

        {/* Autoplay Blocked Fallback Notification (FR05) */}
        {player.autoplayBlocked && (
          <div className="absolute top-4 left-4 right-4 z-20 p-3 rounded-xl bg-dark-card/95 border border-green-vivid/40 backdrop-blur-md flex items-center justify-between shadow-glow-sm">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-green-vivid" />
              <span className="text-xs text-text-primary font-medium">
                Next lesson ready. Browser policy requires a click to play.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                player.dismissAutoplayBlocked();
                player.playVideo();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-dark-deep bg-green-vivid hover:bg-green-hover transition-colors"
            >
              Play Next Lesson
            </button>
          </div>
        )}

        {/* Video Error Friendly Overlay (FR09) */}
        {player.hasError && (
          <div className="absolute inset-0 bg-dark-deep/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-text-primary">
                Video Unavailable for Playback
              </h4>
              <p className="text-xs text-text-muted max-w-sm">
                This YouTube video may be restricted, embedding disabled, or still processing.
                You can easily skip to the next lesson below.
              </p>
            </div>
            {nextLesson && (
              <button
                type="button"
                onClick={handleNextClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-dark-deep bg-green-vivid hover:bg-green-hover transition-colors shadow-glow-sm"
              >
                <span>Skip to Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Course Completed Celebration Overlay (FR06) */}
        {isCompleted && !player.isPlaying && (
          <div className="absolute inset-0 bg-dark-deep/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-green-surface text-green-vivid flex items-center justify-center border border-green-vivid/30 shadow-glow-md">
              <PartyPopper className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-text-primary">
                Course Completed!
              </h4>
              <p className="text-xs sm:text-sm text-text-muted max-w-md">
                Congratulations on finishing all available video lessons!
                You have completed the entire course.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onReplayCourse}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-text-primary bg-dark-card border border-dark-border hover:border-green-vivid transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-green-vivid" />
                <span>Replay Course</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* External Player Control Toolbar (FR04, FR11) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-dark-card border border-dark-border">
        
        {/* Left: Previous Lesson */}
        <button
          type="button"
          disabled={!previousLesson}
          onClick={handlePreviousClick}
          className="min-h-[38px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-text-primary bg-dark-deep hover:bg-dark-hover border border-dark-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-green-vivid"
          aria-label="Go to previous lesson"
        >
          <ChevronLeft className="w-4 h-4 text-green-vivid" />
          <span className="hidden sm:inline">Previous Lesson</span>
        </button>

        {/* Center: Replay Control */}
        <button
          type="button"
          onClick={() => player.replayVideo()}
          className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-text-muted hover:text-text-primary bg-dark-deep hover:bg-dark-hover border border-dark-border transition-colors focus:outline-none focus:ring-2 focus:ring-green-vivid"
          aria-label="Replay current lesson"
        >
          <RotateCcw className="w-3.5 h-3.5 text-green-vivid" />
          <span>Replay</span>
        </button>

        {/* Right: Next Lesson */}
        <button
          type="button"
          disabled={!nextLesson}
          onClick={handleNextClick}
          className="min-h-[38px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-dark-deep bg-green-vivid hover:bg-green-hover disabled:bg-dark-deep disabled:text-text-dim disabled:border disabled:border-dark-border disabled:cursor-not-allowed transition-colors shadow-glow-sm focus:outline-none focus:ring-2 focus:ring-green-vivid"
          aria-label="Go to next lesson"
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* Lesson Details & Supplementary Material */}
      <div className="p-6 rounded-card bg-dark-card border border-dark-border space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-green-vivid bg-green-surface px-3 py-1 rounded-full border border-green-vivid/20">
              {currentLesson.module} • Lesson {currentLesson.order}
            </span>
            {currentLesson.durationLabel && (
              <span className="text-xs text-text-dim">
                Estimated duration: {currentLesson.durationLabel}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
          {currentLesson.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed">
          {currentLesson.description}
        </p>

        {/* Lesson Resources Links if present */}
        {currentLesson.resources && currentLesson.resources.length > 0 && (
          <div className="pt-4 border-t border-dark-border space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-dim">
              Official Resources for this Lesson
            </span>
            <div className="flex flex-wrap gap-3">
              {currentLesson.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-green-vivid bg-dark-deep border border-dark-border hover:border-green-vivid/40 transition-colors"
                >
                  <span>{res.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
