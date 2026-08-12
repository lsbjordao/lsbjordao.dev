import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";

const demoUrl = "/mobile-mvp/index.html";

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

export default function MobileMvp({ lang }: { lang: Lang }) {
  const c = allCopy[lang].mobileMvp;

  return (
    <section
      className="mobile-mvp section section--dark"
      id="mobile"
      data-register="prancha"
    >
      <div className="mobile-mvp__glow" aria-hidden="true" />
      <div className="section-index section-index--light">{c.index}</div>

      <div className="mobile-mvp__layout">
        <div className="mobile-mvp__copy" data-reveal>
          <p className="eyebrow eyebrow--acid">{c.eyebrow}</p>
          <h2>
            {c.heading.before}
            <br />
            <em>{c.heading.emphasis}</em>
          </h2>
          <p className="mobile-mvp__intro">{c.intro}</p>

          <div className="mobile-mvp__actions">
            <a
              className="button button--acid"
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              {c.openDemo} <Arrow diagonal />
            </a>
          </div>

          <ol className="mobile-mvp__principles">
            {c.principles.map((principle, index) => (
              <li key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mobile-mvp__demo" data-reveal>
          <div className="mobile-mvp__demo-head" aria-hidden="true">
            <span>{c.demoLabel}</span>
            <span className="mobile-mvp__live">{c.liveLabel}</span>
          </div>

          <div className="phone-emulator">
            <span className="phone-emulator__button phone-emulator__button--volume" />
            <span className="phone-emulator__button phone-emulator__button--power" />
            <div className="phone-emulator__screen">
              <span className="phone-emulator__camera" aria-hidden="true" />
              <iframe
                src={demoUrl}
                title={c.frameTitle}
                loading="lazy"
                allow="clipboard-write; web-share"
              />
              <span className="phone-emulator__gesture" aria-hidden="true" />
            </div>
          </div>

          <p className="mobile-mvp__hint">
            <span aria-hidden="true">↳</span>
            {c.demoHint}
          </p>
        </div>
      </div>

      <div className="mobile-mvp__stack" data-reveal>
        <span>{c.stackLabel}</span>
        <ul>
          {c.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span>{c.status}</span>
      </div>
    </section>
  );
}
