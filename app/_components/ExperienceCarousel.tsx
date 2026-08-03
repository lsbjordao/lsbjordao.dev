"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { copy as allCopy } from "@/data/copy";
import { experiencePhotos, type Lang } from "@/data/site";

const rotationInterval = 5600;

export default function ExperienceCarousel({ lang }: { lang: Lang }) {
  const c = allCopy[lang].trajectory;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    const total = experiencePhotos.length;
    setActiveIndex((index + total) % total);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % experiencePhotos.length);
  }, []);

  const previous = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + experiencePhotos.length) % experiencePhotos.length,
    );
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused || interacting || reducedMotion) return;
    const timer = window.setInterval(next, rotationInterval);
    return () => window.clearInterval(timer);
  }, [activeIndex, interacting, next, paused, reducedMotion, visible]);

  const activePhoto = experiencePhotos[activeIndex];
  const activeFrame = c.frames[activePhoto.id];
  const activeChapter = c.experiences[activePhoto.chapter];
  const activeStatement = c.statement[activePhoto.chapter];

  return (
    <div
      className={`trajectory__image trajectory-carousel${paused ? " is-paused" : ""}`}
      ref={carouselRef}
      role="region"
      aria-label={c.carousel.label}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteracting(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
    >
      <div className="trajectory-carousel__slides">
        {experiencePhotos.map((photo, index) => {
          const total = experiencePhotos.length;
          const distance = (index - activeIndex + total) % total;
          // Only the active frame and its immediate neighbours stay mounted.
          // This preserves the crossfade and preloads the next image without
          // downloading the full photographic archive on first view.
          if (distance !== 0 && distance !== 1 && distance !== total - 1) return null;

          const frame = c.frames[photo.id];
          const isActive = index === activeIndex;
          return (
            <figure
              className={`trajectory-carousel__slide${isActive ? " is-active" : ""}${
                photo.fit === "contain" ? " is-contain" : ""
              }${photo.zoom ? ` is-zoom-${photo.zoom}` : ""}`}
              aria-hidden={!isActive}
              key={photo.id}
            >
              {photo.fit === "contain" && (
                <Image
                  className="trajectory-carousel__backdrop"
                  src={photo.image}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 42vw"
                  aria-hidden="true"
                />
              )}
              <Image
                className="trajectory-carousel__photo"
                src={photo.image}
                alt={frame.alt}
                fill
                sizes="(max-width: 820px) 100vw, 42vw"
                priority={index === 0}
                style={{ objectPosition: photo.position }}
              />
            </figure>
          );
        })}
      </div>

      <div className="trajectory-carousel__shade" aria-hidden="true" />

      <div className="trajectory-carousel__topline">
        <span>{c.carousel.archiveLabel}</span>
        <span>{c.carousel.counter(activeIndex + 1, experiencePhotos.length)}</span>
      </div>

      <p
        className={`trajectory-carousel__statement is-${activePhoto.chapter}`}
        key={`statement-${activePhoto.chapter}`}
      >
        {activeStatement.before}
        <em>{activeStatement.emphasis}</em>
      </p>

      <div className="trajectory-carousel__caption" key={activePhoto.id}>
        <span>{activeChapter.kicker}</span>
        <strong>{activeFrame.caption}</strong>
        <small>{activeChapter.place}</small>
      </div>

      <div className="trajectory-carousel__controls">
        <button type="button" onClick={previous} aria-label={c.carousel.previous}>
          <span aria-hidden="true">←</span>
        </button>

        <div className="trajectory-carousel__pagination" aria-label={c.carousel.pagination}>
          {experiencePhotos.map((photo, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => goTo(index)}
              aria-label={c.carousel.goTo(index + 1, experiencePhotos.length)}
              aria-current={index === activeIndex ? "true" : undefined}
              key={photo.id}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>

        <button type="button" onClick={next} aria-label={c.carousel.next}>
          <span aria-hidden="true">→</span>
        </button>
        <button
          className="trajectory-carousel__pause"
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-label={paused ? c.carousel.play : c.carousel.pause}
          aria-pressed={paused}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
      </div>
    </div>
  );
}
