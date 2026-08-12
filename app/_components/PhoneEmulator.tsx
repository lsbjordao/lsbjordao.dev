"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Copy } from "@/data/copy";
import SharePopover from "./SharePopover";

type Controls = Copy["mobileMvp"]["controls"];
type ShareLabels = Copy["mobileMvp"]["share"];

type PhoneEmulatorProps = {
  demoUrl: string;
  frameTitle: string;
  controls: Controls;
  shareUrl: string;
  share: ShareLabels;
};

const INITIAL_VOLUME = 40;
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;
const VOLUME_STEP = 8;
const REPEAT_DELAY = 340;
const REPEAT_INTERVAL = 110;
const HUD_HIDE_DELAY = 1300;
const MAX_GAIN = 0.22;

/**
 * Interactive phone mockup for the "05 / DESENVOLVIMENTO MOBILE" section.
 *
 * Right-edge buttons behave like a real handset:
 *  - volume up / volume down (split of the former single volume bar): each tap
 *    steps the level, press-and-hold repeats; a short beep plays with gain
 *    proportional to the current level (silent at 0%); a HUD shows on screen.
 *  - power: toggles a black "off" overlay over the screen; volume is inert
 *    while the device is off.
 */
export default function PhoneEmulator({
  demoUrl,
  frameTitle,
  controls,
  shareUrl,
  share,
}: PhoneEmulatorProps) {
  const [volume, setVolumeState] = useState(INITIAL_VOLUME);
  const [powerOn, setPowerOn] = useState(true);
  const [hudVisible, setHudVisible] = useState(false);

  // Refs keep handler closures fresh for timers/intervals without re-arming.
  const volumeRef = useRef(volume);
  const powerRef = useRef(powerOn);
  const setVolume = useCallback((next: number) => {
    const clamped = Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, next));
    volumeRef.current = clamped;
    setVolumeState(clamped);
  }, []);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  useEffect(() => {
    powerRef.current = powerOn;
  }, [powerOn]);

  // Web Audio (lazy, resumed on first user gesture). All audio is best-effort:
  // it must never throw, or a failed beep would abort the button's state update.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ensureAudio = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    try {
      if (!audioCtxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctx) return null;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === "suspended") void ctx.resume();
      return ctx;
    } catch {
      audioCtxRef.current = null;
      return null;
    }
  }, []);

  const playBlip = useCallback((level: number) => {
    try {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const peak = Math.max(0.0002, (level / MAX_VOLUME) * MAX_GAIN);
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      /* audio is optional */
    }
  }, []);

  const playPowerChirp = useCallback((turningOn: boolean) => {
    try {
      const ctx = ensureAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = turningOn ? 520 : 360;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(
        turningOn ? freq * 1.5 : freq * 0.7,
        now + 0.16,
      );
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      /* audio is optional */
    }
  }, [ensureAudio]);

  // HUD auto-hide.
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showHud = useCallback(() => {
    setHudVisible(true);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(
      () => setHudVisible(false),
      HUD_HIDE_DELAY,
    );
  }, []);

  // Press-and-hold repeat.
  const repeatArmRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopRepeat = useCallback(() => {
    if (repeatArmRef.current) {
      clearTimeout(repeatArmRef.current);
      repeatArmRef.current = null;
    }
    if (repeatRef.current) {
      clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  }, []);

  const stepVolume = useCallback(
    (delta: number) => {
      if (!powerRef.current) return;
      const next = volumeRef.current + delta;
      const changed = next !== volumeRef.current;
      setVolume(next);
      if (changed) playBlip(next);
      showHud();
    },
    [playBlip, setVolume, showHud],
  );

  // Guards against the mouse click that follows a pointer-driven step so we
  // don't double-count; keyboard still steps via onClick.
  const pointerSteppedRef = useRef(false);

  const onVolumePointerDown = (delta: number) => (
    e: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    ensureAudio();
    pointerSteppedRef.current = true;
    stepVolume(delta);
    stopRepeat();
    repeatArmRef.current = setTimeout(() => {
      repeatRef.current = setInterval(() => stepVolume(delta), REPEAT_INTERVAL);
    }, REPEAT_DELAY);
  };

  const onVolumeClick = (delta: number) => () => {
    if (pointerSteppedRef.current) {
      pointerSteppedRef.current = false;
      return;
    }
    ensureAudio();
    stepVolume(delta);
  };

  const togglePower = () => {
    const next = !powerOn;
    setPowerOn(next);
    if (!next) {
      setHudVisible(false);
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    }
    playPowerChirp(next);
  };

  // The in-app "Compartilhar perfil" button lives inside the same-origin
  // iframe. Intercept it (capture-phase delegation on the iframe document) so
  // that, instead of the native Share sheet — which no-ops on most desktop
  // browsers — it opens our social-network sheet with the section URL. The
  // sheet is rendered inside the phone screen, so it stays within the device.
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareButtonPos, setShareButtonPos] = useState<{
    top: number;
    left: number;
    right: number;
  } | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let lastToggle = 0;
    const isShareButton = (el: Element | null) =>
      !!el?.closest?.('[aria-label="Compartilhar perfil"]');
    // The button toggles the sheet; suppress the native Share sheet.
    const onButton = (e: Event) => {
      const target = e.target as Element | null;
      if (!isShareButton(target)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (Date.now() - lastToggle < 350) return;
      lastToggle = Date.now();

      // Calculate button position in iframe-viewport coordinates (the iframe
      // fills the phone screen, so these are also the screen's local coords).
      const button = target?.closest('[aria-label="Compartilhar perfil"]');
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        // Coordinates relative to the iframe viewport; since the iframe fills
        // the phone screen, these match the screen's own local coordinates.
        const viewportWidth =
          button.ownerDocument?.documentElement?.clientWidth ?? iframe.clientWidth;
        setShareButtonPos({
          top: buttonRect.bottom,
          left: buttonRect.left,
          right: viewportWidth - buttonRect.right,
        });
      }

      setShareOpen((v) => !v);
    };
    // Tapping anywhere else in the app closes the sheet.
    const onDown = (e: Event) => {
      if (isShareButton(e.target as Element | null)) return;
      setShareOpen(false);
    };
    const closeOnScroll = () => setShareOpen(false);
    const attach = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.addEventListener("pointerup", onButton, true);
      doc.addEventListener("click", onButton, true);
      doc.addEventListener("pointerdown", onDown, true);
      iframe.contentWindow?.addEventListener("scroll", closeOnScroll, true);
    };
    attach();
    iframe.addEventListener("load", attach);
    return () => {
      iframe.removeEventListener("load", attach);
      const doc = iframe.contentDocument;
      doc?.removeEventListener("pointerup", onButton, true);
      doc?.removeEventListener("click", onButton, true);
      doc?.removeEventListener("pointerdown", onDown, true);
      iframe.contentWindow?.removeEventListener("scroll", closeOnScroll, true);
    };
  }, []);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      stopRepeat();
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      const ctx = audioCtxRef.current;
      if (ctx) void ctx.close();
    };
  }, [stopRepeat]);

  const muted = volume <= MIN_VOLUME;
  const volUpDisabled = !powerOn;

  return (
    <div className="phone-emulator__stage">
      <div
        className={
          powerOn ? "phone-emulator" : "phone-emulator phone-emulator--off"
        }
      >
        <button
          type="button"
          className="phone-emulator__button phone-emulator__button--volume-up"
          aria-label={controls.volumeUpTitle}
          aria-disabled={volUpDisabled}
          disabled={volUpDisabled}
          onPointerDown={onVolumePointerDown(VOLUME_STEP)}
          onPointerUp={stopRepeat}
          onPointerLeave={stopRepeat}
          onPointerCancel={stopRepeat}
          onClick={onVolumeClick(VOLUME_STEP)}
        />
        <button
          type="button"
          className="phone-emulator__button phone-emulator__button--volume-down"
          aria-label={controls.volumeDownTitle}
          aria-disabled={volUpDisabled}
          disabled={volUpDisabled}
          onPointerDown={onVolumePointerDown(-VOLUME_STEP)}
          onPointerUp={stopRepeat}
          onPointerLeave={stopRepeat}
          onPointerCancel={stopRepeat}
          onClick={onVolumeClick(-VOLUME_STEP)}
        />
        <button
          type="button"
          className="phone-emulator__button phone-emulator__button--power"
          aria-label={controls.powerTitle}
          aria-pressed={!powerOn}
          onClick={togglePower}
        />

        <div className="phone-emulator__screen">
          <span className="phone-emulator__camera" aria-hidden="true" />
          <iframe
            ref={iframeRef}
            src={demoUrl}
            title={frameTitle}
            loading="lazy"
            allow="clipboard-write; web-share"
          />

          <div
            className={
              hudVisible
                ? "phone-emulator__hud is-visible"
                : "phone-emulator__hud"
            }
            aria-hidden="true"
          >
            <span className="phone-emulator__hud-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                {muted ? (
                  <path
                    d="M16 9.5l5 5M21 9.5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path
                      d="M15.5 9a4 4 0 010 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 6.5a7.5 7.5 0 010 11"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </span>
            <span className="phone-emulator__hud-track">
              <span
                className="phone-emulator__hud-fill"
                style={{ width: `${volume}%` }}
              />
            </span>
            <span className="phone-emulator__hud-value">
              {muted ? controls.muted : `${volume}%`}
            </span>
          </div>

          <div
            className={
              powerOn
                ? "phone-emulator__offscreen"
                : "phone-emulator__offscreen is-active"
            }
            aria-hidden="true"
          />

          <span className="phone-emulator__gesture" aria-hidden="true" />

          <SharePopover
            open={shareOpen}
            url={shareUrl}
            labels={share}
            onClose={() => {
              setShareOpen(false);
              setShareButtonPos(null);
            }}
            buttonPos={shareButtonPos}
          />
        </div>
      </div>

      <ul className="phone-emulator__legend">
        <li className="phone-emulator__legend-item phone-emulator__legend-item--volume-up">
          <span className="phone-emulator__legend-key">
            {controls.volumeUpShort}
          </span>
          <span className="phone-emulator__legend-desc">
            {controls.volumeUpTitle}
          </span>
        </li>
        <li className="phone-emulator__legend-item phone-emulator__legend-item--volume-down">
          <span className="phone-emulator__legend-key">
            {controls.volumeDownShort}
          </span>
          <span className="phone-emulator__legend-desc">
            {controls.volumeDownTitle}
          </span>
        </li>
        <li className="phone-emulator__legend-item phone-emulator__legend-item--power">
          <span className="phone-emulator__legend-key">
            {controls.powerShort}
          </span>
          <span className="phone-emulator__legend-desc">
            {controls.powerTitle}
          </span>
        </li>
      </ul>
    </div>
  );
}
