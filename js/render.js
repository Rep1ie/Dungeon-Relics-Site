/* render.js — рендер списков и детальных страниц из данных DR.*
   Контент (названия/описания) берётся через DR.L() из локаль-карт {en,ru}.
   Интерфейсные подписи — через DR.t() из словаря DR.strings.
   Иконки — векторные (js/icons.js + assets/icons/**), эмодзи не используются. */
window.DR = window.DR || {};

/* Если файл иконки не загрузился — подставляем встроенную SVG-иконку. */
DR.iconFallback = function (img) {
  var span = document.createElement('span');
  span.className = (img.getAttribute('class') || '').replace('is-img', 'is-svg');
  span.innerHTML = DR.svg ? DR.svg(img.getAttribute('data-fb') || 'rune') : '';
  if (img.parentNode) img.parentNode.replaceChild(span, img);
};

DR.render = (function () {
  // Локаль-резолвер и словарь (с безопасными фоллбеками).
  function L(v) { return DR.L ? DR.L(v) : (v && v.en) || v || ''; }
  function t(k) { return DR.t ? DR.t(k) : k; }
  function threatLabel(k) { return t('threat.' + k); }
  function rarityLabel(k) { return t('rarity.' + k); }
  function rarityOne(k) { return t('rarityOne.' + k); }

  // Встроенная иконка из js/icons.js.
  function sv(name, cls) { return DR.svg ? DR.svg(name, cls) : ''; }

  // Формулы навыков: жирный + подсветка переменных I (#D8A83C) и W (#FF5542).
  var FX = /[+\-\u2212]?(?:\d+(?:\.\d+)?|[IW])(?:\s*[+\-\u2212\u00d7xX*\/]\s*(?:\d+(?:\.\d+)?|[IW]))+%?/g;
  function colorVars(s) { return s.replace(/I/g, '<span class="fx-i">I</span>').replace(/W/g, '<span class="fx-w">W</span>'); }
  function fmt(v) { if (v == null) return ''; return String(v).replace(FX, function (m) { return '<b class="fx">' + colorVars(m) + '</b>'; }); }
  function fmtNote(v) { if (v == null) return ''; return String(v).replace(/(^|[^A-Za-z])([IW])(?![A-Za-z])/g, function (_m, p, x) { return p + (x === 'I' ? '<span class="fx-i">I</span>' : '<span class="fx-w">W</span>'); }); }
  DR.fmt = fmt;

  function esc(s) { return String(s == null ? '' : s); }
  function attr(s) { return esc(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function shorten(s, n) { s = String(s || ''); n = n || 120; return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '\u2026' : s; }
  function qp(name) { try { var v = new URLSearchParams(location.search).get(name); if (v != null) return v; } catch (e) {} return (window.DR_PARAMS && window.DR_PARAMS[name]) || null; }

  // Подбор имени встроенной иконки для сущности.
  function has(n) { return !!(n && DR.hasIcon && DR.hasIcon(n)); }
  function iconName(entry, fb) {
    var c = [entry && entry.svg, entry && entry.classKey, entry && entry.key, entry && entry.catKey, fb];
    for (var i = 0; i < c.length; i++) if (has(c[i])) return c[i];
    return 'rune';
  }

  function icon(kind, entry, cls, fb) {
    var name = iconName(entry, fb);
    var path = DR.iconPath ? DR.iconPath(kind, entry) : null;
    cls = 'dr-ic ' + (cls || '');
    if (path) {
      return '<img class="' + cls + ' is-img" src="' + attr(path) + '" alt="" loading="lazy" data-fb="' + attr(name) + '" onerror="DR.iconFallback(this)">';
    }
    return '<span class="' + cls + ' is-svg">' + sv(name) + '</span>';
  }

  function cost(s) {
    var c = '';
    if (s.cd) c += '<span class="skill__cd">' + sv('cooldown', 'ic--xs') + ' ' + fmt(s.cd) + ' ' + esc(t('unit.sec')) + '</span>';
    if (s.mp) c += '<span class="skill__mp">' + sv('mana', 'ic--xs') + ' ' + fmt(s.mp) + ' ' + esc(t('unit.mana')) + '</span>';
    return c ? '<span class="skill__cost">' + c + '</span>' : '';
  }

  /* ---------- КЛАССЫ (список) ---------- */
  function skillLink(s) {
    var bonus = s.b ? '<div class="skill__bonus">' + fmt(L(s.b)) + '</div>' : '';
    return '<a class="skill skill--link' + (s.kind === 'passive' ? ' skill--passive' : '') + '" href="skill.html?id=' + attr(s.id) + '">' +
      '<div class="skill__head">' + icon('skills', s, 'dr-ic--sm', s.classKey || s.classId) +
        '<span class="skill__name">' + esc(L(s.n)) + '</span>' + cost(s) +
      '</div>' +
      '<div class="skill__desc">' + fmt(L(s.d)) + '</div>' + bonus +
    '</a>';
  }

  function classCard(c) {
    var actives = (c.actives || []).map(skillLink).join('');
    var passives = (c.passives || []).map(skillLink).join('');
    return '<article class="class-card reveal" id="' + attr(c.id) + '">' +
      '<div class="class-card__head">' +
        '<span class="class-card__icon">' + sv(iconName(c, c.id)) + '</span>' +
        '<div><h3>' + esc(L(c.name)) + '</h3><span class="pill pill--role">' + esc(L(c.role)) + '</span></div>' +
      '</div>' +
      '<p class="class-card__lore">' + esc(L(c.desc)) + '</p>' +
      (actives ? '<div class="skill-group"><h4>' + esc(t('ui.activeSkills')) + '</h4>' + actives + '</div>' : '') +
      (passives ? '<div class="skill-group"><h4>' + esc(t('ui.passiveSkills')) + '</h4>' + passives + '</div>' : '') +
    '</article>';
  }

  function classes(host) {
    var cards = (DR.classes || []).map(classCard).join('');
    var note = DR.formulaNote ? '<div class="formula-note reveal"><strong>' + esc(t('ui.formulaNote')) + '</strong> ' + fmtNote(L(DR.formulaNote)) + '</div>' : '';
    host.innerHTML = note + '<div class="grid grid--classes">' + cards + '</div>';
  }

  /* ---------- БЕСТИАРИЙ (список) ---------- */
  function monTile(m) {
    return '<a class="mon-card" href="monster.html?id=' + attr(m.id) + '" data-threat="' + attr(m.threat) + '">' +
      '<div class="mon-card__top">' + icon('monsters', m, 'dr-ic--md', 'bestiary') +
        '<span class="pill pill--' + esc(m.threat) + '">' + esc(threatLabel(m.threat)) + '</span>' +
      '</div>' +
      '<h3 class="mon-card__name">' + esc(L(m.name)) + '</h3>' +
      '<div class="mon-card__stats"><span class="stat stat--hp">' + sv('hp', 'ic--xs') + ' ' + esc(m.hp) + '</span>' +
      '<span class="stat stat--dmg">' + sv('dmg', 'ic--xs') + ' ' + esc(m.dmg) + '</span></div>' +
      '<p class="mon-card__lore">' + esc(shorten(L(m.lore), 130)) + '</p>' +
      '<span class="mon-card__more">' + esc(t('ui.more')) + sv('arrowRight', 'ic--xs') + '</span>' +
    '</a>';
  }

  function setActive(btn) {
    var group = btn.parentNode;
    group.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('is-active'); });
    btn.classList.add('is-active');
  }

  function bindFilter(host, group, sel, getVal) {
    var state = 'all';
    function apply() {
      host.querySelectorAll(sel).forEach(function (el) {
        el.classList.toggle('is-hidden', !(state === 'all' || getVal(el) === state));
      });
    }
    host.querySelectorAll('[data-filter-group="' + group + '"] .filter-btn').forEach(function (b) {
      b.addEventListener('click', function () { setActive(b); state = b.getAttribute('data-filter'); apply(); });
    });
  }

  function bestiary(host) {
    var order = { boss: 0, high: 1, mid: 2, low: 3 };
    function rank(v) { return order.hasOwnProperty(v) ? order[v] : 9; }
    var mons = (DR.monsters || []).slice().sort(function (a, b) { return rank(a.threat) - rank(b.threat); });
    var filters = ['all', 'boss', 'high', 'mid', 'low'].map(function (k) {
      return '<button class="filter-btn' + (k === 'all' ? ' is-active' : '') + '" data-filter="' + k + '">' + esc(k === 'all' ? t('ui.all') : threatLabel(k)) + '</button>';
    }).join('');
    host.innerHTML = '<div class="filters" data-filter-group="threat">' + filters + '</div>' +
      '<div class="grid grid--mons" id="mon-grid">' + mons.map(monTile).join('') + '</div>';
    bindFilter(host, 'threat', '.mon-card', function (el) { return el.getAttribute('data-threat'); });
  }

  /* ---------- ЛУТ (список) ---------- */
  function lootTile(it) {
    return '<a class="loot-item rar-' + esc(it.rarity) + '" href="item.html?id=' + attr(it.id) + '" data-cat="' + attr(it.catKey) + '" data-rar="' + attr(it.rarity) + '">' +
      icon('items', it, 'dr-ic--md rar-frame rar-' + esc(it.rarity), it.catKey) +
      '<div class="loot-item__body">' +
        '<div class="loot-item__name">' + esc(L(it.n)) + '</div>' +
        (it.s ? '<div class="loot-item__stat">' + esc(L(it.s)) + '</div>' : '') +
        '<div class="loot-item__meta">' + sv(iconName(it, 'relics'), 'ic--xs') + ' ' + esc(L(it.catName)) + ' \u00b7 ' + esc(rarityOne(it.rarity)) + '</div>' +
      '</div>' +
    '</a>';
  }

  function loot(host) {
    var Lt = DR.loot || {};
    var frags = (Lt.fragments || []).map(function (f) {
      return '<div class="frag"><span class="frag__v">' + esc(f.v) + '</span><span class="frag__n">' + esc(L(f.n)) + '</span>' +
        (f.d ? '<span class="frag__d">' + esc(L(f.d)) + '</span>' : '') + '</div>';
    }).join('');
    var fragBox = '<div class="frag-box reveal"><h3>' + sv('shard', 'ic--sm') + ' ' + esc(t('ui.soulShards')) + '</h3><p>' + esc(t('ui.soulShardsDesc')) + '</p><div class="frag-row">' + frags + '</div></div>';
    var intro = Lt.rarityIntro ? '<div class="loot-intro reveal">' + esc(L(Lt.rarityIntro)) + '</div>' : '';

    var cats = (Lt.categories || []);
    var catBtns = '<button class="filter-btn is-active" data-filter="all">' + esc(t('ui.all')) + '</button>' + cats.map(function (c) {
      return '<button class="filter-btn" data-filter="' + attr(c.key) + '">' + sv(iconName(c, 'relics'), 'ic--xs') + ' ' + esc(L(c.name)) + '</button>';
    }).join('');
    var rarBtns = '<button class="filter-btn is-active" data-filter="all">' + esc(t('ui.all')) + '</button>' + ['common', 'rare', 'epic', 'legendary'].map(function (r) {
      return '<button class="filter-btn filter-btn--rar rar-' + r + '" data-filter="' + r + '">' + esc(rarityLabel(r)) + '</button>';
    }).join('');

    var items = (DR.allItems ? DR.allItems() : []);
    var order = { legendary: 0, epic: 1, rare: 2, common: 3 };
    function rrank(v) { return order.hasOwnProperty(v) ? order[v] : 9; }
    items.sort(function (a, b) { return rrank(a.rarity) - rrank(b.rarity); });

    host.innerHTML = fragBox + intro +
      '<div class="filter-bar">' +
        '<div class="filter-row"><span class="filter-label">' + esc(t('ui.category')) + '</span><div class="filters" data-filter-group="cat">' + catBtns + '</div></div>' +
        '<div class="filter-row"><span class="filter-label">' + esc(t('ui.rarity')) + '</span><div class="filters" data-filter-group="rar">' + rarBtns + '</div></div>' +
      '</div>' +
      '<div class="loot-grid" id="loot-grid">' + items.map(lootTile).join('') + '</div>' +
      '<div class="loot-empty" id="loot-empty" hidden>' + esc(t('ui.nothingFound')) + '</div>';

    var state = { cat: 'all', rar: 'all' };
    function apply() {
      var shown = 0;
      host.querySelectorAll('.loot-item').forEach(function (el) {
        var ok = (state.cat === 'all' || el.getAttribute('data-cat') === state.cat) &&
                 (state.rar === 'all' || el.getAttribute('data-rar') === state.rar);
        el.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      var empty = host.querySelector('#loot-empty');
      if (empty) empty.hidden = shown !== 0;
    }
    host.querySelectorAll('[data-filter-group="cat"] .filter-btn').forEach(function (b) {
      b.addEventListener('click', function () { setActive(b); state.cat = b.getAttribute('data-filter'); apply(); });
    });
    host.querySelectorAll('[data-filter-group="rar"] .filter-btn').forEach(function (b) {
      b.addEventListener('click', function () { setActive(b); state.rar = b.getAttribute('data-filter'); apply(); });
    });
  }

  /* ---------- ДЕТАЛЬНЫЕ СТРАНИЦЫ ---------- */
  function crumbs(items) {
    return '<nav class="crumbs">' + items.map(function (it, i) {
      var sep = i < items.length - 1 ? '<span class="crumbs__sep">\u203a</span>' : '';
      return (it.href ? '<a href="' + attr(it.href) + '">' + esc(it.label) + '</a>' : '<span class="crumbs__cur">' + esc(it.label) + '</span>') + sep;
    }).join('') + '</nav>';
  }

  function backBtn(href, label) {
    return '<a class="btn btn--ghost detail__back" href="' + attr(href) + '">' + sv('arrowLeft', 'ic--xs') + ' ' + esc(label) + '</a>';
  }

  function notFound(host, backHref, backLabel) {
    host.innerHTML = '<div class="notfound"><h1>' + esc(t('ui.notFound')) + '</h1><p>' + esc(t('ui.notFoundDesc')) + '</p>' + backBtn(backHref, backLabel) + '</div>';
  }

  function setTitle(name) { try { document.title = name + ' \u2014 ' + t('brand.title'); } catch (e) {} }

  function skillPage(host) {
    var s = DR.findSkill ? DR.findSkill(qp('id')) : null;
    if (!s) { notFound(host, 'classes.html', t('ui.backToClasses')); return; }
    setTitle(L(s.n));
    var kindLabel = s.kind === 'passive' ? t('ui.passiveSkill') : t('ui.activeSkill');
    var costRow = '';
    if (s.cd || s.mp) {
      costRow = '<div class="detail__stats">' +
        (s.cd ? '<span class="stat stat--dmg">' + sv('cooldown', 'ic--xs') + ' ' + esc(t('ui.cooldown')) + ': ' + fmt(s.cd) + ' ' + esc(t('unit.sec')) + '</span>' : '') +
        (s.mp ? '<span class="stat stat--mp">' + sv('mana', 'ic--xs') + ' ' + esc(t('ui.cost')) + ': ' + fmt(s.mp) + ' ' + esc(t('unit.mana')) + '</span>' : '') +
      '</div>';
    }
    var bonus = s.b ? '<div class="detail__block"><h4>' + esc(t('ui.upgrade')) + '</h4><p>' + fmt(L(s.b)) + '</p></div>' : '';
    var cls = DR.findClassById ? DR.findClassById(s.classId) : null;
    var sibs = '';
    if (cls) {
      var all = (cls.actives || []).concat(cls.passives || []);
      sibs = all.filter(function (x) { return x.id !== s.id; }).map(function (x) {
        return '<a class="sib" href="skill.html?id=' + attr(x.id) + '">' + icon('skills', x, 'dr-ic--sm', x.classKey || x.classId) + '<span>' + esc(L(x.n)) + '</span></a>';
      }).join('');
      if (sibs) sibs = '<div class="detail__block"><h4>' + esc(t('ui.otherSkills')) + ' ' + esc(L(cls.name)) + '</h4><div class="sibs">' + sibs + '</div></div>';
    }
    var className = L(s.classNameMap);
    host.innerHTML =
      crumbs([{ label: t('nav.classes'), href: 'classes.html' }, { label: className, href: 'classes.html#' + attr(s.classId) }, { label: L(s.n) }]) +
      '<article class="detail detail--skill' + (s.kind === 'passive' ? ' is-passive' : '') + '">' +
        '<header class="detail__hero">' + icon('skills', s, 'dr-ic--lg', s.classKey || s.classId) +
          '<div class="detail__head"><span class="pill ' + (s.kind === 'passive' ? 'pill--passive' : 'pill--role') + '">' + esc(kindLabel) + '</span>' +
          '<h1>' + esc(L(s.n)) + '</h1><p class="detail__sub">' + esc(className) + '</p></div>' +
        '</header>' +
        costRow +
        '<div class="detail__block"><h4>' + esc(t('ui.description')) + '</h4><p>' + fmt(L(s.d)) + '</p></div>' +
        bonus + sibs +
        backBtn('classes.html', t('ui.backToClasses')) +
      '</article>';
  }

  function monsterPage(host) {
    var m = DR.findMonster ? DR.findMonster(qp('id')) : null;
    if (!m) { notFound(host, 'bestiary.html', t('ui.backToBestiary')); return; }
    setTitle(L(m.name));
    var abils = (m.abilities || []).map(function (a) {
      return '<div class="abil"><div class="abil__name">' + esc(L(a.n)) + '</div><div class="abil__desc">' + esc(L(a.d)) + '</div></div>';
    }).join('');
    var extra = m.extra ? '<span class="stat stat--extra">' + esc(L(m.extra)) + '</span>' : '';
    host.innerHTML =
      crumbs([{ label: t('nav.bestiary'), href: 'bestiary.html' }, { label: L(m.name) }]) +
      '<article class="detail detail--mon">' +
        '<header class="detail__hero">' + icon('monsters', m, 'dr-ic--lg', 'bestiary') +
          '<div class="detail__head"><span class="pill pill--' + esc(m.threat) + '">' + esc(threatLabel(m.threat)) + '</span>' +
          '<h1>' + esc(L(m.name)) + '</h1></div>' +
        '</header>' +
        '<div class="detail__stats"><span class="stat stat--hp">' + sv('hp', 'ic--xs') + ' ' + esc(t('ui.hp')) + ' ' + esc(m.hp) + '</span>' +
        '<span class="stat stat--dmg">' + sv('dmg', 'ic--xs') + ' ' + esc(t('ui.dmg')) + ' ' + esc(m.dmg) + '</span>' + extra + '</div>' +
        '<div class="detail__block"><h4>' + esc(t('ui.description')) + '</h4><p class="lore">' + esc(L(m.lore)) + '</p></div>' +
        (abils ? '<div class="detail__block"><h4>' + esc(t('ui.abilities')) + '</h4><div class="abils">' + abils + '</div></div>' : '') +
        (m.counter ? '<div class="mon__counter"><span class="mon__counter-label">' + esc(t('ui.howToCounter')) + '</span>' + esc(L(m.counter)) + '</div>' : '') +
        backBtn('bestiary.html', t('ui.backToBestiary')) +
      '</article>';
  }

  function itemPage(host) {
    var it = DR.findItem ? DR.findItem(qp('id')) : null;
    if (!it) { notFound(host, 'loot.html', t('ui.backToLoot')); return; }
    setTitle(L(it.n));
    host.innerHTML =
      crumbs([{ label: t('nav.loot'), href: 'loot.html' }, { label: L(it.catName), href: 'loot.html' }, { label: L(it.n) }]) +
      '<article class="detail detail--item rar-' + esc(it.rarity) + '">' +
        '<header class="detail__hero">' + icon('items', it, 'dr-ic--lg rar-frame rar-' + esc(it.rarity), it.catKey) +
          '<div class="detail__head"><span class="pill pill--rar rar-' + esc(it.rarity) + '">' + esc(rarityOne(it.rarity)) + '</span>' +
          '<h1>' + esc(L(it.n)) + '</h1><p class="detail__sub">' + sv(iconName(it, 'relics'), 'ic--xs') + ' ' + esc(L(it.catName)) + '</p></div>' +
        '</header>' +
        (it.s ? '<div class="detail__stats"><span class="stat stat--dmg">' + esc(L(it.s)) + '</span></div>' : '') +
        (it.d ? '<div class="detail__block"><h4>' + esc(t('ui.description')) + '</h4><p>' + esc(L(it.d)) + '</p></div>' : '') +
        backBtn('loot.html', t('ui.backToLoot')) +
      '</article>';
  }

  return { classes: classes, bestiary: bestiary, loot: loot, skillPage: skillPage, monsterPage: monsterPage, itemPage: itemPage };
})();
