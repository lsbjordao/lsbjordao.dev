"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  cncSystems,
  googlePatents,
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
            <small>Botânica × Sistemas × Ciência de Dados</small>
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

        <div
          className="hero__visual"
          aria-label="Mimosa osmarii, espécie descrita por Lucas S.B. Jordão et al."
        >
          <picture>
            <source
              srcSet="/images/mimosa-osmarii-480.avif 480w, /images/mimosa-osmarii-640.avif 640w, /images/mimosa-osmarii-960.avif 960w, /images/mimosa-osmarii-1440.avif 1440w"
              sizes="(max-width: 820px) 100vw, 45vw"
              type="image/avif"
            />
            <source
              srcSet="/images/mimosa-osmarii-480.webp 480w, /images/mimosa-osmarii-640.webp 640w, /images/mimosa-osmarii-960.webp 960w, /images/mimosa-osmarii-1440.webp 1440w"
              sizes="(max-width: 820px) 100vw, 45vw"
              type="image/webp"
            />
            <img
              src="/images/mimosa-osmarii-960.webp"
              alt="Ramo de Mimosa osmarii com folhas e inflorescência rosada"
              width="960"
              height="640"
              fetchPriority="high"
            />
          </picture>
          <div className="hero__visual-shade" />
          <div className="specimen-tag">
            <span>ESPÉCIE NOVA / TAXONOMIA</span>
            <strong>Mimosa osmarii</strong>
            <small>descrita por Lucas S.B. Jordão et al.</small>
          </div>
          <div className="hero__coordinate">
            MIMOSA
            <br />
            DESCRIÇÃO TAXONÔMICA
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

      <section className="research-feature" id="tricomas">
        <div className="research-feature__media" data-reveal>
          <picture>
            <source
              srcSet="/images/trichomes-480.avif 480w, /images/trichomes-640.avif 640w, /images/trichomes-960.avif 960w, /images/trichomes-1440.avif 1440w"
              sizes="(max-width: 900px) 100vw, 58vw"
              type="image/avif"
            />
            <source
              srcSet="/images/trichomes-480.webp 480w, /images/trichomes-640.webp 640w, /images/trichomes-960.webp 960w, /images/trichomes-1440.webp 1440w"
              sizes="(max-width: 900px) 100vw, 58vw"
              type="image/webp"
            />
            <img
              src="/images/trichomes-960.webp"
              alt="Prancha comparativa com diferentes tipos de tricomas do gênero Mimosa"
              width="960"
              height="540"
              loading="lazy"
            />
          </picture>
          <div className="research-feature__plate">
            <span>PRANCHA MORFOLÓGICA / MIMOSA</span>
            <small>diversidade de formas e termos</small>
          </div>
        </div>

        <div className="research-feature__content" data-reveal>
          <div className="section-index">PUBLICAÇÃO EM DESTAQUE / 2020</div>
          <p className="eyebrow">Taxonomia · Morfologia comparada</p>
          <h2>
            Uma linguagem comum
            <br />
            <em>para os tricomas.</em>
          </h2>
          <p className="research-feature__lead">
            Antes de estruturar morfologia como dados, foi preciso organizar a
            própria linguagem usada para descrever as formas.
          </p>
          <p className="research-feature__body">
            No artigo <cite>Trichomes in Mimosa</cite>, propus com Marli Pires
            Morim e José Fernando A. Baumgratz uma caracterização dos tricomas
            do gênero e uma padronização terminológica para tornar seu uso
            taxonômico mais consistente e comparável.
          </p>
          <div className="research-feature__citation">
            <div>
              <span>FLORA · VOLUME 272</span>
              <strong>ARTICLE 151702</strong>
            </div>
            <ExternalLink
              href="https://doi.org/10.1016/j.flora.2020.151702"
              className="button button--ink"
            >
              Ler o artigo <Arrow diagonal />
            </ExternalLink>
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
          {cncSystems.map((system) => {
            const isCoac = system.name === "Acompanhamento de fluxo de trabalho";
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

        <aside className="mapbiomas-award" data-reveal>
          <div className="mapbiomas-award__media">
            <Image
              src="/images/mapbiomas-award.jpg"
              alt="Menção Honrosa para Lucas Sá Barreto Jordão na 4ª edição do Prêmio MapBiomas, categoria Aplicações em Políticas Públicas"
              fill
              sizes="(max-width: 820px) 100vw, 44vw"
            />
            <span>Reconhecimento · 2022</span>
          </div>

          <div className="mapbiomas-award__content">
            <div className="mapbiomas-award__meta">
              <span>4ª EDIÇÃO · PRÊMIO MAPBIOMAS</span>
              <strong>MENÇÃO HONROSA</strong>
            </div>
            <p className="eyebrow eyebrow--acid">
              Destaque · Aplicações em Políticas Públicas
            </p>
            <h3>
              O MapBiomas e a avaliação do risco de extinção da flora
              brasileira
            </h3>
            <p className="mapbiomas-award__lead">
              Trabalho desenvolvido no contexto do CNCFlora/JBRJ para tornar
              parâmetros do critério B da Lista Vermelha da IUCN mais
              objetivos, reprodutíveis e operacionais.
            </p>

            <div className="mapbiomas-award__methods">
              <article>
                <span>01 / DECLÍNIO CONTÍNUO</span>
                <p>
                  Regressão linear aplicada à série histórica de uso e
                  cobertura do solo para estimar tendências de acréscimo ou
                  decréscimo em AOO, EOO e habitat.
                </p>
              </article>
              <article>
                <span>02 / LOCATIONS</span>
                <p>
                  Método de buffer variável para aglutinar ocorrências
                  próximas e semiautomatizar a contagem de situações de ameaça.
                </p>
              </article>
            </div>

            <div className="mapbiomas-award__actions">
              <ExternalLink
                href="https://brasil.mapbiomas.org/wp-content/uploads/sites/4/2023/08/MencaoHonrosa_CategoriaDestaqueAplicacoesEmPoliticasPublicas_LucasSBJordao.pdf"
                className="button button--acid"
              >
                Abrir trabalho completo <Arrow diagonal />
              </ExternalLink>
              <ExternalLink
                href="https://lsbjordao.github.io/posts/Premio-MapBiomas/"
                className="text-link"
              >
                Ler contexto no blog <Arrow />
              </ExternalLink>
            </div>
          </div>
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
              {project.relatedLinks && (
                <div
                  className="project-card__related"
                  aria-label={`Links relacionados ao projeto ${project.title}`}
                >
                  <span>{project.relatedLabel ?? "Google Patents"}</span>
                  <div>
                    {project.relatedLinks.map((link) => (
                      <ExternalLink
                        href={link.href}
                        className={
                          link.status === "historical" ? "is-historical" : ""
                        }
                        key={link.href}
                      >
                        {link.label}
                        <Arrow diagonal />
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {(activeFilter === "Todos" || activeFilter === "Taxonomia") && (
          <aside className="patent-index" data-reveal>
            <div className="patent-index__intro">
              <div className="patent-index__meta">
                <span>REC–01 / DESCOBERTA INTERDISCIPLINAR</span>
                <time>VERIFICADO {googlePatents.verifiedAt}</time>
              </div>
              <div className="patent-index__headline">
                <span className="patent-index__count">
                  {String(googlePatents.mentions.length).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow eyebrow--acid">Google Patents</p>
                  <h3>
                    TypeTaxonScript no mapa semântico da{" "}
                    <em>engenharia de software.</em>
                  </h3>
                </div>
              </div>
              <div className="patent-index__summary">
                <p>
                  O artigo possui registro acadêmico próprio e foi associado
                  pela seção automatizada <i>Similar Documents</i> a três
                  documentos de patente que pude verificar — duas ocorrências
                  atuais e uma preservada no índice de busca.
                </p>
                <ExternalLink
                  href={googlePatents.scholarRecord.href}
                  className="button button--acid"
                >
                  Abrir registro acadêmico <Arrow diagonal />
                </ExternalLink>
              </div>
            </div>

            <details className="patent-index__details">
              <summary>
                <span>Ver listagem verificada</span>
                <span className="patent-index__summary-note">
                  Não equivale a patente ou citação de anterioridade
                </span>
                <span aria-hidden="true" className="patent-index__toggle">
                  +
                </span>
              </summary>
              <div className="patent-index__list">
                {googlePatents.mentions.map((mention, index) => (
                  <ExternalLink
                    href={mention.href}
                    className="patent-mention"
                    key={mention.publication}
                  >
                    <span className="patent-mention__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="patent-mention__publication">
                      <strong>{mention.publication}</strong>
                      <time>{mention.publicationDate}</time>
                    </span>
                    <span className="patent-mention__title">
                      {mention.title}
                      <small>{mention.note}</small>
                    </span>
                    <span
                      className={`patent-mention__status ${
                        mention.status === "Atual" ? "is-current" : ""
                      }`}
                    >
                      {mention.status}
                    </span>
                    <span className="patent-mention__arrow">
                      <Arrow diagonal />
                    </span>
                  </ExternalLink>
                ))}
              </div>
            </details>
          </aside>
        )}
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
          A ciência e gestão precisa de
          <br />
          <em>infraestruturas vivas e integradas.</em>
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
