/* Fabriqué par scripts/classe.py : ne pas modifier à la main.
   Les gabarits du thème « promenade » — skill charte-graphique, « Les gabarits ». */
/* Les gabarits du thème « promenade » : l'année est une promenade.
 *
 * L'en-tête est un poteau indicateur (des plaques de randonnée jaunes, un
 * sous-menu par plaque) ; sur téléphone, « Où va-t-on ? » ouvre le grand
 * poteau. L'accueil déroule le panorama des cinq tableaux (un par milieu),
 * le sentier de l'année (les semaines en pas, les vacances en haltes), les
 * étiquettes de bagage des cahiers à imprimer et les documents. Un document
 * se lit avec ses jalons ; la page d'un milieu s'ouvre sur son tableau en
 * plein cadre, puis la mascotte, les sorties, ce qu'on y fait, les cahiers,
 * les rencontres de l'imagier, les mots, les albums et les œuvres.
 *
 * Le moteur calcule (m, le modèle : site/modele.js) et garde la logique
 * (routes, menu, focus, Échap : site/app.js) ; ces fonctions ne font que
 * dessiner. Les données du projet viennent de classe/projet.yml, recopiées
 * mot pour mot du projet annuel et de la programmation. Skill
 * charte-graphique, « Le mini-site ».
 */
(function () {
  'use strict';

  var observateur = null;

  /* ——— Petits tracés (CC0, tracés pour le thème) ——— */
  function fleche(classe) {
    return '<svg class="pr-fl' + (classe ? ' ' + classe : '') + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function trace(classe) {
    return '<svg class="' + classe + '" viewBox="0 0 1600 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 160 10, 320 54, 480 30 S 800 6, 960 32 S 1280 56, 1600 22" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="1 14" stroke-linecap="round"/></svg>';
  }
  /* La balise du sentier : deux bandes, blanche et de la couleur du milieu. */
  function balise(n) { return '<span class="pr-balise"' + (n ? ' data-periode="' + n + '"' : '') + ' aria-hidden="true"></span>'; }

  /* « Pour piloter l’année » → « Piloter l’année » */
  function plaque(titre) {
    var t = String(titre).replace(/^Pour\s+/i, '');
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  /* « La forêt » → « la forêt » */
  function minuscule(milieu) { return String(milieu).replace(/^(L’|L'|La |Le |Les )/, function (a) { return a.toLowerCase(); }); }
  function majuscule(t) { t = String(t); return t.charAt(0).toUpperCase() + t.slice(1); }
  /* « de la forêt », « de l’Asie », « du … » */
  function de(milieu) {
    var mi = minuscule(milieu);
    if (/^le /.test(mi)) return 'du ' + mi.slice(3);
    if (/^les /.test(mi)) return 'des ' + mi.slice(4);
    return 'de ' + mi;
  }
  /* « La classe d’Aurélie », « La classe de Mme Martin » */
  function classeDe(nom) { return 'La classe ' + (/^[aeiouyàâäéèêëîïôöùûüh]/i.test(nom) ? 'd’' : 'de ') + nom; }
  function etat(p) {
    if (p.statut === 'en-cours') return 'nous y sommes';
    if (p.statut === 'passee') return 'étape parcourue';
    if (p.prochaine) return 'prochaine étape';
    return 'à venir';
  }
  function sansEmoji(t) {
    return String(t).replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();
  }
  function promenade(p) { return (p.theme && p.theme.promenade) || {}; }
  function titreBloc(id, titre, badge) {
    return '<div class="pr-titre-bloc"><h2 id="' + id + '">' + titre + '</h2>' + (badge ? '<span class="pr-zone">' + badge + '</span>' : '') + '</div>';
  }
  function lienCourant(page) {
    if (!page) return null;
    if (page.type === 'periode') return page.periode.lien;
    if (page.type === 'credits') return '#/credits';
    if (page.type === 'document' && page.doc) return page.doc.lien;
    return null;
  }

  /* ——— L'en-tête : le poteau indicateur ——— */
  function entree(m, e) {
    var o = m.outils, esc = o.esc;
    var p = e.periode ? m.periode(e.periode) : null;
    var marque = e.periode ? balise(e.periode) : o.icone(e.icone);
    var titre = p && e.id !== 'periode/' + p.cle ? p.milieu : e.titre;
    var desc = p && e.id === 'periode/' + p.cle ? 'Étape ' + p.n + ' · ' + p.dates.court : e.desc;
    return '<li><a class="pr-topo-lien" href="' + e.lien + '"' + (p ? ' data-periode="' + p.n + '"' : '') + '>' + marque +
      '<span><strong>' + esc(titre) + '</strong>' + (desc ? '<small>' + esc(desc) + '</small>' : '') + '</span></a></li>';
  }
  function entete(m, page) {
    var o = m.outils, esc = o.esc;
    var groupes = m.menu.filter(function (g) { return g.entrees.length; });
    var plaques = groupes.map(function (g, i) {
      var cote = i === groupes.length - 1 ? ' pr-topo-droite' : (i === 0 ? ' pr-topo-gauche' : '');
      return '<li class="pr-plaque-groupe"><button type="button" class="pr-plaque" data-sous-menu aria-expanded="false" aria-controls="pr-sm-' + g.cle + '">' +
        '<span>' + esc(plaque(g.titre)) + '</span><em>' + g.entrees.length + '</em>' + fleche() + '</button>' +
        '<div class="pr-topo' + cote + '" id="pr-sm-' + g.cle + '" data-sous-menu-panneau hidden><p class="pr-topo-titre">' + esc(g.titre) + '</p>' +
        '<ul>' + g.entrees.map(function (e) { return entree(m, e); }).join('') + '</ul></div></li>';
    }).join('');
    var mplaques = groupes.map(function (g, i) {
      return '<li class="pr-m-plaque ' + (i % 2 ? 'pr-g' : 'pr-d') + '"><button type="button" class="pr-m-sommet" data-sous-menu aria-expanded="false" aria-controls="pr-msm-' + g.cle + '">' +
        '<span>' + esc(plaque(g.titre)) + '</span><em>' + g.entrees.length + '</em>' + fleche() + '</button>' +
        '<ul class="pr-m-liste" id="pr-msm-' + g.cle + '" data-sous-menu-panneau hidden>' + g.entrees.map(function (e) { return entree(m, e); }).join('') + '</ul></li>';
    }).join('');
    // « Vous êtes ici » : la page affichée, en tête du grand poteau (le
    // focus s'y pose à l'ouverture, app.js cherchant le lien de la page)
    var ici = lienCourant(page), iciTexte = '';
    if (ici) {
      var t = page.type === 'periode' ? page.periode.milieu : page.doc ? page.doc.titre : '';
      iciTexte = '<p class="pr-m-ici">' + o.icone('map-pin') + '<span>Vous êtes ici</span><a href="' + ici + '">' + esc(t) + '</a></p>';
    }
    return '<div class="pr-haut">' +
      '<nav class="pr-poteau" aria-label="Rubriques de la classe"><span class="pr-mat" aria-hidden="true"></span><ul class="pr-plaques">' +
        '<li><a class="pr-plaque" href="#/accueil"><span>Accueil</span>' + fleche() + '</a></li>' + plaques + '</ul></nav>' +
      '<button type="button" class="pr-m-bouton" data-menu-ouvrir aria-expanded="false" aria-controls="pr-m-poteau">' +
        '<span class="pr-m-bouton-plaque">Où va-t-on ?' + fleche() + '</span></button>' +
      '<div class="pr-m-poteau" id="pr-m-poteau" data-menu-panneau role="dialog" aria-modal="true" aria-label="Où va-t-on ? Les rubriques de la classe" hidden>' +
        '<div class="pr-m-tete"><p class="pr-m-titre">Où va-t-on ?</p>' +
        '<button type="button" class="pr-m-ferme" data-menu-fermer>' + o.icone('x') + '<span>Fermer</span></button></div>' + iciTexte +
        '<div class="pr-m-chemin"><span class="pr-m-mat" aria-hidden="true"></span><ul class="pr-m-plaques">' +
          '<li class="pr-m-plaque pr-g"><a href="#/accueil"><span>Accueil</span>' + fleche() + '</a></li>' + mplaques + '</ul></div>' +
      '</div></div>';
  }

  /* ——— L'accueil ——— */
  function panorama(m) {
    var o = m.outils, esc = o.esc;
    var ici = m.ici;
    var vues = [];
    m.periodes.forEach(function (p) {
      var tableau = p.embleme;
      var enCours = p.statut === 'en-cours';
      var proche = ici.statut !== 'periode' && p.prochaine;
      vues.push('<li class="pr-vue' + (enCours || proche ? ' pr-ici' : '') + '" data-periode="' + p.n + '"><a href="' + p.lien + '">' +
        (tableau ? '<img src="' + esc(tableau.chemin) + '" alt="" loading="' + (p.n < 3 ? 'eager' : 'lazy') + '" width="1800" height="1300">' : '') +
        '<span class="pr-vue-info"><span class="pr-vue-etape">' + balise(p.n) + 'Étape ' + p.n + ' · ' + etat(p) + '</span>' +
        '<strong>' + esc(p.milieu) + '</strong><span class="pr-vue-dates">' + esc(p.dates.court) + ' · ' + p.sem + ' semaines</span></span></a>' +
        (enCours ? '<span class="pr-pin-zone" data-pr-ici><span class="pr-pin">' + o.icone('map-pin') + '</span><span class="pr-pin-texte"><strong>Nous y sommes</strong>' +
          'Étape ' + p.n + ' en cours' + '</span></span>' : '') + '</li>');
      var v = m.vacances[p.n - 1];
      if (v && v.enCours) {
        vues.push('<li class="pr-vous-etes-ici" data-pr-ici><span class="pr-pin">' + o.icone('map-pin') + '</span><span class="pr-pin-texte"><strong>Nous y sommes</strong>' +
          esc(majuscule(v.libelle.replace(/^les /, ''))) + '<br>reprise ' + esc(o.jourCourt(v.reprise)) + '</span></li>');
      }
    });
    return '<section class="pr-panorama-zone" aria-labelledby="pr-t-annee">' +
      '<div class="pr-panorama-tete"><h2 id="pr-t-annee">L’année en ' + o.nombre(m.periodes.length) + ' ' + esc(m.classe.periodes_nom) + '</h2>' +
        '<div class="pr-fleches"><button type="button" data-pr-defile="arriere" aria-controls="pr-panorama" aria-label="Revenir en arrière sur le sentier">' + o.icone('arrow-left') + '</button>' +
        '<button type="button" data-pr-defile="avant" aria-controls="pr-panorama" aria-label="Avancer sur le sentier">' + o.icone('arrow-right') + '</button></div></div>' +
      '<ol class="pr-panorama" id="pr-panorama" tabindex="0" aria-label="Le panorama des ' + esc(m.classe.periodes_nom) + ', un tableau par étape">' + vues.join('') + '</ol>' +
      trace('pr-trace') + '</section>';
  }

  function sentier(m) {
    var o = m.outils, esc = o.esc, C = m.classe;
    var lignes = [];
    m.periodes.forEach(function (p) {
      var pas = '';
      for (var k = 0; k < p.sem; k++) pas += '<span class="pr-pas"></span>';
      lignes.push('<li class="pr-troncon' + (p.statut === 'en-cours' ? ' pr-ici' : '') + '" data-periode="' + p.n + '" style="flex-grow:' + p.sem + '">' +
        '<span class="pr-pas-ligne" aria-hidden="true">' + pas + '</span>' +
        '<a class="pr-troncon-nom" href="' + p.lien + '">P' + p.n + ' · ' + esc(p.milieu) + '</a>' +
        '<span class="pr-troncon-sem">' + esc(p.dates.court) + ' · ' + p.sem + ' sem.</span>' +
        (p.statut === 'en-cours' ? '<span class="pr-ici-mot">' + o.icone('map-pin') + 'Nous y sommes</span>' : '') + '</li>');
      var v = m.vacances[p.n - 1];
      if (v) {
        lignes.push('<li class="pr-halte' + (v.enCours ? ' pr-ici' : '') + '">' +
          (v.enCours ? '<span class="pr-ici-mot">' + o.icone('map-pin') + 'Nous y sommes</span>' : '') +
          '<strong>' + esc(majuscule(v.nom)) + '</strong><span>' + esc(v.dates) + '</span><em>reprise le ' + esc(o.jourCourt(v.reprise)) + '</em></li>');
      }
    });
    return '<section class="pr-sentier-zone" aria-labelledby="pr-t-sentier">' + titreBloc('pr-t-sentier', 'Le sentier de l’année', 'Zone ' + esc(C.zone)) +
      '<ol class="pr-sentier">' + lignes.join('') + '</ol>' +
      '<p class="pr-note">' + esc(m.annee.texte) + ' ' + m.ponts.map(function (p) { return esc(p.texte); }).join(' ') + '</p>' +
      '<p class="pr-note">Chaque document se télécharge en PDF prêt à imprimer, dates comprises.</p></section>';
  }

  function etiquettes(m, p) {
    var o = m.outils, esc = o.esc;
    return '<ul class="pr-tags" data-periode="' + p.n + '">' + p.cahiers.map(function (c) {
      return '<li><a class="pr-tag" href="' + c.href + '" download="' + esc(c.nom) + '"><span class="pr-trou" aria-hidden="true"></span>' +
        o.icone(c.icone) + '<strong>' + esc(c.titre) + '</strong><small>' + esc(c.desc) + '</small>' +
        '<span class="pr-tag-pdf">' + o.icone('download') + 'PDF</span></a></li>';
    }).join('') + '</ul>';
  }

  function aImprimer(m) {
    var o = m.outils, esc = o.esc;
    var tete = m.ici.periode || m.ici.prochaine;
    var ordre = m.periodes.slice();
    if (tete) ordre = ordre.slice(tete.n - 1).concat(ordre.slice(0, tete.n - 1));
    ordre = ordre.filter(function (p) { return p.cahiers.length; });
    if (!ordre.length) return '';
    var sacs = ordre.map(function (p, i) {
      var premier = i === 0 && tete && tete.n === p.n;
      var tetiere = '<div class="pr-sac-tete">' + balise(p.n) + '<h3><a href="' + p.lien + '">Étape ' + p.n + ' · ' + esc(p.milieu) + '</a></h3>' +
        (premier ? '<span class="pr-pastille-ici">' + (m.ici.periode ? 'nous y sommes' : 'à venir') + '</span>' : '') +
        '<span class="pr-sac-dates">' + esc(p.dates.court) + '</span></div>';
      if (premier) return '<div class="pr-sac pr-sac-ici" data-periode="' + p.n + '">' + tetiere + etiquettes(m, p) + '</div>';
      return '<div class="pr-sac" data-periode="' + p.n + '">' + tetiere + '<div class="pr-sac-liens">' + p.cahiers.map(function (c) {
        return '<a href="' + c.href + '" download="' + esc(c.nom) + '">' + o.icone(c.icone) + '<span>' + esc(c.titre) + '<span class="pr-visuel-cache"> · ' + esc(p.milieu) + ', PDF</span></span></a>';
      }).join('') + '</div></div>';
    }).join('');
    return '<section aria-labelledby="pr-t-imprimer">' + titreBloc('pr-t-imprimer', 'À imprimer pour la classe') +
      '<p class="pr-note">' + esc(m.materielNote) + '</p><div class="pr-sacs">' + sacs + '</div></section>';
  }

  function documents(m) {
    var o = m.outils, esc = o.esc;
    var groupes = m.groupes.map(function (g, i) {
      return '<div class="pr-docs-groupe pr-docs-' + (i + 1) + '"><h3>' + esc(g.titre) + '</h3><ul class="pr-cartes-docs">' + g.documents.map(function (d) {
        var p = d.periode ? m.periode(d.periode) : null;
        if (p) {
          return '<li><a class="pr-carte-eval" href="' + d.lien + '" data-periode="' + p.n + '">' + balise(p.n) +
            '<strong>' + esc(p.milieu) + '<span class="pr-visuel-cache"> : évaluation de la période ' + p.n + '</span></strong><small>' + esc(d.desc) + '</small></a></li>';
        }
        return '<li><a class="pr-carte-doc" href="' + d.lien + '">' + o.icone(d.icone) + '<strong>' + esc(d.titre) + '</strong>' +
          '<small>' + esc(d.desc) + '</small><span class="pr-carte-fl">' + fleche() + '</span></a></li>';
      }).join('') + '</ul></div>';
    }).join('');
    return '<section aria-labelledby="pr-t-docs">' + titreBloc('pr-t-docs', 'Mes documents') + '<div class="pr-docs">' + groupes + '</div></section>';
  }

  function accueil(m) {
    var o = m.outils, esc = o.esc, C = m.classe, ens = C.enseignant;
    return '<div class="pr-page pr-accueil">' +
      '<section class="pr-ouverture" aria-labelledby="pr-titre">' +
        '<p class="pr-surtitre">' + balise() + esc(C.niveau.libelle) + ' · année ' + esc(C.annee) + ' · zone ' + esc(C.zone) + '</p>' +
        '<h1 id="pr-titre">' + esc(C.projet) + '</h1>' +
        '<p class="pr-chapo">' + o.texte(C.accroche) + '</p>' +
        (ens.signature ? '<p class="pr-depart"><span class="pr-depart-mat" aria-hidden="true"></span><span class="pr-depart-panneau">' +
          '<span class="pr-depart-petit">Départ de la promenade</span><span class="pr-depart-nom">' + esc(classeDe(ens.signature)) + '</span></span></p>' : '') +
        (ens.mot ? '<p class="pr-mot">' + o.texte(ens.mot) + '</p>' : '') +
      '</section>' +
      panorama(m) + '<div class="pr-colonne">' + sentier(m) + aImprimer(m) + documents(m) + '</div></div>';
  }

  /* ——— Un document : une étape de lecture, avec ses jalons ——— */
  function document_(m, page) {
    var o = m.outils, esc = o.esc, doc = page.doc, p = page.periode;
    var actions = '';
    if (doc.pdf) actions += '<a class="pr-btn-plaque" href="' + doc.pdf.href + '" download="' + esc(doc.pdf.nom) + '">' + o.icone('download') + '<span>Télécharger le PDF</span></a>';
    if (p) {
      actions += '<div class="pr-doc-cahiers"><p>' + o.icone('printer') + 'Les cahiers ' + esc(de(p.milieu)) + ' :</p><div class="pr-extraits-liste">' +
        p.cahiers.map(function (c) {
          return '<a class="pr-extrait" data-periode="' + p.n + '" href="' + c.href + '" download="' + esc(c.nom) + '">' + o.icone(c.icone) + esc(c.titre) + '</a>';
        }).join('') + '<a class="pr-extrait pr-extrait-milieu" data-periode="' + p.n + '" href="' + p.lien + '">' + balise(p.n) + 'La page ' + esc(de(p.milieu)) + '</a></div></div>';
    }
    if (doc.extraits && doc.extraits.length) {
      actions += '<div class="pr-extraits"><p>' + o.icone('printer') + 'L’extrait d’une période, pour l’afficher en classe :</p><div class="pr-extraits-liste">' +
        doc.extraits.map(function (e) {
          return '<a class="pr-extrait" data-periode="' + e.n + '" href="' + e.href + '" download="' + esc(e.nom) + '">' + balise(e.n) + esc(e.milieu) + '</a>';
        }).join('') + '</div></div>';
    }
    var jalons = page.sections && page.sections.length > 1 ? '<nav class="pr-jalons" aria-label="Dans ce document"><p class="pr-jalons-titre">Dans ce document</p><ol>' +
      page.sections.map(function (s) {
        var q = s.periode ? m.periode(s.periode) : null;
        var t = q ? 'Étape ' + q.n + ' · ' + q.milieu : sansEmoji(s.titre).replace(/^\d+\.\s*/, '');
        if (t.length > 60) t = t.slice(0, 57).replace(/\s+\S*$/, '') + '…';
        return '<li><a href="#' + s.id + '"' + (q ? ' data-periode="' + q.n + '" class="pr-j-p"' : '') + '><span class="pr-j-point" aria-hidden="true"></span>' + esc(t) + '</a></li>';
      }).join('') + '</ol></nav>' : '';
    var surtitre = doc.groupe || (page.type === 'credits' ? 'Les images et les polices' : '');
    return '<div class="pr-page pr-page-doc"' + (p ? ' data-periode="' + p.n + '"' : '') + '>' +
      '<header class="pr-doc-tete">' + (surtitre ? '<p class="pr-surtitre">' + balise(p ? p.n : null) + esc(surtitre) + '</p>' : '') +
        '<h1>' + esc(p ? p.milieu : doc.titre) + '</h1>' +
        (p ? '<p class="pr-chapo"><strong>Évaluation de fin de période ' + p.n + '</strong> · ' + esc(doc.desc) + '</p>' : (doc.desc ? '<p class="pr-chapo">' + esc(doc.desc) + '</p>' : '')) +
        (actions ? '<div class="pr-doc-actions">' + actions + '</div>' : '') + '</header>' +
      '<div class="pr-lecture' + (jalons ? '' : ' pr-sans-jalons') + '">' + jalons +
        '<article class="pr-texte"' + (p ? ' data-periode="' + p.n + '"' : '') + '>' + page.corps + '</article></div></div>';
  }

  /* ——— La page d'un milieu ——— */
  function oeuvre(o, x) {
    if (typeof x === 'string') return { titre: o.texte(x), sous: '' };
    return { titre: o.texte(x.titre), auteur: x.auteur ? o.texte(x.auteur) : '', note: x.note ? o.texte(x.note) : '', etude: x.etude };
  }
  function liste(o, items) {
    return '<ul class="pr-puces">' + (items || []).map(function (x) { return '<li>' + oeuvre(o, x).titre + '</li>'; }).join('') + '</ul>';
  }

  function periode(m, page) {
    var o = m.outils, esc = o.esc, p = page.periode, pr = p.projet || {}, th = promenade(p);
    var N = m.periodes.length;
    var tableau = p.embleme;
    var statut = p.statut === 'en-cours' ? 'nous y sommes' : p.statut === 'passee' ? 'étape parcourue' :
      (p.prochaine ? 'reprise le ' + o.jourCourt(p.debut) : 'à venir');
    var hero = '<section class="pr-hero" aria-labelledby="pr-titre-milieu">' +
      (tableau ? '<img class="pr-hero-img" src="' + esc(tableau.chemin) + '" alt="' + esc(tableau.alt || '') + '" width="1800" height="1300">' : '') +
      '<div class="pr-hero-texte"><p class="pr-surtitre">' + balise(p.n) + 'Étape ' + p.n + ' sur ' + N + ' · zone ' + esc(m.classe.zone) + '</p>' +
        '<h1 id="pr-titre-milieu">' + esc(p.milieu) + '</h1>' + (pr.resume ? '<p class="pr-chapo">' + o.texte(pr.resume) + '</p>' : '') +
        '<ul class="pr-pastilles"><li>' + o.icone('calendar-range') + esc(p.dates.long) + '</li><li>' + p.sem + ' semaines</li>' +
        '<li class="' + (p.statut === 'en-cours' || p.prochaine ? 'pr-p-ici' : '') + '">' + o.icone('map-pin') + esc(statut) + '</li></ul></div>' +
      (tableau ? '<p class="pr-hero-credit">' + esc(tableau.auteur) + ', <i>' + esc(tableau.titre.split(',')[0].split(' (')[0]) + '</i>' +
        (tableau.date ? ', ' + esc(tableau.date) : '') + ' · ' + esc(tableau.institution || '') + ', CC0</p>' : '') + '</section>';

    // la mascotte, les sorties, l'élevage
    var mas = pr.mascotte || pr.fil_rouge;
    var annee = (m.projet && m.projet.annee) || {};
    var photo = mas && mas.embleme ? m.image(mas.embleme) : null;
    var carnet = '';
    if (mas || (pr.sorties || []).length || th.elevage) {
      carnet = '<section class="pr-carnet' + (photo ? '' : ' pr-sans-photo') + '" aria-labelledby="pr-t-mascotte">' +
        (photo ? '<figure class="pr-polaroid"><img src="' + esc(photo.chemin) + '" alt="' + esc(photo.alt || '') + '" loading="lazy" width="1100" height="753">' +
          '<figcaption class="mot-enfant">' + esc(photo.alt || mas.nom) + '</figcaption></figure>' : '') +
        '<div class="pr-carnet-texte"><p class="pr-surtitre pr-s-periode">La mascotte de l’étape</p>' +
          '<h2 id="pr-t-mascotte">' + esc(majuscule(mas ? mas.nom : p.milieu)) + '</h2>' +
          (annee.mascotte ? '<p><strong>' + esc(annee.mascotte.nom) + '</strong> : ' + o.texte(annee.mascotte.texte) + '</p>' : '') +
          (mas && mas.texte ? '<p>' + o.texte(mas.texte) + '</p>' : '') + '</div>' +
        '<div class="pr-carnet-sortie">' +
          ((pr.sorties || []).length ? '<p class="pr-surtitre">' + o.icone('map-pin') + 'Les sorties et les temps forts</p>' + liste(o, pr.sorties) : '') +
          (th.elevage ? '<p class="pr-surtitre">' + o.icone('sprout') + 'Élevages et plantations</p><p class="pr-elevage">' + o.texte(majuscule(th.elevage)) + '</p>' : '') +
        '</div></section>';
    }

    // ce qu'on y fait : la colonne de la programmation annuelle
    var docs = {};
    m.documents.forEach(function (d) { docs[d.id] = d; });
    var prog = (th.programmation || []).filter(function (x) { return x.composantes && x.composantes.length; });
    var fait = prog.length ? '<section aria-labelledby="pr-t-fait">' + titreBloc('pr-t-fait', 'Ce qu’on y fait', 'programmation annuelle · P' + p.n) +
      '<ol class="pr-arrets">' + prog.map(function (x, i) {
        var d = docs[x.document] || { titre: x.document, icone: 'file-text', lien: '#/accueil' };
        return '<li class="pr-arret"><span class="pr-arret-num" aria-hidden="true">' + (i + 1) + '</span><div>' +
          '<h3><a href="' + d.lien + '">' + o.icone(d.icone) + esc(d.titre) + '</a></h3><ul>' + x.composantes.map(function (c) {
            return '<li><span class="pr-composante">' + esc(String(c.nom).replace(/\*\*/g, '')) + '</span> ' + o.texte(c.texte) + '</li>';
          }).join('') + '</ul></div></li>';
      }).join('') + '</ol></section>' : '';

    // les cahiers et les documents de l'étape
    var docsEtape = p.documents.map(function (d) {
      return '<a class="pr-extrait" data-periode="' + p.n + '" href="' + d.lien + '">' + o.icone(d.icone) + esc(d.titre.replace(/^Période \d+ · /, 'Évaluation · ')) + '</a>';
    }).join('') + p.extraits.map(function (e) {
      return '<a class="pr-extrait" data-periode="' + p.n + '" href="' + e.href + '" download="' + esc(e.nom) + '">' + o.icone(e.icone) + esc(e.titre) + '<span class="pr-visuel-cache"> : l’extrait de la période, en PDF</span></a>';
    }).join('');
    var cahiers = '<section aria-labelledby="pr-t-sac">' +
      titreBloc('pr-t-sac', p.cahiers.length ? 'Les ' + o.nombre(p.cahiers.length) + ' cahiers ' + esc(de(p.milieu)) : 'Les documents ' + esc(de(p.milieu))) +
      (p.cahiers.length ? '<p class="pr-note">' + esc(m.materielNote) + '</p>' + etiquettes(m, p) : '<p class="pr-note">Les cahiers de cette étape seront prêts pour le ' + esc(o.jourLong(p.debut)) + '.</p>') +
      (docsEtape ? '<h3 class="pr-sous">Les documents de l’étape</h3><p class="pr-note">L’évaluation de fin de période, et l’extrait de chaque progression, en PDF.</p><div class="pr-extraits-liste">' + docsEtape + '</div>' : '') +
      '</section>';

    // les rencontres de l'imagier
    var nbF = (p.imagier.faune || []).length, nbV = (p.imagier.flore || []).length;
    var rencontres = (nbF || nbV) ? '<section aria-labelledby="pr-t-renc">' + titreBloc('pr-t-renc', 'Les rencontres de l’imagier', nbF + ' animaux · ' + nbV + ' plantes') +
      [['faune', 'Les animaux'], ['flore', 'Les plantes']].map(function (g) {
        var es = p.imagier[g[0]] || [];
        return es.length ? '<h3 class="pr-sous">' + g[1] + '</h3><ul class="pr-rencontres">' + es.map(function (e) {
          return '<li><img src="' + esc(e.chemin) + '" alt="" loading="lazy" width="1100" height="753"><span class="mot-enfant">' + esc(e.nom) + '</span></li>';
        }).join('') + '</ul>' : '';
      }).join('') + '</section>' : '';

    // les mots, les albums
    var corpus = p.corpus ? '<div><div class="pr-titre-bloc"><h2 id="pr-t-mots">Les corpus de vocabulaire</h2></div>' + p.corpus.corpus.map(function (k, i) {
      return '<div class="pr-corpus"><h3>Corpus ' + (i + 1) + ' · ' + esc(k.titre) + '</h3><ul class="pr-galets">' +
        k.mots.map(function (w) { return '<li class="mot-enfant">' + esc(w) + '</li>'; }).join('') + '</ul></div>';
    }).join('') + (p.corpus.sans_carte.length ? '<p class="pr-note">Et aussi, sans carte : <span class="mot-enfant">' + p.corpus.sans_carte.map(esc).join(', ') + '</span>.</p>' : '') + '</div>' : '';
    var albums = (pr.albums || []).length ? '<div><div class="pr-titre-bloc"><h2 id="pr-t-albums">Les albums</h2></div><ul class="pr-albums">' +
      pr.albums.map(function (x) {
        var w = oeuvre(o, x);
        return '<li class="pr-album' + (w.etude ? ' pr-etoile' : '') + '"><strong>' + w.titre + '</strong>' + (w.auteur ? '<span>' + w.auteur + '</span>' : '') +
          (w.note ? '<span class="pr-album-note">' + w.note + '</span>' : '') + (w.etude ? '<em>étude approfondie ★</em>' : '') + '</li>';
      }).join('') + '</ul>' +
      ((pr.documentaires || []).length ? '<p class="pr-note"><strong>Documentaires :</strong> ' + pr.documentaires.map(function (x) { return oeuvre(o, x).titre; }).join(', ') + '.</p>' : '') +
      ((pr.textes || []).length ? '<p class="pr-note"><strong>Textes mémorisés :</strong> ' + pr.textes.map(function (x) { return oeuvre(o, x).titre; }).join(' ; ') + '.</p>' : '') +
      '</div>' : '';
    var deux = (corpus || albums) ? '<section class="pr-deux" aria-label="Les mots et les albums">' + corpus + albums + '</section>' : '';

    // le parcours artistique et culturel
    var arts = [['Arts visuels', pr.oeuvres, 'palette'], ['Univers sonores', pr.musique, 'music'], ['Spectacle vivant', pr.spectacle, 'person-standing']]
      .filter(function (x) { return x[1] && x[1].length; });
    var parcours = arts.length ? '<section aria-labelledby="pr-t-arts">' + titreBloc('pr-t-arts', 'Le parcours artistique') +
      '<div class="pr-arts">' + arts.map(function (x) {
        return '<div class="pr-art"><h3>' + o.icone(x[2]) + x[0] + '</h3>' + liste(o, x[1]) + '</div>';
      }).join('') + '</div></section>' : '';

    var prec = m.periode(p.n - 1), suiv = m.periode(p.n + 1);
    var suite = '<nav class="pr-suite" aria-label="Les étapes voisines">' +
      (prec ? '<a href="' + prec.lien + '" data-periode="' + prec.n + '"><small>← étape ' + prec.n + '</small>' + esc(prec.milieu) + '</a>' : '<a href="#/accueil"><small>← le départ</small>L’accueil</a>') +
      (suiv ? '<a class="pr-suivante" href="' + suiv.lien + '" data-periode="' + suiv.n + '"><small>étape ' + suiv.n + ' →</small>' + esc(suiv.milieu) + '</a>'
            : '<a class="pr-suivante" href="#/accueil"><small>fin de la promenade →</small>L’accueil</a>') + '</nav>';

    return '<div class="pr-page pr-page-milieu" data-periode="' + p.n + '">' + hero +
      '<div class="pr-colonne">' + carnet + fait + cahiers + rencontres + deux + parcours + suite + '</div></div>';
  }

  /* ——— Une page qui n'existe pas : hors du sentier ——— */
  function introuvable() {
    return '<div class="pr-page pr-page-doc"><header class="pr-doc-tete"><p class="pr-surtitre">' + balise() + 'Hors du sentier</p>' +
      '<h1>Cette page n’existe pas</h1><p class="pr-chapo">Le chemin s’arrête ici : la page a pu changer d’adresse. Revenez au départ de la promenade.</p>' +
      '<div class="pr-doc-actions"><a class="pr-btn-plaque" href="#/accueil"><span>Revenir à l’accueil</span>' + fleche() + '</a></div></header></div>';
  }

  /* ——— Le pied ——— */
  function pied(m) {
    var esc = m.outils.esc, C = m.classe;
    var sig = m.signature.texte;
    var nom = /Encrine$/.test(sig) ? 'Encrine' : sig;
    var petit = nom === sig ? '' : sig.slice(0, -nom.length).trim();
    var images = m.images.filter(function (im) { return im.origine === 'theme'; }).map(function (im) {
      return esc(im.auteur) + ', <i>' + esc(String(im.titre).split(' (')[0].split(', also')[0]) + '</i>';
    });
    return '<div class="pr-pied">' + trace('pr-pied-sentier') +
      (C.enseignant.signature ? '<p class="pr-pied-classe">' + esc(classeDe(C.enseignant.signature)) + ' · ' + esc(C.projet) + ' · ' + esc(C.annee) + '</p>' : '') +
      '<a class="pr-signature" href="' + m.signature.lien + '">' + (petit ? '<span class="pr-sig-petit">' + esc(petit) + '</span>' : '') +
        '<span class="pr-sig-nom">' + esc(nom) + '</span>' + fleche() + '</a>' +
      '<p class="pr-pied-texte">' + esc(m.pied.conformite) + ' ' + esc(m.pied.calendrier) + '</p>' +
      '<p class="pr-pied-credits">' + (images.length ? '<strong>Les tableaux.</strong> ' + images.join(' · ') + ' — The Metropolitan Museum of Art, domaine public (CC0). ' : '') +
        'Photographies de l’imagier : iNaturalist, CC BY, CC BY-SA et CC0. <a href="' + m.pied.credits + '">Tous les crédits</a></p></div>';
  }

  /* ——— Après le rendu : la forme seulement ——— */
  function enEtapes(racine, m) {
    var texte = racine.querySelector('.pr-texte');
    if (!texte) return;
    var courante = null;
    Array.prototype.slice.call(texte.children).forEach(function (el) {
      if (el.tagName === 'H2') {
        var n = /P[ée]riode\s*(\d)/i.exec(el.textContent);
        courante = n ? m.periode(parseInt(n[1], 10)) : null;
        if (courante) {
          el.classList.add('pr-h-periode');
          el.dataset.periode = courante.n;
          var chip = document.createElement('span');
          chip.className = 'pr-h-etape';
          chip.innerHTML = '<span class="pr-balise" aria-hidden="true"></span>Étape ' + courante.n;
          el.insertBefore(chip, el.firstChild);
        }
        return;
      }
      if (el.tagName === 'TABLE') {
        var tetes = Array.prototype.map.call(el.querySelectorAll('thead th'), function (th) { return th.textContent.trim(); });
        Array.prototype.forEach.call(el.querySelectorAll('tbody tr'), function (tr) {
          Array.prototype.forEach.call(tr.children, function (td, k) { if (tetes[k]) td.setAttribute('data-label', tetes[k]); });
        });
        var cadre = document.createElement('div');
        cadre.className = 'pr-tableau' + (courante ? ' pr-tableau-p' : '');
        if (courante) cadre.dataset.periode = courante.n;
        el.parentNode.insertBefore(cadre, el);
        cadre.appendChild(el);
      }
    });
  }

  function monter(racine, m, page) {
    if (observateur) { observateur.disconnect(); observateur = null; }
    if (page.type === 'document' || page.type === 'credits') {
      enEtapes(racine, m);
      var liens = racine.querySelectorAll('.pr-jalons a');
      if (liens.length && 'IntersectionObserver' in window) {
        observateur = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            Array.prototype.forEach.call(liens, function (a) { a.classList.toggle('pr-actif', a.getAttribute('href') === '#' + e.target.id); });
          });
        }, { rootMargin: '-20% 0px -70% 0px' });
        Array.prototype.forEach.call(liens, function (a) {
          var c = document.getElementById(a.getAttribute('href').slice(1));
          if (c) observateur.observe(c);
        });
      }
    }
    if (page.type === 'accueil') {
      var pano = racine.querySelector('#pr-panorama');
      if (!pano) return;
      // le panorama s'ouvre sur « Nous y sommes »
      var ici = pano.querySelector('[data-pr-ici]');
      var vue = ici ? (ici.classList.contains('pr-vous-etes-ici') ? ici.previousElementSibling : ici.closest('.pr-vue')) : pano.querySelector('.pr-ici');
      // sur téléphone, le tableau suivant : le repère est à son bord gauche
      if (vue && ici && ici.classList.contains('pr-vous-etes-ici') && pano.clientWidth < 600 && ici.nextElementSibling) vue = ici.nextElementSibling;
      if (vue) pano.scrollLeft = Math.max(0, vue.offsetLeft - pano.offsetLeft - (pano.clientWidth < 600 ? (pano.clientWidth - vue.offsetWidth) / 2 : 16));
      // les flèches avancent sur le sentier
      Array.prototype.forEach.call(racine.querySelectorAll('[data-pr-defile]'), function (b) {
        b.addEventListener('click', function () {
          var pas = pano.clientWidth * 0.8 * (b.getAttribute('data-pr-defile') === 'avant' ? 1 : -1);
          pano.scrollBy({ left: pas, behavior: m.mouvement ? 'smooth' : 'auto' });
        });
      });
    }
  }

  GS.theme({
    entete: entete, accueil: accueil, document: document_, periode: periode,
    introuvable: introuvable, pied: pied, monter: monter
  });
})();
