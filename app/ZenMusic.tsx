"use client";

import { useEffect, useRef, useState } from "react";

export default function ZenMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/djovan-zen-temple-497099.mp3");
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.12;
    audioRef.current = audio;

    const startOnFirstInteraction = async () => {
      if (!audioRef.current || startedRef.current) return;

      try {
        await audioRef.current.play();
        startedRef.current = true;
        setPlaying(true);
      } catch {
        // Autoplay may be blocked; the visible button remains available.
      }
    };

    document.addEventListener("pointerdown", startOnFirstInteraction, { once: true });
    document.addEventListener("keydown", startOnFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("pointerdown", startOnFirstInteraction);
      document.removeEventListener("keydown", startOnFirstInteraction);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      startedRef.current = true;
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={playing ? "Mute Zen music" : "Play Zen music"}
      title={playing ? "Mute Zen music" : "Play Zen music"}
      className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/75 text-[#3a5b50] shadow-lg backdrop-blur-md transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#b5dbcf] md:bottom-7 md:right-7"
    >
      <span aria-hidden="true" className="text-xl leading-none">
        {playing ? "🔊" : "🔇"}
      </span>
    </button>
  );
}
