/* Femme Fatale CR — inicio: carrusel de más pedidas + Instagram */
(function () {
  "use strict";
  var FF = window.FF, $ = FF.$;

  var track = $("#best");
  var best = window.FF_PRODUCTS.filter(function (p) { return p.collections.indexOf("mas-pedidas") > -1; });
  track.innerHTML = best.map(FF.card).join("");
  FF.reveal(track);

  // Flechas: se desactivan cuando la primera o la última tarjeta está visible
  var prev = $('[data-dir="-1"]'), next = $('[data-dir="1"]');
  var cards = track.children;
  if ("IntersectionObserver" in window && cards.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var full = en.intersectionRatio > 0.9;
        if (en.target === cards[0]) prev.disabled = full;
        if (en.target === cards[cards.length - 1]) next.disabled = full;
      });
    }, { root: track, threshold: [0, 0.9, 1] });
    io.observe(cards[0]);
    io.observe(cards[cards.length - 1]);
  }
  [prev, next].forEach(function (b) {
    b.addEventListener("click", function () {
      var step = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 16);
      track.scrollBy({ left: step * +b.getAttribute("data-dir"), behavior: FF.reduced ? "auto" : "smooth" });
    });
  });

  FF.renderInstagram($("#ig-grid"));
})();
