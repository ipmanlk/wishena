"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone";
import type { Note } from "@/lib/types";

interface AudioPlayerProps {
  synth: "FMSynth" | "AMSynth" | "Synth";
  tempo: number;
  melody: Note[];
  isPlaying: boolean;
}

export function AudioPlayer({
  synth,
  tempo,
  melody,
  isPlaying,
}: AudioPlayerProps) {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const partRef = useRef<Tone.Part | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    let newSynth: Tone.PolySynth;

    if (synth === "FMSynth") {
      newSynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    } else if (synth === "AMSynth") {
      newSynth = new Tone.PolySynth(Tone.AMSynth).toDestination();
    } else {
      newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    }

    synthRef.current = newSynth;
    synthRef.current.volume.value = -10;

    Tone.Transport.bpm.value = tempo;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    partRef.current = new Tone.Part((time: number, value: any) => {
      synthRef.current?.triggerAttackRelease(value.note, value.duration, time);
    }, melody as any).start(0);

    Tone.Transport.start();

    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      synthRef.current?.dispose();
      partRef.current?.dispose();
    };
  }, [isPlaying, synth, tempo, melody]);

  return null;
}

export default AudioPlayer;
