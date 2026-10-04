"""Femme Fatale CR: páginas de producto con URL limpia, sitemap.xml, robots.txt y llms.txt.

Ejecutar después de cualquier cambio en assets/js/data.js (productos, nombres,
descripciones, imágenes o precios):

    python _herramientas/generar_seo.py

Lee el catálogo directamente de data.js (con Node), así que las páginas, el
sitemap y llms.txt no pueden quedar desalineados con la tienda. Jekyll no
publica carpetas que empiezan con "_", por eso este script no queda en línea.
"""
import datetime, html, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://femmefatalecr.github.io/"
OUT_DIR = os.path.join(ROOT, "productos")
TODAY = datetime.date.today().isoformat()
PAGES = [  # ruta, prioridad
    ("", "1.0"), ("tienda.html", "0.9"), ("nosotras.html", "0.5"),
    ("contacto.html", "0.6"), ("politicas.html", "0.4"),
]

NODE = r"""
global.window = {};
require(process.argv[1]);
const W = window, brand = id => (W.FF_BRANDS.find(b => b.id === id) || {}).name || id;
const cat = id => (W.FF_CATEGORIES.find(c => c.id === id) || {}).name || "";
console.log(JSON.stringify({
  config: { whatsapp: W.FF_CONFIG.whatsapp, instagram: W.FF_CONFIG.instagram, shipping: W.FF_CONFIG.shipping },
  products: W.FF_PRODUCTS.map(p => ({
    id: p.id, brand: brand(p.brand), brandId: p.brand, name: p.name, category: cat(p.category), categoryId: p.category,
    description: p.description, size: p.size || "", price: p.price, badge: p.badge || "",
    image: W.ffImg(p.images[0], 1200, "1:1"), images: p.images.map(i => W.ffImg(i, 1200, "1:1")),
    // Igual que srcsetFor() en product.js: la imagen principal se precarga (LCP)
    lcp: W.ffImg(p.images[0], 960),
    lcpSrcset: /^https?:/.test(p.images[0]) ? [240, 360, 540, 720, 960, 1400].map(w => W.ffImg(p.images[0], w) + " " + w + "w").join(", ") : ""
  }))
}));
"""


def load():
    data_js = os.path.join(ROOT, "assets", "js", "data.js")
    r = subprocess.run(["node", "-e", NODE, data_js], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit("No se pudo leer data.js:\n" + r.stderr)
    return json.loads(r.stdout)


def absolute(url):
    return url if re.match(r"https?://", url) else SITE + url.lstrip("/")


def attr(s):
    return html.escape(s, quote=True)


def clip(s, n=158):
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= n else s[: n - 1].rsplit(" ", 1)[0] + "…"


def product_page(template, p):
    full = f"{p['brand']} {p['name']}"
    url = f"{SITE}productos/{p['id']}.html"
    title = f"{full} en Costa Rica | Femme Fatale CR"
    desc = clip(f"{full}{', ' + p['size'] if p['size'] else ''}. {p['description']} Envíos a todo Costa Rica y pedidos por WhatsApp.")
    img = absolute(p["image"])
    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": p["category"], "item": f"{SITE}tienda.html?cat={p['categoryId']}"},
            {"@type": "ListItem", "position": 3, "name": full, "item": url},
        ]}
    head = "\n".join([
        f'<base href="../">',
        f'<link rel="canonical" href="{url}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:site_name" content="Femme Fatale CR">',
        f'<meta property="og:title" content="{attr(full)} | Femme Fatale CR">',
        f'<meta property="og:description" content="{attr(desc)}">',
        f'<meta property="og:image" content="{attr(img)}">',
        f'<meta property="og:image:alt" content="{attr(full)}">',
        f'<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{attr(full)} | Femme Fatale CR">',
        f'<meta name="twitter:description" content="{attr(desc)}">',
        f'<meta name="twitter:image" content="{attr(img)}">',
        f'<link rel="preload" as="image" href="{attr(p["lcp"])}"'
        + (f' imagesrcset="{attr(p["lcpSrcset"])}" imagesizes="(min-width:1024px) 50vw, 100vw"' if p["lcpSrcset"] else "")
        + ' fetchpriority="high">',
        '<script type="application/ld+json">' + json.dumps(crumbs, ensure_ascii=False) + "</script>",
    ])
    s = template
    s = s.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + head, 1)
    s = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", s, count=1)
    s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{attr(desc)}">', s, count=1)
    s = re.sub(r'<meta name="robots"[^>]*data-plantilla[^>]*>\n', "", s, count=1)
    s = s.replace('<body data-page="tienda">', f'<body data-page="tienda" data-product="{p["id"]}">', 1)
    s = re.sub(r"<!-- Plantilla:.*?-->", "<!-- Generada por _herramientas/generar_seo.py desde producto.html. No editar a mano. -->", s, count=1, flags=re.S)
    assert "<base href" in s and f'data-product="{p["id"]}"' in s and "data-plantilla" not in s, p["id"]
    return s


def sitemap(products):
    rows = [f"  <url><loc>{SITE}{path}</loc><lastmod>{TODAY}</lastmod><priority>{pri}</priority></url>" for path, pri in PAGES]
    for p in products:
        rows.append(
            f"  <url><loc>{SITE}productos/{p['id']}.html</loc><lastmod>{TODAY}</lastmod><priority>0.8</priority>"
            + "".join(f"<image:image><image:loc>{html.escape(absolute(i))}</image:loc></image:image>" for i in p["images"][:3])
            + "</url>")
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
            + "\n".join(rows) + "\n</urlset>\n")


def robots():
    return ("User-agent: *\nAllow: /\nDisallow: /marca/\n\n"
            f"Sitemap: {SITE}sitemap.xml\n")


def llms(data):
    c, ps = data["config"], data["products"]
    money = lambda n: "₡" + f"{n:,}".replace(",", " ")
    ship = "; ".join(f"{s['label']}: " + ("gratis" if s["cost"] == 0 else "a coordinar" if s["cost"] is None else money(s["cost"]))
                     for s in c["shipping"])
    lines = [
        "# Femme Fatale CR",
        "",
        "> Tienda independiente de maquillaje y skincare en Heredia, Costa Rica: Rhode, Rare Beauty, favoritos de Sephora, "
        "skincare coreano y Yves Rocher. Pedidos por WhatsApp, pago por SINPE Móvil o transferencia y envíos por Correos de "
        "Costa Rica a todo el país. No está afiliada a las marcas que vende.",
        "",
        f"- Precios en colones costarricenses, actualizados al {TODAY}. El envío se cobra aparte: {ship}.",
        f"- WhatsApp: +506 {c['whatsapp'][3:7]}-{c['whatsapp'][7:]}. Instagram: @{c['instagram']}.",
        "- Productos marcados \"por encargo\": se confirma disponibilidad y plazo por WhatsApp antes del pago.",
        "",
        "## Páginas",
        "",
        f"- [Inicio]({SITE}): marcas, productos destacados y preguntas frecuentes",
        f"- [Tienda]({SITE}tienda.html): catálogo completo con filtros por categoría, marca y tipo de piel",
        f"- [Políticas]({SITE}politicas.html): envíos, cambios en 7 días con producto sellado, privacidad y términos",
        f"- [Contacto]({SITE}contacto.html): WhatsApp, Instagram y preguntas frecuentes",
        f"- [Nosotras]({SITE}nosotras.html): quiénes somos",
        "",
        "## Productos",
        "",
    ]
    for p in ps:
        extra = " (por encargo)" if p["badge"] == "Por encargo" else ""
        lines.append(f"- [{p['brand']} {p['name']}]({SITE}productos/{p['id']}.html): {money(p['price'])}"
                     f"{', ' + p['size'] if p['size'] else ''}{extra}. {p['description']}")
    return "\n".join(lines) + "\n"


def main():
    data = load()
    ps = data["products"]
    template = open(os.path.join(ROOT, "producto.html"), encoding="utf-8").read()
    os.makedirs(OUT_DIR, exist_ok=True)
    want = {p["id"] + ".html" for p in ps}
    for f in os.listdir(OUT_DIR):  # páginas de productos retirados
        if f.endswith(".html") and f not in want:
            os.remove(os.path.join(OUT_DIR, f))
            print("retirada:", f)
    for p in ps:
        with open(os.path.join(OUT_DIR, p["id"] + ".html"), "w", encoding="utf-8", newline="\n") as fh:
            fh.write(product_page(template, p))
    for name, body in (("sitemap.xml", sitemap(ps)), ("robots.txt", robots()), ("llms.txt", llms(data))):
        with open(os.path.join(ROOT, name), "w", encoding="utf-8", newline="\n") as fh:
            fh.write(body)
    # Control: cada producto tiene página y aparece en el sitemap
    sm = open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
    missing = [p["id"] for p in ps if f"productos/{p['id']}.html" not in sm or not os.path.exists(os.path.join(OUT_DIR, p["id"] + ".html"))]
    if missing:
        sys.exit("Faltan páginas: " + ", ".join(missing))
    print(f"ok: {len(ps)} páginas de producto, sitemap con {len(ps) + len(PAGES)} URL, robots.txt y llms.txt")


if __name__ == "__main__":
    main()
