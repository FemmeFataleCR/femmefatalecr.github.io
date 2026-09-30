/* Femme Fatale CR — tienda: filtros, orden y cuadrícula */
(function () {
  "use strict";
  var FF = window.FF, $ = FF.$, $$ = FF.$$;
  var P = window.FF_PRODUCTS;

  var groups = [
    { key: "cat", title: "Categoría", items: window.FF_CATEGORIES, match: function (p, v) { return p.category === v; } },
    { key: "marca", title: "Marca", items: window.FF_BRANDS, match: function (p, v) { return p.brand === v; } },
    { key: "skin", title: "Tipo de piel", items: window.FF_SKIN, match: function (p, v) { return p.skin.indexOf(v) > -1; } },
    { key: "col", title: "Colección", items: window.FF_COLLECTIONS, match: function (p, v) { return p.collections.indexOf(v) > -1; } }
  ];

  // Estado desde la URL: ?cat=labios,ojos&skin=grasa&col=noche&orden=precio-asc
  var params = new URLSearchParams(location.search);
  var state = { sort: params.get("orden") || "destacados" };
  groups.forEach(function (g) { state[g.key] = (params.get(g.key) || "").split(",").filter(Boolean); });

  function filtered(except) {
    return P.filter(function (p) {
      return groups.every(function (g) {
        if (g.key === except || !state[g.key].length) return true;
        return state[g.key].some(function (v) { return g.match(p, v); });
      });
    });
  }

  function filtersHTML(prefix) {
    return groups.map(function (g) {
      var pool = filtered(g.key);
      return '<fieldset class="filter-group"><legend class="sr-only">' + g.title + "</legend><h3 aria-hidden=\"true\">" + g.title + "</h3>" +
        g.items.map(function (it) {
          var n = pool.filter(function (p) { return g.match(p, it.id); }).length;
          var on = state[g.key].indexOf(it.id) > -1;
          return '<label class="check"><input type="checkbox" data-key="' + g.key + '" value="' + it.id + '"' + (on ? " checked" : "") + (!n && !on ? " disabled" : "") + ">" + it.name + "<small>" + n + "</small></label>";
        }).join("") + "</fieldset>";
    }).join("") + '<button class="clear-filters" type="button" data-clear>Borrar filtros</button>';
  }

  var sorters = {
    "destacados": function (a, b) { return P.indexOf(a) - P.indexOf(b); },
    "precio-asc": function (a, b) { return a.price - b.price; },
    "precio-desc": function (a, b) { return b.price - a.price; },
    "valorados": function (a, b) { return (b.rating || 0) - (a.rating || 0) || b.reviews - a.reviews; },
    "novedades": function (a, b) { return (b.badge === "Nuevo") - (a.badge === "Nuevo"); }
  };

  function render() {
    var list = filtered().sort(sorters[state.sort] || sorters.destacados);
    var grid = $("#grid");

    grid.innerHTML = list.length
      ? list.map(FF.card).join("")
      : '<div class="empty" style="grid-column:1/-1"><i class="ph ph-sparkle" aria-hidden="true"></i><h3>Ningún producto coincide</h3><p>Quita algún filtro o pregúntanos por WhatsApp: tenemos más de lo que cabe aquí.</p><button class="btn btn--ghost" type="button" data-clear><span>Borrar filtros</span></button></div>';
    FF.reveal(grid);

    $("#count").textContent = list.length + (list.length === 1 ? " producto" : " productos") + (window.FF_CONFIG.ivaRegistered ? " · IVA incluido" : "");
    $("#apply-filters span").textContent = "Ver " + list.length + (list.length === 1 ? " producto" : " productos");
    $("#filters-desktop").innerHTML = filtersHTML("d");
    $("#filters-mobile").innerHTML = filtersHTML("m");
    $("#sort").value = state.sort;

    // Chips de filtros activos
    var chips = [];
    groups.forEach(function (g) {
      state[g.key].forEach(function (v) {
        var it = g.items.filter(function (x) { return x.id === v; })[0];
        if (it) chips.push('<button type="button" data-remove-key="' + g.key + '" data-value="' + v + '" aria-label="Quitar filtro ' + it.name + '">' + it.name + ' <i class="ph ph-x" aria-hidden="true"></i></button>');
      });
    });
    $("#active-chips").innerHTML = chips.join("");

    // Título según categoría única
    var cat = state.cat.length === 1 && !state.marca.length ? FF.catName(state.cat[0])
      : state.marca.length === 1 && !state.cat.length ? FF.brandName(state.marca[0])
      : state.col.length === 1 && !state.cat.length && !state.marca.length ? window.FF_COLLECTIONS.filter(function (c) { return c.id === state.col[0]; })[0].name
      : "";
    $("#shop-title").textContent = cat || "Toda la tienda";
    $("#crumb-current").textContent = cat || "Tienda";
    document.title = (cat || "Tienda") + " | Femme Fatale CR";

    // URL compartible
    var q = new URLSearchParams();
    groups.forEach(function (g) { if (state[g.key].length) q.set(g.key, state[g.key].join(",")); });
    if (state.sort !== "destacados") q.set("orden", state.sort);
    history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q.toString() : ""));
  }

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.matches("input[data-key]")) {
      var arr = state[t.getAttribute("data-key")];
      var i = arr.indexOf(t.value);
      if (t.checked && i < 0) arr.push(t.value);
      if (!t.checked && i > -1) arr.splice(i, 1);
      render();
    } else if (t.id === "sort") {
      state.sort = t.value;
      render();
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-clear]")) {
      groups.forEach(function (g) { state[g.key] = []; });
      render();
    }
    var chip = e.target.closest("[data-remove-key]");
    if (chip) {
      var arr = state[chip.getAttribute("data-remove-key")];
      arr.splice(arr.indexOf(chip.getAttribute("data-value")), 1);
      render();
    }
  });

  // El cierre del diálogo (Esc, fondo, botones data-close) lo maneja app.js
  $("#open-filters").addEventListener("click", function () { FF.openDialog($("#filter-sheet")); });

  render();
})();
