/* ==========================================================================
   Femme Fatale CR — núcleo compartido
   Header, footer, carrito, búsqueda, WhatsApp, Instagram, animaciones.
   Depende de data.js. Cada página agrega su propio script (home/shop/product).
   ========================================================================== */
(function () {
  "use strict";

  var C = window.FF_CONFIG;
  var P = window.FF_PRODUCTS;
  var byId = {};
  P.forEach(function (p) { byId[p.id] = p; });

  var FF = window.FF = { byId: byId };

  /* ---------- Utilidades ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  FF.$ = $; FF.$$ = $$; FF.esc = esc;

  FF.price = function (n) { return "₡" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
  FF.img = window.ffImg;
  FF.srcset = function (id, ratio) {
    if (id.indexOf("/") > -1 && !/^https?:/.test(id)) return "";
    return [360, 540, 720, 960].map(function (w) { return FF.img(id, w, ratio) + " " + w + "w"; }).join(", ");
  };
  FF.brandName = function (id) { var b = (window.FF_BRANDS || []).filter(function (x) { return x.id === id; })[0]; return b ? b.name : ""; };
  FF.fullName = function (p) { return FF.brandName(p.brand) + " " + p.name; };
  FF.shadeImg = function (p, shade) {
    var s = (p.shades || []).filter(function (x) { return x.name === shade; })[0];
    return (s && s.img) || p.images[0];
  };
  FF.url = function (p) { return "producto.html?p=" + encodeURIComponent(p.id); };
  FF.catName = function (id) { var c = window.FF_CATEGORIES.filter(function (x) { return x.id === id; })[0]; return c ? c.name : ""; };
  FF.wa = function (text) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text); };
  FF.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado */ } }
  };

  /* ---------- Estrellas y tarjetas ---------- */
  FF.stars = function (p, withLink) {
    if (!p.reviews) return "";
    var pct = Math.round((p.rating / 5) * 100);
    var count = withLink ? '<a href="#resenas">' + p.reviews + " reseñas</a>" : "(" + p.reviews + ")";
    return '<span class="stars"><span class="stars-row" role="img" aria-label="' + p.rating.toFixed(1) + ' de 5 estrellas"><i style="width:' + pct + '%"></i></span>' + count + "</span>";
  };

  FF.card = function (p, i) {
    var badge = p.badge ? '<span class="card-badge">' + esc(p.badge) + "</span>" : "";
    var compare = p.compareAt ? "<s>" + FF.price(p.compareAt) + "</s>" : "";
    var alt = p.images[1] ? '<img class="img-alt" src="' + FF.img(p.images[1], 540) + '" srcset="' + FF.srcset(p.images[1]) + '" sizes="(min-width:1024px) 24vw, 50vw" alt="" aria-hidden="true" loading="lazy" decoding="async" width="540" height="675">' : "";
    return '<article class="card reveal" style="--i:' + (i || 0) + '">' +
      '<div class="card-media">' + badge +
        '<img src="' + FF.img(p.images[0], 540) + '" srcset="' + FF.srcset(p.images[0]) + '" sizes="(min-width:1024px) 24vw, 50vw" alt="' + esc(FF.fullName(p)) + '" loading="lazy" decoding="async" width="540" height="675">' +
        alt +
        '<button class="quick-add" type="button" data-add="' + p.id + '" aria-label="Agregar ' + esc(FF.fullName(p)) + ' al carrito"><i class="ph ph-plus" aria-hidden="true"></i><span>Agregar rápido</span></button>' +
      "</div>" +
      '<div class="card-body">' +
        '<p class="card-brand">' + esc(FF.brandName(p.brand)) + "</p>" +
        '<h3 class="card-title"><a href="' + FF.url(p) + '">' + esc(p.name) + "</a></h3>" +
        (p.size ? '<p class="card-size">' + esc(p.size) + "</p>" : "") +
        '<div class="card-meta"><span class="price">' + FF.price(p.price) + compare + "</span>" + FF.stars(p) + "</div>" +
      "</div></article>";
  };

  /* ---------- Shell: header, menú, búsqueda, carrito, footer ---------- */
  var LOGO = FF.logo = '<span class="logo-mark"><span class="logo-f">F</span><span class="logo-emme">EMME</span><span class="logo-star" aria-hidden="true"></span></span><span class="logo-caps">Fatale</span>';
  var page = document.body.getAttribute("data-page") || "";
  var navItems = [["tienda.html", "Tienda", "tienda"], ["nosotras.html", "Nosotras", "nosotras"], ["contacto.html", "Contacto", "contacto"]];
  var nav = navItems.map(function (n) {
    return '<a href="' + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
  }).join("");
  var catLinks = window.FF_CATEGORIES.map(function (c) { return '<a href="tienda.html?cat=' + c.id + '">' + c.name + "</a>"; }).join("") +
    '<a href="tienda.html?marca=rhode">Rhode</a><a href="tienda.html?marca=rare-beauty">Rare Beauty</a><a href="tienda.html?col=k-beauty">Skincare coreano</a>';

  var headerHTML =
    '<a class="skip" href="#main">Saltar al contenido</a>' +
    '<div class="announce" id="announce">Envíos a todo Costa Rica<span class="announce-more"> · Entregas personales en Heredia</span></div>' +
    '<header class="site-header" id="header"><div class="container header-bar">' +
      '<div class="header-left">' +
        '<button class="icon-btn menu-toggle" type="button" data-open="menu" aria-label="Abrir menú"><i class="ph ph-list" aria-hidden="true"></i></button>' +
        '<nav class="main-nav" aria-label="Principal">' + nav + "</nav>" +
      "</div>" +
      '<a class="logo" href="index.html" aria-label="Femme Fatale CR, inicio">' + LOGO + '</a>' +
      '<div class="header-right">' +
        '<button class="icon-btn" type="button" data-open="search" aria-label="Buscar"><i class="ph ph-magnifying-glass" aria-hidden="true"></i></button>' +
        '<button class="icon-btn" type="button" data-open="cart" aria-label="Carrito"><i class="ph ph-handbag" aria-hidden="true"></i><span class="cart-count" id="cart-count">0</span></button>' +
      "</div>" +
    "</div></header>" +

    '<dialog class="drawer drawer--left" id="menu" aria-label="Menú">' +
      '<div class="drawer-head"><a class="logo" href="index.html">' + LOGO + '</a>' +
      '<button class="icon-btn" type="button" data-close aria-label="Cerrar menú"><i class="ph ph-x" aria-hidden="true"></i></button></div>' +
      '<div class="drawer-body"><nav class="mobile-nav" aria-label="Menú móvil">' +
        '<a href="tienda.html">Tienda <i class="ph ph-arrow-right" aria-hidden="true"></i></a><div class="sub">' + catLinks + "</div>" +
        '<a href="nosotras.html">Nosotras <i class="ph ph-arrow-right" aria-hidden="true"></i></a>' +
        '<a href="contacto.html">Contacto <i class="ph ph-arrow-right" aria-hidden="true"></i></a>' +
      "</nav>" +
      '<div class="socials"><a href="https://www.instagram.com/' + C.instagram + '/" target="_blank" rel="noopener" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>' +
      '<a href="' + FF.wa("Hola Femme Fatale, tengo una consulta.") + '" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ph ph-whatsapp-logo"></i></a></div>' +
      "</div></dialog>" +

    '<dialog class="search-panel" id="search" aria-label="Buscar productos"><div class="container">' +
      '<form class="search-top" role="search" onsubmit="return false"><i class="ph ph-magnifying-glass" aria-hidden="true"></i>' +
      '<label class="sr-only" for="q">Buscar</label><input id="q" type="search" placeholder="Buscar Rhode, Rare Beauty, skincare coreano..." autocomplete="off">' +
      '<button class="icon-btn" type="button" data-close aria-label="Cerrar búsqueda"><i class="ph ph-x" aria-hidden="true"></i></button></form>' +
      '<div class="search-results" id="search-results" aria-live="polite"></div>' +
    "</div></dialog>" +

    '<dialog class="drawer" id="cart" aria-label="Carrito">' +
      '<div class="drawer-head"><h2>Tu bolsa</h2><button class="icon-btn" type="button" data-close aria-label="Cerrar carrito"><i class="ph ph-x" aria-hidden="true"></i></button></div>' +
      '<div class="drawer-body" id="cart-body"></div>' +
      '<div class="drawer-foot" id="cart-foot"></div>' +
    "</dialog>" +
    '<div class="toast" id="toast" role="status" aria-live="polite"></div>';

  var year = new Date().getFullYear();
  var footerHTML =
    '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div class="newsletter"><h2>Únete al club Fatale</h2><p>Lanzamientos, reposiciones y ofertas antes que nadie. Un correo al mes, nada más.</p>' +
          '<form class="nl-form" id="nl-form" novalidate><label for="nl-email">Correo electrónico</label>' +
          '<div class="nl-row"><input id="nl-email" name="email" type="email" autocomplete="email" placeholder="tucorreo@ejemplo.com" required>' +
          '<button class="btn" type="submit">Suscribirme</button></div>' +
          '<p class="nl-msg" id="nl-msg" role="status"></p>' +
          '<p class="consent">Al suscribirte aceptas recibir correos de Femme Fatale CR. Puedes darte de baja cuando quieras. Lee nuestra <a href="politicas.html#privacidad">política de privacidad</a>.</p></form>' +
        "</div>" +
        '<div class="footer-cols">' +
          '<div><h3>Tienda</h3><ul><li><a href="tienda.html">Ver todo</a></li>' + window.FF_CATEGORIES.map(function (c) { return '<li><a href="tienda.html?cat=' + c.id + '">' + c.name + "</a></li>"; }).join("") + "</ul></div>" +
          '<div><h3>Ayuda</h3><ul><li><a href="politicas.html#envios">Envíos</a></li><li><a href="politicas.html#cambios">Cambios y devoluciones</a></li><li><a href="contacto.html#preguntas">Preguntas frecuentes</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="politicas.html#privacidad">Privacidad</a></li><li><a href="politicas.html#terminos">Términos</a></li></ul></div>' +
          '<div><h3>Hablemos</h3><ul><li><a href="' + FF.wa("Hola Femme Fatale, tengo una consulta.") + '" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="mailto:' + C.email + '">' + C.email + "</a></li><li class=\"muted\">" + C.city + "</li></ul>" +
            '<div class="socials"><a href="https://www.instagram.com/' + C.instagram + '/" target="_blank" rel="noopener" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>' +
            '<a href="' + FF.wa("Hola Femme Fatale, tengo una consulta.") + '" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ph ph-whatsapp-logo"></i></a></div></div>' +
        "</div>" +
      "</div>" +
      '<p class="brand-note">Femme Fatale CR es una tienda independiente. Rhode, Rare Beauty, Summer Fridays, EADEM, Patrick Ta, ONE/SIZE, SKIN1004, Beauty of Joseon, innisfree y Yves Rocher son marcas registradas de sus respectivos dueños; no estamos afiliadas a ellas ni somos su distribuidora oficial.</p>' +
      '<div class="footer-base"><span>© ' + year + " Femme Fatale CR</span><span>" + (C.ivaRegistered ? "Precios con IVA incluido · " : "") + "Pagos por SINPE Móvil y transferencia</span></div>" +
    "</div></footer>" +
    '<a class="wa-fab" id="wa-fab" href="' + FF.wa("Hola Femme Fatale, tengo una consulta.") + '" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp" data-tip="¿Dudas? Escríbenos"><i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i></a>';

  var mh = $('[data-mount="header"]'); if (mh) mh.outerHTML = headerHTML;
  var mf = $('[data-mount="footer"]'); if (mf) mf.outerHTML = footerHTML;

  if (C.demo) {
    var dismissed = false;
    try { dismissed = sessionStorage.getItem("ff_demo_note") === "1"; } catch (e) {}
    if (!dismissed) {
      document.body.insertAdjacentHTML("afterbegin", '<div class="demo-note" id="demo-note"><span>Vista previa: precios de referencia, por confirmar.</span><button type="button" aria-label="Ocultar aviso"><i class="ph ph-x"></i></button></div>');
      $("#demo-note button").addEventListener("click", function () {
        $("#demo-note").remove();
        try { sessionStorage.setItem("ff_demo_note", "1"); } catch (e) {}
      });
    }
  }

  /* ---------- Diálogos con animación de salida ---------- */
  var lastFocus = null;
  FF.openDialog = function (d) {
    if (!d || d.open) return;
    lastFocus = document.activeElement;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  FF.closeDialog = function (d) {
    if (!d || !d.open || d.classList.contains("is-closing")) return;
    d.classList.add("is-closing");
    var done = function () {
      d.classList.remove("is-closing");
      d.close();
      if (!$("dialog[open]")) document.documentElement.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    if (FF.reduced) return done();
    var t = setTimeout(done, 400);
    d.addEventListener("animationend", function h() { clearTimeout(t); d.removeEventListener("animationend", h); done(); });
  };
  $$("dialog").forEach(function (d) {
    d.addEventListener("cancel", function (e) { e.preventDefault(); FF.closeDialog(d); });
    d.addEventListener("click", function (e) {
      if (e.target === d) { FF.closeDialog(d); return; }
      if (e.target.closest("[data-close]")) FF.closeDialog(d);
    });
  });
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]");
    if (o) {
      var id = o.getAttribute("data-open");
      if (id === "cart") renderCart();
      FF.openDialog($("#" + id));
      if (id === "search") { renderSearch(""); setTimeout(function () { $("#q").focus(); }, 30); }
    }
  });

  /* ---------- Header con borde al hacer scroll ---------- */
  var ann = $("#announce");
  if (ann && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { $("#header").classList.toggle("is-stuck", !en[0].isIntersecting); }).observe(ann);
  }

  /* ---------- Toast ---------- */
  var toastT;
  FF.toast = function (msg) {
    var t = $("#toast");
    t.innerHTML = '<i class="ph ph-check" aria-hidden="true"></i><span>' + esc(msg) + "</span>";
    t.classList.add("is-visible");
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove("is-visible"); }, 2600);
  };

  /* ---------- Carrito ---------- */
  var cart = store.get("ff_cart", []).filter(function (l) { return byId[l.id]; });
  var save = function () { store.set("ff_cart", cart); updateCount(); };
  var count = function () { return cart.reduce(function (a, l) { return a + l.qty; }, 0); };
  var total = function () { return cart.reduce(function (a, l) { return a + byId[l.id].price * l.qty; }, 0); };
  var ships = C.shipping || [];
  var shipId = store.get("ff_ship", "");
  var ship = function () { return ships.filter(function (s) { return s.id === shipId; })[0]; };
  var shipCost = function (s) { return s.cost == null ? "A coordinar" : s.cost === 0 ? "Gratis" : FF.price(s.cost); };

  function updateCount(bump) {
    var el = $("#cart-count"), n = count();
    el.textContent = n;
    el.classList.toggle("has-items", n > 0);
    $("[data-open='cart']").setAttribute("aria-label", "Carrito, " + n + (n === 1 ? " producto" : " productos"));
    if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  }

  FF.addToCart = function (id, shade, qty, opts) {
    var p = byId[id]; if (!p) return;
    if (!shade && p.shades) shade = p.shades[0].name;
    var line = cart.filter(function (l) { return l.id === id && (l.shade || "") === (shade || ""); })[0];
    if (line) line.qty += qty || 1; else cart.push({ id: id, shade: shade || "", qty: qty || 1 });
    save(); updateCount(true);
    if (opts && opts.open) { renderCart(); FF.openDialog($("#cart")); }
    else FF.toast("Agregado a tu bolsa: " + FF.fullName(p) + (shade ? " (" + shade + ")" : ""));
  };

  function orderText() {
    var lines = cart.map(function (l) {
      var p = byId[l.id];
      return "- " + l.qty + " x " + FF.fullName(p) + (p.size ? ", " + p.size : "") + (l.shade ? ", tono " + l.shade : "") + ": " + FF.price(p.price * l.qty);
    });
    var s = ship(), text = "Hola Femme Fatale, quiero hacer este pedido:\n" + lines.join("\n") +
      "\n\nProductos" + (C.ivaRegistered ? " (IVA incluido)" : "") + ": " + FF.price(total());
    if (!s) return text + "\nEnvío: por definir (Correos de Costa Rica o entrega personal en Heredia)\n\nNombre:\nDirección:";
    text += "\nEnvío, " + s.label + ": " + shipCost(s);
    if (s.cost != null) text += "\nTotal a pagar: " + FF.price(total() + s.cost);
    return text + "\n\nNombre:\n" + (s.local ? "Punto de entrega preferido:" : "Dirección (provincia, cantón, distrito y señas):");
  }

  function shipField() {
    return '<fieldset class="ship"><legend>Entrega</legend>' + ships.map(function (o) {
      return '<label class="ship-opt"><input type="radio" name="ship" value="' + o.id + '"' + (o.id === shipId ? " checked" : "") + ">" +
        "<span><b>" + esc(o.label) + "</b><small>" + esc(o.note) + "</small></span><strong>" + shipCost(o) + "</strong></label>";
    }).join("") + '<p class="foot-note">Tarifas de Correos para paquetes de hasta ' + (C.shippingMaxKg || 1) + " kg. Si tu pedido pesa más, te confirmamos el costo.</p></fieldset>";
  }

  function cartFoot() {
    var s = ship();
    return '<div class="totals"><div class="subtotal"><span>Productos</span><strong>' + FF.price(total()) + "</strong></div>" +
      '<div class="subtotal"><span>Envío</span><strong>' + (s ? shipCost(s) : "Elige una opción") + "</strong></div>" +
      (s && s.cost != null ? '<div class="subtotal subtotal--total"><span>Total</span><strong>' + FF.price(total() + s.cost) + "</strong></div>" : "") + "</div>" +
      '<p class="foot-note">' + (C.ivaRegistered ? "Precios con IVA incluido. " : "") + "Pagas por SINPE Móvil o transferencia al confirmar el pedido.</p>" +
      '<a class="btn btn--block btn--wa" href="' + FF.wa(orderText()) + '" target="_blank" rel="noopener"><i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i><span>Finalizar por WhatsApp</span></a>';
  }

  function renderCart() {
    var body = $("#cart-body"), foot = $("#cart-foot");
    if (!cart.length) {
      body.innerHTML = '<div class="empty"><i class="ph ph-handbag" aria-hidden="true"></i><h3>Tu bolsa está vacía</h3><p>Los favoritos de la casa te esperan en la tienda.</p><a class="btn" href="tienda.html">Ver la tienda</a></div>';
      foot.hidden = true;
      return;
    }
    foot.hidden = false;
    body.innerHTML = cart.map(function (l, i) {
      var p = byId[l.id];
      return '<div class="line-item"><a href="' + FF.url(p) + '"><img src="' + FF.img(FF.shadeImg(p, l.shade), 200) + '" alt="" width="84" height="105" loading="lazy"></a><div>' +
        '<a class="li-name" href="' + FF.url(p) + '"><span class="card-brand">' + esc(FF.brandName(p.brand)) + "</span>" + esc(p.name) + "</a>" +
        (l.shade ? '<p class="li-shade">Tono: ' + esc(l.shade) + "</p>" : "") +
        '<div class="li-row"><div class="qty" role="group" aria-label="Cantidad"><button type="button" data-qty="-1" data-i="' + i + '" aria-label="Quitar uno"><i class="ph ph-minus"></i></button><output aria-live="polite">' + l.qty + '</output><button type="button" data-qty="1" data-i="' + i + '" aria-label="Agregar uno"><i class="ph ph-plus"></i></button></div>' +
        '<span class="price">' + FF.price(p.price * l.qty) + "</span></div>" +
        '<button class="li-remove" type="button" data-remove="' + i + '">Eliminar</button></div></div>';
    }).join("") + shipField();
    foot.innerHTML = cartFoot();
  }
  FF.renderCart = renderCart;

  $("#cart").addEventListener("change", function (e) {
    if (e.target.name !== "ship") return;
    shipId = e.target.value; store.set("ff_ship", shipId);
    $("#cart-foot").innerHTML = cartFoot();
  });

  $("#cart").addEventListener("click", function (e) {
    var q = e.target.closest("[data-qty]"), r = e.target.closest("[data-remove]");
    if (q) {
      var i = +q.getAttribute("data-i");
      cart[i].qty += +q.getAttribute("data-qty");
      if (cart[i].qty < 1) cart.splice(i, 1);
      save(); renderCart();
    } else if (r) {
      cart.splice(+r.getAttribute("data-remove"), 1);
      save(); renderCart();
    }
  });

  /* WhatsApp en celulares: abrir en la misma pestaña. El navegador interno de
     Instagram y Facebook bloquea o deja en blanco las pestañas nuevas, y así
     el enlace wa.me abre directamente la app de WhatsApp. */
  document.addEventListener("click", function (e) {
    var wa = e.target.closest('a[href^="https://wa.me/"]');
    if (wa && window.matchMedia("(pointer: coarse)").matches) {
      e.preventDefault();
      window.location.href = wa.href;
    }
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]");
    if (a) { e.preventDefault(); FF.addToCart(a.getAttribute("data-add"), null, 1, { open: true }); }
  });
  updateCount();

  /* ---------- Búsqueda ---------- */
  var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  function renderSearch(q) {
    var box = $("#search-results");
    var term = norm(q.trim());
    if (!term) {
      box.innerHTML = '<p class="search-hint">Búsquedas populares</p><div class="chips">' +
        ["Rhode", "Rare Beauty", "Blush", "Lip", "Yves Rocher", "SPF"].map(function (t) { return '<button class="chip" type="button" data-term="' + t + '">' + t + "</button>"; }).join("") + "</div>";
      return;
    }
    var hits = P.filter(function (p) { return norm(FF.fullName(p) + " " + FF.catName(p.category) + " " + p.description + " " + (p.shades || []).map(function (s) { return s.name; }).join(" ")).indexOf(term) > -1; });
    box.innerHTML = hits.length
      ? '<p class="search-hint">' + hits.length + (hits.length === 1 ? " resultado" : " resultados") + '</p><div class="grid" style="margin-top:20px">' + hits.map(FF.card).join("") + "</div>"
      : '<div class="empty"><i class="ph ph-magnifying-glass" aria-hidden="true"></i><h3>Sin resultados para "' + esc(q) + '"</h3><p>Prueba con otra palabra o escríbenos: lo buscamos por ti.</p><a class="btn btn--wa" target="_blank" rel="noopener" href="' + FF.wa("Hola, busco: " + q) + '"><span>Preguntar por WhatsApp</span></a></div>';
    FF.reveal(box);
  }
  $("#q").addEventListener("input", function (e) { renderSearch(e.target.value); });
  $("#search-results").addEventListener("click", function (e) {
    var c = e.target.closest("[data-term]");
    if (c) { $("#q").value = c.getAttribute("data-term"); renderSearch($("#q").value); }
  });

  /* ---------- Boletín ---------- */
  $("#nl-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("#nl-email"), msg = $("#nl-msg");
    msg.classList.remove("is-error");
    if (!input.checkValidity()) {
      msg.textContent = "Revisa el correo: parece incompleto.";
      msg.classList.add("is-error");
      input.focus();
      return;
    }
    if (!C.newsletterEndpoint) {
      msg.textContent = "El club abre muy pronto. Mientras tanto, síguenos en Instagram para no perderte nada.";
      return;
    }
    var btn = this.querySelector("button");
    btn.disabled = true;
    fetch(C.newsletterEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: input.value }) })
      .then(function (r) { if (!r.ok) throw 0; msg.textContent = "Listo. Revisa tu correo para confirmar la suscripción."; input.value = ""; })
      .catch(function () { msg.textContent = "No pudimos registrarte. Intenta de nuevo en un momento."; msg.classList.add("is-error"); })
      .then(function () { btn.disabled = false; });
  });

  /* ---------- Instagram ---------- */
  FF.renderInstagram = function (el) {
    if (!el) return;
    var tile = function (href, src, alt, label, tagged, ext) {
      return '<a class="ig-tile reveal" href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ' aria-label="' + esc(label) + '">' +
        '<img src="' + src + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" width="400" height="400">' +
        '<span class="ig-over"><span><i class="ph ' + (tagged ? "ph-handbag" : "ph-instagram-logo") + '" aria-hidden="true"></i>' + (tagged ? "Comprar el look" : "Ver en Instagram") + "</span></span>" +
        (tagged ? '<span class="ig-tag" aria-hidden="true"><i class="ph ph-tag"></i></span>' : "") + "</a>";
    };
    var fallback = function () {
      el.innerHTML = window.FF_IG_POSTS.map(function (post) {
        var p = byId[post.product];
        return p ? tile(FF.url(p), FF.img(post.img, 400, "1:1"), post.alt, "Comprar el look: " + p.name, true)
                 : tile("https://www.instagram.com/" + C.instagram + "/", FF.img(post.img, 400, "1:1"), post.alt, "Ver en Instagram", false, true);
      }).join("");
      FF.reveal(el);
    };
    if (!C.instagramFeedUrl) return fallback();
    el.innerHTML = new Array(7).join('<div class="ig-tile skeleton"></div>');
    fetch(C.instagramFeedUrl).then(function (r) { return r.json(); }).then(function (data) {
      var posts = (data.posts || data.data || data || []).slice(0, 6);
      if (!posts.length) throw 0;
      el.innerHTML = posts.map(function (p) {
        var src = (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) || p.thumbnailUrl || p.mediaUrl || p.media_url;
        return tile(p.permalink, src, (p.caption || "Publicación de Instagram").slice(0, 120), "Ver publicación en Instagram", false, true);
      }).join("");
      FF.reveal(el);
    }).catch(fallback);
  };

  /* ---------- Aparición al hacer scroll ---------- */
  var io = ("IntersectionObserver" in window) && !FF.reduced
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var i = +getComputedStyle(en.target).getPropertyValue("--i") || 0;
          en.target.style.transitionDelay = Math.min(i, 6) * 70 + "ms";
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        });
      }, { rootMargin: "0px 0px -8% 0px" })
    : null;
  FF.reveal = function (root) {
    $$(".reveal:not(.is-in)", root).forEach(function (el) { io ? io.observe(el) : el.classList.add("is-in"); });
  };
  FF.reveal(document);
})();
