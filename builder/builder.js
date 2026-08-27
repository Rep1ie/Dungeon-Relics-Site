/* builder.js — конструктор контента Dungeon Relics в стиле самого сайта.
   Показывает реальные карточки классов/навыков/монстров/лута со всем контентом.
   Текст правится прямо в карточке, иконка меняется по клику, есть +/− и «Детали».
   Правит копию window.DR_CONTENT в памяти и экспортирует content.js + иконки в ZIP.
   Ничего не пишет на сервер: публичный сайт остаётся read-only. */
(function () {
  'use strict';
  var content = document.getElementById('page-content');
  var navHost = document.getElementById('site-nav');
  var toastEl = document.getElementById('toast');
  var RTIERS = ['common', 'rare', 'epic', 'legendary'];
  var RORDER = { legendary: 0, epic: 1, rare: 2, common: 3 };
  var THREATS = [['boss', 'Boss / Босс'], ['high', 'High / Высокая'], ['mid', 'Mid / Средняя'], ['low', 'Low / Низкая']];

  // ---------- язык ----------
  function langsList() { return (DR.i18n && DR.i18n.langs) || [{ code: 'en', label: 'EN' }, { code: 'ru', label: 'RU' }]; }
  var LANG = (DR.lang && langsList().some(function (l) { return l.code === DR.lang; })) ? DR.lang : langsList()[0].code;
  DR.lang = LANG;
  function t(k) { DR.lang = LANG; return DR.t ? DR.t(k) : k; }
  function Lv(v) { if (v && typeof v === 'object' && !Array.isArray(v)) { return v[LANG] != null ? v[LANG] : (v.en != null ? v.en : ''); } return v == null ? '' : v; }
  function setLang(code) { LANG = code; DR.lang = code; try { document.documentElement.setAttribute('lang', code); } catch (e) {} render(); }

  // ---------- state ----------
  var uidSeq = 1; function uid() { return 'u' + (uidSeq++); }
  var ICONS = {}; // uid -> {kind, file, url}
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function lm() { return { en: '', ru: '' }; }

  var editItemUid = null;   // открытая отдельная страница предмета
  var panelOpen = true;     // панель конструктора развёрнута
  var editMonUid = null;    // открытая отдельная страница монстра
  var editSkillUid = null;  // открытая отдельная страница навыка
  var DATA = window.DR_CONTENT ? clone(window.DR_CONTENT) : {};
  DATA.formulaNote = DATA.formulaNote || lm();
  DATA.classes = DATA.classes || [];
  DATA.monsters = DATA.monsters || [];
  DATA.loot = DATA.loot || {};
  DATA.loot.rarityIntro = DATA.loot.rarityIntro || lm();
  DATA.loot.fragments = DATA.loot.fragments || [];
  DATA.loot.categories = DATA.loot.categories || [];
  DATA.classes.forEach(function (c) { c._uid = uid(); (c.actives || []).forEach(function (s) { s._uid = uid(); }); (c.passives || []).forEach(function (s) { s._uid = uid(); }); });
  DATA.monsters.forEach(function (m) { m._uid = uid(); });
  DATA.loot.categories.forEach(function (cat) { cat._uid = uid(); cat.tiers = cat.tiers || {}; RTIERS.forEach(function (r) { (cat.tiers[r] || []).forEach(function (it) { it._uid = uid(); }); }); });

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function getPath(o, p) { return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
  function setPath(o, p, v) { var ks = p.split('.'); var last = ks.pop(); var tt = ks.reduce(function (a, k) { if (a[k] == null) a[k] = {}; return a[k]; }, o); tt[last] = v; }
  function slugify(s) { return String(s || '').toLowerCase().replace(/[\u2018\u2019']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function toast(msg, cls) { toastEl.textContent = msg; toastEl.className = 'toast show' + (cls ? ' ' + cls : ''); setTimeout(function () { toastEl.className = 'toast'; }, 2600); }
  function attrs(ds) { var s = ''; for (var k in ds) s += ' data-' + k + '="' + esc(ds[k]) + '"'; return s; }
  function val(path) { var v = getPath(DATA, path); return v == null ? '' : v; }
  function lp(base) { return base + '.' + LANG; }
  function grow(el) { el.style.height = 'auto'; el.style.height = (el.scrollHeight + 2) + 'px'; }

  // ---------- инлайн-редактируемые поля (выглядят как текст сайта) ----------
  function edInput(path, cls, extra) { return '<input class="ed-input ' + (cls || '') + '" data-path="' + esc(path) + '" value="' + esc(val(path)) + '"' + (extra || '') + '>'; }
  function edArea(path, cls) { return '<textarea class="ed-input ed-area ' + (cls || '') + '" data-path="' + esc(path) + '" rows="1">' + esc(val(path)) + '</textarea>'; }
  function edLoc(base, cls) { return edInput(lp(base), cls); }
  function edLocArea(base, cls) { return edArea(lp(base), cls); }
  function delBtn(act, ds) { return '<button class="ed-del" type="button" title="Удалить" data-act="' + act + '"' + attrs(ds) + '>\u2715</button>'; }

  function iconHtml(kind, uidv, id, emoji, cls) {
    var rec = ICONS[uidv];
    var src = rec ? rec.url : (DR.iconPath ? DR.iconPath(kind, { id: id }) : ('assets/icons/' + kind + '/' + id + '.png'));
    return '<label class="ed-icon dr-ic ' + (cls || '') + ' is-emoji" title="Сменить иконку (PNG)">' + esc(emoji || '') +
      '<img id="prev-' + uidv + '" src="' + esc(src) + '" alt="" onerror="this.style.display=\'none\'">' +
      '<input type="file" accept="image/png,image/*" data-icon="' + uidv + '" data-kind="' + kind + '">' +
      '<span class="ed-icon__badge">\u270e</span></label>';
  }

  var moreSeq = 0;
  function moreBlock(inner, label) { var id = 'det' + (++moreSeq); return '<button class="ed-more" type="button" data-toggle="' + id + '">' + esc(label || '\u2699 Детали и доп. поля') + '</button><div class="ed-details hidden" id="' + id + '">' + inner + '</div>'; }
  function dField(label, path, area) { var v = val(path); var isId = /\.id$/.test(path); return '<div class="ed-field' + (isId ? ' ed-id' : '') + '"><label>' + esc(label) + '</label>' + (area ? '<textarea data-path="' + esc(path) + '">' + esc(v) + '</textarea>' : '<input data-path="' + esc(path) + '" value="' + esc(v) + '">') + '</div>'; }
  function dLoc(label, base, area) { return dField(label + ' (EN)', base + '.en', area) + dField(label + ' (RU)', base + '.ru', area); }
  function dSelect(label, path, cur, opts) { var o = opts.map(function (op) { return '<option value="' + esc(op[0]) + '"' + (String(cur) === String(op[0]) ? ' selected' : '') + '>' + esc(op[1]) + '</option>'; }).join(''); return '<div class="ed-field"><label>' + esc(label) + '</label><select data-path="' + esc(path) + '">' + o + '</select></div>'; }
  function selMove(attr, base, cur, opts) { var o = opts.map(function (op) { return '<option value="' + esc(op[0]) + '"' + (String(cur) === String(op[0]) ? ' selected' : '') + '>' + esc(op[1]) + '</option>'; }).join(''); return '<select ' + attr + '="' + esc(base) + '">' + o + '</select>'; }

  // ---------- templates ----------
  function newSkill() { return { _uid: uid(), id: '', n: lm(), d: lm(), cd: '', mp: '', b: lm() }; }
  function newClass() { return { _uid: uid(), id: '', key: '', icon: '\u2728', name: lm(), role: lm(), desc: lm(), actives: [], passives: [] }; }
  function newMonster() { return { _uid: uid(), id: '', icon: '\ud83d\udc7e', threat: 'mid', hp: '', dmg: '', extra: lm(), name: lm(), lore: lm(), abilities: [], counter: lm() }; }
  function newAbility() { return { n: lm(), d: lm() }; }
  function newItem() { return { _uid: uid(), id: '', n: lm(), s: lm(), d: lm() }; }
  function newFragment() { return { v: '', n: lm(), d: lm() }; }
  function newCategory() { return { _uid: uid(), key: '', icon: '\ud83d\udce6', name: lm(), note: lm(), tiers: { common: [], rare: [], epic: [], legendary: [] } }; }

  // ======================================================================
  //  РЕНДЕР: КЛАССЫ (как classes.html)
  // ======================================================================
  function skillEd(c, ci, group, si, s) {
    var base = 'classes.' + ci + '.' + group + '.' + si;
    return '<div class="skill skill--link' + (group === 'passives' ? ' skill--passive' : '') + '">' + delBtn('del-skill', { i: ci, g: group, j: si }) +
      '<div class="skill__head">' + iconHtml('skills', s._uid, s.id, c.icon, 'dr-ic--sm') +
        '<span class="skill__name">' + edLoc(base + '.n') + '</span>' +
        '<span class="skill__cost"><span class="skill__cd">\u23f1 ' + edInput(base + '.cd', 'ed-input--sm') + ' ' + esc(t('unit.sec')) + '</span>' +
        '<span class="skill__mp">\u25c6 ' + edInput(base + '.mp', 'ed-input--sm') + ' ' + esc(t('unit.mana')) + '</span></span>' +
      '</div>' +
      '<div class="skill__desc">' + edLocArea(base + '.d') + '</div>' +
      '<button class="ed-more" type="button" data-act="edit-skill" data-uid="' + s._uid + '">\u270e Открыть карточку</button>' +
    '</div>';
  }
  function findSkill(uidv) {
    var res = null;
    DATA.classes.forEach(function (c, ci) { ['actives', 'passives'].forEach(function (group) { (c[group] || []).forEach(function (s, si) { if (s._uid === uidv) res = { c: c, ci: ci, group: group, si: si, s: s, base: 'classes.' + ci + '.' + group + '.' + si }; }); }); });
    return res;
  }
  function renderSkillPage(o) {
    var c = o.c, s = o.s, base = o.base;
    var classOpts = DATA.classes.map(function (cc, idx) { return [String(idx), (cc.icon || '') + ' ' + (Lv(cc.name) || cc.key || ('класс ' + idx))]; });
    var groupOpts = [['actives', 'Активный'], ['passives', 'Пассивный']];
    return '<button class="ed-add ed-add--sm" type="button" data-act="close-skill" style="margin:0 0 18px">\u2190 Назад к классам</button>' +
      '<div class="b-card item-edit"><div class="item-edit__head">' +
        iconHtml('skills', s._uid, s.id, c.icon, 'dr-ic--lg') +
        '<div class="item-edit__title"><div class="loot-item__name">' + edLoc(base + '.n') + '</div>' +
        '<div class="loot-item__meta">' + esc(o.group === 'passives' ? 'Пассивный навык' : 'Активный навык') + ' \u00b7 ' + esc(Lv(c.name) || c.key || '') + '</div></div>' +
      '</div>' +
      '<div class="ed-row"><div class="ed-field ed-id"><label>ID навыка (= ID из Unity)</label><input data-path="' + base + '.id" value="' + esc(s.id || '') + '"></div></div>' +
      '<div class="ed-row"><div class="ed-field"><label>Класс</label>' + selMove('data-move-skill-class', base, String(o.ci), classOpts) + '</div>' +
        '<div class="ed-field"><label>Тип</label>' + selMove('data-move-skill-group', base, o.group, groupOpts) + '</div></div>' +
      '<div class="ed-row"><div class="ed-field"><label>\u23f1 Кулдаун (сек)</label><input data-path="' + base + '.cd" value="' + esc(s.cd || '') + '"></div>' +
        '<div class="ed-field"><label>\u25c6 Мана</label><input data-path="' + base + '.mp" value="' + esc(s.mp || '') + '"></div></div>' +
      '<div class="ed-row">' + dLoc('Название', base + '.n') + '</div>' +
      '<div class="ed-row one">' + dLoc('Описание', base + '.d', true) + '</div>' +
      '<div class="ed-row one">' + dLoc('Бонус / улучшение ветки', base + '.b', true) + '</div>' +
      '<button class="ed-add ed-add--sm" type="button" data-act="del-skill" data-i="' + o.ci + '" data-g="' + o.group + '" data-j="' + o.si + '" style="margin-top:6px;color:#ffb4b4;border-color:#5c2b2b">\u2715 Удалить навык</button>' +
    '</div>';
  }
  function classCardEd(c, ci) {
    var base = 'classes.' + ci;
    var actives = (c.actives || []).map(function (s, si) { return skillEd(c, ci, 'actives', si, s); }).join('');
    var passives = (c.passives || []).map(function (s, si) { return skillEd(c, ci, 'passives', si, s); }).join('');
    var det = moreBlock('<div class="ed-row"><div class="ed-field ed-id"><label>ID класса (стабильный)</label><input data-path="' + base + '.id" value="' + esc(c.id || '') + '"></div><div class="ed-field"><label>key (внутренний)</label><input data-path="' + base + '.key" value="' + esc(c.key || '') + '"></div></div>');
    return '<article class="class-card">' + delBtn('del-class', { i: ci }) +
      '<div class="class-card__head"><span class="class-card__icon"><input class="ed-input ed-emoji" data-path="' + base + '.icon" value="' + esc(c.icon || '') + '"></span>' +
        '<div style="flex:1"><h3>' + edLoc(base + '.name') + '</h3><span class="pill pill--role">' + edLoc(base + '.role') + '</span></div></div>' +
      '<p class="class-card__lore">' + edLocArea(base + '.desc') + '</p>' +
      '<div class="skill-group"><h4>' + esc(t('ui.activeSkills')) + '</h4>' + actives +
        '<button class="ed-add ed-add--sm" type="button" data-act="add-skill" data-i="' + ci + '" data-g="actives">+ активный навык</button></div>' +
      '<div class="skill-group"><h4>' + esc(t('ui.passiveSkills')) + '</h4>' + passives +
        '<button class="ed-add ed-add--sm" type="button" data-act="add-skill" data-i="' + ci + '" data-g="passives">+ пассивный навык</button></div>' +
      det +
    '</article>';
  }
  function renderClasses() {
    if (editSkillUid) { var so = findSkill(editSkillUid); if (so) return renderSkillPage(so); editSkillUid = null; }
    var note = '<div class="formula-note"><strong>' + esc(t('ui.formulaNote')) + '</strong> ' + edLocArea('formulaNote') + '</div>';
    var cards = DATA.classes.map(classCardEd).join('');
    cards += '<button class="ed-add" type="button" data-act="add-class">\u2726 Добавить класс</button>';
    return note + '<div class="grid grid--classes">' + cards + '</div>';
  }

  // ======================================================================
  //  РЕНДЕР: БЕСТИАРИЙ (как bestiary.html)
  // ======================================================================
  function monCardEd(m, mi) {
    var base = 'monsters.' + mi;
    return '<div class="mon-card" data-threat="' + esc(m.threat) + '">' + delBtn('del-monster', { i: mi }) +
      '<div class="mon-card__top">' + iconHtml('monsters', m._uid, m.id, m.icon || '\ud83d\udc7e', 'dr-ic--md') +
        '<span class="pill pill--' + esc(m.threat) + '">' + esc(t('threat.' + m.threat)) + '</span></div>' +
      '<h3 class="mon-card__name">' + edLoc(base + '.name') + '</h3>' +
      '<div class="mon-card__stats"><span class="stat stat--hp">\u2764 ' + edInput(base + '.hp', 'ed-input--sm') + '</span>' +
        '<span class="stat stat--dmg">\u2694 ' + edInput(base + '.dmg', 'ed-input--sm') + '</span></div>' +
      '<p class="mon-card__lore">' + edLocArea(base + '.lore') + '</p>' +
      '<button class="ed-more" type="button" data-act="edit-monster" data-uid="' + m._uid + '">\u270e Открыть карточку</button>' +
    '</div>';
  }
  function findMonster(uidv) {
    var res = null;
    DATA.monsters.forEach(function (m, mi) { if (m._uid === uidv) res = { m: m, mi: mi, base: 'monsters.' + mi }; });
    return res;
  }
  function renderMonsterPage(o) {
    var m = o.m, base = o.base, mi = o.mi;
    var abils = (m.abilities || []).map(function (a, ai) {
      var ab = base + '.abilities.' + ai;
      return '<div class="ed-sub" style="position:relative">' + delBtn('del-ability', { i: mi, j: ai }) +
        '<div class="ed-row">' + dLoc('Название способности', ab + '.n') + '</div>' +
        '<div class="ed-row one">' + dLoc('Описание способности', ab + '.d', true) + '</div></div>';
    }).join('');
    return '<button class="ed-add ed-add--sm" type="button" data-act="close-monster" style="margin:0 0 18px">\u2190 Назад к бестиарию</button>' +
      '<div class="b-card item-edit"><div class="item-edit__head">' +
        iconHtml('monsters', m._uid, m.id, m.icon || '\ud83d\udc7e', 'dr-ic--lg') +
        '<div class="item-edit__title"><div class="loot-item__name">' + edLoc(base + '.name') + '</div>' +
        '<div class="loot-item__meta"><span class="pill pill--' + esc(m.threat) + '">' + esc(t('threat.' + m.threat)) + '</span></div></div>' +
      '</div>' +
      '<div class="ed-row"><div class="ed-field ed-id"><label>ID (= ID из Unity)</label><input data-path="' + base + '.id" value="' + esc(m.id || '') + '"></div>' + dSelect('Угроза', base + '.threat', m.threat, THREATS) + '</div>' +
      '<div class="ed-row"><div class="ed-field"><label>Иконка (эмодзи, запасная)</label><input data-path="' + base + '.icon" value="' + esc(m.icon || '') + '"></div>' +
        '<div class="ed-field"><label>\u2764 HP</label><input data-path="' + base + '.hp" value="' + esc(m.hp || '') + '"></div>' +
        '<div class="ed-field"><label>\u2694 Урон</label><input data-path="' + base + '.dmg" value="' + esc(m.dmg || '') + '"></div></div>' +
      '<div class="ed-row">' + dLoc('Название', base + '.name') + '</div>' +
      '<div class="ed-row">' + dLoc('Доп. параметр (напр. кристалл)', base + '.extra') + '</div>' +
      '<div class="ed-row one">' + dLoc('Лор', base + '.lore', true) + '</div>' +
      '<div class="ed-row one">' + dLoc('Как победить', base + '.counter', true) + '</div>' +
      '<div class="ed-sub"><label style="display:block;font-size:.64rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink-faint);margin-bottom:6px">Способности</label>' + abils +
        '<button class="ed-add ed-add--sm" type="button" data-act="add-ability" data-i="' + mi + '">+ способность</button></div>' +
      '<button class="ed-add ed-add--sm" type="button" data-act="del-monster" data-i="' + mi + '" style="margin-top:6px;color:#ffb4b4;border-color:#5c2b2b">\u2715 Удалить монстра</button>' +
    '</div>';
  }
  function renderBestiary() {
    if (editMonUid) { var mo = findMonster(editMonUid); if (mo) return renderMonsterPage(mo); editMonUid = null; }
    var mons = DATA.monsters.map(monCardEd).join('');
    mons += '<button class="ed-add" type="button" data-act="add-monster">\u2726 Добавить монстра</button>';
    return '<div class="grid grid--mons">' + mons + '</div>';
  }

  // ======================================================================
  //  РЕНДЕР: ЛУТ (как loot.html)
  // ======================================================================
  function lootCardEd(o) {
    var it = o.it, base = o.base;
    return '<div class="loot-item rar-' + esc(o.rar) + '">' + delBtn('del-item', { i: o.ci, g: o.rar, j: (+base.split('.').pop()) }) +
      iconHtml('items', it._uid, it.id, o.cat.icon, 'dr-ic--md rar-frame rar-' + esc(o.rar)) +
      '<div class="loot-item__body">' +
        '<div class="loot-item__name">' + edLoc(base + '.n') + '</div>' +
        '<div class="loot-item__stat">' + edLoc(base + '.s') + '</div>' +
        '<div class="loot-item__meta">' + esc(o.cat.icon || '') + ' ' + esc(Lv(o.cat.name)) + ' \u00b7 ' + esc(t('rarityOne.' + o.rar)) + '</div>' +
        '<button class="ed-more" type="button" data-act="edit-item" data-uid="' + it._uid + '">\u270e Открыть карточку</button>' +
      '</div>' +
    '</div>';
  }
  function renderItemPage(o) {
    var it = o.it, base = o.base;
    var catOpts = DATA.loot.categories.map(function (c, idx) { return [String(idx), (c.icon || '') + ' ' + (Lv(c.name) || c.key || ('кат.' + idx))]; });
    var rarOpts = RTIERS.map(function (r) { return [r, t('rarity.' + r)]; });
    return '<button class="ed-add ed-add--sm" type="button" data-act="close-item" style="margin:0 0 18px">\u2190 Назад к предметам</button>' +
      '<div class="b-card item-edit"><div class="item-edit__head">' +
        iconHtml('items', it._uid, it.id, o.cat.icon, 'dr-ic--lg rar-frame rar-' + esc(o.rar)) +
        '<div class="item-edit__title"><div class="loot-item__name">' + edLoc(base + '.n') + '</div>' +
        '<div class="loot-item__meta">' + esc(o.cat.icon || '') + ' ' + esc(Lv(o.cat.name)) + ' \u00b7 ' + esc(t('rarityOne.' + o.rar)) + '</div></div>' +
      '</div>' +
      '<div class="ed-row"><div class="ed-field ed-id"><label>ID (= ID из Unity)</label><input data-path="' + base + '.id" value="' + esc(it.id || '') + '"></div></div>' +
      '<div class="ed-row"><div class="ed-field"><label>Категория</label>' + selMove('data-move-cat', base, String(o.ci), catOpts) + '</div>' +
        '<div class="ed-field"><label>Редкость</label>' + selMove('data-move-rar', base, o.rar, rarOpts) + '</div></div>' +
      '<div class="ed-row">' + dLoc('Название', base + '.n') + '</div>' +
      '<div class="ed-row">' + dLoc('Характеристика (кратко)', base + '.s') + '</div>' +
      '<div class="ed-row one">' + dLoc('Описание', base + '.d', true) + '</div>' +
      '<button class="ed-add ed-add--sm" type="button" data-act="del-item" data-i="' + o.ci + '" data-g="' + o.rar + '" data-j="' + o.ii + '" style="margin-top:6px;color:#ffb4b4;border-color:#5c2b2b">\u2715 Удалить предмет</button>' +
    '</div>';
  }
  function findItem(uidv) {
    var res = null;
    DATA.loot.categories.forEach(function (cat, ci) { RTIERS.forEach(function (r) { (cat.tiers && cat.tiers[r] || []).forEach(function (it, ii) { if (it._uid === uidv) res = { it: it, ci: ci, rar: r, ii: ii, cat: cat, base: 'loot.categories.' + ci + '.tiers.' + r + '.' + ii }; }); }); });
    return res;
  }
  function catEditEd(cat, ci) {
    var b = 'loot.categories.' + ci;
    return '<div class="b-card" style="position:relative">' + delBtn('del-cat', { i: ci }) +
      '<div class="ed-row"><div class="ed-field"><label>key (напр. relics)</label><input data-path="' + b + '.key" value="' + esc(cat.key || '') + '"></div>' +
        '<div class="ed-field"><label>Иконка (эмодзи)</label><input data-path="' + b + '.icon" value="' + esc(cat.icon || '') + '"></div></div>' +
      '<div class="ed-row">' + dLoc('Название категории', b + '.name') + '</div>' +
      '<div class="ed-row one">' + dLoc('Примечание', b + '.note', true) + '</div></div>';
  }
  function renderLoot() {
    if (editItemUid) { var eo = findItem(editItemUid); if (eo) return renderItemPage(eo); editItemUid = null; }
    var intro = '<div class="loot-intro">' + edLocArea('loot.rarityIntro') + '</div>';
    var frags = (DATA.loot.fragments || []).map(function (f, fi) {
      var b = 'loot.fragments.' + fi;
      return '<div class="frag" style="position:relative">' + delBtn('del-frag', { i: fi }) +
        '<span class="frag__v">' + edInput(b + '.v', 'ed-input--sm') + '</span>' +
        '<span class="frag__n">' + edLoc(b + '.n') + '</span>' +
        '<span class="frag__d">' + edLoc(b + '.d') + '</span></div>';
    }).join('');
    var fragBox = '<div class="frag-box"><h3>' + esc(t('ui.soulShards')) + '</h3><p>' + esc(t('ui.soulShardsDesc')) + '</p>' +
      '<div class="frag-row">' + frags + '<button class="ed-add ed-add--sm" type="button" data-act="add-frag">+ фрагмент</button></div></div>';

    var items = [];
    DATA.loot.categories.forEach(function (cat, ci) { RTIERS.forEach(function (r) { (cat.tiers && cat.tiers[r] || []).forEach(function (it, ii) { items.push({ it: it, base: 'loot.categories.' + ci + '.tiers.' + r + '.' + ii, ci: ci, rar: r, cat: cat }); }); }); });
    items.sort(function (a, b) { return (RORDER[a.rar] - RORDER[b.rar]); });
    var grid = items.map(lootCardEd).join('');
    grid += '<button class="ed-add" type="button" data-act="add-item" data-i="0" data-g="common">\u2726 Добавить предмет</button>';

    var cats = DATA.loot.categories.map(catEditEd).join('');
    var catMgmt = '<div style="margin-top:34px"><h2 style="font-family:var(--display);color:var(--gold-lt)">Категории предметов</h2>' +
      '<p class="count" style="margin:-6px 0 14px">Добавляйте/переименовывайте категории. Категория и редкость предмета меняются на его странице.</p>' + cats +
      '<button class="ed-add ed-add--sm" type="button" data-act="add-cat">+ добавить категорию</button></div>';

    return intro + fragBox + '<div class="loot-grid">' + grid + '</div>' + catMgmt;
  }

  // ======================================================================
  //  РЕНДЕР: ИМПОРТ / ЭКСПОРТ
  // ======================================================================
  function renderImport() {
    return '<div class="b-note">Импорт из Unity. Вставьте <b>JSON-массив</b> объектов, экспортированный из игры. Совпадение по <code>id</code> — запись обновится; новый <code>id</code> — добавится. Поля (с синонимами): <code>id</code>, <code>name</code>/<code>nameEn</code>/<code>nameRu</code>, <code>desc</code>/<code>descEn</code>/<code>descRu</code>, навыки — <code>cd</code>/<code>cooldown</code>, <code>mp</code>/<code>mana</code>; монстры — <code>hp</code>, <code>dmg</code>/<code>damage</code>, <code>threat</code>, <code>counter</code>; предметы — <code>rarity</code>, <code>category</code>.</div>' +
      '<div class="b-card"><div class="ed-row">' +
      dSelect('Тип данных', 'imp.type', getPath(DATA, 'imp.type') || 'skills', [['skills', 'Навыки'], ['monsters', 'Монстры'], ['items', 'Предметы']]) +
      '<div class="ed-field"><label>Новые записи добавить в…</label><select id="imp-target"></select></div></div>' +
      '<div class="f"><label>JSON из Unity</label><textarea id="imp-json" placeholder="Вставьте сюда JSON-массив из Unity…"></textarea></div>' +
      '<div class="btn-row"><button class="btn btn--gold" type="button" data-act="do-import">Импортировать</button></div>' +
      '<div id="imp-result" style="margin-top:12px"></div></div>';
  }
  function fillImportTarget() {
    var type = getPath(DATA, 'imp.type') || 'skills';
    var sel = document.getElementById('imp-target'); if (!sel) return;
    var opts = '';
    if (type === 'skills') opts = DATA.classes.map(function (c, i) { return '<option value="' + i + '">' + esc(Lv(c.name) || c.key || ('класс ' + i)) + '</option>'; }).join('');
    else if (type === 'items') { DATA.loot.categories.forEach(function (c, i) { RTIERS.forEach(function (r) { opts += '<option value="' + i + ':' + r + '">' + esc(Lv(c.name) || c.key) + ' \u00b7 ' + r + '</option>'; }); }); }
    else opts = '<option value="-">(монстры добавляются в общий список)</option>';
    sel.innerHTML = opts;
  }
  function countItems() { return DATA.loot.categories.reduce(function (n, c) { return n + RTIERS.reduce(function (m, r) { return m + (c.tiers && c.tiers[r] || []).length; }, 0); }, 0); }
  function renderExport() {
    var skills = DATA.classes.reduce(function (n, c) { return n + (c.actives || []).length + (c.passives || []).length; }, 0);
    return '<div class="b-card"><h3>Экспорт контента</h3>' +
      '<p class="count">Классов: ' + DATA.classes.length + ' \u00b7 навыков: ' + skills + ' \u00b7 монстров: ' + DATA.monsters.length + ' \u00b7 предметов: ' + countItems() + ' \u00b7 прикреплено иконок: ' + Object.keys(ICONS).length + '</p>' +
      '<p>Скачайте <b>ZIP</b> и распакуйте его в корень папки сайта (перезапишет <code>content.js</code>/<code>content.json</code> и добавит иконки в <code>assets/icons/…</code>). Затем залейте сайт на Netlify.</p>' +
      '<div class="btn-row">' +
      '<button class="btn btn--gold" type="button" data-act="export-zip">\u2b07 Скачать ZIP (контент + иконки)</button>' +
      '<button class="btn" type="button" data-act="export-js">\u2b07 только content.js</button>' +
      '<button class="btn" type="button" data-act="export-json">\u2b07 только content.json</button>' +
      '</div>' +
      '<p class="warn" style="margin-top:14px">\u26a0 Убедитесь, что у каждой записи в «Деталях» заполнен <b>ID</b> (латиница/цифры/дефис) — по нему подхватывается иконка <code>&lt;id&gt;.png</code>.</p></div>';
  }

  // ---------- clean export ----------
  function nonEmptyLM(o) { return o && ((o.en && o.en.trim()) || (o.ru && o.ru.trim())); }
  function cleanSkill(s) { var o = { id: s.id || '', n: s.n || lm(), d: s.d || lm() }; if (s.cd != null && String(s.cd).trim() !== '') o.cd = s.cd; if (s.mp != null && String(s.mp).trim() !== '') o.mp = s.mp; if (nonEmptyLM(s.b)) o.b = s.b; return o; }
  function buildContent() {
    return {
      formulaNote: DATA.formulaNote,
      classes: DATA.classes.map(function (c) { return { id: c.id || '', key: c.key || '', icon: c.icon || '', name: c.name || lm(), role: c.role || lm(), desc: c.desc || lm(), actives: (c.actives || []).map(cleanSkill), passives: (c.passives || []).map(cleanSkill) }; }),
      monsters: DATA.monsters.map(function (m) { var o = { id: m.id || '', icon: m.icon || '', threat: m.threat || 'mid', hp: m.hp || '', dmg: m.dmg || '', name: m.name || lm(), lore: m.lore || lm() }; if (nonEmptyLM(m.extra)) o.extra = m.extra; o.abilities = (m.abilities || []).map(function (a) { return { n: a.n || lm(), d: a.d || lm() }; }); if (nonEmptyLM(m.counter)) o.counter = m.counter; return o; }),
      loot: {
        rarityIntro: DATA.loot.rarityIntro,
        fragments: (DATA.loot.fragments || []).map(function (f) { var o = { v: f.v || '', n: f.n || lm() }; if (nonEmptyLM(f.d)) o.d = f.d; return o; }),
        categories: DATA.loot.categories.map(function (cat) {
          var tr = {}; RTIERS.forEach(function (r) { tr[r] = (cat.tiers && cat.tiers[r] || []).map(function (it) { var o = { id: it.id || '', n: it.n || lm() }; if (nonEmptyLM(it.s)) o.s = it.s; if (nonEmptyLM(it.d)) o.d = it.d; return o; }); });
          return { key: cat.key || '', icon: cat.icon || '', name: cat.name || lm(), note: cat.note || lm(), tiers: tr };
        })
      }
    };
  }
  function contentJsString() { var header = '/* content.js — ЕДИНЫЙ ИСТОЧНИК КОНТЕНТА (сгенерировано конструктором).\n   id — СТАБИЛЬНЫЙ идентификатор. Иконка = assets/icons/<тип>/<id>.png. */\n'; return header + 'window.DR_CONTENT = ' + JSON.stringify(buildContent(), null, 2) + ';\n'; }

  // ---------- ZIP (store, без зависимостей) ----------
  var _crc;
  function crc32(bytes) { if (!_crc) { _crc = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); _crc[n] = c >>> 0; } } var crc = 0xFFFFFFFF; for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ _crc[(crc ^ bytes[i]) & 0xFF]; return (crc ^ 0xFFFFFFFF) >>> 0; }
  function u16(n) { return [n & 255, (n >>> 8) & 255]; }
  function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }
  function zipStore(files) {
    var enc = new TextEncoder(); var parts = []; var central = []; var offset = 0;
    files.forEach(function (f) {
      var nameB = enc.encode(f.name); var data = f.bytes; var crc = crc32(data);
      var lh = [].concat(u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameB.length), u16(0));
      var lhb = new Uint8Array(lh.length + nameB.length); lhb.set(lh, 0); lhb.set(nameB, lh.length);
      parts.push(lhb); parts.push(data);
      var ch = [].concat(u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameB.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset));
      var chb = new Uint8Array(ch.length + nameB.length); chb.set(ch, 0); chb.set(nameB, ch.length); central.push(chb);
      offset += lhb.length + data.length;
    });
    var cSize = central.reduce(function (n, c) { return n + c.length; }, 0);
    var end = new Uint8Array([].concat(u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cSize), u32(offset), u16(0)));
    return new Blob(parts.concat(central).concat([end]), { type: 'application/zip' });
  }
  function download(blob, name) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
  function iconEntries() {
    var map = [];
    DATA.classes.forEach(function (c) { (c.actives || []).concat(c.passives || []).forEach(function (s) { if (ICONS[s._uid]) map.push({ uid: s._uid, kind: 'skills', id: s.id }); }); });
    DATA.monsters.forEach(function (m) { if (ICONS[m._uid]) map.push({ uid: m._uid, kind: 'monsters', id: m.id }); });
    DATA.loot.categories.forEach(function (cat) { RTIERS.forEach(function (r) { (cat.tiers && cat.tiers[r] || []).forEach(function (it) { if (ICONS[it._uid]) map.push({ uid: it._uid, kind: 'items', id: it.id }); }); }); });
    return map;
  }
  function exportZip() {
    var enc = new TextEncoder();
    var files = [{ name: 'content.js', bytes: enc.encode(contentJsString()) }, { name: 'content.json', bytes: enc.encode(JSON.stringify(buildContent(), null, 2) + '\n') }];
    var icons = iconEntries();
    var pending = icons.length; if (!pending) { download(zipStore(files), 'dungeon-relics-content.zip'); toast('ZIP скачан (без иконок)', 'ok'); return; }
    icons.forEach(function (e) {
      ICONS[e.uid].file.arrayBuffer().then(function (buf) {
        files.push({ name: 'assets/icons/' + e.kind + '/' + (e.id || e.uid) + '.png', bytes: new Uint8Array(buf) });
        if (--pending === 0) { download(zipStore(files), 'dungeon-relics-content.zip'); toast('ZIP скачан: контент + ' + icons.length + ' иконок', 'ok'); }
      });
    });
  }

  // ---------- File System Access API: сохранение прямо в папку сайта ----------
  var dirHandle = null;
  function idbOpen() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open('dr-builder', 1);
      r.onupgradeneeded = function () { r.result.createObjectStore('kv'); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
  }
  function idbSet(k, v) { return idbOpen().then(function (db) { return new Promise(function (res, rej) { var tx = db.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = function () { res(); }; tx.onerror = function () { rej(tx.error); }; }); }); }
  function idbGet(k) { return idbOpen().then(function (db) { return new Promise(function (res, rej) { var tx = db.transaction('kv', 'readonly'); var rq = tx.objectStore('kv').get(k); rq.onsuccess = function () { res(rq.result); }; rq.onerror = function () { rej(rq.error); }; }); }); }
  function verifyPermission(handle) {
    var opts = { mode: 'readwrite' };
    return handle.queryPermission(opts).then(function (p) {
      if (p === 'granted') return true;
      return handle.requestPermission(opts).then(function (p2) { return p2 === 'granted'; });
    });
  }
  function pickFolder() {
    if (!window.showDirectoryPicker) { toast('Браузер не поддерживает прямое сохранение. Нужен Chrome/Edge или используйте ZIP.', 'warn'); return Promise.resolve(null); }
    return window.showDirectoryPicker({ id: 'dr-site-root', mode: 'readwrite' }).then(function (h) {
      dirHandle = h;
      return idbSet('siteDir', h).then(function () { toast('Папка сайта подключена: ' + (h.name || ''), 'ok'); buildPanel(); return h; });
    }).catch(function (e) { if (e && e.name === 'AbortError') return null; toast('Не удалось выбрать папку: ' + (e && e.message), 'warn'); return null; });
  }
  function ensureDir() {
    if (dirHandle) return verifyPermission(dirHandle).then(function (ok) { return ok ? dirHandle : null; });
    return idbGet('siteDir').then(function (h) {
      if (!h) return null;
      dirHandle = h;
      return verifyPermission(h).then(function (ok) { if (ok) buildPanel(); return ok ? h : null; });
    }).catch(function () { return null; });
  }
  function writeFileToDir(dir, path, bytes) {
    var parts = path.split('/'); var fname = parts.pop();
    var chain = Promise.resolve(dir);
    parts.forEach(function (seg) { chain = chain.then(function (d) { return d.getDirectoryHandle(seg, { create: true }); }); });
    return chain.then(function (d) { return d.getFileHandle(fname, { create: true }); }).then(function (fh) { return fh.createWritable(); }).then(function (w) { return Promise.resolve(w.write(bytes)).then(function () { return w.close(); }); });
  }
  function saveToFolder() {
    if (!window.showDirectoryPicker) { toast('Браузер не поддерживает прямое сохранение. Нужен Chrome/Edge или используйте ZIP.', 'warn'); return; }
    ensureDir().then(function (dir) {
      if (!dir) { return pickFolder().then(function (h) { if (h) saveToFolder(); }); }
      var enc = new TextEncoder();
      var jobs = [
        writeFileToDir(dir, 'content.js', enc.encode(contentJsString())),
        writeFileToDir(dir, 'content.json', enc.encode(JSON.stringify(buildContent(), null, 2) + '\n'))
      ];
      var icons = iconEntries();
      icons.forEach(function (e) { jobs.push(ICONS[e.uid].file.arrayBuffer().then(function (buf) { return writeFileToDir(dir, 'assets/icons/' + e.kind + '/' + (e.id || e.uid) + '.png', new Uint8Array(buf)); })); });
      return Promise.all(jobs).then(function () { toast('Сохранено в папку сайта: content.js/.json' + (icons.length ? ' + ' + icons.length + ' иконок' : ''), 'ok'); });
    }).catch(function (e) { toast('Ошибка записи: ' + (e && e.message), 'warn'); });
  }

  // ---------- import ----------
  function pickLM(obj, keysEn, keysRu) {
    var en, ru; keysEn.forEach(function (k) { if (en == null && obj[k] != null) en = obj[k]; });
    keysRu.forEach(function (k) { if (ru == null && obj[k] != null) ru = obj[k]; });
    if (obj.name && typeof obj.name === 'object') { en = en != null ? en : obj.name.en; ru = ru != null ? ru : obj.name.ru; }
    return { en: en != null ? String(en) : '', ru: ru != null ? String(ru) : (en != null ? String(en) : '') };
  }
  function first(obj, keys) { for (var i = 0; i < keys.length; i++) { if (obj[keys[i]] != null) return obj[keys[i]]; } return undefined; }
  function doImport() {
    var type = getPath(DATA, 'imp.type') || 'skills';
    var raw = (document.getElementById('imp-json') || {}).value || '';
    var arr; try { arr = JSON.parse(raw); } catch (e) { document.getElementById('imp-result').innerHTML = '<div class="warn">Ошибка JSON: ' + esc(e.message) + '</div>'; return; }
    if (!Array.isArray(arr)) { document.getElementById('imp-result').innerHTML = '<div class="warn">Ожидался массив [ ... ].</div>'; return; }
    var upd = 0, add = 0, target = (document.getElementById('imp-target') || {}).value;
    arr.forEach(function (o) {
      var id = String(first(o, ['id', 'ID', 'Id', 'key', 'slug']) || '').trim();
      var name = pickLM(o, ['nameEn', 'name_en', 'NameEn', 'title', 'name'], ['nameRu', 'name_ru', 'NameRu']);
      var desc = pickLM(o, ['descEn', 'desc_en', 'description', 'desc'], ['descRu', 'desc_ru']);
      if (type === 'skills') {
        var s = null; DATA.classes.forEach(function (c) { (c.actives || []).concat(c.passives || []).forEach(function (x) { if (id && x.id === id) s = x; }); });
        if (s) { s.n = name; if (nonEmptyLM(desc)) s.d = desc; var cd = first(o, ['cd', 'cooldown']); if (cd != null) s.cd = String(cd); var mp = first(o, ['mp', 'mana', 'cost']); if (mp != null) s.mp = String(mp); upd++; }
        else { var ns = newSkill(); ns.id = id; ns.n = name; ns.d = desc; var cd2 = first(o, ['cd', 'cooldown']); if (cd2 != null) ns.cd = String(cd2); var mp2 = first(o, ['mp', 'mana', 'cost']); if (mp2 != null) ns.mp = String(mp2); (DATA.classes[+target] || DATA.classes[0]).actives.push(ns); add++; }
      } else if (type === 'monsters') {
        var m = null; DATA.monsters.forEach(function (x) { if (id && x.id === id) m = x; });
        var hp = first(o, ['hp', 'health']), dmg = first(o, ['dmg', 'damage']), threat = first(o, ['threat']), counter = pickLM(o, ['counterEn', 'counter'], ['counterRu']);
        if (m) { m.name = name; if (nonEmptyLM(desc)) m.lore = desc; if (hp != null) m.hp = String(hp); if (dmg != null) m.dmg = String(dmg); if (threat) m.threat = String(threat); if (nonEmptyLM(counter)) m.counter = counter; upd++; }
        else { var nm = newMonster(); nm.id = id; nm.name = name; nm.lore = desc; if (hp != null) nm.hp = String(hp); if (dmg != null) nm.dmg = String(dmg); if (threat) nm.threat = String(threat); if (nonEmptyLM(counter)) nm.counter = counter; DATA.monsters.push(nm); add++; }
      } else {
        var it = null; DATA.loot.categories.forEach(function (c) { RTIERS.forEach(function (r) { (c.tiers[r] || []).forEach(function (x) { if (id && x.id === id) it = x; }); }); });
        var stat = pickLM(o, ['statEn', 'stat', 's'], ['statRu']);
        if (it) { it.n = name; if (nonEmptyLM(desc)) it.d = desc; if (nonEmptyLM(stat)) it.s = stat; upd++; }
        else { var ni = newItem(); ni.id = id; ni.n = name; ni.d = desc; if (nonEmptyLM(stat)) ni.s = stat; var tg = (target || '0:common').split(':'); var cat = DATA.loot.categories[+tg[0]] || DATA.loot.categories[0]; (cat.tiers[tg[1]] || cat.tiers.common).push(ni); add++; }
      }
    });
    document.getElementById('imp-result').innerHTML = '<div class="ok">Импорт готов: обновлено ' + upd + ', добавлено ' + add + '. Проверьте вкладки и сделайте экспорт.</div>';
    toast('Импортировано: +' + add + ', ~' + upd, 'ok');
  }

  // ---------- перемещение предмета ----------
  function moveItem(base, newCat, newRar) {
    var m = base.match(/^loot\.categories\.(\d+)\.tiers\.(\w+)\.(\d+)$/); if (!m) return;
    var ci = +m[1], rar = m[2], ii = +m[3];
    var cat = DATA.loot.categories[ci]; var it = cat.tiers[rar][ii]; if (!it) return;
    cat.tiers[rar].splice(ii, 1);
    var destCat = newCat != null ? DATA.loot.categories[newCat] : cat;
    var destRar = newRar != null ? newRar : rar;
    destCat.tiers[destRar] = destCat.tiers[destRar] || []; destCat.tiers[destRar].push(it);
    render(); toast('Предмет перемещён');
  }
  function moveSkill(base, newCi, newGroup) {
    var m = base.match(/^classes\.(\d+)\.(actives|passives)\.(\d+)$/); if (!m) return;
    var ci = +m[1], group = m[2], si = +m[3];
    var s = DATA.classes[ci][group][si]; if (!s) return;
    DATA.classes[ci][group].splice(si, 1);
    var destC = newCi != null ? DATA.classes[newCi] : DATA.classes[ci];
    var destG = newGroup != null ? newGroup : group;
    destC[destG] = destC[destG] || []; destC[destG].push(s);
    render(); toast('Навык перемещён');
  }

  // ---------- actions ----------
  function handleAct(b) {
    var act = b.getAttribute('data-act');
    var i = b.getAttribute('data-i'), g = b.getAttribute('data-g'), j = b.getAttribute('data-j');
    if (act === 'add-class') { DATA.classes.push(newClass()); render(); }
    else if (act === 'del-class') { if (confirm('Удалить класс со всеми навыками?')) { DATA.classes.splice(+i, 1); render(); } }
    else if (act === 'add-skill') { DATA.classes[+i][g].push(newSkill()); render(); }
    else if (act === 'del-skill') { DATA.classes[+i][g].splice(+j, 1); editSkillUid = null; render(); }
    else if (act === 'edit-skill') { editSkillUid = b.getAttribute('data-uid'); render(); }
    else if (act === 'close-skill') { editSkillUid = null; render(); }
    else if (act === 'add-monster') { DATA.monsters.push(newMonster()); render(); }
    else if (act === 'del-monster') { if (confirm('Удалить монстра?')) { DATA.monsters.splice(+i, 1); editMonUid = null; render(); } }
    else if (act === 'edit-monster') { editMonUid = b.getAttribute('data-uid'); render(); }
    else if (act === 'close-monster') { editMonUid = null; render(); }
    else if (act === 'add-ability') { DATA.monsters[+i].abilities.push(newAbility()); render(); }
    else if (act === 'del-ability') { DATA.monsters[+i].abilities.splice(+j, 1); render(); }
    else if (act === 'add-cat') { DATA.loot.categories.push(newCategory()); render(); }
    else if (act === 'del-cat') { if (confirm('Удалить категорию со всеми предметами?')) { DATA.loot.categories.splice(+i, 1); render(); } }
    else if (act === 'add-item') { DATA.loot.categories[+i].tiers[g].push(newItem()); render(); }
    else if (act === 'del-item') { DATA.loot.categories[+i].tiers[g].splice(+j, 1); editItemUid = null; render(); }
    else if (act === 'edit-item') { editItemUid = b.getAttribute('data-uid'); render(); }
    else if (act === 'close-item') { editItemUid = null; render(); }
    else if (act === 'toggle-panel') { panelOpen = !panelOpen; buildPanel(); return; }
    else if (act === 'add-frag') { DATA.loot.fragments.push(newFragment()); render(); }
    else if (act === 'del-frag') { DATA.loot.fragments.splice(+i, 1); render(); }
    else if (act === 'do-import') { doImport(); }
    else if (act === 'export-zip') { exportZip(); }
    else if (act === 'save-fs') { saveToFolder(); }
    else if (act === 'pick-folder') { pickFolder(); }
    else if (act === 'export-js') { download(new Blob([contentJsString()], { type: 'text/javascript' }), 'content.js'); toast('content.js скачан', 'ok'); }
    else if (act === 'export-json') { download(new Blob([JSON.stringify(buildContent(), null, 2) + '\n'], { type: 'application/json' }), 'content.json'); toast('content.json скачан', 'ok'); }
  }

  // ======================================================================
  //  ШАПКА / ПОДВАЛ / ГЕРОЙ
  // ======================================================================
  var VALID_TABS = ['classes', 'bestiary', 'loot', 'import', 'export'];
  var current = 'classes';
  try { var qt = new URLSearchParams(location.search).get('tab'); if (qt && VALID_TABS.indexOf(qt) >= 0) current = qt; } catch (e) {}
  var NAVTABS = [['classes', function () { return t('nav.classes'); }], ['bestiary', function () { return t('nav.bestiary'); }], ['loot', function () { return t('nav.loot'); }]];
  var TOOLS = [['import', '\u2b07 Импорт из Unity', 'Вставить JSON из игры'], ['export', '\u2191 Экспорт', 'content.json / .js']];
  var HERO = {
    classes: ['Классы', 'Правьте названия, описания, формулы, кулдаун/ману и иконки навыков — прямо в карточках.'],
    bestiary: ['Бестиарий', 'HP, урон, лор, «как победить», способности и иконки монстров — прямо на карточках.'],
    loot: ['Предметы', 'Предметы, редкость и категории. Открывайте полную карточку кнопкой «✎ Открыть карточку».'],
    import: ['Импорт из Unity', 'Вставьте JSON из игры — записи обновятся или добавятся по ID.'],
    export: ['Экспорт', 'Скачайте ZIP с контентом и иконками и распакуйте в корень сайта.']
  };
  function buildNav() {
    if (!navHost) return;
    navHost.className = 'nav';
    var links = NAVTABS.map(function (tb) { return '<a class="b-tab' + (tb[0] === current ? ' is-active' : '') + '" data-tab="' + tb[0] + '">' + esc(tb[1]()) + '</a>'; }).join('');
    var lsw = '<div class="nav__lang" role="group">' + langsList().map(function (l) { return '<button type="button" class="lang-btn' + (l.code === LANG ? ' is-active' : '') + '" data-lang="' + l.code + '">' + esc(l.label || l.code) + '</button>'; }).join('') + '</div>';
    navHost.innerHTML = '<div class="nav__inner">' +
      '<a class="nav__brand" data-tab="classes"><span class="nav__sigil">\u2620</span><span class="nav__title">Dungeon Relics</span></a>' +
      '<button class="nav__burger" type="button" aria-label="Menu">\u2261</button>' +
      '<nav class="nav__links">' + links + lsw + '</nav></div>';
    var burger = navHost.querySelector('.nav__burger'), menu = navHost.querySelector('.nav__links');
    if (burger && menu) burger.addEventListener('click', function () { menu.classList.toggle('is-open'); });
  }
  function buildPanel() {
    var host = document.getElementById('build-panel'); if (!host) return;
    host.className = 'bpanel' + (panelOpen ? '' : ' is-collapsed');
    var nSkills = 0; DATA.classes.forEach(function (c) { nSkills += (c.actives || []).length + (c.passives || []).length; });
    var nItems = 0; DATA.loot.categories.forEach(function (cat) { RTIERS.forEach(function (r) { nItems += ((cat.tiers || {})[r] || []).length; }); });
    var fsSupported = !!window.showDirectoryPicker;
    var fsBtns = fsSupported
      ? '<button type="button" class="btn btn--gold bpanel__zip" data-act="save-fs" title="Записать content.js, content.json и иконки прямо в папку сайта">💾 Сохранить в папку сайта</button>' +
        '<button type="button" class="btn bpanel__zip" data-act="pick-folder" style="margin-top:6px">📁 ' + (dirHandle ? 'Сменить папку сайта' : 'Выбрать папку сайта') + '</button>'
      : '<div class="bpanel__note" style="color:#ffcf99">⚠ Прямое сохранение доступно только в Chrome/Edge. Здесь используйте ZIP.</div>';
    var tools = TOOLS.map(function (tl) {
      return '<button type="button" class="bpanel__item' + (tl[0] === current ? ' is-active' : '') + '" data-tab="' + tl[0] + '">' +
        '<span class="bpanel__t">' + esc(tl[1]) + '</span><span class="bpanel__hint">' + esc(tl[2]) + '</span></button>';
    }).join('');
    host.innerHTML =
      '<button type="button" class="bpanel__toggle" data-act="toggle-panel" title="Свернуть / развернуть">' + (panelOpen ? '\u25b8' : '\u25c2') + '</button>' +
      '<div class="bpanel__badge">\u2699 Конструктор</div>' +
      '<div class="bpanel__note">Панель видна только тебе \u2014 на публичном сайте её нет.</div>' +
      '<div class="bpanel__group">' + tools + '</div>' +
      fsBtns +
      '<button type="button" class="btn bpanel__zip" data-act="export-zip">\u2b07 Скачать ZIP</button>' +
      '<div class="bpanel__counts">Классы: ' + DATA.classes.length + ' \u00b7 Навыки: ' + nSkills + '<br>Монстры: ' + DATA.monsters.length + ' \u00b7 Предметы: ' + nItems + '</div>';
  }

  function buildFooter() {
    var f = document.getElementById('site-footer'); if (!f) return;
    f.className = 'footer';
    f.innerHTML = '<div class="footer__inner"><div class="footer__col footer__brand"><div class="nav__title">\u2620 Dungeon Relics</div>' +
      '<p>Локальный редактор контента \u00b7 публичный сайт остаётся только для чтения.</p></div></div>' +
      '<div class="footer__base">\u00a9 Dungeon Relics \u00b7 ' + esc(t('brand.footerBase')) + '</div>';
  }
  function setHero() {
    var h = HERO[current] || HERO.classes;
    if (current === 'loot' && editItemUid) h = ['Предмет', 'Полное редактирование предмета. Вернитесь к списку кнопкой «← Назад к предметам».'];
    if (current === 'bestiary' && editMonUid) h = ['Монстр', 'Полное редактирование монстра. Вернитесь кнопкой «← Назад к бестиарию».'];
    if (current === 'classes' && editSkillUid) h = ['Навык', 'Полное редактирование навыка. Вернитесь кнопкой «← Назад к классам».'];
    var kk = document.getElementById('b-kicker'), tt = document.getElementById('b-title'), ss = document.getElementById('b-sub');
    if (kk) kk.textContent = 'Режим редактирования';
    if (tt) tt.textContent = h[0];
    if (ss) ss.textContent = h[1];
  }

  // ======================================================================
  //  РЕНДЕР + СОБЫТИЯ
  // ======================================================================
  function render() {
    DR.lang = LANG;
    buildNav(); buildPanel(); buildFooter(); setHero();
    if (current === 'classes') content.innerHTML = renderClasses();
    else if (current === 'bestiary') content.innerHTML = renderBestiary();
    else if (current === 'loot') content.innerHTML = renderLoot();
    else if (current === 'import') { content.innerHTML = renderImport(); fillImportTarget(); }
    else if (current === 'export') content.innerHTML = renderExport();
    content.querySelectorAll('.ed-area').forEach(grow);
  }

  // навигация (делегирование, вешается один раз)
  navHost.addEventListener('click', function (e) {
    var lb = e.target.closest('.lang-btn'); if (lb) { var c = lb.getAttribute('data-lang'); if (c && c !== LANG) setLang(c); return; }
    var act = e.target.closest('[data-act]'); if (act) { handleAct(act); return; }
    var tab = e.target.closest('[data-tab]'); if (tab) { current = tab.getAttribute('data-tab'); render(); return; }
  });

  var panelHost = document.getElementById('build-panel');
  if (panelHost) panelHost.addEventListener('click', function (e) {
    var act = e.target.closest('[data-act]'); if (act) { handleAct(act); return; }
    var tab = e.target.closest('[data-tab]'); if (tab) { current = tab.getAttribute('data-tab'); render(); return; }
  });

  // ввод текста — без ре-рендера (не теряем фокус)
  content.addEventListener('input', function (e) {
    var el = e.target; var p = el.getAttribute('data-path'); if (p != null) { setPath(DATA, p, el.value); if (el.classList.contains('ed-area')) grow(el); }
  });
  content.addEventListener('change', function (e) {
    var el = e.target;
    var p = el.getAttribute('data-path');
    if (p != null) {
      setPath(DATA, p, el.value);
      if (p === 'imp.type') { fillImportTarget(); return; }
      if (/\.threat$/.test(p)) { render(); return; }   // обновить плашку угрозы
      return;
    }
    var iu = el.getAttribute('data-icon');
    if (iu && el.files && el.files[0]) { var f = el.files[0]; var url = URL.createObjectURL(f); ICONS[iu] = { kind: el.getAttribute('data-kind'), file: f, url: url }; var img = document.getElementById('prev-' + iu); if (img) { img.src = url; img.style.display = ''; } toast('Иконка прикреплена'); return; }
    var mc = el.getAttribute('data-move-cat'); if (mc) { moveItem(mc, +el.value, null); return; }
    var mr = el.getAttribute('data-move-rar'); if (mr) { moveItem(mr, null, el.value); return; }
    var msc = el.getAttribute('data-move-skill-class'); if (msc) { moveSkill(msc, +el.value, null); return; }
    var msg = el.getAttribute('data-move-skill-group'); if (msg) { moveSkill(msg, null, el.value); return; }
  });
  // клики внутри контента: раскрытие «Деталей» и action-кнопки
  content.addEventListener('click', function (e) {
    var tg = e.target.closest('[data-toggle]'); if (tg) { var d = document.getElementById(tg.getAttribute('data-toggle')); if (d) d.classList.toggle('hidden'); return; }
    var b = e.target.closest('[data-act]'); if (b) { handleAct(b); return; }
  });

  idbGet('siteDir').then(function (h) { if (h) { dirHandle = h; buildPanel(); } }).catch(function () {});
  buildFooter();
  render();
})();
