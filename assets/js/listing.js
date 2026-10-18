/* ==========================================================================
   MonChalet — page de sélection : recherche, filtres, tri
   L'état des filtres est gardé dans l'URL pour pouvoir partager une recherche.
   ========================================================================== */

(function () {
  const { CHALETS, AMENITIES, TYPES } = MC_DATA;
  MC.renderChrome("chalets");

  const PRIX_MAX = 700;
  const EQUIP_FILTRES = ["spa", "foyer", "lac", "animaux", "ski", "piscine", "kayak", "wifi", "climatisation", "borne"];

  const $ = id => document.getElementById(id);
  const el = {
    region: $("f-region"), arrivee: $("f-arrivee"), depart: $("f-depart"), voyageurs: $("f-voyageurs"),
    q: $("f-q"), prix: $("f-prix"), prixVal: $("f-prix-val"),
    chambres: $("f-chambres"), sdb: $("f-sdb"), pieces: $("f-pieces"),
    types: $("f-types"), equip: $("f-equip"), favoris: $("f-favoris"), tri: $("f-tri"),
    results: $("results"), title: $("results-title"), sub: $("results-sub"), active: $("active-filters"),
    filters: $("filters"), backdrop: $("filters-backdrop"), open: $("filters-open"), close: $("filters-close")
  };

  /* ---------- État ---------- */
  function readState() {
    const p = new URLSearchParams(location.search);
    return {
      region: p.get("region") || "",
      arrivee: p.get("arrivee") || "",
      depart: p.get("depart") || "",
      voyageurs: +p.get("voyageurs") || 0,
      q: p.get("q") || "",
      prixMax: +p.get("prixMax") || PRIX_MAX,
      chambres: +p.get("chambres") || 0,
      sdb: +p.get("sdb") || 0,
      pieces: +p.get("pieces") || 0,
      types: p.getAll("type"),
      equip: p.getAll("equip"),
      favoris: p.get("favoris") === "1",
      tri: p.get("tri") || "reco"
    };
  }
  let state = readState();

  function writeUrl() {
    const p = new URLSearchParams();
    if (state.region) p.set("region", state.region);
    if (state.arrivee) p.set("arrivee", state.arrivee);
    if (state.depart) p.set("depart", state.depart);
    if (state.voyageurs) p.set("voyageurs", state.voyageurs);
    if (state.q) p.set("q", state.q);
    if (state.prixMax < PRIX_MAX) p.set("prixMax", state.prixMax);
    if (state.chambres) p.set("chambres", state.chambres);
    if (state.sdb) p.set("sdb", state.sdb);
    if (state.pieces) p.set("pieces", state.pieces);
    state.types.forEach(t => p.append("type", t));
    state.equip.forEach(e => p.append("equip", e));
    if (state.favoris) p.set("favoris", "1");
    if (state.tri !== "reco") p.set("tri", state.tri);
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  /* ---------- Construction des contrôles ---------- */
  MC.fillRegionSelect(el.region, state.region);
  const maxGuests = Math.max(...CHALETS.map(c => c.voyageurs));
  el.voyageurs.innerHTML = '<option value="">Tous</option>' +
    Array.from({ length: maxGuests }, (_, i) => '<option value="' + (i + 1) + '">' + MC.plural(i + 1, "voyageur", "voyageurs") + "</option>").join("");
  document.getElementById("top-search-btn").innerHTML = MC.icon("search") + "Rechercher";
  el.open.innerHTML = MC.icon("sliders") + "Filtres";

  function buildSeg(container, key, values) {
    container.innerHTML = values.map(v =>
      '<button type="button" data-value="' + v + '">' + (v === 0 ? "Tous" : v + "+") + "</button>").join("");
    container.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      state[key] = +b.dataset.value;
      update();
    });
  }
  buildSeg(el.chambres, "chambres", [0, 1, 2, 3, 4, 5]);
  buildSeg(el.sdb, "sdb", [0, 1, 2, 3, 4]);
  buildSeg(el.pieces, "pieces", [0, 3, 5, 7, 10]);

  el.types.innerHTML = Object.keys(TYPES).map(t => {
    const n = CHALETS.filter(c => c.type === t).length;
    return '<label class="check"><input type="checkbox" value="' + t + '"><span>' + TYPES[t] + "</span><em>" + n + "</em></label>";
  }).join("");

  el.equip.innerHTML = EQUIP_FILTRES.map(k => {
    const n = CHALETS.filter(c => c.equipements.includes(k)).length;
    return '<label class="check"><input type="checkbox" value="' + k + '">' + MC.icon(AMENITIES[k].icon) +
      "<span>" + AMENITIES[k].label + "</span><em>" + n + "</em></label>";
  }).join("");

  function syncControls() {
    el.region.value = state.region;
    el.arrivee.value = state.arrivee;
    el.depart.value = state.depart;
    el.voyageurs.value = state.voyageurs || "";
    el.q.value = state.q;
    el.prix.value = state.prixMax;
    el.prixVal.textContent = state.prixMax >= PRIX_MAX ? "700 $ et +" : MC.money(state.prixMax);
    [[el.chambres, "chambres"], [el.sdb, "sdb"], [el.pieces, "pieces"]].forEach(([c, k]) => {
      c.querySelectorAll("button").forEach(b => {
        const on = +b.dataset.value === state[k];
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on);
      });
    });
    el.types.querySelectorAll("input").forEach(i => { i.checked = state.types.includes(i.value); });
    el.equip.querySelectorAll("input").forEach(i => { i.checked = state.equip.includes(i.value); });
    el.favoris.checked = state.favoris;
    el.tri.value = state.tri;
  }

  /* ---------- Filtrage ---------- */
  function normalize(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function filtered() {
    const favs = MC.getFavs();
    const q = normalize(state.q.trim());
    const nights = MC.nightsBetween(state.arrivee, state.depart);
    let list = CHALETS.filter(c =>
      (!state.region || c.region === state.region) &&
      (!state.voyageurs || c.voyageurs >= state.voyageurs) &&
      (state.prixMax >= PRIX_MAX || c.prixNuit <= state.prixMax) &&
      c.chambres >= state.chambres &&
      c.sdb >= state.sdb &&
      c.pieces >= state.pieces &&
      (!state.types.length || state.types.includes(c.type)) &&
      state.equip.every(e => c.equipements.includes(e)) &&
      (!state.favoris || favs.includes(c.id)) &&
      (!nights || nights >= c.minNuits) &&
      (!q || normalize(c.nom + " " + c.ville + " " + MC.regionName(c.region)).includes(q))
    );
    const sorters = {
      reco: (a, b) => (b.note * Math.log(b.nbAvis + 1)) - (a.note * Math.log(a.nbAvis + 1)),
      "prix-asc": (a, b) => a.prixNuit - b.prixNuit,
      "prix-desc": (a, b) => b.prixNuit - a.prixNuit,
      note: (a, b) => b.note - a.note,
      capacite: (a, b) => b.voyageurs - a.voyageurs
    };
    return list.sort(sorters[state.tri] || sorters.reco);
  }

  /* ---------- Rendu ---------- */
  function tag(label, clear) {
    return { label, clear };
  }

  function activeTags() {
    const tags = [];
    if (state.region) tags.push(tag(MC.regionName(state.region), () => { state.region = ""; }));
    if (state.arrivee && state.depart) tags.push(tag(MC.prettyDate(state.arrivee) + " → " + MC.prettyDate(state.depart), () => { state.arrivee = state.depart = ""; }));
    if (state.voyageurs) tags.push(tag(MC.plural(state.voyageurs, "voyageur", "voyageurs"), () => { state.voyageurs = 0; }));
    if (state.q) tags.push(tag("« " + state.q + " »", () => { state.q = ""; }));
    if (state.prixMax < PRIX_MAX) tags.push(tag("≤ " + MC.money(state.prixMax) + " / nuit", () => { state.prixMax = PRIX_MAX; }));
    if (state.chambres) tags.push(tag(state.chambres + "+ chambres", () => { state.chambres = 0; }));
    if (state.sdb) tags.push(tag(state.sdb + "+ s. de bain", () => { state.sdb = 0; }));
    if (state.pieces) tags.push(tag(state.pieces + "+ pièces", () => { state.pieces = 0; }));
    state.types.forEach(t => tags.push(tag(TYPES[t] || t, () => { state.types = state.types.filter(x => x !== t); })));
    state.equip.forEach(e => tags.push(tag(AMENITIES[e] ? AMENITIES[e].label : e, () => { state.equip = state.equip.filter(x => x !== e); })));
    if (state.favoris) tags.push(tag("Mes favoris", () => { state.favoris = false; }));
    return tags;
  }

  let currentTags = [];
  function render() {
    const list = filtered();
    const nights = MC.nightsBetween(state.arrivee, state.depart);
    const query = [state.arrivee && "arrivee=" + state.arrivee, state.depart && "depart=" + state.depart, state.voyageurs && "voyageurs=" + state.voyageurs]
      .filter(Boolean).join("&");

    el.title.textContent = state.favoris ? "Mes chalets favoris"
      : state.region ? "Chalets — " + MC.regionName(state.region)
      : "Tous les chalets";
    el.sub.textContent = MC.plural(list.length, "chalet trouvé", "chalets trouvés") +
      (nights > 0 ? " · " + MC.plural(nights, "nuit", "nuits") + " du " + MC.prettyDate(state.arrivee) + " au " + MC.prettyDate(state.depart) : "");
    el.close.textContent = "Voir " + MC.plural(list.length, "chalet", "chalets");

    currentTags = activeTags();
    el.active.innerHTML = currentTags.map((t, i) =>
      '<button class="tag" type="button" data-tag="' + i + '" aria-label="Retirer le filtre ' + MC.escapeHtml(t.label) + '">' + MC.escapeHtml(t.label) + MC.icon("x") + "</button>").join("");
    el.open.innerHTML = MC.icon("sliders") + "Filtres" + (currentTags.length ? " (" + currentTags.length + ")" : "");

    el.results.innerHTML = list.length
      ? list.map(c => MC.card(c, { nights, query })).join("")
      : '<div class="empty" style="grid-column:1/-1">' +
          "<h2>Aucun chalet ne correspond</h2>" +
          "<p>Essayez d'élargir vos critères : moins de filtres, une autre région ou d'autres dates.</p>" +
          '<button class="btn btn--forest" type="button" id="empty-reset">Effacer les filtres</button>' +
        "</div>";
  }

  function update() {
    writeUrl();
    syncControls();
    render();
  }

  /* ---------- Événements ---------- */
  MC.wireDates(el.arrivee, el.depart);

  el.region.addEventListener("change", () => { state.region = el.region.value; update(); });
  el.voyageurs.addEventListener("change", () => { state.voyageurs = +el.voyageurs.value || 0; update(); });
  el.arrivee.addEventListener("change", () => { state.arrivee = el.arrivee.value; state.depart = el.depart.value; update(); });
  el.depart.addEventListener("change", () => { state.arrivee = el.arrivee.value; state.depart = el.depart.value; update(); });
  $("top-search").addEventListener("submit", e => { e.preventDefault(); update(); });

  let qTimer;
  el.q.addEventListener("input", () => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { state.q = el.q.value; update(); }, 200);
  });
  el.prix.addEventListener("input", () => { state.prixMax = +el.prix.value; update(); });
  el.types.addEventListener("change", () => {
    state.types = [...el.types.querySelectorAll("input:checked")].map(i => i.value); update();
  });
  el.equip.addEventListener("change", () => {
    state.equip = [...el.equip.querySelectorAll("input:checked")].map(i => i.value); update();
  });
  el.favoris.addEventListener("change", () => { state.favoris = el.favoris.checked; update(); });
  el.tri.addEventListener("change", () => { state.tri = el.tri.value; update(); });

  function resetAll() {
    state = { region: "", arrivee: "", depart: "", voyageurs: 0, q: "", prixMax: PRIX_MAX, chambres: 0, sdb: 0, pieces: 0, types: [], equip: [], favoris: false, tri: state.tri };
    update();
  }
  $("reset").addEventListener("click", resetAll);

  el.active.addEventListener("click", e => {
    const b = e.target.closest("[data-tag]");
    if (!b) return;
    currentTags[+b.dataset.tag].clear();
    update();
  });
  el.results.addEventListener("click", e => {
    if (e.target.closest("#empty-reset")) resetAll();
  });

  // En mode « favoris », retirer un cœur retire la carte
  document.addEventListener("mc:favs", () => { if (state.favoris) render(); });

  // Panneau de filtres sur mobile
  function setDrawer(open) {
    el.filters.classList.toggle("is-open", open);
    el.backdrop.classList.toggle("is-open", open);
  }
  el.open.addEventListener("click", () => setDrawer(true));
  el.close.addEventListener("click", () => setDrawer(false));
  el.backdrop.addEventListener("click", () => setDrawer(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setDrawer(false); });

  update();
})();
