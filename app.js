const ACCESS_KEY = "WRESTLE2025";
const ACCESS_STORAGE_KEY = "bracketAppAccess";

function validateAccessCode() {
  const input = document.getElementById("accessCodeInput").value.trim();
  if (input === ACCESS_KEY) {
    localStorage.setItem(ACCESS_STORAGE_KEY, "true");
    document.getElementById("accessModal").style.display = "none";
    window.bracketLocked = false;
  } else {
    document.getElementById("accessError").style.display = "block";
  }
}

function checkAccess() {
  const hasAccess = localStorage.getItem(ACCESS_STORAGE_KEY) === "true";
  if (!hasAccess) {
    document.getElementById("accessModal").style.display = "flex";
    window.bracketLocked = true;
  } else {
    window.bracketLocked = false;
    document.getElementById("accessModal").style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", checkAccess);

function toggleAABox() {
  const aaBox = document.getElementById('allAmericanBox');
  aaBox.style.display = (aaBox.style.display === 'none' || aaBox.style.display === '') ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const bracketGrid = document.getElementById("bracketGrid");
  const bracketTitle = document.getElementById("bracketTitle");
  const weightButtons = document.querySelectorAll("#weightSelector button[data-weight]");

  // Insert Toggle AA button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggleAABox';
  toggleButton.innerText = 'Toggle All-American Box';
  toggleButton.onclick = toggleAABox;
  const pdfWrapper = document.getElementById('pdfWrapper');
  if (pdfWrapper) {
    pdfWrapper.parentNode.insertBefore(toggleButton, pdfWrapper);
  } else {
    document.body.insertBefore(toggleButton, document.body.firstChild);
  }

  // ── BOX DIMENSIONS ──────────────────────────────────────────
  // ROW_H: height of each wrestler row (px)
  // BOX_H: total match box height (2 rows + border)
  // Wide columns (pigtail + Champ R1): 230px wide
  // Narrow columns (advancers): 155px wide
  //
  // Champ side columns by left position:
  //   Pigtail   : left=100,  wide
  //   Champ R1  : left=290,  wide
  //   Champ R2  : left=500,  narrow
  //   Champ R3  : left=665,  narrow
  //   Champ R4  : left=830,  narrow
  //   Champ Final: left=995, narrow
  //
  // Cons side columns:
  //   Cons R1   : left=100 (bottom), wide
  //   Cons R1b  : left=270,  wide
  //   Cons R2   : left=440,  wide  (still has school)
  //   Cons R3+  : left=590+, narrow
  // ────────────────────────────────────────────────────────────

  // Column left → box width
  const colWidth = {
    100:  230,   // pigtail + cons bottom-left
    270:  230,   // cons R1
    290:  230,   // champ R1
    440:  200,   // cons R2
    500:  155,   // champ R2
    590:  155,   // cons R3
    665:  155,   // champ R3
    740:  155,   // cons R4
    830:  155,   // champ R4
    900:  155,   // cons R5
    995:  155,   // champ final
    1080: 155,   // cons R6
    980:  155,   // placement
  };

  // ── MATCH POSITIONS ─────────────────────────────────────────
  // Spacing rules:
  //   BOX_H = 52px (2 wrestler rows @ ~22px each + padding + border)
  //   Champ R1 (16 bouts): start top=30, step=52  → tops: 30,82,134...
  //   Champ R2 (8 bouts) : midpoint of each pair  → spacing=104
  //   Champ R3 (4 bouts) : spacing=208
  //   Champ R4 (2 bouts) : spacing=416
  //   Champ Final (1)    : center
  //
  //   Cons mirrors below champ, starts at top=700
  // ────────────────────────────────────────────────────────────

  const BOX  = 52;   // match box height px
  const GAP  = 4;    // gap between boxes px
  const STEP = BOX + GAP;  // 56px per slot

  // Helper: generate evenly-spaced tops for N boxes starting at y0
  function tops(n, y0, step) {
    return Array.from({ length: n }, (_, i) => y0 + i * step);
  }

  // Champ bracket — top half
  const champR1_tops  = tops(16, 30,  STEP);          // 16 bouts, step=56
  const champR2_tops  = tops(8,  30 + STEP * 0.5,  STEP * 2);   // midpoints of R1 pairs
  const champR3_tops  = tops(4,  30 + STEP * 1.5,  STEP * 4);
  const champR4_tops  = tops(2,  30 + STEP * 3.5,  STEP * 8);
  const champF_tops   = [30 + STEP * 7.5];

  // Pigtail (match 0) — sits above R1 first bout
  const pigtail_top = 10;

  // Consolation bracket — starts below champ
  const CONS_Y0 = 30 + 16 * STEP + 60;  // ~986 + 60 = ~1046... let's use fixed 760
  const CONS_START = 760;

  const consR1_tops   = tops(8,  CONS_START,        STEP);
  const consR1b_tops  = tops(8,  CONS_START,        STEP);
  const consR2_tops   = tops(8,  CONS_START,        STEP);
  const consR3_tops   = tops(4,  CONS_START + STEP * 0.5,  STEP * 2);
  const consR4a_tops  = tops(4,  CONS_START + STEP * 0.5,  STEP * 2);
  const consR4b_tops  = tops(4,  CONS_START + STEP * 0.5,  STEP * 2);
  const consR5_tops   = tops(2,  CONS_START + STEP * 1.5,  STEP * 4);
  const consR5b_tops  = tops(2,  CONS_START + STEP * 1.5,  STEP * 4);
  const consR6_tops   = tops(2,  CONS_START + STEP * 1.5,  STEP * 4);
  const placementTops = tops(3,  CONS_START + STEP * 11,   STEP * 3);

  const matchPositions = {
    // ── PIGTAIL ──
    "0":  { left: 100,  top: pigtail_top },

    // ── CHAMP R1 (matches 1–16) ──
    "1":  { left: 290,  top: champR1_tops[0]  },
    "2":  { left: 290,  top: champR1_tops[1]  },
    "3":  { left: 290,  top: champR1_tops[2]  },
    "4":  { left: 290,  top: champR1_tops[3]  },
    "5":  { left: 290,  top: champR1_tops[4]  },
    "6":  { left: 290,  top: champR1_tops[5]  },
    "7":  { left: 290,  top: champR1_tops[6]  },
    "8":  { left: 290,  top: champR1_tops[7]  },
    "9":  { left: 290,  top: champR1_tops[8]  },
    "10": { left: 290,  top: champR1_tops[9]  },
    "11": { left: 290,  top: champR1_tops[10] },
    "12": { left: 290,  top: champR1_tops[11] },
    "13": { left: 290,  top: champR1_tops[12] },
    "14": { left: 290,  top: champR1_tops[13] },
    "15": { left: 290,  top: champR1_tops[14] },
    "16": { left: 290,  top: champR1_tops[15] },

    // ── CHAMP R2 (matches 17–24) ──
    "17": { left: 500,  top: champR2_tops[0]  },
    "18": { left: 500,  top: champR2_tops[1]  },
    "19": { left: 500,  top: champR2_tops[2]  },
    "20": { left: 500,  top: champR2_tops[3]  },
    "21": { left: 500,  top: champR2_tops[4]  },
    "22": { left: 500,  top: champR2_tops[5]  },
    "23": { left: 500,  top: champR2_tops[6]  },
    "24": { left: 500,  top: champR2_tops[7]  },

    // ── CHAMP R3 (matches 25–28) ──
    "25": { left: 665,  top: champR3_tops[0]  },
    "26": { left: 665,  top: champR3_tops[1]  },
    "27": { left: 665,  top: champR3_tops[2]  },
    "28": { left: 665,  top: champR3_tops[3]  },

    // ── CHAMP R4 / semis (matches 29–30) ──
    "29": { left: 830,  top: champR4_tops[0]  },
    "30": { left: 830,  top: champR4_tops[1]  },

    // ── CHAMPIONSHIP FINAL (match 31) ──
    "31": { left: 995,  top: champF_tops[0]   },

    // ── CONS BRACKET ──
    // Cons R1 (matches 32–40): pigtail losers + first-round byes
    "32": { left: 100,  top: CONS_START                  },
    "33": { left: 270,  top: CONS_START                  },
    "34": { left: 270,  top: CONS_START + STEP           },
    "35": { left: 270,  top: CONS_START + STEP * 2       },
    "36": { left: 270,  top: CONS_START + STEP * 3       },
    "37": { left: 270,  top: CONS_START + STEP * 4       },
    "38": { left: 270,  top: CONS_START + STEP * 5       },
    "39": { left: 270,  top: CONS_START + STEP * 6       },
    "40": { left: 270,  top: CONS_START + STEP * 7       },

    // Cons R2 (matches 41–48)
    "41": { left: 440,  top: CONS_START                  },
    "42": { left: 440,  top: CONS_START + STEP           },
    "43": { left: 440,  top: CONS_START + STEP * 2       },
    "44": { left: 440,  top: CONS_START + STEP * 3       },
    "45": { left: 440,  top: CONS_START + STEP * 4       },
    "46": { left: 440,  top: CONS_START + STEP * 5       },
    "47": { left: 440,  top: CONS_START + STEP * 6       },
    "48": { left: 440,  top: CONS_START + STEP * 7       },

    // Cons R3 (matches 49–52)
    "49": { left: 590,  top: CONS_START + STEP * 0.5     },
    "50": { left: 590,  top: CONS_START + STEP * 2.5     },
    "51": { left: 590,  top: CONS_START + STEP * 4.5     },
    "52": { left: 590,  top: CONS_START + STEP * 6.5     },

    // Cons R4 (matches 53–56)
    "53": { left: 740,  top: CONS_START + STEP * 0.5     },
    "54": { left: 740,  top: CONS_START + STEP * 2.5     },
    "55": { left: 740,  top: CONS_START + STEP * 4.5     },
    "56": { left: 740,  top: CONS_START + STEP * 6.5     },

    // Cons R5 (matches 57–58)
    "57": { left: 900,  top: CONS_START + STEP * 1.5     },
    "58": { left: 900,  top: CONS_START + STEP * 5.5     },

    // Cons R6 (matches 59–60)
    "59": { left: 1080, top: CONS_START + STEP * 1.5     },
    "60": { left: 1080, top: CONS_START + STEP * 5.5     },

    // ── PLACEMENT MATCHES (61–63) ──
    "61": { left: 980,  top: CONS_START + STEP * 11      },  // 7th place
    "62": { left: 980,  top: CONS_START + STEP * 14      },  // 5th place
    "63": { left: 980,  top: CONS_START + STEP * 17      },  // 3rd place
  };

  function clearPath(name, allMatches, fromMatchId) {
    allMatches.forEach(m => {
      if (m.matchId > fromMatchId) {
        ['wrestler1', 'wrestler2'].forEach(slot => {
          if (m[slot]?.name === name) {
            m[slot] = { seed: null, name: "TBD", school: "TBD" };
          }
        });
      }
    });
  }

  let selectedWrestler = null;

  function renderBrackets(data) {
    bracketGrid.innerHTML = "";

    // Set grid height to fit all content
    const maxTop = Math.max(...Object.values(matchPositions).map(p => p.top)) + 120;
    bracketGrid.style.height = maxTop + "px";

    data.matches.forEach(match => {
      const matchEl = document.createElement("div");
      matchEl.classList.add("match");
      matchEl.dataset.matchId = match.matchId;

      const pos = matchPositions[match.matchId] || { left: 0, top: 0 };
      matchEl.style.left = pos.left + "px";
      matchEl.style.top  = pos.top  + "px";

      // Set width from colWidth map
      const w = colWidth[pos.left] || 155;
      matchEl.style.width = w + "px";

      // Tag wide boxes for CSS (school line visible)
      if (w >= 200) matchEl.classList.add('wide');

      ['wrestler1', 'wrestler2'].forEach(slot => {
        const wrestler = match[slot];
        const wEl = document.createElement("div");
        wEl.classList.add("wrestler");
        wEl.dataset.slot = slot;
        wEl.dataset.matchId = match.matchId;

        if (wrestler?.name && wrestler.name !== "TBD") {
          const seedText   = wrestler.seed   ? `#${wrestler.seed} ` : "";
          const schoolText = wrestler.school ? wrestler.school : "";
          const recordText = wrestler.record ? wrestler.record : "";
          wEl.innerHTML = `
            <div class="w-name">${seedText}${wrestler.name}</div>
            <div class="w-meta">${schoolText}${recordText ? " &bull; " + recordText : ""}</div>
          `;
        } else {
          wEl.innerHTML = `<div class="w-name" style="color:#aaa;">TBD</div>`;
        }

        if (wrestler?.highlight) {
          wEl.style.border     = "2px solid #1A3A6B";
          wEl.style.background = "#E8EDF5";
        }

        wEl.onclick = () => handleSelection(match, slot, wrestler, data.matches);
        matchEl.appendChild(wEl);
      });

      bracketGrid.appendChild(matchEl);

      // Placement labels
      const labelMap = { 31: "CHAMPION", 63: "3RD PLACE", 62: "5TH PLACE", 61: "7TH PLACE" };
      if (labelMap[match.matchId]) {
        const label = document.createElement("div");
        label.classList.add("placement-label");
        label.textContent = labelMap[match.matchId];
        label.style.position  = "absolute";
        label.style.left      = (pos.left + w + 8) + "px";
        label.style.top       = (pos.top + 16) + "px";
        label.style.fontWeight = "bold";
        label.style.fontSize  = "12px";
        bracketGrid.appendChild(label);

        if (match.matchId === 31 && match.winner?.name) {
          const champName = document.createElement("div");
          champName.style.position   = "absolute";
          champName.style.left       = (pos.left + w + 8) + "px";
          champName.style.top        = (pos.top) + "px";
          champName.style.fontWeight = "bold";
          champName.style.fontSize   = "13px";
          champName.style.color      = "#1A3A6B";
          champName.textContent      = match.winner.name;
          bracketGrid.appendChild(champName);
        }
      }
    });
  }

  function handleSelection(match, slot, wrestler, allMatches) {
    if (!wrestler || wrestler.name === "TBD") return;

    ['wrestler1', 'wrestler2'].forEach(s => {
      if (match[s] && match[s].highlight) delete match[s].highlight;
    });

    const previouslySelected = selectedWrestler;
    const wasSame = (
      previouslySelected &&
      previouslySelected.name === wrestler.name &&
      previouslySelected.matchId === match.matchId
    );

    if (wasSame) {
      clearPath(wrestler.name, allMatches, match.matchId);
      selectedWrestler = null;
      renderBrackets({ matches: allMatches });
      return;
    }

    match[slot].highlight = true;
    selectedWrestler = { ...wrestler, matchId: match.matchId, slot };

    updateMatchResult(match, slot, allMatches);
  }

  function updateMatchResult(match, slot, allMatches) {
    const wrestler = selectedWrestler;
    wrestler.highlight = true;

    const opponent = match[slot === 'wrestler1' ? 'wrestler2' : 'wrestler1'];
    match.winner = wrestler;
    match.loser  = opponent || { name: "TBD" };

    if (wrestler.winnerMatch !== undefined) {
      const next = allMatches.find(m => m.matchId === wrestler.winnerMatch);
      if (next) {
        next[wrestler.winnerSlot] = wrestler;
        if (next.matchId === 31) next.winner = wrestler;
      }
    }

    if (opponent && opponent.loserMatch !== undefined) {
      const cons = allMatches.find(m => m.matchId === opponent.loserMatch);
      if (cons) cons[opponent.loserSlot] = opponent;
    }

    renderBrackets({ matches: allMatches });

    const finalMatch = allMatches.find(m => m.matchId === 31);
    if (finalMatch && finalMatch.wrestler1?.name !== "TBD" && finalMatch.wrestler2?.name !== "TBD") {
      if (!finalMatch.winner) {
        const winner = [finalMatch.wrestler1, finalMatch.wrestler2].find(w => w.highlight);
        if (winner) {
          finalMatch.winner = winner;
          finalMatch.loser  = winner === finalMatch.wrestler1 ? finalMatch.wrestler2 : finalMatch.wrestler1;
        }
      }
    }

    window.currentBracket = { matches: allMatches };
    if (typeof updateAllAmericans === "function") updateAllAmericans();
  }

  function loadBracket(weight) {
    fetch(`bracket${weight}.json`)
      .then(res => res.json())
      .then(data => {
        bracketTitle.textContent = `${weight} lb NCAA Bracket - Click to Advance`;
        renderBrackets(data);
        window.currentBracket = data;
      })
      .catch(err => console.error("Error loading bracket:", err));

    document.getElementById('allAmericanBox').style.display = 'block';
    document.getElementById('aaTitle').textContent = `${weight} lb NCAA All-Americans`;
  }

  weightButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const weight = btn.dataset.weight;
      if (weight) {
        weightButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadBracket(weight);
      }
    });
  });

  // Load default weight
  loadBracket("125");
  document.querySelector('#weightSelector button[data-weight="125"]')?.classList.add('active');
});

function updateAllAmericansList(matches) {
  const aaList = document.getElementById("aaList");
  const placementMap = {
    "1st": { matchId: 31, type: "winner" },
    "2nd": { matchId: 31, type: "loser"  },
    "3rd": { matchId: 63, type: "winner" },
    "4th": { matchId: 63, type: "loser"  },
    "5th": { matchId: 62, type: "winner" },
    "6th": { matchId: 62, type: "loser"  },
    "7th": { matchId: 61, type: "winner" },
    "8th": { matchId: 61, type: "loser"  },
  };

  aaList.innerHTML = "";
  Object.entries(placementMap).forEach(([place, { matchId, type }]) => {
    const match    = matches.find(m => m.matchId == matchId);
    const wrestler = match?.[type];
    const name     = wrestler?.name || "TBD";
    const li       = document.createElement("li");
    li.textContent = `${place} - ${name}`;
    aaList.appendChild(li);
  });
}

function debugAAUpdate() {
  if (!window.currentBracket) { console.warn("No bracket data loaded."); return; }
  const m = window.currentBracket.matches.find(m => m.matchId === 31);
  console.log("M31 Winner:", m?.winner?.name);
  console.log("M31 Loser:",  m?.loser?.name);
  updateAllAmericansList(window.currentBracket.matches);
  console.log("Forced AA list refresh");
}
