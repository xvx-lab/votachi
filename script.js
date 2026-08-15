// Vota Chi? — v1 interfaccia
// Nessun dato politico reale. Candidati e partiti sono segnaposto (fase 1).
// La fase 2 sostituirà CANDIDATES con dati verificati e fonti citate.

const PARTY_COLORS = ["#3A7D7B", "#B08A2E", "#6B4C6B", "#3E5C76", "#A0522D"];

const CANDIDATES = Array.from({ length: 16 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: n,
    name: `Candidato ${n}`,
    party: `Partito Fittizio ${String.fromCharCode(65 + (i % 5))}`,
    color: PARTY_COLORS[i % PARTY_COLORS.length],
  };
});

const SILHOUETTE_SVG = `
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="36" r="20" fill="#14213D"/>
    <path d="M14 92c2-24 18-38 36-38s34 14 36 38" fill="#14213D"/>
  </svg>
`;

const board = document.getElementById("board");
const remainingCountEl = document.getElementById("remainingCount");
const resetBtn = document.getElementById("resetBtn");

function renderBoard() {
  board.innerHTML = "";
  CANDIDATES.forEach((c) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = c.id;

    tile.innerHTML = `
      <div class="tile-inner" role="button" tabindex="0"
           aria-pressed="false" aria-label="${c.name}, ${c.party}. Tocca per eliminare o ripristinare.">
        <div class="tile-face tile-front">
          <div class="tile-portrait">
            <span class="party-tag" style="background:${c.color}"></span>
            ${SILHOUETTE_SVG}
          </div>
          <div class="tile-label">
            <span class="tile-name">${c.name}</span>
            <span class="tile-party">${c.party}</span>
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
  updateCounter();
}

function attachTileEvents() {
  document.querySelectorAll(".tile").forEach((tile) => {
    const inner = tile.querySelector(".tile-inner");
    const toggle = () => {
      tile.classList.toggle("eliminated");
      const eliminated = tile.classList.contains("eliminated");
      inner.setAttribute("aria-pressed", String(eliminated));
      updateCounter();
    };
    inner.addEventListener("click", toggle);
    inner.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });
}

function updateCounter() {
  const total = CANDIDATES.length;
  const eliminated = document.querySelectorAll(".tile.eliminated").length;
  remainingCountEl.textContent = total - eliminated;
}

resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".tile.eliminated").forEach((tile) => {
    tile.classList.remove("eliminated");
    tile.querySelector(".tile-inner").setAttribute("aria-pressed", "false");
  });
  updateCounter();
});

renderBoard();
