"use client";

import { useEffect, useRef, useState } from "react";
import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";

function Arrow() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function SolutionConsulting({ lang }: { lang: Lang }) {
  const c = allCopy[lang].consulting;
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const focusLine = window.innerHeight * 0.52;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        const rect = step.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - focusLine);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = index;
        }
      });

      setActiveStep((current) => (current === closest ? current : closest));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goToStep = (index: number) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stepRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section
      className="consulting section section--dark"
      id="metodo"
      data-register="lamina"
    >
      <div className="consulting__atmosphere" aria-hidden="true" />
      <div className="section-index section-index--light">{c.index}</div>

      <header className="consulting__header" data-reveal>
        <div>
          <p className="eyebrow eyebrow--acid">{c.eyebrow}</p>
          <h2>
            {c.heading.before}
            <br />
            <em>{c.heading.emphasis}</em>
          </h2>
        </div>
        <p className="consulting__intro">{c.intro}</p>
      </header>

      <blockquote className="consulting__principle" data-reveal>
        <span>{c.principleLabel}</span>
        <p>{c.principle}</p>
      </blockquote>

      <div className="consulting__journey" id="metodo-jornada">
        <div className="consulting__visual">
          <div className="consulting__visual-sticky">
            <div className="consulting__scene-frame" aria-hidden="true">
              <span className="consulting__crosshair consulting__crosshair--a" />
              <span className="consulting__crosshair consulting__crosshair--b" />
            </div>

            <div className="consulting__scene-ui">
              <div className="consulting__scene-head">
                <span>{c.scene.label}</span>
                <small>{c.scene.live}</small>
              </div>

              <div className="consulting__scene-flow" aria-hidden="true">
                <span>{c.scene.input}</span>
                <span />
                <span>{c.scene.output}</span>
              </div>

              <div className="consulting__scene-status" aria-hidden="true">
                <span>{c.steps[activeStep].code} / 06</span>
                <strong>{c.steps[activeStep].verb}</strong>
              </div>

              <div className="consulting__scene-foot">
                <div className="consulting__legend">
                  <span>{c.scene.uncertainty}</span>
                  <span>{c.scene.evidence}</span>
                </div>
                <small>{c.scene.hint}</small>
              </div>

              <div className="consulting__step-nav" aria-label={c.scene.hint}>
                {c.steps.map((step, index) => (
                  <button
                    type="button"
                    key={step.code}
                    className={index === activeStep ? "is-active" : undefined}
                    aria-label={`${step.code} — ${step.verb}`}
                    aria-current={index === activeStep ? "step" : undefined}
                    onClick={() => goToStep(index)}
                  >
                    <span>{step.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ol className="consulting__steps">
          {c.steps.map((step, index) => (
            <li
              key={step.code}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              className={index === activeStep ? "consulting-step is-active" : "consulting-step"}
              aria-current={index === activeStep ? "step" : undefined}
            >
              <div className="consulting-step__meta">
                <span>{step.code}</span>
                <span>{step.verb}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="consulting-step__artifact">
                <span aria-hidden="true">↳</span>
                <small>{step.artifact}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="consulting__outcome" data-reveal>
        <div className="consulting__outcome-copy">
          <span>{c.outcome.label}</span>
          <h3>{c.outcome.title}</h3>
          <p>{c.outcome.body}</p>
          <a className="button button--acid" href="#contato">
            {c.outcome.cta} <Arrow />
          </a>
        </div>
        <dl className="consulting__outcome-grid">
          {c.outcome.cards.map((card) => (
            <div key={card.label}>
              <dt>{card.value}</dt>
              <dd>{card.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
