"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  cncSystems,
  posts,
  projects,
  stats,
  timeline,
  type ProjectCategory,
} from "@/data/portfolio";

const projectFilters: Array<"Todos" | ProjectCategory> = [
  "Todos",
  "Conservação",
  "Taxonomia",
  "Software",
  "Ciência aberta",
];

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

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] =
    useState<(typeof projectFilters)[number]>("Todos");
  const [coacMode, setCoacMode] = useState<"prototype" | "operation">(
    "prototype",
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "Todos"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
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
  }, [activeFilter]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="LJ — Lucas Jordão, início">
          <span className="brand__mark">LJ</span>
          <span className="brand__meta">
            <strong>Lucas Jordão</strong>
            <small>Botânica × Sistemas</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Principal">
          <a href="#cncflora" onClick={closeMenu}>
            CNCFlora
          </a>
          <a href="#projetos" onClick={closeMenu}>
            Projetos
          </a>
          <a href="#trajetoria" onClick={closeMenu}>
            Trajetória
          </a>
          <a href="#notas" onClick={closeMenu}>
            Notas
          </a>
          <ExternalLink
            href="https://lsbjordao.github.io/"
            className="nav__external"
          >
            Blog
          </ExternalLink>
          <div className="nav__mobile-foot">
            <span>Rio de Janeiro · Brasil</span>
            <span>PT / EN em breve</span>
          </div>
        </nav>

        <div className="header-status">
          <span />
          Aberto a colaborações
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow">Taxonomia · Conservação · Engenharia de software</p>
          <h1>
            Botânica
            <span>em escala de</span>
            <em>sistemas.</em>
          </h1>
          <div className="hero__intro">
            <p>
              Sou Lucas S.B. Jordão. Transformo conhecimento biológico complexo
              em infraestrutura digital para pesquisa, conservação e tomada de
              decisão.
            </p>
            <div className="hero__actions">
              <a className="button button--acid" href="#projetos">
                Explorar trabalho <Arrow />
              </a>
              <a className="text-link" href="#cncflora">
                Estudo de caso CNCFlora <Arrow />
              </a>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-label="Microscopia de tricomas de Mimosa">
          <Image
            src="/images/trichomes.webp"
            alt="Mosaico de imagens microscópicas de tricomas do gênero Mimosa"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            quality={60}
            priority
          />
          <div className="hero__visual-shade" />
          <div className="specimen-tag">
            <span>SPECIMEN / DATA</span>
            <strong>Mimosa L.</strong>
            <small>morfologia estruturada</small>
          </div>
          <div className="hero__coordinate">
            22°58&apos;S
            <br />
            43°13&apos;W
          </div>
          <div className="hero__orbit" />
        </div>

        <div className="hero__footer">
          <span>Rio de Janeiro · Brasil</span>
          <a href="#manifesto">
            Role para descobrir
            <span className="scroll-line" />
          </a>
          <span>Desde 2004</span>
        </div>
      </section>

      <section className="stats" aria-label="Destaques da trajetória">
        {stats.map((stat) => (
          <article className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="manifesto section" id="manifesto">
        <div className="section-index">00 / PONTO DE VISTA</div>
        <div className="manifesto__content" data-reveal>
          <p className="manifesto__lead">
            A biodiversidade não cabe em uma planilha.
          </p>
          <p className="manifesto__statement">
            Ela exige sistemas que entendam{" "}
            <em>nomes, lugares, evidências e tempo</em> — e os transformem em
            decisões que possam ser explicadas.
          </p>
          <div className="manifesto__aside">
            <LeafMark />
            <p>
              Minha prática atravessa herbários, código e políticas públicas.
              Não traduzo ciência para tecnologia: desenho as duas juntas.
            </p>
          </div>
        </div>
      </section>

      <section className="case section section--dark" id="cncflora">
        <div className="case__grain" />
        <div className="section-index section-index--light">
          01 / ESTUDO DE CASO
        </div>

        <header className="case__header" data-reveal>
          <div>
            <p className="eyebrow eyebrow--acid">CNCFlora · 2020—2026</p>
            <h2>
              Uma infraestrutura
              <br />
              para <em>avaliar a flora.</em>
            </h2>
          </div>
          <div className="case__abstract">
            <p>
              Avaliar o risco de extinção é coordenar evidências fragmentadas,
              análises espaciais e muitas pessoas. No CNCFlora/JBRJ, converti
              esse processo em uma arquitetura de dados, filas e interfaces.
            </p>
            <div className="case__scope">
              <span>Meu escopo</span>
              <p>
                Arquitetura · desenvolvimento full stack · ETL · automação ·
                geoprocessamento · observabilidade
              </p>
            </div>
          </div>
        </header>

        <div className="system-map" data-reveal>
          <div className="system-map__label">
            <span>Arquitetura do trabalho</span>
            <small>do dado bruto à decisão</small>
          </div>
          <div className="system-map__flow" role="list">
            <div className="flow-node flow-node--source" role="listitem">
              <small>ENTRADAS</small>
              <strong>ProFlora</strong>
              <span>MapBiomas · especialistas</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-node" role="listitem">
              <small>PROCESSAR</small>
              <strong>Bull–ProFlora</strong>
              <span>ETL · filas · logs</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-node" role="listitem">
              <small>INTERPRETAR</small>
              <strong>Avalia–CNCFlora</strong>
              <span>mapas · métricas · texto</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
            <div className="flow-node flow-node--output" role="listitem">
              <small>COORDENAR</small>
              <strong>CoAC</strong>
              <span>etapas · papéis · auditoria</span>
            </div>
          </div>
        </div>

        <div className="case__systems">
          {cncSystems.map((system, index) => {
            const isCoac = index === 2;
            const image =
              isCoac && coacMode === "operation"
                ? "/images/coac-sheets.webp"
                : system.image;
            const imageAlt =
              isCoac && coacMode === "operation"
                ? "Planilha colaborativa usada para acompanhar o fluxo das avaliações"
                : system.imageAlt;

            return (
              <article className="system" key={system.name} data-reveal>
                <div className="system__meta">
                  <span>{system.number}</span>
                  <span>{system.title}</span>
                </div>
                <div className="system__media">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />
                  <span className="system__status">{system.status}</span>
                  {isCoac && (
                    <div
                      className="view-switch"
                      aria-label="Alternar visão do CoAC"
                    >
                      <button
                        type="button"
                        className={coacMode === "prototype" ? "is-active" : ""}
                        onClick={() => setCoacMode("prototype")}
                      >
                        Aplicação
                      </button>
                      <button
                        type="button"
                        className={coacMode === "operation" ? "is-active" : ""}
                        onClick={() => setCoacMode("operation")}
                      >
                        Operação real
                      </button>
                    </div>
                  )}
                </div>
                <div className="system__body">
                  <div>
                    <p className="eyebrow eyebrow--acid">{system.title}</p>
                    <h3>{system.name}</h3>
                  </div>
                  <p>{system.summary}</p>
                  <details>
                    <summary>
                      Minha contribuição
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{system.contribution}</p>
                  </details>
                  <ul className="tags" aria-label="Tecnologias e competências">
                    {system.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="authorship-note" data-reveal>
          <span className="authorship-note__number">A–01</span>
          <div>
            <h3>Autoria se preserva com precisão.</h3>
            <p>
              Este registro separa, deliberadamente, o que projetei e
              implementei, as ferramentas públicas utilizadas e o que chegou —
              ou não — à operação institucional. É um relato técnico da minha
              contribuição, sustentado por interfaces, documentos e artefatos
              do processo.
            </p>
          </div>
          <ExternalLink
            href="https://lsbjordao.github.io/posts/Premio-MapBiomas/"
            className="button button--outline"
          >
            Ver trabalho MapBiomas <Arrow diagonal />
          </ExternalLink>
        </aside>
      </section>

      <section className="work section" id="projetos">
        <div className="section-index">02 / TRABALHO SELECIONADO</div>
        <header className="work__header" data-reveal>
          <h2>
            Projetos que fazem
            <br />
            o conhecimento <em>circular.</em>
          </h2>
          <p>
            Software, dados e publicações concebidos para que conhecimento
            científico possa ser consultado, testado e reutilizado.
          </p>
        </header>

        <div className="project-filter" role="group" aria-label="Filtrar projetos">
          {projectFilters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilter === filter ? "is-active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span>
                {filter === "Todos"
                  ? projects.length
                  : projects.filter((project) => project.category === filter)
                      .length}
              </span>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article
              className={`project-card project-card--${(index % 3) + 1}`}
              key={project.title}
              data-reveal
            >
              <ExternalLink href={project.href} className="project-card__link">
                <div className="project-card__media">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 34vw"
                  />
                  <span className="project-card__number">{project.number}</span>
                  <span className="project-card__visit">
                    Abrir projeto <Arrow diagonal />
                  </span>
                </div>
                <div className="project-card__content">
                  <p>
                    {project.kicker} <span>{project.category}</span>
                  </p>
                  <h3>{project.title}</h3>
                  <div className="project-card__description">
                    <p>{project.description}</p>
                    <ul className="tags tags--dark">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ExternalLink>
            </article>
          ))}
        </div>
      </section>

      <section className="trajectory section" id="trajetoria">
        <div className="trajectory__image" data-reveal>
          <Image
            src="/images/fieldwork.webp"
            alt="Lucas Jordão preparando material botânico durante uma expedição de campo"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <span>Expedição botânica · Cerrado · 2017</span>
        </div>
        <div className="trajectory__content">
          <div className="section-index">03 / TRAJETÓRIA</div>
          <h2 data-reveal>
            Do espécime
            <br />
            à <em>infraestrutura.</em>
          </h2>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline__item" key={item.year} data-reveal>
                <time>{item.year}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="notes section" id="notas">
        <div className="section-index">04 / NOTAS & PUBLICAÇÕES</div>
        <header className="notes__header" data-reveal>
          <h2>
            Pensamento em
            <br />
            <em>forma pública.</em>
          </h2>
          <ExternalLink
            href="https://lsbjordao.github.io/"
            className="text-link text-link--dark"
          >
            Visitar o blog <Arrow />
          </ExternalLink>
        </header>
        <div className="post-list">
          {posts.map((post, index) => (
            <ExternalLink href={post.href} className="post" key={post.title}>
              <span className="post__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="post__date">{post.date}</span>
              <h3>{post.title}</h3>
              <span className="post__category">{post.category}</span>
              <span className="post__arrow">
                <Arrow diagonal />
              </span>
            </ExternalLink>
          ))}
        </div>
      </section>

      <section className="contact section">
        <div className="contact__orbit contact__orbit--one" />
        <div className="contact__orbit contact__orbit--two" />
        <div className="contact__mark">
          <LeafMark />
        </div>
        <p className="eyebrow eyebrow--acid">Próximo capítulo</p>
        <h2 data-reveal>
          A ciência precisa de
          <br />
          <em>infraestruturas vivas.</em>
        </h2>
        <p className="contact__intro">
          Estou interessado em projetos onde biodiversidade, dados e produto
          digital precisam funcionar como uma coisa só.
        </p>
        <div className="contact__links">
          <ExternalLink
            href="https://github.com/lsbjordao"
            className="button button--acid"
          >
            GitHub <Arrow diagonal />
          </ExternalLink>
          <ExternalLink
            href="https://lattes.cnpq.br/6445788694639027"
            className="button button--outline"
          >
            Currículo Lattes <Arrow diagonal />
          </ExternalLink>
          <ExternalLink
            href="https://lsbjordao.github.io/"
            className="button button--outline"
          >
            Blog <Arrow diagonal />
          </ExternalLink>
        </div>
      </section>

      <footer>
        <div className="footer__brand">
          <span>LJ</span>
          <p>
            Lucas Sá Barreto Jordão
            <small>Botânica em escala de sistemas.</small>
          </p>
        </div>
        <p>
          Conteúdo e trajetória © 2026
          <br />
          Construído no Rio de Janeiro.
        </p>
        <a href="#top" className="back-to-top">
          Voltar ao início ↑
        </a>
      </footer>
    </main>
  );
}
