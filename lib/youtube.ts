/**
 * YouTube utility helpers for parsing URLs, validating IDs,
 * and generating embed links according to PRD requirements.
 */

// Standard 11-character alphanumeric YouTube ID regex
const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

/**
 * Extracts an 11-character YouTube video ID from any standard format:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - Bare 11-char ID
 */
export function extractYouTubeId(urlOrId: string | null | undefined): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already an 11-character ID
  if (YOUTUBE_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  try {
    // Attempt standard URL parse
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);

    // youtu.be/ID
    if (url.hostname.includes('youtu.be')) {
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts[0] && YOUTUBE_ID_REGEX.test(pathParts[0])) {
        return pathParts[0];
      }
    }

    // youtube.com/watch?v=ID
    const vParam = url.searchParams.get('v');
    if (vParam && YOUTUBE_ID_REGEX.test(vParam)) {
      return vParam;
    }

    // youtube.com/embed/ID or youtube.com/shorts/ID
    const pathParts = url.pathname.split('/').filter(Boolean);
    const embedOrShortsIndex = pathParts.findIndex(
      (part) => part === 'embed' || part === 'shorts' || part === 'v'
    );
    if (embedOrShortsIndex !== -1 && pathParts[embedOrShortsIndex + 1]) {
      const candidate = pathParts[embedOrShortsIndex + 1];
      if (YOUTUBE_ID_REGEX.test(candidate)) {
        return candidate;
      }
    }
  } catch {
    // Fallback regex scan for 11 chars after common delimiters
    const match = trimmed.match(
      /(?:v=|\/embed\/|\/shorts\/|\/v\/|youtu\.be\/|\/watch\?v=|\/e\/)([\w-]{11})/
    );
    if (match && match[1] && YOUTUBE_ID_REGEX.test(match[1])) {
      return match[1];
    }
  }

  return null;
}

/**
 * Verifies if a given string is a valid 11-character YouTube ID.
 */
export function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID_REGEX.test(id);
}

/**
 * Formats a YouTube privacy-enhanced embed URL.
 */
export function formatYouTubeEmbedUrl(
  youtubeId: string,
  options?: {
    autoplay?: boolean;
    enablejsapi?: boolean;
    origin?: string;
  }
): string {
  const originParam = options?.origin ? `&origin=${encodeURIComponent(options.origin)}` : '';
  const autoplayParam = options?.autoplay ? '&autoplay=1' : '&autoplay=0';
  const jsApiParam = options?.enablejsapi !== false ? '&enablejsapi=1' : '';

  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1${autoplayParam}${jsApiParam}${originParam}`;
}

/**
 * Generates reliable YouTube thumbnail URL with fallback.
 */
export function getYouTubeThumbnailUrl(
  youtubeId: string,
  quality: 'maxres' | 'hq' | 'mq' | 'default' = 'hq'
): string {
  const qualityMap = {
    maxres: 'maxresdefault.jpg',
    hq: 'hqdefault.jpg',
    mq: 'mqdefault.jpg',
    default: 'default.jpg',
  };
  return `https://img.youtube.com/vi/${youtubeId}/${qualityMap[quality]}`;
}

/**
 * Formats seconds into mm:ss or hh:mm:ss
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
