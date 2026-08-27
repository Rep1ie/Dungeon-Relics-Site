/* ============================================================
   i18n.js — РУНТАЙМ ЛОКАЛИЗАЦИИ (загружается ПЕРВЫМ, до data.js)
   ------------------------------------------------------------
   Как добавить новый язык (например, немецкий "de"):
     1) Добавьте { code:"de", label:"DE", name:"Deutsch" } в DR.i18n.langs.
     2) Добавьте объект DR.strings.de = { ... } (скопируйте ключи из en).
     3) В data.js добавьте ключ de в каждое поле-локаль-карту {en, ru, de}.
   Больше ничего править не нужно: рендер, ID, иконки и ссылки не зависят
   от языка. ID навыков/монстров/предметов всегда формируются из английских
   названий, поэтому имена файлов иконок одинаковы во всех языках.
   ============================================================ */
window.DR = window.DR || {};

DR.i18n = {
  default: "en",
  fallback: "en",
  storageKey: "dr-lang",
  langs: [
    { code: "en", label: "EN", name: "English" },
    { code: "ru", label: "RU", name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" }
  ]
};

(function () {
  var cfg = DR.i18n;
  function codes() { return cfg.langs.map(function (l) { return l.code; }); }
  function ok(c) { return c && codes().indexOf(c) >= 0; }

  function detect() {
    try { var q = new URLSearchParams(location.search).get("lang"); if (ok(q)) return q; } catch (e) {}
    try { var s = localStorage.getItem(cfg.storageKey); if (ok(s)) return s; } catch (e) {}
    try { var n = (navigator.language || "").slice(0, 2).toLowerCase(); if (ok(n)) return n; } catch (e) {}
    return cfg.default;
  }

  DR.lang = detect();
  try { document.documentElement.setAttribute("lang", DR.lang); } catch (e) {}

  DR.setLang = function (code) {
    if (!ok(code) || code === DR.lang) return;
    try { localStorage.setItem(cfg.storageKey, code); } catch (e) {}
    try {
      var url = new URL(location.href);
      url.searchParams.set("lang", code); // сохраняем прочие параметры (id и т.п.)
      location.href = url.toString();
    } catch (e) { location.reload(); }
  };

  /* Разрешает локаль-карту {en, ru, ...} к текущему языку.
     Обычные (не-объектные) значения возвращаются как есть. */
  DR.L = function (val) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      if (val[DR.lang] != null) return val[DR.lang];
      if (val[cfg.fallback] != null) return val[cfg.fallback];
      for (var k in val) { if (val.hasOwnProperty(k)) return val[k]; }
      return "";
    }
    return val;
  };

  /* Поиск строки интерфейса по ключу с точками, напр. t("ui.description"). */
  DR.t = function (key) {
    function dig(dict) {
      var parts = String(key).split("."), v = dict;
      for (var i = 0; i < parts.length && v != null; i++) v = v[parts[i]];
      return v;
    }
    var d = DR.strings || {};
    var v = dig(d[DR.lang] || {});
    if (v == null) v = dig(d[cfg.fallback] || {});
    return v == null ? key : v;
  };

  /* Заполняет статическую разметку: [data-i18n] -> textContent,
     [data-i18n-attr="attr:key; attr2:key2"] -> setAttribute. */
  DR.applyStatic = function (root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = DR.t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var i = pair.indexOf(":"); if (i < 0) return;
        el.setAttribute(pair.slice(0, i).trim(), DR.t(pair.slice(i + 1).trim()));
      });
    });
    try { document.documentElement.setAttribute("lang", DR.lang); } catch (e) {}
  };
})();

/* =========================== СТРОКИ ИНТЕРФЕЙСА =========================== */
/* Только строки "обвязки" (навигация, заголовки секций, кнопки, единицы).
   Контент энциклопедии живёт в data.js как локаль-карты. */
DR.strings = {
  en: {
    nav: { home: "Home", classes: "Classes", bestiary: "Bestiary", loot: "Items", menu: "Menu" },
    brand: { title: "Dungeon Relics", footerTagline: "The official dungeon encyclopedia: classes, creatures, and loot.", footerBase: "official game encyclopedia" },
    lang: { label: "Language" },
    unit: { sec: "sec", mana: "mana" },
    threat: { low: "Low threat", mid: "Medium threat", high: "High threat", boss: "Boss" },
    rarity: { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary" },
    rarityOne: { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary" },
    ui: {
      formulaNote: "Formula notation:",
      activeSkills: "Active Skills",
      passiveSkills: "Passive Skills",
      more: "Details \u2192",
      all: "All",
      category: "Category",
      rarity: "Rarity",
      nothingFound: "Nothing matches the selected filters.",
      description: "Description",
      upgrade: "Upgrade (max branch)",
      otherSkills: "Other skills:",
      abilities: "Abilities",
      howToCounter: "How to counter",
      activeSkill: "Active skill",
      passiveSkill: "Passive skill",
      cooldown: "Cooldown:",
      cost: "Cost:",
      hp: "HP",
      dmg: "Damage",
      notFound: "Not found",
      notFoundDesc: "This entry doesn't exist or the link is outdated.",
      backToClasses: "Back to all classes",
      backToBestiary: "Back to the bestiary",
      backToLoot: "Back to all items",
      soulShards: "\ud83d\udd2e Soul Shards",
      soulShardsDesc: "The dungeon's currency. Accumulate it to upgrade your gear."
    },
    home: {
      metaTitle: "Dungeon Relics \u2014 Dungeon Encyclopedia",
      metaDesc: "The official Dungeon Relics encyclopedia: classes, bestiary, and loot.",
      kicker: "Official encyclopedia",
      heroSub: "Descend into the depths of the dungeon: study hero classes, survive clashes with the creatures of darkness, and collect legendary loot.",
      ctaClasses: "Hero classes",
      ctaBestiary: "Bestiary",
      aboutTitle: "About the world",
      aboutText: "Dungeon Relics is a cooperative ten-floor dungeon where every step deeper is a choice between greed and survival. Heroes of different classes band together to face the creatures of darkness, unravel traps, and share the loot. This wiki is your guide to its denizens, heroes, and treasures.",
      sectionsEyebrow: "Sections",
      startTitle: "Where to start",
      startSub: "Three key sections of the encyclopedia \u2014 choose what to explore first.",
      cardClassesTitle: "Classes",
      cardClassesText: "Six heroes with unique roles, active skills, and passives.",
      cardBestiaryTitle: "Bestiary",
      cardBestiaryText: "From swamp slime to bosses \u2014 threats, abilities, and tactics.",
      cardLootTitle: "Items",
      cardLootText: "Soul Shards, relics, weapons, armor, and consumables by rarity.",
      cardMore: "Explore \u2192",
      pathTitle: "The hero's path",
      path1: "Choose a class and study its skill branches.",
      path2: "Descend deeper: the lower the floor, the deadlier the creatures and the richer the loot.",
      path3: "Collect Soul Shards and upgrade your gear.",
      path4: "Defeat the floor boss and open the way deeper."
    },
    classesPage: { kicker: "Heroes of the dungeon", title: "Classes", intro: "Six hero archetypes \u2014 each with its own role, active skills, and passives. Pick the one that fits your playstyle." },
    bestiaryPage: { kicker: "Denizens of darkness", title: "Bestiary", intro: "From harmless little slimes to deadly bosses. Study the threat, abilities, and weak points of every creature before you meet it in the dark." },
    lootPage: { kicker: "Dungeon treasures", title: "Items", intro: "Soul Shards as currency and four categories of loot by rarity tier. Gather, upgrade, and gear up for the deep floors." }
  },
  ru: {
    nav: { home: "\u0413\u043b\u0430\u0432\u043d\u0430\u044f", classes: "\u041a\u043b\u0430\u0441\u0441\u044b", bestiary: "\u0411\u0435\u0441\u0442\u0438\u0430\u0440\u0438\u0439", loot: "\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u044b", menu: "\u041c\u0435\u043d\u044e" },
    brand: { title: "Dungeon Relics", footerTagline: "\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u044d\u043d\u0446\u0438\u043a\u043b\u043e\u043f\u0435\u0434\u0438\u044f \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f: \u043a\u043b\u0430\u0441\u0441\u044b, \u0442\u0432\u0430\u0440\u0438 \u0438 \u0434\u043e\u0431\u044b\u0447\u0430.", footerBase: "\u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u044d\u043d\u0446\u0438\u043a\u043b\u043e\u043f\u0435\u0434\u0438\u044f \u0438\u0433\u0440\u044b" },
    lang: { label: "\u042f\u0437\u044b\u043a" },
    unit: { sec: "\u0441", mana: "\u043c\u0430\u043d\u044b" },
    threat: { low: "\u041d\u0438\u0437\u043a\u0430\u044f \u0443\u0433\u0440\u043e\u0437\u0430", mid: "\u0421\u0440\u0435\u0434\u043d\u044f\u044f \u0443\u0433\u0440\u043e\u0437\u0430", high: "\u0412\u044b\u0441\u043e\u043a\u0430\u044f \u0443\u0433\u0440\u043e\u0437\u0430", boss: "\u0411\u043e\u0441\u0441" },
    rarity: { common: "\u041e\u0431\u044b\u0447\u043d\u044b\u0435", rare: "\u0420\u0435\u0434\u043a\u0438\u0435", epic: "\u042d\u043f\u0438\u0447\u0435\u0441\u043a\u0438\u0435", legendary: "\u041b\u0435\u0433\u0435\u043d\u0434\u0430\u0440\u043d\u044b\u0435" },
    rarityOne: { common: "\u041e\u0431\u044b\u0447\u043d\u044b\u0439", rare: "\u0420\u0435\u0434\u043a\u0438\u0439", epic: "\u042d\u043f\u0438\u0447\u0435\u0441\u043a\u0438\u0439", legendary: "\u041b\u0435\u0433\u0435\u043d\u0434\u0430\u0440\u043d\u044b\u0439" },
    ui: {
      formulaNote: "\u041e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0444\u043e\u0440\u043c\u0443\u043b:",
      activeSkills: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u043d\u0430\u0432\u044b\u043a\u0438",
      passiveSkills: "\u041f\u0430\u0441\u0441\u0438\u0432\u043d\u044b\u0435",
      more: "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u2192",
      all: "\u0412\u0441\u0435",
      category: "\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f",
      rarity: "\u0420\u0435\u0434\u043a\u043e\u0441\u0442\u044c",
      nothingFound: "\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e \u043f\u043e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u043c \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u043c.",
      description: "\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",
      upgrade: "\u0423\u043b\u0443\u0447\u0448\u0435\u043d\u0438\u0435 (\u043c\u0430\u043a\u0441. \u0432\u0435\u0442\u043a\u0430)",
      otherSkills: "\u0414\u0440\u0443\u0433\u0438\u0435 \u043d\u0430\u0432\u044b\u043a\u0438:",
      abilities: "\u0421\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u0438",
      howToCounter: "\u041a\u0430\u043a \u043f\u043e\u0431\u0435\u0434\u0438\u0442\u044c",
      activeSkill: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u043d\u0430\u0432\u044b\u043a",
      passiveSkill: "\u041f\u0430\u0441\u0441\u0438\u0432\u043d\u044b\u0439 \u043d\u0430\u0432\u044b\u043a",
      cooldown: "\u041f\u0435\u0440\u0435\u0437\u0430\u0440\u044f\u0434\u043a\u0430:",
      cost: "\u0417\u0430\u0442\u0440\u0430\u0442\u044b:",
      hp: "HP",
      dmg: "\u0423\u0440\u043e\u043d",
      notFound: "\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",
      notFoundDesc: "\u0417\u0430\u043f\u0438\u0441\u044c \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043b\u0438 \u0441\u0441\u044b\u043b\u043a\u0430 \u0443\u0441\u0442\u0430\u0440\u0435\u043b\u0430.",
      backToClasses: "\u041a\u043e \u0432\u0441\u0435\u043c \u043a\u043b\u0430\u0441\u0441\u0430\u043c",
      backToBestiary: "\u041a\u043e \u0432\u0441\u0435\u043c\u0443 \u0431\u0435\u0441\u0442\u0438\u0430\u0440\u0438\u044e",
      backToLoot: "\u041a\u043e \u0432\u0441\u0435\u043c \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u0430\u043c",
      soulShards: "\ud83d\udd2e \u041e\u0441\u043a\u043e\u043b\u043a\u0438 \u0434\u0443\u0448",
      soulShardsDesc: "\u0412\u0430\u043b\u044e\u0442\u0430 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f. \u041d\u0430\u043a\u0430\u043f\u043b\u0438\u0432\u0430\u0439\u0442\u0435 \u0435\u0451, \u0447\u0442\u043e\u0431\u044b \u0443\u043b\u0443\u0447\u0448\u0430\u0442\u044c \u0441\u043d\u0430\u0440\u044f\u0436\u0435\u043d\u0438\u0435."
    },
    home: {
      metaTitle: "Dungeon Relics \u2014 \u042d\u043d\u0446\u0438\u043a\u043b\u043e\u043f\u0435\u0434\u0438\u044f \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f",
      metaDesc: "\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u044d\u043d\u0446\u0438\u043a\u043b\u043e\u043f\u0435\u0434\u0438\u044f Dungeon Relics: \u043a\u043b\u0430\u0441\u0441\u044b, \u0431\u0435\u0441\u0442\u0438\u0430\u0440\u0438\u0439 \u0438 \u0434\u043e\u0431\u044b\u0447\u0430.",
      kicker: "\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u044d\u043d\u0446\u0438\u043a\u043b\u043e\u043f\u0435\u0434\u0438\u044f",
      heroSub: "\u0421\u043f\u0443\u0441\u0442\u0438\u0441\u044c \u0432 \u0433\u043b\u0443\u0431\u0438\u043d\u044b \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f: \u0438\u0437\u0443\u0447\u0430\u0439 \u043a\u043b\u0430\u0441\u0441\u044b \u0433\u0435\u0440\u043e\u0435\u0432, \u0432\u044b\u0436\u0438\u0432\u0430\u0439 \u0432 \u0441\u0445\u0432\u0430\u0442\u043a\u0430\u0445 \u0441 \u0442\u0432\u0430\u0440\u044f\u043c\u0438 \u0442\u044c\u043c\u044b \u0438 \u0441\u043e\u0431\u0438\u0440\u0430\u0439 \u043b\u0435\u0433\u0435\u043d\u0434\u0430\u0440\u043d\u0443\u044e \u0434\u043e\u0431\u044b\u0447\u0443.",
      ctaClasses: "\u041a\u043b\u0430\u0441\u0441\u044b \u0433\u0435\u0440\u043e\u0435\u0432",
      ctaBestiary: "\u0411\u0435\u0441\u0442\u0438\u0430\u0440\u0438\u0439",
      aboutTitle: "\u041e \u043c\u0438\u0440\u0435",
      aboutText: "Dungeon Relics \u2014 \u044d\u0442\u043e \u043a\u043e\u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u0435 \u0438\u0437 \u0434\u0435\u0441\u044f\u0442\u0438 \u044d\u0442\u0430\u0436\u0435\u0439, \u0433\u0434\u0435 \u043a\u0430\u0436\u0434\u044b\u0439 \u0448\u0430\u0433 \u0432\u0433\u043b\u0443\u0431\u044c \u2014 \u044d\u0442\u043e \u0432\u044b\u0431\u043e\u0440 \u043c\u0435\u0436\u0434\u0443 \u0436\u0430\u0434\u043d\u043e\u0441\u0442\u044c\u044e \u0438 \u0432\u044b\u0436\u0438\u0432\u0430\u043d\u0438\u0435\u043c. \u0413\u0435\u0440\u043e\u0438 \u0440\u0430\u0437\u043d\u044b\u0445 \u043a\u043b\u0430\u0441\u0441\u043e\u0432 \u043e\u0431\u044a\u0435\u0434\u0438\u043d\u044f\u044e\u0442\u0441\u044f, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u0441\u0442\u043e\u044f\u0442\u044c \u0442\u0432\u0430\u0440\u044f\u043c \u0442\u044c\u043c\u044b, \u0440\u0430\u0437\u0433\u0430\u0434\u044b\u0432\u0430\u0442\u044c \u043b\u043e\u0432\u0443\u0448\u043a\u0438 \u0438 \u0434\u0435\u043b\u0438\u0442\u044c \u0434\u043e\u0431\u044b\u0447\u0443. \u042d\u0442\u0430 \u0432\u0438\u043a\u0438 \u2014 \u0442\u0432\u043e\u0439 \u043f\u0443\u0442\u0435\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u043f\u043e \u0435\u0433\u043e \u043e\u0431\u0438\u0442\u0430\u0442\u0435\u043b\u044f\u043c, \u0433\u0435\u0440\u043e\u044f\u043c \u0438 \u0441\u043e\u043a\u0440\u043e\u0432\u0438\u0449\u0430\u043c.",
      sectionsEyebrow: "\u0420\u0430\u0437\u0434\u0435\u043b\u044b",
      startTitle: "\u0421 \u0447\u0435\u0433\u043e \u043d\u0430\u0447\u0430\u0442\u044c",
      startSub: "\u0422\u0440\u0438 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0445 \u0440\u0430\u0437\u0434\u0435\u043b\u0430 \u044d\u043d\u0446\u0438\u043a\u043b\u043e\u043f\u0435\u0434\u0438\u0438 \u2014 \u0432\u044b\u0431\u0435\u0440\u0438, \u0447\u0442\u043e \u0438\u0437\u0443\u0447\u0438\u0442\u044c \u043f\u0435\u0440\u0432\u044b\u043c.",
      cardClassesTitle: "\u041a\u043b\u0430\u0441\u0441\u044b",
      cardClassesText: "\u0428\u0435\u0441\u0442\u044c \u0433\u0435\u0440\u043e\u0435\u0432 \u0441 \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0440\u043e\u043b\u044f\u043c\u0438, \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u043c\u0438 \u043d\u0430\u0432\u044b\u043a\u0430\u043c\u0438 \u0438 \u043f\u0430\u0441\u0441\u0438\u0432\u0430\u043c\u0438.",
      cardBestiaryTitle: "\u0411\u0435\u0441\u0442\u0438\u0430\u0440\u0438\u0439",
      cardBestiaryText: "\u041e\u0442 \u0431\u043e\u043b\u043e\u0442\u043d\u043e\u0439 \u0441\u043b\u0438\u0437\u0438 \u0434\u043e \u0431\u043e\u0441\u0441\u043e\u0432 \u2014 \u0443\u0433\u0440\u043e\u0437\u044b, \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u0438 \u0438 \u0442\u0430\u043a\u0442\u0438\u043a\u0430.",
      cardLootTitle: "\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u044b",
      cardLootText: "\u041e\u0441\u043a\u043e\u043b\u043a\u0438 \u0434\u0443\u0448, \u0440\u0435\u043b\u0438\u043a\u0432\u0438\u0438, \u043e\u0440\u0443\u0436\u0438\u0435, \u0431\u0440\u043e\u043d\u044f \u0438 \u0440\u0430\u0441\u0445\u043e\u0434\u043d\u0438\u043a\u0438 \u043f\u043e \u0440\u0435\u0434\u043a\u043e\u0441\u0442\u0438.",
      cardMore: "\u0418\u0437\u0443\u0447\u0438\u0442\u044c \u2192",
      pathTitle: "\u041f\u0443\u0442\u044c \u0433\u0435\u0440\u043e\u044f",
      path1: "\u0412\u044b\u0431\u0435\u0440\u0438 \u043a\u043b\u0430\u0441\u0441 \u0438 \u0438\u0437\u0443\u0447\u0438 \u0435\u0433\u043e \u0432\u0435\u0442\u043a\u0438 \u043d\u0430\u0432\u044b\u043a\u043e\u0432.",
      path2: "\u0421\u043f\u0443\u0441\u043a\u0430\u0439\u0441\u044f \u0432\u0433\u043b\u0443\u0431\u044c: \u0447\u0435\u043c \u043d\u0438\u0436\u0435 \u044d\u0442\u0430\u0436, \u0442\u0435\u043c \u043e\u043f\u0430\u0441\u043d\u0435\u0435 \u0442\u0432\u0430\u0440\u0438 \u0438 \u0446\u0435\u043d\u043d\u0435\u0435 \u0434\u043e\u0431\u044b\u0447\u0430.",
      path3: "\u0421\u043e\u0431\u0438\u0440\u0430\u0439 \u041e\u0441\u043a\u043e\u043b\u043a\u0438 \u0434\u0443\u0448 \u0438 \u0443\u043b\u0443\u0447\u0448\u0430\u0439 \u0441\u043d\u0430\u0440\u044f\u0436\u0435\u043d\u0438\u0435.",
      path4: "\u041e\u0434\u043e\u043b\u0435\u0439 \u0431\u043e\u0441\u0441\u0430 \u044d\u0442\u0430\u0436\u0430 \u0438 \u043e\u0442\u043a\u0440\u043e\u0439 \u043f\u0443\u0442\u044c \u0433\u043b\u0443\u0431\u0436\u0435."
    },
    classesPage: { kicker: "\u0413\u0435\u0440\u043e\u0438 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f", title: "\u041a\u043b\u0430\u0441\u0441\u044b", intro: "\u0428\u0435\u0441\u0442\u044c \u0430\u0440\u0445\u0435\u0442\u0438\u043f\u043e\u0432 \u0433\u0435\u0440\u043e\u0435\u0432 \u2014 \u043a\u0430\u0436\u0434\u044b\u0439 \u0441\u043e \u0441\u0432\u043e\u0435\u0439 \u0440\u043e\u043b\u044c\u044e, \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u043c\u0438 \u043d\u0430\u0432\u044b\u043a\u0430\u043c\u0438 \u0438 \u043f\u0430\u0441\u0441\u0438\u0432\u0430\u043c\u0438. \u0412\u044b\u0431\u0435\u0440\u0438 \u0442\u043e\u0442, \u0447\u0442\u043e \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0442\u0432\u043e\u0435\u043c\u0443 \u0441\u0442\u0438\u043b\u044e." },
    bestiaryPage: { kicker: "\u041e\u0431\u0438\u0442\u0430\u0442\u0435\u043b\u0438 \u0442\u044c\u043c\u044b", title: "\u0411\u0435\u0441\u0442\u0438\u0430\u0440\u0438\u0439", intro: "\u041e\u0442 \u0431\u0435\u0437\u043e\u0431\u0438\u0434\u043d\u044b\u0445 \u0441\u043b\u0438\u0437\u043d\u044f\u043a\u043e\u0432 \u0434\u043e \u0441\u043c\u0435\u0440\u0442\u043e\u043d\u043e\u0441\u043d\u044b\u0445 \u0431\u043e\u0441\u0441\u043e\u0432. \u0418\u0437\u0443\u0447\u0438 \u0443\u0433\u0440\u043e\u0437\u0443, \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u0438 \u0438 \u0441\u043b\u0430\u0431\u044b\u0435 \u043c\u0435\u0441\u0442\u0430 \u043a\u0430\u0436\u0434\u043e\u0439 \u0442\u0432\u0430\u0440\u0438, \u043f\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043c \u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0448\u044c \u0435\u0451 \u0432\u043e \u0442\u044c\u043c\u0435." },
    lootPage: { kicker: "\u0421\u043e\u043a\u0440\u043e\u0432\u0438\u0449\u0430 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f", title: "\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u044b", intro: "\u041e\u0441\u043a\u043e\u043b\u043a\u0438 \u0434\u0443\u0448 \u043a\u0430\u043a \u0432\u0430\u043b\u044e\u0442\u0430 \u0438 \u0447\u0435\u0442\u044b\u0440\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 \u0434\u043e\u0431\u044b\u0447\u0438 \u043f\u043e \u0443\u0440\u043e\u0432\u043d\u044f\u043c \u0440\u0435\u0434\u043a\u043e\u0441\u0442\u0438. \u0421\u043e\u0431\u0438\u0440\u0430\u0439, \u0443\u043b\u0443\u0447\u0448\u0430\u0439 \u0438 \u0441\u043d\u0430\u0440\u044f\u0436\u0430\u0439\u0441\u044f \u0434\u043b\u044f \u0433\u043b\u0443\u0431\u043e\u043a\u0438\u0445 \u044d\u0442\u0430\u0436\u0435\u0439." }
  }
};
