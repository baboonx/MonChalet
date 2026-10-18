/* ==========================================================================
   MonChalet — données de démonstration
   À remplacer par les appels au backend plus tard.
   Photos : Unsplash (https://unsplash.com), utilisées comme images temporaires.
   ========================================================================== */

window.MC_DATA = (function () {
  const REGIONS = [
    { id: "laurentides", nom: "Laurentides", image: "1441974231531-c6227db76b6e" },
    { id: "cantons-de-l-est", nom: "Cantons-de-l'Est", image: "1470770841072-f978cf4d019e" },
    { id: "charlevoix", nom: "Charlevoix", image: "1506905925346-21bda4d32df4" },
    { id: "lanaudiere", nom: "Lanaudière", image: "1478131143081-80f7f84ca84d" },
    { id: "gaspesie", nom: "Gaspésie", image: "1518780664697-55e3ad937233" }
  ];

  const AMENITIES = {
    spa:            { label: "Spa extérieur", icon: "spa" },
    foyer:          { label: "Foyer au bois", icon: "flame" },
    lac:            { label: "Bord de l'eau", icon: "waves" },
    wifi:           { label: "Wi-Fi rapide", icon: "wifi" },
    animaux:        { label: "Animaux acceptés", icon: "paw" },
    ski:            { label: "Près des pistes de ski", icon: "mountain" },
    piscine:        { label: "Piscine", icon: "pool" },
    bbq:            { label: "BBQ", icon: "bbq" },
    kayak:          { label: "Kayaks et canot", icon: "kayak" },
    laveuse:        { label: "Laveuse et sécheuse", icon: "washer" },
    climatisation:  { label: "Climatisation", icon: "snow" },
    borne:          { label: "Borne de recharge VÉ", icon: "zap" },
    cuisine:        { label: "Cuisine équipée", icon: "utensils" },
    stationnement:  { label: "Stationnement gratuit", icon: "parking" },
    tele:           { label: "Télé et streaming", icon: "tv" }
  };

  const TYPES = {
    rustique: "Rustique",
    moderne: "Moderne",
    "bord-de-l-eau": "Bord de l'eau",
    "chalet-a": "Chalet en A",
    domaine: "Grand domaine"
  };

  const CHALETS = [
    {
      id: "refuge-du-lac",
      nom: "Le Refuge du Lac",
      region: "laurentides",
      ville: "Mont-Tremblant",
      coords: [46.2097, -74.585],
      type: "bord-de-l-eau",
      prixNuit: 425,
      fraisMenage: 175,
      minNuits: 2,
      voyageurs: 8,
      chambres: 4,
      lits: 5,
      sdb: 3,
      pieces: 9,
      superficie: 2400,
      note: 4.97,
      nbAvis: 128,
      vedette: true,
      equipements: ["spa", "foyer", "lac", "wifi", "ski", "bbq", "kayak", "laveuse", "cuisine", "stationnement", "tele", "borne"],
      images: ["1510798831971-661eb04b3739", "1556020685-ae41abfc9365", "1556911220-bff31c812dba", "1505691938895-1758d7feb511", "1584622650111-993a426fbf0a", "1478131143081-80f7f84ca84d"],
      resume: "Chalet en bois rond les pieds dans l'eau, à 10 minutes du village de Tremblant.",
      description: [
        "Posé au bord d'un lac calme entouré d'épinettes, le Refuge du Lac est le point de départ idéal pour vos week-ends de ski comme pour vos étés en canot. Ses grandes fenêtres donnent sur l'eau et les montagnes.",
        "Le soir, on se retrouve autour du foyer en pierre ou dans le spa sous les étoiles. La cuisine ouverte accueille facilement huit personnes, et le quai privé vous attend avec kayaks et canot."
      ],
      hote: { nom: "Isabelle", depuis: 2017, superhote: true },
      chambresDetail: ["1 lit king", "1 lit queen", "1 lit queen", "2 lits simples"]
    },
    {
      id: "la-clairiere",
      nom: "Chalet La Clairière",
      region: "lanaudiere",
      ville: "Saint-Donat",
      coords: [46.319, -74.224],
      type: "rustique",
      prixNuit: 165,
      fraisMenage: 80,
      minNuits: 2,
      voyageurs: 4,
      chambres: 2,
      lits: 2,
      sdb: 1,
      pieces: 5,
      superficie: 900,
      note: 4.86,
      nbAvis: 64,
      vedette: true,
      equipements: ["foyer", "animaux", "bbq", "cuisine", "stationnement", "wifi"],
      images: ["1449158743715-0a90ebb6d2d8", "1501685532562-aa6846b14a0e", "1586105251261-72a756497a11", "1556911220-bff31c812dba", "1441974231531-c6227db76b6e"],
      resume: "Petite cabane en bois au milieu de la forêt, pour décrocher pour vrai.",
      description: [
        "Au bout d'un chemin de terre, la Clairière vous accueille dans une ambiance rustique et chaleureuse : murs en bois, poêle à combustion lente et coin lecture rempli de livres.",
        "Les sentiers de randonnée partent directement du terrain. Votre chien est le bienvenu !"
      ],
      hote: { nom: "Marc-André", depuis: 2019, superhote: false },
      chambresDetail: ["1 lit queen", "1 lit double"]
    },
    {
      id: "sommet-dore",
      nom: "Le Sommet Doré",
      region: "charlevoix",
      ville: "Baie-Saint-Paul",
      coords: [47.44, -70.499],
      type: "moderne",
      prixNuit: 245,
      fraisMenage: 110,
      minNuits: 2,
      voyageurs: 6,
      chambres: 3,
      lits: 3,
      sdb: 2,
      pieces: 7,
      superficie: 1500,
      note: 4.93,
      nbAvis: 91,
      vedette: true,
      equipements: ["spa", "foyer", "wifi", "ski", "cuisine", "laveuse", "stationnement", "tele"],
      images: ["1542718610-a1d656d1884c", "1554995207-c18c203602cb", "1505691938895-1758d7feb511", "1586105251261-72a756497a11", "1584622650111-993a426fbf0a", "1506905925346-21bda4d32df4"],
      resume: "Vue panoramique sur le fleuve et les montagnes de Charlevoix, couchers de soleil garantis.",
      description: [
        "Perché sur une colline, le Sommet Doré offre une vue imprenable sur le fleuve Saint-Laurent. Le salon vitré capte la lumière du matin au soir.",
        "À 15 minutes du Massif de Charlevoix et des galeries de Baie-Saint-Paul. Le spa est installé sur la terrasse face au coucher du soleil."
      ],
      hote: { nom: "Julie", depuis: 2018, superhote: true },
      chambresDetail: ["1 lit king", "1 lit queen", "1 lit queen"]
    },
    {
      id: "cabane-des-pins",
      nom: "La Cabane des Pins",
      region: "cantons-de-l-est",
      ville: "Sutton",
      coords: [45.105, -72.616],
      type: "rustique",
      prixNuit: 210,
      fraisMenage: 95,
      minNuits: 2,
      voyageurs: 6,
      chambres: 3,
      lits: 4,
      sdb: 2,
      pieces: 7,
      superficie: 1350,
      note: 4.81,
      nbAvis: 47,
      vedette: false,
      equipements: ["foyer", "ski", "animaux", "wifi", "bbq", "cuisine", "laveuse", "stationnement"],
      images: ["1587061949409-02df41d5e562", "1501685532562-aa6846b14a0e", "1556911220-bff31c812dba", "1586105251261-72a756497a11", "1584622650111-993a426fbf0a"],
      resume: "Chalet en pièce sur pièce, à 5 minutes des pentes du mont Sutton.",
      description: [
        "Construite en pièce sur pièce par un artisan de la région, la Cabane des Pins a tout le charme d'un vrai chalet de montagne : poutres apparentes, poêle à bois et grande table familiale.",
        "Les pistes du mont Sutton sont à 5 minutes, et les vignobles de la route des vins à 20 minutes."
      ],
      hote: { nom: "Philippe", depuis: 2020, superhote: false },
      chambresDetail: ["1 lit queen", "1 lit queen", "2 lits simples"]
    },
    {
      id: "hangar-a-bateaux",
      nom: "Le Hangar à Bateaux",
      region: "cantons-de-l-est",
      ville: "Magog",
      coords: [45.266, -72.146],
      type: "bord-de-l-eau",
      prixNuit: 190,
      fraisMenage: 70,
      minNuits: 2,
      voyageurs: 2,
      chambres: 1,
      lits: 1,
      sdb: 1,
      pieces: 3,
      superficie: 650,
      note: 4.99,
      nbAvis: 152,
      vedette: true,
      equipements: ["lac", "kayak", "wifi", "foyer", "cuisine", "stationnement", "climatisation"],
      images: ["1470770841072-f978cf4d019e", "1482192505345-5655af888cc4", "1505691938895-1758d7feb511", "1502672260266-1c1ef2d93688", "1584622650111-993a426fbf0a"],
      resume: "Ancien hangar à bateaux rénové, sur pilotis au-dessus du lac Memphrémagog.",
      description: [
        "Une escapade romantique unique : ce hangar à bateaux transformé en nid douillet flotte presque sur le lac Memphrémagog. On s'endort au son de l'eau.",
        "Le matin, café sur le quai et tour de kayak avant de découvrir les restos et boutiques de Magog."
      ],
      hote: { nom: "Sophie", depuis: 2016, superhote: true },
      chambresDetail: ["1 lit queen"]
    },
    {
      id: "ermitage-hamac",
      nom: "L'Ermitage",
      region: "laurentides",
      ville: "Val-David",
      coords: [46.03, -74.207],
      type: "rustique",
      prixNuit: 135,
      fraisMenage: 60,
      minNuits: 1,
      voyageurs: 2,
      chambres: 1,
      lits: 1,
      sdb: 1,
      pieces: 3,
      superficie: 520,
      note: 4.78,
      nbAvis: 38,
      vedette: false,
      equipements: ["animaux", "foyer", "bbq", "cuisine", "stationnement"],
      images: ["1499696010180-025ef6e1a8f9", "1513694203232-719a280e022f", "1586105251261-72a756497a11", "1501685532562-aa6846b14a0e", "1441974231531-c6227db76b6e"],
      resume: "Micro-chalet minimaliste avec hamac, au cœur des sentiers du P'tit Train du Nord.",
      description: [
        "L'Ermitage, c'est l'essentiel et rien de plus : une pièce lumineuse, un lit douillet, un hamac entre deux pins et le silence de la forêt.",
        "À deux pas du parc régional de Val-David pour l'escalade et à vélo du P'tit Train du Nord."
      ],
      hote: { nom: "Antoine", depuis: 2021, superhote: false },
      chambresDetail: ["1 lit double"]
    },
    {
      id: "le-triangle",
      nom: "Le Triangle",
      region: "laurentides",
      ville: "Lac-Supérieur",
      coords: [46.205, -74.47],
      type: "chalet-a",
      prixNuit: 195,
      fraisMenage: 90,
      minNuits: 2,
      voyageurs: 5,
      chambres: 2,
      lits: 3,
      sdb: 1,
      pieces: 5,
      superficie: 1050,
      note: 4.89,
      nbAvis: 76,
      vedette: true,
      equipements: ["spa", "foyer", "ski", "wifi", "animaux", "cuisine", "laveuse", "stationnement", "tele"],
      images: ["1595521624992-48a59aef95e3", "1554995207-c18c203602cb", "1505691938895-1758d7feb511", "1556911220-bff31c812dba", "1478131143081-80f7f84ca84d"],
      resume: "Chalet en A au design scandinave, mezzanine et spa à l'orée du parc du Mont-Tremblant.",
      description: [
        "Le Triangle reprend la forme iconique du chalet en A avec une touche scandinave : plafond cathédrale, grande fenestration et mezzanine pour les enfants.",
        "À 12 minutes du versant nord de Tremblant et à l'entrée du parc national. Spa privé et foyer extérieur."
      ],
      hote: { nom: "Camille", depuis: 2019, superhote: true },
      chambresDetail: ["1 lit queen", "1 lit double + 1 lit simple (mezzanine)"]
    },
    {
      id: "maison-rouge",
      nom: "La Maison Rouge",
      region: "gaspesie",
      ville: "Percé",
      coords: [48.524, -64.213],
      type: "bord-de-l-eau",
      prixNuit: 155,
      fraisMenage: 75,
      minNuits: 3,
      voyageurs: 4,
      chambres: 2,
      lits: 2,
      sdb: 1,
      pieces: 5,
      superficie: 980,
      note: 4.84,
      nbAvis: 55,
      vedette: false,
      equipements: ["lac", "wifi", "bbq", "cuisine", "laveuse", "stationnement", "animaux"],
      images: ["1518780664697-55e3ad937233", "1502672260266-1c1ef2d93688", "1586105251261-72a756497a11", "1556911220-bff31c812dba", "1584622650111-993a426fbf0a"],
      resume: "Maison de pêcheur colorée face à la mer, avec vue sur le rocher Percé.",
      description: [
        "Cette ancienne maison de pêcheur a gardé sa couleur rouge emblématique et son âme gaspésienne. Le terrain descend jusqu'à la grève.",
        "Le rocher Percé et l'île Bonaventure sont à quelques minutes. Parfait pour une semaine de vacances sur la côte."
      ],
      hote: { nom: "Gaston", depuis: 2015, superhote: true },
      chambresDetail: ["1 lit queen", "2 lits simples"]
    },
    {
      id: "domaine-boreal",
      nom: "Le Domaine Boréal",
      region: "laurentides",
      ville: "Saint-Sauveur",
      coords: [45.896, -74.17],
      type: "moderne",
      prixNuit: 595,
      fraisMenage: 250,
      minNuits: 2,
      voyageurs: 10,
      chambres: 5,
      lits: 6,
      sdb: 4,
      pieces: 12,
      superficie: 3800,
      note: 4.95,
      nbAvis: 87,
      vedette: true,
      equipements: ["spa", "piscine", "foyer", "wifi", "ski", "bbq", "laveuse", "climatisation", "borne", "cuisine", "stationnement", "tele"],
      images: ["1600585154340-be6161a56a0c", "1554995207-c18c203602cb", "1556020685-ae41abfc9365", "1556911220-bff31c812dba", "1505691938895-1758d7feb511", "1584622650111-993a426fbf0a"],
      resume: "Résidence contemporaine haut de gamme pour les grandes familles et les groupes d'amis.",
      description: [
        "Architecture contemporaine, matériaux nobles et volumes généreux : le Domaine Boréal est pensé pour réunir jusqu'à dix personnes dans le confort.",
        "Piscine chauffée l'été, spa toute l'année, salle de cinéma et cuisine de chef. Les pentes de Saint-Sauveur sont à 3 minutes."
      ],
      hote: { nom: "Nathalie", depuis: 2018, superhote: true },
      chambresDetail: ["1 lit king", "1 lit king", "1 lit queen", "1 lit queen", "2 lits simples"]
    },
    {
      id: "manoir-du-lac",
      nom: "Le Manoir du Lac",
      region: "cantons-de-l-est",
      ville: "North Hatley",
      coords: [45.283, -71.975],
      type: "domaine",
      prixNuit: 650,
      fraisMenage: 275,
      minNuits: 3,
      voyageurs: 12,
      chambres: 6,
      lits: 7,
      sdb: 4,
      pieces: 14,
      superficie: 4500,
      note: 4.9,
      nbAvis: 42,
      vedette: false,
      equipements: ["lac", "foyer", "wifi", "kayak", "bbq", "laveuse", "cuisine", "stationnement", "tele", "climatisation"],
      images: ["1464146072230-91cabc968266", "1501685532562-aa6846b14a0e", "1554995207-c18c203602cb", "1556911220-bff31c812dba", "1586105251261-72a756497a11", "1505691938895-1758d7feb511"],
      resume: "Manoir de pierre centenaire au bord du lac Massawippi, pour les réunions de famille.",
      description: [
        "Ce manoir de pierre de 1910 surplombe le lac Massawippi. Six chambres, deux salons avec foyer et une grande salle à manger pour douze convives.",
        "Le village de North Hatley, ses restaurants et ses antiquaires sont à 5 minutes à pied. Quai privé avec canot et kayaks."
      ],
      hote: { nom: "Robert", depuis: 2017, superhote: false },
      chambresDetail: ["1 lit king", "1 lit queen", "1 lit queen", "1 lit queen", "1 lit double", "2 lits simples"]
    }
  ];

  const REVIEWS = [
    { nom: "Émilie", date: "septembre 2026", texte: "Endroit magique, encore plus beau qu'en photo. Tout était impeccable et l'hôte très attentionné. On revient l'an prochain, c'est certain !" },
    { nom: "Jean-François", date: "août 2026", texte: "Parfait pour notre réunion de famille. Beaucoup d'espace, cuisine bien équipée et les enfants ont adoré. Le spa le soir, wow." },
    { nom: "Karine", date: "juillet 2026", texte: "Très propre et confortable. Le lit était super. Petit bémol : le chemin d'accès est un peu cahoteux, mais rien de grave." },
    { nom: "David", date: "juin 2026", texte: "Accueil chaleureux, instructions claires et chalet très bien entretenu. Le coin est tranquille, exactement ce qu'on cherchait." },
    { nom: "Mélanie", date: "mars 2026", texte: "Notre troisième séjour ici et toujours aussi bien. Le foyer, la vue, le calme... on recharge vraiment les batteries." },
    { nom: "Olivier", date: "février 2026", texte: "Proximité des pistes idéale. Après la journée de ski, le spa était parfait. Communication rapide avec l'hôte." }
  ];

  return { REGIONS, AMENITIES, TYPES, CHALETS, REVIEWS };
})();
