/* Femme Fatale CR — página de producto.
   productos/<id>.html (generadas por _herramientas/generar_seo.py) llevan
   data-product en <body>. producto.html?p=<id> redirige a esa URL limpia. */
(function () {
  "use strict";
  var FF = window.FF, $ = FF.$, $$ = FF.$$, esc = FF.esc;
  var C = window.FF_CONFIG;
  var id = document.body.getAttribute("data-product") || new URLSearchParams(location.search).get("p");
  var p = FF.byId[id];
  var root = $("#pdp-root");

  if (p && !document.body.hasAttribute("data-product")) { location.replace(FF.url(p)); return; }

  if (!p) {
    root.innerHTML = '<div class="empty" style="padding-block:120px"><i class="ph ph-magnifying-glass" aria-hidden="true"></i><h1>No encontramos este producto</h1><p>Puede que ya no esté disponible. Mira lo que tenemos hoy.</p><a class="btn" href="tienda.html"><span>Ver la tienda</span></a></div>';
    document.title = "Producto no encontrado | Femme Fatale CR";
    return;
  }

  var shade = p.shades ? p.shades[0].name : "";
  var qty = 1;

  /* ---------- Metadatos y datos estructurados ---------- */
  // Título, descripción, canonical y Open Graph vienen en el HTML generado.
  var canonical = $('link[rel="canonical"]');
  var pageUrl = canonical ? canonical.href : location.href;
  var ship = (C.shipping || []).filter(function (o) { return o.cost != null; }).map(function (o) {
    return { "@type": "OfferShippingDetails", shippingLabel: o.label,
      shippingRate: { "@type": "MonetaryAmount", value: o.cost, currency: "CRC" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "CR" } };
  });
  var ld = {
    "@context": "https://schema.org", "@type": "Product",
    name: FF.fullName(p), description: p.description, sku: p.id,
    brand: { "@type": "Brand", name: FF.brandName(p.brand) },
    image: p.images.map(function (i) { return FF.img(i, 1200, "1:1"); }),
    category: FF.catName(p.category),
    url: pageUrl,
    offers: { "@type": "Offer", url: pageUrl, priceCurrency: "CRC", price: p.price, itemCondition: "https://schema.org/NewCondition",
      availability: p.badge === "Por encargo" ? "https://schema.org/BackOrder" : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Femme Fatale CR" },
      shippingDetails: ship,
      hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: "CR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail", returnFees: "https://schema.org/ReturnShippingFees" } }
  };
  // Solo con reseñas reales: Google penaliza calificaciones sin respaldo
  if (p.reviews && !C.demo) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews };
  var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  /* ---------- Render ---------- */
  var fullName = FF.fullName(p);
  var srcsetFor = function (img) { var s = FF.srcset(img); return s ? s + ", " + FF.img(img, 1400) + " 1400w" : ""; };
  var slides = p.images.map(function (img, i) {
    return '<div class="gallery-slide" data-i="' + i + '"><img src="' + FF.img(img, 960) + '" srcset="' + srcsetFor(img) + '" sizes="(min-width:1024px) 50vw, 100vw" alt="' + esc(fullName) + (i ? ", vista " + (i + 1) : "") + '"' + (i ? ' loading="lazy"' : ' fetchpriority="high"') + ' width="960" height="1200"></div>';
  }).join("");
  var thumbs = p.images.map(function (img, i) {
    return '<button type="button" data-go="' + i + '" aria-label="Ver imagen ' + (i + 1) + '"' + (i ? "" : ' aria-current="true"') + '><img src="' + FF.img(img, 160) + '" alt="" loading="lazy" width="80" height="100"></button>';
  }).join("");
  var dots = p.images.length > 1 ? p.images.map(function (_, i) { return '<button type="button" data-go="' + i + '" aria-label="Imagen ' + (i + 1) + '"' + (i ? "" : ' aria-current="true"') + "></button>"; }).join("") : "";

  var swatches = p.shades
    ? '<div class="opt"><p class="opt-label" id="shade-label">Tono: <b id="shade-name">' + esc(shade) + '</b></p><div class="swatches" role="radiogroup" aria-labelledby="shade-label">' +
      p.shades.map(function (sh, i) {
        var look = sh.img ? ' swatch--img" style="--img:url(\'' + FF.img(sh.img, 120) + '\')"' : sh.hex ? '" style="--c:' + sh.hex + '"' : ' swatch--text"';
        return '<button class="swatch' + look + ' type="button" role="radio" aria-checked="' + (i === 0) + '" aria-label="' + esc(sh.name) + '" data-shade="' + esc(sh.name) + '">' + (sh.img || sh.hex ? "" : esc(sh.name)) + "</button>";
      }).join("") + "</div></div>"
    : "";

  var acc = [
    ["Descripción", p.description, true],
    ["Ingredientes", p.ingredients],
    ["Modo de uso", p.howto],
    ["Envíos y cambios", p.shipping + ' <a href="politicas.html#envios" style="text-decoration:underline">Ver políticas completas</a>.']
  ].map(function (a) {
    return "<details" + (a[2] ? " open" : "") + '><summary>' + a[0] + ' <i class="ph ph-plus" aria-hidden="true"></i></summary><div class="acc-body">' + a[1] + "</div></details>";
  }).join("");

  root.innerHTML =
    '<nav class="crumbs" aria-label="Ruta" style="padding-top:24px"><a href="index.html">Inicio</a><span aria-hidden="true">/</span><a href="tienda.html?cat=' + p.category + '">' + FF.catName(p.category) + '</a><span aria-hidden="true">/</span><span>' + esc(fullName) + "</span></nav>" +
    '<div class="pdp">' +
      '<div class="gallery"><div class="thumbs">' + (p.images.length > 1 ? thumbs : "") + '</div><div class="gallery-track" id="track" tabindex="0" aria-label="Imágenes del producto">' + slides + '</div><div class="gallery-dots">' + dots + "</div></div>" +
      '<div class="buy">' +
        '<a class="buy-brand" href="tienda.html?marca=' + p.brand + '">' + esc(FF.brandName(p.brand)) + "</a>" +
        "<h1>" + esc(p.name) + "</h1>" +
        (p.badge ? '<p class="label muted" style="margin-top:10px">' + esc(p.badge) + "</p>" : "") +
        FF.stars(p, true) +
        '<p class="buy-price">' + FF.price(p.price) + (p.compareAt ? ' <s class="muted" style="font-size:1rem">' + FF.price(p.compareAt) + "</s>" : "") + (window.FF_CONFIG.ivaRegistered ? ' <span class="buy-tax">IVA incluido</span>' : "") + "</p>" +
        '<p class="buy-lead">' + esc(p.description) + "</p>" +
        (p.size ? '<dl class="specs"><div><dt>Contenido</dt><dd>' + esc(p.size) + "</dd></div>" +
          (p.includes ? "<div><dt>Incluye</dt><dd>" + esc(p.includes) + "</dd></div>" : "") + "</dl>" : "") +
        (p.notes && p.notes.length ? '<div class="notes"><p class="notes-title">Bueno saber</p><ul>' +
          p.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></div>" : "") +
        swatches +
        '<div class="buy-actions">' +
          '<div class="qty" role="group" aria-label="Cantidad"><button type="button" data-q="-1" aria-label="Quitar uno"><i class="ph ph-minus"></i></button><output id="qty" aria-live="polite">1</output><button type="button" data-q="1" aria-label="Agregar uno"><i class="ph ph-plus"></i></button></div>' +
          '<button class="btn" type="button" id="add"><span>Agregar a la bolsa</span></button>' +
          '<a class="btn btn--ghost" id="wa-product" target="_blank" rel="noopener" href="#" style="grid-column:1/-1"><i class="ph ph-whatsapp-logo" aria-hidden="true"></i><span>Pedir por WhatsApp</span></a>' +
        "</div>" +
        '<ul class="buy-perks">' +
          '<li><i class="ph ph-truck" aria-hidden="true"></i>Envíos por Correos de Costa Rica desde ₡2 300, se cobran aparte</li>' +
          '<li><i class="ph ph-map-pin" aria-hidden="true"></i>Entrega personal gratis en Heredia</li>' +
          '<li><i class="ph ph-device-mobile" aria-hidden="true"></i>Paga con SINPE Móvil o transferencia</li>' +
        "</ul>" +
        '<div class="accordion">' + acc + "</div>" +
      "</div>" +
    "</div>";

  document.body.insertAdjacentHTML("beforeend",
    '<div class="buybar" id="buybar" aria-hidden="true"><div class="buybar-info"><b>' + esc(fullName) + '</b><span id="buybar-meta">' + FF.price(p.price) + (shade ? " · " + esc(shade) : "") + '</span></div><button class="btn" type="button" id="add-bar" tabindex="-1"><span>Agregar</span></button></div>' +
    '<dialog class="lightbox" id="lightbox" aria-label="Imagen ampliada"><div class="lightbox-scroll"><img id="lightbox-img" src="' + FF.img(p.images[0], 1600) + '" alt="' + esc(fullName) + '" loading="lazy"></div><button class="icon-btn" type="button" data-close aria-label="Cerrar"><i class="ph ph-x"></i></button></dialog>');

  /* ---------- WhatsApp con el producto ---------- */
  function waText() { return "Hola Femme Fatale, me interesa: " + fullName + (p.size ? ", " + p.size : "") + (shade ? ", tono " + shade : "") + ", cantidad " + qty + ". ¿Está disponible?"; }
  function syncWa() {
    $("#wa-product").href = FF.wa(waText());
    $("#wa-fab").href = FF.wa("Hola Femme Fatale, tengo una consulta sobre " + fullName + ".");
    $("#buybar-meta").textContent = FF.price(p.price) + (shade ? " · " + shade : "");
  }
  syncWa();

  /* ---------- Tonos y cantidad ---------- */
  root.addEventListener("click", function (e) {
    var sw = e.target.closest("[data-shade]");
    if (sw) {
      shade = sw.getAttribute("data-shade");
      $$("[data-shade]").forEach(function (b) { b.setAttribute("aria-checked", b === sw); });
      $("#shade-name").textContent = shade;
      showShade();
      syncWa();
    }
    var q = e.target.closest("[data-q]");
    if (q) { qty = Math.max(1, Math.min(20, qty + +q.getAttribute("data-q"))); $("#qty").textContent = qty; syncWa(); }
  });
  var add = function () { FF.addToCart(p.id, shade, qty, { open: true }); };
  $("#add").addEventListener("click", add);
  $("#add-bar").addEventListener("click", add);

  function showShade() {
    var img = FF.shadeImg(p, shade);
    var main = $("#track .gallery-slide img"), thumb = $(".thumbs button img");
    if (!main || main.getAttribute("data-shade-src") === img) return;
    main.setAttribute("data-shade-src", img);
    main.srcset = srcsetFor(img);
    main.src = FF.img(img, 960);
    if (thumb) thumb.src = FF.img(img, 160);
    $("#lightbox-img").src = FF.img(img, 1600);
    go(0);
  }

  /* ---------- Galería ---------- */
  var track = $("#track");
  var go = function (i) {
    var slide = track.children[i];
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: FF.reduced ? "auto" : "smooth" });
  };
  root.addEventListener("click", function (e) { var g = e.target.closest("[data-go]"); if (g) go(+g.getAttribute("data-go")); });
  if ("IntersectionObserver" in window) {
    var gio = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.intersectionRatio < .6) return;
        var i = x.target.getAttribute("data-i");
        $$("[data-go]").forEach(function (b) { b.setAttribute("aria-current", b.getAttribute("data-go") === i); });
      });
    }, { root: track, threshold: .6 });
    $$(".gallery-slide", track).forEach(function (sl) { gio.observe(sl); });
  }

  // Zoom: en escritorio, clic para ampliar y el puntero mueve el foco;
  // en táctil, toque abre la imagen completa con zoom de pellizco.
  var fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
  track.addEventListener("click", function (e) {
    var sl = e.target.closest(".gallery-slide"); if (!sl) return;
    if (fine.matches) {
      sl.classList.toggle("is-zoomed");
      setOrigin(sl, e);
    } else {
      var img = p.images[+sl.getAttribute("data-i")];
      $("#lightbox-img").src = FF.img(img, 1600);
      $("#lightbox-img").alt = p.name;
      FF.openDialog($("#lightbox"));
    }
  });
  function setOrigin(sl, e) {
    var r = sl.getBoundingClientRect();
    sl.style.setProperty("--zx", ((e.clientX - r.left) / r.width * 100) + "%");
    sl.style.setProperty("--zy", ((e.clientY - r.top) / r.height * 100) + "%");
  }
  track.addEventListener("pointermove", function (e) { var sl = e.target.closest(".gallery-slide.is-zoomed"); if (sl) setOrigin(sl, e); });
  track.addEventListener("pointerleave", function () { $$(".is-zoomed", track).forEach(function (sl) { sl.classList.remove("is-zoomed"); }); });
  var lb = $("#lightbox");
  lb.addEventListener("cancel", function (e) { e.preventDefault(); FF.closeDialog(lb); });
  lb.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) FF.closeDialog(lb); });

  /* ---------- Barra de compra fija en móvil ---------- */
  if ("IntersectionObserver" in window) {
    var bar = $("#buybar");
    new IntersectionObserver(function (en) {
      var show = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      bar.classList.toggle("is-visible", show);
      bar.setAttribute("aria-hidden", !show);
      $("#add-bar").tabIndex = show ? 0 : -1;
      document.body.classList.toggle("has-buybar", show && window.innerWidth < 1024);
    }).observe($("#add"));
  }

  /* ---------- Reseñas y relacionados ---------- */
  $("#resenas").hidden = false;
  $("#rev-summary").innerHTML = p.reviews ? FF.stars(p) + " " + p.rating.toFixed(1) + " de 5, " + p.reviews + " reseñas" : "Este producto aún no tiene reseñas.";
  $("#rev-cta").href = FF.wa("Hola Femme Fatale, quiero dejar una reseña de " + p.name + ":");

  var rel = window.FF_PRODUCTS.filter(function (x) { return x.id !== p.id; })
    .sort(function (a, b) { return (b.category === p.category) - (a.category === p.category); }).slice(0, 6);
  $("#related").innerHTML = rel.map(FF.card).join("");
  $("#related-wrap").hidden = false;
  FF.reveal(document);
})();
