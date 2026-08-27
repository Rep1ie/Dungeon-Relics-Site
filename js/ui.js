/* ui.js — общие элементы интерфейса: навигация, подвал, переключатель языка, появление при скролле. */
window.DR = window.DR || {};
DR.ui = (function () {
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function t(k) { return DR.t ? DR.t(k) : k; }
  function sv(name, cls) { return DR.svg ? DR.svg(name, cls) : ''; }

  // Навигация строится из id (лейблы берутся из словаря nav.<id>).
  function navItems() {
    if (DR.nav && DR.nav.length) return DR.nav;
    return [
      { id: 'home', href: 'index.html' },
      { id: 'classes', href: 'classes.html' },
      { id: 'bestiary', href: 'bestiary.html' },
      { id: 'loot', href: 'loot.html' }
    ];
  }

  // Переключатель языка — кнопки из DR.i18n.langs.
  function langSwitcher() {
    var langs = (DR.i18n && DR.i18n.langs) || [];
    if (langs.length < 2) return '';
    var cur = DR.lang;
    var btns = langs.map(function (l) {
      var on = l.code === cur ? ' is-active' : '';
      return '<button type="button" class="lang-btn' + on + '" data-lang="' + l.code + '" aria-label="' + (l.name || l.label) + '"' +
        (l.code === cur ? ' aria-current="true"' : '') + '>' + (l.label || l.code) + '</button>';
    }).join('');
    return '<div class="nav__lang" role="group">' + btns + '</div>';
  }

  function bindLang(host) {
    host.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var code = b.getAttribute('data-lang');
        if (code && code !== DR.lang && DR.setLang) DR.setLang(code);
      });
    });
  }

  function buildNav(active) {
    var host = document.getElementById("site-nav");
    if (!host) return;
    var links = navItems().map(function (item) {
      var is = item.id === active ? " class=\"is-active\"" : "";
      return '<a href="' + item.href + '"' + is + '>' + t('nav.' + item.id) + "</a>";
    }).join("");
    host.className = "nav";
    host.innerHTML =
      '<div class="nav__inner">' +
        '<a class="nav__brand" href="index.html">' +
          '<span class="nav__sigil">' + sv('brand') + '</span>' +
          '<span class="nav__title">Dungeon Relics</span>' +
        '</a>' +
        '<button class="nav__burger" aria-label="' + t('nav.menu') + '">' + sv('menu') + '</button>' +
        '<nav class="nav__links">' + links + langSwitcher() + '</nav>' +
      '</div>';
    var burger = host.querySelector(".nav__burger");
    var menu = host.querySelector(".nav__links");
    burger.addEventListener("click", function () {
      menu.classList.toggle("is-open");
    });
    bindLang(host);
  }

  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var links = navItems().map(function (item) {
      return '<a href="' + item.href + '">' + t('nav.' + item.id) + "</a>";
    }).join("");
    host.className = "footer";
    host.innerHTML =
      '<div class="footer__inner">' +
        '<div class="footer__col footer__brand">' +
          '<div class="nav__title"><span class="nav__sigil">' + sv('brand') + '</span> Dungeon Relics</div>' +
          '<p>' + t('brand.footerTagline') + '</p>' +
        '</div>' +
        '<div class="footer__col footer__nav">' + links + '</div>' +
      '</div>' +
      '<div class="footer__base">\u00a9 Dungeon Relics \u00b7 ' + t('brand.footerBase') + '</div>';
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (i) { obs.observe(i); });
  }

  return { el: el, buildNav: buildNav, buildFooter: buildFooter, initReveal: initReveal };
})();
