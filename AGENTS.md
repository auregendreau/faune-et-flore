# Contexte du dépôt

Ce fichier est la source des consignes du dépôt, pour tout agent de code
(standard `AGENTS.md`) ; Claude Code le lit par l'import de `CLAUDE.md`, qui
ne garde que quelques lignes propres à Claude Code.

Matériel pédagogique pour une classe de **Grande Section** (année 2026-2027),
autour du projet annuel « À la découverte de la faune et de la flore » :
un milieu par période (ville, forêt, montagne, campagne, mer).

C'est **la classe d'Aurélie**, son enseignante et la propriétaire de ce
dépôt, fabriquée avec le moteur Encrine. Elle y continue sa classe dans ses
propres sessions : retours, mises à jour de l'outil, impression, partage.
Pour reprendre la classe ou découvrir ce qu'on peut demander, voir
[`PRISE-EN-MAIN.md`](PRISE-EN-MAIN.md) ; pour lui parler, la section
« Travailler avec l'enseignante » ci-dessous.

Tout est écrit **en français**, y compris les noms de fichiers, les
commentaires et les messages de commit.

## Organisation

| Chemin | Rôle |
|---|---|
| `01-…`, `02-…`, `03-progressions/`, `04-evaluations/` | les documents de l'enseignante, en Markdown |
| `site/` | l'application web (JS sans cadriciel), publiée sur GitHub Pages : le moteur calcule le modèle (`modele.js`) et garde la logique (`app.js`), les **gabarits** du thème dessinent le mini-site de la classe (`gabarits.js` par défaut) ; le pied porte « Conçu avec Encrine » ; l'appli s'installe (manifeste, icônes, `sw.js`, fabriqués par `classe.py`) |
| `site/charte/` | le design system : `socle.css` (Andika sur tout mot de l'enfant, contrastes, espacements, mécanique des périodes — commun à toutes les classes, non négociable), `composants.css` (la couverture des cahiers) et `themes/<thème>/` (le style propre à la classe : jetons, polices, arrondis, habillage des composants nommés, motifs, images libres déclarées dans `theme.yml`, et ses gabarits d'écran, `gabarits.js` ; ici « promenade », le mini-site « La Promenade » à l'écran, dont le papier reprend à l'identique le « Carnet de terrain » du thème faune-flore), assemblés dans `charte.css` par `classe.py` — la seule source des couleurs ; `scripts/verifier-theme.py` tient le thème à son contrat (skill `charte-graphique`) |
| `site/fiches/` | les fiches élève imprimables, une page A4 par fiche |
| `site/imagier/` | l'imagier Montessori, un cahier de cartes par période |
| `site/cartes-corpus/` | les cartes-corpus de vocabulaire, un cahier par période |
| `PRISE-EN-MAIN.md` | le guide de l'enseignante (sa classe, la reprise après le transfert, ce qu'elle peut demander), fabriqué par `classe.py generer` depuis `classe.yml` (`scripts/prise_en_main.py`) ; seule sa section « Propre à cette classe » s'écrit à la main |
| `classe.yml` | **la classe** : nom, niveau, année, projet, zone de vacances (ici C), milieux, documents — la seule source de ce qui la distingue d'une autre ; `scripts/classe.py verifier` refuse qu'une de ces données soit écrite en dur dans le code |
| `classe/` | le contenu propre à la classe, que `classe.yml` désigne : les espèces de l'imagier (`imagier.py`), les cartes-corpus (`corpus.py`), ce que l'année traite du programme (`annotations.yml`), le projet en données pour le site (`projet.yml` : mascotte, albums, œuvres, sorties… par milieu, repris mot pour mot du projet annuel et de la programmation) |
| `scripts/` | fabrication des pages et des images |
| `.agents/skills/` | les procédures outillées du dépôt, au standard ouvert des skills (`SKILL.md`) ; `.claude/skills` n'est qu'un lien symbolique vers ce dossier, pour Claude Code (voir ci-dessous) |
| `referentiel/` | le programme sous forme de liste numérotée, et le contrôle de couverture ; le calendrier scolaire officiel de chaque année, pour les trois zones (`calendrier-AAAA-AAAA.yml`) |

Les PDF **ne sont pas versionnés** : `scripts/generer-pdf.sh` les fabrique à
chaque déploiement avec Chromium en mode `--print-to-pdf`.

Après avoir touché à un manifeste ou à un gabarit, régénérer les pages :

```sh
python3 scripts/classe.py generer        # site/classe.json et classe.js, la charte, l'appli installable (manifeste, icônes, sw.js), après toute retouche de classe.yml ou du thème
python3 scripts/generer-cartes-corpus.py # site/cartes-corpus/periode-N.html
python3 scripts/generer-imagier.py     # site/imagier/periode-N.html
python3 scripts/generer-credits.py     # page des crédits des fiches
```

Après avoir touché aux photographies de l'imagier, les contrôler :

```sh
python3 scripts/verifier-imagier.py    # espèce, crédits, cadrage, nombres annoncés ; code 1 s'il reste une anomalie
REVUE_DIR=/tmp python3 scripts/revoir-imagier.py   # les cartes telles qu'elles s'imprimeront
```

Et **finir par le PDF, jamais par le HTML** : la page d'un navigateur
s'allonge, une feuille A4 non. Les deux pires défauts de ce matériel — les
étiquettes non paginées qui s'imprimaient par-dessus les crédits, le pied de
la garde seul sur une page — n'existaient pas à l'écran. Le contrôle est
outillé, et le déploiement le refait :

```sh
bash scripts/generer-pdf.sh /tmp/site            # le site assemblé (voir le skill imprimer-pdf)
python3 scripts/verifier-pagination.py /tmp/site # une page par fiche et par planche ; code 1 sinon
```

La marche à suivre est dans le skill [`imprimer-pdf`](.agents/skills/imprimer-pdf/SKILL.md).

Après avoir touché à une progression, vérifier que l'année couvre toujours
le programme :

```sh
python3 scripts/couverture.py          # 159 attendus, sort en code 1 s'il en manque
```

`referentiel/cycle1-gs.yml` porte les attendus, un par ligne avec un
identifiant ; `classe/annotations.yml` dit ce que chaque
période traite. Une séance ajoutée sans accroche ne sera pas comptée.

**Ce fichier ne contient que des exigences du programme**, relues contre le
BO (le calendrier scolaire national, données officielles lui aussi, a son
propre fichier dans `referentiel/` : `calendrier-AAAA-AAAA.yml`). Une règle que la classe se donne — le nombre d'espèces de l'imagier, par
exemple — n'y a pas sa place : logée parmi les autres, elle laisse croire que
le programme la prescrit, ce qui a déjà été affirmé à tort. Ces conventions
vivent dans le script du matériel concerné (ici `verifier-imagier.py`).

## Les skills du dépôt

Chaque capacité du dépôt a son skill : c'est par eux qu'une session reprend
le travail sans repartir de zéro. Charger le skill **avant** de toucher au
matériel qu'il couvre, et finir par [`capitaliser`](.agents/skills/capitaliser/SKILL.md).
Dans une classe, un skill peut finir par sa section **« Propre à cette
classe »** (entre `<!-- classe:debut -->` et `<!-- classe:fin -->`) : elle
appartient à la classe, la synchronisation du moteur la garde, et le moteur
n'en porte jamais.

| Skill | Quand |
|---|---|
| [`progressions-programme`](.agents/skills/progressions-programme/SKILL.md) | le projet annuel, la programmation, une progression, une batterie d'évaluation — et la couverture du programme (`couverture.py`) |
| [`fiches-eleve`](.agents/skills/fiches-eleve/SKILL.md) | créer, modifier ou réparer une fiche élève d'évaluation ou d'entraînement (`site/fiches/`) |
| [`imagier-photos`](.agents/skills/imagier-photos/SKILL.md) | ajouter, remplacer ou vérifier une photographie de l'imagier — y compris quand la demande dit seulement « on ne voit pas bien l'animal » ou « change cette image » |
| [`fiches-illustrations`](.agents/skills/fiches-illustrations/SKILL.md) | ajouter, remplacer ou vérifier un pictogramme des fiches élève (`site/fiches/img/`) — y compris « le dessin de la poule est bizarre » ou « il me faut une image de tracteur » |
| [`cartes-corpus`](.agents/skills/cartes-corpus/SKILL.md) | les cahiers de cartes de vocabulaire (`site/cartes-corpus/`) — ajouter un mot à un corpus, refaire un cahier, produire les étiquettes de tri des fiches X.1 |
| [`charte-graphique`](.agents/skills/charte-graphique/SKILL.md) | toute question d'apparence : couleurs des périodes, polices, icônes, composants de l'écran et du papier, et le design system publié qui en est le miroir |
| [`imprimer-pdf`](.agents/skills/imprimer-pdf/SKILL.md) | fabriquer les PDF et prouver qu'ils sont justes — avant tout commit qui touche à ce qui s'imprime |
| [`site-et-calendrier`](.agents/skills/site-et-calendrier/SKILL.md) | l'application, la liste des documents, la zone de la classe et le calendrier officiel, le changement de zone ou d'année, le déploiement |
| [`nouvelle-classe`](.agents/skills/nouvelle-classe/SKILL.md) | faire du dépôt la classe d'un autre enseignant : l'entretien (niveau, zone, thème, matériel), puis `classe.yml`, les progressions, les cahiers et les PDF |
| [`retours-enseignant`](.agents/skills/retours-enseignant/SKILL.md) | l'enseignant fait ses retours avec ses mots (une fiche, une image, une idée) : les trier, corriger la classe, remonter ce qui vaut pour toutes |
| [`remonter-au-moteur`](.agents/skills/remonter-au-moteur/SKILL.md) | un défaut, une amélioration ou une idée qui servirait à toutes les classes devient une issue sur le dépôt du moteur (`moteur` dans `classe.yml`) |
| [`reprendre-ma-classe`](.agents/skills/reprendre-ma-classe/SKILL.md) | la première session de l'enseignant après le transfert de sa classe sur son compte (« je reprends ma classe ») : `depot` à jour, contrôles et PDF, réglage de Pages, publication vue en ligne à la nouvelle adresse, l'accompagnant gardé comme collaborateur |
| [`synchroniser-moteur`](.agents/skills/synchroniser-moteur/SKILL.md) | mettre à jour le moteur d'une classe depuis le dépôt modèle, sans toucher à son contenu, contrôles et PDF compris |
| [`partager-ma-classe`](.agents/skills/partager-ma-classe/SKILL.md) | à la demande de l'enseignant seulement : vérifier (dont `verifier-partage.py` : aucun prénom d'élève, aucune photo de classe, aucun texte recopié), préparer la fiche, recueillir l'accord et proposer la classe à « Les classes » d'encrine.ai, qui en montre une copie relue ; la mettre à jour (nouvelle relecture) ou l'en retirer |
| [`capitaliser`](.agents/skills/capitaliser/SKILL.md) | en fin de tâche : verser ce qu'elle a appris dans le bon skill, le bon script ou ce fichier |

Un skill se mesure : `scripts/mesurer-declenchement.py` rejoue une liste de
demandes réalistes et regarde si le skill s'ouvre au bon moment (les cas de
l'imagier sont dans `tests/`). C'est un outil interne, qui lance Claude Code
— le seul agent testé à ce jour (voir `CLAUDE.md` pour le banc d'essai du
skill-creator, à ne pas croire).

## Branches, commits, publication

- **Ce dépôt est public** : tout ce qui y entre — une branche poussée
  comprise, même sans être déployée — est lisible par tous. « Non publié »
  n'est pas « non public ». Rien de privé n'y entre donc jamais : aucune
  donnée d'élève (ni prénom réel, ni photo, ni production scannée), aucune
  donnée personnelle de l'enseignante au-delà de sa signature (ni l'école,
  ni la ville), aucun document qui ne concerne pas la classe.
- La classe est une classe Encrine : son site porte la signature « Conçu
  avec Encrine », que le moteur assure en pied de page, et `classe.yml`
  désigne le moteur (`moteur.depot`) et le dépôt de la classe (`depot`).
  Quand le dépôt change d'adresse (un transfert vers le compte de
  l'enseignante), `depot` se met à jour aussitôt, puis
  `python3 scripts/classe.py generer` refait le lien du site dans le
  README ; la marche à suivre est dans le skill `reprendre-ma-classe`, et
  dite à l'enseignante dans [`PRISE-EN-MAIN.md`](PRISE-EN-MAIN.md).
- Le travail se fusionne sur **`main`**, en avance rapide, et seulement
  quand les contrôles sont verts : `main` se déploie, et un état
  intermédiaire publierait des cartes sans image. Confirmer la fusion sur
  pièces (`git fetch` puis `git log origin/main`) : une référence locale
  périmée peut faire croire `main` en retard.
- **L'auteur d'un commit n'est jamais l'adresse de l'enseignante** (ni
  celle du porteur du projet) : les lignes `Co-Authored-By` et
  `Claude-Session` suffisent.
- Ne pas annoncer « c'est enregistré et publié » pendant que le chantier
  continue. Dire ce qui est fait, ce qui reste, ce qui attend sa décision —
  et ne dire « c'est en ligne » qu'après l'avoir vu en ligne.
- Le proxy de la session **refuse les écritures destructives** (supprimer une
  branche distante, créer un dépôt) : le dire et lui donner le lien et le
  geste exacts pour le faire elle-même, sans essayer de contourner.

## Travailler avec l'enseignante

**La classe appartient à l'enseignante**, Aurélie : c'est sa classe de
Grande Section, son dépôt, son site. C'est à elle qu'on parle, directement.
Un **porteur du projet**, Jean-Louis, collaborateur du dépôt, peut aussi
ouvrir une session pour l'aider ; il parle alors pour elle ou pour l'outil,
mais les décisions sur la classe restent les siennes. Pour une première
session après la reprise, le skill `reprendre-ma-classe` (et ce qu'on lui
en a dit, [`PRISE-EN-MAIN.md`](PRISE-EN-MAIN.md)).

Elle dicte souvent depuis un téléphone, photos et captures à l'appui : lire
les messages pour leur sens (« SDG » pour « SVG »).

- **Tutoiement**, comme entre collègues (`ton: tu` dans `classe.yml`).
- **Sans jargon** : ni « repo », ni « commit », ni « merge » ou « fusion »,
  ni « référentiel », ni « couverture ». Dire « ta classe », « ton site »,
  « enregistrer et publier », « la liste numérotée du programme » ; « le
  dépôt » seulement comme dans `PRISE-EN-MAIN.md`, l'endroit qui garde
  tout ; expliquer un chiffre pas à pas.
- **Aller droit au résultat.** Une source qui bloque se dit tout de suite et
  l'on change d'approche ; ne jamais boucler sur une attente. Un point
  d'étape demandé se donne sur-le-champ.
- **Montrer, régulièrement**, ce qui est produit — planches d'images, pages
  rendues, PDF — pour qu'elle juge la qualité ; son verdict l'emporte, et
  s'écrit dans le message de commit.
- **Ne pas lui renvoyer le travail** : c'est la session qui fait. Ne poser
  que les questions qu'elle est seule à pouvoir trancher (pédagogie, goût,
  diffusion), **une à la fois**, en mode interactif (`AskUserQuestion`), et
  attendre la réponse plutôt que trancher seule ; reprendre à chaque point
  d'étape toutes celles qui restent ouvertes, pour qu'elle n'en rate aucune.
- **Le contenu de cette classe est validé** (décidé le 18 octobre 2026) :
  progressions, évaluations, fiches, espèces, mots, textes. On peut changer
  le design du site ou le réorganiser ; on ne touche au contenu que sur sa
  demande. La vipère aspic reste dans l'imagier (validée).
- **Vérifier avant d'affirmer** et reconnaître une erreur sans détour : un
  nombre donné de mémoire, une règle prêtée à tort au programme se
  démasquent à la première question.
- **Lire le dépôt avant de refaire** : skills, `git log`, scripts. Ne pas
  réécrire ce qui existe déjà (un filtre, un contrôle), ni refaire ce qui
  est interdit (un dessin à la place d'un pictogramme).
- **La qualité attendue est celle du commerce**, imprimée pour de vrai :
  l'à-peu-près se refait.
- Ce qui vaudrait pour toutes les classes remonte à l'outil (skills
  `retours-enseignant`, `remonter-au-moteur`), toujours avec son accord ;
  les nouveautés de l'outil reviennent par `synchroniser-moteur`, sans
  jamais toucher à son contenu.

## Images : quelles sources, et laquelle éviter

### Wikimedia Commons — à éviter pour toute nouvelle moisson

`upload.wikimedia.org` limite très sévèrement l'adresse de sortie mutualisée
depuis laquelle tourne l'agent : au-delà de quelques fichiers, il répond
`429` avec un `Retry-After: 600`, soit **environ cinq images par tranche de
dix minutes**. Quatre-vingt-dix images demandent alors plusieurs heures — et
le seau de jetons est partagé, si bien que **le moindre `curl` de
vérification vers ce domaine relance le compteur**. Ni le parallélisme, ni le
regroupement des appels d'API, ni le passage par les fichiers d'origine
plutôt que les vignettes n'y changent quoi que ce soit : la limite porte sur
l'adresse, pas sur la manière de demander.

Les illustrations des fiches élève n'en dépendent plus : ce sont des
**pictogrammes** (Mulberry Symbols via jsDelivr, ARASAAC via son API — deux
sources sans bridage), versionnés dans `site/fiches/img/` avec leurs crédits.
La procédure complète — sources dans l'ordre, pièges des noms trompeurs,
planche de candidats obligatoire, installation, contrôles — est dans le
skill [`fiches-illustrations`](.agents/skills/fiches-illustrations/SKILL.md),
outillée par `scripts/chercher-pictos.py` (chercher / installer / verifier).
L'ancienne moisson Commons a été retirée du dépôt : ne pas la refaire.

### Vérifier la licence avant de retenir une image

Toute image entrant dans le dépôt doit porter une licence **libre et qui
permet la modification** — CC0, la marque du domaine public, CC BY ou
CC BY-SA — parce qu'une carte recadre l'image, et qu'une classe partagée
doit pouvoir être reprise par une autre (« Partir de cette classe ») sans
condition cachée.

Deux clauses disqualifient :

- **NC**, qui interdit l'usage commercial. Les **58 pictogrammes ARASAAC**
  de la banque sont dans ce cas : ils restent acceptés, crédités, et signalés
  sur la fiche de partage de la classe ; Mulberry, entièrement libre et style
  de la maison, passe toujours d'abord. On ne demande pas à l'enseignante si elle
  vendra son matériel : décidé le 18 octobre 2026, la question n'a pas lieu
  d'être ;
- **ND**, qui interdit les œuvres dérivées, et qui est le piège vicieux :
  le filtre `license_type=commercial` d'Openverse **la laisse passer**,
  puisqu'une image ND autorise bien le commerce. Une photographie de givre
  est entrée ainsi, avec des crédits parfaitement corrects. Il faut énumérer
  les licences (`license=cc0,pdm,by,by-sa`), et non se fier au filtre —
  `chercher-pictos.py` le fait, à la recherche comme à l'installation, et
  `chercher-pictos.py verifier` relit la licence de chaque crédit.

`scripts/pictos-libres.py` interroge le registre **Global Symbols**
(`globalsymbols.com`), qui fédère une trentaine de jeux de pictogrammes en
publiant la licence de chacun, et ne retient que les jeux libres — Mulberry
(le style de maison des fiches), OpenMoji, PiCom. **Personne ne dessine les
concepts qu'il ne retrouve pas** : on élargit les mots-clés, on cherche
ailleurs dans l'ordre des sources, et on se rabat sur une photographie
Openverse — un dessin fait ici est proscrit, le skill
[`fiches-illustrations`](.agents/skills/fiches-illustrations/SKILL.md) le
dit noir sur blanc. Deux pièges : le registre cherche
en **sous-chaîne**, si bien que « lama » ramène *flamant* et « vague »
*microwave* — d'où le filtre sur le mot entier ; et Blissymbolics, bien que
libre, est un système d'écriture symbolique, inutilisable comme illustration.

### iNaturalist — la source des photographies d'espèces

`scripts/chercher-images-imagier.py` interroge
`https://api.inaturalist.org/v1/observations`. Aucune limitation gênante :
les cent quatre-vingts photographies de l'imagier sont fabriquées en quelques
minutes. Les paramètres qui comptent :

- `taxon_name` — **toujours le nom scientifique** (`Quercus robur`, et non
  « chêne ») ; c'est pourquoi `classe/imagier.py` porte le taxon de
  chaque espèce. Une recherche par nom vernaculaire est bien moins fiable.
- `quality_grade=research` — l'espèce a été confirmée par plusieurs
  naturalistes. À relâcher pour les animaux domestiques (vache, poule,
  cochon), qui n'ont jamais d'observation de « qualité recherche »
  puisqu'ils ne sont pas sauvages : le script le fait tout seul.
- `photo_license=cc0,cc-by,cc-by-sa` — les seules licences qui autorisent la
  publication sur le site avec mention de l'auteur.
- `original_dimensions` — filtrer en deçà de 1000 px de côté, une photo plus
  petite ne s'imprime pas proprement sur une carte.

Les fichiers sont servis par deux hôtes
(`inaturalist-open-data.s3.amazonaws.com` et `static.inaturalist.org`) et
sous plusieurs extensions ; `url_photo()` les essaie tous. Chaque source est
gardée en cache dans `/tmp/imagier-source`, ce qui permet de **rejouer un
recadrage sans réseau** (`RECADRER=1`).

### Choisir une photographie de carte : voir le skill

La procédure complète — planches de candidats, critères de sélection,
paramètres d'iNaturalist, contrôle avant publication — est dans le skill
[`imagier-photos`](.agents/skills/imagier-photos/SKILL.md), à charger avant
de toucher aux images de l'imagier. L'essentiel, en bref :

**Aucun tri automatique ne convient.** `order_by=votes` met en avant les
photographies les plus *aimées*, spectaculaires plutôt qu'illustratives : un
ours mangeant des pissenlits pour « le pissenlit », un renard argenté pour
« le renard roux ». Chaque photographie se choisit à l'œil, sur une planche
de candidats, et son identifiant s'inscrit dans `OVERRIDES`
(`classe/imagier.py`).

**Cinq critères**, tous nés d'une carte qu'il a fallu refaire : un seul
individu ; une image qui convient à des enfants de cinq ans (le vivier est
plein de saillies, de prédation et de crânes) ; l'animal entier, de face ou
de profil ; une image qui remplit la carte ; rien autour du sujet.

**Deux pièges qui donnent la mauvaise espèce.** Chercher par `taxon_id`,
jamais par `taxon_name` : ce dernier accroche les noms vernaculaires et a
fait publier un blaireau d'Amérique pour « le blaireau », un rhebok
d'Afrique du Sud pour « le chevreuil », une marmotte d'Amérique pour « la
marmotte ». Et les animaux de la ferme se cherchent avec `captive=true`,
faute de quoi le cochon d'élevage devient un sanglier féral. Même avec
`taxon_id`, le vivier contient des espèces voisines : les planches les
encadrent en rouge, et `scripts/verifier-imagier.py` refuse de laisser
passer une carte mal identifiée.

### Faune **et flore**

La flore ne se réduit pas aux fleurs : elle comprend les arbres, les
arbustes, les fougères, les mousses, les graminées, les algues et les
cultures. Chaque période compte dix-huit espèces de faune et dix-huit de
flore, et
cette dernière liste doit rester variée — un milieu représenté par neuf
fleurs serait faux.
