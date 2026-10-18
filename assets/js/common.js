/* ==========================================================================
   MonChalet — utilitaires communs (en-tête, pied de page, cartes, favoris)
   ========================================================================== */

window.MC = (function () {
  const { REGIONS, AMENITIES } = window.MC_DATA;

  const ICONS = {
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
    bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.68 3 4 3.68 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 8 7"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M17 19v2"/>',
    door: '<path d="M3 21h18"/><path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17"/><circle cx="15" cy="12" r="1"/>',
    area: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h4M3 15h4M9 3v4M15 3v4"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    spa: '<path d="M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M4 14h16"/><path d="M8 10c0-1.5 1-2 1-3.5S8 4 8 4M12 10c0-1.5 1-2 1-3.5S12 4 12 4M16 10c0-1.5 1-2 1-3.5S16 4 16 4"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/>',
    paw: '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.05Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    pool: '<path d="M2 20c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M8 16V5a2 2 0 0 1 4 0"/><path d="M16 16V5a2 2 0 0 0-4 0"/><path d="M8 9h8M8 13h8"/>',
    bbq: '<path d="M4 10h16a8 8 0 0 1-16 0z"/><path d="m8 17-2 5M16 17l2 5M12 18v4"/><path d="M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/>',
    kayak: '<path d="M2 15c5 3 15 3 20 0-5-3-15-3-20 0z"/><path d="M5 5l14 18"/><path d="M3.5 3.5l3 3"/>',
    washer: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M8 6h.01M11 6h.01"/>',
    snow: '<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    parking: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
    tv: '<rect x="2" y="7" width="20" height="15" rx="2"/><path d="m17 2-5 5-5-5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    smoke: '<path d="M2 16h15v4H2zM22 16v4M18 16v4"/><path d="M7 12c0-2 2-2 2-4M12 12c0-2 2-2 2-4"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    tree: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7z"/><path d="M12 22v-3"/>'
  };

  function icon(name, extraClass) {
    const solid = name === "star";
    return '<svg class="icon' + (solid ? " icon--fill" : "") + (extraClass ? " " + extraClass : "") +
      '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function img(id, w) {
    return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 800) + "&q=75";
  }

  const moneyFmt = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
  const moneyFmt2 = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function money(n, cents) { return (cents ? moneyFmt2 : moneyFmt).format(n); }

  function plural(n, one, many) { return n + " " + (n > 1 ? many : one); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function regionName(id) {
    const r = REGIONS.find(r => r.id === id);
    return r ? r.nom : id;
  }

  /* ---------- Dates ---------- */
  function isoDate(d) {
    const z = n => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
  }
  function todayISO(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + (offsetDays || 0));
    return isoDate(d);
  }
  function addDays(iso, n) {
    const d = new Date(iso + "T12:00:00");
    d.setDate(d.getDate() + n);
    return isoDate(d);
  }
  function nightsBetween(a, b) {
    if (!a || !b) return 0;
    const ms = new Date(b + "T12:00:00") - new Date(a + "T12:00:00");
    return Math.round(ms / 86400000);
  }
  function prettyDate(iso) {
    return new Date(iso + "T12:00:00").toLocaleDateString("fr-CA", { day: "numeric", month: "short" });
  }

  /* ---------- Favoris (stockés localement en attendant le backend) ---------- */
  const FAV_KEY = "monchalet:favoris";
  function getFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; }
  }
  function isFav(id) { return getFavs().includes(id); }
  function toggleFav(id) {
    let favs = getFavs();
    const added = !favs.includes(id);
    favs = added ? favs.concat(id) : favs.filter(f => f !== id);
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) { /* stockage indisponible */ }
    updateFavCount();
    toast(added ? "Ajouté à vos favoris" : "Retiré de vos favoris");
    document.dispatchEvent(new CustomEvent("mc:favs"));
    return added;
  }
  function updateFavCount() {
    const el = document.querySelector(".fav-count");
    if (!el) return;
    const n = getFavs().length;
    el.textContent = n;
    el.hidden = n === 0;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2200);
  }

  /* ---------- Carte chalet ---------- */
  function card(c, opts) {
    opts = opts || {};
    const nights = opts.nights || 0;
    const fav = isFav(c.id);
    const total = nights > 0
      ? "<small>" + money(c.prixNuit * nights + c.fraisMenage) + " pour " + plural(nights, "nuit", "nuits") + "</small>"
      : "";
    const badge = c.hote.superhote ? '<span class="card__badge">Superhôte</span>' : "";
    const href = "chalet.html?id=" + encodeURIComponent(c.id) + (opts.query ? "&" + opts.query : "");
    return '<article class="card">' +
      '<div class="card__media">' +
        '<img src="' + img(c.images[0], 700) + '" alt="' + escapeHtml(c.nom) + '" loading="lazy">' +
        badge +
        '<button class="fav-btn' + (fav ? " is-fav" : "") + '" data-fav="' + c.id + '" aria-pressed="' + fav + '" aria-label="Ajouter ' + escapeHtml(c.nom) + ' aux favoris">' + icon("heart") + "</button>" +
      "</div>" +
      '<div class="card__body">' +
        '<div class="card__top">' +
          '<span class="card__loc">' + icon("pin") + escapeHtml(c.ville) + ", " + escapeHtml(regionName(c.region)) + "</span>" +
          '<span class="rating">' + icon("star") + c.note.toFixed(2).replace(".", ",") + "</span>" +
        "</div>" +
        '<h3 class="card__title"><a href="' + href + '">' + escapeHtml(c.nom) + "</a></h3>" +
        '<div class="card__specs">' +
          "<span>" + icon("users") + plural(c.voyageurs, "voyageur", "voyageurs") + "</span>" +
          "<span>" + icon("bed") + plural(c.chambres, "chambre", "chambres") + "</span>" +
          "<span>" + icon("bath") + plural(c.sdb, "s. de bain", "s. de bain") + "</span>" +
          "<span>" + icon("door") + plural(c.pieces, "pièce", "pièces") + "</span>" +
        "</div>" +
        '<div class="card__foot">' +
          '<div class="price"><strong>' + money(c.prixNuit) + "</strong> <span>/ nuit</span>" + total + "</div>" +
          '<span class="rating"><em>' + plural(c.nbAvis, "avis", "avis") + "</em></span>" +
        "</div>" +
      "</div>" +
    "</article>";
  }

  // Délégation : un seul gestionnaire pour tous les cœurs de la page
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault();
    const added = toggleFav(btn.dataset.fav);
    btn.classList.toggle("is-fav", added);
    btn.setAttribute("aria-pressed", added);
  });

  /* ---------- En-tête et pied de page ---------- */
  function renderChrome(active) {
    const header = document.getElementById("site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML =
        '<div class="container site-header__inner">' +
          '<a class="brand" href="index.html" aria-label="MonChalet, accueil">' +
            '<img src="assets/img/logo-icon.svg" alt=""><span>Mon<b>Chalet</b></span>' +
          "</a>" +
          '<nav class="main-nav" id="main-nav" aria-label="Navigation principale">' +
            '<a href="index.html"' + (active === "accueil" ? ' class="is-active" aria-current="page"' : "") + ">Accueil</a>" +
            '<a href="chalets.html"' + (active === "chalets" ? ' class="is-active" aria-current="page"' : "") + ">Trouver un chalet</a>" +
            '<a href="index.html#regions">Régions</a>' +
            '<a href="index.html#proprietaires">Devenir hôte</a>' +
          "</nav>" +
          '<div class="header-actions">' +
            '<a class="fav-link" href="chalets.html?favoris=1">' + icon("heart") + '<span class="sr-only">Favoris</span><span class="fav-count" hidden>0</span></a>' +
            '<a class="btn btn--forest" href="index.html#proprietaires">Louer mon chalet</a>' +
            '<button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Menu">' + icon("menu") + "</button>" +
          "</div>" +
        "</div>";
      const toggle = header.querySelector(".menu-toggle");
      const nav = header.querySelector(".main-nav");
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open);
      });
    }

    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "site-footer";
      const regionLinks = REGIONS.map(r => '<li><a href="chalets.html?region=' + r.id + '">' + r.nom + "</a></li>").join("");
      footer.innerHTML =
        '<div class="container">' +
          '<div class="footer-grid">' +
            "<div>" +
              '<a class="brand" href="index.html"><img src="assets/img/logo-icon.svg" alt=""><span>Mon<b>Chalet</b></span></a>' +
              '<p class="footer-tagline">La plateforme québécoise qui met en relation propriétaires de chalets et vacanciers.</p>' +
            "</div>" +
            "<div><h4>Destinations</h4><ul>" + regionLinks + "</ul></div>" +
            "<div><h4>Voyageurs</h4><ul>" +
              '<li><a href="chalets.html">Tous les chalets</a></li>' +
              '<li><a href="chalets.html?equip=spa">Chalets avec spa</a></li>' +
              '<li><a href="chalets.html?equip=animaux">Animaux acceptés</a></li>' +
              '<li><a href="chalets.html?favoris=1">Mes favoris</a></li>' +
            "</ul></div>" +
            "<div><h4>Propriétaires</h4><ul>" +
              '<li><a href="index.html#proprietaires">Louer mon chalet</a></li>' +
              '<li><a href="index.html#comment">Comment ça marche</a></li>' +
              "<li><a href=\"#\">Centre d'aide</a></li>" +
            "</ul></div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<span>© " + new Date().getFullYear() + " MonChalet. Tous droits réservés.</span>" +
            '<span>Photos : <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span>' +
          "</div>" +
        "</div>";
    }
    updateFavCount();
  }

  /* ---------- Formulaire de recherche partagé ---------- */
  function fillRegionSelect(select, value) {
    select.innerHTML = '<option value="">Toutes les régions</option>' +
      REGIONS.map(r => '<option value="' + r.id + '"' + (r.id === value ? " selected" : "") + ">" + r.nom + "</option>").join("");
  }

  function wireDates(arrivee, depart) {
    arrivee.min = todayISO(0);
    depart.min = arrivee.value ? addDays(arrivee.value, 1) : todayISO(1);
    arrivee.addEventListener("change", () => {
      if (!arrivee.value) return;
      depart.min = addDays(arrivee.value, 1);
      if (!depart.value || depart.value <= arrivee.value) depart.value = addDays(arrivee.value, 2);
      depart.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  return {
    icon, img, money, plural, escapeHtml, regionName,
    todayISO, addDays, nightsBetween, prettyDate,
    getFavs, isFav, toggleFav, toast,
    card, renderChrome, fillRegionSelect, wireDates
  };
})();
