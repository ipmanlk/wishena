"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { createEffectChain, createSynth } from "@/lib/audio";
import type { AudioConfig } from "@/lib/types";

interface AudioPlayerProps {
  audio: AudioConfig;
  isPlaying: boolean;
}

export function AudioPlayer({ audio, isPlaying }: AudioPlayerProps) {
  const melodySynthRef = useRef<Tone.PolySynth | null>(null);
  const harmonySynthRef = useRef<Tone.PolySynth | null>(null);
  const melodyPartRef = useRef<Tone.Part | null>(null);
  const harmonyPartRef = useRef<Tone.Part | null>(null);
  const volumeRef = useRef<Tone.Volume | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    // Initialize volume control for fade in/out
    volumeRef.current = new Tone.Volume(audio.volume).toDestination();

    // Set tempo
    Tone.Transport.bpm.value = audio.tempo;

    // Create melody synth with effects
    const melodySynth = createSynth(audio.instrument.type);
    if (audio.instrument.settings) {
      melodySynth.set(audio.instrument.settings);
    }

    const melodyEffects = createEffectChain(audio.instrument.effects || []);
    melodySynth.connect(melodyEffects.input);
    melodyEffects.output.connect(volumeRef.current);
    melodySynthRef.current = melodySynth;

    // Create melody part
    melodyPartRef.current = new Tone.Part(
      (time: number, value: unknown) => {
        const note = value as {
          note: string;
          duration: string;
          velocity?: number;
        };
        melodySynth.triggerAttackRelease(
          note.note,
          note.duration,
          time,
          note.velocity || 0.8,
        );
      },
      audio.melody.map((m) => [m.time, m]),
    );

    melodyPartRef.current.loop = audio.loop;
    melodyPartRef.current.start(0);

    // Create harmony synth and part if provided
    if (audio.harmony && audio.harmony.length > 0) {
      const harmonySynth = createSynth(audio.instrument.type);
      harmonySynth.volume.value = -6; // Slightly quieter than melody

      if (audio.instrument.settings) {
        harmonySynth.set(audio.instrument.settings);
      }

      const harmonyEffects = createEffectChain(["reverb"]);
      harmonySynth.connect(harmonyEffects.input);
      harmonyEffects.output.connect(volumeRef.current);
      harmonySynthRef.current = harmonySynth;

      harmonyPartRef.current = new Tone.Part(
        (time: number, value: unknown) => {
          const note = value as {
            note: string;
            duration: string;
            velocity?: number;
          };
          harmonySynth.triggerAttackRelease(
            note.note,
            note.duration,
            time,
            (note.velocity || 0.5) * 0.7,
          );
        },
        audio.harmony.map((m) => [m.time, m]),
      );

      harmonyPartRef.current.loop = audio.loop;
      harmonyPartRef.current.start(0);
    }

    // Handle fade in
    if (audio.fadeIn && audio.fadeIn > 0) {
      volumeRef.current.volume.value = -60; // Start silent
      volumeRef.current.volume.rampTo(audio.volume, audio.fadeIn);
    }

    Tone.Transport.start();

    return () => {
      // Handle fade out before cleanup
      if (audio.fadeOut && audio.fadeOut > 0 && volumeRef.current) {
        volumeRef.current.volume.rampTo(-60, audio.fadeOut);
        setTimeout(() => {
          cleanup();
        }, audio.fadeOut * 1000);
      } else {
        cleanup();
      }
    };

    function cleanup() {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      melodyPartRef.current?.dispose();
      harmonyPartRef.current?.dispose();
      melodySynthRef.current?.dispose();
      harmonySynthRef.current?.dispose();
      volumeRef.current?.dispose();
    }
  }, [isPlaying, audio]);

  return null;
}

export default AudioPlayer;
