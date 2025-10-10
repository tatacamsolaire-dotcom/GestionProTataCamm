
Tata Camm Solaire - Offline PWA (3 pages)
-----------------------------------------

Fichiers inclus:
- index.html         -> interface (3 pages: splash, ajout, tableau)
- app.js             -> logique de l'application (sauvegarde en localStorage)
- service-worker.js  -> cache pour offline
- manifest.json      -> PWA manifest (icônes)
- logo.png           -> placeholder, remplace par ton logo si besoin

Installation rapide (sur GitHub depuis téléphone):
1) Ouvre ton dépôt (ou crée un nouveau dépôt) et uploade tous ces fichiers à la racine.
2) Active GitHub Pages (Settings -> Pages -> Branch: main, Folder: / (root)).
3) Attends 1-2 minutes et ouvre le lien GitHub Pages.
4) Pour créer un APK: va sur https://www.pwabuilder.com, colle l'URL GitHub Pages et suis l'assistant pour générer l'APK.
5) Installer l'APK sur ton téléphone (autoriser installations depuis sources inconnues).

Notes:
- Toutes les données de ventes sont stockées localement sur ton téléphone (localStorage).
- L'option "Effacer" supprime l'historique local.
- Pour utiliser ton propre logo, remplace logo.png (même nom) dans le dépôt.
