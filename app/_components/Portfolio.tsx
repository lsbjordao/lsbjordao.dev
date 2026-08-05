"use client";

import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  cncSystems,
  courseHoursTotal,
  courses,
  googlePatents,
  heroImage,
  key as determinationKey,
  languages,
  mapbiomasAward,
  profile,
  projects,
  publicPortal,
  skillGroups,
  technologyCount,
  technologyGroups,
  timeline,
  tracks,
  trichomeImage,
  type CoupletId,
  type Lang,
  type ProjectCategoryId,
  type SystemId,
  type TrackId,
} from "@/data/site";
import { copy as allCopy } from "@/data/copy";
import Cladogram from "./Cladogram";
import CvGraph from "./CvGraph";
import ExperienceCarousel from "./ExperienceCarousel";
import Frond from "./Frond";
import Phenology from "./Phenology";
import ScrollProgress from "./ScrollProgress";
import StatBoard from "./StatBoard";
import Teaching from "./Teaching";

type Filter = "all" | ProjectCategoryId;

const filterOrder: Filter[] = [
  "all",
  "conservation",
  "taxonomy",
  "software",
  "openScience",
];

const trackOrder: TrackId[] = ["data", "fullstack", "geo", "research"];

const technologyRowSplit = 2;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "icon icon--diagonal" : "icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 52 52" className="leaf-mark">
      <path d="M10 40C30 39 42 26 44 8 26 10 13 21 10 40Z" fill="currentColor" />
      <path d="M10 43C17 29 26 20 41 11" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="10" cy="42" r="4" fill="var(--coral)" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon icon--brand">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.33-.03-3.05-1.94-3.05-1.94 0-2.24 1.45-2.24 2.95V21h-4V9Z"
      />
    </svg>
  );
}

function srcSet(base: string, widths: number[], extension: string) {
  return widths.map((width) => `${base}-${width}.${extension} ${width}w`).join(", ");
}

export default function Portfolio({ lang }: { lang: Lang }) {
  const c = allCopy[lang];
  const other = languages.find((entry) => entry.code !== lang)!;

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [trackingMode, setTrackingMode] = useState<"app" | "operation">("app");
  const [systemSlides, setSystemSlides] = useState<Partial<Record<SystemId, number>>>({});

  const [path, setPath] = useState<Array<{ coupletId: CoupletId; leadIndex: number }>>([]);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const determinationRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const updateSystemMagnifier = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const media = event.currentTarget;
      const target = event.target;

      if (
        event.pointerType !== "mouse" ||
        (target instanceof Element && target.closest(".system-media-controls"))
      ) {
        media.classList.remove("is-magnifying");
        return;
      }

      const image = media.querySelector<HTMLImageElement>(".system__media-image");
      const magnifier = media.querySelector<HTMLElement>(".system__magnifier");
      if (!image || !magnifier || !image.naturalWidth || !image.naturalHeight) return;

      const bounds = media.getBoundingClientRect();
      const x = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
      const y = Math.max(0, Math.min(event.clientY - bounds.top, bounds.height));
      const imageStyle = window.getComputedStyle(image);
      const paddingLeft = Number.parseFloat(imageStyle.paddingLeft) || 0;
      const paddingRight = Number.parseFloat(imageStyle.paddingRight) || 0;
      const paddingTop = Number.parseFloat(imageStyle.paddingTop) || 0;
      const paddingBottom = Number.parseFloat(imageStyle.paddingBottom) || 0;
      const availableWidth = bounds.width - paddingLeft - paddingRight;
      const availableHeight = bounds.height - paddingTop - paddingBottom;
      const containsImage =
        media.classList.contains("system__media--prototype") ||
        media.classList.contains("system__media--contain");
      const fitScale = containsImage
        ? Math.min(
            availableWidth / image.naturalWidth,
            availableHeight / image.naturalHeight,
          )
        : Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
      const renderedWidth = image.naturalWidth * fitScale;
      const renderedHeight = image.naturalHeight * fitScale;
      const imageLeft = containsImage
        ? paddingLeft + (availableWidth - renderedWidth) / 2
        : (bounds.width - renderedWidth) / 2;
      const imageTop = containsImage
        ? paddingTop + (availableHeight - renderedHeight) / 2
        : 0;
      const zoom = 2.2;
      const radius = magnifier.offsetWidth / 2;

      magnifier.style.left = `${x}px`;
      magnifier.style.top = `${y}px`;
      magnifier.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
      magnifier.style.backgroundSize = `${renderedWidth * zoom}px ${renderedHeight * zoom}px`;
      magnifier.style.backgroundPosition = `${radius - (x - imageLeft) * zoom}px ${
        radius - (y - imageTop) * zoom
      }px`;
      media.classList.add("is-magnifying");
    },
    [],
  );

  const changeSystemSlide = useCallback(
    (systemId: SystemId, total: number, delta: number) => {
      setSystemSlides((current) => ({
        ...current,
        [systemId]: ((current[systemId] ?? 0) + delta + total) % total,
      }));
    },
    [],
  );

  const selectSystemSlide = useCallback((systemId: SystemId, index: number) => {
    setSystemSlides((current) => ({ ...current, [systemId]: index }));
  }, []);

  const coupletById = useMemo(
    () => Object.fromEntries(determinationKey.map((couplet) => [couplet.id, couplet])),
    [],
  );
  const trackById = useMemo(
    () => Object.fromEntries(tracks.map((track) => [track.id, track])),
    [],
  );

  const lastLead = path.length
    ? coupletById[path[path.length - 1].coupletId].leads[path[path.length - 1].leadIndex]
    : undefined;
  const currentCoupletId: CoupletId | undefined = path.length ? lastLead?.goTo : "1";
  const determinedTrack = lastLead?.track;

  const visibleProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const skillCount = useMemo(
    () =>
      skillGroups.reduce(
        (total, group) => total + c.technology.skills.groups[group.id].items.length,
        0,
      ),
    [c],
  );

  const technologyRows = useMemo(
    () => [
      technologyGroups.slice(0, technologyRowSplit).flatMap((group) =>
        group.items.map((item) => ({ ...item, group: c.technology.groups[group.id] })),
      ),
      technologyGroups.slice(technologyRowSplit).flatMap((group) =>
        group.items.map((item) => ({ ...item, group: c.technology.groups[group.id] })),
      ),
    ],
    [c],
  );

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeFilter, showAllTracks, determinedTrack]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  // O menu aberto é um overlay em tela cheia: sem Escape, quem navega por
  // teclado fica sem saída além de tabular a lista inteira.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const chooseLead = useCallback(
    (coupletId: CoupletId, leadIndex: number) => {
      setPath((current) => [...current, { coupletId, leadIndex }]);
      setShowAllTracks(false);
    },
    [],
  );

  const restartKey = useCallback(() => {
    setPath([]);
    setShowAllTracks(false);
  }, []);

  // Move focus to the determination once the key resolves, so keyboard and
  // screen-reader users land on the answer instead of hunting for it.
  useEffect(() => {
    if (determinedTrack) determinationRef.current?.focus();
  }, [determinedTrack]);

  const activeFilterCount = visibleProjects.length;

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {c.a11y.skipToContent}
      </a>

      <ScrollProgress />

      <header className="site-header">
        <a className="brand" href="#top" aria-label={c.a11y.brand}>
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__meta">
            <strong>Lucas Jordão</strong>
            <small>{c.nav.brandTagline}</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label={c.a11y.mainNav}>
          <a href="#contratar" onClick={closeMenu}>
            {c.nav.contratar}
          </a>
          <a href="#cncflora" onClick={closeMenu}>
            {c.nav.cncflora}
          </a>
          <a href="#projetos" onClick={closeMenu}>
            {c.nav.projetos}
          </a>
          <a href="#aulas" onClick={closeMenu}>
            {c.nav.aulas}
          </a>
          <a href="#trajetoria" onClick={closeMenu}>
            {c.nav.trajetoria}
          </a>
          <a href="#curriculo-grafo" onClick={closeMenu}>
            {c.nav.cv}
          </a>
          <div className="nav__mobile-foot">
            <span>{c.nav.mobileLocation}</span>
            <span>{c.nav.mobileAvailability}</span>
          </div>
        </nav>

        <div className="header-tools">
          <a className="header-status" href={c.nav.statusHref}>
            <span aria-hidden="true" />
            {c.nav.status}
          </a>
          <a className="lang-switch" href={other.href} hrefLang={other.code} lang={other.code}>
            <span className="lang-switch__current" aria-hidden="true">
              {lang.toUpperCase()}
            </span>
            <span className="lang-switch__next">{other.label}</span>
            <span className="visually-hidden">{c.meta.switchTo}</span>
          </a>
        </div>

        <button
          className="menu-toggle"
          type="button"
          ref={menuToggleRef}
          aria-label={menuOpen ? c.a11y.closeMenu : c.a11y.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* O overlay do menu cobre a página, mas sem `inert` o conteúdo atrás
          continua tabulável e o foco some para links invisíveis. */}
      <main id="conteudo" inert={menuOpen}>
        <section className="hero" id="top">
          <div className="hero__copy">
            <p className="eyebrow">{c.hero.eyebrow}</p>
            <h1>
              {c.hero.headline.line1}
              <span>{c.hero.headline.line2}</span>
              <em>{c.hero.headline.line3}</em>
            </h1>
            <div className="hero__intro">
              <p>{c.hero.intro}</p>
              <div className="hero__actions">
                <a className="button button--acid" href="#contato">
                  {c.hero.primaryCta} <Arrow />
                </a>
                <a className="text-link" href="#contratar">
                  {c.hero.secondaryCta} <Arrow />
                </a>
              </div>
              <dl className="availability">
                <div>
                  <dt>{c.hero.availability.label}</dt>
                  <dd>
                    <span className="availability__dot" aria-hidden="true" />
                    {c.hero.availability.value}
                  </dd>
                </div>
                <div>
                  <dt>{c.hero.availability.modalityLabel}</dt>
                  <dd>{c.hero.availability.modality}</dd>
                </div>
                <div>
                  <dt>{c.hero.availability.startLabel}</dt>
                  <dd>{c.hero.availability.start}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="hero__visual" aria-label={c.a11y.heroImage}>
            <picture>
              <source
                srcSet={srcSet(heroImage.base, heroImage.widths, "avif")}
                sizes="(max-width: 820px) 100vw, 45vw"
                type="image/avif"
              />
              <source
                srcSet={srcSet(heroImage.base, heroImage.widths, "webp")}
                sizes="(max-width: 820px) 100vw, 45vw"
                type="image/webp"
              />
              <img
                src={`${heroImage.base}-960.webp`}
                alt={c.hero.imageAlt}
                width="960"
                height="640"
                fetchPriority="high"
              />
            </picture>
            <div className="hero__visual-shade" />
            <a
              href={heroImage.doi}
              target="_blank"
              rel="noreferrer"
              className="specimen-tag"
            >
              <span>{c.hero.specimen.kicker}</span>
              <strong>{c.hero.specimen.name}</strong>
              <small>{c.hero.specimen.credit}</small>
              <span className="specimen-tag__action">
                {c.hero.specimen.action} <Arrow diagonal />
              </span>
            </a>
            <div className="hero__coordinate">
              {c.hero.coordinate.line1}
              <br />
              {c.hero.coordinate.line2}
            </div>
            <div className="hero__orbit" />
          </div>

          <div className="hero__footer">
            <span>{c.hero.footer.location}</span>
            <a href="#manifesto">
              {c.hero.footer.scroll}
              <span className="scroll-line" />
            </a>
            <span>{c.hero.footer.since}</span>
          </div>
        </section>

        <StatBoard lang={lang} />

        <section className="manifesto section" id="manifesto">
          <div className="section-index">{c.manifesto.index}</div>
          <div className="manifesto__content" data-reveal>
            <p className="manifesto__lead">{c.manifesto.lead}</p>
            <p className="manifesto__statement">
              {c.manifesto.statement.before}
              <em>{c.manifesto.statement.emphasis}</em>
              {c.manifesto.statement.after}
            </p>
            <div className="manifesto__aside">
              <LeafMark />
              <p>{c.manifesto.aside}</p>
            </div>
          </div>
        </section>

        {/* Signature element: the recruiter runs a dichotomous key — the
            taxonomist's own instrument — to determine which profile they need. */}
        <section className="determination section section--dark" id="contratar">
          <div className="determination__grain" />
          <div className="section-index section-index--light">{c.key.index}</div>

          <header className="determination__header" data-reveal>
            <div>
              <p className="eyebrow eyebrow--acid">{c.key.eyebrow}</p>
              <h2>
                {c.key.heading.before}
                <br />
                <em>{c.key.heading.emphasis}</em>
              </h2>
            </div>
            <p className="determination__intro">{c.key.intro}</p>
          </header>

          <div className="determination__board" data-reveal>
            <div className="key-panel" aria-label={c.a11y.keyRegion}>
              <div className="key-panel__head">
                <span>{c.key.startLabel}</span>
                {path.length > 0 && (
                  <button type="button" className="key-panel__restart" onClick={restartKey}>
                    {c.key.restart}
                  </button>
                )}
              </div>

              <ol className="key-ladder">
                {path.map(({ coupletId, leadIndex }) => {
                  const lead = coupletById[coupletId].leads[leadIndex];
                  const text = c.key.couplets[coupletId].leads[leadIndex].text;
                  return (
                    <li className="key-ladder__step is-taken" key={`${coupletId}-${leadIndex}`}>
                      <span className="key-ladder__mark">{lead.mark}</span>
                      <span className="key-ladder__text">{text}</span>
                    </li>
                  );
                })}

                {currentCoupletId && (
                  <li className="key-ladder__couplet">
                    <p className="key-ladder__question">
                      {c.key.couplets[currentCoupletId].question}
                    </p>
                    <div className="key-ladder__leads">
                      {coupletById[currentCoupletId].leads.map((lead, index) => {
                        const leadCopy = c.key.couplets[currentCoupletId].leads[index];
                        return (
                          <button
                            type="button"
                            className="key-lead"
                            key={lead.mark}
                            onClick={() => chooseLead(currentCoupletId, index)}
                          >
                            <span className="key-lead__mark">{lead.mark}</span>
                            <span className="key-lead__body">
                              <span className="key-lead__text">{leadCopy.text}</span>
                              <small>{leadCopy.hint}</small>
                            </span>
                            <span className="key-lead__go" aria-hidden="true">
                              {lead.track ? "=" : "→"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </li>
                )}
              </ol>

              {!determinedTrack && (
                <button
                  type="button"
                  className="key-panel__skip"
                  onClick={() => setShowAllTracks((open) => !open)}
                  aria-expanded={showAllTracks}
                >
                  {c.key.seeAll}
                  <span aria-hidden="true">{showAllTracks ? "−" : "+"}</span>
                </button>
              )}
            </div>

            <div
              className={determinedTrack ? "slip is-determined" : "slip"}
              ref={determinationRef}
              tabIndex={-1}
              aria-live="polite"
            >
              {determinedTrack ? (
                (() => {
                  const track = trackById[determinedTrack];
                  const trackCopy = c.key.tracks[determinedTrack];
                  return (
                    <>
                      <div className="slip__head">
                        <span>{c.key.resultLabel}</span>
                        <span className="slip__code">{track.code}</span>
                      </div>
                      <h3>{trackCopy.name}</h3>
                      <p className="slip__tagline">{trackCopy.tagline}</p>
                      <p className="slip__body">{trackCopy.body}</p>

                      <div className="slip__section">
                        <span>{c.key.evidenceLabel}</span>
                        <ul>
                          {trackCopy.evidence.map((item) => (
                            <li key={item.label}>
                              <a href={item.href}>
                                {item.label}
                                <Arrow />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="slip__section">
                        <span>{c.key.stackLabel}</span>
                        <ul className="tags tags--dark">
                          {track.stack.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <a
                        className="button button--acid slip__cta"
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {c.key.hireLabel} <Arrow diagonal />
                      </a>
                    </>
                  );
                })()
              ) : (
                <div className="slip__empty">
                  <span className="slip__stamp">{c.key.resultLabel}</span>
                  <div className="slip__rules" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p>{c.key.emptyHint}</p>
                </div>
              )}
            </div>
          </div>

          {showAllTracks && !determinedTrack && (
            <div className="track-grid" data-reveal>
              {trackOrder.map((id) => {
                const track = trackById[id];
                const trackCopy = c.key.tracks[id];
                return (
                  <article className="track-card" key={id}>
                    <span className="track-card__code">{track.code}</span>
                    <h3>{trackCopy.name}</h3>
                    <p className="track-card__tagline">{trackCopy.tagline}</p>
                    <p>{trackCopy.body}</p>
                    <ul className="tags tags--dark">
                      {track.stack.slice(0, 6).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="research-feature" id="tricomas">
          <div className="research-feature__media" data-reveal>
            <picture>
              <source
                srcSet={srcSet(trichomeImage.base, trichomeImage.widths, "avif")}
                sizes="(max-width: 900px) 100vw, 58vw"
                type="image/avif"
              />
              <source
                srcSet={srcSet(trichomeImage.base, trichomeImage.widths, "webp")}
                sizes="(max-width: 900px) 100vw, 58vw"
                type="image/webp"
              />
              <img
                src={`${trichomeImage.base}-960.webp`}
                alt={c.research.imageAlt}
                width="960"
                height="540"
                loading="lazy"
              />
            </picture>
            <div className="research-feature__plate">
              <span>{c.research.plate.title}</span>
              <small>{c.research.plate.subtitle}</small>
            </div>
          </div>

          <div className="research-feature__content" data-reveal>
            <div className="section-index">{c.research.index}</div>
            <p className="eyebrow">{c.research.eyebrow}</p>
            <h2>
              {c.research.heading.line1}
              <br />
              <em>{c.research.heading.emphasis}</em>
            </h2>
            <p className="research-feature__lead">{c.research.lead}</p>
            <p className="research-feature__body">
              {c.research.body.before}
              <cite>{c.research.body.cite}</cite>
              {c.research.body.after}
            </p>
            <div className="research-feature__citation">
              <div>
                <span>{c.research.citation.journal}</span>
                <strong>{c.research.citation.article}</strong>
              </div>
              <a
                href={trichomeImage.doi}
                target="_blank"
                rel="noreferrer"
                className="button button--ink"
              >
                {c.research.cta} <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="case section section--dark" id="cncflora">
          <div className="case__grain" />
          <div className="section-index section-index--light">{c.case.index}</div>

          <header className="case__header" data-reveal>
            <div>
              <p className="eyebrow eyebrow--acid">{c.case.eyebrow}</p>
              <h2>
                {c.case.heading.line1}
                <br />
                {c.case.heading.line2}
                <em>{c.case.heading.emphasis}</em>
              </h2>
            </div>
            <div className="case__abstract">
              <p>{c.case.abstract}</p>
              <div className="case__scope">
                <span>{c.case.scope.label}</span>
                <p>{c.case.scope.value}</p>
              </div>
            </div>
          </header>

          <div className="system-map" data-reveal>
            <div className="system-map__label">
              <span>{c.case.map.label}</span>
              <small>{c.case.map.sublabel}</small>
            </div>
            <div className="system-map__flow" role="list">
              {c.case.map.nodes.map((node, index) => (
                <Fragment key={node.name}>
                  {index > 0 && (
                    <span className="flow-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                  <div
                    className={
                      index === c.case.map.nodes.length - 1
                        ? "flow-node flow-node--output"
                        : "flow-node"
                    }
                    role="listitem"
                  >
                    <small>{node.kicker}</small>
                    <strong>{node.name}</strong>
                    <span>{node.detail}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="case__systems">
            {cncSystems.map((system) => {
              const systemCopy = c.case.systems[system.id];
              const isTracking = system.id === "tracking";
              const isAvalia = system.id === "avalia";
              const isLegacy = system.id === "legacy";
              const isMagnifiable = isTracking || system.id === "bull" || isAvalia;
              const showAlternate = isTracking && trackingMode === "operation";
              const galleryImages = [system.image, ...(system.gallery ?? [])];
              const hasGallery = galleryImages.length > 1;
              const galleryIndex = hasGallery
                ? (systemSlides[system.id] ?? 0) % galleryImages.length
                : 0;
              const image =
                showAlternate && system.altImage
                  ? system.altImage
                  : galleryImages[galleryIndex];
              const galleryImageAlt =
                hasGallery && "galleryImageAlts" in systemCopy
                  ? systemCopy.galleryImageAlts[galleryIndex]
                  : undefined;
              const imageAlt =
                showAlternate && "altImageAlt" in systemCopy
                  ? systemCopy.altImageAlt
                  : (galleryImageAlt ?? systemCopy.imageAlt);
              const status =
                showAlternate && "operationStatus" in systemCopy
                  ? systemCopy.operationStatus
                  : systemCopy.status;

              return (
                <article className="system" key={system.id} data-reveal>
                  <div className="system__meta">
                    <span>{system.number}</span>
                    <span>{systemCopy.role}</span>
                  </div>
                  <div
                    className={`system__media${
                      isTracking && !showAlternate ? " system__media--prototype" : ""
                    }${isAvalia || system.id === "bull" ? " system__media--contain" : ""}${
                      isMagnifiable ? " system__media--magnifiable" : ""
                    }`}
                    role={hasGallery ? "region" : undefined}
                    aria-label={hasGallery ? c.case.gallery.label(systemCopy.name) : undefined}
                    tabIndex={hasGallery ? 0 : undefined}
                    onPointerMove={isMagnifiable ? updateSystemMagnifier : undefined}
                    onPointerLeave={
                      isMagnifiable
                        ? (event) => event.currentTarget.classList.remove("is-magnifying")
                        : undefined
                    }
                    onKeyDown={
                      hasGallery
                        ? (event) => {
                            if (event.key === "ArrowLeft") {
                              event.preventDefault();
                              changeSystemSlide(system.id, galleryImages.length, -1);
                            }
                            if (event.key === "ArrowRight") {
                              event.preventDefault();
                              changeSystemSlide(system.id, galleryImages.length, 1);
                            }
                          }
                        : undefined
                    }
                  >
                    {isLegacy && "diagram" in systemCopy ? (
                      <div className="legacy-migration" role="img" aria-label={imageAlt}>
                        <div className="legacy-migration__source">
                          <span className="legacy-migration__database" />
                          <small>{systemCopy.diagram.sourceKicker}</small>
                          <strong>{systemCopy.diagram.sourceName}</strong>
                        </div>
                        <span className="legacy-migration__arrow">→</span>
                        <div className="legacy-migration__tools">
                          <div>
                            <Image
                              src="/images/apache-airflow.svg"
                              alt=""
                              width={54}
                              height={54}
                            />
                            <span>
                              <small>{systemCopy.diagram.orchestration}</small>
                              <strong>Airflow</strong>
                            </span>
                          </div>
                          <div>
                            <Image src="/images/dbt.svg" alt="" width={54} height={54} />
                            <span>
                              <small>{systemCopy.diagram.transformation}</small>
                              <strong>dbt</strong>
                            </span>
                          </div>
                        </div>
                        <span className="legacy-migration__arrow">→</span>
                        <div className="legacy-migration__target">
                          <span>{systemCopy.diagram.target}</span>
                          <small>{systemCopy.diagram.targetNote}</small>
                        </div>
                      </div>
                    ) : (
                      <Image
                        className={`system__media-image${
                          hasGallery ? " system__media-image--slide" : ""
                        }`}
                        key={image}
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 55vw"
                      />
                    )}
                    {isMagnifiable && (
                      <span className="system__magnifier" aria-hidden="true" />
                    )}
                    <span className="system__status">{status}</span>
                    {isTracking && (
                      <div
                        className="view-switch system-media-controls"
                        aria-label={c.a11y.switchView}
                      >
                        <button
                          type="button"
                          className={trackingMode === "app" ? "is-active" : ""}
                          onClick={() => setTrackingMode("app")}
                        >
                          {c.case.viewSwitch.app}
                        </button>
                        <button
                          type="button"
                          className={trackingMode === "operation" ? "is-active" : ""}
                          onClick={() => setTrackingMode("operation")}
                        >
                          {c.case.viewSwitch.operation}
                        </button>
                      </div>
                    )}
                    {hasGallery && (
                      <div
                        className="system-gallery__controls system-media-controls"
                        aria-label={c.case.gallery.label(systemCopy.name)}
                      >
                        <button
                          type="button"
                          onClick={() => changeSystemSlide(system.id, galleryImages.length, -1)}
                          aria-label={c.case.gallery.previous}
                        >
                          ←
                        </button>
                        <div className="system-gallery__pagination">
                          {galleryImages.map((galleryImage, index) => (
                            <button
                              type="button"
                              className={index === galleryIndex ? "is-active" : ""}
                              onClick={() => selectSystemSlide(system.id, index)}
                              aria-label={c.case.gallery.goTo(index + 1, galleryImages.length)}
                              aria-current={index === galleryIndex ? "true" : undefined}
                              key={galleryImage}
                            >
                              <span aria-hidden="true" />
                            </button>
                          ))}
                        </div>
                        <span className="system-gallery__counter" aria-live="polite">
                          {String(galleryIndex + 1).padStart(2, "0")} /{" "}
                          {String(galleryImages.length).padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeSystemSlide(system.id, galleryImages.length, 1)}
                          aria-label={c.case.gallery.next}
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="system__body">
                    <div>
                      <p className="eyebrow eyebrow--acid">{systemCopy.role}</p>
                      <h3>{systemCopy.name}</h3>
                    </div>
                    <p>{systemCopy.summary}</p>
                    <div className="contribution">
                      <span>{c.case.contributionLabel}</span>
                      <p>{systemCopy.contribution}</p>
                    </div>
                    <ul className="tags" aria-label={c.a11y.technologies}>
                      {system.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {isLegacy && (
                      <a
                        href={publicPortal}
                        target="_blank"
                        rel="noreferrer"
                        className="system__public-link"
                      >
                        {c.case.publicPortalCta} <Arrow diagonal />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="mapbiomas-award" id="mapbiomas" data-reveal>
            <div className="mapbiomas-award__media">
              <Image
                className="mapbiomas-award__backdrop"
                src={mapbiomasAward.image}
                alt=""
                fill
                sizes="(max-width: 820px) 100vw, 44vw"
                aria-hidden="true"
              />
              <Image
                className="mapbiomas-award__image"
                src={mapbiomasAward.image}
                alt={c.case.award.imageAlt}
                fill
                sizes="(max-width: 820px) 100vw, 44vw"
              />
              <span>{c.case.award.badge}</span>
            </div>

            <div className="mapbiomas-award__content">
              <div className="mapbiomas-award__meta">
                <span>{c.case.award.edition}</span>
                <strong>{c.case.award.honour}</strong>
              </div>
              <p className="eyebrow eyebrow--acid">{c.case.award.eyebrow}</p>
              <h3>{c.case.award.title}</h3>
              <p className="mapbiomas-award__lead">{c.case.award.lead}</p>

              <div className="mapbiomas-award__methods">
                {c.case.award.methods.map((method) => (
                  <article key={method.label}>
                    <span>{method.label}</span>
                    <p>{method.text}</p>
                  </article>
                ))}
              </div>

              <div className="mapbiomas-award__actions">
                <a
                  href={mapbiomasAward.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--acid"
                >
                  {c.case.award.primaryCta} <Arrow diagonal />
                </a>
                <a
                  href={mapbiomasAward.post}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {c.case.award.secondaryCta} <Arrow />
                </a>
              </div>
            </div>
          </aside>
        </section>

        <section className="work section" id="projetos">
          <div className="section-index">{c.work.index}</div>
          <header className="work__header" data-reveal>
            <h2>
              {c.work.heading.line1}
              <br />
              {c.work.heading.line2}
              <em>{c.work.heading.emphasis}</em>
            </h2>
            <p>{c.work.intro}</p>
          </header>

          <div className="project-filter" role="group" aria-label={c.a11y.filterProjects}>
            {filterOrder.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "is-active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {c.work.filters[filter]}
                <span>
                  {filter === "all"
                    ? projects.length
                    : projects.filter((project) => project.category === filter).length}
                </span>
              </button>
            ))}
          </div>
          <p className="visually-hidden" role="status">
            {c.a11y.filterStatus(activeFilterCount, c.work.filters[activeFilter])}
          </p>

          <div className="project-grid">
            {visibleProjects.map((project, index) => {
              const projectCopy = c.work.projects[project.id];
              return (
                <article
                  className={`project-card project-card--${(index % 3) + 1}${
                    project.fit ? ` project-card--${project.fit}` : ""
                  }${project.category === "openScience" ? " project-card--compact" : ""}${
                    project.id === "quartoWriting" ? " project-card--compact-first" : ""
                  }`}
                  key={project.id}
                  data-reveal
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                  >
                    <div className="project-card__media">
                      <Image
                        src={project.image}
                        alt={projectCopy.imageAlt}
                        fill
                        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 34vw"
                      />
                      <span className="project-card__number">{project.number}</span>
                      <span className="project-card__visit">
                        {c.work.openProject} <Arrow diagonal />
                      </span>
                    </div>
                    <div className="project-card__content">
                      <p>
                        {projectCopy.kicker} <span>{c.work.filters[project.category]}</span>
                      </p>
                      <h3>{projectCopy.title}</h3>
                      <div className="project-card__description">
                        <p>{projectCopy.description}</p>
                        <ul className="tags tags--dark">
                          {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </a>
                  {project.relatedLinks && (
                    <div
                      className="project-card__related"
                      aria-label={c.a11y.relatedLinks(projectCopy.title)}
                    >
                      <span>
                        {c.work.relatedLabels[project.relatedLabelId ?? "patents"]}
                      </span>
                      <div>
                        {project.relatedLinks.map((link) => (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={link.status === "historical" ? "is-historical" : ""}
                            key={link.href}
                          >
                            {
                              c.work.relatedLinkLabels[
                                link.id as keyof typeof c.work.relatedLinkLabels
                              ]
                            }
                            <Arrow diagonal />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {(activeFilter === "all" || activeFilter === "taxonomy") && (
            <aside className="patent-index" data-reveal>
              <div className="patent-index__intro">
                <div className="patent-index__meta">
                  <span>{c.patents.meta}</span>
                  <time>
                    {c.patents.verified} {googlePatents.verifiedAt[lang]}
                  </time>
                </div>
                <div className="patent-index__headline">
                  <span className="patent-index__count">
                    {String(googlePatents.mentions.length).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow eyebrow--acid">{c.patents.eyebrow}</p>
                    <h3>
                      {c.patents.heading.before}
                      <em>{c.patents.heading.emphasis}</em>
                    </h3>
                  </div>
                </div>
                <div className="patent-index__summary">
                  <p>
                    {c.patents.summary.before}
                    <i>{c.patents.summary.italic}</i>
                    {c.patents.summary.after}
                  </p>
                  <a
                    href={googlePatents.scholarRecord}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--acid"
                  >
                    {c.patents.cta} <Arrow diagonal />
                  </a>
                </div>
              </div>

              <details className="patent-index__details">
                <summary>
                  <span>{c.patents.detailsLabel}</span>
                  <span className="patent-index__summary-note">{c.patents.detailsNote}</span>
                  <span aria-hidden="true" className="patent-index__toggle">
                    +
                  </span>
                </summary>
                <div className="patent-index__list">
                  {googlePatents.mentions.map((mention, index) => (
                    <a
                      href={mention.href}
                      target="_blank"
                      rel="noreferrer"
                      className="patent-mention"
                      key={mention.publication}
                    >
                      <span className="patent-mention__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="patent-mention__publication">
                        <strong>{mention.publication}</strong>
                        <time>{mention.publicationDate[lang]}</time>
                      </span>
                      <span className="patent-mention__title">
                        {
                          c.patents.mentionTitles[
                            mention.publication as keyof typeof c.patents.mentionTitles
                          ]
                        }
                        <small>
                          {
                            c.patents.mentionNotes[
                              mention.publication as keyof typeof c.patents.mentionNotes
                            ]
                          }
                        </small>
                      </span>
                      <span
                        className={`patent-mention__status ${
                          mention.status === "current" ? "is-current" : ""
                        }`}
                      >
                        {c.patents.statusLabels[mention.status]}
                      </span>
                      <span className="patent-mention__arrow">
                        <Arrow diagonal />
                      </span>
                    </a>
                  ))}
                </div>
              </details>
            </aside>
          )}
        </section>

        <Teaching lang={lang} />

        <section className="technology-stack section" id="tecnologias">
          <div className="technology-stack__glow" aria-hidden="true" />
          <div className="section-index section-index--light">{c.technology.index}</div>

          <header className="technology-stack__header" data-reveal>
            <div>
              <p className="eyebrow eyebrow--acid">{c.technology.eyebrow}</p>
              <h2>
                {c.technology.heading.line1}
                <br />
                <em>{c.technology.heading.emphasis}</em>
              </h2>
            </div>
            <div className="technology-stack__intro">
              <span className="technology-stack__count">
                <strong>{technologyCount}</strong>
                {c.technology.countLabel}
              </span>
              <p>{c.technology.intro}</p>
            </div>
          </header>

          <div className="technology-stack__groups" data-reveal>
            {technologyGroups.map((group, index) => (
              <div className="technology-group" key={group.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{c.technology.groups[group.id]}</strong>
                <small>
                  {group.items.length} {c.technology.itemsLabel}
                </small>
              </div>
            ))}
          </div>

          <div className="technology-marquee" aria-label={c.a11y.techList} data-reveal>
            {technologyRows.map((row, rowIndex) => (
              <div
                className={`technology-marquee__viewport ${rowIndex === 1 ? "is-reverse" : ""}`}
                key={`technology-row-${rowIndex + 1}`}
              >
                <div className="technology-marquee__track">
                  {[false, true].map((duplicate) => (
                    <div
                      className="technology-marquee__set"
                      aria-hidden={duplicate || undefined}
                      key={duplicate ? "duplicate" : "primary"}
                    >
                      {row.map((technology) => (
                        <div
                          className="technology-chip"
                          key={`${technology.group}-${technology.name}`}
                        >
                          <span className="technology-chip__icon">
                            {technology.icon ? (
                              <Image
                                src={technology.icon}
                                alt=""
                                width={34}
                                height={34}
                                className={technology.monochrome ? "is-monochrome" : undefined}
                              />
                            ) : (
                              <strong aria-hidden="true">{technology.mark}</strong>
                            )}
                          </span>
                          <span className="technology-chip__label">
                            <strong>{technology.name}</strong>
                            <small>{technology.group}</small>
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* As ferramentas acima respondem "com o quê"; estes grupos respondem
              "o que sei fazer" — que é o que uma vaga de fato pergunta. */}
          <div className="skills" data-reveal>
            <header className="skills__header">
              <div>
                <p className="eyebrow eyebrow--acid">{c.technology.skills.eyebrow}</p>
                <h3>
                  {c.technology.skills.heading.before}
                  <br />
                  <em>{c.technology.skills.heading.emphasis}</em>
                </h3>
              </div>
              <div className="skills__intro">
                <span className="technology-stack__count">
                  <strong>{skillCount}</strong>
                  {c.technology.skills.countLabel}
                </span>
                <p>{c.technology.skills.intro}</p>
              </div>
            </header>

            <div className="skills__grid">
              {skillGroups.map((group) => {
                const groupCopy = c.technology.skills.groups[group.id];
                return (
                  <article className="skill-card" key={group.id}>
                    <span className="skill-card__code">{group.code}</span>
                    <h4>{groupCopy.title}</h4>
                    <ul>
                      {groupCopy.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <Phenology lang={lang} />

        {/* A leitura filogenética da trajetória vem antes da leitura cronológica:
            ela é o argumento; a linha do tempo abaixo é o registro. */}
        <section className="lineage section section--dark" id="linhagem">
          <Frond />
          <Cladogram lang={lang} />
        </section>

        <section className="trajectory section" id="trajetoria">
          <ExperienceCarousel lang={lang} />
          <div className="trajectory__content">
            <div className="section-index">{c.trajectory.index}</div>
            <h2 data-reveal>
              {c.trajectory.heading.line1}
              <br />
              {c.trajectory.heading.line2}
              <em>{c.trajectory.heading.emphasis}</em>
            </h2>
            <p className="trajectory__intro" data-reveal>
              {c.trajectory.intro}
            </p>
            <div className="trajectory__experiences">
              {(["field", "lab", "herbaria"] as const).map((id, index) => {
                const experience = c.trajectory.experiences[id];
                return (
                  <article className="trajectory-experience" key={id} data-reveal>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p>{experience.kicker}</p>
                      <h3>{experience.title}</h3>
                      <small>{experience.place}</small>
                      <p>{experience.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="timeline__label" data-reveal>
              <span>{c.trajectory.timelineLabel}</span>
              <small>{c.trajectory.timelineSpan}</small>
            </div>
            <div className="timeline">
              {timeline.map((item) => (
                <article
                  className={
                    item.id === "now" ? "timeline__item is-current" : "timeline__item"
                  }
                  key={item.id}
                  data-reveal
                >
                  <time>{item.year}</time>
                  <div>
                    <h3>{c.trajectory.items[item.id].title}</h3>
                    <p>{c.trajectory.items[item.id].text}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* A virada para dados e infraestrutura tem lastro em curso feito,
                não só em projeto entregue. */}
            <div className="timeline__label" data-reveal>
              <span>{c.trajectory.courses.label}</span>
              <small>
                {c.trajectory.courses.note(courses.length, courseHoursTotal)}
              </small>
            </div>
            <ul className="courses" data-reveal>
              {courses.map((course) => {
                const courseCopy = c.trajectory.courses.items[course.id];
                return (
                  <li className="course" key={course.id}>
                    <time>{course.year}</time>
                    <div>
                      <h3>{courseCopy.title}</h3>
                      <small>{courseCopy.place}</small>
                    </div>
                    {course.hours && <span className="course__hours">{course.hours}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <CvGraph lang={lang} />

        <section className="contact section" id="contato">
          <div className="contact__orbit contact__orbit--one" />
          <div className="contact__orbit contact__orbit--two" />
          <div className="section-index section-index--light">{c.contact.index}</div>

          <div className="contact__grid">
            <div className="contact__lead">
              <div className="contact__mark">
                <LeafMark />
              </div>
              <p className="eyebrow eyebrow--acid">{c.contact.eyebrow}</p>
              <h2 data-reveal>
                {c.contact.heading.line1}
                <br />
                <em>{c.contact.heading.emphasis}</em>
              </h2>
              <p className="contact__intro">{c.contact.intro}</p>

              <div className="contact__actions">
                <a
                  className="button button--acid"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInMark />
                  {c.contact.primaryCta}
                  <Arrow diagonal />
                </a>
                <a
                  className="button button--outline"
                  href={profile.lattes}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.contact.lattesCta} <Arrow diagonal />
                </a>
                <a className="button button--outline" href={profile.cv[lang]} download>
                  {c.contact.cvCta} <Arrow />
                </a>
                <a
                  className="button button--outline"
                  href={profile.cvDetailed[lang]}
                  download
                >
                  {c.contact.cvDetailedCta} <Arrow />
                </a>
              </div>

              <div className="contact__secondary">
                {(
                  [
                    ["github", profile.github, profile.githubHandle],
                    ["lattes", profile.lattes, profile.lattesId],
                    ["blog", profile.blog, "lsbjordao.github.io"],
                  ] as const
                ).map(([id, href, handle]) => (
                  <a href={href} target="_blank" rel="noreferrer" key={id}>
                    <strong>{c.contact.links[id]}</strong>
                    <small>{c.contact.linkNote[id]}</small>
                    <code>{handle}</code>
                    <Arrow diagonal />
                  </a>
                ))}
              </div>
            </div>

            <aside className="looking" data-reveal>
              <div className="looking__head">
                <span className="availability__dot" aria-hidden="true" />
                {c.contact.cardLabel}
              </div>
              <dl>
                {c.contact.looking.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>
      </main>

      <footer inert={menuOpen}>
        <div className="footer__brand">
          <span>{profile.initials}</span>
          <p>
            {profile.name}
            <small>{c.footer.tagline}</small>
          </p>
        </div>
        <p>
          {c.footer.copyright}
          <br />
          {c.footer.built}
        </p>
        <div className="footer__links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.lattes} target="_blank" rel="noreferrer">
            {c.contact.links.lattes}
          </a>
          <a href={other.href} hrefLang={other.code} lang={other.code}>
            {other.full}
          </a>
          <a href="#top" className="back-to-top">
            {c.footer.backToTop} ↑
          </a>
        </div>
      </footer>
    </>
  );
}
