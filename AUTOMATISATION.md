# Enrichissement gratuit et validation

## Ce qui est livré dans la version 2

- Deux sujets de 200 questions, soit 400 questions originales. Chaque sujet suit la répartition 6 / 25 / 39 / 30 / 30 / 16 / 54. Le deuxième a 13 nouvelles conversations, 10 nouvelles annonces, 30 nouvelles phrases de grammaire, 4 nouveaux textes à trous et 15 nouveaux ensembles de lecture. Les six photographies sont communes, avec de nouveaux énoncés : ce ne sont pas douze photos différentes.
- 120 mots et expressions d’anglais professionnel, traduction française et exemple rédigés pour ce projet. Pas de prétention à une liste officielle ETS. Téléchargements CSV et Anki TSV depuis l’application.
- Six dictées issues de Tatoeba dont la grammaire, la pertinence et les métadonnées de licence ont été revues dans cette session par Codex. Ce n’est pas une validation par un professeur. Chaque phrase conserve auteur, lien et licence CC BY 2.0 FR. Le texte est inchangé. La lecture synthétique ne redistribue aucun enregistrement Tatoeba.
- Une première collecte réelle de 24 candidats a été effectuée. Six sont activés, dix-huit restent dans `content/pending.json`, sans apparaître dans l’application. Certaines phrases écartées peuvent être familières, peu pertinentes ou présenter des affirmations à vérifier : c’est précisément la raison de la relecture.

## Fonctionnement sur GitHub

Le fichier `.github/workflows/refresh-content.yml` collecte des phrases via l’API publique Tatoeba chaque lundi à 06:17 UTC, soit 07:17 à Paris en hiver et 08:17 en été. GitHub peut décaler une exécution ; ce n’est pas un service à heure garantie. Le workflow doit être sur la branche par défaut et GitHub Actions activé. Les plannings peuvent être désactivés par GitHub après une période d’inactivité sur un dépôt public.

Il utilise le jeton temporaire standard `GITHUB_TOKEN` du job, sans clé personnelle ni API d’IA payante. Aucun secret ne doit être placé dans les fichiers publics. Les limites et conditions de gratuité de GitHub restent celles du compte.

Étapes :
1. Collecte bornée : trois recherches, quinze résultats maximum chacune, délai réseau limité, absence de pagination infinie. Licences acceptées : CC0 1.0 et CC BY 2.0 FR seulement. Les phrases signalées, sans auteur ou dont les métadonnées sont incomplètes sont rejetées.
2. Déduplication par identifiant et exclusion des éléments déjà revus. Les erreurs réseau interrompent le job sans remplacer le catalogue existant.
3. Tests et dépôt d’un artefact `ressources-a-verifier`, téléchargeable dans Actions pendant 30 jours.
4. Proposition par pull request dans une nouvelle branche `automation/content-review-…`. Le script ne pousse jamais directement sur la branche principale et n’active aucun auto-merge. S’il existe déjà une proposition ouverte, il la préserve ; les nouveautés restent dans l’artefact du job. Aucun historique ni branche existante n’est réécrit.

La création d’une pull request par Actions doit être autorisée dans Settings > Actions > General > Workflow permissions > Allow GitHub Actions to create and approve pull requests. Si une politique du compte l’interdit, le job peut échouer à cette dernière étape ; l’artefact reste disponible. Le script ne crée pas de clé d’accès persistante.

## Valider les ajouts

1. Lire la pull request, les phrases proposées et leurs liens source. Vérifier pertinence, niveau, grammaire, attribution et licence sur la source. Une licence déclarée automatiquement n’est pas une garantie absolue sur l’origine.
2. Fusionner la proposition pour conserver les candidats dans le dépôt. **Cette fusion seule n’active aucune nouvelle dictée dans l’application.**
3. Sans terminal : ouvrir Actions > **Valider des dictees choisies** > Run workflow. Saisir les identifiants relus, séparés par des virgules, puis cocher la confirmation de relecture. Le workflow prépare une deuxième pull request contenant uniquement les dictées approuvées et leurs métadonnées. Relire puis fusionner cette proposition d’activation pour les publier. Le pseudonyme GitHub du relecteur est conservé. Il n’y a ni auto-merge ni modification directe de la branche principale.

Autre possibilité, dans un terminal Codespaces à la racine du projet, approuver uniquement les identifiants effectivement relus :

```sh
node scripts/review-content.mjs --ids tatoeba-IDENTIFIANT --reviewer TON_PSEUDO --confirm-reviewed
node tests.mjs
node scripts/test-content.mjs
```

Pour plusieurs phrases, séparer les identifiants par des virgules. Le nom du relecteur sera stocké dans l’historique et les données publiques : choisir un pseudonyme si souhaité.

4. Si la validation a été faite dans le terminal, committer ensemble `content/approved.json`, `content/reviewed-ids.json`, `content/pending.json` et `public/community-data.js`, puis pousser. Le workflow Pages publiera les dictées validées si Pages est configuré. Avec le workflow manuel, cette étape est remplacée par la fusion de sa proposition d’activation.

Le script d’approbation est volontairement séparé du collecteur. Il ne doit pas être ajouté au workflow hebdomadaire. Les phrases restantes attendent une nouvelle revue. Pour refuser définitivement une phrase, ajouter son identifiant dans `content/reviewed-ids.json` et la retirer de pending.json ; elle ne sera plus proposée.

Les dictées approuvées sont rechargées depuis l’hébergement lors d’une nouvelle visite en ligne, avec une copie de secours hors connexion. Il n’est pas nécessaire de renommer le cache pour chaque ajout de dictée. Les autres changements de code restent soumis à la mise à jour du cache décrite dans README.md.

Un appel local au collecteur est possible avec `node scripts/collect-content.mjs`. Il ne publie rien et ne demande aucune clé. `node scripts/propose-content.mjs` est destiné au job GitHub, pas à une page web.

## Ce que cette automatisation ne fait pas

Elle enrichit les **dictées**, pas les sujets complets. Il n’existe pas ici de promesse d’un nouveau sujet de 200 questions par semaine. Produire de nouveaux examens avec distracteurs non ambigus, dialogue cohérent, difficulté étalonnée et médias adaptés demande un travail de rédaction et de vérification. Aucune API d’IA payante, récupération d’annales ou import massif non autorisé n’est configuré.

Les liens VOA et ETS sont complémentaires. VOA autorise la réutilisation de ses propres productions, mais exclut les médias d’agences tierces ; l’application ouvre donc ces ressources sur leur site, sans aspirer leurs pages ou fichiers. Les enregistrements Tatoeba ont des licences distinctes du texte ; aucun n’est téléchargé. Wikimedia Commons permet une recherche de médias avec licences individuelles, mais n’est pas aspiré ici : il faudrait vérifier auteur, licence, attribution et éventuels autres droits pour chaque photo avant intégration.

## Mise à jour de ton dépôt actuel

Importer le contenu du nouveau ZIP source **à la racine du dépôt existant**, sans ajouter un dossier parent et sans toucher à `.git`. Ajouter les nouveaux dossiers `scripts` et `content`, le workflow `refresh-content.yml` et les nouveaux fichiers de `public`, puis enregistrer un commit. Le ZIP d’hébergement ne contient que `public` : il ne suffit pas pour l’automatisation GitHub.

Dans GitHub Pages, choisir GitHub Actions comme source de publication. Aucun changement de visibilité du dépôt ni déploiement distant n’a été effectué pendant cette mise à jour locale.

## Sources vérifiées le 30 octobre 2026

- API et métadonnées : https://api.tatoeba.org/openapi.json
- Licence des textes et séparation des droits audio : https://en.wiki.tatoeba.org/articles/show/using-the-tatoeba-corpus
- Conditions VOA : https://learningenglish.voanews.com/p/6861.html et https://learningenglish.voanews.com/p/6021.html
- Déclenchement des workflows : https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow

Les précautions de marque et les limites pédagogiques décrites dans RECHERCHE-ET-DROITS.md restent applicables. Un déploiement public ne rend pas les exercices officiels ou certifiants.
