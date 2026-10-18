# MonChalet

Plateforme de location de chalets au Québec : les propriétaires publient leur chalet, les vacanciers cherchent et réservent.

> État actuel : **prototype front-end statique** (HTML / CSS / JavaScript, sans framework). Le backend viendra plus tard.

## Pages

| Page | Fichier | Contenu |
| --- | --- | --- |
| Accueil | `index.html` | Héros avec recherche (région, dates, voyageurs), catégories rapides, chalets en vedette, régions, « comment ça marche », bandeau propriétaires |
| Sélection | `chalets.html` | Recherche et filtres (mots-clés, prix max, chambres, salles de bain, pièces, type, équipements, favoris), tri, étiquettes de filtres actifs. Les filtres sont gardés dans l'URL |
| Détail | `chalet.html?id=…` | Galerie avec visionneuse, caractéristiques (voyageurs, chambres, lits, salles de bain, pièces, superficie), description, chambres, équipements, carte, avis, règlement, calcul du prix (ménage, frais de service, TPS + TVQ) et demande de réservation (démo) |

## Structure

```
assets/
  css/style.css      Styles communs
  img/logo.svg       Logo complet (icône + texte)
  img/logo-icon.svg  Icône seule (favicon, en-tête)
  js/data.js         Données de démonstration (chalets, régions, équipements, avis)
  js/common.js       En-tête, pied de page, cartes, icônes, favoris, utilitaires
  js/listing.js      Logique de la page de sélection
  js/detail.js       Logique de la page de détail
```

Les favoris sont stockés dans le `localStorage` du navigateur en attendant le backend.
Les photos sont des images [Unsplash](https://unsplash.com) servies directement depuis leur CDN, comme images temporaires.

## Lancer en local

```bash
python -m http.server 5180
```

Puis ouvrir http://localhost:5180.

## Pour le backend (plus tard)

- Remplacer `assets/js/data.js` par des appels à une API (liste, détail, disponibilités).
- Brancher la demande de réservation (`TODO backend` dans `assets/js/detail.js`).
- Comptes voyageurs / propriétaires, favoris côté serveur, espace propriétaire.
