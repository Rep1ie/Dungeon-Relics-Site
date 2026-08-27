/* main.js — точка входа: строит навигацию/подвал и рендерит контент. */
(function () {
  function boot() {
    var body = document.body;
    var page = body.getAttribute('data-page') || 'home';
    var view = body.getAttribute('data-view') || '';
    // Заполняем статические подписи (data-i18n / data-i18n-attr) до рендера.
    if (DR.applyStatic) DR.applyStatic(document);
    if (DR.ui) {
      DR.ui.buildNav(page);
      DR.ui.buildFooter();
    }
    var host = document.getElementById('page-content');
    if (host && DR.render) {
      if (view === 'skill') DR.render.skillPage(host);
      else if (view === 'monster') DR.render.monsterPage(host);
      else if (view === 'item') DR.render.itemPage(host);
      else if (page === 'classes') DR.render.classes(host);
      else if (page === 'bestiary') DR.render.bestiary(host);
      else if (page === 'loot') DR.render.loot(host);
    }
    if (DR.ui) DR.ui.initReveal();
    // Плавный переход к якорю класса (если пришли с детальной страницы).
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
