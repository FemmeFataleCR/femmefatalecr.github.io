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

  /* ---------- Reseñas reales (FF_REVIEWS en data.js) ---------- */
  var reviews = (window.FF_REVIEWS || []).filter(function (r) { return r && r.text && r.name; });
  if (reviews.length) {
    $("#reviews-grid").innerHTML = reviews.slice(0, 6).map(function (r, i) {
      var p = r.product && FF.byId[r.product];
      var stars = Math.max(1, Math.min(5, Math.round(r.rating || 5)));
      return '<figure class="review reveal" style="--i:' + i + '">' +
        '<span class="review-stars" role="img" aria-label="' + stars + ' de 5 estrellas">' + new Array(stars + 1).join("★") + "</span>" +
        "<blockquote>" + FF.esc(r.text) + "</blockquote>" +
        "<figcaption><b>" + FF.esc(r.name) + "</b>" + (r.city ? ", " + FF.esc(r.city) : "") +
        (p ? '<a href="' + FF.url(p) + '">' + FF.esc(FF.fullName(p)) + "</a>" : "") + "</figcaption></figure>";
    }).join("");
    $("#resenas").hidden = false;
    FF.reveal($("#resenas"));
  }

  /* ---------- Restock ---------- */
  var form = $("#restock-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = $("#rs-email"), product = $("#rs-product"), msg = $("#restock-msg");
      msg.classList.remove("is-error");
      if (!email.checkValidity()) {
        msg.textContent = "Revisa el correo: parece incompleto.";
        msg.classList.add("is-error");
        email.focus();
        return;
      }
      var id = window.FF_CONFIG.formspreeId;
      if (!id) {
        // Sin Formspree: la solicitud va por WhatsApp
        msg.innerHTML = 'Envíanos tu solicitud por WhatsApp y te avisamos apenas llegue: <a class="link-underline" target="_blank" rel="noopener" href="' +
          FF.wa("Hola Femme Fatale, avísenme cuando vuelva" + (product.value ? ": " + product.value : " un producto") + ". Mi correo es " + email.value + ".") +
          '">abrir WhatsApp</a>.';
        return;
      }
      var btn = form.querySelector("button");
      btn.disabled = true;
      fetch("https://formspree.io/f/" + id, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw 0; msg.textContent = "Listo. Te escribiremos apenas llegue el restock."; form.reset(); })
        .catch(function () { msg.textContent = "No pudimos guardar tu correo. Intenta de nuevo o escríbenos por WhatsApp."; msg.classList.add("is-error"); })
        .then(function () { btn.disabled = false; });
    });
  }
})();
