"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  foxComboDialogues,
  foxHotspotDialogues,
  foxHotspots,
  foxIdleDialogues,
  foxPerHotspotPromotionK,
  foxRareBreakDialogues,
  foxReactionRatios,
  type DialogueStage,
  type FoxHotspot,
  type FoxHotspotRect,
  type FoxHotspotId
} from "@/content/data/fox-playground";
import styles from "./fox-interaction-playground.module.css";

type ParticleBurst = {
  id: number;
  x: number;
  y: number;
};

type DialogueWithVoice = {
  line: string;
  voiceKey: string;
};

const hotspotVoicePrefix: Record<FoxHotspotId, string> = {
  ears: "E",
  face: "F",
  belly: "B",
  tail: "T",
  hand: "H",
  foot: "P"
};

const stageVoicePrefix: Record<DialogueStage, string> = {
  early: "E",
  mid: "M",
  late: "L"
};

function nextSeed(seed: number): number {
  return (seed * 1664525 + 1013904223) % 4294967296;
}

function pickIndexedFromSeed<T>(items: readonly T[], seed: number): { item: T; index: number } {
  const index = seed % items.length;
  return { item: items[index], index };
}

function formatVoiceIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function makeHotspotVoiceKey(hotspotId: FoxHotspotId, stage: DialogueStage, index: number): string {
  return `${hotspotVoicePrefix[hotspotId]}-${stageVoicePrefix[stage]}-${formatVoiceIndex(index)}`;
}

function makeSeriesVoiceKey(series: "I" | "C" | "R", index: number): string {
  return `${series}-${formatVoiceIndex(index)}`;
}

function createInitialHotspotCounts(): Record<FoxHotspotId, number> {
  return foxHotspots.reduce((acc, hotspot) => {
    acc[hotspot.id] = 0;
    return acc;
  }, {} as Record<FoxHotspotId, number>);
}

function resolveStageByHotspotCounts(counts: Record<FoxHotspotId, number>): DialogueStage {
  const lowestCount = Math.min(...foxHotspots.map((hotspot) => counts[hotspot.id] ?? 0));
  if (lowestCount >= foxPerHotspotPromotionK * 2) return "late";
  if (lowestCount >= foxPerHotspotPromotionK) return "mid";
  return "early";
}

export function FoxInteractionPlayground() {
  const debugHitboxes = false;
  const idleDelayMs = 30000;
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [affinity, setAffinity] = useState(0);
  const [tsundereMeter, setTsundereMeter] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<FoxHotspotId | null>(null);
  const [line, setLine] = useState("喂，不要一副很熟的樣子。先說好，我可不是那種隨便給碰的狐狸。");
  const [comboCount, setComboCount] = useState(0);
  const [hotspotCounts, setHotspotCounts] = useState<Record<FoxHotspotId, number>>(() => createInitialHotspotCounts());
  const [particles, setParticles] = useState<ParticleBurst[]>([]);
  const [pulseHotspotId, setPulseHotspotId] = useState<FoxHotspotId | null>(null);
  const [voiceKey, setVoiceKey] = useState<string | null>(null);
  const particleIdRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rngSeedRef = useRef(104729);
  const idleEpochRef = useRef(0);
  const idleTimeoutRef = useRef<number | null>(null);
  const idleAudioCleanupRef = useRef<(() => void) | null>(null);
  const lastTapRef = useRef<{ id: FoxHotspotId; at: number } | null>(null);
  const lastHandledHotspotClickRef = useRef<{ id: FoxHotspotId; at: number } | null>(null);
  const lastHandledClickAtRef = useRef(0);
  const unlockTapRef = useRef<{ count: number; at: number }>({ count: 0, at: 0 });
  const stage = resolveStageByHotspotCounts(hotspotCounts);

  const clearIdleSchedule = useCallback(() => {
    if (idleTimeoutRef.current !== null) {
      window.clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
    if (idleAudioCleanupRef.current) {
      idleAudioCleanupRef.current();
      idleAudioCleanupRef.current = null;
    }
  }, []);

  const scheduleIdleAfterCurrentDialogueAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isPlayMode) return;
    const idleEpochAtSchedule = idleEpochRef.current;

    const armTimeout = () => {
      if (!isPlayMode || idleEpochRef.current !== idleEpochAtSchedule) return;
      idleTimeoutRef.current = window.setTimeout(() => {
        if (!isPlayMode || idleEpochRef.current !== idleEpochAtSchedule) return;
        const seed = nextSeed(rngSeedRef.current);
        rngSeedRef.current = seed;
        const idlePick = pickIndexedFromSeed(foxIdleDialogues, seed);
        setLine(idlePick.item);
        setVoiceKey(makeSeriesVoiceKey("I", idlePick.index));
      }, idleDelayMs);
    };

    if (audio.ended) {
      armTimeout();
      return;
    }

    const onEnded = () => {
      armTimeout();
    };

    const onError = () => {
      armTimeout();
    };

    audio.addEventListener("ended", onEnded, { once: true });
    audio.addEventListener("error", onError, { once: true });
    idleAudioCleanupRef.current = () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [idleDelayMs, isPlayMode]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!isPlayMode || !voiceKey) {
      clearIdleSchedule();
      if (currentAudio) {
        currentAudio.pause();
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
    }

    const audio = new Audio(`/api/fox-voice?key=${encodeURIComponent(voiceKey)}`);
    audioRef.current = audio;
    void audio.play().then(() => {
      clearIdleSchedule();
      scheduleIdleAfterCurrentDialogueAudio();
    }).catch(() => undefined);
  }, [clearIdleSchedule, isPlayMode, scheduleIdleAfterCurrentDialogueAudio, voiceKey]);

  useEffect(() => {
    return () => {
      clearIdleSchedule();
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
    };
  }, [clearIdleSchedule]);

  useEffect(() => {
    if (!isPlayMode) return;
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "auto";
    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [isPlayMode]);

  function maybePickRareLine(nextMeter: number, seed: number): DialogueWithVoice | null {
    const baseRareChance = foxReactionRatios.sincere;
    const scaledChance = Math.min(0.2, baseRareChance + nextMeter * 0.005);
    const roll = (seed % 1000) / 1000;
    if (roll < scaledChance) {
      const next = nextSeed(seed);
      rngSeedRef.current = next;
      const rarePick = pickIndexedFromSeed(foxRareBreakDialogues, next);
      return {
        line: rarePick.item,
        voiceKey: makeSeriesVoiceKey("R", rarePick.index)
      };
    }
    return null;
  }

  function triggerParticleBurst(rect: FoxHotspotRect) {
    const burstId = particleIdRef.current + 1;
    particleIdRef.current = burstId;
    setParticles((current) => [...current, { id: burstId, x: rect.x, y: rect.y }]);

    window.setTimeout(() => {
      setParticles((current) => current.filter((burst) => burst.id !== burstId));
    }, 560);
  }

  function handleHotspotClick(hotspot: FoxHotspot, rect: FoxHotspotRect, eventTimeStamp: number) {
    const now = eventTimeStamp;
    clearIdleSchedule();
    if (now - lastHandledClickAtRef.current < 180) {
      return;
    }
    lastHandledClickAtRef.current = now;

    const previousHandledClick = lastHandledHotspotClickRef.current;
    if (previousHandledClick && previousHandledClick.id === hotspot.id && now - previousHandledClick.at < 220) {
      return;
    }
    lastHandledHotspotClickRef.current = { id: hotspot.id, at: now };
    idleEpochRef.current += 1;

    const previousTap = lastTapRef.current;
    const isCombo = previousTap && previousTap.id === hotspot.id && now - previousTap.at < 1200;
    const nextComboCount = isCombo ? comboCount + 1 : 1;
    const nextAffinity = affinity + 1;
    const nextMeter = tsundereMeter + 1;
    const nextHotspotCounts: Record<FoxHotspotId, number> = {
      ...hotspotCounts,
      [hotspot.id]: (hotspotCounts[hotspot.id] ?? 0) + 1
    };
    const nextStage = resolveStageByHotspotCounts(nextHotspotCounts);
    const seedForRoll = nextSeed(rngSeedRef.current);
    rngSeedRef.current = seedForRoll;
    const rareLine = maybePickRareLine(nextMeter, seedForRoll);
    const seedForPick = nextSeed(rngSeedRef.current);
    rngSeedRef.current = seedForPick;

    const hotspotPick = pickIndexedFromSeed(foxHotspotDialogues[hotspot.id][nextStage], seedForPick);
    let nextLine = hotspotPick.item;
    let nextVoiceKey = makeHotspotVoiceKey(hotspot.id, nextStage, hotspotPick.index);
    if (nextComboCount >= 3) {
      const comboSeed = nextSeed(rngSeedRef.current);
      rngSeedRef.current = comboSeed;
      const comboPick = pickIndexedFromSeed(foxComboDialogues, comboSeed);
      nextLine = comboPick.item;
      nextVoiceKey = makeSeriesVoiceKey("C", comboPick.index);
    } else if (rareLine) {
      nextLine = rareLine.line;
      nextVoiceKey = rareLine.voiceKey;
    }

    lastTapRef.current = { id: hotspot.id, at: now };
    setComboCount(nextComboCount);
    setAffinity(nextAffinity);
    setTsundereMeter(nextMeter);
    setHotspotCounts(nextHotspotCounts);
    setActiveHotspotId(hotspot.id);
    setPulseHotspotId(hotspot.id);
    setLine(nextLine);
    setVoiceKey(nextVoiceKey);
    triggerParticleBurst(rect);

    window.setTimeout(() => {
      setPulseHotspotId((current) => (current === hotspot.id ? null : current));
    }, 300);
  }

  function handleReset() {
    idleEpochRef.current += 1;
    clearIdleSchedule();
    setAffinity(0);
    setTsundereMeter(0);
    setComboCount(0);
    setHotspotCounts(createInitialHotspotCounts());
    setActiveHotspotId(null);
    setPulseHotspotId(null);
    setParticles([]);
    setLine("重置完成。先說好，我不是特地在等你再點一次。");
    setVoiceKey(null);
  }

  function handleLeave() {
    idleEpochRef.current += 1;
    clearIdleSchedule();
    setIsPlayMode(false);
    handleReset();
  }

  function handleUnlockTap(eventTimeStamp: number) {
    if (isPlayMode) return;

    const previous = unlockTapRef.current;
    const isContinuous = eventTimeStamp - previous.at <= 800;
    const nextCount = isContinuous ? previous.count + 1 : 1;
    unlockTapRef.current = { count: nextCount, at: eventTimeStamp };

    if (nextCount >= 3) {
      idleEpochRef.current += 1;
      clearIdleSchedule();
      setIsPlayMode(true);
      setLine("……你是故意連點三下的吧。好啦，模式開給你。");
      setVoiceKey(null);
      unlockTapRef.current = { count: 0, at: 0 };
    }
  }

  return (
    <div className={`${styles.playground} ${isPlayMode ? styles.playModeCursorFix : ""}`.trim()}>
      <div className={styles.shadow} />
      <Image
        src="/images/hu-yan-character.png"
        alt="秋墨角色立繪"
        width={420}
        height={520}
        className={styles.characterImage}
        priority
      />

      {!isPlayMode ? (
        <button
          type="button"
          className={styles.unlockTapArea}
          aria-label="連續點擊狐狸三次開啟互動模式"
          onClick={(event) => handleUnlockTap(event.timeStamp)}
        />
      ) : null}

      <p className={styles.srOnly} id="fox-playground-help">
        連續點擊狐狸三次可開啟互動模式。開啟後可點擊狐狸身上的熱區觸發對話，並可重置或離開。
      </p>

      {isPlayMode ? (
        <div className={styles.overlay} role="group" aria-label="狐狸互動熱區" aria-describedby="fox-playground-help">
        {particles.map((burst) => (
          <span
            key={burst.id}
            className={styles.particleBurst}
            style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
          >
            <span className={styles.spark} />
            <span className={`${styles.spark} ${styles.sparkDelayA}`} />
            <span className={`${styles.spark} ${styles.sparkDelayB}`} />
            <span className={`${styles.spark} ${styles.sparkDelayC}`} />
          </span>
        ))}

        {foxHotspots.map((hotspot) =>
          hotspot.rects.map((rect, rectIndex) => (
            <button
              key={`${hotspot.id}-${rectIndex}`}
              type="button"
              className={`${styles.hotspot} ${
                activeHotspotId === hotspot.id ? styles.hotspotActive : ""
              } ${pulseHotspotId === hotspot.id ? styles.hotspotPulse : ""} ${
              debugHitboxes ? styles.hotspotDebug : styles.hotspotStealth
              }`}
              style={{
                left: `${rect.x}%`,
                top: `${rect.y}%`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                ["--hotspot-rotate" as string]: `${rect.rotateDeg ?? 0}deg`
              }}
              aria-label={hotspot.rects.length > 1 ? `${hotspot.ariaLabel} 區域 ${rectIndex + 1}` : hotspot.ariaLabel}
              aria-pressed={activeHotspotId === hotspot.id}
              onClick={(event) => handleHotspotClick(hotspot, rect, event.timeStamp)}
            >
              {null}
            </button>
          ))
        )}
      </div>
      ) : null}

      {isPlayMode ? (
        <div className={styles.bubbleWrap}>
        <div
          className={`${styles.bubble} ${
            stage === "early" ? styles.bubbleEarly : stage === "mid" ? styles.bubbleMid : styles.bubbleLate
          }`}
          role="status"
          aria-live="polite"
        >
          <p>{line}</p>
        </div>
      </div>
      ) : null}

      {isPlayMode ? (
        <div className={styles.controls} role="group" aria-label="互動選單">
          <button type="button" className="ui-chip" onClick={handleReset}>
            重置
          </button>
          <button type="button" className="ui-chip" onClick={handleLeave}>
            離開
          </button>
        </div>
      ) : null}
    </div>
  );
}
