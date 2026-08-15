// Vota Chi? — v2: eliminazione guidata da affinità sui valori, non da click a caso.
// Tutti i dati (partiti, valori, domande) sono FITTIZI — fase 1.
// Fase 2: sostituire PARTIES e QUESTIONS con dati reali, ognuno con { fonte, data }.

const CATEGORIES = ["economia", "ambiente", "diritti", "sicurezza", "europa", "lavoro"];

const PARTY_COLORS = ["#3A7D7B", "#B08A2E", "#6B4C6B", "#3E5C76", "#A0522D", "#4E7A3A"];

// Valori: -2 (polo negativo del tema) .. +2 (polo positivo). Segnaposto, non reali.
const PARTIES = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  // distribuzione deterministica ma variata, solo per demo
  const seed = i * 7;
  const values = {};
  CATEGORIES.forEach((cat, ci) => {
    values[cat] = ((seed + ci * 3) % 5) - 2; // range -2..2
  });
  return {
    id: n,
    name: `Partito ${n}`,
    party: `Lista Fittizia ${String.fromCharCode(65 + (i % 6))}`,
    color: PARTY_COLORS[i % PARTY_COLORS.length],
    values,
  };
});

// Ogni domanda è ancorata a UN tema. "D'accordo" = polo positivo del tema.
const QUESTIONS = [
  { category: "economia", text: "Lo stato dovrebbe intervenire di più nell'economia rispetto al mercato libero." },
  { category: "ambiente", text: "Le politiche ambientali dovrebbero avere priorità anche a costo della crescita industriale." },
  { category: "diritti", text: "I diritti civili individuali dovrebbero prevalere su norme tradizionali quando sono in conflitto." },
  { category: "sicurezza", text: "La sicurezza pubblica giustifica un aumento dei poteri di controllo dello stato." },
  { category: "europa", text: "L'integrazione europea dovrebbe approfondirsi anche cedendo sovranità nazionale." },
  { category: "lavoro", text: "Le tutele per i lavoratori dovrebbero contare più della flessibilità per le imprese." },
];

const ELIMINATION_THRESHOLD = 35; // match% sotto la quale un partito esce, dopo il minimo di domande
const MIN_ANSWERS_BEFORE_ELIMINATION = 3;

const SILHOUETTE_SVG = `
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="36" r="20" fill="#14213D"/>
    <path d="M14 92c2-24 18-38 36-38s34 14 36 38" fill="#14213D"/>
  </svg>
`;

// ---- stato ----
const state = {
  currentQuestion: 0,
  answers: {},          // { categoria: -1 | 0 | 1 }
  manualOverride: {},   // { partyId: true (eliminato manualmente) | false (reinstaurato manualmente) }
};

// ---- DOM refs ----
const board = document.getElementById("board");
const remainingCountEl = document.getElementById("remainingCount");
const resetBtn = document.getElementById("resetBtn");
const qIndexEl = document.getElementById("qIndex");
const qTotalEl = document.getElementById("qTotal");
const qCategoryEl = document.getElementById("qCategory");
const qTextEl = document.getElementById("qText");
const progressFill = document.getElementById("progressFill");
const answerButtons = document.querySelectorAll(".answer-btn");
const profileEmpty = document.getElementById("profileEmpty");
const profileContent = document.getElementById("profileContent");
const profileTag = document.getElementById("profileTag");
const profileName = document.getElementById("profileName");
const profileParty = document.getElementById("profileParty");
const profileValues = document.getElementById("profileValues");

qTotalEl.textContent = QUESTIONS.length;

// ---- affinità ----
function computeMatch(party) {
  const answeredCats = Object.keys(state.answers).filter((c) => state.answers[c] !== 0);
  if (answeredCats.length === 0) return null; // nessun dato ancora
  let raw = 0;
  let max = 0;
  answeredCats.forEach((cat) => {
    const u = state.answers[cat]; // -1 o 1
    raw += party.values[cat] * u;
    max += 2 * Math.abs(u);
  });
  const normalized = raw / max; // -1..1
  return Math.round(50 + 50 * normalized);
}

function answeredCount() {
  return Object.values(state.answers).filter((v) => v !== 0).length;
}

// ---- render tessere ----
function renderBoard() {
  board.innerHTML = "";
  PARTIES.forEach((p) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = p.id;

    tile.innerHTML = `
      <div class="tile-inner" role="button" tabindex="0"
           aria-label="${p.name}, ${p.party}. Tocca per vedere il profilo.">
        <div class="tile-face tile-front">
          <button class="manual-toggle" type="button" aria-label="Elimina o ripristina manualmente" data-id="${p.id}">✕</button>
          <div class="tile-portrait">
            <span class="party-tag" style="background:${p.color}"></span>
            ${SILHOUETTE_SVG}
          </div>
          <div class="tile-label">
            <span class="tile-name">${p.name}</span>
            <span class="tile-party">${p.party}</span>
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
  refreshAll();
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
      refreshAll();
    });
  });
}

// ---- eliminazione: manuale ha sempre precedenza, poi soglia di affinità ----
function refreshAll() {
  PARTIES.forEach((p) => {
    const tile = document.querySelector(`.tile[data-id="${p.id}"]`);
    if (!tile) return;

    const match = computeMatch(p);
    const affinityEl = tile.querySelector(`[data-affinity-for="${p.id}"]`);
    affinityEl.textContent = match === null ? "affinità: —" : `affinità: ${match}%`;

    let eliminated;
    if (p.id in state.manualOverride) {
      eliminated = state.manualOverride[p.id];
    } else {
      eliminated = match !== null && answeredCount() >= MIN_ANSWERS_BEFORE_ELIMINATION && match < ELIMINATION_THRESHOLD;
    }
    tile.classList.toggle("eliminated", eliminated);
  });

  const remaining = document.querySelectorAll(".tile:not(.eliminated)").length;
  remainingCountEl.textContent = remaining;
}

// ---- profilo partito ----
function showProfile(id) {
  const p = PARTIES.find((x) => x.id === id);
  if (!p) return;

  profileEmpty.hidden = true;
  profileContent.hidden = false;
  profileTag.style.background = p.color;
  profileName.textContent = p.name;
  profileParty.textContent = p.party;

  profileValues.innerHTML = CATEGORIES.map((cat) => {
    const v = p.values[cat]; // -2..2
    const pct = ((v + 2) / 4) * 100;
    return `
      <li class="value-row">
        <span class="value-label">${cat}</span>
        <span class="value-track"><span class="value-fill" style="width:${pct}%"></span></span>
      </li>
    `;
  }).join("");
}

// ---- domande ----
function renderQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  qIndexEl.textContent = state.currentQuestion + 1;
  qCategoryEl.textContent = `Tema · ${q.category}`;
  qTextEl.textContent = q.text;
  progressFill.style.width = `${((state.currentQuestion) / QUESTIONS.length) * 100}%`;
}

answerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const q = QUESTIONS[state.currentQuestion];
    state.answers[q.category] = Number(btn.dataset.value);

    if (state.currentQuestion < QUESTIONS.length - 1) {
      state.currentQuestion += 1;
      renderQuestion();
    } else {
      progressFill.style.width = "100%";
      qCategoryEl.textContent = "Tutte le domande completate";
      qTextEl.textContent = "Guarda il tabellone: i partiti sotto soglia sono usciti automaticamente.";
      answerButtons.forEach((b) => (b.disabled = true));
    }
    refreshAll();
  });
});

// ---- reset ----
resetBtn.addEventListener("click", () => {
  state.currentQuestion = 0;
  state.answers = {};
  state.manualOverride = {};
  answerButtons.forEach((b) => (b.disabled = false));
  profileEmpty.hidden = false;
  profileContent.hidden = true;
  renderQuestion();
  renderBoard();
});

// ---- avvio ----
renderQuestion();
renderBoard();
