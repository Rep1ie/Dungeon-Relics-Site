/* icons.js — библиотека векторных иконок интерфейса.
   Все иконки монохромные (fill="currentColor") и наследуют цвет родителя,
   поэтому подстраиваются под тему и состояния (hover, active).
   Использование: DR.svg('hp', 'ic--sm')  ->  строка с <svg>. */
window.DR = window.DR || {};

(function () {
  var P = {
    /* ---- классы ---- */
    warrior: '<path d="M12 1.6 21 5v6.4c0 5.3-3.6 9.9-9 11.6-5.4-1.7-9-6.3-9-11.6V5l9-3.4Zm0 2.6L5 6.4v5c0 4.1 2.7 7.7 7 9.2 4.3-1.5 7-5.1 7-9.2v-5l-7-2.2Z"/><path d="M11 7h2v9h-2z"/><path d="M8 10h8v2H8z"/>',
    priest: '<path d="M11 2h2v4.2l3.3-1.9 1 1.7-3.3 1.9 3.3 1.9-1 1.7L13 9.6V22h-2V9.6l-3.3 1.9-1-1.7L10 7.9 6.7 6l1-1.7L11 6.2V2Z"/><path d="M12 10.2a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Zm0 2a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/>',
    mage: '<path d="M12 2a7 7 0 0 1 4.3 12.5l1 2.2A1 1 0 0 1 16.4 18H7.6a1 1 0 0 1-.9-1.4l1-2.1A7 7 0 0 1 12 2Zm0 2a5 5 0 0 0-2.8 9.1l.8.6-.7 1.5h5.4l-.7-1.5.8-.6A5 5 0 0 0 12 4Z"/><path d="M7 19h10l-1 3H8l-1-3Z"/><path d="M12 5.6l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9Z"/>',
    ranger: '<path d="M4 3c8.5 0 15 6.5 15 15h-2C17 10.6 11.4 5 4 5V3Z"/><path d="M4.7 3.3 20 18.6l-1.4 1.4L3.3 4.7l1.4-1.4Z"/><path d="M18 15.5 20.5 18 18 20.5V18h-2.6L18 15.5Z"/><path d="M3 3h4v2H5v2H3V3Z"/>',
    barbarian: '<path d="M11 3c4.6 0 8.4 2.6 9.6 6.6.2.8-.5 1.5-1.3 1.3-2.3-.6-4.4-.3-6.3.9L11 13V3Z"/><path d="M9 3v10l-1.9-1.2c-1.9-1.2-4-1.5-6.3-.9-.8.2-1.5-.5-1.3-1.3C.7 5.6 4.4 3 9 3Z" transform="translate(2)"/><path d="M11 12h2v10h-2z"/>',
    assassin: '<path d="M12 1.5 15 9l-3 2-3-2 3-7.5Z"/><path d="M6.5 10h11v2h-11z"/><path d="M11 12h2v6h-2z"/><path d="M9.5 18h5v2.5a2.5 2.5 0 0 1-5 0V18Z"/>',

    /* ---- разделы / категории лута ---- */
    relics: '<path d="M8 2h8v2.2l-1.4 2A6.5 6.5 0 0 1 18 12v5.5A4.5 4.5 0 0 1 13.5 22h-3A4.5 4.5 0 0 1 6 17.5V12a6.5 6.5 0 0 1 3.4-5.8L8 4.2V2Zm2.3 2 1.2 1.8h1l1.2-1.8h-3.4ZM12 7.6A4.4 4.4 0 0 0 8 12v5.5c0 1.4 1.1 2.5 2.5 2.5h3c1.4 0 2.5-1.1 2.5-2.5V12a4.4 4.4 0 0 0-4-4.4Z"/><path d="M4 10h2v2H4zM18 10h2v2h-2z"/><path d="M9.5 11h5v2h-5z"/>',
    weapons: '<path d="m4 2 3 .6 9.4 9.4-2.4 2.4L4.6 5 4 2Z"/><path d="m20 2-.6 3-9.4 9.4 2.4 2.4L21.4 5 20 2Z"/><path d="M14.6 15.4 19 19.8 17.6 21.2l-4.4-4.4 1.4-1.4Z"/><path d="m9.4 15.4-4.4 4.4 1.4 1.4 4.4-4.4-1.4-1.4Z"/>',
    armor: '<path d="M12 2 4 4.6v6.9C4 16.6 7.2 20.9 12 22c4.8-1.1 8-5.4 8-10.5V4.6L12 2Zm0 2.1 6 1.9v5.5c0 4-2.4 7.4-6 8.4-3.6-1-6-4.4-6-8.4V6l6-1.9Z"/><path d="M12 6.5 8 7.8v3.7c0 2.7 1.6 5 4 5.8 2.4-.8 4-3.1 4-5.8V7.8L12 6.5Z"/>',
    consumables: '<path d="M9 2h6v2h-1v4.3l3.6 8A3.5 3.5 0 0 1 14.4 21H9.6a3.5 3.5 0 0 1-3.2-4.7L10 8.3V4H9V2Zm3 2v4.7l-1.3 3h2.6L12 8.7V4Zm-2.2 9.7-1.6 3.4A1.5 1.5 0 0 0 9.6 19h4.8a1.5 1.5 0 0 0 1.4-1.9l-1.6-3.4H9.8Z"/>',

    /* ---- статы и служебные ---- */
    hp: '<path d="M12 21S3 14.8 3 8.9A5 5 0 0 1 12 6a5 5 0 0 1 9 2.9C21 14.8 12 21 12 21Z"/>',
    dmg: '<path d="M13.5 2 21 3l1 7.5-8 8-1.8-1.8 7-7L18.6 5 13 10.6 11.2 8.8 13.5 2Z"/><path d="m2.8 19.8 8.4-8.4 1.4 1.4-8.4 8.4-1.4-1.4Z"/><path d="M2 22v-3h3l-3 3Z"/>',
    mana: '<path d="M12 2 18 12l-6 10L6 12 12 2Zm0 4.2L8.4 12 12 17.8 15.6 12 12 6.2Z"/>',
    cooldown: '<path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z"/><path d="M11 7h2v5.4l3.3 2-1 1.7L11 13.6V7Z"/><path d="M9 1h6v2H9z"/>',
    shard: '<path d="M12 1.5 19 8l-7 14.5L5 8l7-6.5Zm0 3L7.7 8.5 12 17.6l4.3-9.1L12 4.5Z"/><path d="m12 6.5 2.6 2.7L12 14.7 9.4 9.2 12 6.5Z"/>',
    skull: '<path d="M12 2c5 0 8.5 3.4 8.5 8.4 0 3-1.4 5.4-3.5 6.6V20a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3c-2.1-1.2-3.5-3.6-3.5-6.6C3.5 5.4 7 2 12 2Zm0 2c-3.9 0-6.5 2.6-6.5 6.4 0 2.5 1.2 4.3 3 5.1l.5.3V20h6v-4.2l.5-.3c1.8-.8 3-2.6 3-5.1C18.5 6.6 15.9 4 12 4Z"/><circle cx="9" cy="11" r="2.1"/><circle cx="15" cy="11" r="2.1"/><path d="M12 14.4 13.2 17h-2.4L12 14.4Z"/>',
    dragon: '<path d="M3 5c3.6 0 6.6 1.6 8.6 4.3L14 6.6a5.6 5.6 0 0 1 7 .9c-1.7.2-2.6 1-3 2.4 1.6.6 2.6 1.9 2.8 3.7.2 2.3-1 4.4-3 5.7l-1-1.7c1.4-.9 2.2-2.2 2-3.7-.1-1.4-1.1-2.3-2.8-2.5l-1 2.4-1.9-.8.5-1.2C11.7 9.4 8.2 7.5 3 7.4V5Z"/><circle cx="16.4" cy="9.2" r="1.1"/><path d="M4 16.5c4 0 7 1.5 9 4.5l-1.7 1.1C9.7 19.7 7.3 18.5 4 18.5v-2Z"/>',
    gem: '<path d="M8 2h8l4 6-8 14L4 8l4-6Zm1.1 2L6.6 7.7 12 17.2l5.4-9.5L14.9 4H9.1Z"/><path d="m12 5.4 2.6 3.4L12 13.7 9.4 8.8 12 5.4Z"/>',
    menu: '<path d="M3 5h18v2H3zM3 11h18v2H3zM3 17h18v2H3z"/>',
    arrowRight: '<path d="m12.6 4.6 7.4 7.4-7.4 7.4-1.4-1.4 5-5H4v-2h12.2l-5-5 1.4-1.4Z"/>',
    arrowLeft: '<path d="m11.4 4.6 1.4 1.4-5 5H20v2H7.8l5 5-1.4 1.4L4 12l7.4-7.4Z"/>',
    rune: '<path d="m12 2 2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6L12 2Z"/>'
  };

  // Синонимы: ключи классов, категорий и разделов.
  P.classes = P.weapons;
  P.bestiary = P.dragon;
  P.loot = P.gem;
  P.home = P.skull;
  P.brand = P.skull;
  P.sec = P.rune;

  DR.icons = P;
  DR.hasIcon = function (name) { return !!(name && P[name]); };

  /* Возвращает разметку <svg> с иконкой. Если иконки нет — пустая строка. */
  DR.svg = function (name, cls) {
    var body = P[name];
    if (!body) return '';
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" ' +
      'fill="currentColor" aria-hidden="true" focusable="false">' + body + '</svg>';
  };

  /* Подставляет иконки в разметку: <span data-icon="bestiary"></span>. */
  DR.hydrateIcons = function (root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-icon]');
    Array.prototype.forEach.call(nodes, function (n) {
      var name = n.getAttribute('data-icon');
      if (!P[name]) return;
      n.innerHTML = DR.svg(name);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { DR.hydrateIcons(); });
  } else {
    DR.hydrateIcons();
  }
})();
