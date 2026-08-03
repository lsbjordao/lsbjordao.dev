/**
 * Produção acadêmica verificável — o lastro dos números grandes do topo.
 *
 * Tudo aqui vem do Currículo Lattes (última atualização em 18/03/2026) e da
 * documentação reunida para os concursos de 2024—2026. Citações são nomes
 * próprios: ficam neste arquivo, iguais nos dois idiomas. Só os rótulos que as
 * envolvem vivem em `data/copy`.
 *
 * DOIs conferidos no Crossref um a um. Quando não achei o registro, o item fica
 * sem `doi` e é renderizado como texto — inventar identificador é pior do que
 * não ter link.
 */

export type PublicationRole = "first" | "co";

export type Publication = {
  role: PublicationRole;
  year: string;
  title: string;
  journal: string;
  /** Volume e páginas já formatados, como sairiam numa lista de referências. */
  reference: string;
  doi?: string;
  /** Aceito para publicação, ainda sem volume: não entra na contagem. */
  forthcoming?: boolean;
};

export const publications: Publication[] = [
  {
    role: "first",
    year: "2026",
    title:
      "Towards a New Classification of Mimosa (Leguminosae-Caesalpinoideae): Taxonomy of the Petiolovariabilis Clade",
    journal: "Systematic Botany",
    reference: "aceito para publicação",
    forthcoming: true,
  },
  {
    role: "first",
    year: "2025",
    title:
      "Advances in systematics of Mimosa (Fabaceae): phylogeny and biogeography of the Petiolovariabilis clade",
    journal: "Botanical Journal of the Linnean Society",
    reference: "v. 209, p. 51–67",
    doi: "https://doi.org/10.1093/botlinnean/boae090",
  },
  {
    role: "first",
    year: "2024",
    title:
      "TypeTaxonScript: sugarifying and enhancing data structures in biological systematics and biodiversity research",
    journal: "Biology Methods and Protocols",
    reference: "v. 9, p. bpae017",
    doi: "https://doi.org/10.1093/biomethods/bpae017",
  },
  {
    role: "first",
    year: "2024",
    title:
      "Phylogenetic placement of Mimosa pabstiana reinforces a biogeographic pattern of the Pleistocene Arc Theory in Mimosa (Leguminosae, Caesalpinoideae)",
    journal: "Phytotaxa",
    reference: "v. 655, p. 187–198",
    doi: "https://doi.org/10.11646/phytotaxa.655.2.6",
  },
  {
    role: "first",
    year: "2021",
    title: "New Species of Mimosa (Leguminosae) from Brazil",
    journal: "Systematic Botany",
    reference: "v. 46, p. 339–351",
    doi: "https://doi.org/10.1600/036364421X16231782047271",
  },
  {
    role: "first",
    year: "2020",
    title:
      "Trichomes in Mimosa (Leguminosae): towards a characterization and a terminology standardization",
    journal: "Flora",
    reference: "v. 272, p. 151702",
    doi: "https://doi.org/10.1016/j.flora.2020.151702",
  },
  {
    role: "first",
    year: "2018",
    title:
      "Toward a Census of Mimosa (Leguminosae) in the Atlantic Domain, Southeastern Brazil",
    journal: "Systematic Botany",
    reference: "v. 43, p. 162–197",
    doi: "https://doi.org/10.1600/036364418X696905",
  },
  {
    role: "first",
    year: "2017",
    title: "A new species of Mimosa (Leguminosae) endemic to the Brazilian Cerrado",
    journal: "Phytotaxa",
    reference: "v. 312, p. 237–246",
    doi: "https://doi.org/10.11646/phytotaxa.312.2.6",
  },
  {
    role: "first",
    year: "2014",
    title: "A new species of Mimosa (Leguminosae) from Brazil",
    journal: "Phytotaxa",
    reference: "v. 184, p. 131",
    doi: "https://doi.org/10.11646/phytotaxa.184.3.2",
  },

  {
    role: "co",
    year: "2026",
    title:
      "Continued progress in Mimosa (Leguminosae): tackling the systematics of a big genus in the Brazilian flora",
    journal: "Systematic Botany",
    reference: "aceito para publicação",
    forthcoming: true,
  },
  {
    role: "co",
    year: "2024",
    title: "Assembling the Brazilian flora: overview of Leguminosae diversity",
    journal: "Brazilian Journal of Botany",
    reference: "v. 47, p. 1245–1271",
    doi: "https://doi.org/10.1007/s40415-024-01034-7",
  },
  {
    role: "co",
    year: "2024",
    title:
      "Protecting stable biological nomenclatural systems enables universal communication: a collective international appeal",
    journal: "BioScience",
    reference: "v. 74, p. 467–472",
    doi: "https://doi.org/10.1093/biosci/biae043",
  },
  {
    role: "co",
    year: "2023",
    title:
      "Precipitation is the main axis of tropical plant phylogenetic turnover across space and time",
    journal: "Science Advances",
    reference: "v. 9, p. eade4954",
    doi: "https://doi.org/10.1126/sciadv.ade4954",
  },
  {
    role: "co",
    year: "2023",
    title:
      "Quantifying and mapping species threat abatement opportunities to support national target setting",
    journal: "Conservation Biology",
    reference: "v. 37, p. e14046",
    doi: "https://doi.org/10.1111/cobi.14046",
  },
  {
    role: "co",
    year: "2022",
    title:
      "Brazilian Flora 2020: leveraging the power of a collaborative scientific network",
    journal: "Taxon",
    reference: "v. 71, p. 178–198",
  },
  {
    role: "co",
    year: "2018",
    title:
      "Brazilian Flora 2020: innovation and collaboration to meet Target 1 of the Global Strategy for Plant Conservation (GSPC)",
    journal: "Rodriguésia",
    reference: "v. 69, p. 1513–1527",
    doi: "https://doi.org/10.1590/2175-7860201869402",
  },
];

export function publicationsByRole(role: PublicationRole) {
  return publications.filter((item) => item.role === role);
}

/** Os números grandes contam o que já saiu; o que está no prelo aparece à parte. */
export function publishedCount(role: PublicationRole) {
  return publicationsByRole(role).filter((item) => !item.forthcoming).length;
}

export type ExamBoardLevel = "phd" | "msc" | "undergraduate";

/**
 * Bancas examinadoras. O Lattes registra o nome de cada candidato, mas os nomes
 * ficam de fora daqui: uma das entradas está preenchida com o nome do próprio
 * Lucas por erro de digitação na base, e publicar o nome errado de outra pessoa
 * é um estrago que nenhum ganho de credibilidade compensa. O trabalho
 * examinado já identifica a banca.
 */
export const examBoards: Array<{
  level: ExamBoardLevel;
  year: string;
  title: string;
  institution: string;
}> = [
  {
    level: "msc",
    year: "2023",
    title:
      "Mimosa L. (Leguminosae, Caesalpinioideae) no Pantanal brasileiro: estudo florístico e avaliação das espécies resilientes ao fogo e à inundação",
    institution: "Universidade Federal de Mato Grosso do Sul",
  },
  {
    level: "undergraduate",
    year: "2023",
    title:
      "Anatomia comparativa de foliólulos de Mimosa (Fabaceae, Caesalpinioideae, clado Mimosoide, seção Habbasia): contribuições à taxonomia",
    institution: "Universidade Federal de Mato Grosso do Sul",
  },
  {
    level: "phd",
    year: "2023",
    title:
      "Nomenclatural novelties in the Catostemma clade (Aguiaria, Catostemma and Scleronema: Malvaceae, Bombacoideae, Adansonieae)",
    institution: "Escola Nacional de Botânica Tropical / JBRJ",
  },
  {
    level: "phd",
    year: "2021",
    title:
      "Revisão taxonômica, filogenia e biogeografia de Mimosa sect. Mimosa ser. Mimosa subser. Polycephalae (Benth.) Barneby",
    institution: "Universidade Estadual Paulista",
  },
  {
    level: "phd",
    year: "2020",
    title:
      "Ditaxis (Euphorbiaceae) from Chacoan and Pampean biogeographic provinces in South America",
    institution: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
  },
  {
    level: "phd",
    year: "2020",
    title:
      "Nomenclatural novelties in the Neotropical genus Plinia (Myrtaceae): synonymizations, lectotypifications and a new combination",
    institution: "Escola Nacional de Botânica Tropical / JBRJ",
  },
  {
    level: "phd",
    year: "2019",
    title:
      "Untangling the type collection of Pseudolaelia corcovadensis (Laeliinae, Epidendroideae, Orchidaceae): a threatened species of the Brazilian Atlantic Rain Forest",
    institution: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
  },
  {
    level: "phd",
    year: "2019",
    title:
      "Tachigali incana (Caesalpinoideae, Leguminosae): a new remarkable species of giant tree from the Andean Amazon Forest",
    institution: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
  },
];

/**
 * Orientação de trabalho de conclusão de curso de graduação. Como nas bancas,
 * o nome de quem foi orientado fica fora: o trabalho e a instituição bastam
 * para evidenciar a atividade, e o nome é de outra pessoa.
 */
export const supervisions: Array<{
  year: string;
  title: string;
  institution: string;
}> = [
  {
    year: "2023",
    title:
      "Diversidade taxonômica de Piptadenia Benth. na flora do Estado do Rio de Janeiro, Brasil",
    institution:
      "Instituto Federal de Educação, Ciência e Tecnologia do Rio de Janeiro",
  },
];

/** Periódicos para os quais emiti parecer ad hoc. */
export const peerReview: Array<{ journal: string; year: string }> = [
  { journal: "Biology Methods & Protocols", year: "2026" },
  { journal: "Revista Ceres", year: "2026" },
  { journal: "Academia Molecular Biology and Genomics", year: "2026" },
  { journal: "Brazilian Journal of Biology", year: "2025" },
  { journal: "Systematic Botany", year: "2025" },
  {
    journal: "Database: The Journal of Biological Databases and Curation",
    year: "2024",
  },
  { journal: "Phytotaxa", year: "2020" },
];

export const bookChapter = {
  chapter: "Fabaceae",
  book: "Livro Vermelho da Flora Endêmica do Estado do Rio de Janeiro",
  publisher: "Andrea Jakobsson Estúdio",
  year: "2018",
  isbn: "978-85-88742-88-8",
};
