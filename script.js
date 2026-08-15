// Vota Chi? — v4: posizioni reali anonime al posto delle domande generiche.
// Meccanica: per ogni tema, l'utente vede la posizione reale di un partito (senza sapere quale)
// e dice se è d'accordo. Solo alla fine il partito viene rivelato, nella scheda profilo.
//
// STATO DEI DATI (onestà prima di tutto):
// - "Economia" e "Lavoro" sono popolati con 12 posizioni reali ciascuno, parafrasate dalle fonti indicate.
// - Gli altri 8 temi sono strutturalmente pronti ma vuoti ("in preparazione") — richiedono
//   la stessa ricerca verificata fatta per Economia e Lavoro, tema per tema.
// - Le schede "Storia" dei partiti sono fatti pubblici verificabili (fondazione, leader, ideologia).
// Scenario 2026, pre-liste ufficiali per le elezioni politiche 2027. Da aggiornare quando
// la composizione di liste/coalizioni sarà definitiva.

const THEMES = [
  { key: "economia", label: "Economia" },
  { key: "lavoro", label: "Lavoro" },
  { key: "ambiente", label: "Ambiente" },
  { key: "sanita", label: "Sanità" },
  { key: "istruzione", label: "Istruzione" },
  { key: "sicurezza", label: "Sicurezza" },
  { key: "immigrazione", label: "Immigrazione" },
  { key: "diritti", label: "Diritti civili" },
  { key: "giustizia", label: "Giustizia" },
  { key: "europa", label: "Europa ed estero" },
];

const PARTY_COLORS = {
  fdi: "#0B4C2E", lega: "#1E7A3D", fi: "#1B4F8C", noimoderati: "#3E8FC9",
  pd: "#C0234B", m5s: "#D4A017", avs: "#7A3E5C", iv: "#C94F8C", piueuropa: "#E0459A",
  azione: "#2E8B8B", fn: "#2B2B2B", pld: "#6B6F76",
};

// Partiti reali — scenario 2026, PRE-liste ufficiali (elezioni 2027 non ancora convocate).
// "storia": fatti pubblici verificabili (fondazione, leadership, posizionamento).
const PARTIES = [
  { id: "01", slug: "fdi", initials: "FdI", name: "Fratelli d'Italia", leader: "Giorgia Meloni",
    color: PARTY_COLORS.fdi,
    storia: "Fondato nel dicembre 2012 da Giorgia Meloni, Ignazio La Russa e Guido Crosetto come costola conservatrice nata dallo scioglimento del Popolo della Libertà. Conservatorismo nazionale, gruppo ECR in Europa. Al governo dall'ottobre 2022, con Meloni presidente del Consiglio." },
  { id: "02", slug: "lega", initials: "LEGA", name: "Lega", leader: "Matteo Salvini",
    color: PARTY_COLORS.lega,
    storia: "Nata come Lega Nord tra il 1989 e il 1991 attorno a Umberto Bossi, con un'agenda originaria di autonomia del Nord Italia. Sotto la segreteria di Matteo Salvini (dal 2013) si è trasformata in forza nazionale sovranista, mantenendo il radicamento territoriale nordista." },
  { id: "03", slug: "fi", initials: "FI", name: "Forza Italia", leader: "Antonio Tajani",
    color: PARTY_COLORS.fi,
    storia: "Fondata da Silvio Berlusconi nel gennaio 1994. Dopo la sua morte (giugno 2023) è guidata da Antonio Tajani. Membro del PPE a livello europeo, posizionamento liberale-moderato e atlantista." },
  { id: "04", slug: "noimoderati", initials: "NM", name: "Noi Moderati", leader: "Maurizio Lupi",
    color: PARTY_COLORS.noimoderati,
    storia: "Federazione centrista nata nel 2022 attorno a Maurizio Lupi (già Noi con l'Italia), che riunisce diverse liste moderate del centrodestra. Parte della coalizione di governo dal 2022." },
  { id: "05", slug: "pd", initials: "PD", name: "Partito Democratico", leader: "Elly Schlein",
    color: PARTY_COLORS.pd,
    storia: "Fondato nel 2007 dalla fusione di Democratici di Sinistra e Democrazia è Libertà - La Margherita. Guidato da Elly Schlein dal 2023, prima segretaria donna del partito." },
  { id: "06", slug: "m5s", initials: "M5S", name: "Movimento 5 Stelle", leader: "Giuseppe Conte",
    color: PARTY_COLORS.m5s,
    storia: "Fondato nel 2009 da Beppe Grillo e Gianroberto Casaleggio come movimento anti-establishment. Ha governato in coalizione con Lega (2018-19), PD (2019-21) e nel governo Draghi. Guidato da Giuseppe Conte dal 2021." },
  { id: "07", slug: "avs", initials: "AVS", name: "Alleanza Verdi e Sinistra", leader: "Angelo Bonelli / Nicola Fratoianni",
    color: PARTY_COLORS.avs,
    storia: "Federazione nata il 26 luglio 2022 dall'alleanza elettorale tra Sinistra Italiana (Nicola Fratoianni) ed Europa Verde (Angelo Bonelli), per superare la soglia di sbarramento del 3%. I due restano co-portavoce." },
  { id: "08", slug: "iv", initials: "IV", name: "Italia Viva", leader: "Matteo Renzi",
    color: PARTY_COLORS.iv,
    storia: "Fondata da Matteo Renzi nel settembre 2019, a seguito di una scissione dal Partito Democratico. Posizionamento liberale-riformista di centro." },
  { id: "09", slug: "piueuropa", initials: "+EU", name: "+Europa", leader: "Riccardo Magi",
    color: PARTY_COLORS.piueuropa,
    storia: "Nata nel 2017 su iniziativa di Emma Bonino, di tradizione radicale e liberale, con forte impronta europeista. Guidata oggi da Riccardo Magi." },
  { id: "10", slug: "azione", initials: "AZ", name: "Azione", leader: "Carlo Calenda",
    color: PARTY_COLORS.azione,
    storia: "Fondata da Carlo Calenda nel 2019 dopo l'uscita dal PD. Orientamento liberale-riformista, si richiama esplicitamente all'esperienza del governo Draghi." },
  { id: "11", slug: "fn", initials: "FN", name: "Futuro Nazionale", leader: "Roberto Vannacci",
    color: PARTY_COLORS.fn,
    storia: "Fondato il 3 febbraio 2026 da Roberto Vannacci, generale ed eurodeputato, dopo l'uscita dalla Lega. Programma incentrato su identità, sicurezza e \"remigrazione\", pubblicato come \"B.I.P. 2027-2037\"." },
  { id: "12", slug: "pld", initials: "PLD", name: "Partito Liberal Democratico", leader: "Luigi Marattin (segretario) / Andrea Marcucci (presidente)",
    color: PARTY_COLORS.pld,
    storia: "Nato l'8 marzo 2025 a Roma dalla fusione di quattro realtà liberali (Orizzonti Liberali, Nos, Liberal Forum, Libdem), nel solco dell'\"agenda Draghi\". Affiliato ad ALDE Party a livello europeo." },
];

function partyById(id) { return PARTIES.find((p) => p.id === id); }

// Coalizioni reali (scenario 2026, provvisorio — la composizione può cambiare fino al deposito liste).
const COALITIONS = [
  { id: "cdx", name: "Centrodestra (coalizione di governo)", color: "#1B4F8C", partyIds: ["01", "02", "03", "04"] },
  { id: "cs", name: "Campo largo (centrosinistra esteso)", color: "#C0234B", partyIds: ["05", "06", "07", "08", "09"] },
  { id: "na", name: "Non allineati / fuori coalizione", color: "#5B6478", partyIds: ["10", "11", "12"] },
];

function coalitionOf(partyId) {
  return COALITIONS.find((c) => c.partyIds.includes(partyId)) || null;
}

// Legge elettorale: stato reale a inizio agosto 2026.
const ELECTORAL_LAW = {
  statoAttuale: "Rosatellum (l. 165/2017), in vigore",
  riformaInCorso: "\"Stabilicum\": approvata dalla Camera il 16/07/2026, in attesa del voto finale al Senato (15/09/2026)",
  sogliaPartito: "3% (invariata anche nello Stabilicum)",
  sogliaCoalizione: "10% (invariata anche nello Stabilicum)",
  premioStabilicum: "42% dei voti validi → premio di 70 seggi Camera + 35 Senato, fino a un tetto di 220/113",
  fonte: "Camera dei Deputati; cronaca parlamentare, luglio 2026",
};

// ---- OPINIONI: una posizione reale per partito per tema, mostrata in forma anonima. ----
// Parafrasi in linguaggio proprio, non citazioni testuali. Ogni voce ha una fonte.
// Temi senza voci = "in preparazione", non vengono mostrati come survey.
const OPINIONS = {
  economia: [
    { partyId: "01", text: "Le tasse vanno abbassate in modo lineare per famiglie e imprese, privilegiando la stabilità dei conti pubblici rispetto a nuova spesa.", source: "posizionamento noto del partito, programmi e dichiarazioni di governo 2022-2026" },
    { partyId: "02", text: "La flat tax va estesa il più possibile, insieme a più autonomia fiscale per le Regioni.", source: "posizionamento noto del partito, programmi e dichiarazioni pubbliche ricorrenti" },
    { partyId: "03", text: "La riduzione della pressione fiscale e la libertà d'impresa restano la priorità, in un quadro di piena collaborazione con l'Unione Europea.", source: "posizionamento noto del partito, linea PPE" },
    { partyId: "04", text: "Le piccole e medie imprese meritano più sostegno diretto e meno burocrazia, in continuità con le politiche della coalizione di governo.", source: "posizionamento noto del partito" },
    { partyId: "05", text: "Chi guadagna di più deve contribuire di più, per finanziare servizi pubblici e ridurre le disuguaglianze.", source: "posizionamento noto del partito, linea Schlein" },
    { partyId: "06", text: "Servono più tutele per chi lavora — salario minimo per legge e strumenti contro la povertà — anche a costo di intervenire di più sul mercato.", source: "posizionamento noto del partito" },
    { partyId: "07", text: "Tassare chi ha di più non è un tabù: giustizia sociale e transizione ecologica vanno finanziate insieme.", source: "N. Fratoianni, dichiarazione ANSA, giugno 2026" },
    { partyId: "08", text: "Le riforme che rendono il mercato del lavoro più flessibile aiutano l'occupazione più dei vincoli burocratici.", source: "posizionamento noto del partito, eredità Jobs Act" },
    { partyId: "09", text: "Meno tasse, meno burocrazia e più concorrenza, dentro un quadro europeo più integrato.", source: "posizionamento noto del partito, tradizione radicale-liberale" },
    { partyId: "10", text: "La competitività del Paese si costruisce con riforme strutturali e responsabilità di bilancio, non con nuova spesa a debito.", source: "posizionamento noto del partito, agenda Draghi" },
    { partyId: "11", text: "Secondo la proposta del partito: un'aliquota fiscale unica e più bassa per le piccole imprese, con il taglio del cuneo fiscale finanziato dai risparmi attesi dalle politiche di \"remigrazione\" (proposta contestata dagli oppositori, non verificata in modo indipendente).", source: "Pagella Politica e Sardegnagol, luglio 2026 — programma \"B.I.P.\"" },
    { partyId: "12", text: "Il Paese ha bisogno di riforme liberali serie — fisco, concorrenza, PA — nel solco del governo Draghi, senza slogan populisti.", source: "posizionamento noto del partito, fondazione marzo 2025" },
  ],
  lavoro: [
    { partyId: "01", text: "Il salario giusto va ancorato alla contrattazione collettiva nazionale, non fissato per legge: lo abbiamo già trasformato in norma con il Decreto Lavoro.", source: "Decreto Legge 62/2026 (\"salario giusto\"), dichiarazioni G. Meloni, giugno 2026" },
    { partyId: "02", text: "Il salario va deciso dalla contrattazione tra le parti sociali, non imposto per legge dallo Stato.", source: "posizione di maggioranza sul Decreto Lavoro 2026 (linea di coalizione, non dichiarazione individuale specifica trovata)" },
    { partyId: "03", text: "La contrattazione collettiva resta lo strumento giusto per fissare i salari: un minimo legale rischia di livellare verso il basso i contratti già migliori.", source: "posizione di maggioranza sul Decreto Lavoro 2026 (linea di coalizione, non dichiarazione individuale specifica trovata)" },
    { partyId: "04", text: "Il salario giusto, ancorato ai contratti collettivi, è la strada giusta: lo abbiamo sostenuto nella maggioranza di governo.", source: "posizione di maggioranza sul Decreto Lavoro 2026 (linea di coalizione)" },
    { partyId: "05", text: "Serve un salario minimo legale di 9 euro l'ora: il \"salario giusto\" del governo lascia la situazione com'era.", source: "Pagella Politica, giugno 2026; proposta di legge unitaria delle opposizioni" },
    { partyId: "06", text: "Il salario minimo legale è una battaglia che portiamo avanti da più di dieci anni, ora anche con una proposta di legge di iniziativa popolare.", source: "Movimento 5 Stelle, sito ufficiale, 2026" },
    { partyId: "07", text: "Il salario minimo legale è necessario, insieme al rafforzamento della contrattazione collettiva: le due cose non si escludono.", source: "adesione alla proposta di legge unitaria delle opposizioni, Confcommercio/Pagella Politica" },
    { partyId: "08", text: "Il salario minimo legale è tra le misure che sosteniamo, insieme alle altre opposizioni.", source: "Pagella Politica, giugno 2026" },
    { partyId: "09", text: "Un salario minimo legale, insieme a PD, M5S e le altre opposizioni, è una misura di civiltà che il governo continua a rifiutare.", source: "Pagella Politica, giugno 2026; proposta di legge unitaria delle opposizioni" },
    { partyId: "10", text: "Siamo firmatari della proposta di legge sul salario minimo a 9 euro l'ora, insieme alle altre opposizioni.", source: "proposta di legge unitaria delle opposizioni, 2023-2026" },
    { partyId: "11", text: "In dichiarazione di voto abbiamo criticato l'assenza di una soglia minima oraria nel Decreto Lavoro: anche a destra si può sostenere un minimo salariale.", source: "Pagella Politica, giugno 2026 — dichiarazione di voto alla Camera" },
    { partyId: "12", text: "Un minimo legale imposto per decreto rischia di essere uno slogan: meglio riformare sul serio la contrattazione collettiva.", source: "posizione dedotta dal posizionamento liberale del partito — nessuna dichiarazione diretta specifica trovata nelle fonti consultate" },
  ],
  ambiente: [],
  sanita: [],
  istruzione: [],
  sicurezza: [],
  immigrazione: [],
  diritti: [],
  giustizia: [],
  europa: [],
};

function themeHasOpinions(themeKey) {
  return (OPINIONS[themeKey] || []).length > 0;
}

// ---- stato ----
const state = {
  activeTheme: null,
  answers: {},          // { themeKey: { partyId: -1|0|1 } }
  order: {},             // { themeKey: [partyId in ordine anonimo casuale] }
  posInOrder: 0,
  manualOverride: {},
};

THEMES.forEach((t) => { state.answers[t.key] = {}; });

function shuffledPartyOrder(themeKey) {
  const ids = OPINIONS[themeKey].map((o) => o.partyId);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

// ---- DOM refs ----
const board = document.getElementById("board");
const remainingCountEl = document.getElementById("remainingCount");
const resetBtn = document.getElementById("resetBtn");
const themeTabsEl = document.getElementById("themeTabs");
const qCategoryEl = document.getElementById("qCategory");
const qTextEl = document.getElementById("qText");
const qGlobalDoneEl = document.getElementById("qGlobalDone");
const progressFill = document.getElementById("progressFill");
const answerButtons = document.querySelectorAll(".answer-btn");
const profileEmpty = document.getElementById("profileEmpty");
const profileContent = document.getElementById("profileContent");
const profileTag = document.getElementById("profileTag");
const profileName = document.getElementById("profileName");
const profileParty = document.getElementById("profileParty");
const profileValues = document.getElementById("profileValues");
const toggleElectoralLawBtn = document.getElementById("toggleElectoralLaw");
const toggleCoalitionsBtn = document.getElementById("toggleCoalitions");
const electoralLawPanel = document.getElementById("electoralLawPanel");
const coalitionsPanel = document.getElementById("coalitionsPanel");
const electoralLawGrid = document.getElementById("electoralLawGrid");
const coalitionLegend = document.getElementById("coalitionLegend");
const coalitionDisplayToggle = document.getElementById("coalitionDisplayToggle");

// ---- helper ----
function themeAnsweredCount(themeKey) {
  return Object.keys(state.answers[themeKey]).length;
}

function themeTotal(themeKey) {
  return (OPINIONS[themeKey] || []).length;
}

function themeIsComplete(themeKey) {
  const total = themeTotal(themeKey);
  return total > 0 && themeAnsweredCount(themeKey) === total;
}

function totalOpinionsCount() {
  return THEMES.reduce((sum, t) => sum + themeTotal(t.key), 0);
}

function totalAnsweredCount() {
  return THEMES.reduce((sum, t) => sum + themeAnsweredCount(t.key), 0);
}

// ---- affinità: quota di posizioni reali con cui l'utente si è detto d'accordo ----
function computeMatch(party) {
  let agree = 0;
  let total = 0;
  THEMES.forEach((theme) => {
    const val = state.answers[theme.key][party.id];
    if (val === undefined || val === 0) return;
    total += 1;
    if (val === 1) agree += 1;
  });
  if (total === 0) return null;
  return Math.round((agree / total) * 100);
}

// ---- tab dei temi ----
function renderThemeTabs() {
  themeTabsEl.innerHTML = "";
  THEMES.forEach((theme) => {
    const total = themeTotal(theme.key);
    const done = themeAnsweredCount(theme.key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-tab";
    if (theme.key === state.activeTheme) btn.classList.add("active");
    if (total > 0 && done === total) btn.classList.add("complete");
    if (total === 0) btn.classList.add("pending");
    btn.innerHTML = `
      <span class="theme-tab-name">${theme.label}</span>
      <span class="theme-tab-progress">${total === 0 ? "in preparazione" : `${done}/${total}${done === total ? " ✓" : ""}`}</span>
    `;
    btn.addEventListener("click", () => startTheme(theme.key));
    themeTabsEl.appendChild(btn);
  });
}

function startTheme(themeKey) {
  state.activeTheme = themeKey;

  if (!themeHasOpinions(themeKey)) {
    renderThemeTabs();
    renderQuestion();
    return;
  }

  if (!state.order[themeKey]) {
    state.order[themeKey] = shuffledPartyOrder(themeKey);
  }
  const order = state.order[themeKey];
  const firstUnanswered = order.findIndex((pid) => state.answers[themeKey][pid] === undefined);
  state.posInOrder = firstUnanswered === -1 ? 0 : firstUnanswered;
  answerButtons.forEach((b) => (b.disabled = false));
  renderThemeTabs();
  renderQuestion();
}

// ---- vista corrente ----
function renderQuestion() {
  const totalOpinions = totalOpinionsCount();
  progressFill.style.width = totalOpinions === 0 ? "0%" : `${(totalAnsweredCount() / totalOpinions) * 100}%`;
  qGlobalDoneEl.textContent = totalAnsweredCount();

  if (state.activeTheme === null) {
    qCategoryEl.textContent = "Seleziona un tema per iniziare";
    qTextEl.textContent = "Tocca uno dei temi qui sopra per vedere le posizioni reali (anonime) dei partiti su quel tema.";
    answerButtons.forEach((b) => (b.disabled = true));
    return;
  }

  const theme = THEMES.find((t) => t.key === state.activeTheme);

  if (!themeHasOpinions(theme.key)) {
    qCategoryEl.textContent = `${theme.label} · in preparazione`;
    qTextEl.textContent = "Le posizioni reali per questo tema non sono ancora state inserite. Scegli un altro tema, o torna più avanti.";
    answerButtons.forEach((b) => (b.disabled = true));
    return;
  }

  const order = state.order[theme.key];
  const partyId = order[state.posInOrder];
  const opinion = OPINIONS[theme.key].find((o) => o.partyId === partyId);

  qCategoryEl.textContent = `${theme.label} · posizione ${state.posInOrder + 1}/${order.length}`;
  qTextEl.textContent = `"${opinion.text}"`;
  answerButtons.forEach((b) => (b.disabled = false));
}

function nextThemeToDo(afterKey) {
  const idx = THEMES.findIndex((t) => t.key === afterKey);
  for (let i = idx + 1; i < THEMES.length; i++) {
    if (themeHasOpinions(THEMES[i].key) && !themeIsComplete(THEMES[i].key)) return THEMES[i].key;
  }
  for (let i = 0; i < THEMES.length; i++) {
    if (themeHasOpinions(THEMES[i].key) && !themeIsComplete(THEMES[i].key)) return THEMES[i].key;
  }
  return null;
}

answerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (state.activeTheme === null || !themeHasOpinions(state.activeTheme)) return;
    const theme = state.activeTheme;
    const order = state.order[theme];
    const partyId = order[state.posInOrder];
    state.answers[theme][partyId] = Number(btn.dataset.value);

    if (state.posInOrder < order.length - 1) {
      state.posInOrder += 1;
      renderQuestion();
    } else {
      const next = nextThemeToDo(theme);
      if (next) {
        startTheme(next);
      } else {
        state.activeTheme = null;
        qCategoryEl.textContent = "Temi disponibili completati";
        qTextEl.textContent = "Guarda il tabellone per le affinità. Gli altri temi sono ancora in preparazione — torna più avanti.";
        answerButtons.forEach((b) => (b.disabled = true));
      }
    }
    renderThemeTabs();
    refreshBoard();
  });
});

// ---- toolbar: legge elettorale ----
function renderElectoralLaw() {
  const labels = {
    statoAttuale: "Stato attuale",
    riformaInCorso: "Riforma in corso",
    sogliaPartito: "Soglia partito",
    sogliaCoalizione: "Soglia coalizione",
    premioStabilicum: "Premio (se Stabilicum diventa legge)",
    fonte: "Fonte",
  };
  electoralLawGrid.innerHTML = Object.entries(ELECTORAL_LAW)
    .map(([key, val]) => `<dt>${labels[key]}</dt><dd>${val}</dd>`)
    .join("");
}

toggleElectoralLawBtn.addEventListener("click", () => {
  const isHidden = electoralLawPanel.hidden;
  electoralLawPanel.hidden = !isHidden;
  toggleElectoralLawBtn.setAttribute("aria-expanded", String(isHidden));
  if (isHidden) {
    coalitionsPanel.hidden = true;
    toggleCoalitionsBtn.setAttribute("aria-expanded", "false");
  }
});

// ---- toolbar: coalizioni ----
function renderCoalitionLegend() {
  coalitionLegend.innerHTML = COALITIONS.map((c) => {
    const remaining = c.partyIds.filter((id) => {
      const tile = document.querySelector(`.tile[data-id="${id}"]`);
      return tile && !tile.classList.contains("eliminated");
    }).length;
    return `
      <li>
        <span class="coalition-swatch" style="background:${c.color}"></span>
        <span>${c.name}</span>
        <span class="coalition-members">${remaining}/${c.partyIds.length} rimasti</span>
      </li>
    `;
  }).join("");
}

toggleCoalitionsBtn.addEventListener("click", () => {
  const isHidden = coalitionsPanel.hidden;
  coalitionsPanel.hidden = !isHidden;
  toggleCoalitionsBtn.setAttribute("aria-expanded", String(isHidden));
  if (isHidden) {
    electoralLawPanel.hidden = true;
    toggleElectoralLawBtn.setAttribute("aria-expanded", "false");
    renderCoalitionLegend();
  }
});

coalitionDisplayToggle.addEventListener("change", () => {
  board.classList.toggle("show-coalitions", coalitionDisplayToggle.checked);
});

// ---- loghi con fallback a monogramma ----
window.__logoFallback = function (imgEl, slug) {
  const tried = imgEl.dataset.tried || "";
  if (!tried.includes("png")) {
    imgEl.dataset.tried = tried + "png";
    imgEl.src = `assets/logos/${slug}.png`;
  } else {
    imgEl.style.display = "none";
    const mono = imgEl.nextElementSibling;
    if (mono) mono.style.display = "flex";
  }
};

function logoMarkup(p) {
  return `
    <img class="party-logo" src="assets/logos/${p.slug}.svg" alt="" aria-hidden="true"
         onerror="window.__logoFallback(this, '${p.slug}')">
    <div class="party-monogram" style="display:none; background:${p.color}">${p.initials}</div>
  `;
}

// ---- tabellone ----
function renderBoard() {
  board.innerHTML = "";
  PARTIES.forEach((p) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = p.id;

    const coalition = coalitionOf(p.id);
    tile.innerHTML = `
      <div class="tile-inner" role="button" tabindex="0"
           aria-label="${p.name}, leader ${p.leader}. Tocca per vedere il profilo.">
        <div class="tile-face tile-front">
          <span class="tile-coalition-stripe" style="background:${coalition ? coalition.color : "transparent"}"></span>
          <button class="manual-toggle" type="button" aria-label="Elimina o ripristina manualmente" data-id="${p.id}">✕</button>
          <div class="tile-portrait">
            ${logoMarkup(p)}
          </div>
          <div class="tile-label">
            <span class="tile-name">${p.name}</span>
            <span class="tile-party">${p.leader}</span>
            <span class="tile-affinity" data-affinity-for="${p.id}">—</span>
          </div>
        </div>
        <div class="tile-face tile-back">
          <span class="stamp">ELIMINATO</span>
        </div>
      </div>
    `;

    board.appendChild(tile);
  });

  attachTileEvents();
  refreshBoard();
}

function attachTileEvents() {
  document.querySelectorAll(".tile").forEach((tile) => {
    const id = tile.dataset.id;
    const inner = tile.querySelector(".tile-inner");
    const manualBtn = tile.querySelector(".manual-toggle");

    inner.addEventListener("click", () => showProfile(id));
    inner.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showProfile(id);
      }
    });

    manualBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentlyEliminated = tile.classList.contains("eliminated");
      state.manualOverride[id] = !currentlyEliminated;
      refreshBoard();
    });
  });
}

function refreshBoard() {
  PARTIES.forEach((p) => {
    const tile = document.querySelector(`.tile[data-id="${p.id}"]`);
    if (!tile) return;

    const match = computeMatch(p);
    const affinityEl = tile.querySelector(`[data-affinity-for="${p.id}"]`);
    affinityEl.textContent = match === null ? "affinità: dati non disponibili" : `affinità: ${match}%`;

    // Nessuna eliminazione automatica per ora: con un solo tema popolato il segnale è troppo
    // debole per essere affidabile. Resta solo l'override manuale.
    const eliminated = p.id in state.manualOverride ? state.manualOverride[p.id] : false;
    tile.classList.toggle("eliminated", eliminated);
  });

  const remaining = document.querySelectorAll(".tile:not(.eliminated)").length;
  remainingCountEl.textContent = remaining;

  if (!coalitionsPanel.hidden) renderCoalitionLegend();
}

// ---- profilo partito ----
function showProfile(id) {
  const p = partyById(id);
  if (!p) return;

  profileEmpty.hidden = true;
  profileContent.hidden = false;
  profileTag.style.background = p.color;
  profileName.textContent = p.name;
  profileParty.textContent = `Leader: ${p.leader}`;

  const rows = [`<li class="profile-storia">${p.storia}</li>`];

  THEMES.forEach((theme) => {
    if (!themeHasOpinions(theme.key)) return;
    const opinion = OPINIONS[theme.key].find((o) => o.partyId === p.id);
    if (!opinion) return;
    const answer = state.answers[theme.key][p.id];
    let statusLabel = "Non ancora votata";
    let statusClass = "status-pending";
    if (answer === 1) { statusLabel = "Hai detto D'accordo"; statusClass = "status-agree"; }
    else if (answer === -1) { statusLabel = "Hai detto Contrario"; statusClass = "status-disagree"; }
    else if (answer === 0) { statusLabel = "Non ti sei espresso"; statusClass = "status-skip"; }

    rows.push(`
      <li class="opinion-row">
        <div class="opinion-head">
          <span class="opinion-theme">${theme.label}</span>
          <span class="opinion-status ${statusClass}">${statusLabel}</span>
        </div>
        <p class="opinion-text">"${opinion.text}"</p>
        <p class="opinion-source">Fonte: ${opinion.source}</p>
      </li>
    `);
  });

  profileValues.innerHTML = rows.join("");
}

// ---- reset ----
resetBtn.addEventListener("click", () => {
  state.activeTheme = null;
  state.posInOrder = 0;
  state.order = {};
  state.manualOverride = {};
  THEMES.forEach((t) => { state.answers[t.key] = {}; });
  profileEmpty.hidden = false;
  profileContent.hidden = true;
  coalitionDisplayToggle.checked = false;
  board.classList.remove("show-coalitions");
  renderThemeTabs();
  renderQuestion();
  renderBoard();
});

// ---- avvio ----
renderElectoralLaw();
renderThemeTabs();
renderQuestion();
renderBoard();
