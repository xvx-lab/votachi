// Vota Chi? — v3: 10 temi, 10 domande a tema (100 totali), selezione a tab.
// Tutti i dati (partiti, valori, domande) sono FITTIZI — fase 1.
// Fase 2: sostituire PARTIES e THEMES con dati reali, ognuno con { fonte, data }.

const THEMES = [
  {
    key: "economia",
    label: "Economia",
    questions: [
      "Lo stato dovrebbe intervenire di più nell'economia rispetto al mercato libero.",
      "Le imprese pubbliche sono generalmente più efficienti di quelle private nei settori strategici.",
      "Le tasse sui redditi più alti dovrebbero aumentare per finanziare i servizi pubblici.",
      "La spesa pubblica va ridotta anche a costo di tagliare alcuni servizi.",
      "Il debito pubblico è uno strumento accettabile per finanziare la crescita.",
      "Le grandi imprese vanno regolamentate più severamente di oggi.",
      "Il salario minimo per legge è uno strumento utile per ridurre le disuguaglianze.",
      "La proprietà privata dei mezzi di produzione dovrebbe avere meno vincoli statali.",
      "Gli aiuti economici alle imprese in difficoltà sono giustificati per salvare posti di lavoro.",
      "La concorrenza di mercato produce risultati migliori della pianificazione centrale.",
    ],
  },
  {
    key: "lavoro",
    label: "Lavoro",
    questions: [
      "I contratti a tempo indeterminato dovrebbero essere la norma, non l'eccezione.",
      "La flessibilità contrattuale aiuta più che danneggiare l'occupazione.",
      "I sindacati dovrebbero avere più potere nelle trattative con le imprese.",
      "Il reddito di cittadinanza è uno strumento efficace contro la povertà.",
      "L'età pensionabile dovrebbe restare flessibile in base al tipo di lavoro svolto.",
      "Le delocalizzazioni vanno scoraggiate con politiche fiscali mirate.",
      "Il lavoro autonomo dovrebbe avere le stesse tutele di quello dipendente.",
      "Gli scioperi sono uno strumento legittimo anche quando causano disagi ai cittadini.",
      "La formazione professionale pubblica dovrebbe ricevere più investimenti.",
      "Le aziende dovrebbero poter licenziare con meno vincoli burocratici.",
    ],
  },
  {
    key: "ambiente",
    label: "Ambiente",
    questions: [
      "Le politiche ambientali dovrebbero avere priorità anche a costo della crescita industriale.",
      "Le fonti fossili vanno abbandonate entro una data vincolante per legge.",
      "Il nucleare è un'opzione accettabile nella transizione energetica.",
      "Le imprese inquinanti dovrebbero pagare tasse ambientali più alte.",
      "La mobilità privata a motore endotermico va limitata nei centri urbani.",
      "Gli incentivi pubblici per l'auto elettrica sono una priorità di spesa giustificata.",
      "La tutela del paesaggio dovrebbe prevalere su nuove infrastrutture energetiche.",
      "L'agricoltura intensiva va regolamentata più severamente per motivi ambientali.",
      "I cittadini dovrebbero pagare di più per servizi ad alto impatto ambientale (voli, plastica).",
      "La crescita economica e la sostenibilità ambientale sono spesso in conflitto reale.",
    ],
  },
  {
    key: "sanita",
    label: "Sanità",
    questions: [
      "La sanità pubblica dovrebbe restare gratuita e universale anche aumentando le tasse.",
      "Le assicurazioni sanitarie private dovrebbero avere un ruolo maggiore nel sistema.",
      "I tempi di attesa nel pubblico giustificano più spazio al privato convenzionato.",
      "La prevenzione dovrebbe ricevere più fondi rispetto alla cura.",
      "Il personale sanitario andrebbe assunto stabilmente anche a costo di più spesa pubblica.",
      "Le cure sperimentali dovrebbero essere accessibili anche con rischi non del tutto noti.",
      "La sanità dovrebbe essere gestita a livello centrale piuttosto che regionale.",
      "I farmaci generici dovrebbero essere sempre preferiti a quelli di marca nella prescrizione pubblica.",
      "La salute mentale dovrebbe ricevere lo stesso livello di investimento della salute fisica.",
      "Le liste d'attesa vanno risolte con più personale piuttosto che con più privato.",
    ],
  },
  {
    key: "istruzione",
    label: "Istruzione",
    questions: [
      "La scuola pubblica dovrebbe ricevere più fondi anche a costo di altre voci di spesa.",
      "Il merito scolastico dovrebbe contare più dell'uguaglianza di trattamento tra studenti.",
      "L'istruzione privata dovrebbe ricevere finanziamenti pubblici se accessibile a tutti.",
      "I programmi scolastici dovrebbero essere decisi a livello nazionale, non locale.",
      "L'università dovrebbe essere gratuita per tutti indipendentemente dal reddito.",
      "La valutazione standardizzata (test nazionali) è uno strumento utile per misurare la scuola.",
      "L'educazione civica e digitale dovrebbe avere più ore rispetto alle materie tradizionali.",
      "Gli insegnanti dovrebbero essere valutati anche sui risultati degli studenti.",
      "La scuola dell'obbligo dovrebbe estendersi oltre gli attuali limiti d'età.",
      "L'autonomia scolastica dovrebbe aumentare rispetto alle direttive centrali.",
    ],
  },
  {
    key: "sicurezza",
    label: "Sicurezza",
    questions: [
      "La sicurezza pubblica giustifica un aumento dei poteri di controllo dello stato.",
      "Le pene per i reati gravi dovrebbero essere più severe di oggi.",
      "La videosorveglianza diffusa è uno strumento accettabile per la sicurezza urbana.",
      "Le forze dell'ordine dovrebbero avere più risorse anche a scapito di altri settori.",
      "La certezza della pena conta più della sua durezza.",
      "Il possesso di armi per autodifesa dovrebbe essere reso più semplice.",
      "La sicurezza informatica dei cittadini dovrebbe essere gestita direttamente dallo stato.",
      "Le pene alternative al carcere sono preferibili per reati minori.",
      "Il controllo del territorio dovrebbe restare prevalentemente locale (polizia municipale).",
      "La prevenzione sociale riduce la criminalità più della repressione.",
    ],
  },
  {
    key: "immigrazione",
    label: "Immigrazione",
    questions: [
      "I flussi migratori dovrebbero essere regolati con quote annuali più rigide.",
      "L'integrazione va favorita con investimenti pubblici dedicati.",
      "Il diritto d'asilo dovrebbe essere garantito con procedure più rapide, non più restrittive.",
      "I rimpatri per chi non ha diritto a restare dovrebbero essere più sistematici.",
      "La cittadinanza dovrebbe essere più facile da ottenere per chi nasce o cresce nel paese.",
      "I corridoi umanitari legali riducono più efficacemente gli sbarchi irregolari dei respingimenti.",
      "Il lavoro degli immigrati regolari è un contributo netto positivo all'economia.",
      "Le politiche migratorie dovrebbero essere decise a livello europeo, non nazionale.",
      "L'accoglienza diffusa funziona meglio dei grandi centri di accoglienza.",
      "Le competenze linguistiche dovrebbero essere un requisito vincolante per l'integrazione.",
    ],
  },
  {
    key: "diritti",
    label: "Diritti civili",
    questions: [
      "I diritti civili individuali dovrebbero prevalere su norme tradizionali quando sono in conflitto.",
      "Le unioni civili dovrebbero avere pari diritti del matrimonio in ogni ambito.",
      "L'eutanasia dovrebbe essere legale con adeguate garanzie procedurali.",
      "La libertà di espressione dovrebbe avere pochi limiti anche su contenuti controversi.",
      "Le politiche di genere nelle istituzioni pubbliche sono uno strumento utile, non simbolico.",
      "Il fine vita dovrebbe essere una scelta individuale tutelata dalla legge.",
      "La religione dovrebbe avere un ruolo minore nelle decisioni legislative pubbliche.",
      "Le quote di genere in politica e nei consigli di amministrazione sono giustificate.",
      "La privacy individuale dovrebbe prevalere sulla sicurezza collettiva nei casi dubbi.",
      "Il diritto all'aborto dovrebbe restare pienamente garantito dalla legge.",
    ],
  },
  {
    key: "giustizia",
    label: "Giustizia",
    questions: [
      "La separazione delle carriere tra giudici e pubblici ministeri migliorerebbe il sistema.",
      "I tempi dei processi contano più della severità delle pene per la giustizia reale.",
      "La custodia cautelare dovrebbe essere applicata con criteri più restrittivi.",
      "La responsabilità civile dei magistrati dovrebbe essere diretta, non mediata.",
      "Le pene detentive dovrebbero puntare più al reinserimento che alla punizione.",
      "Il sistema giudiziario dovrebbe avere più risorse anche a costo di altri settori.",
      "Le class action dei cittadini contro lo stato dovrebbero essere facilitate.",
      "La prescrizione dei reati dovrebbe essere più difficile da ottenere per reati gravi.",
      "I giudici dovrebbero essere eletti anziché nominati per concorso.",
      "La giustizia minorile dovrebbe privilegiare percorsi educativi rispetto a quelli detentivi.",
    ],
  },
  {
    key: "europa",
    label: "Europa ed estero",
    questions: [
      "L'integrazione europea dovrebbe approfondirsi anche cedendo sovranità nazionale.",
      "La difesa dovrebbe diventare una competenza comune europea, non nazionale.",
      "Le sanzioni economiche sono uno strumento efficace di politica estera.",
      "Il paese dovrebbe aumentare la spesa militare rispetto al PIL.",
      "La politica estera dovrebbe privilegiare gli accordi multilaterali a quelli bilaterali.",
      "L'export di armamenti dovrebbe essere regolato più severamente.",
      "Il paese dovrebbe avere un ruolo più attivo nelle missioni internazionali di pace.",
      "Gli accordi commerciali internazionali dovrebbero includere vincoli ambientali vincolanti.",
      "Il voto all'unanimità in Europa dovrebbe essere sostituito da maggioranze qualificate.",
      "La politica estera dovrebbe essere più indipendente dagli alleati tradizionali.",
    ],
  },
];

const PARTY_COLORS = {
  fdi: "#0B4C2E", lega: "#1E7A3D", fi: "#1B4F8C", noimoderati: "#3E8FC9",
  pd: "#C0234B", m5s: "#D4A017", avs: "#7A3E5C", iv: "#C94F8C", piueuropa: "#E0459A",
  azione: "#2E8B8B", fn: "#2B2B2B", pld: "#6B6F76",
};

// Partiti reali — scenario 2026, PRE-liste ufficiali (elezioni 2027 non ancora convocate).
// Fonti: aggregati sondaggi (Tecnè/DiRE, Piepoli/La7, Demopolis, giugno–agosto 2026) e cronaca politica corrente.
// I "values" restano vuoti (null): nessuna posizione politica reale è stata ancora sourced domanda per domanda.
// Popolarli richiede una fonte verificabile per ogni singolo valore (programma, dichiarazione datata).
function emptyValues() {
  const v = {};
  THEMES.forEach((t) => { v[t.key] = new Array(t.questions.length).fill(null); });
  return v;
}

const PARTIES = [
  { id: "01", name: "Fratelli d'Italia", leader: "Giorgia Meloni", color: PARTY_COLORS.fdi, values: emptyValues() },
  { id: "02", name: "Lega", leader: "Matteo Salvini", color: PARTY_COLORS.lega, values: emptyValues() },
  { id: "03", name: "Forza Italia", leader: "Antonio Tajani", color: PARTY_COLORS.fi, values: emptyValues() },
  { id: "04", name: "Noi Moderati", leader: "Maurizio Lupi", color: PARTY_COLORS.noimoderati, values: emptyValues() },
  { id: "05", name: "Partito Democratico", leader: "Elly Schlein", color: PARTY_COLORS.pd, values: emptyValues() },
  { id: "06", name: "Movimento 5 Stelle", leader: "Giuseppe Conte", color: PARTY_COLORS.m5s, values: emptyValues() },
  { id: "07", name: "Alleanza Verdi e Sinistra", leader: "Angelo Bonelli / Nicola Fratoianni", color: PARTY_COLORS.avs, values: emptyValues() },
  { id: "08", name: "Italia Viva", leader: "Matteo Renzi", color: PARTY_COLORS.iv, values: emptyValues() },
  { id: "09", name: "+Europa", leader: "Riccardo Magi", color: PARTY_COLORS.piueuropa, values: emptyValues() },
  { id: "10", name: "Azione", leader: "Carlo Calenda", color: PARTY_COLORS.azione, values: emptyValues() },
  { id: "11", name: "Futuro Nazionale", leader: "Roberto Vannacci", color: PARTY_COLORS.fn, values: emptyValues() },
  { id: "12", name: "Partito Liberal Democratico", leader: "n/d nelle fonti consultate", color: PARTY_COLORS.pld, values: emptyValues() },
];

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
// Il Rosatellum (2017) resta in vigore; lo "Stabilicum" è stato approvato dalla sola Camera il 16/07/2026
// e attende il voto finale al Senato (calendarizzato 15/09/2026) — NON è ancora legge.
const ELECTORAL_LAW = {
  statoAttuale: "Rosatellum (l. 165/2017), in vigore",
  riformaInCorso: "\"Stabilicum\": approvata dalla Camera il 16/07/2026, in attesa del voto finale al Senato (15/09/2026)",
  sogliaPartito: "3% (invariata anche nello Stabilicum)",
  sogliaCoalizione: "10% (invariata anche nello Stabilicum)",
  premioStabilicum: "42% dei voti validi → premio di 70 seggi Camera + 35 Senato, fino a un tetto di 220/113",
  fonte: "Camera dei Deputati; cronaca parlamentare, luglio 2026",
};

const TOTAL_QUESTIONS = THEMES.length * THEMES[0].questions.length; // 100
const ELIMINATION_THRESHOLD = 35; // match% sotto la quale un partito esce
const MIN_ANSWERS_BEFORE_ELIMINATION = 10; // almeno un tema completo

const SILHOUETTE_SVG = `
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="36" r="20" fill="#14213D"/>
    <path d="M14 92c2-24 18-38 36-38s34 14 36 38" fill="#14213D"/>
  </svg>
`;

// ---- stato ----
const state = {
  activeTheme: null,     // key del tema in corso, null = nessuno selezionato
  qInTheme: 0,           // indice 0..9 dentro al tema attivo
  answers: {},           // { themeKey: [10 valori: -1|0|1|undefined] }
  manualOverride: {},    // { partyId: true (eliminato manualmente) | false (reinstaurato) }
};

THEMES.forEach((t) => { state.answers[t.key] = new Array(t.questions.length).fill(undefined); });

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

// ---- helper: quante risposte (non undefined) in un tema ----
function themeAnsweredCount(themeKey) {
  return state.answers[themeKey].filter((v) => v !== undefined).length;
}

function themeIsComplete(themeKey) {
  return themeAnsweredCount(themeKey) === THEMES.find((t) => t.key === themeKey).questions.length;
}

function totalAnsweredCount() {
  return THEMES.reduce((sum, t) => sum + themeAnsweredCount(t.key), 0);
}

// ---- affinità: confronta risposta per risposta con il valore della singola domanda ----
// Se il partito non ha un valore sourced per quella domanda (null), la domanda viene esclusa
// dal calcolo per quel partito, non conteggiata come disaccordo.
function computeMatch(party) {
  let raw = 0;
  let max = 0;
  THEMES.forEach((theme) => {
    state.answers[theme.key].forEach((val, qi) => {
      if (val === undefined || val === 0) return;
      const partyVal = party.values[theme.key][qi];
      if (partyVal === null || partyVal === undefined) return; // nessuna fonte per questa domanda
      raw += partyVal * val;
      max += 2 * Math.abs(val);
    });
  });
  if (max === 0) return null;
  const normalized = raw / max; // -1..1
  return Math.round(50 + 50 * normalized);
}

function partyHasAnyData(party) {
  return THEMES.some((theme) => party.values[theme.key].some((v) => v !== null));
}

// ---- tab dei temi ----
function renderThemeTabs() {
  themeTabsEl.innerHTML = "";
  THEMES.forEach((theme) => {
    const done = themeAnsweredCount(theme.key);
    const total = theme.questions.length;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-tab";
    if (theme.key === state.activeTheme) btn.classList.add("active");
    if (done === total) btn.classList.add("complete");
    btn.innerHTML = `
      <span class="theme-tab-name">${theme.label}</span>
      <span class="theme-tab-progress">${done}/${total}${done === total ? " ✓" : ""}</span>
    `;
    btn.addEventListener("click", () => startTheme(theme.key));
    themeTabsEl.appendChild(btn);
  });
}

function startTheme(themeKey) {
  state.activeTheme = themeKey;
  const answers = state.answers[themeKey];
  const firstUnanswered = answers.findIndex((v) => v === undefined);
  state.qInTheme = firstUnanswered === -1 ? 0 : firstUnanswered;
  answerButtons.forEach((b) => (b.disabled = false));
  renderThemeTabs();
  renderQuestion();
}

// ---- domanda corrente ----
function renderQuestion() {
  if (state.activeTheme === null) {
    qCategoryEl.textContent = "Seleziona un tema per iniziare";
    qTextEl.textContent = "Tocca uno dei 10 temi qui sopra per rispondere alle sue 10 domande.";
    answerButtons.forEach((b) => (b.disabled = true));
    progressFill.style.width = `${(totalAnsweredCount() / TOTAL_QUESTIONS) * 100}%`;
    qGlobalDoneEl.textContent = totalAnsweredCount();
    return;
  }

  const theme = THEMES.find((t) => t.key === state.activeTheme);
  const q = theme.questions[state.qInTheme];
  qCategoryEl.textContent = `${theme.label} · domanda ${state.qInTheme + 1}/${theme.questions.length}`;
  qTextEl.textContent = q;
  progressFill.style.width = `${(totalAnsweredCount() / TOTAL_QUESTIONS) * 100}%`;
  qGlobalDoneEl.textContent = totalAnsweredCount();
}

function nextThemeToDo(afterKey) {
  const idx = THEMES.findIndex((t) => t.key === afterKey);
  for (let i = idx + 1; i < THEMES.length; i++) {
    if (!themeIsComplete(THEMES[i].key)) return THEMES[i].key;
  }
  for (let i = 0; i < THEMES.length; i++) {
    if (!themeIsComplete(THEMES[i].key)) return THEMES[i].key;
  }
  return null; // tutto completato
}

answerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (state.activeTheme === null) return;
    const theme = THEMES.find((t) => t.key === state.activeTheme);
    state.answers[theme.key][state.qInTheme] = Number(btn.dataset.value);

    if (state.qInTheme < theme.questions.length - 1) {
      state.qInTheme += 1;
      renderQuestion();
    } else {
      const next = nextThemeToDo(theme.key);
      if (next) {
        startTheme(next);
      } else {
        state.activeTheme = null;
        qCategoryEl.textContent = "Tutti i 10 temi completati";
        qTextEl.textContent = "Guarda il tabellone: i partiti sotto soglia sono usciti automaticamente. Puoi rientrare in un tema dai tab qui sopra per cambiare risposta.";
        answerButtons.forEach((b) => (b.disabled = true));
        progressFill.style.width = "100%";
        qGlobalDoneEl.textContent = totalAnsweredCount();
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
            <span class="party-tag" style="background:${p.color}"></span>
            ${SILHOUETTE_SVG}
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
  const answered = totalAnsweredCount();
  PARTIES.forEach((p) => {
    const tile = document.querySelector(`.tile[data-id="${p.id}"]`);
    if (!tile) return;

    const match = computeMatch(p);
    const affinityEl = tile.querySelector(`[data-affinity-for="${p.id}"]`);
    affinityEl.textContent = match === null ? "affinità: dati non disponibili" : `affinità: ${match}%`;

    let eliminated;
    if (p.id in state.manualOverride) {
      eliminated = state.manualOverride[p.id];
    } else {
      eliminated = match !== null && answered >= MIN_ANSWERS_BEFORE_ELIMINATION && match < ELIMINATION_THRESHOLD;
    }
    tile.classList.toggle("eliminated", eliminated);
  });

  const remaining = document.querySelectorAll(".tile:not(.eliminated)").length;
  remainingCountEl.textContent = remaining;

  if (!coalitionsPanel.hidden) renderCoalitionLegend();
}

// ---- profilo partito ----
function showProfile(id) {
  const p = PARTIES.find((x) => x.id === id);
  if (!p) return;

  profileEmpty.hidden = true;
  profileContent.hidden = false;
  profileTag.style.background = p.color;
  profileName.textContent = p.name;
  profileParty.textContent = `Leader: ${p.leader}`;

  if (!partyHasAnyData(p)) {
    profileValues.innerHTML = `<li class="no-data-row">Nessuna posizione con fonte verificata è stata ancora inserita per questo partito.</li>`;
    return;
  }

  profileValues.innerHTML = THEMES.map((theme) => {
    const vals = p.values[theme.key].filter((v) => v !== null);
    if (vals.length === 0) {
      return `
        <li class="value-row">
          <span class="value-label">${theme.label}</span>
          <span class="value-track"><span class="value-fill no-data" style="width:100%"></span></span>
        </li>
      `;
    }
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const pct = ((avg + 2) / 4) * 100;
    return `
      <li class="value-row">
        <span class="value-label">${theme.label}</span>
        <span class="value-track"><span class="value-fill" style="width:${pct}%"></span></span>
      </li>
    `;
  }).join("");
}

// ---- reset ----
resetBtn.addEventListener("click", () => {
  state.activeTheme = null;
  state.qInTheme = 0;
  state.manualOverride = {};
  THEMES.forEach((t) => { state.answers[t.key] = new Array(t.questions.length).fill(undefined); });
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
