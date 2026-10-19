<!-- encrine:debut -->
<!-- Écrit par scripts/classe.py generer, depuis classe.yml : ne pas retoucher à la main.
     Le reste du fichier, sous le bloc, est à vous. -->

# À la découverte de la faune et de la flore

**La classe d’Aurélie** · Grande Section · 2026-2027 · zone C

Un milieu par période, de la ville à la mer. Tout le matériel de l’année est ici : le projet, la programmation, les progressions de chaque domaine, les évaluations, et les cahiers à imprimer pour la classe.

**[Voir le site de la classe](https://auregendreau.github.io/faune-et-flore/)**

Vous reprenez cette classe ? **[Prendre en main la classe](PRISE-EN-MAIN.md)** : ce qu’elle est, le premier lancement, ce qu’on peut demander, ce qui est protégé.

<p><a href="https://encrine.ai"><picture><source media="(prefers-color-scheme: dark)" srcset="https://encrine.ai/assets/logo-encrine-craie.svg"><img src="https://encrine.ai/assets/logo-encrine.svg" alt="Encrine" height="32" align="absmiddle"></picture></a>&nbsp; Conçu avec <a href="https://encrine.ai">Encrine</a>, le moteur qui fabrique l’année d’une classe.</p>

---
<!-- encrine:fin -->

## Le projet annuel

Ce dépôt contient l'ensemble du matériel de préparation pour une classe de **Grande Section de maternelle** pour l'année scolaire **2026-2027**, conforme au **programme du cycle 1 (2024-2026, BO n°19 du 7 mai 2026 et BO n°41 du 31 octobre 2024)**, y compris le programme d'**éducation à la vie affective et relationnelle (EVAR)**.

L'année est organisée autour de cinq milieux, un par période :

| Période | Thème | Dates indicatives |
|---|---|---|
| **Période 1** | 🏙️ La ville | 1er septembre → 16 octobre 2026 (7 semaines) |
| **Période 2** | 🌳 La forêt | 2 novembre → 18 décembre 2026 (7 semaines) |
| **Période 3** | ⛰️ La montagne | 4 janvier → 5 février 2027 (5 semaines) |
| **Période 4** | 🌾 La campagne | 22 février → 2 avril 2027 (6 semaines) |
| **Période 5** | 🌊 La mer | 19 avril → 2 juillet 2027 (11 semaines) |

## Calendrier de la classe : zone C

La classe est en **zone C** : le site et tous les PDF — progressions, évaluations, extraits par période — portent ses dates. Les dates proviennent du jeu de données officiel [fr-en-calendrier-scolaire](https://data.education.gouv.fr/explore/dataset/fr-en-calendrier-scolaire/) (open data du ministère).

| Vacances 2026-2027 | Zone C |
|---|---|
| Toussaint | 17 oct. → 1er nov. 2026 |
| Noël | 19 déc. 2026 → 3 janv. 2027 |
| Hiver | 6 févr. → 21 févr. 2027 |
| Printemps | 3 avr. → 18 avr. 2027 |
| Pont de l’Ascension | 6 → 9 mai 2027 |
| Été | à partir du 3 juillet 2027 |

## Contenu du dépôt

### 1. Pilotage de l'année
- [`01-projet-annuel.md`](01-projet-annuel.md) — présentation du projet, fils rouges, sorties, corpus de vocabulaire (3 par période), bibliographie d'albums, chants et œuvres par période.
- [`02-programmation-annuelle.md`](02-programmation-annuelle.md) — **programmation** synthétique : tous les domaines × les 5 périodes (le « quoi, quand »).

### 2. Progressions par domaine (le « comment, dans quel ordre »)
- [`03-progressions/01-langage-oral-ecrit.md`](03-progressions/01-langage-oral-ecrit.md) — développement et structuration du langage oral et écrit.
- [`03-progressions/02-mathematiques.md`](03-progressions/02-mathematiques.md) — acquisition des premiers outils mathématiques.
- [`03-progressions/03-activites-physiques.md`](03-progressions/03-activites-physiques.md) — agir, s'exprimer, comprendre à travers les activités physiques.
- [`03-progressions/04-activites-artistiques.md`](03-progressions/04-activites-artistiques.md) — agir, s'exprimer, comprendre à travers les activités artistiques.
- [`03-progressions/05-temps-espace.md`](03-progressions/05-temps-espace.md) — se repérer dans le temps et l'espace.
- [`03-progressions/06-monde-vivant-matiere-objets.md`](03-progressions/06-monde-vivant-matiere-objets.md) — découvrir le monde du vivant, de la matière et des objets.
- [`03-progressions/07-evar.md`](03-progressions/07-evar.md) — éducation à la vie affective et relationnelle (3 séances spécifiques obligatoires).

### 3. Site en ligne, fiches élève et PDF
- `site/` — l'application web (navigation, calendrier de la zone C, téléchargement des PDF).
- `site/fiches/` — les **fiches élève** imprimables (une page A4 par fiche, consigne donnée à l'oral par l'enseignante), un cahier par période.
- `site/imagier/` — l'**imagier Montessori faune et flore** (voir ci-dessous), un cahier de cartes par période.
- `site/cartes-corpus/` — les **cartes-corpus de vocabulaire** (voir ci-dessous), un cahier par période.
- `scripts/generer-pdf.sh` — génération automatique, à chaque déploiement, de tous les PDF : chaque document et ses extraits par période (`pdf/<document>.pdf`, aux dates de la zone C) + les 5 cahiers de fiches d'entraînement (`pdf/fiches-entrainement-periode-N.pdf`) + les 5 cahiers de fiches d'évaluation (`pdf/fiches-eleve-periode-N.pdf`) + les 5 imagiers (`pdf/imagier-periode-N.pdf`) + les 5 cahiers de cartes-corpus (`pdf/cartes-corpus-periode-N.pdf`).

### 4. Imagier Montessori « faune et flore » (cartes de nomenclature)

Un cahier de cartes **par période**, en lien avec le milieu étudié : **18 espèces de faune et 18 espèces de flore** de ce milieu — arbres, arbustes, fleurs, fougères, mousses, algues ou cultures selon le paysage —, illustrées par de **vraies photographies** en haute définition (1100 × 753 px, soit environ 300 dpi à la taille des cartes). Chaque cahier contient trois séries à découper et à plastifier :

| Série | Contenu | Usage |
|---|---|---|
| **Cartes de contrôle** | photographie **+ nom en script** | modèle et **autocorrection** |
| **Cartes-photos** | la même photographie, emplacement du nom vide | leçon en trois temps, tri, langage |
| **Étiquettes-mots** | le nom seul, en script | **travail de lecture** : associer le mot à la photo |

Les cartes sont jointives sur la page : un seul coup de massicot sépare deux cartes. Un filet de couleur et une mention discrète (« P2 · faune ») permettent de reclasser une carte égarée. Le mode d'emploi (première page de chaque cahier) détaille la préparation du matériel, la leçon en trois temps, le travail de lecture en autocorrection et les prolongements.

Les photographies proviennent d'**iNaturalist** : ce sont des observations de **qualité recherche**, dont l'espèce a été confirmée par plusieurs naturalistes, sous licence libre (CC0, CC BY ou CC BY-SA). Chacune a été **choisie à la main** selon cinq règles : un seul individu, une image convenant à des enfants de cinq ans, l'animal entier vu de face ou de profil, une image qui remplit la carte sans bande blanche, et rien d'autre autour du sujet. Les auteurs sont crédités en dernière page de chaque cahier.

- `classe/imagier.py` — la liste des 180 espèces (slug, nom écrit sur l'étiquette, nom scientifique) et, pour chacune, la photographie retenue.
- `scripts/chercher-images-imagier.py` — moisson des photographies sur **iNaturalist**, recadrage au format des cartes, relevé de l'auteur et de la licence.
- `scripts/generer-imagier.py` — génération des planches `site/imagier/periode-N.html`.
- `scripts/candidats-imagier.py` — planches de candidats, pour choisir soi-même la photographie de chaque espèce ; `scripts/zoom-imagier.py` les rappelle en grand pour départager deux clichés proches, `scripts/revoir-imagier.py` assemble les cartes d'une période telles qu'elles s'imprimeront.
- `scripts/verifier-imagier.py` — contrôle avant publication : l'espèce de chaque photographie (la recherche par nom vernaculaire avait fait entrer un blaireau d'Amérique pour « le blaireau »), la présence de l'auteur et de la licence, et le cadrage qui doit remplir la carte.

Les règles de fabrication — d'où viennent les images, comment on les choisit, et pourquoi Wikimedia Commons n'est pas utilisable ici — sont consignées dans [`AGENTS.md`](AGENTS.md), et la procédure complète de sélection dans le skill [`imagier-photos`](.agents/skills/imagier-photos/SKILL.md).

### 5. Cartes-corpus de vocabulaire

L'imagier photographie des **espèces** ; les cartes-corpus portent les **mots**. Un cahier par période reprend tous les noms des trois corpus de vocabulaire de [`01-projet-annuel.md`](01-projet-annuel.md) — le milieu, la faune, la flore — dans les mêmes trois séries que l'imagier : cartes de contrôle (image + mot), cartes-images, étiquettes-mots. Chaque cahier se termine par les **étiquettes de tri**, c'est-à-dire les « boîtes-catégories » que la fiche d'évaluation X.1 demande de préparer.

Ils existent parce que les fiches X.1 (vocabulaire) et X.3 (phonologie) réclamaient « 12 cartes-images des corpus » que rien ne fabriquait.

Les **verbes et les adjectifs** des corpus (*traverser*, *hiberner*, *rugueux*…) n'ont volontairement pas de carte : une image les ambiguïse plus qu'elle ne les enseigne, et ils s'évaluent dans le réemploi, comme le demandent les critères des fiches X.1.

Les images ont deux provenances, et **aucune n'est dessinée ici** : quand le mot est une espèce déjà photographiée, la carte pointe vers la photographie de l'imagier sans la recopier ; sinon elle prend un **pictogramme de la banque partagée** `site/fiches/img/`, celle des fiches élève — Mulberry Symbols d'abord, ARASAAC ensuite, et une photographie Openverse pour les six notions qu'aucune banque de pictogrammes ne rend (la clairière, le sous-bois, le pelage, le givre, la marée, la dune).

- `classe/corpus.py` — la liste des cartes, période par période et corpus par corpus, avec la provenance de chaque image.
- `scripts/generer-cartes-corpus.py` — génération des planches `site/cartes-corpus/periode-N.html`.
- `scripts/verifier-cartes-corpus.py` — contrôle avant publication : chaque nom des corpus a sa carte, les images existent, les crédits sont complets, deux cartes ne portent pas les mêmes octets, les pages sont à jour.
- `scripts/revoir-cartes-corpus.py` — le cahier tel qu'il s'imprimera, avec le contrôle de pagination.

Le choix des images ne se fait pas dans ces scripts : il relève du skill [`fiches-illustrations`](.agents/skills/fiches-illustrations/SKILL.md), outillé par `scripts/chercher-pictos.py`. La procédure propre aux cahiers est dans le skill [`cartes-corpus`](.agents/skills/cartes-corpus/SKILL.md).

### 6. Fiches d'évaluation (une batterie par période, adaptée au thème)
- [`04-evaluations/00-mode-emploi-et-livret-de-suivi.md`](04-evaluations/00-mode-emploi-et-livret-de-suivi.md) — principes d'évaluation positive, codage, grille de suivi annuelle.
- [`04-evaluations/periode-1-ville.md`](04-evaluations/periode-1-ville.md)
- [`04-evaluations/periode-2-foret.md`](04-evaluations/periode-2-foret.md)
- [`04-evaluations/periode-3-montagne.md`](04-evaluations/periode-3-montagne.md)
- [`04-evaluations/periode-4-campagne.md`](04-evaluations/periode-4-campagne.md)
- [`04-evaluations/periode-5-mer.md`](04-evaluations/periode-5-mer.md)

### 7. Contrôle de couverture du programme

- [`referentiel/`](referentiel/) — le programme du cycle 1 sous forme de **liste numérotée** : 159 attendus, un par ligne avec un identifiant stable, et les 286 accroches qui disent ce que chaque période de chaque progression traite. `scripts/couverture.py` fait la soustraction et dit ce qui manque.

Ce contrôle a trouvé trois attendus que les documents annonçaient sans qu'aucune période ne les traite — les doubles consonnes, la prononciation exacte des 36 phonèmes, et agir de manière autonome pour le respect de l'environnement. Ils ont été comblés : l'année couvre désormais **159 attendus sur 159**.

## Rappels structurants du programme (GS)

- **Vocabulaire** : enseignement explicite de **3 corpus de mots par période** ; mémorisation évaluée chaque mois et chaque période ; ≈ 2 500 mots maîtrisés en fin de GS.
- **Un texte mémorisé par semaine** (comptine, chant, poésie, extrait d'album) ; **au moins 10 comptines ou chants** dans l'année, en réinvestissant ceux des années précédentes ; **au moins 3 œuvres musicales patrimoniales** connues.
- **Éducation physique quotidienne** (30 à 45 minutes effectives), unités d'apprentissage de **6 à 8 séances minimum**, couvrant les 4 sous-domaines.
- **Écriture** : entraînement structuré de l'écriture **cursive**, encodage de mots transparents en lien avec la conscience phonologique et la connaissance des lettres.
- **Mathématiques** : nombres jusqu'à **10 et au-delà**, comptine numérique jusqu'à **30**, décomptage de 10 à 1, comptage de 2 en 2 jusqu'à 20, écriture chiffrée de 1 à 10, résolution de problèmes régulière, formes, grandeurs (longueur, masse), motifs répétitifs **et évolutifs**.
- **EVAR** : **au moins 3 séances spécifiques annuelles** (une programmée ici en P1, P3 et P5).
- **Évaluation positive** : observation de ce que dit et fait l'élève, interprétation des progrès par rapport à lui-même ; les fiches proposées complètent — sans remplacer — l'observation en situation (le programme invite à **limiter le recours aux fiches**).

## Sources

- Programme d'enseignement de l'école maternelle (cycle 1), compilation des publications parues au BO n°19 du 7 mai 2026 et au BO n°41 du 31 octobre 2024 (programme EVAR de février 2025).
- Jeu de données officiel en open data : [Programme d'enseignement de l'école maternelle — data.gouv.fr](https://www.data.gouv.fr/datasets/programme-denseignement-de-lecole-maternelle).
