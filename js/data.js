/* data.js — ЗАГРУЗЧИК + ИНДЕКСАТОР.
   Сам контент живёт в content.js (window.DR_CONTENT). Этот файл НЕ надо редактировать ручками при обычной правке контента.
   - id каждой записи берётся из content.js (СТАБИЛЬНЫЙ, может совпадать с ID из Unity).
   - Если id не задан — генерится слаг из англ. названия (только как запасной вариант). */
window.DR = window.DR || {};

(function () {
  var content = window.DR_CONTENT;
  if (!content) {
    console.error("[Dungeon Relics] content.js \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d: \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u0435 <script src=\"content.js\"> \u043f\u0435\u0440\u0435\u0434 data.js.");
    content = { classes: [], monsters: [], loot: { categories: [] } };
  }

  DR.formulaNote = content.formulaNote;
  DR.classes = content.classes || [];
  DR.monsters = content.monsters || [];
  DR.loot = content.loot || { categories: [] };
  DR.iconExt = "png";
  // Расширение файла иконки по типу: монстры — вектор (SVG), навыки/предметы — PNG.
  // items: файлов пока нет — используется встроенная иконка категории из js/icons.js.
  DR.iconExtByKind = { monsters: "svg", skills: "png", items: null };

  // ---- вспомогательные ----
  function enOf(v) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v.en || v.ru || v[Object.keys(v)[0]] || "";
    }
    return v == null ? "" : String(v);
  }
  function slug(str) {
    return enOf(str).toLowerCase()
      .replace(/['\u2019]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  function uniq(base, used) {
    var id = base || "item", i = 2;
    while (used[id]) id = base + "-" + i++;
    used[id] = true;
    return id;
  }
  // Явный id приоритетнее; иначе — слаг (с гарантией уникальности).
  function idOf(entry, base, used) {
    var explicit = entry && entry.id != null && String(entry.id).trim() !== "" ? String(entry.id).trim() : null;
    return uniq(explicit || base, used);
  }

  // ---- Классы и навыки ----
  var skills = [];
  var usedClass = {};
  (DR.classes || []).forEach(function (c) {
    c.id = idOf(c, c.key || slug(c.name), usedClass);
    var usedInClass = {};
    function reg(s, kind) {
      s.classKey = c.key;
      s.classId = c.id;
      s.classNameMap = c.name;
      s.classIcon = c.icon;
      s.kind = kind;
      s.id = idOf(s, (c.key || c.id) + "--" + slug(s.n), usedInClass);
      skills.push(s);
    }
    (c.actives || []).forEach(function (s) { reg(s, "active"); });
    (c.passives || []).forEach(function (s) { reg(s, "passive"); });
  });

  // ---- Монстры ----
  var usedM = {};
  (DR.monsters || []).forEach(function (m) {
    m.id = idOf(m, slug(m.name), usedM);
  });

  // ---- Предметы ----
  var items = [];
  var usedI = {};
  var RTIERS = ["common", "rare", "epic", "legendary"];
  (DR.loot && DR.loot.categories || []).forEach(function (cat) {
    cat.tiers = cat.tiers || {};
    RTIERS.forEach(function (rarity) {
      (cat.tiers[rarity] || []).forEach(function (it) {
        it.rarity = rarity;
        it.catKey = cat.key;
        it.catName = cat.name;
        it.catIcon = cat.icon;
        it.catNote = cat.note;
        it.id = idOf(it, (cat.key || "item") + "--" + slug(it.n), usedI);
        items.push(it);
      });
    });
  });

  // ---- Индексы и хелперы ----
  DR._classes = DR.classes || [];
  DR._skills = skills;
  DR._monsters = DR.monsters || [];
  DR._items = items;
  DR._itemList = items;

  DR.findClass = function (key) { return DR._classes.find(function (c) { return c.key === key || c.id === key; }); };
  DR.findClassById = function (id) { return DR._classes.find(function (c) { return c.id === id; }); };
  DR.findSkill = function (id) { return DR._skills.find(function (s) { return s.id === id; }); };
  DR.findMonster = function (id) { return DR._monsters.find(function (m) { return m.id === id; }); };
  DR.findItem = function (id) { return DR._items.find(function (it) { return it.id === id; }); };
  DR.allItems = function () { return DR._items.slice(); };

  // Путь к иконке: явный img либо assets/icons/<тип>/<id>.png
  DR.iconPath = function (kind, entry) {
    if (entry && entry.img) return entry.img;
    if (!entry || !entry.id) return null;
    var map = DR.iconExtByKind || {};
    var ext = map.hasOwnProperty(kind) ? map[kind] : DR.iconExt;
    if (!ext) return null;
    return "assets/icons/" + kind + "/" + entry.id + "." + ext;
  };
})();
