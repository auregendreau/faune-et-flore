# -*- coding: utf-8 -*-
"""Manifeste des cartes-corpus : les mots des trois corpus de chaque période.

Les fiches d'évaluation X.1 (vocabulaire) et X.3 (phonologie) réclamaient
« 12 cartes-images des corpus » sans que rien ne les fabrique. Ce manifeste
liste, période par période, **tous les noms** des trois corpus de
`01-projet-annuel.md` — le milieu, la faune, la flore — et dit d'où vient
l'image de chacun.

Les verbes et les adjectifs des corpus (*traverser*, *bruyant*, *hiberner*,
*rugueux*…) n'y sont pas : une image les ambiguïse plus qu'elle ne les
enseigne, et ils s'évaluent dans le réemploi, en situation.

Chaque entrée décrit :
  slug   — nom de fichier / clé de crédit ;
  nom    — le mot écrit sur l'étiquette (script, minuscules, article compris) ;
  source — d'où vient l'image, sous la forme d'un couple :

    ("imagier", slug)   une photographie de l'imagier faune et flore, déjà
                        choisie à la main et créditée — on ne la duplique pas,
                        la carte pointe vers site/imagier/img/ ;
    ("fiche", slug)     une image de la **banque partagée** site/fiches/img/,
                        désignée par son slug dans credits.json. C'est la
                        seule provenance en dehors de l'imagier : les cartes
                        n'ont pas de banque à elles.

Utilisé par scripts/generer-cartes-corpus.py (planches HTML),
scripts/verifier-cartes-corpus.py (contrôle avant publication) et
scripts/revoir-cartes-corpus.py (le PDF, à regarder). Les images se
cherchent et s'installent avec scripts/chercher-pictos.py, l'outil du skill
fiches-illustrations, qui alimente la banque partagée site/fiches/img/.
"""

# Les trois corpus de chaque période, tels que les nomme 01-projet-annuel.md.
CORPUS = {
    1: ("la ville", "la faune de la ville", "les arbres et le jardin"),
    2: ("la forêt", "la faune de la forêt", "les arbres et leurs fruits"),
    3: ("la montagne", "la faune de la montagne", "le froid et les conifères"),
    4: ("la campagne", "les animaux de la ferme", "le potager et les plantes"),
    5: ("la mer", "la faune du bord de mer", "le littoral et les algues"),
}

# ── Les cartes, période par période et corpus par corpus ──────────────────
# Un mot qui revient d'une période à l'autre (le terrier en P2 et P3, le
# sapin en P2 et P3, le coquillage en P5) n'est décrit qu'une fois, à sa
# première apparition ; RAPPELS dit dans quels autres cahiers l'imprimer.

CARTES = {
 1: {
  "milieu": [
   ("rue",             "la rue",             ("fiche",   "rue")),
   ("trottoir",        "le trottoir",        ("fiche",   "trottoir")),
   ("immeuble",        "l’immeuble",         ("fiche",   "immeuble.svg")),
   ("quartier",        "le quartier",        ("fiche",   "quartier")),
   ("place",           "la place",           ("fiche",   "place")),
   ("magasin",         "le magasin",         ("fiche",   "magasin.svg")),
   ("mairie",          "la mairie",          ("fiche",   "mairie")),
   ("feu-tricolore",   "le feu tricolore",   ("fiche",   "feu-tricolore.svg")),
   ("passage-pieton",  "le passage piéton",  ("fiche",   "passage-pieton")),
  ],
  "faune": [
   ("pigeon",          "le pigeon",          ("imagier", "pigeon-biset")),
   ("moineau",         "le moineau",         ("imagier", "moineau-domestique")),
   ("merle",           "le merle",           ("imagier", "merle-noir")),
   ("escargot",        "l’escargot",         ("fiche",   "escargot.svg")),
   ("fourmi",          "la fourmi",          ("imagier", "fourmi-rousse")),
   ("coccinelle",      "la coccinelle",      ("imagier", "coccinelle-7-points")),
   ("plume",           "la plume",           ("fiche",   "plume")),
   ("bec",             "le bec",             ("fiche",   "bec")),
   ("patte",           "la patte",           ("fiche",   "patte")),
  ],
  "flore": [
   ("arbre",           "l’arbre",            ("fiche",   "arbre.svg")),
   ("tronc",           "le tronc",           ("fiche",   "tronc")),
   ("branche",         "la branche",         ("fiche",   "branche")),
   ("feuille",         "la feuille",         ("fiche",   "feuille")),
   ("racine",          "la racine",          ("fiche",   "racine")),
   ("parc",            "le parc",            ("fiche",   "parc")),
   ("jardin",          "le jardin",          ("fiche",   "jardin")),
   ("jardiniere",      "la jardinière",      ("fiche",   "jardiniere")),
  ],
 },
 2: {
  "milieu": [
   ("foret",           "la forêt",           ("fiche",   "foret")),
   ("sentier",         "le sentier",         ("fiche",   "sentier")),
   ("clairiere",       "la clairière",       ("fiche",   "clairiere")),
   ("sous-bois",       "le sous-bois",       ("fiche",   "sous-bois")),
   ("mousse",          "la mousse",          ("imagier", "mousse-trottoir")),
   ("champignon",      "le champignon",      ("fiche",   "champignon.svg")),
   ("automne",         "l’automne",          ("fiche",   "automne")),
  ],
  "faune": [
   ("ecureuil",        "l’écureuil",         ("imagier", "ecureuil-roux")),
   ("herisson",        "le hérisson",        ("imagier", "herisson-europe")),
   ("renard",          "le renard",          ("imagier", "renard-roux")),
   ("cerf",            "le cerf",            ("imagier", "cerf-elaphe")),
   ("chouette",        "la chouette",        ("imagier", "chouette-hulotte")),
   ("sanglier",        "le sanglier",        ("imagier", "sanglier")),
   ("terrier",         "le terrier",         ("fiche",   "terrier")),
   ("nid",             "le nid",             ("fiche",   "nid.svg")),
   ("pelage",          "le pelage",          ("fiche",   "pelage")),
   ("piquants",        "les piquants",       ("fiche",   "piquants")),
  ],
  "flore": [
   ("chene",           "le chêne",           ("imagier", "chene")),
   ("sapin",           "le sapin",           ("imagier", "sapin-blanc")),
   ("gland",           "le gland",           ("fiche",   "gland.svg")),
   ("chataigne",       "la châtaigne",       ("fiche",   "chataigne")),
   ("marron",          "le marron",          ("fiche",   "marron.svg")),
   ("pomme-de-pin",    "la pomme de pin",    ("fiche",   "pomme-de-pin")),
   ("ecorce",          "l’écorce",           ("fiche",   "ecorce")),
   ("brindille",       "la brindille",       ("fiche",   "brindille")),
  ],
 },
 3: {
  "milieu": [
   ("montagne",        "la montagne",        ("fiche",   "montagne.svg")),
   ("sommet",          "le sommet",          ("fiche",   "sommet")),
   ("pente",           "la pente",           ("fiche",   "pente")),
   ("vallee",          "la vallée",          ("fiche",   "vallee")),
   ("glacier",         "le glacier",         ("fiche",   "glacier.jpg")),
   ("neige",           "la neige",           ("fiche",   "neige")),
   ("flocon",          "le flocon",          ("fiche",   "flocon.svg")),
   ("luge",            "la luge",            ("fiche",   "luge.svg")),
   ("ski",             "le ski",             ("fiche",   "ski.svg")),
  ],
  "faune": [
   ("marmotte",        "la marmotte",        ("imagier", "marmotte-alpine")),
   ("chamois",         "le chamois",         ("imagier", "chamois")),
   ("bouquetin",       "le bouquetin",       ("imagier", "bouquetin-alpes")),
   ("aigle",           "l’aigle",            ("imagier", "aigle-royal")),
   ("lievre-variable", "le lièvre variable", ("imagier", "lievre-variable")),
   ("corne",           "la corne",           ("fiche",   "corne")),
   ("griffe",          "la griffe",          ("fiche",   "griffe")),
  ],
  "flore": [
   ("epicea",          "l’épicéa",           ("imagier", "epicea")),
   ("edelweiss",       "l’edelweiss",        ("imagier", "edelweiss")),
   ("gentiane",        "la gentiane",        ("imagier", "gentiane-acaule")),
   ("aiguille",        "l’aiguille",         ("fiche",   "aiguille")),
   ("givre",           "le givre",           ("fiche",   "givre")),
   ("glace",           "la glace",           ("fiche",   "glace")),
   ("hiver",           "l’hiver",            ("fiche",   "hiver")),
  ],
 },
 4: {
  "milieu": [
   ("campagne",        "la campagne",        ("fiche",   "campagne")),
   ("ferme",           "la ferme",           ("fiche",   "ferme")),
   ("champ",           "le champ",           ("fiche",   "champ")),
   ("pre",             "le pré",             ("fiche",   "pre")),
   ("haie",            "la haie",            ("fiche",   "haie")),
   ("potager",         "le potager",         ("fiche",   "potager")),
   ("verger",          "le verger",          ("fiche",   "verger")),
   ("grange",          "la grange",          ("fiche",   "grange")),
   ("tracteur",        "le tracteur",        ("fiche",   "tracteur")),
   ("printemps",       "le printemps",       ("fiche",   "printemps")),
  ],
  "faune": [
   ("poule",           "la poule",           ("imagier", "poule")),
   ("poussin",         "le poussin",         ("fiche",   "poussin.svg")),
   ("coq",             "le coq",             ("fiche",   "coq")),
   ("vache",           "la vache",           ("imagier", "vache")),
   ("veau",            "le veau",            ("fiche",   "veau")),
   ("mouton",          "le mouton",          ("imagier", "mouton")),
   ("agneau",          "l’agneau",           ("fiche",   "agneau")),
   ("cochon",          "le cochon",          ("imagier", "cochon")),
   ("abeille",         "l’abeille",          ("imagier", "abeille-domestique")),
   ("chenille",        "la chenille",        ("fiche",   "chenille.svg")),
   ("papillon",        "le papillon",        ("fiche",   "papillon.svg")),
   ("ruche",           "la ruche",           ("fiche",   "ruche")),
   ("troupeau",        "le troupeau",        ("fiche",   "troupeau")),
  ],
  "flore": [
   ("graine",          "la graine",          ("fiche",   "graine.svg")),
   ("pousse",          "la pousse",          ("fiche",   "pousse.svg")),
   ("tige",            "la tige",            ("fiche",   "tige")),
   ("bourgeon",        "le bourgeon",        ("fiche",   "bourgeon")),
   ("fleur",           "la fleur",           ("fiche",   "fleur.svg")),
   ("fruit",           "le fruit",           ("fiche",   "fruit")),
   ("legume",          "le légume",          ("fiche",   "legume")),
   ("radis",           "le radis",           ("fiche",   "radis.svg")),
   ("salade",          "la salade",          ("fiche",   "salade.svg")),
  ],
 },
 5: {
  "milieu": [
   ("mer",             "la mer",             ("fiche",   "mer")),
   ("ocean",           "l’océan",            ("fiche",   "ocean")),
   ("plage",           "la plage",           ("fiche",   "plage.svg")),
   ("vague",           "la vague",           ("fiche",   "vague")),
   ("sable",           "le sable",           ("fiche",   "sable.svg")),
   ("rocher",          "le rocher",          ("fiche",   "rocher")),
   ("maree",           "la marée",           ("fiche",   "maree")),
   ("phare",           "le phare",           ("fiche",   "phare")),
   ("port",            "le port",            ("fiche",   "port")),
   ("bateau",          "le bateau",          ("fiche",   "voilier.svg")),
  ],
  "faune": [
   ("poisson",         "le poisson",         ("fiche",   "poisson.svg")),
   ("crabe",           "le crabe",           ("imagier", "crabe-vert")),
   ("etoile-de-mer",   "l’étoile de mer",    ("imagier", "etoile-de-mer")),
   ("meduse",          "la méduse",          ("imagier", "meduse-commune")),
   ("mouette",         "la mouette",         ("imagier", "mouette-rieuse")),
   ("dauphin",         "le dauphin",         ("imagier", "dauphin-commun")),
   ("crevette",        "la crevette",        ("fiche",   "crevette")),
   ("coquillage",      "le coquillage",      ("imagier", "moule-commune")),
   ("nageoire",        "la nageoire",        ("fiche",   "nageoire")),
   ("ecaille",         "l’écaille",          ("fiche",   "ecaille")),
   ("pince",           "la pince",           ("fiche",   "pince")),
   ("carapace",        "la carapace",        ("fiche",   "carapace")),
  ],
  "flore": [
   ("algue",           "l’algue",            ("imagier", "laitue-de-mer")),
   ("varech",          "le varech",          ("imagier", "fucus")),
   ("galet",           "le galet",           ("fiche",   "caillou.svg")),
   ("dune",            "la dune",            ("fiche",   "dune")),
   ("ecume",           "l’écume",            ("fiche",   "ecume")),
   ("corail",          "le corail",          ("fiche",   "corail")),
  ],
 },
}

# Un mot déjà décrit ailleurs, mais qui appartient aussi au corpus d'une autre
# période : la carte est réimprimée dans ce cahier-là, pour que chaque cahier
# soit complet à lui seul.
RAPPELS = {
    3: [("terrier", "faune"), ("sapin", "flore")],
    5: [("coquillage", "flore")],
}

# ── Les mots des corpus qui n'ont volontairement pas de carte ─────────────
# Les verbes et les adjectifs. Une image ne les enseigne pas, elle les
# ambiguïse : un dessin de « ramper » se lit *escargot*, un dessin de
# « rugueux » ne se lit pas du tout. Ils s'enseignent et s'évaluent dans le
# réemploi, en situation — c'est d'ailleurs ce que demandent les critères des
# fiches X.1 (« réemploie en phrase »).
#
# La liste est exhaustive : scripts/verifier-cartes-corpus.py relit les trois
# corpus de 01-projet-annuel.md et refuse tout mot qui ne serait ni une carte
# ni déclaré ici. Un mot ajouté à un corpus sans carte fera donc échouer le
# contrôle, au lieu de passer inaperçu.
NON_ILLUSTRES = {
 1: ("traverser", "circuler", "habiter", "bruyant", "calme", "picorer", "voler",
     "ramper", "se cacher", "planter", "arroser", "pousser", "fleuri"),
 2: ("se promener", "ramasser", "s'orienter", "sombre", "profond", "hiberner",
     "grimper", "bondir", "se nourrir", "tomber", "rouler", "piquant", "lisse",
     "rugueux"),
 3: ("glisser", "grimper", "escalader", "haut", "bas", "pentu", "gelé", "hiberner",
     "siffler", "planer", "bondir", "épais (pelage)", "fondre", "geler", "blanc",
     "brillant", "froid"),
 4: ("semer", "récolter", "cultiver", "labourer", "pondre", "éclore",
     "se métamorphoser", "germer", "fleurir", "mûrir", "butiner"),
 5: ("flotter", "couler", "nager", "plonger", "salé", "mouillé", "pincer",
     "glisser", "ramasser", "s'accrocher", "onduler", "transparent", "brillant"),
}



# ── Les étiquettes de tri ─────────────────────────────────────────────────
# Les fiches X.1 demandent « 3 boîtes-catégories » : ces étiquettes se collent
# sur trois barquettes. Les intitulés sont des hyperonymes, ce que le programme
# demande justement de travailler en GS (animal, végétal, bâtiment, véhicule).
TRI = {p: (milieu, "les animaux", "les végétaux") for p, milieu in
       ((1, "la ville"), (2, "la forêt"), (3, "la montagne"),
        (4, "la campagne"), (5, "la mer"))}

# La fiche 5.1 fait le tour des cinq milieux : son cahier porte en plus les
# cinq étiquettes-milieux.
TRI_MILIEUX = ("la ville", "la forêt", "la montagne", "la campagne", "la mer")
TRI_MILIEUX_PERIODE = 5
TRI_MILIEUX_TITRE = "Pour le tour des cinq milieux (fiche 5.1)"







# Les licences acceptées, les jeux écartés et la liste des sources retenues
# sont dans scripts/sources-images.py : ils valent pour tout le dépôt, pas
# seulement pour ces cahiers.

GROUPES = ("milieu", "faune", "flore")


def entrees(periode=None):
    """(période, groupe, slug, nom, source) pour toutes les cartes, rappels
    compris — l'ordre est celui d'impression des cahiers."""
    connus = {s: (g, n, src) for p in CARTES for g in GROUPES
              for s, n, src in CARTES[p][g]}
    for p in sorted(CARTES):
        if periode and p != periode:
            continue
        for g in GROUPES:
            for slug, nom, source in CARTES[p][g]:
                yield p, g, slug, nom, source
            for slug, groupe in RAPPELS.get(p, []):
                if groupe == g:
                    _, nom, source = connus[slug]
                    yield p, g, slug, nom, source
