import { Play } from "lucide-react";
import type { Video } from "@/lib/services";

/**
 * A 16:9 demo slot. With a `src` it is a plain video the reader starts
 * themselves: no autoplay, no loop, nothing loaded until asked (CLAUDE.md §4,
 * §10). With only a poster it shows the still; with neither it is a clearly
 * marked placeholder frame. All three take the same 16:9 box, so dropping the
 * video in later shifts nothing.
 */
export function ServiceVideo({ video }: { video: Video }) {
  if (video.src) {
    return (
      <video
        controls
        playsInline
        preload="none"
        poster={video.poster}
        aria-label={video.title}
        className="block aspect-video w-full bg-ink object-cover"
      >
        <source src={video.src} />
      </video>
    );
  }

  // A still standing in for a video that has not been added yet.
  if (video.poster) {
    return (
      <img
        src={video.poster}
        alt={video.title}
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="block aspect-video h-auto w-full object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Video coming soon: ${video.title}`}
      className="relative flex aspect-video w-full flex-col items-center justify-center gap-5 border border-line bg-bg-1"
    >
      <span className="flex h-14 w-14 items-center justify-center border border-line bg-bg-0 text-fg-3">
        <Play size={20} aria-hidden />
      </span>
      <p className="px-6 text-center font-mono text-xs text-fg-3">
        [VIDEO] {video.title}
      </p>
      <span className="absolute left-4 top-4 font-mono text-xs text-fg-3">
        16:9
      </span>
    </div>
  );
}
