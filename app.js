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
  const bracketGrid  = document.getElementById("bracketGrid");
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
  const BOX  = 52;   // match box height (2 rows + padding + border)
  const GAP  = 4;    // gap between boxes
  const STEP = BOX + GAP;  // 56px per slot

  // Column left-position → box width
  // Wide (230px): pigtail + Champ R1 + early cons rounds (school name visible)
  // Narrow (155px): all advancer columns
  const colWidth = {
    100:  230,
    270:  230,
    290:  230,
    440:  200,
    500:  155,
    590:  155,
    665:  155,
    740:  155,
    830:  155,
    900:  155,
    980:  155,
    995:  155,
    1080: 155,
  };

  // ── MATCH POSITIONS ─────────────────────────────────────────
  // Champ R1 (16 bouts): step=56, start y=30
  // Each subsequent round doubles the step and centers on pairs
  // Cons bracket starts at CONS_START below champ side

  function tops(n, y0, step) {
    return Array.from({ length: n }, (_, i) => y0 + i * step);
  }

  const champR1 = tops(16, 30, STEP);
  const champR2 = tops(8,  30 + STEP * 0.5, STEP * 2);
  const champR3 = tops(4,  30 + STEP * 1.5, STEP * 4);
  const champR4 = tops(2,  30 + STEP * 3.5, STEP * 8);
  const champF  = [30 + STEP * 7.5];

  const CONS_START = 780;

  const matchPositions = {
    // Pigtail
    "0":  { left: 100,  top: 10 },

    // Champ R1 (1–16)
    "1":  { left: 290,  top: champR1[0]  },
    "2":  { left: 290,  top: champR1[1]  },
    "3":  { left: 290,  top: champR1[2]  },
    "4":  { left: 290,  top: champR1[3]  },
    "5":  { left: 290,  top: champR1[4]  },
    "6":  { left: 290,  top: champR1[5]  },
    "7":  { left: 290,  top: champR1[6]  },
    "8":  { left: 290,  top: champR1[7]  },
    "9":  { left: 290,  top: champR1[8]  },
    "10": { left: 290,  top: champR1[9]  },
    "11": { left: 290,  top: champR1[10] },
    "12": { left: 290,  top: champR1[11] },
    "13": { left: 290,  top: champR1[12] },
    "14": { left: 290,  top: champR1[13] },
    "15": { left: 290,  top: champR1[14] },
    "16": { left: 290,  top: champR1[15] },

    // Champ R2 (17–24)
    "17": { left: 500,  top: champR2[0] },
    "18": { left: 500,  top: champR2[1] },
    "19": { left: 500,  top: champR2[2] },
    "20": { left: 500,  top: champR2[3] },
    "21": { left: 500,  top: champR2[4] },
    "22": { left: 500,  top: champR2[5] },
    "23": { left: 500,  top: champR2[6] },
    "24": { left: 500,  top: champR2[7] },

    // Champ R3 / Quarters (25–28)
    "25": { left: 665,  top: champR3[0] },
    "26": { left: 665,  top: champR3[1] },
    "27": { left: 665,  top: champR3[2] },
    "28": { left: 665,  top: champR3[3] },

    // Champ R4 / Semis (29–30)
    "29": { left: 830,  top: champR4[0] },
    "30": { left: 830,  top: champR4[1] },

    // Final (31)
    "31": { left: 995,  top: champF[0]  },

    // Cons Prelim (32)
    "32": { left: 100,  top: CONS_START },

    // Cons R1 (33–40)
    "33": { left: 270,  top: CONS_START              },
    "34": { left: 270,  top: CONS_START + STEP       },
    "35": { left: 270,  top: CONS_START + STEP * 2   },
    "36": { left: 270,  top: CONS_START + STEP * 3   },
    "37": { left: 270,  top: CONS_START + STEP * 4   },
    "38": { left: 270,  top: CONS_START + STEP * 5   },
    "39": { left: 270,  top: CONS_START + STEP * 6   },
    "40": { left: 270,  top: CONS_START + STEP * 7   },

    // Cons R2 (41–48)
    "41": { left: 440,  top: CONS_START              },
    "42": { left: 440,  top: CONS_START + STEP       },
    "43": { left: 440,  top: CONS_START + STEP * 2   },
    "44": { left: 440,  top: CONS_START + STEP * 3   },
    "45": { left: 440,  top: CONS_START + STEP * 4   },
    "46": { left: 440,  top: CONS_START + STEP * 5   },
    "47": { left: 440,  top: CONS_START + STEP * 6   },
    "48": { left: 440,  top: CONS_START + STEP * 7   },

    // Cons R3 (49–52)
    "49": { left: 590,  top: CONS_START + STEP * 0.5 },
    "50": { left: 590,  top: CONS_START + STEP * 2.5 },
    "51": { left: 590,  top: CONS_START + STEP * 4.5 },
    "52": { left: 590,  top: CONS_START + STEP * 6.5 },

    // Cons R4 (53–56)
    "53": { left: 740,  top: CONS_START + STEP * 0.5 },
    "54": { left: 740,  top: CONS_START + STEP * 2.5 },
    "55": { left: 740,  top: CONS_START + STEP * 4.5 },
    "56": { left: 740,  top: CONS_START + STEP * 6.5 },

    // Cons Qtrs (57–58)
    "57": { left: 900,  top: CONS_START + STEP * 1.5 },
    "58": { left: 900,  top: CONS_START + STEP * 5.5 },

    // Cons Semis (59–60)
    "59": { left: 1080, top: CONS_START + STEP * 1.5 },
    "60": { left: 1080, top: CONS_START + STEP * 5.5 },

    // Placement (61=7th, 62=5th, 63=3rd)
    "61": { left: 980,  top: CONS_START + STEP * 11  },
    "62": { left: 980,  top: CONS_START + STEP * 14  },
    "63": { left: 980,  top: CONS_START + STEP * 17  },
  };

  // ── RENDER ──────────────────────────────────────────────────
  function renderBrackets(data) {
    bracketGrid.innerHTML = "";

    // Auto-size grid height
    const maxTop = Math.max(...Object.values(matchPositions).map(p => p.top)) + 120;
    bracketGrid.style.height = maxTop + "px";

    data.matches.forEach(match => {
      const pos = matchPositions[match.matchId] || { left: 0, top: 0 };
      const w   = colWidth[pos.left] || 155;

      const matchEl = document.createElement("div");
      matchEl.classList.add("match");
      if (w >= 200) matchEl.classList.add('wide');
      matchEl.dataset.matchId = match.matchId;
      matchEl.style.left  = pos.left + "px";
      matchEl.style.top   = pos.top  + "px";
      matchEl.style.width = w + "px";

      ['wrestler1', 'wrestler2'].forEach(slot => {
        const wrestler = match[slot];
        const wEl = document.createElement("div");
        wEl.classList.add("wrestler");
        wEl.dataset.slot    = slot;
        wEl.dataset.matchId = match.matchId;

        if (wrestler?.name && wrestler.name !== "TBD") {
          const seedText   = wrestler.seed   ? `#${wrestler.seed} ` : "";
          const schoolText = wrestler.school || "";
          const recordText = wrestler.record ? ` &bull; ${wrestler.record}` : "";
          wEl.innerHTML = `
            <div class="w-name">${seedText}${wrestler.name}</div>
            <div class="w-meta">${schoolText}${recordText}</div>
          `;
        } else {
          wEl.innerHTML = `<div class="w-name" style="color:#bbb;">TBD</div>`;
        }

        if (wrestler?.highlight) {
          wEl.style.background = "#E8EDF5";
          wEl.style.outline    = "2px solid #1A3A6B";
        }

        wEl.onclick = () => handleSelection(match, slot, data.matches);
        matchEl.appendChild(wEl);
      });

      bracketGrid.appendChild(matchEl);

      // Placement labels
      const labelMap = { 31: "CHAMPION", 63: "3RD PLACE", 62: "5TH PLACE", 61: "7TH PLACE" };
      if (labelMap[match.matchId]) {
        const label = document.createElement("div");
        label.classList.add("placement-label");
        label.textContent    = labelMap[match.matchId];
        label.style.position = "absolute";
        label.style.left     = (pos.left + w + 8) + "px";
        label.style.top      = (pos.top + 18) + "px";
        bracketGrid.appendChild(label);

        if (match.matchId === 31 && match.winner?.name && match.winner.name !== "TBD") {
          const champEl = document.createElement("div");
          champEl.style.cssText = `position:absolute;left:${pos.left + w + 8}px;top:${pos.top}px;font-weight:700;font-size:13px;color:#1A3A6B;`;
          champEl.textContent   = match.winner.name;
          bracketGrid.appendChild(champEl);
        }
      }
    });
  }

  // ── SELECTION & ADVANCEMENT ──────────────────────────────────
  // KEY FIX: winnerMatch/winnerSlot/loserMatch/loserSlot live on
  // the MATCH object in the JSON, not on the wrestler object.
  // We always read routing from match, never from wrestler.

  let selectedWrestler = null;

  function handleSelection(match, slot, allMatches) {
    const wrestler = match[slot];
    if (!wrestler || wrestler.name === "TBD") return;

    // Clear all highlights
    allMatches.forEach(m => {
      ['wrestler1', 'wrestler2'].forEach(s => {
        if (m[s]) delete m[s].highlight;
      });
    });

    // Toggle: clicking the same wrestler again clears their path
    if (selectedWrestler &&
        selectedWrestler.name    === wrestler.name &&
        selectedWrestler.matchId === match.matchId) {
      clearPath(wrestler.name, allMatches, match.matchId);
      selectedWrestler = null;
      window.currentBracket = { matches: allMatches };
      renderBrackets({ matches: allMatches });
      if (typeof updateAllAmericans === "function") updateAllAmericans();
      return;
    }

    selectedWrestler = { ...wrestler, matchId: match.matchId, slot };
    wrestler.highlight = true;

    // Route winner forward using MATCH routing fields
    if (match.winnerMatch != null) {
      const nextMatch = allMatches.find(m => m.matchId === match.winnerMatch);
      if (nextMatch) {
        nextMatch[match.winnerSlot] = { ...wrestler };
        if (match.winnerMatch === 31) nextMatch.winner = { ...wrestler };
      }
    }

    // Route loser to consolation using MATCH routing fields
    const opponent = match[slot === 'wrestler1' ? 'wrestler2' : 'wrestler1'];
    match.winner = { ...wrestler };
    match.loser  = opponent ? { ...opponent } : { name: "TBD" };

    if (match.loserMatch != null && opponent && opponent.name !== "TBD") {
      const consMatch = allMatches.find(m => m.matchId === match.loserMatch);
      if (consMatch) {
        consMatch[match.loserSlot] = { ...opponent };
      }
    }

    // Auto-set winner for final if both wrestlers present
    const finalMatch = allMatches.find(m => m.matchId === 31);
    if (finalMatch &&
        finalMatch.wrestler1?.name !== "TBD" &&
        finalMatch.wrestler2?.name !== "TBD" &&
        !finalMatch.winner) {
      const w = [finalMatch.wrestler1, finalMatch.wrestler2].find(w => w.highlight);
      if (w) {
        finalMatch.winner = { ...w };
        finalMatch.loser  = w === finalMatch.wrestler1 ? { ...finalMatch.wrestler2 } : { ...finalMatch.wrestler1 };
      }
    }

    window.currentBracket = { matches: allMatches };
    renderBrackets({ matches: allMatches });
    if (typeof updateAllAmericans === "function") updateAllAmericans();
  }

  function clearPath(name, allMatches, fromMatchId) {
    allMatches.forEach(m => {
      if (m.matchId > fromMatchId) {
        ['wrestler1', 'wrestler2'].forEach(slot => {
          if (m[slot]?.name === name) {
            m[slot] = { name: "TBD" };
          }
        });
        if (m.winner?.name === name)  delete m.winner;
        if (m.loser?.name  === name)  delete m.loser;
      }
    });
  }

  // ── LOAD BRACKET ────────────────────────────────────────────
  function loadBracket(weight) {
    fetch(`bracket${weight}.json`)
      .then(res => res.json())
      .then(data => {
        bracketTitle.textContent = `${weight} lb NCAA Bracket - Click to Advance`;
        selectedWrestler = null;
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

  loadBracket("125");
  document.querySelector('#weightSelector button[data-weight="125"]')?.classList.add('active');
});

// ── ALL-AMERICANS ────────────────────────────────────────────
function updateAllAmericansList(matches) {
  const aaList = document.getElementById("aaList");
  if (!aaList) return;

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
    const name     = (wrestler?.name && wrestler.name !== "TBD") ? wrestler.name : "TBD";
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
}
