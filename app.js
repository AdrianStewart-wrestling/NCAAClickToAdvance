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
  const bracketGrid   = document.getElementById("bracketGrid");
  const bracketTitle  = document.getElementById("bracketTitle");
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

  // ── LAYOUT CONSTANTS ────────────────────────────────────────
  const BOX  = 52;        // height of one match box (2 rows + borders)
  const GAP  = 4;         // gap between boxes
  const STEP = BOX + GAP; // 56px per bracket slot

  // left-position → box width
  // 230px wide = pigtail + Champ R1 + early cons (school name shows)
  // 155px narrow = all advancer columns (name only)
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

  function tops(n, y0, step) {
    return Array.from({ length: n }, (_, i) => Math.round(y0 + i * step));
  }

  // Champ side
  const champR1 = tops(16, 30, STEP);
  const champR2 = tops(8,  30 + STEP * 0.5, STEP * 2);
  const champR3 = tops(4,  30 + STEP * 1.5, STEP * 4);
  const champR4 = tops(2,  30 + STEP * 3.5, STEP * 8);
  const champF  = [Math.round(30 + STEP * 7.5)];

  // Cons side starts below champ
  const CS = 972; // CONS_START

  const matchPositions = {
    // Pigtail
    "0":  { left: 100, top: 10 },

    // Champ R1 (1–16)
    "1":  { left: 290, top: champR1[0]  },
    "2":  { left: 290, top: champR1[1]  },
    "3":  { left: 290, top: champR1[2]  },
    "4":  { left: 290, top: champR1[3]  },
    "5":  { left: 290, top: champR1[4]  },
    "6":  { left: 290, top: champR1[5]  },
    "7":  { left: 290, top: champR1[6]  },
    "8":  { left: 290, top: champR1[7]  },
    "9":  { left: 290, top: champR1[8]  },
    "10": { left: 290, top: champR1[9]  },
    "11": { left: 290, top: champR1[10] },
    "12": { left: 290, top: champR1[11] },
    "13": { left: 290, top: champR1[12] },
    "14": { left: 290, top: champR1[13] },
    "15": { left: 290, top: champR1[14] },
    "16": { left: 290, top: champR1[15] },

    // Champ R2 (17–24)
    "17": { left: 500, top: champR2[0] },
    "18": { left: 500, top: champR2[1] },
    "19": { left: 500, top: champR2[2] },
    "20": { left: 500, top: champR2[3] },
    "21": { left: 500, top: champR2[4] },
    "22": { left: 500, top: champR2[5] },
    "23": { left: 500, top: champR2[6] },
    "24": { left: 500, top: champR2[7] },

    // Champ Quarters (25–28)
    "25": { left: 665, top: champR3[0] },
    "26": { left: 665, top: champR3[1] },
    "27": { left: 665, top: champR3[2] },
    "28": { left: 665, top: champR3[3] },

    // Champ Semis (29–30)
    "29": { left: 830, top: champR4[0] },
    "30": { left: 830, top: champR4[1] },

    // Final (31)
    "31": { left: 995, top: champF[0] },

    // Cons Prelim (32)
    "32": { left: 100, top: CS },

    // Cons R1 (33–40)
    "33": { left: 270, top: CS              },
    "34": { left: 270, top: CS + STEP       },
    "35": { left: 270, top: CS + STEP * 2   },
    "36": { left: 270, top: CS + STEP * 3   },
    "37": { left: 270, top: CS + STEP * 4   },
    "38": { left: 270, top: CS + STEP * 5   },
    "39": { left: 270, top: CS + STEP * 6   },
    "40": { left: 270, top: CS + STEP * 7   },

    // Cons R2 (41–48)
    "41": { left: 440, top: CS              },
    "42": { left: 440, top: CS + STEP       },
    "43": { left: 440, top: CS + STEP * 2   },
    "44": { left: 440, top: CS + STEP * 3   },
    "45": { left: 440, top: CS + STEP * 4   },
    "46": { left: 440, top: CS + STEP * 5   },
    "47": { left: 440, top: CS + STEP * 6   },
    "48": { left: 440, top: CS + STEP * 7   },

    // Cons R3 (49–52)
    "49": { left: 590, top: CS + STEP * 0.5 },
    "50": { left: 590, top: CS + STEP * 2.5 },
    "51": { left: 590, top: CS + STEP * 4.5 },
    "52": { left: 590, top: CS + STEP * 6.5 },

    // Cons R4 (53–56)
    "53": { left: 740, top: CS + STEP * 0.5 },
    "54": { left: 740, top: CS + STEP * 2.5 },
    "55": { left: 740, top: CS + STEP * 4.5 },
    "56": { left: 740, top: CS + STEP * 6.5 },

    // Cons Qtrs (57–58)
    "57": { left: 900, top: CS + STEP * 1.5 },
    "58": { left: 900, top: CS + STEP * 5.5 },

    // Cons Semis (59–60)
    "59": { left: 1080, top: CS + STEP * 1.5 },
    "60": { left: 1080, top: CS + STEP * 5.5 },

    // Placement (tightly spaced — just below cons semis)
    "61": { left: 980, top: CS + STEP * 8   }, // 7th
    "62": { left: 980, top: CS + STEP * 10  }, // 5th
    "63": { left: 980, top: CS + STEP * 12  }, // 3rd
  };

  // ── RENDER ──────────────────────────────────────────────────
  // IMPORTANT: onclick captures (match, slot, allMatches) via closure.
  // The handler reads routing from match.winnerMatch etc (not wrestler).

  function renderBrackets(data) {
    bracketGrid.innerHTML = "";

    // Auto-size grid height — generous padding so cons bracket never clips
    var allTops = Object.values(matchPositions).map(function(p) { return p.top; });
    var gridH = Math.max.apply(null, allTops) + 180;
    bracketGrid.style.height = gridH + "px";
    bracketGrid.style.width  = "1300px";

    data.matches.forEach(function(match) {
      const pos = matchPositions[String(match.matchId)] || { left: 0, top: 0 };
      const w   = colWidth[pos.left] || 155;

      const matchEl = document.createElement("div");
      matchEl.classList.add("match");
      if (w >= 200) matchEl.classList.add("wide");
      matchEl.dataset.matchId = match.matchId;
      matchEl.style.left  = pos.left + "px";
      matchEl.style.top   = pos.top  + "px";
      matchEl.style.width = w + "px";

      ["wrestler1", "wrestler2"].forEach(function(slot) {
        const wrestler = match[slot];
        const wEl = document.createElement("div");
        wEl.classList.add("wrestler");

        if (wrestler && wrestler.name && wrestler.name !== "TBD") {
          const seed   = wrestler.seed   ? "#" + wrestler.seed + " " : "";
          const school = wrestler.school || "";
          const record = wrestler.record ? " &bull; " + wrestler.record : "";
          wEl.innerHTML =
            '<div class="w-name">' + seed + wrestler.name + '</div>' +
            '<div class="w-meta">' + school + record + '</div>';
        } else {
          wEl.innerHTML = '<div class="w-name" style="color:#bbb;">TBD</div>';
        }

        if (wrestler && wrestler.highlight) {
          wEl.style.background = "#E8EDF5";
          wEl.style.outline    = "2px solid #1A3A6B";
          wEl.style.outlineOffset = "-2px";
        }

        // ── KEY: closure captures match + slot + data.matches ──
        // onclick reads match.winnerMatch / match.loserMatch for routing
        wEl.onclick = (function(m, s, matches) {
          return function() { handleSelection(m, s, matches); };
        })(match, slot, data.matches);

        matchEl.appendChild(wEl);
      });

      bracketGrid.appendChild(matchEl);

      // Placement labels
      var labelMap = { 31: "CHAMPION", 63: "3RD PLACE", 62: "5TH PLACE", 61: "7TH PLACE" };
      if (labelMap[match.matchId]) {
        var label = document.createElement("div");
        label.classList.add("placement-label");
        label.textContent    = labelMap[match.matchId];
        label.style.position = "absolute";
        label.style.left     = (pos.left + w + 10) + "px";
        label.style.top      = (pos.top + 18) + "px";
        bracketGrid.appendChild(label);

        if (match.matchId === 31 && match.winner && match.winner.name && match.winner.name !== "TBD") {
          var champEl = document.createElement("div");
          champEl.style.cssText = "position:absolute;left:" + (pos.left + w + 10) + "px;top:" + pos.top + "px;font-weight:700;font-size:13px;color:#1A3A6B;";
          champEl.textContent   = match.winner.name;
          bracketGrid.appendChild(champEl);
        }
      }
    });
  }

  // ── SELECTION & ROUTING ─────────────────────────────────────
  var selectedWrestler = null;

  function handleSelection(match, slot, allMatches) {
    var wrestler = match[slot];
    if (!wrestler || wrestler.name === "TBD") return;

    // Clear all highlights across entire bracket
    allMatches.forEach(function(m) {
      ["wrestler1", "wrestler2"].forEach(function(s) {
        if (m[s]) delete m[s].highlight;
      });
    });

    // Toggle: clicking same wrestler again clears their path
    if (selectedWrestler &&
        selectedWrestler.name    === wrestler.name &&
        selectedWrestler.matchId === match.matchId) {
      clearPath(wrestler.name, allMatches, match.matchId);
      selectedWrestler = null;
      window.currentBracket = { matches: allMatches };
      renderBrackets({ matches: allMatches });
      updateAllAmericansList(allMatches);
      return;
    }

    selectedWrestler = { name: wrestler.name, matchId: match.matchId, slot: slot };
    wrestler.highlight = true;

    var opponent = match[slot === "wrestler1" ? "wrestler2" : "wrestler1"];
    match.winner = copyWrestler(wrestler);
    match.loser  = opponent ? copyWrestler(opponent) : { name: "TBD" };

    // ── ADVANCE WINNER using match.winnerMatch / match.winnerSlot ──
    if (match.winnerMatch != null) {
      var nextMatch = allMatches.find(function(m) { return m.matchId === match.winnerMatch; });
      if (nextMatch) {
        nextMatch[match.winnerSlot] = copyWrestler(wrestler);
        if (match.winnerMatch === 31) {
          nextMatch.winner = copyWrestler(wrestler);
        }
      }
    }

    // ── DROP LOSER using match.loserMatch / match.loserSlot ──
    if (match.loserMatch != null && opponent && opponent.name !== "TBD") {
      var consMatch = allMatches.find(function(m) { return m.matchId === match.loserMatch; });
      if (consMatch) {
        consMatch[match.loserSlot] = copyWrestler(opponent);
      }
    }

    // Auto-resolve final if both wrestlers are set
    var finalMatch = allMatches.find(function(m) { return m.matchId === 31; });
    if (finalMatch &&
        finalMatch.wrestler1 && finalMatch.wrestler1.name !== "TBD" &&
        finalMatch.wrestler2 && finalMatch.wrestler2.name !== "TBD" &&
        !finalMatch.winner) {
      var w = [finalMatch.wrestler1, finalMatch.wrestler2].find(function(w) { return w.highlight; });
      if (w) {
        finalMatch.winner = copyWrestler(w);
        finalMatch.loser  = copyWrestler(w === finalMatch.wrestler1 ? finalMatch.wrestler2 : finalMatch.wrestler1);
      }
    }

    window.currentBracket = { matches: allMatches };
    renderBrackets({ matches: allMatches });
    updateAllAmericansList(allMatches);
  }

  function copyWrestler(w) {
    return { seed: w.seed, name: w.name, school: w.school, record: w.record };
  }

  function clearPath(name, allMatches, fromMatchId) {
    allMatches.forEach(function(m) {
      if (m.matchId > fromMatchId) {
        ["wrestler1", "wrestler2"].forEach(function(slot) {
          if (m[slot] && m[slot].name === name) {
            m[slot] = { name: "TBD" };
          }
        });
        if (m.winner && m.winner.name === name) delete m.winner;
        if (m.loser  && m.loser.name  === name) delete m.loser;
      }
    });
  }

  // ── LOAD BRACKET ────────────────────────────────────────────
  function loadBracket(weight) {
    selectedWrestler = null;
    fetch("bracket" + weight + ".json")
      .then(function(res) { return res.json(); })
      .then(function(data) {
        bracketTitle.textContent = weight + " lb NCAA Bracket - Click to Advance";
        renderBrackets(data);
        window.currentBracket = data;
        updateAllAmericansList(data.matches);
      })
      .catch(function(err) { console.error("Error loading bracket:", err); });

    document.getElementById("allAmericanBox").style.display = "block";
    document.getElementById("aaTitle").textContent = weight + " lb NCAA All-Americans";
  }

  weightButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var weight = btn.dataset.weight;
      if (weight) {
        weightButtons.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        loadBracket(weight);
      }
    });
  });

  loadBracket("125");
  var first125 = document.querySelector('#weightSelector button[data-weight="125"]');
  if (first125) first125.classList.add("active");
});

// ── ALL-AMERICANS ────────────────────────────────────────────
function updateAllAmericansList(matches) {
  var aaList = document.getElementById("aaList");
  if (!aaList) return;

  var placements = [
    { place: "1st", matchId: 31, type: "winner" },
    { place: "2nd", matchId: 31, type: "loser"  },
    { place: "3rd", matchId: 63, type: "winner" },
    { place: "4th", matchId: 63, type: "loser"  },
    { place: "5th", matchId: 62, type: "winner" },
    { place: "6th", matchId: 62, type: "loser"  },
    { place: "7th", matchId: 61, type: "winner" },
    { place: "8th", matchId: 61, type: "loser"  },
  ];

  aaList.innerHTML = "";
  placements.forEach(function(p) {
    var match    = matches.find(function(m) { return m.matchId === p.matchId; });
    var wrestler = match && match[p.type];
    var name     = (wrestler && wrestler.name && wrestler.name !== "TBD") ? wrestler.name : "TBD";
    var li       = document.createElement("li");
    li.textContent = p.place + " - " + name;
    aaList.appendChild(li);
  });
}

function debugAAUpdate() {
  if (!window.currentBracket) { console.warn("No bracket data loaded."); return; }
  var m = window.currentBracket.matches.find(function(m) { return m.matchId === 31; });
  console.log("M31 Winner:", m && m.winner && m.winner.name);
  console.log("M31 Loser:",  m && m.loser  && m.loser.name);
  updateAllAmericansList(window.currentBracket.matches);
}
