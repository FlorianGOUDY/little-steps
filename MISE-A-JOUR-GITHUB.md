# Installer la version 2 dans ton dépôt

1. Décompresser `little-steps-v2-source.zip` sur ton ordinateur.
2. Dans ton Codespace, importer le contenu du dossier décompressé à la racine du projet existant. Remplacer les fichiers de l’ancienne version lorsqu’ils ont le même nom. Ne pas ajouter un dossier parent `little-steps-v2-source` et ne pas toucher au dossier `.git`.
3. Vérifier notamment la présence de :
   - `public/bank-extra.js`, `public/vocabulary.js`, `public/vocabulary.csv`, `public/vocabulary-anki.tsv`, `public/extras-ui.js` et `public/community-data.js` ;
   - les versions à jour de `public/index.html`, `public/app.js`, `public/style.css` et `public/sw.js` ;
   - les dossiers `scripts` et `content` ;
   - les workflows `.github/workflows/refresh-content.yml` et `.github/workflows/approve-content.yml` en plus de `pages.yml`.
4. Depuis Contrôle de code source : ajouter les fichiers, mettre un message « Ajout du sujet 2, du vocabulaire et des ressources », puis Commit et Push / Synchroniser.

Pour publier l’application, régler Settings > Pages > Source sur GitHub Actions. Cela ne constitue pas une protection par mot de passe : vérifier la visibilité réelle du site. Aucun changement de visibilité n’est demandé par les fichiers fournis.

Pour l’enrichissement gratuit, lire AUTOMATISATION.md. Le job du lundi propose des phrases à relire. Tu peux aussi le lancer manuellement depuis Actions > Proposer des ressources anglaises > Run workflow. Il faut autoriser Actions à créer des pull requests si cette fonction est souhaitée. Aucun sujet complet n’est généré automatiquement.

Pour télécharger simplement le vocabulaire, aucune mise en ligne n’est nécessaire : ouvrir `public/vocabulary.csv` dans Excel ou importer `public/vocabulary-anki.tsv` dans Anki.
