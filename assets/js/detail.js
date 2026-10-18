/* ==========================================================================
   MonChalet — page de détail d'un chalet
   ========================================================================== */

(function () {
  const { CHALETS, AMENITIES, TYPES, REVIEWS } = MC_DATA;
  MC.renderChrome("chalets");

  const TAUX_SERVICE = 0.06;
  const TAUX_TAXES = 0.14975; // TPS 5 % + TVQ 9,975 %

  const params = new URLSearchParams(location.search);
  const c = CHALETS.find(x => x.id === params.get("id"));
  const root = document.getElementById("detail");
  const esc = MC.escapeHtml;
  const icon = MC.icon;

  if (!c) {
    document.title = "Chalet introuvable — MonChalet";
    root.innerHTML =
      '<div class="not-found">' +
        "<h1>Ce chalet est introuvable</h1>" +
        "<p>Il a peut-être été retiré, ou le lien est incomplet.</p>" +
        '<a class="btn btn--forest btn--lg" href="chalets.html">Voir tous les chalets</a>' +
      "</div>";
    return;
  }

  document.title = c.nom + " — " + c.ville + " | MonChalet";
  const noteTxt = c.note.toFixed(2).replace(".", ",");

  /* ---------- Avis (générés à partir du jeu de démonstration) ---------- */
  const seed = [...c.id].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  const avis = [0, 1, 2, 3].map(i => REVIEWS[(seed + i) % REVIEWS.length]);
  const scores = [
    ["Propreté", 0.02], ["Exactitude", -0.03], ["Communication", 0.03],
    ["Emplacement", 0.01], ["Arrivée", 0.0], ["Qualité-prix", -0.06]
  ].map(([label, d]) => [label, Math.min(5, Math.max(4, c.note + d))]);

  /* ---------- Points forts ---------- */
  const highlights = [];
  if (c.hote.superhote) highlights.push(["award", c.hote.nom + " est Superhôte", "Les Superhôtes sont des hôtes expérimentés et très bien notés."]);
  if (c.equipements.includes("lac")) highlights.push(["waves", "Les pieds dans l'eau", "Accès direct à l'eau depuis le terrain."]);
  if (c.equipements.includes("spa")) highlights.push(["spa", "Spa privé", "Détente sous les étoiles, en toute saison."]);
  if (c.equipements.includes("ski")) highlights.push(["mountain", "Près des pistes", "Les remontées sont à quelques minutes en voiture."]);
  if (c.equipements.includes("animaux")) highlights.push(["paw", "Votre animal est le bienvenu", "Les animaux de compagnie sont acceptés."]);
  highlights.push(["key", "Arrivée autonome", "Accédez au chalet avec une boîte à clé sécurisée."]);

  /* ---------- Rendu ---------- */
  const imgs = c.images;
  const galleryBtns = imgs.slice(0, 5).map((id, i) =>
    '<button type="button" data-photo="' + i + '" aria-label="Agrandir la photo ' + (i + 1) + '">' +
      '<img src="' + MC.img(id, i === 0 ? 1400 : 700) + '" alt="' + esc(c.nom) + ", photo " + (i + 1) + '"' + (i ? ' loading="lazy"' : "") + ">" +
    "</button>").join("");

  const specs = [
    ["users", c.voyageurs, c.voyageurs > 1 ? "voyageurs" : "voyageur"],
    ["bed", c.chambres, c.chambres > 1 ? "chambres" : "chambre"],
    ["bed", c.lits, c.lits > 1 ? "lits" : "lit"],
    ["bath", c.sdb, c.sdb > 1 ? "salles de bain" : "salle de bain"],
    ["door", c.pieces, "pièces"],
    ["area", c.superficie.toLocaleString("fr-CA"), "pi²"]
  ].map(([ic, n, label]) => '<div class="spec">' + icon(ic) + "<strong>" + n + "</strong><span>" + label + "</span></div>").join("");

  const amenities = Object.keys(AMENITIES).map(k => {
    const has = c.equipements.includes(k);
    return '<div class="amenity' + (has ? "" : " is-missing") + '">' + icon(AMENITIES[k].icon) +
      "<span>" + AMENITIES[k].label + (has ? "" : '<span class="sr-only"> (non disponible)</span>') + "</span></div>";
  });
  // Équipements présents d'abord
  amenities.sort((a, b) => a.includes("is-missing") - b.includes("is-missing"));

  const rooms = c.chambresDetail.map((lits, i) =>
    '<div class="room">' + icon("bed") + "<h3>Chambre " + (i + 1) + "</h3><p>" + esc(lits) + "</p></div>").join("");

  const [lat, lng] = c.coords;
  const bbox = [lng - 0.06, lat - 0.035, lng + 0.06, lat + 0.035].join(",");
  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox + "&layer=mapnik&marker=" + lat + "," + lng;

  const similar = CHALETS.filter(x => x.id !== c.id)
    .sort((a, b) => (b.region === c.region) - (a.region === c.region) || b.note - a.note)
    .slice(0, 3);

  const maxGuests = c.voyageurs;
  const guestOptions = Array.from({ length: maxGuests }, (_, i) =>
    '<option value="' + (i + 1) + '">' + MC.plural(i + 1, "voyageur", "voyageurs") + "</option>").join("");

  root.innerHTML =
    '<nav class="breadcrumb" aria-label="Fil d\'Ariane">' +
      '<a href="index.html">Accueil</a><span>›</span>' +
      '<a href="chalets.html">Chalets</a><span>›</span>' +
      '<a href="chalets.html?region=' + c.region + '">' + esc(MC.regionName(c.region)) + "</a><span>›</span>" +
      '<span aria-current="page">' + esc(c.nom) + "</span>" +
    "</nav>" +

    '<div class="detail-title">' +
      "<div>" +
        "<h1>" + esc(c.nom) + "</h1>" +
        '<div class="detail-meta">' +
          '<span class="rating">' + icon("star") + noteTxt + " <em>· " + MC.plural(c.nbAvis, "avis", "avis") + "</em></span>" +
          "<span>" + icon("pin") + esc(c.ville) + ", " + esc(MC.regionName(c.region)) + "</span>" +
          "<span>" + icon("home") + esc(TYPES[c.type]) + "</span>" +
          (c.hote.superhote ? '<span class="superhost">' + icon("award") + "Superhôte</span>" : "") +
        "</div>" +
      "</div>" +
      '<div class="title-actions">' +
        '<button class="btn btn--ghost" type="button" id="share-btn">' + icon("share") + "Partager</button>" +
        '<button class="btn btn--ghost' + (MC.isFav(c.id) ? " is-fav" : "") + '" type="button" id="fav-btn">' + icon("heart") + "<span>" + (MC.isFav(c.id) ? "Sauvegardé" : "Sauvegarder") + "</span></button>" +
      "</div>" +
    "</div>" +

    '<div class="gallery">' + galleryBtns +
      '<button type="button" class="gallery__all" data-photo="0">' + icon("grid") + "Voir les " + imgs.length + " photos</button>" +
    "</div>" +

    '<div class="detail-layout">' +
      "<div>" +
        '<section class="detail-block">' +
          '<div class="host-line">' +
            "<div><h2>Chalet entier · hôte : " + esc(c.hote.nom) + "</h2>" +
            "<p>Hôte depuis " + c.hote.depuis + " · Séjour minimum de " + MC.plural(c.minNuits, "nuit", "nuits") + "</p></div>" +
            '<div class="avatar" aria-hidden="true">' + esc(c.hote.nom[0]) + "</div>" +
          "</div>" +
        "</section>" +

        '<section class="detail-block"><h2>Le chalet en un coup d\'œil</h2><div class="specs">' + specs + "</div></section>" +

        '<section class="detail-block"><div class="highlights">' +
          highlights.slice(0, 4).map(([ic, t, d]) => '<div class="highlight">' + icon(ic) + "<div><h3>" + esc(t) + "</h3><p>" + esc(d) + "</p></div></div>").join("") +
        "</div></section>" +

        '<section class="detail-block description"><h2>À propos de ce chalet</h2>' +
          c.description.map(p => "<p>" + esc(p) + "</p>").join("") +
        "</section>" +

        '<section class="detail-block"><h2>Où vous dormirez</h2><div class="rooms">' + rooms + "</div></section>" +

        '<section class="detail-block"><h2>Équipements</h2><div class="amenities">' + amenities.join("") + "</div></section>" +

        '<section class="detail-block"><h2>Emplacement</h2>' +
          '<iframe class="map-frame" title="Carte : ' + esc(c.ville) + '" src="' + mapUrl + '" loading="lazy"></iframe>' +
          '<p class="map-note">' + esc(c.ville) + ", " + esc(MC.regionName(c.region)) + ", Québec. L'adresse exacte vous sera communiquée après la réservation.</p>" +
        "</section>" +

        '<section class="detail-block" id="avis">' +
          '<div class="reviews-summary">' + icon("star") + noteTxt + " · " + MC.plural(c.nbAvis, "avis", "avis") + "</div>" +
          '<div class="score-bars">' + scores.map(([l, v]) =>
            '<div class="score-bar"><span>' + l + '</span><div class="score-bar__track"><div class="score-bar__fill" style="width:' + (v / 5 * 100) + '%"></div></div><strong>' + v.toFixed(1).replace(".", ",") + "</strong></div>").join("") +
          "</div>" +
          '<div class="reviews">' + avis.map(r =>
            '<article class="review"><div class="review__head"><div class="avatar" aria-hidden="true">' + esc(r.nom[0]) + "</div>" +
            "<div><strong>" + esc(r.nom) + "</strong><span>" + esc(r.date) + "</span></div></div><p>" + esc(r.texte) + "</p></article>").join("") +
          "</div>" +
        "</section>" +

        '<section class="detail-block"><h2>À savoir</h2><div class="rules">' +
          "<div><h3>Règlement</h3><ul>" +
            "<li>" + icon("clock") + "Arrivée à partir de 16 h</li>" +
            "<li>" + icon("clock") + "Départ avant 11 h</li>" +
            "<li>" + icon("users") + "Maximum " + MC.plural(c.voyageurs, "voyageur", "voyageurs") + "</li>" +
            "<li>" + icon(c.equipements.includes("animaux") ? "paw" : "x") + (c.equipements.includes("animaux") ? "Animaux acceptés" : "Animaux non acceptés") + "</li>" +
          "</ul></div>" +
          "<div><h3>Santé et sécurité</h3><ul>" +
            "<li>" + icon("check") + "Détecteur de fumée</li>" +
            "<li>" + icon("check") + "Détecteur de monoxyde de carbone</li>" +
            "<li>" + icon("check") + "Extincteur et trousse de premiers soins</li>" +
            "<li>" + icon("smoke") + "Non-fumeur</li>" +
          "</ul></div>" +
          "<div><h3>Annulation</h3><ul>" +
            "<li>" + icon("shield") + "Remboursement complet jusqu'à 14 jours avant l'arrivée.</li>" +
            "<li>" + icon("shield") + "50 % remboursé jusqu'à 7 jours avant.</li>" +
          "</ul></div>" +
        "</div></section>" +
      "</div>" +

      "<aside>" +
        '<form class="booking" id="booking" novalidate>' +
          '<div class="booking__price"><div><strong>' + MC.money(c.prixNuit) + '</strong> <span style="color:var(--ink-soft)">/ nuit</span></div>' +
            '<a class="rating" href="#avis">' + icon("star") + noteTxt + " <em>· " + c.nbAvis + " avis</em></a></div>" +
          '<div class="booking__fields">' +
            '<div class="booking__dates">' +
              '<div class="field"><label for="b-arrivee">Arrivée</label><input class="input" type="date" id="b-arrivee" required></div>' +
              '<div class="field"><label for="b-depart">Départ</label><input class="input" type="date" id="b-depart" required></div>' +
            "</div>" +
            '<div class="field"><label for="b-voyageurs">Voyageurs</label><select class="select" id="b-voyageurs">' + guestOptions + "</select></div>" +
          "</div>" +
          '<p class="booking__msg" id="b-msg" role="alert"></p>' +
          '<button class="btn btn--primary btn--block btn--lg" type="submit" id="b-submit">Vérifier la disponibilité</button>' +
          '<p class="booking__note">Aucun montant ne sera prélevé pour le moment.</p>' +
          '<div class="booking__lines" id="b-lines" hidden></div>' +
          '<div class="booking-trust">' + icon("shield") + "<span>Paiement sécurisé et assistance 7 j/7 pendant votre séjour.</span></div>" +
        "</form>" +
      "</aside>" +
    "</div>" +

    '<section class="section"><div class="section__head"><div><span class="eyebrow">Vous aimerez aussi</span><h2>Chalets similaires</h2></div>' +
      '<a class="link-arrow" href="chalets.html?region=' + c.region + '">Plus de chalets en ' + esc(MC.regionName(c.region)) + " " + icon("arrow") + "</a></div>" +
      '<div class="grid-cards">' + similar.map(s => MC.card(s)).join("") + "</div>" +
    "</section>";

  /* ---------- Favori et partage ---------- */
  const favBtn = document.getElementById("fav-btn");
  favBtn.addEventListener("click", () => {
    const added = MC.toggleFav(c.id);
    favBtn.classList.toggle("is-fav", added);
    favBtn.querySelector("span").textContent = added ? "Sauvegardé" : "Sauvegarder";
  });
  document.getElementById("share-btn").addEventListener("click", () => {
    const done = () => MC.toast("Lien copié dans le presse-papiers");
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, () => MC.toast("Copiez le lien depuis la barre d'adresse"));
    else MC.toast("Copiez le lien depuis la barre d'adresse");
  });

  /* ---------- Visionneuse ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCount = document.getElementById("lb-count");
  let current = 0;
  document.getElementById("lb-close").innerHTML = icon("x");
  document.getElementById("lb-prev").innerHTML = icon("left");
  document.getElementById("lb-next").innerHTML = icon("right");

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    lbImg.src = MC.img(imgs[current], 1600);
    lbImg.alt = c.nom + ", photo " + (current + 1);
    lbCount.textContent = (current + 1) + " / " + imgs.length;
  }
  function openLb(i) { show(i); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; document.getElementById("lb-close").focus(); }
  function closeLb() { lb.classList.remove("is-open"); document.body.style.overflow = ""; }

  root.querySelector(".gallery").addEventListener("click", e => {
    const b = e.target.closest("[data-photo]");
    if (b) openLb(+b.dataset.photo);
  });
  document.getElementById("lb-close").addEventListener("click", closeLb);
  document.getElementById("lb-prev").addEventListener("click", () => show(current - 1));
  document.getElementById("lb-next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });

  /* ---------- Réservation ---------- */
  const fArr = document.getElementById("b-arrivee");
  const fDep = document.getElementById("b-depart");
  const fGuests = document.getElementById("b-voyageurs");
  const msg = document.getElementById("b-msg");
  const lines = document.getElementById("b-lines");
  const submit = document.getElementById("b-submit");

  // Reprend les critères de la recherche s'il y en a
  if (params.get("arrivee") && params.get("arrivee") >= MC.todayISO(0)) fArr.value = params.get("arrivee");
  if (params.get("depart") && fArr.value && params.get("depart") > fArr.value) fDep.value = params.get("depart");
  fGuests.value = Math.min(+params.get("voyageurs") || 2, maxGuests);
  MC.wireDates(fArr, fDep);

  function quote() {
    const nights = MC.nightsBetween(fArr.value, fDep.value);
    if (!fArr.value || !fDep.value || nights <= 0) return null;
    const sousTotal = c.prixNuit * nights;
    const service = Math.round(sousTotal * TAUX_SERVICE * 100) / 100;
    const taxes = Math.round((sousTotal + c.fraisMenage + service) * TAUX_TAXES * 100) / 100;
    return { nights, sousTotal, service, taxes, total: sousTotal + c.fraisMenage + service + taxes };
  }

  function refresh() {
    const q = quote();
    msg.textContent = "";
    if (!q) {
      lines.hidden = true;
      submit.textContent = "Vérifier la disponibilité";
      return;
    }
    if (q.nights < c.minNuits) {
      msg.textContent = "Ce chalet demande un séjour minimum de " + MC.plural(c.minNuits, "nuit", "nuits") + ".";
    }
    submit.textContent = "Demander à réserver";
    lines.hidden = false;
    lines.innerHTML =
      "<div><span>" + MC.money(c.prixNuit) + " × " + MC.plural(q.nights, "nuit", "nuits") + "</span><span>" + MC.money(q.sousTotal, true) + "</span></div>" +
      "<div><span>Frais de ménage</span><span>" + MC.money(c.fraisMenage, true) + "</span></div>" +
      "<div><span>Frais de service</span><span>" + MC.money(q.service, true) + "</span></div>" +
      "<div><span>Taxes (TPS + TVQ)</span><span>" + MC.money(q.taxes, true) + "</span></div>" +
      '<div class="booking__total"><span>Total (CAD)</span><span>' + MC.money(q.total, true) + "</span></div>";
  }
  [fArr, fDep, fGuests].forEach(f => f.addEventListener("change", refresh));
  refresh();

  const modal = document.getElementById("modal");
  document.getElementById("modal-icon").innerHTML = icon("check");
  document.getElementById("modal-close").addEventListener("click", () => modal.classList.remove("is-open"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("is-open"); });

  document.getElementById("booking").addEventListener("submit", e => {
    e.preventDefault();
    const q = quote();
    if (!q) {
      msg.textContent = "Choisissez vos dates d'arrivée et de départ.";
      (fArr.value ? fDep : fArr).focus();
      return;
    }
    if (q.nights < c.minNuits) return;
    // TODO backend : envoyer la demande de réservation au serveur
    document.getElementById("modal-text").textContent =
      c.hote.nom + " a reçu votre demande et vous répondra sous 24 h. (Démo : aucune réservation n'est réellement enregistrée.)";
    document.getElementById("modal-summary").innerHTML =
      "<div><span>Chalet</span><strong>" + esc(c.nom) + "</strong></div>" +
      "<div><span>Dates</span><strong>" + MC.prettyDate(fArr.value) + " → " + MC.prettyDate(fDep.value) + "</strong></div>" +
      "<div><span>Voyageurs</span><strong>" + fGuests.value + "</strong></div>" +
      "<div><span>Total</span><strong>" + MC.money(q.total, true) + "</strong></div>";
    modal.classList.add("is-open");
    document.getElementById("modal-close").focus();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeLb(); modal.classList.remove("is-open"); }
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
