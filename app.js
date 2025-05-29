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



document.addEventListener("DOMContentLoaded", function () {
  const bracketGrid = document.getElementById("bracketGrid");
  const bracketTitle = document.getElementById("bracketTitle");
  const weightButtons = document.querySelectorAll("#weightSelector button");

  const matchPositions = {
  "0": {
    "left": 100.0,
    "top": 50.0
  },
  "1": {
    "left": 280.0,
    "top": 82.0
  },
  "2": {
    "left": 280.0,
    "top": 114.0
  },
  "3": {
    "left": 280.0,
    "top": 146.0
  },
  "4": {
    "left": 280.0,
    "top": 178.0
  },
  "5": {
    "left": 280.0,
    "top": 210.0
  },
  "6": {
    "left": 280.0,
    "top": 242.0
  },
  "7": {
    "left": 280.0,
    "top": 274.0
  },
  "8": {
    "left": 280.0,
    "top": 306.0
  },
  "9": {
    "left": 280.0,
    "top": 338.0
  },
  "10": {
    "left": 280.0,
    "top": 370.0
  },
  "11": {
    "left": 280.0,
    "top": 402.0
  },
  "12": {
    "left": 280.0,
    "top": 434.0
  },
  "13": {
    "left": 280.0,
    "top": 466.0
  },
  "14": {
    "left": 280.0,
    "top": 498.0
  },
  "15": {
    "left": 280.0,
    "top": 530.0
  },
  "16": {
    "left": 280.0,
    "top": 562.0
  },
  "17": {
    "left": 460.0,
    "top": 98.0
  },
  "18": {
    "left": 460.0,
    "top": 162.0
  },
  "19": {
    "left": 460.0,
    "top": 226.0
  },
  "20": {
    "left": 460.0,
    "top": 290.0
  },
  "21": {
    "left": 460.0,
    "top": 354.0
  },
  "22": {
    "left": 460.0,
    "top": 418.0
  },
  "23": {
    "left": 460.0,
    "top": 482.0
  },
  "24": {
    "left": 460.0,
    "top": 546.0
  },
  "25": {
    "left": 640.0,
    "top": 130.0
  },
  "26": {
    "left": 640.0,
    "top": 258.0
  },
  "27": {
    "left": 640.0,
    "top": 386.0
  },
  "28": {
    "left": 640.0,
    "top": 514.0
  },
  "29": {
    "left": 820.0,
    "top": 194.0
  },
  "30": {
    "left": 820.0,
    "top": 450.0
  },
  "31": {
    "left": 1000.0,
    "top": 322.0
  },
  "32": {
    "left": 100.0,
    "top": 740.0
  },
  "33": {
    "left": 260.0,
    "top": 624.0
  },
  "34": {
    "left": 260.0,
    "top": 656.0
  },
  "35": {
    "left": 260.0,
    "top": 688.0
  },
  "36": {
    "left": 260.0,
    "top": 720.0
  },
  "37": {
    "left": 260.0,
    "top": 752.0
  },
  "38": {
    "left": 260.0,
    "top": 784.0
  },
  "39": {
    "left": 260.0,
    "top": 816.0
  },
  "40": {
    "left": 260.0,
    "top": 848.0
  },
  "41": {
    "left": 420.0,
    "top": 630.0
  },
  "42": {
    "left": 420.0,
    "top": 662.0
  },
  "43": {
    "left": 420.0,
    "top": 694.0
  },
  "44": {
    "left": 420.0,
    "top": 726.0
  },
  "45": {
    "left": 420.0,
    "top": 758.0
  },
  "46": {
    "left": 420.0,
    "top": 790.0
  },
  "47": {
    "left": 420.0,
    "top": 822.0
  },
  "48": {
    "left": 420.0,
    "top": 854.0
  },
  "49": {
    "left": 580.0,
    "top": 650.0
  },
  "50": {
    "left": 580.0,
    "top": 710.0
  },
  "51": {
    "left": 580.0,
    "top": 770.0
  },
  "52": {
    "left": 580.0,
    "top": 830.0
  },
  "53": {
    "left": 740.0,
    "top": 650.0
  },
  "54": {
    "left": 740.0,
    "top": 710.0
  },
  "55": {
    "left": 740.0,
    "top": 770.0
  },
  "56": {
    "left": 740.0,
    "top": 830.0
  },
  "57": {
    "left": 900.0,
    "top": 680.0
  },
  "58": {
    "left": 900.0,
    "top": 800.0
  },
  "59": {
    "left": 1080.0,
    "top": 680.0
  },
  "60": {
    "left": 1080.0,
    "top": 800.0
  },
  "61": {
    "left": 980.0,
    "top": 880.0
  },
  "62": {
    "left": 980.0,
    "top": 940.0
  },
  "63": {
    "left": 980.0,
    "top": 1000.0
  }
}

  function clearPath(name, allMatches, fromMatchId) {
    allMatches.forEach(m => {
      if (m.matchId > fromMatchId) {
        ['wrestler1', 'wrestler2'].forEach(slot => {
          if (m[slot]?.name === name) {
            m[slot] = { seed: null, name: "TBD", school: "TBD" }
          }
        });
      }
    });
  }

  let selectedWrestler = null;

  function renderBrackets(data) {
    bracketGrid.innerHTML = "";
    data.matches.forEach(match => {
      const matchEl = document.createElement("div");
      matchEl.classList.add("match");
      matchEl.dataset.matchId = match.matchId;

      const pos = matchPositions[match.matchId] || { left: 0, top: 0 }
      matchEl.style.left = pos.left + "px";
      matchEl.style.top = pos.top + "px";

      ['wrestler1', 'wrestler2'].forEach(slot => {
        const wrestler = match[slot];
        const wEl = document.createElement("div");
        wEl.classList.add("wrestler");
        wEl.dataset.slot = slot;
        wEl.dataset.matchId = match.matchId;

        if (wrestler?.name && wrestler.name !== "TBD") {
          const seedText = wrestler.seed ? "#" + wrestler.seed + " " : "";
          wEl.textContent = seedText + wrestler.name;
        } else {
          wEl.textContent = "TBD";
        }

        if (wrestler?.highlight) {
          wEl.style.border = "2px solid orange";
          wEl.style.background = "#fff7e6";
        }

        // Prevent text overflow
        wEl.style.overflow = "hidden";
        wEl.style.whiteSpace = "nowrap";
        wEl.style.textOverflow = "ellipsis";

        wEl.onclick = () => handleSelection(match, slot, wrestler, data.matches);
        matchEl.appendChild(wEl);
      });

      bracketGrid.appendChild(matchEl);

      const labelMap = {
        31: "CHAMPION",
        63: "3rd Place",
        62: "5th Place",
        61: "7th Place"
      }
      if (labelMap[match.matchId]) {
        const label = document.createElement("div");
        label.classList.add("placement-label");
        label.textContent = labelMap[match.matchId];
        label.style.position = "absolute";
        label.style.left = (pos.left + 180) + "px";
        label.style.top = (pos.top + 35) + "px";
        label.style.fontWeight = "bold";
        label.style.fontSize = "14px";
        bracketGrid.appendChild(label);

        if (match.matchId === 31) {
          const line = document.createElement("div");
          line.style.position = "absolute";
          line.style.left = (pos.left + 180) + "px";
          line.style.top = (pos.top + 25) + "px";
          line.style.width = "80px";
          line.style.height = "2px";
          line.style.backgroundColor = "black";
          bracketGrid.appendChild(line);

if (match.winner?.name && match.matchId === 31) {
  const champName = document.createElement("div");
  champName.style.position = "absolute";
  champName.style.left = (pos.left + 180) + "px";
  champName.style.top = (pos.top) + "px";
  champName.style.fontWeight = "bold";
  champName.style.fontSize = "14px";
  champName.textContent = match.winner.name;
  bracketGrid.appendChild(champName);
}

      //    const winner = [match.wrestler1, match.wrestler2].find(w => w?.name && w.name !== "TBD") || {}
      //    const champName = document.createElement("div");
       //   champName.style.position = "absolute";
       //   champName.style.left = (pos.left + 180) + "px";
       //   champName.style.top = (pos.top) + "px";
       //   champName.style.fontWeight = "bold";
       //   champName.style.fontSize = "14px";
       //   champName.textContent = winner.name || "TBD";
       //   bracketGrid.appendChild(champName);
        }
      }
    });
  }

  function handleSelection(match, slot, wrestler, allMatches) {
  if (!wrestler || wrestler.name === "TBD") return;

  // Clear previous highlights
  ['wrestler1', 'wrestler2'].forEach(s => {
    if (match[s] && match[s].highlight) {
      delete match[s].highlight;
    }
  });

  // Toggle previously selected wrestler logic
  const previouslySelected = selectedWrestler;
  const wasSame = (
    previouslySelected &&
    previouslySelected.name === wrestler.name &&
    previouslySelected.matchId === match.matchId
  );

  if (wasSame) {
    clearPath(wrestler.name, allMatches, match.matchId);
    selectedWrestler = null;
    return;
  }

  // Highlight current wrestler
  match[slot].highlight = true;
  selectedWrestler = {
    ...wrestler,
    matchId: match.matchId,
    slot: slot
  }

  updateMatchResult(match, slot, allMatches);

    const actuallySelected = !!selectedWrestler;

    allMatches.forEach(m => {
      ['wrestler1', 'wrestler2'].forEach(s => {
        if (m[s]) delete m[s].highlight;
      });
    });

    match[slot].highlight = actuallySelected;

    if (actuallySelected) {
      const opponentSlot = slot === "wrestler1" ? "wrestler2" : "wrestler1";
      const opponent = match[opponentSlot];

      const winnerTarget = allMatches.find(m => m.matchId === match.winnerMatch);
      if (winnerTarget && winnerTarget[match.winnerSlot]?.name === "TBD") {
        winnerTarget[match.winnerSlot] = { ...selectedWrestler }
      }

      const loserTarget = allMatches.find(m => m.matchId === match.loserMatch);
      if (loserTarget && opponent && opponent.name !== "TBD" && loserTarget[match.loserSlot]?.name === "TBD") {
        loserTarget[match.loserSlot] = { ...opponent }
      }
    }

    renderBrackets({ matches: allMatches });
  }

  
function updateMatchResult(match, slot, allMatches) {
  const wrestler = selectedWrestler;
  wrestler.highlight = true;

  const opponent = match[slot === 'wrestler1' ? 'wrestler2' : 'wrestler1'];
  match.winner = wrestler;

  if (match.matchId === 31) {
    console.log("🏁 Selection made in Match 31:", wrestler.name);
  }

  match.loser = opponent || { name: "TBD" }

  if (wrestler.winnerMatch !== undefined) {
    const next = allMatches.find(m => m.matchId === wrestler.winnerMatch);
    if (next) {
      next[wrestler.winnerSlot] = wrestler;
      if (next.matchId === 31) {
        next.winner = wrestler;
      }
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
        const loser = winner === finalMatch.wrestler1 ? finalMatch.wrestler2 : finalMatch.wrestler1;
        finalMatch.loser = loser;
      }
    }
  }

  window.currentBracket = { matches: allMatches }
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
      .catch(err => {
        console.error("Error loading bracket:", err);
      });
 document.getElementById('allAmericanBox').style.display = 'block';
 document.getElementById('aaTitle').textContent = `${weight} lb NCAA All-Americans`;

  }


  
weightButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const weight = btn.dataset.weight;
    if (weight) {
      loadBracket(weight);
    } else {
      console.warn("⚠️ Weight is undefined.");
    }
  });
});

loadBracket("125");

});

function handleSelection(match, slot, wrestler, allMatches) {
  if (!wrestler || wrestler.name === "TBD") return;

  // Clear previous highlights
  ['wrestler1', 'wrestler2'].forEach(s => {
    if (match[s] && match[s].highlight) {
      delete match[s].highlight;
    }
  });

  // Toggle previously selected wrestler logic
  const previouslySelected = selectedWrestler;
  const wasSame = (
    previouslySelected &&
    previouslySelected.name === wrestler.name &&
    previouslySelected.matchId === match.matchId
  );

  if (wasSame) {
    clearPath(wrestler.name, allMatches, match.matchId);
    selectedWrestler = null;
    return;
  }

  // Highlight current wrestler
  match[slot].highlight = true;
  selectedWrestler = {
    ...wrestler,
    matchId: match.matchId,
    slot: slot
  }

  updateMatchResult(match, slot, allMatches);

  wrestler.highlight = true;

  const opponent = match[slot === 'wrestler1' ? 'wrestler2' : 'wrestler1'];

  match.winner = wrestler;

if (match.matchId === 31) {
  console.log("🏁 Selection made in Match 31:", wrestler.name);
}

  match.loser = opponent || { name: "TBD" }

  console.log("🏆 Match winner:", wrestler.name);
  console.log("💥 Match loser:", opponent?.name);

  if (wrestler.winnerMatch !== undefined) {
  const next = allMatches.find(m => m.matchId === wrestler.winnerMatch);
  if (next) {
    next[wrestler.winnerSlot] = wrestler;
    if (next.matchId === 31) {
      next.winner = wrestler; // ✅ Explicitly set winner for match 31
    }
  }
}


  if (opponent && opponent.loserMatch !== undefined) {
    const cons = allMatches.find(m => m.matchId === opponent.loserMatch);
    if (cons) cons[opponent.loserSlot] = opponent;
  }

renderBrackets({ matches: allMatches });
// Auto-assign winner for match 31 if both wrestlers are present
const finalMatch = allMatches.find(m => m.matchId === 31);
if (finalMatch && finalMatch.wrestler1?.name !== "TBD" && finalMatch.wrestler2?.name !== "TBD") {
  if (!finalMatch.winner) {
    // Pick the highlighted wrestler as the winner
    const winner = [finalMatch.wrestler1, finalMatch.wrestler2].find(w => w.highlight);
    if (winner) {
      finalMatch.winner = winner;
      const loser = winner === finalMatch.wrestler1 ? finalMatch.wrestler2 : finalMatch.wrestler1;
      finalMatch.loser = loser;
    }
  }
}

window.currentBracket = { matches: allMatches } // <-- Add this


  // Force update regardless of render logic
  console.log("🔁 updateAllAmericans() called");
  if (typeof updateAllAmericans === "function") updateAllAmericans();
}



function updateAllAmericansList(matches) {
  const aaList = document.getElementById("aaList");
  const placementMap = {
    "1st": { matchId: 31, type: "winner" },
    "2nd": { matchId: 31, type: "loser" },
    "3rd": { matchId: 63, type: "winner" },
    "4th": { matchId: 63, type: "loser" },
    "5th": { matchId: 62, type: "winner" },
    "6th": { matchId: 62, type: "loser" },
    "7th": { matchId: 61, type: "winner" },
    "8th": { matchId: 61, type: "loser" }
  };

  aaList.innerHTML = "";

  Object.entries(placementMap).forEach(([place, { matchId, type }]) => {
    const match = matches.find(m => m.matchId == matchId);
    const wrestler = match?.[type];
    const name = wrestler?.name || "TBD";
    const school = wrestler?.school || "";
    const li = document.createElement("li");
li.textContent = `${place} - ${name}`;
    aaList.appendChild(li);
  });
}
function debugAAUpdate() {
  if (!window.currentBracket) {
    console.warn("⚠️ No bracket data loaded.");
    return;
  }

  const m = window.currentBracket.matches.find(m => m.matchId === 31);
  if (!m) {
    console.warn("⚠️ Match 31 not found.");
    return;
  }
const element = document.getElementById('pdfWrapper');

  console.log("M31 Winner:", m?.winner?.name);
  console.log("M31 Loser:", m?.loser?.name);
  updateAllAmericansList(window.currentBracket.matches);
  console.log("✅ Forced AA list refresh");
}