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
  if (/^https?:/.test(src)) return src + (src.indexOf("?") > -1 ? "&" : "?") + "width=" + w;
  if (src.indexOf("/") > -1) return src;
  return "https://images.unsplash.com/photo-" + src + "?auto=format&fit=crop&ar=" + (ratio || "4:5") + "&w=" + w + "&q=72";
};

window.FF_CATEGORIES = [
  { id: "labios", name: "Labios" },
  { id: "rostro", name: "Rostro y mejillas" },
  { id: "ojos", name: "Ojos y cejas" },
  { id: "skincare", name: "Skincare" }
];

window.FF_BRANDS = [
  { id: "rhode", name: "Rhode" },
  { id: "rare-beauty", name: "Rare Beauty" },
  { id: "laneige", name: "Laneige" },
  { id: "cosrx", name: "COSRX" },
  { id: "anua", name: "Anua" },
  { id: "skin1004", name: "SKIN1004" },
  { id: "beauty-of-joseon", name: "Beauty of Joseon" }
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
    images: [RH + "files/glazing-milk-sq.png", RH + "files/glazing-milk-pdp-mobile.jpg"],
    description: "Esencia ligera que prepara la piel y la deja con el acabado glaseado característico de Rhode.",
    howto: "Después de limpiar, aplica unas gotas con las manos antes del sérum y la crema.",
    ingredients: "Esencia facial con ceramidas." + INCI, shipping: SHIP
  },
  {
    id: "rhode-barrier-restore-cream", brand: "rhode", name: "Barrier Restore Cream", category: "skincare",
    skin: ["seca", "sensible", "mixta"], collections: [], usd: 32, price: 25000,
    images: [RH + "products/brc-2000x2000_1.png"],
    description: "Crema hidratante que ayuda a reparar la barrera de la piel. Textura rica que se absorbe sin sensación pesada.",
    howto: "Último paso de tu rutina, mañana y noche. En la mañana, termina con protector solar.",
    ingredients: "Crema reparadora con ceramidas." + INCI, shipping: SHIP
  },
  {
    id: "rhode-peptide-glazing-fluid", brand: "rhode", name: "Peptide Glazing Fluid", category: "skincare",
    skin: ["todo"], collections: ["glow"], usd: 32, price: 25000,
    images: [RH + "products/glaze-2000x2000_1.png"],
    description: "Sérum en gel que hidrata y deja la piel luminosa. El paso que da el famoso efecto glazed.",
    howto: "Aplica una o dos gotas sobre la piel limpia, antes de la crema.",
    ingredients: "Sérum en gel con péptidos." + INCI, shipping: SHIP
  },

  /* ===== Rare Beauty ===== */
  {
    id: "rare-beauty-soft-pinch-liquid-blush", brand: "rare-beauty", name: "Soft Pinch Liquid Blush", category: "rostro",
    skin: ["todo"], collections: ["mas-pedidas"], usd: 25, price: 19000, badge: "Más pedido",
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
    images: [RB + "products/Full-Size-Mascara-Open-SKU.jpg", RB + "files/CAMPAIGN-BEFORE-AFTER-CAITLIN-PERFECT-STROKES-MASCARA.jpg"],
    description: "Máscara de volumen que levanta y define cada pestaña sin grumos.",
    howto: "Aplica desde la raíz con movimientos en zigzag hacia las puntas. Agrega capas para más volumen.",
    ingredients: "Máscara de pestañas de volumen." + RB_NOTE + INCI, shipping: SHIP
  },
  {
    id: "rare-beauty-brow-harmony-gel", brand: "rare-beauty", name: "Brow Harmony Flexible Lifting Gel", category: "ojos",
    skin: ["todo"], collections: [], usd: 21, price: 17000,
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
    id: "laneige-lip-sleeping-mask", brand: "laneige", name: "Lip Sleeping Mask", category: "labios",
    skin: ["todo"], collections: ["k-beauty", "mas-pedidas"], usd: 24, price: 19000,
    images: ["https://cdn.shopify.com/s/files/1/0255/0189/2660/files/LSM_Berry_Infographic_2000x2000Product1_1.jpg", "https://cdn.shopify.com/s/files/1/0255/0189/2660/files/Inline_Content_Block.jpg"],
    shades: [{ name: "Berry" }, { name: "Gummy Bear" }, { name: "Vanilla" }, { name: "Lemon Sorbet" }],
    description: "La mascarilla de labios coreana más conocida. Se aplica antes de dormir y amaneces con labios suaves.",
    howto: "Aplica una capa generosa por la noche con la espátula incluida. Retira el exceso en la mañana.",
    ingredients: "Con vitamina C y complejo de bayas." + INCI, shipping: SHIP
  },
  {
    id: "cosrx-snail-96-mucin-essence", brand: "cosrx", name: "Advanced Snail 96 Mucin Power Essence", category: "skincare",
    skin: ["todo", "seca", "sensible"], collections: ["k-beauty", "mas-pedidas"], usd: 25, price: 19000, badge: "K-beauty",
    images: ["https://cdn.shopify.com/s/files/1/0513/3775/6828/files/james_800x1067_1_1_4e9750cc-2cd6-4817-ace5-be2305a85806.jpg", "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Snail96Essence_8.jpg"],
    description: "La esencia de baba de caracol que hizo famoso a COSRX. Hidrata, calma y ayuda a la piel a recuperarse.",
    howto: "Después del tónico, aplica una pequeña cantidad y da toquecitos hasta que se absorba.",
    ingredients: "96 % filtrado de secreción de caracol." + INCI, shipping: SHIP
  },
  {
    id: "anua-heartleaf-77-toner", brand: "anua", name: "Heartleaf 77% Soothing Toner", category: "skincare",
    skin: ["grasa", "mixta", "sensible"], collections: ["k-beauty"], usd: 23, price: 18000,
    images: ["https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-us-toner-heartleaf-77-soothing-toner-1239193744.jpg", "https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-us-toner-heartleaf-77-soothing-toner-1161173061.jpg"],
    description: "Tónico calmante de textura acuosa para pieles sensibles o con tendencia a enrojecerse.",
    howto: "Después de limpiar, aplica con las manos o un algodón dando toquecitos.",
    ingredients: "77 % extracto de heartleaf (Houttuynia cordata)." + INCI, shipping: SHIP
  },
  {
    id: "anua-heartleaf-cleansing-oil", brand: "anua", name: "Heartleaf Pore Control Cleansing Oil", category: "skincare",
    skin: ["grasa", "mixta", "todo"], collections: ["k-beauty"], usd: 22, price: 18000,
    images: ["https://cdn.shopify.com/s/files/1/0753/1429/9158/files/anua-us-cleanser-heartleaf-pore-control-cleansing-oil-1239193742.jpg"],
    description: "Aceite limpiador que disuelve maquillaje y protector solar. El primer paso de la doble limpieza coreana.",
    howto: "Masajea sobre la piel seca, agrega un poco de agua para emulsionar y enjuaga. Sigue con tu limpiador en espuma.",
    ingredients: "Aceite limpiador con extracto de heartleaf." + INCI, shipping: SHIP
  },
  {
    id: "skin1004-centella-ampoule", brand: "skin1004", name: "Madagascar Centella Ampoule", category: "skincare",
    skin: ["sensible", "grasa", "mixta"], collections: ["k-beauty"], usd: 19.8, price: 17000,
    images: ["https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-ampoule-serum-centella-ampoule-38409088401654.jpg"],
    description: "Ampolla ligera que calma la piel irritada. Un clásico coreano para pieles sensibles.",
    howto: "Aplica unas gotas después del tónico y da toquecitos hasta que se absorba.",
    ingredients: "Extracto de Centella asiática de Madagascar." + INCI, shipping: SHIP
  },
  {
    id: "beauty-of-joseon-relief-sun", brand: "beauty-of-joseon", name: "Relief Sun: Rice + Niacinamide SPF50+", category: "skincare",
    skin: ["todo"], collections: ["k-beauty", "mas-pedidas"], usd: 18, price: 16000, badge: "K-beauty",
    images: ["https://cdn.shopify.com/s/files/1/0558/4135/7989/files/03_0805__-_ROW.jpg", "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/05_0805__-_ROW_654a8e4e-1d53-4dca-a3a0-c0c2f55e3ca0.jpg"],
    description: "Protector solar ligero de acabado natural, sin rastro blanco. Ideal para el sol de Costa Rica todos los días.",
    howto: "Último paso de la rutina de mañana. Reaplica cada dos horas si estás al sol.",
    ingredients: "SPF50+ PA++++ con extracto de arroz y niacinamida." + INCI, shipping: SHIP
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
