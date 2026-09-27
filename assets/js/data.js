/* ==========================================================================
   Femme Fatale CR — configuración y catálogo
   Este es el ÚNICO archivo que hay que editar para cambiar productos,
   precios, número de WhatsApp o el feed de Instagram.
   ========================================================================== */

window.FF_CONFIG = {
  // Número de WhatsApp en formato internacional, solo dígitos (506 + 8 dígitos).
  whatsapp: "50688605333",
  instagram: "femmefatale_cr",
  email: "hola@femmefatalecr.com", // PENDIENTE: correo real
  city: "Heredia, Costa Rica",

  // PRECIOS: `price` es el precio de venta en colones (lista de precios del
  // 27-sep-2026: 4 precios reales del P&L + 17 propuestos con la misma lógica).
  // `usd` es el costo: precio oficial de la marca en EE. UU. Si un producto no
  // tiene `price`, se calcula como usd × usdRate, redondeado a los ₡100.
  usdRate: 510, // PENDIENTE: tipo de cambio de referencia

  // Feed de Instagram en vivo (opcional). Con una cuenta gratuita de behold.so
  // se obtiene una URL JSON; al pegarla aquí la cuadrícula muestra las
  // publicaciones reales. Vacío = se usan las fotos de FF_IG_POSTS.
  instagramFeedUrl: "",

  // Endpoint del boletín (Brevo, Mailchimp, Formspree...). Vacío = el
  // formulario avisa que el club abre pronto en vez de fingir un registro.
  newsletterEndpoint: "",

  // true mientras los precios sean de referencia. Muestra un aviso discreto.
  // Precios aprobados el 27-sep-2026.
  demo: false
};

/* Imágenes: acepta tres formatos.
   - URL completa (CDN de Shopify de cada marca): se pide al ancho necesario.
   - Ruta local (assets/img/...): se usa tal cual.
   - ID de Unsplash: retratos editoriales de portada. */
window.ffImg = function (src, w, ratio) {
  if (src.indexOf("medias.yvesrocher") > -1) return src + "&twic=v1/resize=" + w + "/background=white";
  if (/^https?:/.test(src)) return src + (src.indexOf("?") > -1 ? "&" : "?") + "width=" + w;
  if (src.indexOf("/") > -1) return src;
  return "https://images.unsplash.com/photo-" + src + "?auto=format&fit=crop&ar=" + (ratio || "4:5") + "&w=" + w + "&q=72";
};

window.FF_CATEGORIES = [
  { id: "labios", name: "Labios" },
  { id: "rostro", name: "Rostro y mejillas" },
  { id: "ojos", name: "Ojos y cejas" },
  { id: "skincare", name: "Skincare" },
  { id: "cuerpo", name: "Cuerpo y fragancia" }
];

window.FF_BRANDS = [
  { id: "rhode", name: "Rhode" },
  { id: "rare-beauty", name: "Rare Beauty" },
  { id: "summer-fridays", name: "Summer Fridays" },
  { id: "eadem", name: "EADEM" },
  { id: "patrick-ta", name: "Patrick Ta" },
  { id: "one-size", name: "ONE/SIZE" },
  { id: "cosrx", name: "COSRX" },
  { id: "anua", name: "Anua" },
  { id: "skin1004", name: "SKIN1004" },
  { id: "beauty-of-joseon", name: "Beauty of Joseon" },
  { id: "innisfree", name: "innisfree" },
  { id: "yves-rocher", name: "Yves Rocher" }
];

window.FF_SKIN = [
  { id: "todo", name: "Todo tipo de piel" },
  { id: "grasa", name: "Grasa" },
  { id: "mixta", name: "Mixta" },
  { id: "seca", name: "Seca" },
  { id: "sensible", name: "Sensible" }
];

window.FF_COLLECTIONS = [
  { id: "mas-pedidas", name: "Las más pedidas" },
  { id: "k-beauty", name: "Skincare coreano" },
  { id: "glow", name: "Efecto glow" }
];

/* ---------- Catálogo ----------
   Fotos: producto solo, del sitio oficial de cada marca (CDN), y fotos propias en
   assets/img. Se evitan fotos de campaña con celebridades para no sugerir
   patrocinio.
   rating/reviews: usar SOLO reseñas reales de clientas (Ley 7472). Con
   reviews: 0 la tarjeta no muestra estrellas. */
var RH = "https://cdn.shopify.com/s/files/1/0606/5451/8510/";
var RB = "https://cdn.shopify.com/s/files/1/0314/1143/7703/";
var YRM = "https://medias.yvesrocher.ca/medias/?context=";
var SHIP = "Entrega personal en Heredia o envío por Correos de Costa Rica a todo el país. " +
  "El costo del envío se confirma por WhatsApp según el destino. " +
  "Cambios dentro de los 7 días posteriores a la entrega si el producto está sellado y sin uso.";
var INCI = " La lista completa de ingredientes (INCI) viene impresa en el empaque.";
var RB_NOTE = " Rare Beauty declara todas sus fórmulas veganas y libres de crueldad animal.";

window.FF_PRODUCTS = [
  /* ===== Rhode ===== */
  {
    id: "rhode-peptide-lip-tint", brand: "rhode", name: "Peptide Lip Tint", category: "labios",
    skin: ["todo"], collections: ["mas-pedidas", "glow"], usd: 20, price: 17000, badge: "Favorito",
    size: "10 ml (0.3 fl oz)", includes: "1 tubo",
    notes: ["Acabado brillante con un toque de color translúcido."],
    images: [RH + "files/flatlay-square.png", "assets/img/rhode-lip-tint.webp"],
    shades: [
      { name: "Ribbon", img: RH + "files/flatlay-square.png" },
      { name: "Colada", img: RH + "files/colada-main.png" },
      { name: "Honey Mango", img: RH + "files/honey-mango-main.png" },
      { name: "Espresso", img: RH + "files/esp-flatlay-square.png" },
      { name: "Raspberry Jelly", img: RH + "files/flatlay-square-rasp.png" },
      { name: "Toast", img: RH + "files/toast-flatlay-square.png" },
      { name: "Salty Tan", img: RH + "files/mainimage-saltytan-SQ.png" },
      { name: "Jelly Bean", img: RH + "files/JB-square.png" }
    ],
    description: "Bálsamo con color translúcido y brillo jugoso. Hidrata como un tratamiento y se ve como un gloss.",
    howto: "Aplica directo del tubo sobre los labios. Úsalo solo o encima de tu delineador favorito.",
    ingredients: "Con péptidos y mantecas nutritivas para labios suaves." + INCI, shipping: SHIP
  },
  {
    id: "rhode-peptide-lip-treatment", brand: "rhode", name: "Peptide Lip Treatment", category: "labios",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 20, price: 17000,
    size: "10 ml (0.3 fl oz)", includes: "1 tubo",
    notes: ["Sin color, acabado brillante.", "El tono Unscented no tiene aroma."],
    images: [RH + "files/main-png-2000x2000_unscented.png"],
    shades: [
      { name: "Unscented", img: RH + "files/main-png-2000x2000_unscented.png" },
      { name: "Vanilla", img: RH + "files/vanilla-plt-main.png" },
      { name: "Salted Caramel", img: RH + "files/main-png-2000x2000_saltedcaramel_5df90d2c-bf13-4be3-b218-f04a58421574.png" },
      { name: "Strawberry Glaze", img: RH + "files/strawberry-main.png" }
    ],
    description: "El tratamiento de labios que se volvió culto: textura gruesa, brillo glaseado y labios hidratados todo el día.",
    howto: "Aplica en la mañana, en la noche o cada vez que sientas los labios secos.",
    ingredients: "Con péptidos y mantecas nutritivas." + INCI, shipping: SHIP
  },
  {
    id: "rhode-pocket-blush", brand: "rhode", name: "Pocket Blush", category: "rostro",
    skin: ["todo"], collections: ["mas-pedidas", "glow"], usd: 25, price: 19000, badge: "Más pedido",
    size: "5.3 g (0.18 oz)", includes: "1 barra de rubor en crema",
    notes: ["Sirve para mejillas y labios.", "Acabado satinado y luminoso."],
    images: [RH + "files/teacup-main.png", "assets/img/rhode-pocket-blush.webp"],
    shades: [
      { name: "Teacup", img: RH + "files/teacup-main.png" },
      { name: "Toasted Teddy", img: RH + "files/mainimage-SQ-toastedteddy.png" },
      { name: "Sleepy Girl", img: RH + "files/mainimage-SQ-sleepygirl.png" },
      { name: "Piggy", img: RH + "files/mainimage-SQ-piggy.png" },
      { name: "Juice Box", img: RH + "files/mainimage-SQ-juicebox.png" },
      { name: "Freckle", img: RH + "files/mainimage-SQ-freckle.png" }
    ],
    description: "Rubor en barra cremoso que se funde con la piel. Cabe en cualquier bolsillo y sirve para mejillas y labios.",
    howto: "Desliza sobre las mejillas y difumina con los dedos. Construye capas hasta la intensidad que quieras.",
    ingredients: "Fórmula en crema de acabado natural." + INCI, shipping: SHIP
  },
  {
    id: "rhode-pocket-bronze", brand: "rhode", name: "Pocket Bronze", category: "rostro",
    skin: ["todo"], collections: ["glow"], usd: 25, price: 19000, badge: "Nuevo",
    size: "5.3 g (0.18 oz)", includes: "1 barra de bronceador en crema",
    notes: ["Color construible que se difumina con los dedos."],
    images: [RH + "files/sunbed-main.png", "assets/img/rhode-pocket-bronze.webp"],
    shades: [
      { name: "Sunbed", img: RH + "files/sunbed-main.png" },
      { name: "Pebble", img: RH + "files/pebble-main.png" },
      { name: "Sip", img: RH + "files/sip-main.png" },
      { name: "Bake", img: RH + "files/bake-main.png" },
      { name: "Drench", img: RH + "files/drench-main.png" },
      { name: "Plunge", img: RH + "files/plunge-main.png" }
    ],
    description: "Bronceador en barra cremoso para calidez de sol en segundos, sin polvo ni brochas.",
    howto: "Aplica en pómulos, sienes y línea de la mandíbula. Difumina con los dedos o una brocha.",
    ingredients: "Fórmula en crema fácil de difuminar." + INCI, shipping: SHIP
  },
  {
    id: "rhode-highlight-milk", brand: "rhode", name: "Highlight Milk", category: "rostro",
    skin: ["todo"], collections: ["glow"], usd: 28, price: 21000, badge: "Nuevo",
    size: "65 ml (2.2 fl oz)", includes: "1 frasco",
    notes: ["Iluminador líquido para rostro y cuerpo, hecho con la fórmula del Glazing Milk."],
    images: [RH + "files/highlight-milk-2-main.png", "assets/img/rhode-highlight-milk.webp"],
    shades: [
      { name: "01", img: RH + "files/highlight-milk-1-main.png" },
      { name: "02", img: RH + "files/highlight-milk-2-main.png" },
      { name: "03", img: RH + "files/highlight-milk-3-main.png" },
      { name: "04", img: RH + "files/highlight-milk-4-main.png" }
    ],
    description: "Iluminador líquido multiuso: luz en los pómulos, mezclado con tu crema o sobre el cuerpo.",
    howto: "Aplica unos toques en los puntos altos del rostro y difumina. Para un glow completo, mézclalo con tu hidratante.",
    ingredients: "Iluminador líquido de 65 ml." + INCI, shipping: SHIP
  },
  {
    id: "rhode-glazing-milk", brand: "rhode", name: "Glazing Milk", category: "skincare",
    skin: ["todo", "seca", "sensible"], collections: ["glow"], usd: 32, price: 25000,
    size: "124 ml (4.2 oz)", includes: "1 frasco, tamaño grande",
    notes: ["Esencia de textura lechosa con ceramidas."],
    images: [RH + "files/glazing-milk-sq.png", RH + "files/glazing-milk-pdp-mobile.jpg"],
    description: "Esencia ligera que prepara la piel y la deja con el acabado glaseado característico de Rhode.",
    howto: "Después de limpiar, aplica unas gotas con las manos antes del sérum y la crema.",
    ingredients: "Esencia facial con ceramidas." + INCI, shipping: SHIP
  },
  {
    id: "rhode-barrier-restore-cream", brand: "rhode", name: "Barrier Restore Cream", category: "skincare",
    skin: ["seca", "sensible", "mixta"], collections: [], usd: 32, price: 25000,
    size: "50 ml (1.7 oz)", includes: "1 envase, tamaño grande",
    notes: ["Crema hidratante de uso diario, mañana y noche."],
    images: [RH + "products/brc-2000x2000_1.png"],
    description: "Crema hidratante que ayuda a reparar la barrera de la piel. Textura rica que se absorbe sin sensación pesada.",
    howto: "Último paso de tu rutina, mañana y noche. En la mañana, termina con protector solar.",
    ingredients: "Crema reparadora con ceramidas." + INCI, shipping: SHIP
  },
  {
    id: "rhode-peptide-glazing-fluid", brand: "rhode", name: "Peptide Glazing Fluid", category: "skincare",
    skin: ["todo"], collections: ["glow"], usd: 32, price: 25000,
    size: "50 ml (1.7 oz)", includes: "1 frasco, tamaño grande",
    notes: ["Sérum en gel de absorción rápida."],
    images: [RH + "products/glaze-2000x2000_1.png"],
    description: "Sérum en gel que hidrata y deja la piel luminosa. El paso que da el famoso efecto glazed.",
    howto: "Aplica una o dos gotas sobre la piel limpia, antes de la crema.",
    ingredients: "Sérum en gel con péptidos." + INCI, shipping: SHIP
  },

  /* ===== Rare Beauty ===== */
  {
    id: "rare-beauty-soft-pinch-liquid-blush", brand: "rare-beauty", name: "Soft Pinch Liquid Blush", category: "rostro",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 25, price: 19000, badge: "Más pedido",
    size: "7.5 ml (0.25 fl oz)", includes: "1 frasco con aplicador",
    notes: ["Un punto por mejilla es suficiente.", "Dura hasta 12 horas según la marca.", "Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-HOPE.jpg", RB + "files/SWATCH-SP-LIQUID-BLUSH-DEWY-HOPE.png"],
    shades: [
      { name: "Hope", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-HOPE.jpg" },
      { name: "Bliss", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-MATTE-BLISS.jpg" },
      { name: "Adore", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-ADORE.jpg" },
      { name: "Happy", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-HAPPY.jpg" },
      { name: "Worth", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-WORTH.jpg" },
      { name: "Virtue", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-VIRTUE.jpg" },
      { name: "Love", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-MATTE-LOVE.jpg" },
      { name: "Resilience", img: RB + "files/ECOMM-SP-LIQUID-BLUSH-DEWY-RESILIENCE.jpg" }
    ],
    description: "El rubor líquido más vendido de Rare Beauty. Muy pigmentado: un solo punto basta para cada mejilla.",
    howto: "Aplica uno o dos puntos en cada mejilla y difumina rápido con los dedos o una esponja.",
    ingredients: "Rubor líquido ligero de larga duración." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-positive-light-liquid-luminizer", brand: "rare-beauty", name: "Positive Light Liquid Luminizer", category: "rostro",
    skin: ["todo"], collections: ["glow"], usd: 28, price: 21000,
    size: "15 ml", includes: "1 frasco con aplicador",
    notes: ["Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "files/ECOMM-PL-LIQUID-LUMINIZER-ENLIGHTEN-1440x1952.jpg", RB + "files/SWATCHES-PL-LIQUID-LUMINIZER-ENLIGHTEN-1440x1952.png"],
    shades: [
      { name: "Enlighten", img: RB + "files/ECOMM-PL-LIQUID-LUMINIZER-ENLIGHTEN-1440x1952.jpg" },
      { name: "Enchant", img: RB + "files/ECOMM-PL-LIQUID-LUMINIZER-ENCHANT-1440x1952.jpg" },
      { name: "Exhilarate", img: RB + "files/ECOMM-PL-LIQUID-LUMINIZER-EXHILARATE-1440x1952.jpg" },
      { name: "Outshine", img: RB + "files/ECOMM-PL-LIQUID-LUMINIZER-OUTSHINE-1440x1952.jpg" },
      { name: "Transcend", img: RB + "files/ECOMM-PL-LIQUID-LUMINIZER-TRANSCEND-1440x1952.jpg" },
      { name: "Mesmerize", img: RB + "files/ECOMM-PL-LIQUID-LUMINIZER-MESMERIZE-1440x1952.jpg" }
    ],
    description: "Iluminador líquido que se funde con la piel para un brillo natural, sin partículas gruesas.",
    howto: "Aplica un punto en pómulos, puente de la nariz y arco de cupido. Difumina con toquecitos.",
    ingredients: "Iluminador líquido." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-warm-wishes-bronzer-stick", brand: "rare-beauty", name: "Warm Wishes Effortless Bronzer Stick", category: "rostro",
    skin: ["todo"], collections: ["glow"], usd: 30, price: 23000,
    size: "7 g", includes: "1 barra con aplicador de esponja integrado",
    notes: ["Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "products/Bronzer-Stick-Power-Boost-SKU.jpg", RB + "products/swatch-bronzer-power-boost.png"],
    shades: [
      { name: "Power Boost", img: RB + "products/Bronzer-Stick-Power-Boost-SKU.jpg" },
      { name: "Happy Sol", img: RB + "products/Bronzer-Stick-Happy-Sol-SKU.jpg" },
      { name: "Always Sunny", img: RB + "products/Bronzer-Stick-Always-Sunny-SKU.jpg" },
      { name: "Full of Life", img: RB + "products/Bronzer-Stick-Full-of-Life-SKU.jpg" },
      { name: "True Warmth", img: RB + "products/Bronzer-Stick-True-Warmth-SKU.jpg" }
    ],
    description: "Bronceador en barra con aplicador de esponja integrado. Calidez natural en un solo gesto.",
    howto: "Desliza sobre pómulos, sienes y mandíbula, y difumina con el aplicador.",
    ingredients: "Bronceador en crema." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-soft-pinch-tinted-lip-oil", brand: "rare-beauty", name: "Soft Pinch Tinted Lip Oil", category: "labios",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 24, price: 19000,
    size: "3 ml (0.10 fl oz)", includes: "1 tubo con aplicador",
    notes: ["Empieza como jalea y se transforma en aceite ligero.", "Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "products/soft-pinch-tinted-lip-oil-serenity-1440x1952.jpg", RB + "products/soft-pinch-tinted-lip-oil-macro-lip-serenity-1440x1952.jpg"],
    shades: [
      { name: "Serenity", img: RB + "products/soft-pinch-tinted-lip-oil-serenity-1440x1952.jpg" },
      { name: "Hope", img: RB + "products/soft-pinch-tinted-lip-oil-hope-1440x1952.jpg" },
      { name: "Happy", img: RB + "products/soft-pinch-tinted-lip-oil-happy-1440x1952.jpg" },
      { name: "Joy", img: RB + "products/soft-pinch-tinted-lip-oil-joy-1440x1952.jpg" },
      { name: "Wonder", img: RB + "products/soft-pinch-tinted-lip-oil-wonder-1440x1952.jpg" },
      { name: "Honesty", img: RB + "products/soft-pinch-tinted-lip-oil-honesty-1440x1952.jpg" },
      { name: "Delight", img: RB + "products/soft-pinch-tinted-lip-oil-delight-1440x1952.jpg" },
      { name: "Affection", img: RB + "products/soft-pinch-tinted-lip-oil-affection-1440x1952.jpg" }
    ],
    description: "Aceite de labios con color que hidrata y deja un brillo ligero, sin sensación pegajosa.",
    howto: "Aplica solo o sobre tu labial para darle brillo.",
    ingredients: "Aceite labial con color." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-kind-words-matte-lipstick", brand: "rare-beauty", name: "Kind Words Matte Lipstick", category: "labios",
    skin: ["todo"], collections: [], usd: 20, price: 17000,
    size: "3.5 g", includes: "1 labial en barra",
    notes: ["Acabado mate suave.", "Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "products/kind-words-matte-lipstick-talented.jpg", RB + "products/macro-lip-talented-1440x1952_25af9898-291c-4dc7-9fff-3366ea205796.jpg"],
    shades: [
      { name: "Talented", img: RB + "products/kind-words-matte-lipstick-talented.jpg" },
      { name: "Creative", img: RB + "products/kind-words-matte-lipstick-creative.jpg" },
      { name: "Fun", img: RB + "products/kind-words-matte-lipstick-fun.jpg" },
      { name: "Wise", img: RB + "products/kind-words-matte-lipstick-wise.jpg" },
      { name: "Bold", img: RB + "products/kind-words-matte-lipstick-bold.jpg" },
      { name: "Gifted", img: RB + "products/kind-words-matte-lipstick-gifted.jpg" },
      { name: "Strong", img: RB + "products/kind-words-matte-lipstick-strong.jpg" }
    ],
    description: "Labial mate cómodo de llevar, con color intenso que no reseca.",
    howto: "Aplica directo desde la barra, del centro hacia las comisuras.",
    ingredients: "Labial mate." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-perfect-strokes-mascara", brand: "rare-beauty", name: "Perfect Strokes Volumizing Mascara", category: "ojos",
    skin: ["todo"], collections: [], usd: 24, price: 19000,
    size: "13.5 ml (0.45 oz)", includes: "1 máscara, tamaño completo",
    notes: ["Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "products/Full-Size-Mascara-Open-SKU.jpg", RB + "files/CAMPAIGN-BEFORE-AFTER-CAITLIN-PERFECT-STROKES-MASCARA.jpg"],
    description: "Máscara de volumen que levanta y define cada pestaña sin grumos.",
    howto: "Aplica desde la raíz con movimientos en zigzag hacia las puntas. Agrega capas para más volumen.",
    ingredients: "Máscara de pestañas de volumen." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-brow-harmony-gel", brand: "rare-beauty", name: "Brow Harmony Flexible Lifting Gel", category: "ojos",
    skin: ["todo"], collections: [], usd: 21, price: 17000,
    size: "4.5 g (0.15 oz)", includes: "1 gel con cepillo",
    notes: ["A prueba de agua y sudor, hasta 12 horas según la marca.", "Vegano y libre de crueldad animal, sin parabenos (según Rare Beauty)."],
    images: [RB + "files/brow-harmony-flexible-lifting-gel-1440x1952.jpg"],
    shades: [
      { name: "Clear", img: RB + "files/brow-harmony-flexible-lifting-gel-1440x1952.jpg" },
      { name: "Soft Blonde", img: RB + "files/ECOMM-BH-TINTED-BROW-GEL-SOFT-BLONDE.jpg" },
      { name: "Rich Taupe", img: RB + "files/ECOMM-BH-TINTED-BROW-GEL-RICH-TAUPE.jpg" },
      { name: "Warm Brown", img: RB + "files/ECOMM-BH-TINTED-BROW-GEL-WARM-BROWN.jpg" },
      { name: "Cool Brown", img: RB + "files/ECOMM-BH-TINTED-BROW-GEL-COOL-BROWN.jpg" },
      { name: "Deep Brown", img: RB + "files/ECOMM-BH-TINTED-BROW-GEL-DEEP-BROWN.jpg" },
      { name: "Soft Black", img: RB + "files/ECOMM-BH-TINTED-BROW-GEL-SOFT-BLACK.jpg" }
    ],
    description: "Gel de cejas que peina, levanta y fija con acabado flexible. Transparente o con color.",
    howto: "Peina las cejas hacia arriba y hacia afuera. Deja secar unos segundos.",
    ingredients: "Gel fijador de cejas." + RB_NOTE + INCI, shipping: SHIP
  },

  /* ===== Skincare coreano ===== */
  {
    id: "cosrx-snail-96-mucin-essence", brand: "cosrx", name: "Advanced Snail 96 Mucin Power Essence", category: "skincare",
    skin: ["todo", "seca", "sensible"], collections: ["k-beauty", "mas-pedidas"], usd: 25, price: 19000, badge: "K-beauty",
    size: "100 ml (3.38 fl oz)", includes: "1 frasco con dosificador",
    notes: ["96 % de filtrado de secreción de caracol."],
    images: ["https://cdn.shopify.com/s/files/1/0513/3775/6828/files/james_800x1067_1_1_4e9750cc-2cd6-4817-ace5-be2305a85806.jpg", "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Snail96Essence_8.jpg"],
    description: "La esencia de baba de caracol que hizo famoso a COSRX. Hidrata, calma y ayuda a la piel a recuperarse.",
    howto: "Después del tónico, aplica una pequeña cantidad y da toquecitos hasta que se absorba.",
    ingredients: "96 % filtrado de secreción de caracol." + INCI, shipping: SHIP
  },
  {
    id: "anua-heartleaf-77-toner", brand: "anua", name: "Heartleaf 77% Soothing Toner", category: "skincare",
    skin: ["grasa", "mixta", "sensible"], collections: ["k-beauty"], usd: 23, price: 18000,
    size: "250 ml", includes: "1 botella",
    notes: ["77 % de extracto de heartleaf."],
    images: ["https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-us-toner-heartleaf-77-soothing-toner-1239193744.jpg", "https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-us-toner-heartleaf-77-soothing-toner-1161173061.jpg"],
    description: "Tónico calmante de textura acuosa para pieles sensibles o con tendencia a enrojecerse.",
    howto: "Después de limpiar, aplica con las manos o un algodón dando toquecitos.",
    ingredients: "77 % extracto de heartleaf (Houttuynia cordata)." + INCI, shipping: SHIP
  },
  {
    id: "anua-heartleaf-cleansing-oil", brand: "anua", name: "Heartleaf Pore Control Cleansing Oil", category: "skincare",
    skin: ["grasa", "mixta", "todo"], collections: ["k-beauty"], usd: 22, price: 18000,
    size: "200 ml", includes: "1 botella con dosificador",
    notes: ["Primer paso de la doble limpieza: se enjuaga con agua."],
    images: ["https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-us-cleanser-heartleaf-pore-control-cleansing-oil-1239193742.jpg"],
    description: "Aceite limpiador que disuelve maquillaje y protector solar. El primer paso de la doble limpieza coreana.",
    howto: "Masajea sobre la piel seca, agrega un poco de agua para emulsionar y enjuaga. Sigue con tu limpiador en espuma.",
    ingredients: "Aceite limpiador con extracto de heartleaf." + INCI, shipping: SHIP
  },
  {
    id: "skin1004-centella-ampoule", brand: "skin1004", name: "Madagascar Centella Ampoule", category: "skincare",
    skin: ["sensible", "grasa", "mixta"], collections: ["k-beauty"], usd: 19.8, price: 17000,
    size: "100 ml", includes: "1 frasco con gotero",
    notes: ["Formato grande de 100 ml."],
    images: ["https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-ampoule-serum-centella-ampoule-38409088401654.jpg"],
    description: "Ampolla ligera que calma la piel irritada. Un clásico coreano para pieles sensibles.",
    howto: "Aplica unas gotas después del tónico y da toquecitos hasta que se absorba.",
    ingredients: "Extracto de Centella asiática de Madagascar." + INCI, shipping: SHIP
  },
  {
    id: "beauty-of-joseon-relief-sun", brand: "beauty-of-joseon", name: "Relief Sun: Rice + Niacinamide SPF50+", category: "skincare",
    skin: ["todo"], collections: ["k-beauty", "mas-pedidas"], usd: 18, price: 16000, badge: "K-beauty",
    size: "50 ml (1.69 fl oz)", includes: "1 tubo",
    notes: ["SPF50+ PA++++.", "Reaplicar cada 2 horas al sol."],
    images: ["https://cdn.shopify.com/s/files/1/0558/4135/7989/files/03_0805__-_ROW.jpg", "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/05_0805__-_ROW_654a8e4e-1d53-4dca-a3a0-c0c2f55e3ca0.jpg"],
    description: "Protector solar ligero de acabado natural, sin rastro blanco. Ideal para el sol de Costa Rica todos los días.",
    howto: "Último paso de la rutina de mañana. Reaplica cada dos horas si estás al sol.",
    ingredients: "SPF50+ PA++++ con extracto de arroz y niacinamida." + INCI, shipping: SHIP
  },

  /* ===== Nuevos: más vendidos de Sephora (27-sep-2026) ===== */
  {
    id: "rhode-peptide-lip-shape", brand: "rhode", name: "Peptide Lip Shape", category: "labios",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 24, price: 19000, badge: "Nuevo",
    size: "0.75 g (0.026 oz)", includes: "1 delineador en barra",
    notes: ["Los tonos Push, Squeeze y Jump no incluyen la esponjita difuminadora; Rhode la está retirando también de los demás tonos."],
    images: [RH + "files/jump-main.png"],
    shades: [
      { name: "Jump", img: RH + "files/jump-main.png" },
      { name: "Squeeze", img: RH + "files/squeeze-main.png" },
      { name: "Push", img: RH + "files/push-main.png" },
      { name: "Move", img: RH + "files/MOVE-pls-main-png-sq.png" },
      { name: "Spin", img: RH + "files/spin-pls-main-png-sq.png" },
      { name: "Flex", img: RH + "files/FLEX-pls-main-png-sq.png" },
      { name: "Lean", img: RH + "files/LEAN-pls-main-png-sq.png" },
      { name: "Twist", img: RH + "files/TWIST-pls-main-png-sq.png" }
    ],
    description: "Delineador de labios en crema con péptidos: define el contorno, rellena y se difumina fácil.",
    howto: "Delinea el contorno y difumina hacia el centro. Termina con Peptide Lip Tint o Lip Treatment.",
    ingredients: "Delineador en crema con péptidos." + INCI, shipping: SHIP
  },
  {
    id: "rhode-peptide-eye-prep", brand: "rhode", name: "Peptide Eye Prep", category: "skincare",
    skin: ["todo"], collections: [], usd: 25, price: 19000, badge: "Nuevo",
    size: "6 pares de parches", includes: "1 caja con 6 pares de parches de hidrogel",
    notes: ["Parches refrescantes para debajo de los ojos.", "Úsalos antes del maquillaje o cuando quieras desinflamar la mirada."],
    images: [RH + "files/eyeprep-r-icon-main-png-2000x2000.png"],
    description: "Parches para el contorno de ojos con péptidos, pensados para refrescar y desinflamar la mirada antes del maquillaje.",
    howto: "Coloca los parches bajo los ojos sobre la piel limpia, déjalos unos minutos y retíralos. Da toquecitos al producto restante.",
    ingredients: "Parches de contorno de ojos con péptidos." + INCI, shipping: SHIP
  },
  {
    id: "rhode-glazing-mist", brand: "rhode", name: "Glazing Mist", category: "skincare",
    skin: ["todo"], collections: ["glow"], usd: 30, price: 23000,
    size: "80 ml (2.7 oz)", includes: "1 atomizador, tamaño grande",
    notes: ["Rhode está cambiando la botella del tamaño grande: el envase puede variar, la fórmula es la misma."],
    images: [RH + "files/mist-menu-png-2000x2000_bf2f0f50-ad7a-4ffb-bd85-a5dc7ab67aec.png", RH + "files/mini-mist-main.png"],
    description: "Bruma facial hidratante para refrescar la piel y renovar el glow durante el día, incluso sobre el maquillaje.",
    howto: "Rocía a unos 20 cm del rostro después de tu rutina o cada vez que quieras refrescar la piel.",
    ingredients: "Bruma facial hidratante." + INCI, shipping: SHIP
  },
  {
    id: "summer-fridays-lip-butter-balm", brand: "summer-fridays", name: "Lip Butter Balm", category: "labios",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 24, price: 19000, badge: "Top Sephora",
    size: "15 g (0.5 oz)", includes: "1 tubo",
    notes: ["Textura mantequillosa con brillo suave."],
    images: ["https://cdn.shopify.com/s/files/1/2382/2877/files/Main-LBB-Sugar-Plum.jpg"],
    shades: [
      { name: "Sugar Plum", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/Main-LBB-Sugar-Plum.jpg" },
      { name: "Mocha Bonbon", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/Main-LBB-Mocha-Bon-Bon.jpg" },
      { name: "Strawberry Soft Serve", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/LBBStrawberrySoftServeMain.jpg" },
      { name: "Toasted Marshmallow", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/LipButterBalmToastedMarshmallowMain.jpg" },
      { name: "Pink Guava", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/Main-Lip-Butter-Balm-Pink-Guava.jpg" },
      { name: "Birthday Cake", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/LBB-Square-Bday-Cake_f2d33d1c-4224-47b6-be86-9b6eb388de44.jpg" },
      { name: "Iced Coffee", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/LBB-Iced-Coffee-Square.jpg" },
      { name: "Hot Cocoa", img: "https://cdn.shopify.com/s/files/1/2382/2877/files/Square-Lip-Butter-Balm-Hot-Cocoa-Main.jpg" }
    ],
    description: "El bálsamo de labios que se volvió favorito en Sephora: textura mantequillosa, brillo suave y labios nutridos.",
    howto: "Aplica directo sobre los labios durante el día o como tratamiento antes de dormir.",
    ingredients: "Bálsamo labial nutritivo." + INCI, shipping: SHIP
  },
  {
    id: "eadem-le-chouchou", brand: "eadem", name: "Le Chouchou Peptide Lip Balm", category: "labios",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 24, price: 19000, badge: "Top Sephora",
    size: "14 g (0.49 oz)", includes: "1 tubo",
    notes: ["Bálsamo con péptidos para uso diario."],
    images: ["https://cdn.shopify.com/s/files/1/0512/1661/3529/files/LCC_TUBE_TRANSARENT.png", "https://cdn.shopify.com/s/files/1/0512/1661/3529/files/PDP_LCC_Sakura_03_LipMacro.jpg"],
    shades: [{ name: "Coquito Dulce" }, { name: "Sakura Shaved Ice" }, { name: "Chateau Rose" }, { name: "Guava Fresca" }, { name: "Fig Sauce" }, { name: "Bissap Glaze" }, { name: "Butter Mochi" }, { name: "Churro de Canela" }, { name: "Burnt Malai" }, { name: "Boba Bounce" }],
    description: "Bálsamo labial con péptidos que suaviza y deja un brillo jugoso. Uno de los más vendidos de Sephora.",
    howto: "Aplica directo del tubo cuantas veces quieras durante el día.",
    ingredients: "Bálsamo labial con péptidos." + INCI, shipping: SHIP
  },
  {
    id: "patrick-ta-major-headlines-blush-duo", brand: "patrick-ta", name: "Major Headlines Double-Take Crème & Powder Blush Duo", category: "rostro",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 40, price: 31000, badge: "Top Sephora",
    size: "5 g de rubor en crema + 5 g de rubor en polvo", includes: "1 estuche doble",
    notes: ["Tamaño completo (no es la versión mini)."],
    images: ["https://cdn.shopify.com/s/files/1/0099/0602/8608/files/Major-Headlines-Double-Take-Creme-_-Powder-Blush-Duo-Out-of-Office.jpg", "https://cdn.shopify.com/s/files/1/0099/0602/8608/files/2990125-av-1.png"],
    shades: [{ name: "Out Of Office" }, { name: "Thank Me Later" }, { name: "Soft Launch" }, { name: "She Left Me On Red" }, { name: "She Goes to the Gym" }, { name: "She's Seductive" }, { name: "She Knows Who She Is" }, { name: "Just Enough" }],
    description: "Dúo de rubor en crema y en polvo del mismo tono: la crema da el color y el polvo lo sella para que dure todo el día.",
    howto: "Aplica primero la crema con los dedos y difumina. Sella con el polvo usando una brocha.",
    ingredients: "Rubor en crema y en polvo." + INCI, shipping: SHIP
  },
  {
    id: "one-size-on-til-dawn", brand: "one-size", name: "On 'Til Dawn Mattifying Waterproof Setting Spray", category: "rostro",
    skin: ["grasa", "mixta", "todo"], collections: ["mas-pedidas"], usd: 36, price: 28000,
    size: "143 ml (3.4 oz de peso neto)", includes: "1 spray en aerosol, tamaño completo",
    notes: ["A prueba de agua; fija el maquillaje hasta 16 horas según la marca."],
    images: ["https://cdn.shopify.com/s/files/1/0352/4139/4313/files/On_Til_Dawn_Setting_Spray_FS_v2.jpg", "https://cdn.shopify.com/s/files/1/0352/4139/4313/files/On_Til_Dawn_Setting_Spray_TS_v2.jpg"],
    description: "Spray fijador matificante y a prueba de agua para que el maquillaje aguante el calor y la humedad.",
    howto: "Agita y rocía a unos 20 cm del rostro en forma de X y T al terminar el maquillaje.",
    ingredients: "Spray fijador matificante, tamaño completo." + INCI, shipping: SHIP
  },
  {
    id: "innisfree-green-tea-ceramide-mist", brand: "innisfree", name: "Green Tea Ceramide Mist", category: "skincare",
    skin: ["seca", "sensible", "todo"], collections: ["k-beauty"], usd: 17, price: 14000, badge: "K-beauty",
    size: "90 ml (3.04 oz)", includes: "1 atomizador",
    notes: ["Con té verde de Jeju y ceramidas."],
    images: ["https://cdn.shopify.com/s/files/1/0089/3367/1012/files/1_IF_GT-CMM-90ml_Packshot_1080x1080_268e45e2-b8f4-4b88-90b5-8e85feaf71e8.jpg"],
    description: "Bruma coreana con té verde de Jeju y ceramidas para hidratar y calmar la piel en cualquier momento del día.",
    howto: "Rocía sobre el rostro limpio o encima del maquillaje para refrescar.",
    ingredients: "Bruma facial con té verde y ceramidas." + INCI, shipping: SHIP
  },

  /* ===== Nuevos: más vendidos de Yves Rocher (27-sep-2026) ===== */
  {
    id: "yves-rocher-pur-bleuet-eye-remover", brand: "yves-rocher", name: "Pur Bleuet Express Eye Makeup Remover", category: "skincare",
    skin: ["todo"], collections: [], usd: 10.58, price: 9000,
    size: "200 ml", includes: "1 botella",
    notes: ["Para todo tipo de piel."],
    images: [YRM + "bWFzdGVyfGltYWdlc3w1NzU1NXxpbWFnZS9qcGVnfHN5c19tYXN0ZXIvaW1hZ2VzL2hkMC9oZDIvMTAzNzAyNjAyMDU1OTh8OWFkMThjNzlhYWNhYTBmOWU5M2VhZTNlMmNhZDk1MmRjNjFjYzVlZjg1YzM4NzRkODlkMTAwOGUxYjE1OWMwYg"],
    description: "El desmaquillante de ojos más vendido de Yves Rocher, con aciano. Retira el maquillaje de ojos, incluso la máscara a prueba de agua.",
    howto: "Agita, humedece un algodón y apóyalo unos segundos sobre el ojo cerrado antes de deslizar.",
    ingredients: "Desmaquillante de ojos con aciano." + INCI, shipping: SHIP
  },
  {
    id: "yves-rocher-pure-algue-micellar-water", brand: "yves-rocher", name: "Pure Algue Hydrating Micellar Water", category: "skincare",
    skin: ["mixta", "todo"], collections: [], usd: 19.06, price: 16000,
    size: "400 ml, formato grande", includes: "1 botella",
    notes: ["Para piel normal a mixta.", "No necesita enjuague."],
    images: [YRM + "bWFzdGVyfGltYWdlc3w5NTExNnxpbWFnZS9qcGVnfHN5c19tYXN0ZXIvaW1hZ2VzL2gzNi9oYTcvMTAzNzAyNTM5NDY5MTB8N2I3NmI5Njc3NGViMTVkNjdlY2Q1NjQ5YThkZTc3YTQ5OWViYmNkY2FjZmRmMzhjMDVmODdiMWMwNmIzMTJhNg"],
    description: "Agua micelar hidratante para limpiar y desmaquillar rostro, ojos y labios en un solo paso. Formato grande.",
    howto: "Aplica con un algodón sobre rostro, ojos y labios. No necesita enjuague.",
    ingredients: "Agua micelar con extractos de algas." + INCI, shipping: SHIP
  },
  {
    id: "yves-rocher-glow-activating-serum", brand: "yves-rocher", name: "Glow Énergie Glow Activating Serum", category: "skincare",
    skin: ["todo"], collections: ["glow"], usd: 35.33, price: 28000,
    size: "30 ml", includes: "1 frasco con gotero",
    notes: ["Para las primeras señales de la edad."],
    images: [YRM + "bWFzdGVyfGltYWdlc3w0MzE4NTl8aW1hZ2UvanBlZ3xzeXNfbWFzdGVyL2ltYWdlcy9oN2MvaDBiLzEwMzYzNTA1MTE1MTY2fDE2NGZhNGFiZmI3MmM0MDgyODNjYmRkYzlmYWFmODAzY2FhODE1YzQ2ZWZjOGYzZGQxMzlmNDkwZWQwZGJmN2Y"],
    description: "Sérum iluminador para las primeras señales de la edad. Deja la piel con más luz y aspecto descansado.",
    howto: "Aplica unas gotas mañana y noche sobre la piel limpia, antes de la crema.",
    ingredients: "Sérum facial iluminador." + INCI, shipping: SHIP
  },
  {
    id: "yves-rocher-riche-creme", brand: "yves-rocher", name: "Riche Crème Intense Regenerating Care", category: "skincare",
    skin: ["seca"], collections: [], usd: 48.77, price: 38000,
    size: "75 ml", includes: "1 envase",
    notes: ["Para piel madura."],
    images: [YRM + "bWFzdGVyfGltYWdlc3wxNjc1NTN8aW1hZ2UvanBlZ3xzeXNfbWFzdGVyL2ltYWdlcy9oZTIvaGE5LzEwMzYzNTE2NjE2NzM0fGNjY2ExZWEyZTRkZGQyNGY3ZGFjNTk1YTYyNTVlODA1NGRmMGE2Y2UwOWExMDIxNWU3YjE4YjRjMmEzYzAwYmE"],
    description: "Crema nutritiva de textura rica para piel madura. Uno de los clásicos más vendidos de Yves Rocher.",
    howto: "Aplica mañana y noche sobre rostro y cuello con movimientos ascendentes.",
    ingredients: "Crema facial nutritiva para piel madura." + INCI, shipping: SHIP
  },
  {
    id: "yves-rocher-monoi-pearly-oil", brand: "yves-rocher", name: "Monoï Moisturizing Pearly Oil", category: "cuerpo",
    skin: ["todo"], collections: ["glow"], usd: 19.06, price: 16000,
    size: "100 ml", includes: "1 frasco",
    notes: ["Aceite corporal con brillo nacarado."],
    images: [YRM + "bWFzdGVyfGltYWdlc3w1Njk4NDN8aW1hZ2UvcG5nfHN5c19tYXN0ZXIvaW1hZ2VzL2g3NS9oZWYvMTAzNjM1MzY0NzQxNDJ8MmQ1NGU0ZDM1YzZiNDcxMzc3Mjk0ZDEzYTdhNzdjN2U5YWI0Y2FmNjJiNGM5MzJjZjFiZmM2ZGYxZmUyNDcxYw"],
    description: "Aceite corporal nacarado con aroma a monoï que hidrata y deja la piel con un brillo sutil.",
    howto: "Aplica sobre la piel del cuerpo después de la ducha, en piernas, brazos y escote.",
    ingredients: "Aceite corporal nacarado." + INCI, shipping: SHIP
  },
  {
    id: "yves-rocher-comme-une-evidence", brand: "yves-rocher", name: "Comme une Évidence Eau de Parfum", category: "cuerpo",
    skin: ["todo"], collections: [], usd: 41.70, price: 33000,
    size: "50 ml", includes: "1 frasco con atomizador",
    notes: ["Eau de parfum."],
    images: [YRM + "bWFzdGVyfGltYWdlc3wxMDAyMjF8aW1hZ2UvanBlZ3xzeXNfbWFzdGVyL2ltYWdlcy9oNzcvaGUwLzEwMzA2MTU3NzQwMDYyfDIyOGU3YzdlNzljMWYwYjhjNzkwMzMwOTdkZjI0ZTBiMTE2ZDYxZTJiYmRkZmQzN2UxMDZkZDY4NjgxZjU3YzY"],
    description: "El perfume femenino emblemático de Yves Rocher, en eau de parfum de 50 ml.",
    howto: "Aplica en cuello y muñecas. Evita frotar para que el aroma dure más.",
    ingredients: "Eau de parfum." + INCI, shipping: SHIP
  }
];

// Sin reseñas hasta tener opiniones reales de clientas
window.FF_PRODUCTS.forEach(function (p) {
  if (p.rating == null) p.rating = 0;
  if (p.reviews == null) p.reviews = 0;
  if (!p.price) p.price = Math.round(p.usd * window.FF_CONFIG.usdRate / 100) * 100;
});

/* Cuadrícula de Instagram cuando no hay feed en vivo. `product` enlaza la
   publicación con un producto de la tienda (cuadrícula comprable). */
window.FF_IG_POSTS = [
  { img: "assets/img/rhode-lip-tint.webp", alt: "Rhode Peptide Lip Tint en cuatro tonos", product: "rhode-peptide-lip-tint" },
  { img: "1623039497550-c4f2ccc7b875", alt: "Retrato con luz roja y azul", product: "rare-beauty-soft-pinch-liquid-blush" },
  { img: "assets/img/rhode-pocket-blush.webp", alt: "Rhode Pocket Blush en varios tonos", product: "rhode-pocket-blush" },
  { img: "1774897795863-679e3a2826a7", alt: "Retrato con cuello de tortuga negro y cabello al viento", product: "cosrx-snail-96-mucin-essence" },
  { img: "assets/img/rhode-highlight-milk.webp", alt: "Rhode Highlight Milk en tonos cálidos", product: "rhode-highlight-milk" },
  { img: "assets/img/rhode-pocket-bronze.webp", alt: "Rhode Pocket Bronze en tonos café", product: "rhode-pocket-bronze" }
];
