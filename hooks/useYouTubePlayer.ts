'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Declaration for YouTube Iframe API types on window
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface UseYouTubePlayerOptions {
  videoId: string | null;
  containerId: string;
  initialStartTime?: number;
  onEnded?: () => void;
  onError?: (code: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface UseYouTubePlayerReturn {
  isReady: boolean;
  isPlaying: boolean;
  hasError: boolean;
  errorCode: number | null;
  autoplayBlocked: boolean;
  currentTime: number;
  duration: number;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number) => void;
  replayVideo: () => void;
  dismissAutoplayBlocked: () => void;
}

export function useYouTubePlayer({
  videoId,
  containerId,
  initialStartTime = 0,
  onEnded,
  onError,
  onPlay,
  onPause,
}: UseYouTubePlayerOptions): UseYouTubePlayerReturn {
  const playerRef = useRef<any>(null);
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Keep latest callbacks in refs to avoid recreating player
  const callbacksRef = useRef({ onEnded, onError, onPlay, onPause });
  useEffect(() => {
    callbacksRef.current = { onEnded, onError, onPlay, onPause };
  }, [onEnded, onError, onPlay, onPause]);

  // Load YouTube Iframe API script dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
  }, []);

  // Timer to track playback time
  const startTimeTracking = useCallback(() => {
    if (timeUpdateInterval.current) clearInterval(timeUpdateInterval.current);
    timeUpdateInterval.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const time = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        if (typeof time === 'number') setCurrentTime(time);
        if (typeof total === 'number' && total > 0) setDuration(total);
      }
    }, 500);
  }, []);

  const stopTimeTracking = useCallback(() => {
    if (timeUpdateInterval.current) {
      clearInterval(timeUpdateInterval.current);
      timeUpdateInterval.current = null;
    }
  }, []);

  // Initialize or re-create player when videoId changes
  useEffect(() => {
    if (!videoId) {
      setIsReady(false);
      return;
    }

    setHasError(false);
    setErrorCode(null);
    setAutoplayBlocked(false);
    setIsPlaying(false);
    setCurrentTime(0);

    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !window.YT || !window.YT.Player) return;

      const container = document.getElementById(containerId);
      if (!container) return;

      // Clean up existing player if already created
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors
        }
        playerRef.current = null;
      }

      // Create new player instance
      playerRef.current = new window.YT.Player(containerId, {
        width: '100%',
        height: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          start: Math.floor(initialStartTime) > 5 ? Math.floor(initialStartTime) : 0,
        },
        events: {
          onReady: (event: any) => {
            if (!isMounted) return;
            setIsReady(true);
            const dur = event.target.getDuration();
            if (typeof dur === 'number' && dur > 0) {
              setDuration(dur);
            }
          },
          onStateChange: (event: any) => {
            if (!isMounted) return;
            // 0: ENDED, 1: PLAYING, 2: PAUSED, 3: BUFFERING, 5: CUED
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setAutoplayBlocked(false);
              startTimeTracking();
              callbacksRef.current.onPlay?.();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              stopTimeTracking();
              callbacksRef.current.onPause?.();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              stopTimeTracking();
              callbacksRef.current.onEnded?.();
            }
          },
          onError: (event: any) => {
            if (!isMounted) return;
            setHasError(true);
            setErrorCode(event.data);
            stopTimeTracking();
            callbacksRef.current.onError?.(event.data);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      isMounted = false;
      stopTimeTracking();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignored
        }
        playerRef.current = null;
      }
    };
  }, [videoId, containerId, initialStartTime, startTimeTracking, stopTimeTracking]);

  const playVideo = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        const promise = playerRef.current.playVideo();
        if (promise && typeof promise.catch === 'function') {
          promise.catch(() => {
            setAutoplayBlocked(true);
          });
        }
      } catch {
        setAutoplayBlocked(true);
      }
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo();
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(seconds, true);
      setCurrentTime(seconds);
    }
  }, []);

  const replayVideo = useCallback(() => {
    seekTo(0);
    playVideo();
  }, [seekTo, playVideo]);

  const dismissAutoplayBlocked = useCallback(() => {
    setAutoplayBlocked(false);
  }, []);

  return {
    isReady,
    isPlaying,
    hasError,
    errorCode,
    autoplayBlocked,
    currentTime,
    duration,
    playVideo,
    pauseVideo,
    seekTo,
    replayVideo,
    dismissAutoplayBlocked,
  };
}
