# Little Steps

Application indépendante pour travailler la compréhension anglaise, avec une préparation au test TOEIC® Listening & Reading classique. Version locale préparée le 30 octobre 2026. Aucun déploiement ni changement de ton site OVH n’a été effectué.

## Ce qui est inclus

- 200 questions originales, corrigées en français, réparties 6 / 25 / 39 / 30 / 30 / 16 / 54.
- 6 photographies de scènes fictives générées par IA, vérifiées par rapport aux réponses.
- 54 documents audio lus à la demande : 6 photos, 25 questions-réponses, 13 conversations et 10 annonces. Les dialogues alternent les voix anglaises disponibles sur l’appareil.
- Listening et Reading chronométrés, simulation complète 45 + 75 minutes, diagnostic court, séances par partie, révision des erreurs.
- Textes à trous, insertion de phrases, documents simples, doubles et triples, un horaire à croiser avec un dialogue.
- Sauvegarde et reprise locale, profil, objectif quotidien, historique, export et import JSON.
- Interface responsive, installation sur l’écran d’accueil, cache hors connexion après chargement initial en HTTPS.

## Limites pédagogiques importantes

Un seul sujet original de 200 questions : les différents modes réutilisent cette banque. Ce ne sont ni des annales ni un sujet officiel. La difficulté n’est pas étalonnée. Certains documents sont plus courts et simples que ceux du vrai test. Les photos sont synthétiques. Il ne faut pas traiter le résultat comme une prédiction de score ; aucun score artificiel sur 990 n’est affiché.

La simulation respecte les effectifs par partie et les deux enveloppes de temps, mais pas la cadence d’un enregistrement officiel. Chaque document Listening est lancé manuellement, une fois par groupe en simulation ; les trois questions d’un dialogue ou d’une annonce partagent le document. Les questions des parties 3 et 4 sont affichées mais ne sont pas toutes lues automatiquement. Pas de reproduction de l’algorithme adaptatif, pas de Speaking & Writing.

La voix vient de l’API `speechSynthesis` du navigateur, pas d’un fichier audio ETS ni d’un service payant. La disponibilité, l’accent et la qualité dépendent des voix installées. Sur iPhone, installer une voix anglaise dans Réglages > Accessibilité > Contenu énoncé / Lire et énoncer > Voix si nécessaire (libellé selon version iOS). Une voix système peut dépendre du réseau. Un test sur le véritable iPhone reste nécessaire ; la vérification locale ne remplace pas un essai dans Safari iOS. Aucun micro n’est utilisé et aucune voix réelle n’est clonée.

## Lancer la démo sur cet ordinateur

Avec Node.js installé :

```powershell
cd C:\Users\fgoudy\Documents\Site\toeic-companion
node tests.mjs
node server.mjs
```

Ouvrir http://127.0.0.1:4173. L’adresse localhost fonctionne sur cet ordinateur uniquement. Pour l’iPhone, utiliser l’adresse HTTPS de l’hébergement. Ne pas simplement ouvrir index.html par double-clic : le service worker nécessite HTTP local ou HTTPS.

## Option recommandée : GitHub Pages public, indépendant d’OVH

1. Créer un dépôt nommé `little-steps` (sans marque ETS dans le nom ou le domaine). Un dépôt public est le chemin simple avec GitHub Free.
2. Envoyer le contenu de ce dossier à la racine du dépôt, en incluant `.github/workflows/pages.yml`. Ne pas envoyer le dossier parent Site, qui contient d’autres projets.
3. Dans Settings > Pages > Build and deployment > Source, choisir GitHub Actions.
4. La branche `main` déclenche les vérifications et le déploiement. Le premier workflow peut être lancé manuellement depuis Actions si nécessaire.
5. Ouvrir l’URL indiquée par Pages, typiquement `https://COMPTE.github.io/little-steps/`.

Les chemins sont relatifs : un sous-dossier Pages est pris en charge. Aucun package à télécharger pour l’application elle-même. Les actions du workflow sont les actions officielles GitHub. Pour une politique renforcée de chaîne logicielle, épingler leurs versions à des SHA contrôlés.

Un dépôt privé ne garantit pas un site privé. Avec un dépôt privé, vérifier le forfait et les capacités Pages du compte. Le site gratuit habituel reste public. `noindex` et l’absence de lien depuis ton site principal évitent de le promouvoir ; ce n’est pas un contrôle d’accès.

## Option privée : GitLab Pages

Créer un projet privé, importer uniquement ce dossier avec `.gitlab-ci.yml`, puis régler Settings > General > Visibility, project features, permissions > Pages sur **Only Project Members**. Inviter ta copine avec les droits nécessaires. Elle devra se connecter à GitLab. Contrôler le réglage Pages lui-même, indépendamment de la visibilité du dépôt. Les pipelines Pages demandent des ressources CI et suivent les limites du compte. L’installation ou le cache hors connexion peuvent être moins fluides derrière l’authentification.

## Option OVH

Le ZIP `little-steps-ovh.zip` contient uniquement les fichiers publics. Décompresser dans un nouveau dossier réservé à l’application (par exemple `little-steps`, jamais à la place de la racine actuelle). Dans le Multisite OVH, un sous-domaine `anglais.TON-DOMAINE.fr` peut pointer sur ce dossier, avec HTTPS activé. Ne pas modifier le dossier racine du site principal.

Un sous-domaine crée une origine différente dans le navigateur, contrairement à un simple sous-dossier ; un hébergement Pages séparé isole aussi les fichiers d’hébergement. Un sous-domaine reste toutefois sur le même compte OVH et ne constitue pas une isolation totale de l’hébergement. Si un accès privé est souhaité sur OVH, configurer une authentification côté serveur sur le dossier dédié. Ne pas ajouter un simple mot de passe en JavaScript : tous les fichiers resteraient téléchargeables.

Pas de PHP, base de données, secret ou accès au serveur nécessaire à l’application. Aucun fichier d’authentification prêt à l’emploi n’est fourni : il dépend du chemin absolu et de la configuration OVH, et ne doit jamais contenir un vrai mot de passe dans le dépôt.

## Installation iPhone

Ouvrir l’URL HTTPS dans Safari > Partager > Sur l’écran d’accueil. Garder la première visite en ligne jusqu’au chargement des fichiers. Le service worker ne couvre que le dossier de cette application. Il ne supprime que ses propres caches préfixés `little-steps-`. Pour publier une mise à jour, modifier le nom CACHE dans `public/sw.js`.

Les données restent dans le stockage local du navigateur utilisé. Exporter régulièrement depuis les réglages, particulièrement avant une suppression de l’application ou de données Safari. Le mode installé et Safari peuvent gérer le stockage différemment selon iOS : importer la sauvegarde si nécessaire. Aucun serveur de synchronisation, cookie publicitaire ou télémétrie applicative.

## Droits et sources

Lire [RECHERCHE-ET-DROITS.md](RECHERCHE-ET-DROITS.md). Aucun contenu officiel ETS n’est redistribué. Le nom de produit est Little Steps. Les mentions de la marque dans les explications ne signifient pas un partenariat. Une revue juridique ou une autorisation de marque n’a pas été obtenue ; les règles ETS sur la revue préalable sont documentées avant toute diffusion publique.

TOEIC® is a registered trademark of ETS. This product is not endorsed or approved by ETS.
TOEIC® est une marque déposée d’ETS. Ce produit n’est ni approuvé ni agréé par ETS.
