# Solution Nautique – site commercial (loueurs de bateaux)

Site de présentation de l'offre unique « site vitrine + gestion de location de bateaux » : 50 € HT/mois, sans frais d'installation, nom de domaine à la charge du client. Référence : JJ Location Bateaux (Marseille).

Site statique (HTML, CSS, JS sans dépendance) publié sur GitHub Pages depuis la branche `main`.

| Fichier | Rôle |
| --- | --- |
| `index.html` | Page unique : hero, parcours, localisation par téléphone (A/B/C), site vitrine, dashboard en 7 onglets, parcours client, feuille de route, référence JJ, tarif, démarrage, FAQ, contact |
| `styles.css` | Palette marine (`--brand: #0a6f8f`, turquoise `#62cfe0` sur fond sombre) |
| `script.js` | Menu mobile, galerie, onglets, agrandissement des captures, formulaire de contact (`mailto:`) |
| `assets/img/` | Captures réelles : site JJ et carte en mer (en ligne, GPS simulé) ; dashboard JJ servi en local avec une API simulée (données fictives) |

## Ce qui est présenté comme disponible ou à venir

Vérifié dans le code de `locationMarseille` (octobre 2026) :

- **Disponible** : réservation en ligne sans double réservation, carte officielle et alertes, temps de retour par la mer, suivi GPS Android écran éteint, onglet « En mer » (âge de la position affiché), validation documents / caution / paiement, carburant au retour, CA et export CSV, zones et port, rôles.
- **Bientôt / évolution** : bouton « Me localiser » avec itinéraire intégré, lien de localisation envoyé par l'équipe, état des lieux photo + signature, traceur GPS à bord, alertes de zone côté équipe, notifications et rapports automatiques.

## À compléter avant diffusion

- **Adresse de contact** : constante `CONTACT_EMAIL` en tête de `script.js`.
- **Mentions légales** de l'éditeur du site.
- Modalités de l'application Android, nombre d'utilisateurs, assistance et sauvegardes : à reprendre des conditions contractuelles définitives (la FAQ y renvoie sans inventer de limite).
